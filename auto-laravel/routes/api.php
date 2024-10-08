<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScrapingController;

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

Route::any('/save-scraped-data', [ScrapingController::class, 'saveScrapedData']);
Route::get('/fetch_data', [ScrapingController::class, 'fetchData']);

Route::options('/{any}', function (Request $request) {
    return response()->json();
})->where('any', '.*');