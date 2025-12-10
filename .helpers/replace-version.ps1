# Ecoride Version Replacement Script
# Recursively searches and replaces strings across all project files
# Usage:
# .\replace-version.ps1 -Search "0.3.3-alpha" -Inject "0.3.3-alpha"
# .\replace-version.ps1 -Search "0.3.3-alpha" -Inject "0.3.3-alpha" -WhatIf

param(
    [Parameter(Mandatory=$true)]
    [string]$Search,
    
    [Parameter(Mandatory=$true)]
    [string]$Inject,
    
    [Parameter(Mandatory=$false)]
    [switch]$WhatIf
)

# Color output functions
function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
    Write-Host "----------------------------------------" -ForegroundColor Green
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Cyan
    Write-Host "----------------------------------------" -ForegroundColor Cyan
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
    Write-Host "----------------------------------------" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
    Write-Host "----------------------------------------" -ForegroundColor Red
}

# Navigate to repository root
$repoRoot = Split-Path $PSScriptRoot -Parent
Set-Location $repoRoot

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Ecoride Version Replacement" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Info "Repository Root: $repoRoot"
Write-Info "Search String: '$Search'"
Write-Info "Replace With: '$Inject'"
if ($WhatIf) {
    Write-Warning "DRY RUN MODE - No files will be modified"
}
Write-Host ""

# Excluded directories
$excludedDirs = @(
    ".commits",
    ".secrets",
    ".git",
    "node_modules",
    "bin",
    "obj",
    "logs",
    ".vs",
    ".vscode"
)

# Excluded file patterns
$excludedPatterns = @(
    "*.dll",
    "*.exe",
    "*.pdb",
    "*.cache",
    "*.suo",
    "*.user",
    "package-lock.json",
    "*.min.js",
    "*.min.css",
    "CHANGELOG.md"
)

# Get all files recursively, excluding specified directories and patterns
Write-Info "Scanning files..."
$allFiles = Get-ChildItem -Path $repoRoot -Recurse -File | Where-Object {
    $file = $_
    
    # Check if file is in excluded directory
    $isExcluded = $false
    foreach ($excludedDir in $excludedDirs) {
        if ($file.FullName -like "*\$excludedDir\*") {
            $isExcluded = $true
            break
        }
    }
    
    # Check if file matches excluded patterns
    if (-not $isExcluded) {
        foreach ($pattern in $excludedPatterns) {
            if ($file.Name -like $pattern) {
                $isExcluded = $true
                break
            }
        }
    }
    
    -not $isExcluded
}

Write-Success "Found $($allFiles.Count) files to scan"
Write-Host ""

# Search for files containing the search string
$matchedFiles = @()
$totalMatches = 0

Write-Info "Searching for occurrences..."
foreach ($file in $allFiles) {
    try {
        # Read file content
        $content = Get-Content -Path $file.FullName -Raw -ErrorAction SilentlyContinue
        
        if ($null -ne $content -and $content -match [regex]::Escape($Search)) {
            $matches = ([regex]::Matches($content, [regex]::Escape($Search))).Count
            $matchedFiles += @{
                Path = $file.FullName
                RelativePath = $file.FullName.Replace($repoRoot, "").TrimStart('\')
                Matches = $matches
            }
            $totalMatches += $matches
        }
    }
    catch {
        # Skip binary or inaccessible files
        continue
    }
}

Write-Host ""
Write-Success "Found $totalMatches occurrences in $($matchedFiles.Count) files:"
Write-Host ""

# Display matched files
foreach ($match in $matchedFiles) {
    Write-Host "  📄 " -NoNewline -ForegroundColor Yellow
    Write-Host $match.RelativePath -NoNewline
    Write-Host " ($($match.Matches) occurrence(s))" -ForegroundColor DarkGray
}

if ($matchedFiles.Count -eq 0) {
    Write-Host ""
    Write-Warning "No occurrences found. Nothing to replace."
    exit 0
}

Write-Host ""

# Confirm replacement
if (-not $WhatIf) {
    Write-Warning "This will replace all occurrences of '$Search' with '$Inject'"
    $confirm = Read-Host "Continue? (y/N)"
    if ($confirm -ne 'y' -and $confirm -ne 'Y') {
        Write-Info "Operation cancelled"
        exit 0
    }
    Write-Host ""
}

# Perform replacement
$replacedCount = 0
$filesModified = 0

Write-Info "Processing files..."
foreach ($match in $matchedFiles) {
    try {
        if ($WhatIf) {
            Write-Host "  [DRY RUN] Would modify: $($match.RelativePath)" -ForegroundColor DarkGray
        }
        else {
            # Read, replace, and write back
            $content = Get-Content -Path $match.Path -Raw
            $newContent = $content -replace [regex]::Escape($Search), $Inject
            Set-Content -Path $match.Path -Value $newContent -NoNewline
            
            $replacedCount += $match.Matches
            $filesModified++
            
            Write-Host "  ✓ Modified: $($match.RelativePath)" -ForegroundColor Green
        }
    }
    catch {
        Write-Error "Failed to process: $($match.RelativePath) - $($_.Exception.Message)"
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green

if ($WhatIf) {
    Write-Info "DRY RUN COMPLETE"
    Write-Info "Would have replaced $totalMatches occurrences in $($matchedFiles.Count) files"
}
else {
    Write-Success "REPLACEMENT COMPLETE"
    Write-Success "Replaced $replacedCount occurrences in $filesModified files"
}

Write-Host "========================================" -ForegroundColor Green
Write-Host ""
