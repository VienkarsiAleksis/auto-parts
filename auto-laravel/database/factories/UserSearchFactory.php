<?php

namespace Database\Factories;

use App\Models\UserSearch;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserSearchFactory extends Factory
{
    protected $model = UserSearch::class;

    public function definition()
    {
        return [
            'username' => $this->faker->userName,
            'search_param' => $this->faker->word,
        ];
    }
}
