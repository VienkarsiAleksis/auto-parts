<?php

namespace Tests\Feature;

use App\Models\ScrapedDB;
use App\Models\UserSearch;
use App\Jobs\ScrapeAndUpdateData;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;

class FetchDataTest extends TestCase
{
    use RefreshDatabase;

    public function test_fetch_data_returns_existing_data()
    {
        // Create fake data in the ScrapedDB table using the factory
        ScrapedDB::factory()->create([
            'search_param' => 'existing-part',
            'data' => json_encode([
                ['img' => 'img.jpg', 'desc' => 'description', 'price' => 100, 'website' => 'example.com']
            ])
        ]);

        // Send request
        $response = $this->getJson('/api/fetch_data?search_param=existing-part&username=guest');

        // Assert the response contains the existing data
        $response->assertStatus(200)
            ->assertJson([
                ['img' => 'img.jpg', 'desc' => 'description', 'price' => 100, 'website' => 'example.com']
            ]);
    }



    public function test_fetch_data_runs_scrape_job_when_no_existing_data()
    {
        Queue::fake();
        Http::fake([
            'localhost:6969/scrape*' => Http::response([
                ['img' => 'img.jpg', 'desc' => 'desc', 'price' => 100, 'website' => 'example.com'],
            ], 200),
        ]);

        $response = $this->getJson('/api/fetch_data?search_param=new-part&username=guest');

        Queue::assertPushed(ScrapeAndUpdateData::class, function ($job) {
            return $job->getSearchParam() === 'new-part'; // Use the getter method
        });

        // Expecting a 202 response now
        $response->assertStatus(202)
            ->assertJson(['message' => 'Scraping job has been queued.']);
    }


    public function test_fetch_data_handles_scraping_error()
    {
        Queue::fake();

        // You may want to set this up in your test class setup
        Queue::assertNothingPushed(); // Ensure nothing is pushed initially

        // Simulate calling the API endpoint
        $response = $this->getJson('/api/fetch_data?search_param=new-part&username=guest');

        // Expect the job to be pushed even if it fails
        Queue::assertPushed(ScrapeAndUpdateData::class);

        // Here, since the job is queued, you should expect a 202 response
        $response->assertStatus(202)
            ->assertJson(['message' => 'Scraping job has been queued.']);
    }
}
