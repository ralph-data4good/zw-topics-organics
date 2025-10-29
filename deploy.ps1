# Deployment script for GitHub Pages (PowerShell)
# This script helps you deploy the ZWA Organics Microsite to GitHub Pages

Write-Host "🚀 Zero Waste Asia - Organics Microsite Deployment" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "❌ Git repository not initialized. Run: git init" -ForegroundColor Red
    exit 1
}

# Check if remote exists
$remoteExists = $false
try {
    git remote get-url origin 2>$null
    $remoteExists = $?
} catch {
    $remoteExists = $false
}

if (-not $remoteExists) {
    Write-Host "📝 Setting up GitHub remote..." -ForegroundColor Yellow
    git remote add origin https://github.com/ralph-data4good/zw-topics-organics.git
    Write-Host "✅ Remote added: https://github.com/ralph-data4good/zw-topics-organics.git" -ForegroundColor Green
} else {
    Write-Host "✅ Remote already configured" -ForegroundColor Green
}

# Stage all changes
Write-Host ""
Write-Host "📦 Staging changes..." -ForegroundColor Yellow
git add .

# Check if there are changes to commit
$hasChanges = git diff --staged --quiet; $LASTEXITCODE -ne 0

if (-not $hasChanges) {
    Write-Host "ℹ️  No changes to commit" -ForegroundColor Blue
} else {
    # Commit changes
    Write-Host ""
    Write-Host "💾 Committing changes..." -ForegroundColor Yellow
    $commitMsg = Read-Host "Enter commit message (or press Enter for default)"
    if ([string]::IsNullOrWhiteSpace($commitMsg)) {
        $commitMsg = "Update: Deploy to GitHub Pages"
    }
    git commit -m $commitMsg
    Write-Host "✅ Changes committed" -ForegroundColor Green
}

# Get current branch
$currentBranch = git branch --show-current
if ([string]::IsNullOrWhiteSpace($currentBranch)) {
    $currentBranch = "main"
    git branch -M main
}

Write-Host ""
Write-Host "🌐 Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "Branch: $currentBranch" -ForegroundColor Blue

# Push to GitHub
try {
    git push origin $currentBranch 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    } else {
        Write-Host "⚠️  First time push - setting upstream..." -ForegroundColor Yellow
        git push -u origin $currentBranch
    }
} catch {
    Write-Host "⚠️  First time push - setting upstream..." -ForegroundColor Yellow
    git push -u origin $currentBranch
}

Write-Host ""
Write-Host "🎉 Deployment initiated!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to: https://github.com/ralph-data4good/zw-topics-organics" -ForegroundColor White
Write-Host "2. Click 'Actions' tab to monitor deployment" -ForegroundColor White
Write-Host "3. Wait 2-3 minutes for build to complete" -ForegroundColor White
Write-Host "4. Visit: https://ralph-data4good.github.io/zw-topics-organics/" -ForegroundColor White
Write-Host ""
Write-Host "💡 Configure GitHub Pages (first time only):" -ForegroundColor Yellow
Write-Host "   Settings → Pages → Source: GitHub Actions" -ForegroundColor White
Write-Host ""

