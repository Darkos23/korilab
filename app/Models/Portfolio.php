<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    protected $table = 'portfolio';
    protected $fillable = ['title', 'desc', 'category', 'tags', 'emoji', 'gradient', 'image', 'link', 'comingSoon'];
    protected $casts = ['tags' => 'array', 'comingSoon' => 'boolean'];
}
