<?php

namespace App\Http\Controllers;

use App\Models\ScrapedDB;
use App\Models\UserSearch;
use Illuminate\Http\Request;
use App\Jobs\ScrapeAndUpdateData;
use Illuminate\Support\Facades\Log;

class ScrapingController extends Controller
{
    public function fetchData(Request $request)
    {
        $search_param = $request->query('search_param');
        $username = $request->query('username', 'guest'); // Default to 'guest' if not provided

        // Log the username for debugging
        Log::info('Username for search: ' . $username);

        // Save the search term for the user
        UserSearch::create([
            'username' => $username,
            'search_param' => $search_param,
        ]);

        // Check if data for this search term exists in the database
        $data = ScrapedDB::where('search_param', $search_param)->first();

        if ($data) {
            // Return existing data immediately
            return response()->json(json_decode($data->data));
        } else {
            // No data exists, run the scraping job
            try {
                $scrapedData = (new ScrapeAndUpdateData($search_param))->handle();

                if (!empty($scrapedData)) {
                    return response()->json($scrapedData, 200);
                } else {
                    return response()->json(['error' => 'No data found for the search term'], 404);
                }
            } catch (\Exception $e) {
                Log::error('Error scraping data: ' . $e->getMessage());
                return response()->json(['error' => 'Error occurred while scraping'], 500);
            }
        }
    }
}
