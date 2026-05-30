# alecsearle.dev

Personal FPV landing page and content hub | Live at [alecsearle.dev](https://alecsearle.dev)

## Overview

A mobile-first link hub for my FPV drone content. Features a live YouTube feed, social links, and curated affiliate gear recommendations.

## Features

- **YouTube carousel** — pulls latest videos dynamically via the YouTube Data API v3
- **Affiliate gear section** — curated beginner FPV setup with BetaFPV affiliate links
- **Mobile-first** — designed for thumb-scrolling, scales cleanly to desktop
- **Component-driven** — each section is its own isolated component for easy maintenance

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) for icons
- YouTube Data API v3

## Environment Variables

```
VITE_YOUTUBE_API_KEY=your_key_here
```

Requires a [Google Cloud](https://console.cloud.google.com/) project with the **YouTube Data API v3** enabled.

## Development

```bash
npm install
npm run dev
```

## Deployment

Deployed on [Vercel](https://vercel.com) with automatic production deploys on push to `main`.
