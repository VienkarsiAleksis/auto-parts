<?php

namespace App\Http\Controllers;

use App\Models\UserSearch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function mostSearchedProducts(Request $request)
    {
        $mostSearched = UserSearch::select('search_param', DB::raw('count(*) as total'))
            ->groupBy('search_param')
            ->orderBy('total', 'desc')
            ->limit(10)
            ->get();

        return response()->json($mostSearched);
    }

    public function getRecentSearches(Request $request)
    {
        $username = $request->query('username');

        $recentSearches = UserSearch::select('search_param')
            ->where('username', $username)
            ->groupBy('search_param')
            ->orderByRaw('MAX(created_at) DESC')
            ->take(5)
            ->get();

        return response()->json($recentSearches);
    }
}
