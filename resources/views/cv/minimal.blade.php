<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 10pt; color: #111827;
    background: #fff;
    padding: 32px 36px;
  }

  /* Header typographique */
  .name { font-size: 28pt; font-weight: 700; color: #111; letter-spacing: -0.5px; line-height: 1; }
  .titre { font-size: 9pt; color: #6366f1; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase; margin-top: 5px; font-family: Arial, sans-serif; }
  .contact-row { margin-top: 8px; font-size: 8pt; color: #6b7280; font-family: Arial, sans-serif; }
  .contact-sep { color: #d1d5db; margin: 0 6px; }
  .header-rule { border: none; border-top: 1.5px solid #111; margin: 12px 0 20px; }

  /* Sections */
  .section-title {
    font-size: 7.5pt; font-weight: 400; color: #6366f1;
    text-transform: uppercase; letter-spacing: 0.25em;
    margin-bottom: 8px; margin-top: 20px;
    font-family: Arial, sans-serif;
  }
  .section-title:first-child { margin-top: 0; }

  /* Expériences — grille via table */
  table.exp-table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
  .exp-role { font-size: 10pt; font-weight: 700; color: #111; font-family: Georgia, serif; }
  .exp-company { font-size: 8.5pt; color: #6366f1; font-style: italic; margin-top: 1px; }
  .exp-period { font-size: 8pt; color: #9ca3af; white-space: nowrap; text-align: right; vertical-align: top; padding-top: 1px; }
  .exp-desc { font-size: 8.5pt; color: #6b7280; margin-top: 3px; line-height: 1.6; font-family: Georgia, serif; }

  .form-role { font-size: 10pt; font-weight: 700; color: #111; font-family: Georgia, serif; }
  .form-school { font-size: 8.5pt; color: #6366f1; font-style: italic; margin-top: 1px; }
  .form-block { margin-bottom: 8px; }

  .resume-text { font-size: 9pt; color: #374151; line-height: 1.7; font-family: Georgia, serif; }

  /* Two-col bottom */
  table.bottom { width: 100%; border-collapse: collapse; margin-top: 20px; }
  td.col-skills { width: 55%; vertical-align: top; padding-right: 20px; }
  td.col-right { vertical-align: top; }

  .skills-text { font-size: 9pt; color: #374151; line-height: 1.9; }
  .skills-sep { color: #6366f1; }

  .lang-row { font-size: 9pt; color: #374151; margin-bottom: 4px; }
  .lang-level { color: #9ca3af; }
</style>
</head>
<body>

<div class="name">{{ $data['prenom'] }} {{ $data['nom'] }}</div>
@if($data['titre'])<div class="titre">{{ $data['titre'] }}</div>@endif

<div class="contact-row">
  @php $contacts = array_filter([$data['email'], $data['telephone'], $data['localisation'], $data['portfolio']]); @endphp
  {{ implode(' · ', $contacts) }}
</div>

<hr class="header-rule">

@if($data['resume'])
<div class="section-title">Profil</div>
<div class="resume-text">{{ $data['resume'] }}</div>
@endif

@if(count(array_filter($data['experiences'], fn($e) => !empty($e['poste']) || !empty($e['entreprise']))) > 0)
<div class="section-title">Expériences</div>
@foreach($data['experiences'] as $exp)
  @if(!empty($exp['poste']) || !empty($exp['entreprise']))
  <table class="exp-table">
    <tr>
      <td>
        <div class="exp-role">{{ $exp['poste'] ?? '' }}</div>
        <div class="exp-company">{{ $exp['entreprise'] ?? '' }}</div>
      </td>
      @if(!empty($exp['periode']))<td class="exp-period">{{ $exp['periode'] }}</td>@endif
    </tr>
    @if(!empty($exp['description']))
    <tr><td colspan="2"><div class="exp-desc">{{ $exp['description'] }}</div></td></tr>
    @endif
  </table>
  @endif
@endforeach
@endif

@if(count(array_filter($data['formations'], fn($f) => !empty($f['diplome']) || !empty($f['etablissement']))) > 0)
<div class="section-title">Formation</div>
@foreach($data['formations'] as $form)
  @if(!empty($form['diplome']) || !empty($form['etablissement']))
  <div class="form-block">
    <div class="form-role">{{ $form['diplome'] ?? '' }}@if(!empty($form['annee'])), {{ $form['annee'] }}@endif</div>
    <div class="form-school">{{ $form['etablissement'] ?? '' }}</div>
  </div>
  @endif
@endforeach
@endif

@if(count($data['competences']) > 0 || count(array_filter($data['langues'], fn($l) => !empty($l['langue']))) > 0)
<table class="bottom">
<tr>
  @if(count($data['competences']) > 0)
  <td class="col-skills">
    <div class="section-title">Compétences</div>
    <div class="skills-text">
      @foreach($data['competences'] as $i => $skill)
        {{ $skill }}@if(!$loop->last)<span class="skills-sep"> · </span>@endif
      @endforeach
    </div>
  </td>
  @endif

  @if(count(array_filter($data['langues'], fn($l) => !empty($l['langue']))) > 0)
  <td class="col-right">
    <div class="section-title">Langues</div>
    @foreach($data['langues'] as $lang)
      @if(!empty($lang['langue']))
      <div class="lang-row">{{ $lang['langue'] }} <span class="lang-level">— {{ $lang['niveau'] ?? '' }}</span></div>
      @endif
    @endforeach
  </td>
  @endif
</tr>
</table>
@endif

</body>
</html>
