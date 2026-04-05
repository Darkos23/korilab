<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 10pt; color: #e2e8f0; background: #0d1117; }
  table.layout { width: 100%; border-collapse: collapse; }

  td.sidebar {
    width: 34%;
    background-color: #161b22;
    padding: 22px 13px;
    vertical-align: top;
  }
  td.main {
    padding: 22px 18px;
    vertical-align: top;
    background: #0d1117;
  }

  /* Sidebar */
  .sidebar-name { font-size: 13pt; font-weight: 900; color: #38bdf8; letter-spacing: -0.3px; margin-bottom: 2px; }
  .sidebar-title { font-size: 7pt; color: rgba(226,232,240,0.45); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; font-weight: 500; }
  .sidebar-divider { border: none; border-top: 1px solid rgba(56,189,248,0.2); margin-bottom: 12px; }
  .sidebar-section { font-size: 7pt; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 7px; margin-top: 14px; }
  .sidebar-contact { font-size: 7.5pt; color: rgba(226,232,240,0.55); margin-bottom: 3px; word-break: break-all; }
  .skill-pill {
    display: inline-block;
    background: rgba(56,189,248,0.12);
    color: #38bdf8;
    font-size: 7pt; font-weight: 600;
    padding: 2px 6px; border-radius: 3px;
    margin: 0 2px 3px 0;
    border: 1px solid rgba(56,189,248,0.22);
  }
  .lang-item { font-size: 8pt; color: rgba(226,232,240,0.65); margin-bottom: 3px; }
  .lang-accent { color: #38bdf8; opacity: 0.6; }

  /* Main */
  .section-title {
    font-size: 8pt; font-weight: 700; color: #38bdf8;
    text-transform: uppercase; letter-spacing: 0.12em;
    border-bottom: 1px solid rgba(56,189,248,0.2);
    padding-bottom: 4px; margin-bottom: 10px; margin-top: 16px;
  }
  .section-title:first-child { margin-top: 0; }

  /* Timeline */
  .timeline-item { position: relative; padding-left: 14px; margin-bottom: 12px; }
  .timeline-dot {
    position: absolute; left: 0; top: 3px;
    width: 6px; height: 6px; border-radius: 50%;
    background: #38bdf8;
  }
  .exp-role { font-size: 9.5pt; font-weight: 700; color: #e2e8f0; }
  .exp-company { font-size: 8pt; font-weight: 600; color: #38bdf8; margin-top: 1px; }
  .exp-desc { font-size: 7.5pt; color: rgba(226,232,240,0.5); margin-top: 2px; line-height: 1.5; }

  .form-role { font-size: 9pt; font-weight: 700; color: #e2e8f0; }
  .form-school { font-size: 8pt; color: #38bdf8; margin-top: 1px; }
  .form-block { margin-bottom: 8px; }

  .resume-block {
    background: rgba(56,189,248,0.06);
    border-left: 2px solid #38bdf8;
    padding: 7px 10px;
    border-radius: 0 4px 4px 0;
    margin-bottom: 14px;
  }
  .resume-text { font-size: 8.5pt; color: rgba(226,232,240,0.7); line-height: 1.6; }
</style>
</head>
<body>
<table class="layout">
<tr>
  <td class="sidebar">
    <div class="sidebar-name">{{ $data['prenom'] }} {{ $data['nom'] }}</div>
    @if($data['titre'])<div class="sidebar-title">{{ $data['titre'] }}</div>@endif
    <hr class="sidebar-divider">

    @if($data['email'] || $data['telephone'] || $data['localisation'] || $data['portfolio'])
    <div class="sidebar-section">Contact</div>
    @if($data['email'])<div class="sidebar-contact">{{ $data['email'] }}</div>@endif
    @if($data['telephone'])<div class="sidebar-contact">{{ $data['telephone'] }}</div>@endif
    @if($data['localisation'])<div class="sidebar-contact">{{ $data['localisation'] }}</div>@endif
    @if($data['portfolio'])<div class="sidebar-contact">{{ $data['portfolio'] }}</div>@endif
    @endif

    @if(count($data['competences']) > 0)
    <div class="sidebar-section">Stack</div>
    <div>
      @foreach($data['competences'] as $skill)
      <span class="skill-pill">{{ $skill }}</span>
      @endforeach
    </div>
    @endif

    @if(count(array_filter($data['langues'], fn($l) => !empty($l['langue']))) > 0)
    <div class="sidebar-section">Langues</div>
    @foreach($data['langues'] as $lang)
      @if(!empty($lang['langue']))
      <div class="lang-item">{{ $lang['langue'] }} <span class="lang-accent">/ {{ $lang['niveau'] ?? '' }}</span></div>
      @endif
    @endforeach
    @endif
  </td>

  <td class="main">
    @if($data['resume'])
    <div class="resume-block">
      <div class="resume-text">{{ $data['resume'] }}</div>
    </div>
    @endif

    @if(count(array_filter($data['experiences'], fn($e) => !empty($e['poste']) || !empty($e['entreprise']))) > 0)
    <div class="section-title">Expériences</div>
    @foreach($data['experiences'] as $exp)
      @if(!empty($exp['poste']) || !empty($exp['entreprise']))
      <div class="timeline-item">
        <div class="timeline-dot"></div>
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
