<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DemoController;

// Public
Route::get('/', [HomeController::class, 'index']);
Route::get('/missions', [HomeController::class, 'missions']);
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');
Route::get('/team/{slug}', [TeamController::class, 'show']);
Route::get('/mentions-legales', [HomeController::class, 'mentions'])->name('mentions');
Route::get('/confidentialite', [HomeController::class, 'privacy'])->name('privacy');
Route::get('/cgv', [HomeController::class, 'cgv'])->name('cgv');
Route::get('/prestige', [HomeController::class, 'prestige'])->name('prestige');

// Demo Starter Template
Route::prefix('demo')->group(function () {
    Route::get('/', [DemoController::class, 'home']);
    Route::get('/a-propos', [DemoController::class, 'about']);
    Route::get('/services', [DemoController::class, 'services']);
    Route::get('/contact', [DemoController::class, 'contact']);
    Route::get('/mentions-legales', [DemoController::class, 'mentions']);
});

// Auth
Route::get('/login', [AuthController::class, 'show'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// Dashboard (protégé)
Route::middleware('auth.admin')->prefix('dashboard')->group(function () {
    Route::get('/', [DashboardController::class, 'index']);
    Route::get('/portfolio', [DashboardController::class, 'portfolio']);
    Route::get('/services', [DashboardController::class, 'services']);
    Route::get('/site', [DashboardController::class, 'site']);

    // CRUD Portfolio
    Route::post('/portfolio', [DashboardController::class, 'storePortfolio']);
    Route::patch('/portfolio/{id}', [DashboardController::class, 'updatePortfolio']);
    Route::delete('/portfolio/{id}', [DashboardController::class, 'destroyPortfolio']);

    // CRUD Services
    Route::post('/services', [DashboardController::class, 'storeService']);
    Route::patch('/services/{id}', [DashboardController::class, 'updateService']);
    Route::delete('/services/{id}', [DashboardController::class, 'destroyService']);

    // Site settings
    Route::patch('/site', [DashboardController::class, 'updateSite']);

    // CRUD Team Members (CV)
    Route::get('/team', [DashboardController::class, 'team']);
    Route::post('/team', [DashboardController::class, 'storeTeamMember']);
    Route::patch('/team/{id}', [DashboardController::class, 'updateTeamMember']);
    Route::delete('/team/{id}', [DashboardController::class, 'destroyTeamMember']);

    // Contrats & Devis
    Route::get('/contrats', [DashboardController::class, 'contrats']);
    Route::get('/contrats/generer', [DashboardController::class, 'generateContrat']);
    Route::get('/devis/generer', [DashboardController::class, 'generateDevis']);
    Route::patch('/plans', [DashboardController::class, 'updatePlans']);

    // Suivi de projets
    Route::get('/projets', [DashboardController::class, 'projets']);
    Route::post('/projets', [DashboardController::class, 'storeProjet']);
    Route::put('/projets/{project}', [DashboardController::class, 'updateProjet']);
    Route::delete('/projets/{project}', [DashboardController::class, 'destroyProjet']);
    Route::patch('/projets/{project}/status', [DashboardController::class, 'updateProjetStatus']);

    // Factures
    Route::get('/factures', [DashboardController::class, 'factures']);
    Route::post('/factures', [DashboardController::class, 'storeFacture']);
    Route::put('/factures/{facture}', [DashboardController::class, 'updateFacture']);
    Route::delete('/factures/{facture}', [DashboardController::class, 'destroyFacture']);

    // Messages de contact
    Route::get('/messages', [DashboardController::class, 'messages']);
    Route::patch('/messages/{id}/read', [DashboardController::class, 'markMessageRead']);
    Route::delete('/messages/{id}', [DashboardController::class, 'destroyMessage']);
});
