<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Portfolio;
use App\Models\Service;
use App\Models\Site;
use App\Models\TeamMember;
use App\Models\ContactMessage;
use App\Models\Project;
use App\Models\Facture;

class DashboardController extends Controller
{
    public function index()
    {
        $today       = \Carbon\Carbon::today()->toDateString();
        $in7days     = \Carbon\Carbon::today()->addDays(7)->toDateString();
        $activeStats = ['livre', 'pause'];

        return Inertia::render('Dashboard/Index', [
            'admin'           => session('admin'),
            'portfolioCount'  => Portfolio::count(),
            'servicesCount'   => Service::count(),
            'unreadMessages'  => ContactMessage::whereNull('read_at')->count(),
            'members'         => TeamMember::select('name', 'role', 'initials')->get(),
            'projetsEnCours'  => Project::whereNotIn('status', $activeStats)->count(),
            'projetsEnRetard' => Project::whereNotIn('status', $activeStats)
                                    ->whereNotNull('deadline')
                                    ->whereDate('deadline', '<', $today)
                                    ->count(),
            'urgentProjects'  => Project::whereNotIn('status', $activeStats)
                                    ->whereNotNull('deadline')
                                    ->whereDate('deadline', '<=', $in7days)
                                    ->orderBy('deadline')
                                    ->limit(4)
                                    ->get(['id', 'client_name', 'project_type', 'deadline', 'status']),
            'recentMessages'  => ContactMessage::whereNull('read_at')
                                    ->latest()
                                    ->limit(3)
                                    ->get(['id', 'name', 'company', 'message', 'created_at']),
            'factures'        => Facture::whereNotIn('status', ['payée', 'annulée'])
                                    ->orderByRaw("CASE WHEN due_date < CURDATE() THEN 0 ELSE 1 END")
                                    ->orderBy('due_date')
                                    ->limit(4)
                                    ->get(['id', 'client_name', 'amount', 'status', 'due_date']),
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
        $slug = session('admin.slug');
        $member = $slug ? TeamMember::where('slug', $slug)->first() : null;

        return Inertia::render('Dashboard/Team', [
            'admin'  => session('admin'),
            'member' => $member,
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
        $site = Site::first();
        $defaultPlans = [
            ['key' => 'starter',  'label' => 'Starter',  'price' => '35 000 F/mois',  'desc' => 'Site vitrine 5 pages · 2 modif./mois'],
            ['key' => 'business', 'label' => 'Business', 'price' => '75 000 F/mois',  'desc' => 'Site avancé · 6 modif./mois'],
            ['key' => 'premium',  'label' => 'Premium',  'price' => '250 000 F/mois', 'desc' => 'Application sur-mesure · 12 modif./mois'],
        ];

        return Inertia::render('Dashboard/Contrats', [
            'admin' => session('admin'),
            'plans' => $site?->plans ?? $defaultPlans,
        ]);
    }

    public function updatePlans(Request $request)
    {
        $request->validate([
            'plans'          => 'required|array|min:1',
            'plans.*.key'   => 'required|string|max:50',
            'plans.*.label' => 'required|string|max:100',
            'plans.*.price' => 'required|string|max:100',
            'plans.*.desc'  => 'required|string|max:255',
        ]);

        $site = Site::firstOrCreate([]);
        $site->update(['plans' => $request->plans]);
        return back()->with('success', 'Plans mis à jour.');
    }

    public function generateDevis(Request $request)
    {
        $data = $request->validate([
            'client_name'         => 'required|string|max:255',
            'client_activity'     => 'required|string|max:255',
            'client_email'        => 'nullable|email|max:255',
            'client_phone'        => 'nullable|string|max:50',
            'project_title'       => 'required|string|max:255',
            'project_description' => 'required|string',
            'amount'              => 'required|numeric|min:0',
            'validity_days'       => 'required|integer|in:15,30,45,60',
            'date'                => 'required|date',
            'ref_number'          => 'nullable|string|max:10',
        ]);

        $data['ref_number'] = $data['ref_number'] ?: '001';

        return response()->view('devis-prestige', $data);
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

    // ── Suivi de projets ───────────────────────────────────────
    public function projets()
    {
        $projects = \App\Models\Project::orderBy('deadline')->orderBy('status')->get();
        return \Inertia\Inertia::render('Dashboard/Projets', [
            'admin'    => session('admin'),
            'projects' => $projects,
            'members'  => TeamMember::select('name')->orderBy('name')->pluck('name'),
        ]);
    }

    public function storeProjet(\Illuminate\Http\Request $request)
    {
        $data = $request->validate([
            'client_name'  => 'required|string|max:255',
            'client_email' => 'nullable|email',
            'project_type' => 'required|string|max:255',
            'formule'      => 'nullable|string',
            'status'       => 'required|string',
            'start_date'   => 'nullable|date',
            'deadline'     => 'nullable|date',
            'amount'       => 'nullable|integer',
            'notes'        => 'nullable|string',
            'assigned_to'  => 'nullable|string',
        ]);
        \App\Models\Project::create($data);
        return back();
    }

    public function updateProjet(\Illuminate\Http\Request $request, \App\Models\Project $project)
    {
        $data = $request->validate([
            'client_name'  => 'required|string|max:255',
            'client_email' => 'nullable|email',
            'project_type' => 'required|string|max:255',
            'formule'      => 'nullable|string',
            'status'       => 'required|string',
            'start_date'   => 'nullable|date',
            'deadline'     => 'nullable|date',
            'amount'       => 'nullable|integer',
            'notes'        => 'nullable|string',
            'assigned_to'  => 'nullable|string',
        ]);
        $project->update($data);
        return back();
    }

    public function destroyProjet(\App\Models\Project $project)
    {
        $project->delete();
        return back();
    }

    public function updateProjetStatus(\Illuminate\Http\Request $request, \App\Models\Project $project)
    {
        $project->update(['status' => $request->status]);
        return back();
    }

    // ── Factures ────────────────────────────────────────────────
    public function factures()
    {
        return Inertia::render('Dashboard/Factures', [
            'admin'    => session('admin'),
            'factures' => Facture::orderBy('issued_date', 'desc')->get(),
        ]);
    }

    public function storeFacture(Request $request)
    {
        $year  = now()->year;
        $count = Facture::whereYear('created_at', $year)->count() + 1;
        $numero = 'KL-' . $year . '-' . str_pad($count, 3, '0', STR_PAD_LEFT);

        Facture::create([
            'numero'       => $numero,
            'client_name'  => $request->client_name,
            'client_email' => $request->client_email,
            'description'  => $request->description,
            'amount'       => $request->amount,
            'status'       => $request->status ?? 'en_attente',
            'issued_date'  => $request->issued_date ?? now()->toDateString(),
            'due_date'     => $request->due_date,
            'project_id'   => $request->project_id,
        ]);
        return back();
    }

    public function updateFacture(Request $request, Facture $facture)
    {
        $facture->update($request->only([
            'client_name', 'client_email', 'description',
            'amount', 'status', 'issued_date', 'due_date', 'project_id',
        ]));
        return back();
    }

    public function destroyFacture(Facture $facture)
    {
        $facture->delete();
        return back();
    }
}
