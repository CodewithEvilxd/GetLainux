# GetLainux Website

A modern, minimal documentation website built with Next.js, React, and Tailwind CSS.

## Features

- ⚡ **Next.js 14** - Latest React framework with App Router
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🌓 **Dark/Light Theme** - Automatic theme switching with next-themes
- 📱 **Fully Responsive** - Works on all devices
- ✨ **Smooth Animations** - Framer Motion for beautiful transitions
- 🎯 **TypeScript** - Type-safe development
- 🎨 **Modern UI** - Clean, minimal design
- 📋 **Code Highlighting** - Syntax highlighting for code blocks
- 🔄 **Copy to Clipboard** - Easy code copying

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
website/
├── app/
│   ├── layout.tsx      # Root layout with theme provider
│   ├── page.tsx        # Home page
│   └── globals.css    # Global styles
├── components/
│   ├── navbar.tsx      # Navigation component
│   ├── footer.tsx      # Footer component
│   ├── hero.tsx        # Hero section
│   ├── installation.tsx # Installation guide
│   ├── usage.tsx       # Usage guide
│   ├── features.tsx    # Features section
│   ├── documentation.tsx # Documentation links
│   ├── code-block.tsx  # Code block component
│   └── theme-provider.tsx # Theme provider
├── lib/
│   └── utils.ts       # Utility functions
└── public/            # Static assets
```

## Build for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Customization

### Colors

Edit `app/globals.css` to change the color scheme:

```css
:root {
  --primary: 262 83% 58%;
  /* ... */
}
```

### Content

Edit components in `components/` directory to update content.

### Theme

Theme configuration is in `components/theme-provider.tsx` using `next-themes`.

## Technologies Used

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **next-themes** - Theme management
- **clsx** & **tailwind-merge** - Class utilities

## License

Same as main project - GPL-3.0

## Author

Developed by **Nishant Gaurav**

