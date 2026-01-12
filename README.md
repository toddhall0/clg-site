# Camelback Law Group Website

A modern, SEO-optimized static marketing website for Camelback Law Group, built with Astro and ready for Netlify deployment.

## Tech Stack

- **Framework**: Astro 5.x (static site generator)
- **Styling**: Custom CSS (no frameworks)
- **Forms**: Netlify Forms
- **Hosting**: Netlify

## Project Structure

```
clg-site/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/
│       └── index.astro
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to Netlify

### Option 1: Netlify CLI (Recommended)

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize the project (run from project root)
netlify init

# Deploy to production
netlify deploy --prod
```

### Option 2: Netlify Dashboard

1. Push code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" > "Import an existing project"
4. Connect your Git repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

### Option 3: Drag & Drop

1. Run `npm run build` locally
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist` folder to the Netlify dashboard

## DNS Configuration

After deploying, update your DNS settings at your domain registrar:

1. Go to your domain registrar's DNS settings
2. Add a CNAME record:
   - **Name**: `www`
   - **Value**: `<your-netlify-site>.netlify.app`
3. For apex domain (clglawaz.com), add Netlify's load balancer IP:
   - Add an A record pointing to `75.2.60.5`
4. In Netlify dashboard, go to Domain settings > Add custom domain > `www.clglawaz.com`
5. Enable HTTPS (Netlify provides free SSL)

## Forms

The site includes two Netlify Forms:

1. **lead-magnet**: Resource download form (name, email, interest)
2. **deal-intake**: Contact/consultation form (full intake fields)

Form submissions will appear in the Netlify dashboard under Forms.

To receive email notifications:
1. Go to Site settings > Forms > Form notifications
2. Add email notification for each form

## SEO Features

- ✅ Meta title and description
- ✅ Canonical URL
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ JSON-LD structured data (LocalBusiness + LegalService)
- ✅ Semantic HTML with proper heading hierarchy
- ✅ robots.txt
- ✅ sitemap.xml

## TODO: Items to Confirm/Update

The following items are marked with TODO comments in the code and should be verified:

### Business Information (in `src/layouts/BaseLayout.astro` and `src/pages/index.astro`)
- [ ] Phone number: (602) 899-1383
- [ ] Email: info@clglawaz.com
- [ ] Address: 2720 E Camelback Rd, Phoenix, AZ 85016
- [ ] Google Maps embed coordinates (currently placeholder)

### Content Updates
- [ ] Add real blog/insights content and URLs
- [ ] Add attorney bio page(s) if desired
- [ ] Add real testimonials if available
- [ ] Update lead magnet PDFs/downloads

### Assets
- [ ] Replace favicon.svg with actual firm logo
- [ ] Add Open Graph image (`og:image`)
- [ ] Add any team photos or office images

### Analytics & Tracking
- [ ] Add Google Analytics or similar
- [ ] Add Google Tag Manager if needed
- [ ] Set up goal tracking for form submissions

## Customization

### Colors (CSS Variables in BaseLayout.astro)
```css
--color-charcoal: #1a1a1f;      /* Background */
--color-copper: #b87333;         /* Primary accent */
--color-blue: #1e3a5f;           /* Secondary accent */
--color-cream: #f5f2eb;          /* Text */
```

### Fonts
The site uses Google Fonts:
- **Display**: Cormorant Garamond (serif)
- **Body**: Source Sans 3 (sans-serif)

## Browser Support

The site is built with modern CSS and supports:
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

Proprietary - Camelback Law Group
