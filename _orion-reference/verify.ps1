# Run after every stage to verify nothing broke
Write-Host "=== Type Check (All Packages) ===" -ForegroundColor Cyan
pnpm typecheck

Write-Host "`n=== Lint (website-ui only - our work scope) ===" -ForegroundColor Cyan
pnpm --filter @azeer/website-ui lint

Write-Host "`n=== Lint (tokens only - we touch tokens occasionally) ===" -ForegroundColor Cyan
pnpm --filter @azeer/tokens lint

Write-Host "`n=== Git Status ===" -ForegroundColor Cyan
git status --short

Write-Host "`n=== Last Commit ===" -ForegroundColor Cyan
git log --oneline -1

Write-Host "`n=== Verification Complete ===" -ForegroundColor Green
Write-Host "Note: @azeer/ui lint errors are PRE-EXISTING and NOT from our work" -ForegroundColor Yellow
