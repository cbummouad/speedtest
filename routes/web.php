<?php

use Illuminate\Support\Facades\Route; // Added this line

use App\Http\Controllers\SpeedTestController;
use App\Http\Controllers\AuthController;

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/dashboard', [SpeedTestController::class, 'index'])->name('dashboard');
    Route::post('/speed-test', [SpeedTestController::class, 'store'])->name('speed-test.store');
    Route::get('/user', [AuthController::class, 'user'])->name('user');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

Route::middleware('web')->group(function () {
    Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register.show');
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login.show');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
});
