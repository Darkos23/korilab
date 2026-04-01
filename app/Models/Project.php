<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'client_name',
        'client_email',
        'project_type',
        'formule',
        'status',
        'start_date',
        'deadline',
        'amount',
        'notes',
        'assigned_to',
    ];

    protected $casts = [
        'start_date' => 'date:Y-m-d',
        'deadline'   => 'date:Y-m-d',
    ];
}
