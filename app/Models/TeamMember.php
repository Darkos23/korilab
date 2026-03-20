<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'slug', 'name', 'role', 'rank', 'initials',
        'gradient', 'rank_bg', 'rank_text', 'rank_border',
        'location', 'phone', 'email', 'theme', 'shadow_title', 'summary',
        'skills', 'experience', 'education', 'languages', 'soft_skills', 'interests',
    ];

    protected $casts = [
        'skills'      => 'array',
        'experience'  => 'array',
        'education'   => 'array',
        'languages'   => 'array',
        'soft_skills' => 'array',
        'interests'   => 'array',
    ];

    // Expose camelCase aliases for the frontend
    protected $appends = [
        'rankBg', 'rankText', 'rankBorder', 'shadowTitle', 'softSkills',
    ];

    public function getRankBgAttribute()     { return $this->attributes['rank_bg']     ?? null; }
    public function getRankTextAttribute()   { return $this->attributes['rank_text']   ?? null; }
    public function getRankBorderAttribute() { return $this->attributes['rank_border'] ?? null; }
    public function getShadowTitleAttribute(){ return $this->attributes['shadow_title'] ?? null; }
    public function getSoftSkillsAttribute() {
        $val = $this->attributes['soft_skills'] ?? null;
        return $val ? json_decode($val, true) : [];
    }
}
