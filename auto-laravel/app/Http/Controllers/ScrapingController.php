<?php

namespace App\Http\Controllers;

use App\Models\ScrapedData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class ScrapingController extends Controller
{
    public function saveScrapedData(Request $request)
    {
        try {
            $validated = $request->validate([
                'search_param' => 'required|string',
                'data' => 'required|json',
            ]);

            // Save the data into the database
            ScrapedData::create([
                'search_param' => $validated['search_param'],
                'data' => $validated['data'],
            ]);

            return response()->json(['message' => 'Data saved successfully'], 201);
        } catch (\Illuminate\Database\QueryException $e) {
            // Log database-related errors
            Log::error('Database error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to save data', 'details' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            // Log general errors
            Log::error('Error saving scraped data: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to save data', 'details' => $e->getMessage()], 500);
        }
    }


    public function fetchData(Request $request)
    {
        // Fetch the data from the database based on 'search_param'
        $searchParam = $request->query('search_param');
        $data = ScrapedData::where('search_param', $searchParam)->get();

        return response()->json($data);
    }
}
