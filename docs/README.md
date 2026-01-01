# GetLainux Documentation Website

A beautiful, minimal documentation website for GetLainux project.

## Features

- 🎨 Modern, minimal design
- 📱 Fully responsive
- 🎯 Smooth scrolling navigation
- 📋 Code syntax highlighting
- 📋 Copy-to-clipboard functionality
- 🎭 Smooth animations
- 🌙 Dark theme optimized
- ⚡ Fast and lightweight

## How to Use

### Option 1: Open Directly

Simply open `index.html` in your web browser:

```bash
# From project root
cd docs
# Open index.html in your browser
# Or use a simple HTTP server
python -m http.server 8000
# Then visit http://localhost:8000
```

### Option 2: Using a Web Server

For best experience, use a local web server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with http-server)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Option 3: Deploy to GitHub Pages

1. Push the `docs` folder to your repository
2. Go to repository Settings > Pages
3. Select source: `main` branch, `/docs` folder
4. Your site will be available at `https://username.github.io/GetLainux/`

## File Structure

```
docs/
├── index.html      # Main HTML file
├── styles.css      # All styles
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary: #6366f1;      /* Main brand color */
    --secondary: #8b5cf6;    /* Secondary color */
    --bg-primary: #0f172a;  /* Background */
    /* ... */
}
```

### Content

Edit `index.html` to update:
- Hero section text
- Installation steps
- Features
- Documentation links

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Technologies Used

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (Inter, JetBrains Mono)

## License

Same as main project - GPL-3.0

