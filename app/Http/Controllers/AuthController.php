<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
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
        $users = config('admins');

        $key = 'login:' . $request->ip();

        if (RateLimiter::tooManyAttempts($key, 5)) {
            $seconds = RateLimiter::availableIn($key);
            return back()->withErrors(['credentials' => "Trop de tentatives. Réessayez dans {$seconds} secondes."]);
        }

        $username = $request->input('username');
        $password = $request->input('password');

        if (isset($users[$username]) && $users[$username]['password'] === $password) {
            RateLimiter::clear($key);
            session(['admin' => [
                'username' => $username,
                'name'     => $users[$username]['name'],
                'rank'     => $users[$username]['rank'],
                'slug'     => $users[$username]['slug'],
            ]]);
            return redirect('/dashboard');
        }

        RateLimiter::hit($key, 300); // 5 minutes de blocage
        return back()->withErrors(['credentials' => 'Identifiants incorrects.']);
    }

    public function logout()
    {
        session()->forget('admin');
        return redirect('/login');
    }
}
