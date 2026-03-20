<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau message — KoriLab</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0a0f1e; font-family: 'Segoe UI', Arial, sans-serif; color: #e2e8f0; }
    .wrapper { max-width: 580px; margin: 0 auto; padding: 32px 16px; }
    .card { background: #0d1831; border: 1px solid rgba(0,168,255,0.15); border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #020c1b 0%, #061428 100%); padding: 28px 32px; border-bottom: 1px solid rgba(0,168,255,0.1); }
    .header-top { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: #00a8ff; box-shadow: 0 0 8px #00a8ff; }
    .sys-label { font-family: monospace; font-size: 10px; color: rgba(0,168,255,0.6); letter-spacing: 0.25em; text-transform: uppercase; }
    .title { font-size: 20px; font-weight: 700; color: #ffffff; }
    .title span { color: #00a8ff; }
    .body { padding: 28px 32px; }
    .field { margin-bottom: 20px; }
    .field-label { font-family: monospace; font-size: 10px; color: rgba(0,168,255,0.5); letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 6px; }
    .field-value { font-size: 15px; color: #e2e8f0; background: rgba(0,168,255,0.04); border: 1px solid rgba(0,168,255,0.08); border-radius: 8px; padding: 10px 14px; line-height: 1.6; }
    .field-value a { color: #00a8ff; text-decoration: none; }
    .message-box { background: rgba(0,168,255,0.03); border: 1px solid rgba(0,168,255,0.1); border-left: 3px solid #00a8ff; border-radius: 8px; padding: 14px 16px; font-size: 15px; color: #cbd5e1; line-height: 1.7; white-space: pre-wrap; }
    .divider { height: 1px; background: rgba(0,168,255,0.08); margin: 24px 0; }
    .footer { padding: 16px 32px; background: rgba(0,168,255,0.02); border-top: 1px solid rgba(0,168,255,0.06); text-align: center; }
    .footer-text { font-family: monospace; font-size: 10px; color: rgba(100,130,160,0.5); letter-spacing: 0.15em; }
    .bracket { color: rgba(0,168,255,0.3); }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">

      <!-- Header -->
      <div class="header">
        <div class="header-top">
          <div class="dot"></div>
          <span class="sys-label">[ Nouveau message entrant ]</span>
        </div>
        <div class="title">Message de <span>{{ $data['name'] }}</span></div>
      </div>

      <!-- Body -->
      <div class="body">

        <div class="field">
          <div class="field-label">Nom complet</div>
          <div class="field-value">{{ $data['name'] }}</div>
        </div>

        <div class="field">
          <div class="field-label">Email</div>
          <div class="field-value"><a href="mailto:{{ $data['email'] }}">{{ $data['email'] }}</a></div>
        </div>

        @if (!empty($data['company']))
        <div class="field">
          <div class="field-label">Entreprise</div>
          <div class="field-value">{{ $data['company'] }}</div>
        </div>
        @endif

        <div class="field">
          <div class="field-label">Budget</div>
          <div class="field-value">{{ $data['budget'] }}</div>
        </div>

        <div class="divider"></div>

        <div class="field">
          <div class="field-label">Message</div>
          <div class="message-box">{{ $data['message'] }}</div>
        </div>

      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="footer-text">
          <span class="bracket">[</span>
          KoriLab — Système de messagerie
          <span class="bracket">]</span>
        </div>
      </div>

    </div>
  </div>
</body>
</html>
