<?php

return [
    env('ADMIN_IBRAHIMA_USERNAME', 'ibrahima') => [
        'password' => env('ADMIN_IBRAHIMA_PASSWORD'),
        'name'     => 'Ibrahima',
        'title'    => 'Fondateur KoriLab',
        'rank'     => 'S',
        'slug'     => 'ibrahima-sarr',
    ],
    env('ADMIN_BABACAR_USERNAME', 'babacar') => [
        'password' => env('ADMIN_BABACAR_PASSWORD'),
        'name'     => 'Babacar',
        'title'    => 'Co-fondateur KoriLab',
        'rank'     => 'A',
        'slug'     => 'babacar-ndiaye',
    ],
    env('ADMIN_CHEIKH_USERNAME', 'cheikh') => [
        'password' => env('ADMIN_CHEIKH_PASSWORD'),
        'name'     => 'Cheikh',
        'title'    => 'Exécutif KoriLab',
        'rank'     => 'B',
        'slug'     => 'cheikh-anta-kane',
    ],
];
