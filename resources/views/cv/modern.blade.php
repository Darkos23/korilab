<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: Arial, Helvetica, sans-serif; font-size:9.5pt; background:#f0f4ff; color:#0a0a1a; }

/* ── HEADER BLOC PLEINE LARGEUR ── */
.hero {
  background:#0057ff;
  padding:30px 28px 0;
  position:relative;
}
.hero-name  { font-size:28pt; font-weight:900; color:#fff; letter-spacing:-1px; line-height:0.95; }
.hero-titre {
  font-size:8.5pt; color:rgba(255,255,255,0.75);
  text-transform:uppercase; letter-spacing:0.2em;
  font-weight:500; margin-top:7px;
}
/* Bandeau blanc coupé en biais via table */
table.hero-bar { width:100%; border-collapse:collapse; margin-top:16px; }
.hero-bar-left  { background:#fff; padding:10px 28px; width:70%; }
.hero-bar-right { background:#003cc7; padding:10px 14px; }
.contact-item  { display:inline-block; font-size:7.5pt; color:#0057ff; font-weight:600; margin-right:16px; }
.contact-label { font-size:6pt; color:#9a9ab0; display:block; text-transform:uppercase; letter-spacing:0.08em; }

/* ── BODY ── */
table.body-wrap { width:100%; border-collapse:collapse; }
td.col-main  { width:64%; padding:22px 24px; vertical-align:top; background:#fff; border-right:1px solid #e8eaf0; }
td.col-aside { padding:22px 18px; vertical-align:top; background:#f0f4ff; }

/* ── SECTION TITLES ── */
.sec { font-size:7pt; font-weight:800; color:#0057ff; text-transform:uppercase; letter-spacing:0.22em; margin-bottom:10px; margin-top:20px; }
.sec:first-child { margin-top:0; }
.sec-line { height:2px; background:#0057ff; margin-bottom:10px; width:32px; }

/* ── EXPÉRIENCES ── */
table.exp { width:100%; border-collapse:collapse; margin-bottom:12px; }
.exp-role    { font-size:10pt; font-weight:800; color:#0a0a1a; }
.exp-badge   {
  display:inline-block; background:#0057ff; color:#fff;
  font-size:6.5pt; font-weight:700; padding:2px 7px; border-radius:3px;
  margin-left:6px; vertical-align:middle; letter-spacing:0.04em;
}
.exp-company { font-size:8.5pt; color:#0057ff; font-weight:700; margin-top:3px; }
.exp-period  { font-size:7.5pt; color:#9a9ab0; text-align:right; white-space:nowrap; vertical-align:top; padding-top:2px; }
.exp-desc    { font-size:8pt; color:#4a4a6a; margin-top:4px; line-height:1.6; }

.form-role   { font-size:9.5pt; font-weight:700; color:#0a0a1a; }
.form-school { font-size:8pt; color:#0057ff; font-weight:600; margin-top:2px; }
.form-block  { margin-bottom:9px; }

.resume-text { font-size:9pt; color:#4a4a6a; line-height:1.65; }

/* ── ASIDE ── */
.skill-pill {
  display:inline-block; background:#0057ff; color:#fff;
  font-size:7pt; font-weight:700; padding:3px 8px;
  border-radius:20px; margin:0 3px 5px 0;
}

.lang-name  { font-size:8.5pt; font-weight:700; color:#0a0a1a; }
.lang-level { font-size:7pt; color:#9a9ab0; margin-bottom:2px; }
.lang-bar   { background:#dde3f0; height:4px; border-radius:2px; margin-bottom:8px; margin-top:3px; }
.lang-fill  { height:4px; border-radius:2px; background:#0057ff; }

.aside-num { font-size:20pt; font-weight:900; color:#0057ff; line-height:1; }
.aside-num-label { font-size:7pt; color:#9a9ab0; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:12px; }
</style>
</head>
<body>

<!-- HERO -->
<div class="hero">
  <div class="hero-name">{{ $data['prenom'] }}<br>{{ $data['nom'] }}</div>
  @if($data['titre'])<div class="hero-titre">{{ $data['titre'] }}</div>@endif
  <table class="hero-bar"><tr>
    <td class="hero-bar-left">
      @if($data['email'])<span class="contact-item"><span class="contact-label">Email</span>{{ $data['email'] }}</span>@endif
      @if($data['telephone'])<span class="contact-item"><span class="contact-label">Tél</span>{{ $data['telephone'] }}</span>@endif
      @if($data['localisation'])<span class="contact-item"><span class="contact-label">Lieu</span>{{ $data['localisation'] }}</span>@endif
    </td>
    <td class="hero-bar-right">
      @if($data['portfolio'])<span style="color:rgba(255,255,255,0.7);font-size:7pt;">{{ $data['portfolio'] }}</span>@endif
    </td>
  </tr></table>
</div>

<!-- BODY -->
<table class="body-wrap"><tr>

<td class="col-main">
  @if($data['resume'])
  <div class="sec">À propos</div>
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
        <div class="exp-role">{{ $exp['poste']??'' }}
          @if(!empty($exp['periode']))<span class="exp-badge">{{ $exp['periode'] }}</span>@endif
        </div>
        <div class="exp-company">{{ $exp['entreprise']??'' }}</div>
        @if(!empty($exp['description']))<div class="exp-desc">{{ $exp['description'] }}</div>@endif
      </td>
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
      <div class="form-school">{{ $f['etablissement']??'' }}@if(!empty($f['annee'])) — {{ $f['annee'] }}@endif</div>
    </div>
    @endif
  @endforeach
  @endif
</td>

<td class="col-aside">
  @if(count($data['competences'])>0)
  <div class="sec">Compétences</div>
  <div class="sec-line"></div>
  <div style="margin-bottom:16px;">
    @foreach($data['competences'] as $skill)
    <span class="skill-pill">{{ $skill }}</span>
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
    <div class="lang-bar"><div class="lang-fill" style="width:{{ $w }};"></div></div>
    @endif
  @endforeach
  @endif
</td>

</tr></table>
</body>
</html>
