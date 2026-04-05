<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: Arial, Helvetica, sans-serif; font-size:9.5pt; background:#fff; color:#111; padding:36px 42px; }

/* ── HEADER ── */
.header-table { width:100%; border-collapse:collapse; margin-bottom:0; }
.header-left  { vertical-align:bottom; padding-bottom:16px; }
.header-right { text-align:right; vertical-align:bottom; padding-bottom:16px; width:38%; }

.name-first { font-size:32pt; font-weight:900; color:#111; letter-spacing:-1px; line-height:0.9; display:block; }
.name-last  { font-size:32pt; font-weight:200; color:#111; letter-spacing:-1px; line-height:0.9; display:block; }
.titre { font-size:9pt; color:#6366f1; font-weight:700; text-transform:uppercase; letter-spacing:0.25em; margin-top:10px; display:block; }

.contact-block { text-align:right; }
.contact-line  { font-size:7.5pt; color:#6b7280; margin-bottom:3px; display:block; }
.contact-label { font-size:6pt; color:#6366f1; text-transform:uppercase; letter-spacing:0.12em; font-weight:700; display:block; }

/* Ligne séparatrice double */
.rule-wrap { margin:0 0 22px; }
.rule-top    { height:3px; background:#111; }
.rule-bottom { height:1px; background:#111; margin-top:3px; }

/* ── DEUX COLONNES ── */
table.cols { width:100%; border-collapse:collapse; }
td.col-left  { width:63%; vertical-align:top; padding-right:28px; border-right:1px solid #e5e7eb; }
td.col-right { vertical-align:top; padding-left:24px; }

/* ── SECTIONS ── */
.sec {
  font-size:6.5pt; font-weight:700; color:#6366f1;
  text-transform:uppercase; letter-spacing:0.28em;
  margin-bottom:4px; margin-top:22px;
}
.sec:first-child { margin-top:0; }
.sec-line { height:1px; background:#e5e7eb; margin-bottom:12px; }

.resume-text { font-size:9pt; color:#374151; line-height:1.7; }

/* Expériences */
table.exp { width:100%; border-collapse:collapse; margin-bottom:13px; }
.exp-role    { font-size:10.5pt; font-weight:800; color:#111; }
.exp-company { font-size:8.5pt; color:#6366f1; font-weight:600; font-style:italic; margin-top:2px; }
.exp-period  { font-size:7.5pt; color:#9ca3af; text-align:right; white-space:nowrap; vertical-align:top; padding-top:2px; }
.exp-desc    { font-size:8pt; color:#6b7280; margin-top:5px; line-height:1.65; }

.form-role   { font-size:9.5pt; font-weight:700; color:#111; }
.form-school { font-size:8pt; color:#6366f1; font-style:italic; margin-top:2px; }
.form-block  { margin-bottom:10px; }

/* Compétences — liste simple avec accent */
.skill-item { font-size:9pt; color:#374151; padding:3px 0; border-bottom:1px solid #f3f4f6; }
.skill-bullet { color:#6366f1; font-weight:900; margin-right:6px; }

/* Langues */
.lang-name  { font-size:9pt; font-weight:700; color:#111; }
.lang-level { font-size:7.5pt; color:#9ca3af; margin-bottom:2px; }
.lang-bar-bg { background:#f3f4f6; height:3px; border-radius:2px; margin-bottom:10px; margin-top:3px; }
.lang-bar    { height:3px; border-radius:2px; background:#6366f1; }
</style>
</head>
<body>

<!-- HEADER -->
<table class="header-table"><tr>
  <td class="header-left">
    <span class="name-first">{{ strtoupper($data['prenom']) }}</span>
    <span class="name-last">{{ strtoupper($data['nom']) }}</span>
    @if($data['titre'])<span class="titre">{{ $data['titre'] }}</span>@endif
  </td>
  <td class="header-right">
    <div class="contact-block">
      @if($data['email'])<span class="contact-label">Email</span><span class="contact-line">{{ $data['email'] }}</span>@endif
      @if($data['telephone'])<span class="contact-label">Téléphone</span><span class="contact-line">{{ $data['telephone'] }}</span>@endif
      @if($data['localisation'])<span class="contact-label">Localisation</span><span class="contact-line">{{ $data['localisation'] }}</span>@endif
      @if($data['portfolio'])<span class="contact-label">Portfolio</span><span class="contact-line">{{ $data['portfolio'] }}</span>@endif
    </div>
  </td>
</tr></table>

<div class="rule-wrap">
  <div class="rule-top"></div>
  <div class="rule-bottom"></div>
</div>

<!-- COLONNES -->
<table class="cols"><tr>

<td class="col-left">
  @if($data['resume'])
  <div class="sec">Profil</div>
  <div class="sec-line"></div>
  <div class="resume-text">{{ $data['resume'] }}</div>
  @endif

  @if(count(array_filter($data['experiences'],fn($e)=>!empty($e['poste'])||!empty($e['entreprise'])))>0)
  <div class="sec">Expériences</div>
  <div class="sec-line"></div>
  @foreach($data['experiences'] as $exp)
    @if(!empty($exp['poste'])||!empty($exp['entreprise']))
    <table class="exp"><tr>
      <td>
        <div class="exp-role">{{ $exp['poste']??'' }}</div>
        <div class="exp-company">{{ $exp['entreprise']??'' }}</div>
        @if(!empty($exp['description']))<div class="exp-desc">{{ $exp['description'] }}</div>@endif
      </td>
      @if(!empty($exp['periode']))<td class="exp-period">{{ $exp['periode'] }}</td>@endif
    </tr></table>
    @endif
  @endforeach
  @endif

  @if(count(array_filter($data['formations'],fn($f)=>!empty($f['diplome'])||!empty($f['etablissement'])))>0)
  <div class="sec">Formation</div>
  <div class="sec-line"></div>
  @foreach($data['formations'] as $f)
    @if(!empty($f['diplome'])||!empty($f['etablissement']))
    <div class="form-block">
      <div class="form-role">{{ $f['diplome']??'' }}</div>
      <div class="form-school">{{ $f['etablissement']??'' }}@if(!empty($f['annee'])), {{ $f['annee'] }}@endif</div>
    </div>
    @endif
  @endforeach
  @endif
</td>

<td class="col-right">
  @if(count($data['competences'])>0)
  <div class="sec">Compétences</div>
  <div class="sec-line"></div>
  <div style="margin-bottom:18px;">
    @foreach($data['competences'] as $skill)
    <div class="skill-item"><span class="skill-bullet">+</span>{{ $skill }}</div>
    @endforeach
  </div>
  @endif

  @if(count(array_filter($data['langues'],fn($l)=>!empty($l['langue'])))>0)
  <div class="sec">Langues</div>
  <div class="sec-line"></div>
  @foreach($data['langues'] as $l)
    @if(!empty($l['langue']))
    @php $w = match($l['niveau']??'') { 'Bilingue/Natif'=>'100%','Courant'=>'80%','Intermédiaire'=>'55%',default=>'30%' }; @endphp
    <div class="lang-name">{{ $l['langue'] }}</div>
    <div class="lang-level">{{ $l['niveau']??'' }}</div>
    <div class="lang-bar-bg"><div class="lang-bar" style="width:{{ $w }};"></div></div>
    @endif
  @endforeach
  @endif
</td>

</tr></table>
</body>
</html>
