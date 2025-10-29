# Deployment Guide

## Build Process

### 1. Install Dependencies

```bash
npm install
```

### 2. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### 3. Test Production Build Locally

```bash
npm run preview
```

## Deployment Options

### Option 1: Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Configure environment variables in Vercel dashboard

### Option 2: Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy --prod
   ```

3. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Option 3: Static Hosting (AWS S3, CloudFlare Pages, etc.)

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the `dist/` directory contents to your static hosting service

3. Configure routing:
   - Ensure all routes redirect to `index.html` for client-side routing
   - Example nginx config:
     ```nginx
     location / {
       try_files $uri $uri/ /index.html;
     }
     ```

## Environment Variables

Set the following environment variables in your hosting platform:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_MAPLIBRE_STYLE_URL=your_map_style_url
```

## Post-Deployment Checklist

- [ ] Verify all routes work correctly
- [ ] Test form submissions
- [ ] Check mobile responsiveness
- [ ] Verify external links open correctly
- [ ] Test map functionality (when integrated)
- [ ] Run Lighthouse audit (aim for 90+ on all metrics)
- [ ] Verify SEO meta tags
- [ ] Test keyboard navigation
- [ ] Verify screen reader accessibility

## Performance Optimization

### Code Splitting

The app uses React Router lazy loading for optimal code splitting.

### Asset Optimization

Vite automatically:
- Minifies JavaScript and CSS
- Optimizes images
- Generates cache-friendly filenames

### Caching Strategy

Configure cache headers:
- Static assets: 1 year cache (`max-age=31536000`)
- HTML: No cache or short cache (`max-age=300`)

### CDN Recommendations

Consider using a CDN for:
- Better global performance
- DDoS protection
- SSL/TLS termination

Recommended CDNs:
- Cloudflare
- AWS CloudFront
- Fastly

## Monitoring

Recommended monitoring tools:
- **Performance**: Google Analytics, Plausible
- **Errors**: Sentry, LogRocket
- **Uptime**: UptimeRobot, Pingdom

## Rollback Strategy

Keep previous production builds for quick rollback:

```bash
# Tag releases
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# Rollback if needed
git checkout v1.0.0
npm run build
# Deploy dist/
```

## Security Considerations

- [ ] Enable HTTPS (required)
- [ ] Set proper CORS headers
- [ ] Configure Content Security Policy (CSP)
- [ ] Add security headers (X-Frame-Options, X-Content-Type-Options)
- [ ] Regular dependency updates
- [ ] Keep Supabase keys secure (use environment variables, never commit)

## Support

For deployment issues, contact the Zero Waste Asia technical team.

