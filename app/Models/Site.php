<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Site extends Model
{
    protected $table = 'site';
    protected $fillable = ['header', 'hero', 'heroStats', 'about', 'footer', 'contactInfo', 'availabilityMessage', 'availabilitySlots'];
    protected $casts = ['header' => 'array', 'hero' => 'array', 'heroStats' => 'array', 'about' => 'array', 'footer' => 'array', 'contactInfo' => 'array'];
}
