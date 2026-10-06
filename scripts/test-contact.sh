#!/usr/bin/env bash
# ────────────────────────────────────────────────────────────────────────────
# Manual test script for the contact form endpoint.
#
# Usage:
#   chmod +x scripts/test-contact.sh
#   ./scripts/test-contact.sh <BASE_URL>
#
# Example:
#   ./scripts/test-contact.sh https://saran.cloud
#   ./scripts/test-contact.sh http://localhost:8888   # netlify dev
# ────────────────────────────────────────────────────────────────────────────

set -euo pipefail

BASE="${1:-http://localhost:8888}"
ENDPOINT="${BASE}/api/contact"
PASS=0
FAIL=0

green() { printf "\033[32m✓ %s\033[0m\n" "$1"; }
red()   { printf "\033[31m✗ %s\033[0m\n" "$1"; }

assert_status() {
  local label="$1" expected="$2" actual="$3"
  if [ "$actual" -eq "$expected" ]; then
    green "$label (HTTP $actual)"
    PASS=$((PASS + 1))
  else
    red "$label — expected $expected, got $actual"
    FAIL=$((FAIL + 1))
  fi
}

# ── 1. Valid submission ──────────────────────────────────────────────────────
echo ""
echo "━━━ 1. Valid submission ━━━"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  -H "Origin: https://saran.cloud" \
  -d '{"name":"Test User","email":"test@example.com","message":"Hello, this is a test message from the audit script."}')
assert_status "Valid POST returns 200" 200 "$STATUS"

# ── 2. Missing fields ───────────────────────────────────────────────────────
echo ""
echo "━━━ 2. Missing fields ━━━"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  -H "Origin: https://saran.cloud" \
  -d '{"name":"A"}')
assert_status "Missing fields returns 400" 400 "$STATUS"

# ── 3. Name too short ───────────────────────────────────────────────────────
echo ""
echo "━━━ 3. Name too short ━━━"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  -H "Origin: https://saran.cloud" \
  -d '{"name":"A","email":"a@b.com","message":"Short name test message here."}')
assert_status "Name too short returns 400" 400 "$STATUS"

# ── 4. Invalid email ────────────────────────────────────────────────────────
echo ""
echo "━━━ 4. Invalid email format ━━━"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  -H "Origin: https://saran.cloud" \
  -d '{"name":"Test","email":"not-an-email","message":"Email format test message."}')
assert_status "Invalid email returns 400" 400 "$STATUS"

# ── 5. Message too short ────────────────────────────────────────────────────
echo ""
echo "━━━ 5. Message too short ━━━"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  -H "Origin: https://saran.cloud" \
  -d '{"name":"Test","email":"t@e.com","message":"Hi"}')
assert_status "Short message returns 400" 400 "$STATUS"

# ── 6. Honeypot filled — should silently succeed (200) ───────────────────────
echo ""
echo "━━━ 6. Honeypot detection ━━━"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  -H "Origin: https://saran.cloud" \
  -d '{"name":"Bot","email":"bot@spam.com","message":"Buy cheap shoes now!!!!","website":"http://spam.example"}')
assert_status "Honeypot filled returns 200 (silent drop)" 200 "$STATUS"

# ── 7. Method not allowed ───────────────────────────────────────────────────
echo ""
echo "━━━ 7. Wrong HTTP method ━━━"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X GET "$ENDPOINT" \
  -H "Origin: https://saran.cloud")
assert_status "GET returns 405" 405 "$STATUS"

# ── 8. HTML injection in name ────────────────────────────────────────────────
echo ""
echo "━━━ 8. HTML injection in name ━━━"
BODY=$(curl -s -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  -H "Origin: https://saran.cloud" \
  -d '{"name":"<script>alert(1)</script>","email":"x@y.com","message":"HTML injection test via name field."}')
# The name should be rejected by the regex (contains < and >)
echo "  Response: $BODY"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  -H "Origin: https://saran.cloud" \
  -d '{"name":"<script>alert(1)</script>","email":"x@y.com","message":"HTML injection test via name field."}')
assert_status "HTML in name returns 400" 400 "$STATUS"

# ── 9. Header injection in email ────────────────────────────────────────────
echo ""
echo "━━━ 9. Header injection attempt ━━━"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  -H "Origin: https://saran.cloud" \
  -d "{\"name\":\"Test\",\"email\":\"evil@test.com\\r\\nBcc: spam@spam.com\",\"message\":\"Header injection test message.\"}")
assert_status "Header injection in email returns 400 (invalid email)" 400 "$STATUS"

# ── 10. Rate limiting ───────────────────────────────────────────────────────
echo ""
echo "━━━ 10. Rate limiting (4 rapid requests — 4th should be 429) ━━━"
for i in 1 2 3 4; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ENDPOINT" \
    -H "Content-Type: application/json" \
    -H "Origin: https://saran.cloud" \
    -d '{"name":"Rate Test","email":"rate@test.com","message":"Rate limit test message number '"$i"'."}')
  if [ "$i" -eq 4 ]; then
    assert_status "4th request returns 429" 429 "$STATUS"
  else
    echo "  Request $i: HTTP $STATUS"
  fi
done

# ── 11. CORS preflight ──────────────────────────────────────────────────────
echo ""
echo "━━━ 11. CORS preflight ━━━"
CORS_ORIGIN=$(curl -s -D - -o /dev/null -X OPTIONS "$ENDPOINT" \
  -H "Origin: https://saran.cloud" \
  -H "Access-Control-Request-Method: POST" \
  | grep -i "access-control-allow-origin" | tr -d '\r')
echo "  $CORS_ORIGIN"
if echo "$CORS_ORIGIN" | grep -q "https://saran.cloud"; then
  green "CORS allows https://saran.cloud"
  PASS=$((PASS + 1))
else
  red "CORS header missing or wrong"
  FAIL=$((FAIL + 1))
fi

# ── Summary ──────────────────────────────────────────────────────────────────
echo ""
echo "════════════════════════════════════════"
printf "Results: \033[32m%d passed\033[0m, \033[31m%d failed\033[0m\n" "$PASS" "$FAIL"
echo "════════════════════════════════════════"
exit "$FAIL"
