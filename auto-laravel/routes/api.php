<?php

use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScrapingController;
use App\Http\Controllers\SavedProductsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/fetch_data', [ScrapingController::class, 'fetchData']);
Route::get('/most_searched', [ProductController::class, 'mostSearchedProducts']);
Route::get('/recent-searches', [ProductController::class, 'getRecentSearches']);
Route::post('/save-product', [SavedProductsController::class, 'store'])->name('save-product');
Route::get('/saved-products', [SavedProductsController::class, 'getSavedProducts'])->name('saved-products');
Route::delete('/saved-products/{savedProduct}', [SavedProductsController::class, 'destroy'])->name('saved-products.destroy');
Route::post('/delete-selected-products', [SavedProductsController::class, 'deleteSelected'])->name('delete-selected-products');

Route::options('/{any}', function (Request $request) {
    return response()->json();
})->where('any', '.*');