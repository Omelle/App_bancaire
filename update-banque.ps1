# Script de mise à jour et lancement de l'application bancaire
# Encodage UTF-8 avec BOM

Write-Host "=== BANQUE FUTURISTE - DEMARRAGE ===" -ForegroundColor Cyan
Write-Host ""

# Vérification de Node.js
Write-Host "Verification de Node.js..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "Node.js detecte: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "ERREUR: Node.js n'est pas installe!" -ForegroundColor Red
    exit 1
}

# Vérification de npm
Write-Host "Verification de npm..." -ForegroundColor Yellow
if (Get-Command npm -ErrorAction SilentlyContinue) {
    $npmVersion = npm --version
    Write-Host "npm detecte: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "ERREUR: npm n'est pas installe!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== Installation/Mise a jour des dependances ===" -ForegroundColor Cyan
npm install

Write-Host ""
Write-Host "=== Lancement du serveur Vite en mode dev... ===" -ForegroundColor Cyan
Write-Host "Application disponible sur: http://localhost:3000" -ForegroundColor Green
Write-Host "API backend sur: http://localhost:5000" -ForegroundColor Green
Write-Host ""
Write-Host "Appuyez sur Ctrl+C pour arreter le serveur" -ForegroundColor Yellow
Write-Host ""

# Lancement du serveur de développement
npm run dev