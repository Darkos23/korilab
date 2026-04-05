<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: Arial, Helvetica, sans-serif; font-size:9.5pt; color:#1a1a2e; background:#fff; }

/* ── LAYOUT ── */
table.root { width:100%; border-collapse:collapse; height:100%; }
td.sidebar { width:30%; background:#1a1a2e; vertical-align:top; padding:0; }
td.main    { vertical-align:top; padding:0; }

/* ── SIDEBAR ── */
.sb-top { background:#c9a84c; padding:28px 16px 20px; }
.sb-initial {
  width:52px; height:52px; border-radius:50%;
  background:#1a1a2e; border:2.5px solid rgba(255,255,255,0.4);
  text-align:center; line-height:52px;
  font-size:18pt; font-weight:900; color:#c9a84c;
  margin:0 auto 12px;
  display:table;
}
.sb-name  { font-size:11.5pt; font-weight:900; color:#1a1a2e; text-align:center; letter-spacing:-0.3px; }
.sb-titre { font-size:7pt; color:rgba(26,26,46,0.65); text-align:center; text-transform:uppercase; letter-spacing:0.12em; margin-top:4px; }

.sb-body { padding:18px 14px; }
.sb-section {
  font-size:6.5pt; font-weight:700; color:#c9a84c;
  text-transform:uppercase; letter-spacing:0.2em;
  padding-bottom:4px; margin-bottom:8px; margin-top:18px;
  border-bottom:1px solid rgba(201,168,76,0.3);
}
.sb-section:first-child { margin-top:0; }

.sb-contact { color:rgba(255,255,255,0.6); font-size:7.5pt; margin-bottom:4px; word-break:break-all; }
.sb-contact-label { color:rgba(201,168,76,0.8); font-size:6pt; text-transform:uppercase; letter-spacing:0.1em; }

.skill-row { display:table; width:100%; margin-bottom:5px; }
.skill-name { display:table-cell; color:rgba(255,255,255,0.8); font-size:7.5pt; }
.skill-bar-bg { display:table-cell; width:50%; vertical-align:middle; padding-left:6px; }
.skill-bar-wrap { background:rgba(255,255,255,0.1); height:3px; border-radius:2px; }
.skill-bar-fill { height:3px; border-radius:2px; background:#c9a84c; }

.lang-name  { color:rgba(255,255,255,0.85); font-size:8pt; font-weight:600; }
.lang-level { color:rgba(201,168,76,0.7); font-size:7pt; }
.lang-row   { margin-bottom:5px; }

/* ── MAIN ── */
.main-wrap { padding:28px 24px 24px; }

.main-header { border-bottom:3px solid #c9a84c; padding-bottom:14px; margin-bottom:20px; }
.main-name   { font-size:24pt; font-weight:900; color:#1a1a2e; letter-spacing:-0.8px; line-height:1; }
.main-titre  { font-size:9pt; color:#c9a84c; font-weight:700; text-transform:uppercase; letter-spacing:0.15em; margin-top:5px; }

.section-title {
  font-size:7pt; font-weight:700; color:#1a1a2e;
  text-transform:uppercase; letter-spacing:0.22em;
  border-bottom:2px solid #1a1a2e;
  padding-bottom:4px; margin-bottom:12px; margin-top:22px;
}
.section-title:first-child { margin-top:0; }

.resume-text { font-size:9pt; color:#4a4a6a; line-height:1.65; }

table.exp { width:100%; border-collapse:collapse; margin-bottom:10px; }
.exp-role    { font-size:10pt; font-weight:800; color:#1a1a2e; }
.exp-company { font-size:8.5pt; color:#c9a84c; font-weight:700; margin-top:2px; }
.exp-period  { font-size:7.5pt; color:#9a9ab0; text-align:right; white-space:nowrap; vertical-align:top; }
.exp-desc    { font-size:8pt; color:#4a4a6a; margin-top:4px; line-height:1.55; }

.form-role   { font-size:9.5pt; font-weight:700; color:#1a1a2e; }
.form-school { font-size:8pt; color:#c9a84c; font-weight:600; margin-top:2px; }
.form-block  { margin-bottom:9px; }

/* Dot accent decoratif */
.dot { display:inline-block; width:5px; height:5px; border-radius:50%; background:#c9a84c; vertical-align:middle; margin-right:6px; }
</style>
</head>
<body>
<table class="root">
<tr>
<td class="sidebar">
  <div class="sb-top">
    <div class="sb-initial">{{ strtoupper(substr($data['prenom'],0,1)) }}</div>
    <div class="sb-name">{{ $data['prenom'] }} {{ $data['nom'] }}</div>
    @if($data['titre'])<div class="sb-titre">{{ $data['titre'] }}</div>@endif
  </div>
  <div class="sb-body">
    @if($data['email']||$data['telephone']||$data['localisation']||$data['portfolio'])
    <div class="sb-section">Contact</div>
    @if($data['email'])<div class="sb-contact-label">Email</div><div class="sb-contact">{{ $data['email'] }}</div>@endif
    @if($data['telephone'])<div class="sb-contact-label" style="margin-top:6px;">Téléphone</div><div class="sb-contact">{{ $data['telephone'] }}</div>@endif
    @if($data['localisation'])<div class="sb-contact-label" style="margin-top:6px;">Localisation</div><div class="sb-contact">{{ $data['localisation'] }}</div>@endif
    @if($data['portfolio'])<div class="sb-contact-label" style="margin-top:6px;">Portfolio</div><div class="sb-contact">{{ $data['portfolio'] }}</div>@endif
    @endif

    @if(count($data['competences'])>0)
    <div class="sb-section">Compétences</div>
    @foreach($data['competences'] as $skill)
    <div class="skill-row">
      <div class="skill-name">{{ $skill }}</div>
    </div>
    @endforeach
    @endif

    @if(count(array_filter($data['langues'],fn($l)=>!empty($l['langue'])))>0)
    <div class="sb-section">Langues</div>
    @foreach($data['langues'] as $l)
      @if(!empty($l['langue']))
      <div class="lang-row">
        <div class="lang-name">{{ $l['langue'] }}</div>
        <div class="lang-level">{{ $l['niveau']??'' }}</div>
      </div>
      @endif
    @endforeach
    @endif
  </div>
</td>

<td class="main">
<div class="main-wrap">
  <div class="main-header">
    <div class="main-name">{{ $data['prenom'] }}<br>{{ $data['nom'] }}</div>
    @if($data['titre'])<div class="main-titre">{{ $data['titre'] }}</div>@endif
  </div>

  @if($data['resume'])
  <div class="section-title">Profil</div>
  <div class="resume-text">{{ $data['resume'] }}</div>
  @endif

  @if(count(array_filter($data['experiences'],fn($e)=>!empty($e['poste'])||!empty($e['entreprise'])))>0)
  <div class="section-title">Expériences</div>
  @foreach($data['experiences'] as $exp)
    @if(!empty($exp['poste'])||!empty($exp['entreprise']))
    <table class="exp"><tr>
      <td>
        <div class="exp-role"><span class="dot"></span>{{ $exp['poste']??'' }}</div>
        <div class="exp-company">{{ $exp['entreprise']??'' }}</div>
        @if(!empty($exp['description']))<div class="exp-desc">{{ $exp['description'] }}</div>@endif
      </td>
      @if(!empty($exp['periode']))<td class="exp-period">{{ $exp['periode'] }}</td>@endif
    </tr></table>
    @endif
  @endforeach
  @endif

  @if(count(array_filter($data['formations'],fn($f)=>!empty($f['diplome'])||!empty($f['etablissement'])))>0)
  <div class="section-title">Formation</div>
  @foreach($data['formations'] as $f)
    @if(!empty($f['diplome'])||!empty($f['etablissement']))
    <div class="form-block">
      <div class="form-role">{{ $f['diplome']??'' }}</div>
      <div class="form-school">{{ $f['etablissement']??'' }}@if(!empty($f['annee'])) · {{ $f['annee'] }}@endif</div>
    </div>
    @endif
  @endforeach
  @endif
</div>
</td>
</tr>
</table>
</body>
</html>
