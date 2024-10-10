<?php

namespace App\Jobs;

use App\Models\ScrapedDB;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ScrapeAndUpdateData implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $search_param;

    public function __construct($search_param)
    {
        $this->search_param = $search_param;
    }

    public function handle()
    {
        ini_set('max_execution_time', 120);
        try {
            $scrapeResponse = Http::timeout(600)->get('http://localhost:6969/scrape', [
                'q' => $this->search_param
            ]);

            if ($scrapeResponse->successful()) {
                $scrapedData = $scrapeResponse->json();

                // Check if scraped data is not empty
                if (!empty($scrapedData)) {
                    // Update the database with new scraped data if not empty
                    ScrapedDB::updateOrCreate(
                        ['search_param' => $this->search_param],
                        ['data' => json_encode($scrapedData)]
                    );
                    return $scrapedData;
                } else {
                    Log::info("No data found for {$this->search_param}. Skipping update.");
                    return [];
                }
            } else {
                Log::error("Scraping failed for {$this->search_param}: " . $scrapeResponse->status());
            }
        } catch (\Exception $e) {
            Log::error("Exception during scraping for {$this->search_param}: " . $e->getMessage());
        }

        return [];
    }
}
