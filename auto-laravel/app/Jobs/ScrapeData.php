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

class ScrapeData implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $searchParam;

    public function __construct($searchParam)
    {
        $this->searchParam = $searchParam;
    }

    public function handle()
    {
        try {
            $scrapeResponse = Http::timeout(300)->get('http://localhost:6969/scrape', [
                'q' => $this->searchParam
            ]);

            if ($scrapeResponse->successful()) {
                $scrapedData = $scrapeResponse->json();

                // Save the scraped data in the database
                ScrapedDB::updateOrCreate(
                    ['search_param' => $this->searchParam],
                    ['data' => json_encode($scrapedData)]
                );

                // Optionally log or handle the scraped data
            } else {
                Log::error("Scraping failed for {$this->searchParam}: " . $scrapeResponse->status());
            }
        } catch (\Exception $e) {
            Log::error("Exception during scraping for {$this->searchParam}: " . $e->getMessage());
        }
    }
}
