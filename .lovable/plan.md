# SEO and legal pages

## Build
- Use Next.js metadata APIs for route-specific canonical URLs, favicon variants, and theme color; remove the keywords tag.
- Add Person JSON-LD for Saran Jaya Thilak with the requested title, Berlin address, GitHub, LinkedIn, and IEEE publication links.
- Update the sitemap and robots metadata to the published portfolio URL, omitting generated last-modified dates.
- Create `/impressum` and `/datenschutz` with prominent completion notes and only the supplied TODO legal text; link both from the footer.
- Restyle the 404 page to match the portfolio and provide a home link.

## Technical details
- This project uses Next.js App Router, so use its built-in metadata and route conventions rather than adding `react-helmet-async`.
- Reuse the existing portrait asset for favicon and Apple touch icon variants, sized appropriately.
- Verify generated metadata, legal routes, footer links, 404, and build output.
