<?php

namespace App\Http\Controllers;

use App\Models\ScrapedDB;
use App\Models\UserSearch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Jobs\ScrapeAndUpdateData;

class ScrapingController extends Controller
{
    public function fetchData(Request $request)
    {
        $search_param = $request->query('search_param');
        $username = $request->query('username', 'guest');

        Log::info('Username for search: ' . $username);

        UserSearch::create([
            'username' => $username,
            'search_param' => $search_param,
        ]);

        $data = ScrapedDB::where('search_param', $search_param)->first();

        if ($data) {
            return response()->json(json_decode($data->data));
        } else {
            try {
                $scrapedData = (new ScrapeAndUpdateData($search_param))->handle();
                return response()->json($scrapedData);
            } catch (\Exception $e) {
                Log::error('Error scraping data: ' . $e->getMessage());
                return response()->json(['error' => 'Error occurred while scraping'], 500);
            }
        }
    }
}
