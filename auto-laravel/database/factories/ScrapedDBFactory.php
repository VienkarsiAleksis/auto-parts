<?php

namespace Database\Factories;

use App\Models\ScrapedDB;
use Illuminate\Database\Eloquent\Factories\Factory;

class ScrapedDBFactory extends Factory
{
    protected $model = ScrapedDB::class;

    public function definition()
    {
        return [
            'search_param' => $this->faker->word,
            'data' => json_encode([
                [
                    'img' => $this->faker->imageUrl(),
                    'desc' => $this->faker->sentence(),
                    'price' => $this->faker->randomFloat(2, 10, 1000),
                    'website' => $this->faker->domainName,
                ]
            ]),
        ];
    }
}
