<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\TeamMember;

class TeamController extends Controller
{
    public function show(string $slug)
    {
        $member = TeamMember::where('slug', $slug)->first();

        if (!$member) {
            abort(404);
        }

        return Inertia::render('Team/Show', [
            'member' => $member,
        ]);
    }
}
