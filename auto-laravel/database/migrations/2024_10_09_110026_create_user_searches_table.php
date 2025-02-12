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
            $table->string('username');
            $table->string('search_param');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_searches');
    }
}
