# Saran J Thilak — Portfolio

A performance-focused developer portfolio showcasing full-stack projects, research publications, certifications, and professional experience. Built with Next.js 16 and deployed as a static export on Netlify, the site features smooth Framer Motion animations, a custom cursor, a GitHub contribution heatmap, and a serverless contact form powered by Resend.

🔗 **Live site:** [https://saran.cloud](https://saran.cloud)

## Screenshot

<!-- Replace with an actual screenshot once available -->
![Portfolio screenshot](docs/screenshot.png)

## Tech Stack

| Layer        | Technology                                  |
| ------------ | ------------------------------------------- |
| Framework    | Next.js 16 (static export)                  |
| UI           | React 18, TypeScript, Tailwind CSS, shadcn/ui |
| Animations   | Framer Motion                               |
| Email        | Netlify Functions + Resend                  |
| Deployment   | Netlify                                     |

## Project Structure

```
├── src/
│   ├── app/             # Next.js App Router (layout, pages, metadata)
│   ├── components/
│   │   ├── ui/          # Shared primitives (shadcn/ui, cursor, transitions)
│   │   └── v2/          # Section components (Hero, About, Projects, …)
│   ├── data/            # Portfolio content (portfolio.ts)
│   └── lib/             # Utilities (GitHub stats, cn helper)
├── netlify/
│   └── functions/       # Serverless contact form handler
├── public/              # Static assets
├── docs/                # Architecture rules & roadmap
├── tailwind.config.ts
├── next.config.mjs
└── netlify.toml
```

## Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/saranjthilak/saran-portfolio.git
cd saran-portfolio

# 2. Install dependencies
npm install

# 3. Copy and fill in environment variables
cp .env.example .env.local

# 4. Start the dev server
npm run dev
```

The site will be available at `http://localhost:3000`.

## Environment Variables

| Variable        | Description                                       |
| --------------- | ------------------------------------------------- |
| `RESEND_API_KEY` | API key from [Resend](https://resend.com)         |
| `CONTACT_EMAIL`  | Recipient address for contact form submissions    |

> Copy `.env.example` to `.env.local` and fill in the values. The contact form will not work without a valid Resend key.

## Deployment

The project deploys automatically to **Netlify** on push.

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Functions directory:** `netlify/functions`

Set `RESEND_API_KEY` and `CONTACT_EMAIL` in the Netlify dashboard under **Site settings → Environment variables**.

See [`netlify.toml`](netlify.toml) for the full build and redirect configuration.

## License

[MIT](LICENSE) © 2025 Saran Jaya Thilak
