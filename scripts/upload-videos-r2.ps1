# Upload named website demos and AI videos to R2.
# Set CLOUDFLARE_API_TOKEN in the current shell before running this script.

$token = $env:CLOUDFLARE_API_TOKEN
if ([string]::IsNullOrWhiteSpace($token)) {
  throw "CLOUDFLARE_API_TOKEN is required. Keep credentials out of source files."
}

$acct = "8903684f4d4bb1b96f7883fea7b305c7"
$bucket = "ayesmaj-videos"
$repoRoot = Split-Path -Parent $PSScriptRoot
$base = Join-Path $repoRoot "public\videos"

$jobs = @(
  @{ local = Join-Path $base "websites\arizona-chimney-pros.mp4";        key = "sites/arizona-chimney-pros.mp4" },
  @{ local = Join-Path $base "websites\ayesmaj-studios.mp4";             key = "sites/ayesmaj-studios.mp4" },
  @{ local = Join-Path $base "websites\casa-ora.mp4";                    key = "sites/casa-ora.mp4" },
  @{ local = Join-Path $base "websites\electric-fuel-america.mp4";       key = "sites/electric-fuel-america.mp4" },
  @{ local = Join-Path $base "websites\kolie website-1.mp4";             key = "sites/kolie.mp4" },
  @{ local = Join-Path $base "websites\podos-ai.mp4";                    key = "sites/podos-ai.mp4" },
  @{ local = Join-Path $base "websites\rebound skin care website-1.mp4"; key = "sites/rebound-skincare.mp4" },
  @{ local = Join-Path $base "websites\syntropic.mp4";                   key = "sites/syntropic.mp4" },
  @{ local = Join-Path $base "websites\vudu-energy.mp4";                 key = "sites/vudu-energy.mp4" },
  @{ local = Join-Path $base "ai videos\kolie add.mp4";                  key = "ai-videos/kolie-ad.mp4" },
  @{ local = Join-Path $base "ai videos\syntropic 34d.mp4";              key = "ai-videos/syntropic-3d.mp4" },
  @{ local = Join-Path $base "ai videos\syntropic 53.mp4";               key = "ai-videos/syntropic-53.mp4" }
)

$headers = @{ Authorization = "Bearer $token" }
$i = 0
foreach ($job in $jobs) {
  $i++
  if (-not (Test-Path -LiteralPath $job.local)) {
    Write-Host "[$i/$($jobs.Count)] MISSING: $($job.local)"
    continue
  }

  try {
    $head = Invoke-WebRequest `
      -Uri "https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/$($job.key)" `
      -Method Head -TimeoutSec 15 -UseBasicParsing -ErrorAction Stop
    if ($head.StatusCode -eq 200) {
      Write-Host "[$i/$($jobs.Count)] SKIP (exists): $($job.key)"
      continue
    }
  } catch {}

  $mb = [math]::Round((Get-Item -LiteralPath $job.local).Length / 1MB, 1)
  Write-Host "[$i/$($jobs.Count)] $($job.key) ($mb MB)..." -NoNewline
  try {
    $response = Invoke-WebRequest `
      -Uri "https://api.cloudflare.com/client/v4/accounts/$acct/r2/buckets/$bucket/objects/$($job.key)" `
      -Method Put -InFile $job.local -ContentType "video/mp4" `
      -Headers $headers -UseBasicParsing -TimeoutSec 900
    Write-Host " $($response.StatusCode)"
  } catch {
    Write-Host " FAIL: $($_.Exception.Message)"
  }
}

Write-Host "DONE"
