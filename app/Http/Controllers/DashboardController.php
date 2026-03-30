<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Portfolio;
use App\Models\Service;
use App\Models\Site;
use App\Models\TeamMember;
use App\Models\ContactMessage;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Index', [
            'admin'           => session('admin'),
            'portfolioCount'  => Portfolio::count(),
            'servicesCount'   => Service::count(),
            'unreadMessages'  => ContactMessage::whereNull('read_at')->count(),
            'members'         => TeamMember::select('name', 'role', 'rank', 'initials')->orderBy('rank')->get(),
        ]);
    }

    public function portfolio()
    {
        return Inertia::render('Dashboard/Portfolio', [
            'admin'    => session('admin'),
            'projects' => Portfolio::all(),
        ]);
    }

    public function services()
    {
        return Inertia::render('Dashboard/Services', [
            'admin'    => session('admin'),
            'services' => Service::all(),
        ]);
    }

    public function site()
    {
        return Inertia::render('Dashboard/Site', [
            'admin' => session('admin'),
            'site'  => Site::first(),
        ]);
    }

    // Portfolio CRUD
    public function storePortfolio(Request $request)
    {
        Portfolio::create([
            'title'      => $request->title,
            'desc'       => $request->desc,
            'category'   => $request->category,
            'tags'       => $request->tags,
            'emoji'      => $request->emoji ?? '🚀',
            'gradient'   => $request->gradient ?? 'from-blue-600 to-violet-600',
            'image'      => $request->image,
            'link'       => $request->link,
            'comingSoon' => $request->comingSoon ?? false,
        ]);
        return back();
    }

    public function updatePortfolio(Request $request, $id)
    {
        Portfolio::findOrFail($id)->update($request->all());
        return back();
    }

    public function destroyPortfolio($id)
    {
        Portfolio::findOrFail($id)->delete();
        return back();
    }

    // Services CRUD
    public function storeService(Request $request)
    {
        Service::create([
            'icon'   => $request->icon ?? 'Globe',
            'rank'   => $request->rank ?? 'A',
            'title'  => $request->title,
            'desc'   => $request->desc,
            'tags'   => $request->tags,
            'accent' => $request->accent ?? 'from-blue-500 to-violet-500',
        ]);
        return back();
    }

    public function updateService(Request $request, $id)
    {
        Service::findOrFail($id)->update($request->all());
        return back();
    }

    public function destroyService($id)
    {
        Service::findOrFail($id)->delete();
        return back();
    }

    // Site settings
    public function updateSite(Request $request)
    {
        $site = Site::firstOrCreate([]);
        $site->update($request->all());
        return back();
    }

    // ── Messages de contact ────────────────────────────────────
    public function messages()
    {
        return Inertia::render('Dashboard/Messages', [
            'admin'    => session('admin'),
            'messages' => ContactMessage::orderByDesc('created_at')->get(),
        ]);
    }

    public function markMessageRead($id)
    {
        ContactMessage::findOrFail($id)->update(['read_at' => now()]);
        return back();
    }

    public function destroyMessage($id)
    {
        ContactMessage::findOrFail($id)->delete();
        return back();
    }

    // ── Team Members (CV) ──────────────────────────────────────
    public function team()
    {
        return Inertia::render('Dashboard/Team', [
            'admin'   => session('admin'),
            'members' => TeamMember::orderBy('name')->get(),
        ]);
    }

    public function storeTeamMember(Request $request)
    {
        $rankDefaults = [
            'S' => ['gradient' => 'from-purple-900 to-indigo-900', 'rank_bg' => 'bg-purple-400/10', 'rank_text' => 'text-purple-400', 'rank_border' => 'border-purple-400/30'],
            'A' => ['gradient' => 'from-blue-900 to-cyan-900',     'rank_bg' => 'bg-[#00a8ff]/10',  'rank_text' => 'text-[#00a8ff]',  'rank_border' => 'border-[#00a8ff]/30'],
            'B' => ['gradient' => 'from-emerald-900 to-teal-900',  'rank_bg' => 'bg-emerald-400/10','rank_text' => 'text-emerald-400','rank_border' => 'border-emerald-400/30'],
            'C' => ['gradient' => 'from-gray-800 to-slate-900',    'rank_bg' => 'bg-gray-400/10',   'rank_text' => 'text-gray-400',   'rank_border' => 'border-gray-400/30'],
        ];

        $rank = $request->rank ?? 'A';
        $defaults = $rankDefaults[$rank] ?? $rankDefaults['A'];

        TeamMember::create([
            'slug'         => $request->slug,
            'name'         => $request->name,
            'role'         => $request->role,
            'rank'         => $rank,
            'initials'     => $request->initials,
            'theme'        => $request->theme ?? 'shadow',
            'shadow_title' => $request->shadow_title ?? null,
            'gradient'     => $defaults['gradient'],
            'rank_bg'      => $defaults['rank_bg'],
            'rank_text'    => $defaults['rank_text'],
            'rank_border'  => $defaults['rank_border'],
        ]);

        return back()->with('success', 'Membre ajouté.');
    }

    public function updateTeamMember(Request $request, $id)
    {
        $member = TeamMember::findOrFail($id);

        $data = $request->only([
            'name', 'role', 'rank', 'initials', 'location', 'phone', 'email',
            'theme', 'shadow_title', 'summary',
            'gradient', 'rank_bg', 'rank_text', 'rank_border',
            'skills', 'experience', 'education', 'languages', 'soft_skills', 'interests',
        ]);

        $member->update($data);
        return back()->with('success', 'CV mis à jour.');
    }

    public function destroyTeamMember($id)
    {
        TeamMember::findOrFail($id)->delete();
        return back()->with('success', 'Membre supprimé.');
    }

    public function contrats()
    {
        return Inertia::render('Dashboard/Contrats', [
            'admin' => session('admin'),
        ]);
    }

    public function generateContrat(Request $request)
    {
        $data = $request->validate([
            'client_name'     => 'required|string|max:255',
            'client_activity' => 'required|string|max:255',
            'client_address'  => 'required|string|max:255',
            'client_email'    => 'required|email|max:255',
            'client_phone'    => 'required|string|max:50',
            'formule'         => 'required|in:starter,business,premium',
            'date'            => 'required|date',
            'ninea'           => 'nullable|string|max:50',
            'ref_number'      => 'nullable|string|max:10',
        ]);

        $data['ref_number'] = $data['ref_number'] ?: '001';
        $data['ninea']      = $data['ninea'] ?? '';

        return response()->view('contrat-prestige', $data);
    }
}
