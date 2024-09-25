<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScrapedDataTable extends Migration
{
    public function up()
    {
        Schema::create('scraped_data', function (Blueprint $table) {
            $table->id();
            $table->string('search_param');
            $table->json('data');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('scraped_data');
    }
}

