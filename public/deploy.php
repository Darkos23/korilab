<?php
/**
 * KoriLab — Script de déploiement automatique
 * Déclenché par le webhook GitHub sur chaque push sur main
 */

define('DEPLOY_SECRET', 'korilab_deploy_2026');

// Vérification du secret
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
$payload   = file_get_contents('php://input');

if (!hash_equals(
    'sha256=' . hash_hmac('sha256', $payload, DEPLOY_SECRET),
    $signature
)) {
    http_response_code(403);
    die('Unauthorized');
}

// Chemin racine du projet (un niveau au-dessus de public/)
$projectRoot = dirname(__DIR__);

// Commandes de déploiement
$commands = [
    "cd {$projectRoot} && git fetch origin main 2>&1",
    "cd {$projectRoot} && git reset --hard origin/main 2>&1",
    "cd {$projectRoot} && composer install --no-dev --optimize-autoloader 2>&1",
    "cd {$projectRoot} && php artisan migrate --force 2>&1",
    "cd {$projectRoot} && php artisan config:cache 2>&1",
    "cd {$projectRoot} && php artisan route:cache 2>&1",
    "cd {$projectRoot} && php artisan view:cache 2>&1",
];

$output = [];
foreach ($commands as $cmd) {
    $result = shell_exec($cmd);
    $output[] = ['cmd' => $cmd, 'result' => $result];
}

http_response_code(200);
header('Content-Type: application/json');
echo json_encode(['status' => 'ok', 'output' => $output]);
