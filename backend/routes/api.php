<?php

use App\Http\Controllers\AuteurController;
use App\Http\Controllers\EditeurController;
use App\Http\Controllers\LivreController;
use App\Http\Controllers\SpecialiteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('api')->group(function () {
    Route::resource('specialite', SpecialiteController::class);
});

Route::middleware('api')->group(function () {
    Route::resource('auteurs', AuteurController::class);
});

Route::middleware('api')->group(function () {
    Route::resource('editeurs', EditeurController::class);
});

Route::middleware('api')->group(function () {
    Route::resource('livres', LivreController::class);
});

Route::get('/auteurs/auteurpagination', [AuteurController::class, 'auteurPagination']);
