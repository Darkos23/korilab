<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 10pt; color: #1e293b; background: #fff; }
  table.layout { width: 100%; border-collapse: collapse; min-height: 100%; }
  td.sidebar {
    width: 32%;
    background-color: #1e3a5f;
    padding: 24px 14px;
    vertical-align: top;
  }
  td.main { padding: 24px 18px; vertical-align: top; }

  /* Sidebar */
  .avatar {
    width: 60px; height: 60px; border-radius: 50%;
    background: rgba(255,255,255,0.15);
    border: 2px solid rgba(255,255,255,0.25);
    display: table; margin: 0 auto 14px;
    text-align: center; line-height: 60px;
    font-size: 22pt; font-weight: 700; color: rgba(255,255,255,0.6);
  }
  .sidebar-section-title {
    font-size: 7pt; font-weight: 700; color: rgba(255,255,255,0.45);
    text-transform: uppercase; letter-spacing: 0.15em;
    border-bottom: 1px solid rgba(255,255,255,0.12);
    padding-bottom: 3px; margin-bottom: 8px; margin-top: 14px;
  }
  .sidebar-item { color: rgba(255,255,255,0.7); font-size: 7.5pt; margin-bottom: 3px; word-break: break-all; }
  .skill-item { color: rgba(255,255,255,0.8); font-size: 8pt; margin-bottom: 3px; padding-left: 10px; position: relative; }
  .skill-bullet { color: rgba(255,255,255,0.35); margin-right: 4px; }
  .lang-item { font-size: 8pt; margin-bottom: 4px; }
  .lang-name { color: rgba(255,255,255,0.8); }
  .lang-level { color: rgba(255,255,255,0.4); font-size: 7pt; }

  /* Main */
  .header-name {
    font-size: 22pt; font-weight: 900; color: #1e293b;
    letter-spacing: -0.5px; line-height: 1;
  }
  .header-title {
    font-size: 9pt; color: #1e3a5f; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px;
  }
  .header-divider {
    border: none; border-top: 3px solid #1e3a5f;
    margin: 10px 0 14px;
  }
  .section-title {
    font-size: 8pt; font-weight: 700; color: #1e3a5f;
    text-transform: uppercase; letter-spacing: 0.15em;
    border-bottom: 1.5px solid #1e3a5f;
    padding-bottom: 3px; margin-bottom: 10px; margin-top: 16px;
  }
  .exp-role { font-size: 9.5pt; font-weight: 700; color: #1e293b; }
  .exp-company { font-size: 8.5pt; font-weight: 600; color: #1e3a5f; margin-top: 1px; }
  .exp-desc { font-size: 8pt; color: #475569; margin-top: 3px; line-height: 1.5; }
  .exp-block { margin-bottom: 10px; }
  .form-role { font-size: 9pt; font-weight: 700; color: #1e293b; }
  .form-school { font-size: 8pt; color: #1e3a5f; margin-top: 1px; }
  .form-block { margin-bottom: 8px; }
  .resume-text { font-size: 8.5pt; color: #475569; line-height: 1.6; }
</style>
</head>
<body>
<table class="layout">
  <tr>
    <td class="sidebar">
      <div class="avatar">{{ strtoupper(substr($data['prenom'], 0, 1)) }}</div>

      @if($data['email'] || $data['telephone'] || $data['localisation'] || $data['portfolio'])
      <div class="sidebar-section-title">Contact</div>
      @if($data['email'])<div class="sidebar-item">{{ $data['email'] }}</div>@endif
      @if($data['telephone'])<div class="sidebar-item">{{ $data['telephone'] }}</div>@endif
      @if($data['localisation'])<div class="sidebar-item">{{ $data['localisation'] }}</div>@endif
      @if($data['portfolio'])<div class="sidebar-item">{{ $data['portfolio'] }}</div>@endif
      @endif

      @if(count($data['competences']) > 0)
      <div class="sidebar-section-title">Compétences</div>
      @foreach($data['competences'] as $skill)
      <div class="skill-item"><span class="skill-bullet">›</span> {{ $skill }}</div>
      @endforeach
      @endif

      @if(count(array_filter($data['langues'], fn($l) => !empty($l['langue']))) > 0)
      <div class="sidebar-section-title">Langues</div>
      @foreach($data['langues'] as $lang)
        @if(!empty($lang['langue']))
        <div class="lang-item">
          <span class="lang-name">{{ $lang['langue'] }}</span>
          <span class="lang-level"> · {{ $lang['niveau'] ?? '' }}</span>
        </div>
        @endif
      @endforeach
      @endif
    </td>

    <td class="main">
      <div class="header-name">{{ $data['prenom'] }} {{ $data['nom'] }}</div>
      @if($data['titre'])<div class="header-title">{{ $data['titre'] }}</div>@endif
      <hr class="header-divider">

      @if($data['resume'])
      <div class="section-title">Profil</div>
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
  </tr>
</table>
</body>
</html>
