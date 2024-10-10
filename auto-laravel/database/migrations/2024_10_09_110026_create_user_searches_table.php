<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserSearchesTable extends Migration
{
    public function up()
    {
        Schema::create('user_searches', function (Blueprint $table) {
            $table->id();
            $table->string('username'); // Store username or 'guest'
            $table->string('search_param'); // The search term
            $table->timestamps(); // Timestamps for created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_searches');
    }
}
