<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavedProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'picture_url',
        'title',
        'website',
        'price',
        'link',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}