<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Portfolio;
use App\Models\Service;
use App\Models\Site;
use App\Models\TeamMember;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Index', [
            'admin'          => session('admin'),
            'portfolioCount' => Portfolio::count(),
            'servicesCount'  => Service::count(),
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

    // ── Team Members (CV) ──────────────────────────────────────
    public function team()
    {
        $admin = session('admin');
        $slug  = $admin['slug'] ?? null;

        // Chaque admin ne voit que son propre CV
        $members = $slug
            ? TeamMember::where('slug', $slug)->get()
            : collect();

        return Inertia::render('Dashboard/Team', [
            'admin'   => $admin,
            'members' => $members,
        ]);
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
}
