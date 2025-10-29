# Git Setup Script for ZWA Organics Microsite

Write-Host "🔧 Git Configuration Setup" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
try {
    git --version | Out-Null
    Write-Host "✅ Git is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "📝 Please provide your Git identity:" -ForegroundColor Yellow
Write-Host ""

# Get user name
$userName = Read-Host "Enter your name (e.g., 'Ralph Data4Good')"
if ([string]::IsNullOrWhiteSpace($userName)) {
    $userName = "Ralph Data4Good"
    Write-Host "Using default: $userName" -ForegroundColor Gray
}

# Get user email
$userEmail = Read-Host "Enter your email (e.g., 'ralph@data4good.org')"
if ([string]::IsNullOrWhiteSpace($userEmail)) {
    $userEmail = "ralph@data4good.org"
    Write-Host "Using default: $userEmail" -ForegroundColor Gray
}

Write-Host ""
Write-Host "⚙️  Configuring Git..." -ForegroundColor Yellow

# Configure git for this repository only
git config user.name "$userName"
git config user.email "$userEmail"

Write-Host "✅ Git configured successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Configuration:" -ForegroundColor Cyan
Write-Host "  Name:  $userName" -ForegroundColor White
Write-Host "  Email: $userEmail" -ForegroundColor White
Write-Host ""

# Now commit
Write-Host "💾 Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: ZWA Organics Microsite with GitHub Pages deployment"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Initial commit created!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Ready to deploy!" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next step: Run .\deploy.ps1 to push to GitHub" -ForegroundColor Yellow
} else {
    Write-Host "⚠️  Commit failed. There might be no changes to commit." -ForegroundColor Yellow
}

Write-Host ""

