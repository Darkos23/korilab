<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function show()
    {
        if (session('admin')) return redirect('/dashboard');
        return Inertia::render('Login');
    }

    public function login(Request $request)
    {
        $users = [
            env('ADMIN_IBRAHIMA_USERNAME') => ['password' => env('ADMIN_IBRAHIMA_PASSWORD'), 'name' => 'Ibrahima', 'rank' => 'S', 'slug' => 'ibrahima-sarr'],
            env('ADMIN_BABACAR_USERNAME')  => ['password' => env('ADMIN_BABACAR_PASSWORD'),  'name' => 'Babacar',  'rank' => 'A', 'slug' => 'babacar-ndiaye'],
            env('ADMIN_CHEIKH_USERNAME')   => ['password' => env('ADMIN_CHEIKH_PASSWORD'),   'name' => 'Cheikh',   'rank' => 'B', 'slug' => 'cheikh-anta-kane'],
        ];

        $username = $request->input('username');
        $password = $request->input('password');

        if (isset($users[$username]) && $users[$username]['password'] === $password) {
            session(['admin' => [
                'username' => $username,
                'name'     => $users[$username]['name'],
                'rank'     => $users[$username]['rank'],
                'slug'     => $users[$username]['slug'],
            ]]);
            return redirect('/dashboard');
        }

        return back()->withErrors(['credentials' => 'Identifiants incorrects.']);
    }

    public function logout()
    {
        session()->forget('admin');
        return redirect('/login');
    }
}
