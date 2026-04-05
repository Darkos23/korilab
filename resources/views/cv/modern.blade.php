<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 10pt; color: #0f172a; background: #f8fafc; }

  /* Header pleine largeur */
  .header {
    background: #0ea5e9;
    padding: 24px 24px 18px;
  }
  .header-name { font-size: 26pt; font-weight: 900; color: #fff; letter-spacing: -0.5px; line-height: 1; }
  .header-title { font-size: 9pt; color: rgba(255,255,255,0.85); margin-top: 4px; font-weight: 500; letter-spacing: 0.06em; }
  .chips { margin-top: 10px; }
  .chip {
    display: inline-block;
    background: rgba(255,255,255,0.2);
    color: #fff;
    font-size: 7.5pt;
    padding: 2px 8px;
    border-radius: 20px;
    margin-right: 5px;
    margin-top: 3px;
  }

  /* Body : deux colonnes via table */
  table.body { width: 100%; border-collapse: collapse; }
  td.left { width: 62%; padding: 18px 16px 18px 20px; vertical-align: top; border-right: 1px solid #e2e8f0; }
  td.right { padding: 18px 16px 18px 14px; vertical-align: top; }

  .section-title {
    font-size: 8pt; font-weight: 800; color: #0ea5e9;
    text-transform: uppercase; letter-spacing: 0.12em;
    border-left: 3px solid #0ea5e9; padding-left: 7px;
    margin-bottom: 10px; margin-top: 16px;
  }
  .section-title:first-child { margin-top: 0; }

  .exp-role { font-size: 9.5pt; font-weight: 800; color: #0f172a; }
  .exp-company { font-size: 8.5pt; font-weight: 600; color: #0ea5e9; margin-top: 1px; }
  .exp-desc { font-size: 8pt; color: #64748b; margin-top: 3px; line-height: 1.5; }
  .exp-block { margin-bottom: 10px; }

  .form-role { font-size: 9pt; font-weight: 700; color: #0f172a; }
  .form-school { font-size: 8pt; color: #0ea5e9; margin-top: 1px; }
  .form-block { margin-bottom: 7px; }

  .resume-text { font-size: 8.5pt; color: #475569; line-height: 1.6; }

  /* Skills pills */
  .skill-pill {
    display: inline-block;
    background: rgba(14,165,233,0.1);
    color: #0ea5e9;
    font-size: 7.5pt; font-weight: 600;
    padding: 3px 7px; border-radius: 5px;
    margin: 0 3px 4px 0;
  }

  /* Language bar */
  .lang-block { margin-bottom: 7px; }
  .lang-row { display: block; }
  .lang-name { font-size: 8.5pt; font-weight: 600; color: #0f172a; }
  .lang-level { font-size: 7.5pt; color: #94a3b8; float: right; }
  .lang-bar-bg { background: #e2e8f0; height: 3px; border-radius: 2px; margin-top: 3px; }
  .lang-bar { height: 3px; background: #0ea5e9; border-radius: 2px; }
</style>
</head>
<body>

<div class="header">
  <div class="header-name">{{ $data['prenom'] }} {{ $data['nom'] }}</div>
  @if($data['titre'])<div class="header-title">{{ $data['titre'] }}</div>@endif
  <div class="chips">
    @if($data['email'])<span class="chip">{{ $data['email'] }}</span>@endif
    @if($data['telephone'])<span class="chip">{{ $data['telephone'] }}</span>@endif
    @if($data['localisation'])<span class="chip">{{ $data['localisation'] }}</span>@endif
    @if($data['portfolio'])<span class="chip">{{ $data['portfolio'] }}</span>@endif
  </div>
</div>

<table class="body">
<tr>
  <td class="left">
    @if($data['resume'])
    <div class="section-title">À propos</div>
    <div class="resume-text">{{ $data['resume'] }}</div>
    @endif

    @if(count(array_filter($data['experiences'], fn($e) => !empty($e['poste']) || !empty($e['entreprise']))) > 0)
    <div class="section-title">Expériences</div>
    @foreach($data['experiences'] as $exp)
      @if(!empty($exp['poste']) || !empty($exp['entreprise']))
      <div class="exp-block">
        <div class="exp-role">{{ $exp['poste'] ?? '' }}</div>
        <div class="exp-company">{{ $exp['entreprise'] ?? '' }}{{ !empty($exp['periode']) ? ' · '.$exp['periode'] : '' }}</div>
        @if(!empty($exp['description']))<div class="exp-desc">{{ $exp['description'] }}</div>@endif
      </div>
      @endif
    @endforeach
    @endif

    @if(count(array_filter($data['formations'], fn($f) => !empty($f['diplome']) || !empty($f['etablissement']))) > 0)
    <div class="section-title">Formation</div>
    @foreach($data['formations'] as $form)
      @if(!empty($form['diplome']) || !empty($form['etablissement']))
      <div class="form-block">
        <div class="form-role">{{ $form['diplome'] ?? '' }}</div>
        <div class="form-school">{{ $form['etablissement'] ?? '' }}{{ !empty($form['annee']) ? ' · '.$form['annee'] : '' }}</div>
      </div>
      @endif
    @endforeach
    @endif
  </td>

  <td class="right">
    @if(count($data['competences']) > 0)
    <div class="section-title">Compétences</div>
    <div style="margin-bottom: 14px;">
      @foreach($data['competences'] as $skill)
      <span class="skill-pill">{{ $skill }}</span>
      @endforeach
    </div>
    @endif

    @if(count(array_filter($data['langues'], fn($l) => !empty($l['langue']))) > 0)
    <div class="section-title">Langues</div>
    @foreach($data['langues'] as $lang)
      @if(!empty($lang['langue']))
      @php
        $width = match($lang['niveau'] ?? '') {
          'Bilingue/Natif' => '100%',
          'Courant'        => '80%',
          'Intermédiaire'  => '55%',
          default          => '30%',
        };
      @endphp
      <div class="lang-block">
        <div style="font-size:8.5pt; font-weight:600; color:#0f172a;">
          {{ $lang['langue'] }}
          <span style="font-size:7.5pt; color:#94a3b8; font-weight:400;"> · {{ $lang['niveau'] ?? '' }}</span>
        </div>
        <div class="lang-bar-bg"><div class="lang-bar" style="width:{{ $width }};"></div></div>
      </div>
      @endif
    @endforeach
    @endif
  </td>
</tr>
</table>
</body>
</html>
