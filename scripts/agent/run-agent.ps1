param(
    [Parameter(Mandatory = $false)]
    [string]$Task = "Implement the requested change.",

    [Parameter(Mandatory = $false)]
    [string]$OutFile = ".github/agents/coding-agent/context/runtime-task.md"
)

$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
Set-Location $repoRoot

$instructionsPath = ".github/copilot-instructions.md"
$briefPath = ".github/agents/coding-agent/context/aretex-brief.md"

if (-not (Test-Path $instructionsPath)) {
    throw "Missing $instructionsPath"
}

if (-not (Test-Path $briefPath)) {
    throw "Missing $briefPath"
}

$instructions = Get-Content -Path $instructionsPath -Raw
$brief = Get-Content -Path $briefPath -Raw

$runtimePrompt = @"
# Steve Runtime Task

Use this context for all decisions:

## Repository Instructions

$instructions

## Aretex Brief

$brief

## Task

$Task
"@

$outDir = Split-Path -Path $OutFile -Parent
if (-not [string]::IsNullOrWhiteSpace($outDir) -and -not (Test-Path $outDir)) {
    New-Item -Path $outDir -ItemType Directory -Force | Out-Null
}

Set-Content -Path $OutFile -Value $runtimePrompt -Encoding UTF8

Write-Host "Steve runtime prompt generated: $OutFile"
Write-Host "Open this file and submit it to your agent/chat as a single prompt."

# Example:
# .\scripts\agent\run-agent.ps1 -Task "Build the Hero and Navigation sections"
