<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScrapedDB extends Model
{
    use HasFactory;

    protected $table = 'scraped_data'; // Ensure your table name matches

    protected $fillable = [
        'search_param',  // For the search term
        'data',          // For the scraped data (JSON)
    ];
}
