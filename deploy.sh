#!/bin/bash

# Deployment script for GitHub Pages
# This script helps you deploy the ZWA Organics Microsite to GitHub Pages

echo "🚀 Zero Waste Asia - Organics Microsite Deployment"
echo "=================================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not initialized. Run: git init"
    exit 1
fi

# Check if remote exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "📝 Setting up GitHub remote..."
    git remote add origin https://github.com/ralph-data4good/zw-topics-organics.git
    echo "✅ Remote added: https://github.com/ralph-data4good/zw-topics-organics.git"
else
    echo "✅ Remote already configured"
fi

# Stage all changes
echo ""
echo "📦 Staging changes..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit"
else
    # Commit changes
    echo ""
    echo "💾 Committing changes..."
    read -p "Enter commit message (or press Enter for default): " commit_msg
    if [ -z "$commit_msg" ]; then
        commit_msg="Update: Deploy to GitHub Pages"
    fi
    git commit -m "$commit_msg"
    echo "✅ Changes committed"
fi

# Get current branch
current_branch=$(git branch --show-current)
if [ -z "$current_branch" ]; then
    current_branch="main"
    git branch -M main
fi

echo ""
echo "🌐 Pushing to GitHub..."
echo "Branch: $current_branch"

# Push to GitHub
if git push origin "$current_branch" 2>/dev/null; then
    echo "✅ Successfully pushed to GitHub!"
else
    echo "⚠️  First time push - setting upstream..."
    git push -u origin "$current_branch"
fi

echo ""
echo "🎉 Deployment initiated!"
echo ""
echo "📍 Next steps:"
echo "1. Go to: https://github.com/ralph-data4good/zw-topics-organics"
echo "2. Click 'Actions' tab to monitor deployment"
echo "3. Wait 2-3 minutes for build to complete"
echo "4. Visit: https://ralph-data4good.github.io/zw-topics-organics/"
echo ""
echo "💡 Configure GitHub Pages (first time only):"
echo "   Settings → Pages → Source: GitHub Actions"
echo ""

