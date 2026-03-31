<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{
    protected $fillable = [
        'numero',
        'client_name',
        'client_email',
        'description',
        'amount',
        'status',
        'issued_date',
        'due_date',
        'project_id',
    ];

    protected $casts = [
        'issued_date' => 'date:Y-m-d',
        'due_date'    => 'date:Y-m-d',
    ];
}
