<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>404 — Zone Interdite</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: #050a14;
      color: #e8f6ff;
      font-family: 'Courier New', monospace;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
    }

    /* Grid */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(rgba(0,168,255,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,168,255,0.05) 1px, transparent 1px);
      background-size: 50px 50px;
      pointer-events: none;
      z-index: 0;
    }

    .container {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
    }

    /* ── Beru SVG ── */
    .beru-wrap {
      animation: float 3.5s ease-in-out infinite;
      filter: drop-shadow(0 0 30px rgba(0,168,255,0.35));
    }
    @@keyframes float {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-14px); }
    }

    /* Eyes pulse */
    .eye-glow {
      animation: eye-pulse 1.8s ease-in-out infinite;
    }
    @@keyframes eye-pulse {
      0%,100% { opacity: 1; r: 7; }
      50%      { opacity: 0.6; r: 9; }
    }

    /* Flame flicker */
    .flame {
      animation: flicker 0.8s ease-in-out infinite alternate;
      transform-origin: 50% 100%;
    }
    @@keyframes flicker {
      0%   { transform: scaleX(1)   scaleY(1)   rotate(-3deg); opacity: 1; }
      100% { transform: scaleX(0.85) scaleY(1.15) rotate(3deg); opacity: 0.8; }
    }

    /* Blue accents pulse */
    .accent-glow {
      animation: accent 2.5s ease-in-out infinite;
    }
    @@keyframes accent {
      0%,100% { opacity: 0.6; }
      50%      { opacity: 1; }
    }

    /* ARISE text */
    .arise {
      font-size: 13px;
      font-weight: 900;
      letter-spacing: 0.6em;
      color: #00a8ff;
      text-shadow: 0 0 12px #00a8ff, 0 0 30px rgba(0,168,255,0.5);
      margin-top: 6px;
      animation: arise-pulse 2s ease-in-out infinite;
    }
    @@keyframes arise-pulse {
      0%,100% { text-shadow: 0 0 12px #00a8ff, 0 0 30px rgba(0,168,255,0.5); }
      50%      { text-shadow: 0 0 20px #00a8ff, 0 0 50px rgba(0,168,255,0.8); }
    }

    /* Error block */
    .error-block {
      margin-top: 36px;
      text-align: center;
      border: 1px solid rgba(0,168,255,0.2);
      padding: 24px 40px;
      background: rgba(5,10,20,0.9);
      position: relative;
      outline: 1px solid rgba(0,168,255,0.06);
      outline-offset: 4px;
    }
    /* Corner brackets */
    .error-block::before, .error-block::after {
      content: '';
      position: absolute;
      width: 12px; height: 12px;
    }
    .error-block::before { top: -1px; left: -1px; border-top: 2px solid #00a8ff; border-left: 2px solid #00a8ff; }
    .error-block::after  { bottom: -1px; right: -1px; border-bottom: 2px solid #00a8ff; border-right: 2px solid #00a8ff; }

    .error-tag {
      font-size: 9px;
      color: rgba(0,168,255,0.5);
      letter-spacing: 0.4em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .error-code {
      font-size: 56px;
      font-weight: 900;
      color: #e8f6ff;
      text-shadow: 0 0 40px rgba(0,168,255,0.3);
      line-height: 1;
      margin-bottom: 8px;
    }
    .error-msg {
      font-size: 11px;
      color: rgba(0,168,255,0.6);
      letter-spacing: 0.25em;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .error-sub {
      font-size: 10px;
      color: rgba(255,255,255,0.2);
      letter-spacing: 0.15em;
    }

    /* Button */
    .btn {
      display: inline-block;
      margin-top: 28px;
      padding: 10px 28px;
      font-family: 'Courier New', monospace;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      text-decoration: none;
      color: #00a8ff;
      border: 1px solid rgba(0,168,255,0.4);
      background: rgba(0,168,255,0.06);
      cursor: pointer;
      transition: all 0.25s;
    }
    .btn:hover {
      background: rgba(0,168,255,0.15);
      border-color: rgba(0,168,255,0.7);
      box-shadow: 0 0 20px rgba(0,168,255,0.2);
      color: #fff;
    }

    /* Warning bottom */
    .warning {
      position: fixed;
      bottom: 14px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 8px;
      color: rgba(0,168,255,0.2);
      letter-spacing: 0.3em;
      text-transform: uppercase;
      white-space: nowrap;
    }

    /* Orbs */
    .orb {
      position: fixed;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0,168,255,1) 0%, transparent 70%);
      filter: blur(60px);
      pointer-events: none;
      z-index: 0;
    }
  </style>
</head>
<body>

  <!-- Orbs déco -->
  <div class="orb" style="width:300px;height:300px;left:5%;top:10%;opacity:0.04;"></div>
  <div class="orb" style="width:200px;height:200px;right:8%;bottom:15%;opacity:0.03;"></div>

  <div class="container">

    <!-- Beru SVG -->
    <div class="beru-wrap">
      <svg width="200" height="220" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glow-strong" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <!-- Oreilles -->
        <ellipse cx="68" cy="58" rx="16" ry="14" fill="#0a0820"/>
        <ellipse cx="132" cy="58" rx="16" ry="14" fill="#0a0820"/>
        <!-- Inner ears -->
        <ellipse cx="68" cy="58" rx="9" ry="8" fill="#0d1030"/>
        <ellipse cx="132" cy="58" rx="9" ry="8" fill="#0d1030"/>

        <!-- Corps principal -->
        <ellipse cx="100" cy="160" rx="68" ry="60" fill="#0a0820"/>
        <!-- Tête -->
        <circle cx="100" cy="95" r="50" fill="#0a0820"/>

        <!-- Flamme bleue sur la tête -->
        <g class="flame" filter="url(#glow-strong)">
          <ellipse cx="100" cy="45" rx="10" ry="18" fill="#00a8ff" opacity="0.9"/>
          <ellipse cx="100" cy="42" rx="6" ry="14" fill="#7df9ff" opacity="0.8"/>
          <ellipse cx="93"  cy="50" rx="6" ry="11" fill="#00a8ff" opacity="0.7"/>
          <ellipse cx="107" cy="50" rx="6" ry="11" fill="#00a8ff" opacity="0.7"/>
          <ellipse cx="93"  cy="47" rx="3.5" ry="8" fill="#b8fbff" opacity="0.6"/>
          <ellipse cx="107" cy="47" rx="3.5" ry="8" fill="#b8fbff" opacity="0.6"/>
        </g>

        <!-- Yeux bleus lumineux -->
        <circle cx="82" cy="90" r="11" fill="#001830"/>
        <circle cx="118" cy="90" r="11" fill="#001830"/>
        <circle cx="82" cy="90" r="7" fill="#00a8ff" filter="url(#glow-strong)" class="eye-glow"/>
        <circle cx="118" cy="90" r="7" fill="#00a8ff" filter="url(#glow-strong)" class="eye-glow"/>
        <!-- Pupilles -->
        <circle cx="82" cy="90" r="3" fill="#e8f6ff"/>
        <circle cx="118" cy="90" r="3" fill="#e8f6ff"/>

        <!-- Nez -->
        <ellipse cx="100" cy="108" rx="8" ry="5" fill="#0d1030"/>

        <!-- Marques bleues sur le corps (croix) -->
        <g class="accent-glow" filter="url(#glow-blue)">
          <!-- Bras gauche marquage -->
          <rect x="38" y="140" width="22" height="4" rx="2" fill="#00a8ff" opacity="0.8"/>
          <rect x="44" y="134" width="4" height="16" rx="2" fill="#00a8ff" opacity="0.8"/>
          <!-- Bras droit marquage -->
          <rect x="140" y="140" width="22" height="4" rx="2" fill="#00a8ff" opacity="0.8"/>
          <rect x="152" y="134" width="4" height="16" rx="2" fill="#00a8ff" opacity="0.8"/>
          <!-- Ventre marquage -->
          <rect x="84" y="155" width="32" height="4" rx="2" fill="#00a8ff" opacity="0.6"/>
          <rect x="98" y="145" width="4" height="24" rx="2" fill="#00a8ff" opacity="0.6"/>
        </g>

        <!-- Bras gauche -->
        <ellipse cx="42" cy="148" rx="18" ry="14" fill="#0a0820" transform="rotate(-15 42 148)"/>
        <!-- Bras droit -->
        <ellipse cx="158" cy="148" rx="18" ry="14" fill="#0a0820" transform="rotate(15 158 148)"/>

        <!-- Pattes -->
        <ellipse cx="78"  cy="210" rx="18" ry="10" fill="#0a0820"/>
        <ellipse cx="122" cy="210" rx="18" ry="10" fill="#0a0820"/>

        <!-- Contour lumineux bleu subtil -->
        <circle cx="100" cy="95" r="50" fill="none" stroke="#00a8ff" stroke-width="0.6" opacity="0.15"/>
        <ellipse cx="100" cy="160" rx="68" ry="60" fill="none" stroke="#00a8ff" stroke-width="0.6" opacity="0.1"/>
      </svg>
    </div>

    <div class="arise">ARISE</div>

    <!-- Error block -->
    <div class="error-block">
      <div class="error-tag">⚠ Alerte Système</div>
      <div class="error-code">404</div>
      <div class="error-msg">Zone interdite — Page inexistante</div>
      <div class="error-sub">Cette zone n'existe pas dans le Système.</div>
      <a href="/" class="btn">[ Retourner à l'accueil ]</a>
    </div>

  </div>

  <div class="warning">Warning · Accès non autorisé enregistré dans les archives du Système</div>

</body>
</html>
