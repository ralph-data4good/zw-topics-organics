# 🚀 Deploy Now - Quick Guide

Deploy your ZWA Organics Microsite to GitHub Pages in 5 minutes!

## Option 1: Use PowerShell Script (Easiest)

```powershell
.\deploy.ps1
```

The script will:
- ✅ Stage all changes
- ✅ Commit with your message
- ✅ Push to GitHub
- ✅ Trigger automatic deployment

## Option 2: Manual Steps

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `zw-topics-organics`
3. Owner: `ralph-data4good`
4. **Public** (required for free GitHub Pages)
5. Click "Create repository"

### Step 2: Push to GitHub

```bash
# Add remote (if not already added)
git remote add origin https://github.com/ralph-data4good/zw-topics-organics.git

# Stage all files
git add .

# Commit
git commit -m "Initial commit: ZWA Organics Microsite"

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Under **Source**, select: **GitHub Actions**
3. Save (if needed)

### Step 4: Monitor Deployment

1. Go to **Actions** tab
2. Watch the "Deploy to GitHub Pages" workflow run
3. Wait 2-3 minutes for completion

### Step 5: Visit Your Site

**Live URL**: https://ralph-data4good.github.io/zw-topics-organics/

---

## 🔄 Future Updates

To deploy updates, just:

```bash
git add .
git commit -m "Update: your changes"
git push origin main
```

GitHub Actions will automatically rebuild and deploy!

---

## ✅ Checklist

- [ ] GitHub repository created (`ralph-data4good/zw-topics-organics`)
- [ ] Repository is **Public**
- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled (Source: GitHub Actions)
- [ ] Workflow completed successfully
- [ ] Site accessible at: https://ralph-data4good.github.io/zw-topics-organics/

---

## 🆘 Troubleshooting

### "Repository not found"
- Ensure repository name is exactly: `zw-topics-organics`
- Ensure you have push access to `ralph-data4good` organization

### "Failed to deploy"
- Check **Actions** tab for error details
- Verify build works locally: `npm run build`
- Ensure all dependencies are committed

### "404 Not Found" on Pages URL
- Verify repository is **Public**
- Check GitHub Pages is enabled in Settings
- Wait 5-10 minutes after first deployment
- Clear browser cache (Ctrl+F5)

---

## 📧 Need Help?

Contact: Ralph (ralph-data4good)

**Ready? Run `.\deploy.ps1` or follow the manual steps above!**

