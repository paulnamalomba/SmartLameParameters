# Ecoride Branch Management Script
# Manages git operations for development branches with branch-specific commit messages
# Usage:
# # List available branches
# .\manage-branches.ps1

# # Complete branch push (recommended)
# .\manage-branches.ps1 -Action push -Branch dev/payments

# # Individual steps
# .\manage-branches.ps1 -Action add
# .\manage-branches.ps1 -Action commit -Branch dev/payments
# .\manage-branches.ps1 -Action push -Branch dev/payments

# # Custom remote
# .\manage-branches.ps1 -Action push -Branch dev/payments -Remote upstream

param(
    [Parameter(Mandatory=$false)]
    [string]$Action = "list",
    
    [Parameter(Mandatory=$false)]
    [string]$Branch = "",
    
    [Parameter(Mandatory=$false)]
    [string]$Remote = "origin"
)

# Color output functions
function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Cyan
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

# Get available branch commit messages from .commits directory
function Get-AvailableBranches {
    $commitsDir = Join-Path $PSScriptRoot "."
    $txtFiles = Get-ChildItem -Path $commitsDir -Filter "*.txt" | Where-Object { 
        $_.Name -notmatch '^v\d+\.\d+\.\d+.*\.txt$' -and $_.Name -ne "README.txt"
    }
    
    $branches = @()
    foreach ($file in $txtFiles) {
        $branchName = $file.BaseName
        $branches += $branchName
    }
    
    return $branches | Sort-Object
}

# Display available branches
function Show-AvailableBranches {
    Write-Info "Available branch commit messages in .commits/ directory:"
    Write-Host ""
    
    $branches = Get-AvailableBranches
    
    if ($branches.Count -eq 0) {
        Write-Warning "No branch commit message files found in .commits/ directory"
        Write-Info "Expected format: branch-name.txt (e.g., dev/payments.txt)"
        Write-Info "Note: Files matching version pattern (v*.txt) are excluded"
        return $false
    }
    
    foreach ($branch in $branches) {
        $filePath = Join-Path $PSScriptRoot "$branch.txt"
        $fileInfo = Get-Item $filePath
        Write-Host "  🌿 $branch" -ForegroundColor Yellow
        Write-Host "     Created: $($fileInfo.CreationTime)" -ForegroundColor DarkGray
        Write-Host "     Size: $($fileInfo.Length) bytes" -ForegroundColor DarkGray
        Write-Host ""
    }
    
    return $true
}

# Validate branch message file exists
function Test-BranchMessageExists {
    param([string]$BranchName)
    
    # Convert forward slashes to underscores or hyphens for filename
    $sanitizedBranch = $BranchName -replace '/', '-'
    $branchFile = Join-Path $PSScriptRoot "$sanitizedBranch.txt"
    
    if (-not (Test-Path $branchFile)) {
        Write-Error "Branch commit message file not found: $branchFile"
        Write-Info "Available branches:"
        $branches = Get-AvailableBranches
        foreach ($b in $branches) {
            Write-Host "  - $b" -ForegroundColor Yellow
        }
        return $false
    }
    
    return $true
}

# Check if git repository exists
function Test-GitRepository {
    $gitDir = Join-Path (Split-Path $PSScriptRoot -Parent) ".git"
    
    if (-not (Test-Path $gitDir)) {
        Write-Error "Not a git repository. Initialize with: git init"
        return $false
    }
    
    return $true
}

# Check git status
function Show-GitStatus {
    Write-Info "Git Status:"
    Write-Host ""
    git status --short
    Write-Host ""
    
    Write-Info "Current Branch:"
    $currentBranch = git branch --show-current
    Write-Host "  📍 $currentBranch" -ForegroundColor Green
    Write-Host ""
}

# Stage all changes
function Invoke-GitAdd {
    Write-Info "Staging all changes..."
    git add .
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "All changes staged successfully"
        return $true
    } else {
        Write-Error "Failed to stage changes"
        return $false
    }
}

# Commit with branch message
function Invoke-GitCommit {
    param([string]$BranchName)
    
    # Convert forward slashes to underscores or hyphens for filename
    $sanitizedBranch = $BranchName -replace '/', '-'
    $commitMessageFile = Join-Path $PSScriptRoot "$sanitizedBranch.txt"
    
    Write-Info "Committing with message from: $commitMessageFile"
    
    # Read first few lines for preview
    $preview = Get-Content $commitMessageFile -TotalCount 3
    Write-Host ""
    Write-Host "Commit Message Preview:" -ForegroundColor Cyan
    foreach ($line in $preview) {
        Write-Host "  $line" -ForegroundColor DarkGray
    }
    Write-Host "  ..." -ForegroundColor DarkGray
    Write-Host ""
    
    git commit -F $commitMessageFile
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Commit created successfully"
        return $true
    } else {
        Write-Error "Failed to create commit"
        return $false
    }
}

# Push to remote branch
function Invoke-GitPush {
    param(
        [string]$Remote,
        [string]$BranchName
    )
    
    Write-Info "Pushing to $Remote/$BranchName..."
    git push $Remote $BranchName
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Pushed to $Remote/$BranchName successfully"
        return $true
    } else {
        Write-Error "Failed to push to $Remote/$BranchName"
        return $false
    }
}

# Complete branch push workflow
function Invoke-BranchPush {
    param(
        [string]$BranchName,
        [string]$Remote
    )
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  Ecoride Branch Push: $BranchName" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    
    # Validate
    if (-not (Test-GitRepository)) { return }
    
    # Convert forward slashes to underscores or hyphens for filename
    $sanitizedBranch = $BranchName -replace '/', '-'
    if (-not (Test-BranchMessageExists -BranchName $sanitizedBranch)) { return }
    
    # Show current status
    Show-GitStatus
    
    # Confirm
    Write-Warning "This will:"
    Write-Host "  1. Stage all changes (git add .)" -ForegroundColor Yellow
    Write-Host "  2. Commit with message from .commits/$sanitizedBranch.txt" -ForegroundColor Yellow
    Write-Host "  3. Push to $Remote/$BranchName" -ForegroundColor Yellow
    Write-Host ""
    
    $confirm = Read-Host "Continue? (y/N)"
    if ($confirm -ne 'y' -and $confirm -ne 'Y') {
        Write-Info "Branch push cancelled"
        return
    }
    
    Write-Host ""
    
    # Execute workflow
    if (-not (Invoke-GitAdd)) { return }
    if (-not (Invoke-GitCommit -BranchName $sanitizedBranch)) { return }
    if (-not (Invoke-GitPush -Remote $Remote -BranchName $BranchName)) { return }
    
    Write-Host ""
    # Write-Host "========================================" -ForegroundColor Green
    Write-Success "Branch $BranchName pushed successfully!"
    # Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Info "View branch on GitHub:"
    Write-Host "  https://github.com/computemore/ecoride/tree/$BranchName" -ForegroundColor Cyan
    Write-Host ""
}

# Main script logic
switch ($Action.ToLower()) {
    "list" {
        Show-AvailableBranches
    }
    
    "status" {
        if (-not (Test-GitRepository)) { exit 1 }
        Show-GitStatus
    }
    
    "push" {
        if ([string]::IsNullOrWhiteSpace($Branch)) {
            Write-Error "Branch name required for push action"
            Write-Info "Usage: .\manage-branches.ps1 -Action push -Branch dev/payments"
            Write-Host ""
            Show-AvailableBranches
            exit 1
        }
        
        Invoke-BranchPush -BranchName $Branch -Remote $Remote
    }
    
    "add" {
        if (-not (Test-GitRepository)) { exit 1 }
        Invoke-GitAdd
    }
    
    "commit" {
        if ([string]::IsNullOrWhiteSpace($Branch)) {
            Write-Error "Branch name required for commit action"
            Write-Info "Usage: .\manage-branches.ps1 -Action commit -Branch dev/payments"
            exit 1
        }
        
        if (-not (Test-GitRepository)) { exit 1 }
        
        # Convert forward slashes to underscores or hyphens for filename
        $sanitizedBranch = $Branch -replace '/', '-'
        if (-not (Test-BranchMessageExists -BranchName $sanitizedBranch)) { exit 1 }
        Invoke-GitCommit -BranchName $sanitizedBranch
    }
    
    "help" {
        Write-Host ""
        Write-Host "Ecoride Branch Management Script" -ForegroundColor Cyan
        Write-Host "================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Usage:" -ForegroundColor Yellow
        Write-Host "  .\manage-branches.ps1 [-Action <action>] [-Branch <branch>] [-Remote <remote>]"
        Write-Host ""
        Write-Host "Actions:" -ForegroundColor Yellow
        Write-Host "  list       - List available branch commit messages in .commits/ directory (default)"
        Write-Host "  status     - Show git status and current branch"
        Write-Host "  push       - Complete workflow (add, commit, push to branch)"
        Write-Host "  add        - Stage all changes (git add .)"
        Write-Host "  commit     - Commit with branch message (git commit -F .commits/BRANCH.txt)"
        Write-Host "  help       - Show this help message"
        Write-Host ""
        Write-Host "Parameters:" -ForegroundColor Yellow
        Write-Host "  -Branch    - Branch name (e.g., dev/payments, feature/auth)"
        Write-Host "  -Remote    - Git remote name (default: origin)"
        Write-Host ""
        Write-Host "Examples:" -ForegroundColor Yellow
        Write-Host "  .\manage-branches.ps1 -Action list"
        Write-Host "  .\manage-branches.ps1 -Action push -Branch dev/payments"
        Write-Host "  .\manage-branches.ps1 -Action commit -Branch dev/payments"
        Write-Host "  .\manage-branches.ps1 -Action push -Branch feature/auth -Remote upstream"
        Write-Host ""
        Write-Host "Note:" -ForegroundColor Yellow
        Write-Host "  Create a .commits/BRANCH.txt file with your commit message."
        Write-Host "  For branches with slashes (e.g., dev/payments), use dev-payments.txt"
        Write-Host ""
    }
    
    default {
        Write-Error "Unknown action: $Action"
        Write-Info "Use -Action help for usage information"
        exit 1
    }
}
