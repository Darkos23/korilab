<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: Arial, Helvetica, sans-serif; font-size:9.5pt; background:#060d1a; color:#c8d8f0; }

/* ── LAYOUT ── */
table.root { width:100%; border-collapse:collapse; }
td.sidebar { width:31%; background:#0a1628; vertical-align:top; padding:0; border-right:1px solid #1a3050; }
td.main    { vertical-align:top; background:#060d1a; }

/* ── SIDEBAR ── */
.sb-hero { background:#0d1f3c; padding:24px 14px 18px; border-bottom:2px solid #00c8ff; }
.sb-glyph {
  width:48px; height:48px; border-radius:50%;
  background:#060d1a; border:2px solid #00c8ff;
  text-align:center; line-height:48px;
  font-size:16pt; font-weight:900; color:#00c8ff;
  margin:0 auto 10px; display:table;
}
.sb-name  { font-size:10.5pt; font-weight:900; color:#fff; text-align:center; }
.sb-titre { font-size:6.5pt; color:#00c8ff; text-align:center; text-transform:uppercase; letter-spacing:0.18em; margin-top:4px; opacity:0.8; }

.sb-body { padding:16px 13px; }
.sb-sec {
  font-size:6.5pt; font-weight:700; color:#00c8ff;
  text-transform:uppercase; letter-spacing:0.22em;
  border-bottom:1px solid rgba(0,200,255,0.2);
  padding-bottom:4px; margin-bottom:8px; margin-top:18px;
}
.sb-sec:first-child { margin-top:0; }

.sb-label   { font-size:6pt; color:rgba(0,200,255,0.55); text-transform:uppercase; letter-spacing:0.1em; margin-top:6px; }
.sb-contact { color:rgba(200,216,240,0.7); font-size:7.5pt; margin-top:1px; word-break:break-all; }

.skill-tag {
  display:inline-block;
  background:rgba(0,200,255,0.1);
  color:#00c8ff; font-size:7pt; font-weight:700;
  padding:2.5px 7px; border-radius:3px;
  border:1px solid rgba(0,200,255,0.25);
  margin:0 2px 4px 0;
}

.lang-name  { color:rgba(200,216,240,0.9); font-size:8pt; font-weight:600; }
.lang-level { color:rgba(0,200,255,0.6); font-size:7pt; }
.lang-row   { margin-bottom:5px; }

/* ── MAIN ── */
.main-wrap { padding:26px 22px; }

.main-header {
  border-left:4px solid #00c8ff;
  padding:12px 16px;
  background:#0a1628;
  margin-bottom:22px;
}
.main-name   { font-size:22pt; font-weight:900; color:#fff; letter-spacing:-0.5px; line-height:1; }
.main-titre  { font-size:8pt; color:#00c8ff; text-transform:uppercase; letter-spacing:0.18em; margin-top:5px; opacity:0.85; }

.sec {
  font-size:6.5pt; font-weight:700; color:#00c8ff;
  text-transform:uppercase; letter-spacing:0.22em;
  margin-bottom:10px; margin-top:20px;
  display:table; width:100%;
}
.sec:first-child { margin-top:0; }
.sec-rule { height:1px; background:rgba(0,200,255,0.15); margin-bottom:12px; }

.resume-text { font-size:9pt; color:rgba(200,216,240,0.7); line-height:1.65; }

/* Timeline */
table.exp { width:100%; border-collapse:collapse; margin-bottom:12px; }
.tl-dot-cell { width:18px; vertical-align:top; padding-top:3px; }
.tl-dot {
  width:8px; height:8px; border-radius:50%;
  background:#00c8ff; border:2px solid #060d1a;
  display:inline-block;
}
.exp-role    { font-size:10pt; font-weight:800; color:#fff; }
.exp-company { font-size:8.5pt; color:#00c8ff; font-weight:600; margin-top:2px; }
.exp-period  {
  display:inline-block; background:rgba(0,200,255,0.1);
  border:1px solid rgba(0,200,255,0.22);
  color:rgba(0,200,255,0.8); font-size:7pt;
  padding:1.5px 6px; border-radius:3px; margin-top:3px;
}
.exp-desc    { font-size:8pt; color:rgba(200,216,240,0.55); margin-top:4px; line-height:1.55; }

.form-role   { font-size:9.5pt; font-weight:700; color:#fff; }
.form-school { font-size:8pt; color:#00c8ff; margin-top:2px; opacity:0.8; }
.form-block  { margin-bottom:9px; padding-left:18px; }
</style>
</head>
<body>
<table class="root"><tr>

<td class="sidebar">
  <div class="sb-hero">
    <div class="sb-glyph">{{ strtoupper(substr($data['prenom'],0,1)) }}</div>
    <div class="sb-name">{{ $data['prenom'] }} {{ $data['nom'] }}</div>
    @if($data['titre'])<div class="sb-titre">{{ $data['titre'] }}</div>@endif
  </div>
  <div class="sb-body">
    @if($data['email']||$data['telephone']||$data['localisation']||$data['portfolio'])
    <div class="sb-sec">Contact</div>
    @if($data['email'])<div class="sb-label">Email</div><div class="sb-contact">{{ $data['email'] }}</div>@endif
    @if($data['telephone'])<div class="sb-label">Téléphone</div><div class="sb-contact">{{ $data['telephone'] }}</div>@endif
    @if($data['localisation'])<div class="sb-label">Localisation</div><div class="sb-contact">{{ $data['localisation'] }}</div>@endif
    @if($data['portfolio'])<div class="sb-label">Portfolio</div><div class="sb-contact">{{ $data['portfolio'] }}</div>@endif
    @endif

    @if(count($data['competences'])>0)
    <div class="sb-sec">Stack</div>
    <div>
      @foreach($data['competences'] as $skill)
      <span class="skill-tag">{{ $skill }}</span>
      @endforeach
    </div>
    @endif

    @if(count(array_filter($data['langues'],fn($l)=>!empty($l['langue'])))>0)
    <div class="sb-sec">Langues</div>
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
  <div class="sec">Profil</div>
  <div class="sec-rule"></div>
  <div class="resume-text">{{ $data['resume'] }}</div>
  @endif

  @if(count(array_filter($data['experiences'],fn($e)=>!empty($e['poste'])||!empty($e['entreprise'])))>0)
  <div class="sec">Expériences</div>
  <div class="sec-rule"></div>
  @foreach($data['experiences'] as $exp)
    @if(!empty($exp['poste'])||!empty($exp['entreprise']))
    <table class="exp"><tr>
      <td class="tl-dot-cell"><span class="tl-dot"></span></td>
      <td>
        <div class="exp-role">{{ $exp['poste']??'' }}</div>
        <div class="exp-company">{{ $exp['entreprise']??'' }}</div>
        @if(!empty($exp['periode']))<div class="exp-period">{{ $exp['periode'] }}</div>@endif
        @if(!empty($exp['description']))<div class="exp-desc">{{ $exp['description'] }}</div>@endif
      </td>
    </tr></table>
    @endif
  @endforeach
  @endif

  @if(count(array_filter($data['formations'],fn($f)=>!empty($f['diplome'])||!empty($f['etablissement'])))>0)
  <div class="sec">Formation</div>
  <div class="sec-rule"></div>
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

</tr></table>
</body>
</html>
