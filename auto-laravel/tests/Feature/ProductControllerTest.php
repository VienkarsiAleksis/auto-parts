<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\UserSearch;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProductControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the mostSearchedProducts method.
     */
    public function test_most_searched_products_returns_correct_data()
    {
        // Create 10 unique search_params with different counts
        UserSearch::factory()->count(5)->create(['search_param' => 'part_A']);
        UserSearch::factory()->count(3)->create(['search_param' => 'part_B']);
        UserSearch::factory()->count(2)->create(['search_param' => 'part_C']);

        // Call the mostSearchedProducts route
        $response = $this->getJson('/api/most_searched');

        // Assert the response is OK (status code 200)
        $response->assertStatus(200);

        // Check the structure and data of the returned JSON
        $response->assertJsonCount(3); // There should be 3 search params
        $response->assertJsonFragment(['search_param' => 'part_A', 'total' => 5]);
        $response->assertJsonFragment(['search_param' => 'part_B', 'total' => 3]);
        $response->assertJsonFragment(['search_param' => 'part_C', 'total' => 2]);
    }

    public function test_get_recent_searches_returns_correct_data()
    {
        UserSearch::factory()->create(['username' => 'john_doe', 'search_param' => 'part_X']);
        UserSearch::factory()->create(['username' => 'john_doe', 'search_param' => 'part_Y']);
        UserSearch::factory()->create(['username' => 'john_doe', 'search_param' => 'part_Z']);
        UserSearch::factory()->create(['username' => 'john_doe', 'search_param' => 'part_W']);
        UserSearch::factory()->create(['username' => 'john_doe', 'search_param' => 'part_V']);

        $response = $this->getJson('/api/recent-searches?username=john_doe');
        $response->assertStatus(200);

        $response->assertJsonCount(5);
        $response->assertJsonFragment(['search_param' => 'part_X']);
        $response->assertJsonFragment(['search_param' => 'part_Y']);
        $response->assertJsonFragment(['search_param' => 'part_Z']);
        $response->assertJsonFragment(['search_param' => 'part_W']);
        $response->assertJsonFragment(['search_param' => 'part_V']);
    }

    /**
     * Test that no data is returned when there are no most searched products.
     */
    public function test_it_returns_empty_when_there_are_no_most_searched_products()
    {
        $response = $this->getJson('/api/most_searched');

        $response->assertOk();
        $response->assertJsonCount(0);
    }

    /**
     * Test that recent searches return unique results.
     */
    public function test_it_returns_unique_recent_searches()
    {
        $username = 'uniqueuser';

        UserSearch::factory()->create(['search_param' => 'Product X', 'username' => $username, 'created_at' => now()->subMinutes(5)]);
        UserSearch::factory()->create(['search_param' => 'Product X', 'username' => $username, 'created_at' => now()->subMinutes(2)]);
        UserSearch::factory()->create(['search_param' => 'Product Y', 'username' => $username, 'created_at' => now()->subMinutes(10)]);

        $response = $this->getJson('/api/recent-searches?username=' . $username);

        $response->assertOk();

        $response->assertJsonCount(2);
        $response->assertJson([
            ['search_param' => 'Product X'],
            ['search_param' => 'Product Y'],
        ]);
    }
}
