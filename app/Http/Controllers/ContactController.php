<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Mail;
use App\Models\Site;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|min:2|max:100',
            'email'   => 'required|email|max:150',
            'company' => 'nullable|string|max:100',
            'budget'  => 'required|string|max:50',
            'message' => 'required|string|min:10|max:2000',
        ]);

        $site = Site::first();
        $to   = $site?->contactInfo['email'] ?? config('mail.from.address');

        Mail::to($to)->send(new ContactFormMail($validated));

        return back()->with('success', 'Message envoyé avec succès ! Nous vous répondons sous 24h.');
    }
}
