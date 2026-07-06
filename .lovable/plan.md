## Remove "(Contract)" from Experience Roles

### Summary
Strip the " (Contract)" suffix from all four `role` fields in `src/data/portfolio.ts`.

### Changes

**File: `src/data/portfolio.ts`**
- Line 5: `"Data Engineer (Contract)"` → `"Data Engineer"`
- Line 12: `"Cloud Support Engineer (Contract)"` → `"Cloud Support Engineer"`
- Line 19: `"Operations Team Leader (Contract)"` → `"Operations Team Leader"`
- Line 26: `"Operations & Maintenance Engineer (Contract)"` → `"Operations & Maintenance Engineer"`

No other files reference the word "Contract", so this is a single-file change with no downstream updates required.