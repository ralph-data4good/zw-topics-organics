# GitHub Pages Deployment Guide

## 🚀 Automated Deployment Setup

This microsite is configured to automatically deploy to GitHub Pages at:
**https://ralph-data4good.github.io/zw-topics-organics/**

## Setup Instructions

### 1. Initialize Git Repository (if not already done)

```bash
git init
git add .
git commit -m "Initial commit: ZWA Organics Microsite"
```

### 2. Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `zw-topics-organics`
3. Owner: `ralph-data4good`
4. Make it **Public** (required for GitHub Pages on free accounts)
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### 3. Connect Local Repository to GitHub

```bash
git remote add origin https://github.com/ralph-data4good/zw-topics-organics.git
git branch -M main
git push -u origin main
```

### 4. Configure GitHub Pages

1. Go to repository Settings → Pages
2. **Source**: Select "GitHub Actions"
3. The workflow will automatically deploy on the next push

### 5. Verify Deployment

After pushing, check:
1. **Actions tab** in GitHub - workflow should run automatically
2. Wait for build to complete (usually 2-3 minutes)
3. Visit: https://ralph-data4good.github.io/zw-topics-organics/

## 🔄 Automatic Deployment Workflow

The site automatically deploys when you:
- Push to `main` or `master` branch
- Manually trigger from Actions tab

### Workflow File
`.github/workflows/deploy.yml`

### Build Configuration
`vite.config.ts` - Sets base path to `/zw-topics-organics/`

## 📝 Making Updates

### Deploy Changes

```bash
# Make your changes
git add .
git commit -m "Update: description of changes"
git push origin main
```

The GitHub Action will automatically:
1. Build the project
2. Run TypeScript checks
3. Deploy to GitHub Pages

### Monitor Deployment

Check deployment status:
1. Go to repository on GitHub
2. Click "Actions" tab
3. View latest workflow run
4. Green checkmark = successful deployment

## 🔧 Configuration Details

### Base Path
The site is configured for subdirectory deployment:
```javascript
// vite.config.ts
base: '/zw-topics-organics/'
```

This ensures all assets and routes work correctly under the subdirectory.

### Node Version
GitHub Actions uses Node.js 20 (LTS)

### Build Command
```bash
npm ci        # Clean install (faster, more reliable)
npm run build # Build for production
```

### Output Directory
`dist/` - Contains the built static files

## 🛠️ Troubleshooting

### Build Fails
1. Check Actions tab for error details
2. Verify build works locally: `npm run build`
3. Ensure all dependencies are in `package.json`
4. Check for TypeScript errors: `npx tsc --noEmit`

### 404 on Pages
1. Verify repository is **Public**
2. Check GitHub Pages is enabled in Settings
3. Ensure workflow completed successfully
4. Wait 5-10 minutes for DNS propagation

### Assets Not Loading
1. Verify `base: '/zw-topics-organics/'` in `vite.config.ts`
2. Check all imports use relative paths
3. Clear browser cache and hard refresh (Ctrl+F5)

### Workflow Not Triggering
1. Verify `.github/workflows/deploy.yml` exists
2. Check branch name matches workflow config (`main` or `master`)
3. Ensure GitHub Actions is enabled in repository settings

## 🔐 Permissions

The workflow requires these permissions (already configured):
- `contents: read` - Read repository files
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - Authentication

## 📊 Build Information

### Build Time
Typically 2-3 minutes:
- Install dependencies: ~30s
- Build project: ~10s
- Deploy to Pages: ~1-2min

### Bundle Size
- JavaScript: ~308 KB (92 KB gzipped)
- CSS: ~25 KB (5 KB gzipped)

## 🌐 Custom Domain (Optional)

To use a custom domain:

1. Add CNAME file to `public/` directory:
   ```
   organics.zerowasteasia.org
   ```

2. Configure DNS:
   - Type: CNAME
   - Name: organics
   - Value: ralph-data4good.github.io

3. Update in GitHub: Settings → Pages → Custom domain

4. Update `vite.config.ts`:
   ```javascript
   base: '/' // Remove subdirectory path
   ```

## 🔄 Rollback

To rollback to a previous version:

```bash
# View commit history
git log --oneline

# Rollback to specific commit
git reset --hard <commit-hash>
git push origin main --force
```

⚠️ **Warning**: Force push will overwrite remote history

## 📈 Monitoring

### Site Analytics
Add to `index.html` for tracking:
- Google Analytics
- Plausible Analytics
- Cloudflare Analytics

### Uptime Monitoring
Consider using:
- UptimeRobot (free)
- Pingdom
- StatusCake

## 🎯 Production Checklist

Before going live:
- [ ] Test all pages work on GitHub Pages URL
- [ ] Verify mobile responsiveness
- [ ] Check all links (internal and external)
- [ ] Test form submissions
- [ ] Verify images load correctly
- [ ] Run Lighthouse audit (Performance, Accessibility, SEO)
- [ ] Add environment variables if needed (in GitHub Secrets)
- [ ] Update README with live URL
- [ ] Share with team for QA testing

## 📞 Support

For deployment issues:
- Check GitHub Actions logs
- Review GitHub Pages documentation
- Contact repository maintainer

---

**Live URL**: https://ralph-data4good.github.io/zw-topics-organics/  
**Repository**: https://github.com/ralph-data4good/zw-topics-organics  
**Status**: Ready for deployment ✅

