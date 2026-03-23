<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    protected $table = 'portfolio';
    protected $fillable = ['title', 'desc', 'category', 'tags', 'emoji', 'gradient', 'image', 'images', 'link', 'comingSoon'];
    protected $casts = ['tags' => 'array', 'images' => 'array', 'comingSoon' => 'boolean'];
}
