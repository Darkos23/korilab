<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Devis — {{ $client_name }} — KoriLab</title>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;1,9..144,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --ink: #0f0f0f; --ink-soft: #4a4a4a; --ink-muted: #888;
    --accent: #C84818; --accent-light: #f5ede9;
    --gold: #b07d2e; --gold-light: #fdf8ee; --rule: #ddd; --bg: #fdfcfa; --page: #ffffff;
  }
  body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--ink); font-size: 11pt; line-height: 1.7; padding: 2rem; }
  .page { background: var(--page); max-width: 820px; margin: 0 auto; padding: 72px 80px; box-shadow: 0 4px 40px rgba(0,0,0,0.08); border-radius: 4px; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 32px; border-bottom: 2px solid var(--ink); margin-bottom: 48px; }
  .logo { font-family: 'Fraunces', serif; font-size: 24pt; font-weight: 700; letter-spacing: -0.5px; }
  .logo span { color: var(--accent); }
  .tagline { font-size: 8pt; color: var(--ink-muted); letter-spacing: 2px; text-transform: uppercase; margin-top: 4px; }
  .doc-meta { text-align: right; font-size: 9pt; color: var(--ink-muted); line-height: 1.8; }
  .doc-type { font-family: 'Fraunces', serif; font-size: 11pt; font-weight: 700; color: var(--gold); }
  .badge-devis { display: inline-block; background: var(--gold-light); border: 1px solid var(--gold); color: var(--gold); font-size: 8pt; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 4px 12px; border-radius: 100px; margin-bottom: 8px; }
  .contract-title { text-align: center; margin-bottom: 40px; }
  .contract-title h1 { font-family: 'Fraunces', serif; font-size: 22pt; font-weight: 700; letter-spacing: -1px; line-height: 1.2; margin-bottom: 8px; }
  .contract-title h1 em { font-style: italic; font-weight: 400; color: var(--gold); }
  .subtitle { font-size: 10pt; color: var(--ink-muted); letter-spacing: 1px; text-transform: uppercase; }
  .title-rule { width: 48px; height: 2px; background: var(--gold); margin: 16px auto 0; }
  .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 40px; }
  .party-card { border: 1px solid var(--rule); border-radius: 8px; padding: 20px 24px; position: relative; }
  .party-card::before { content: attr(data-label); position: absolute; top: -10px; left: 16px; background: white; padding: 0 8px; font-size: 8pt; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
  .party-card.prestataire::before { color: var(--accent); }
  .party-card.client::before { color: var(--gold); }
  .party-name { font-family: 'Fraunces', serif; font-size: 13pt; font-weight: 700; margin-bottom: 8px; }
  .party-detail { font-size: 9pt; color: var(--ink-soft); line-height: 1.9; }
  .party-detail strong { color: var(--ink); font-weight: 600; }
  .project-section { background: var(--gold-light); border-left: 3px solid var(--gold); border-radius: 0 8px 8px 0; padding: 24px 28px; margin-bottom: 36px; }
  .project-section .section-label { font-size: 8pt; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); margin-bottom: 10px; }
  .project-title { font-family: 'Fraunces', serif; font-size: 16pt; font-weight: 700; color: var(--ink); margin-bottom: 12px; }
  .project-desc { font-size: 10pt; color: var(--ink-soft); line-height: 1.8; white-space: pre-line; }
  .amount-section { border: 2px solid var(--gold); border-radius: 12px; padding: 28px; margin-bottom: 36px; text-align: center; }
  .amount-label { font-size: 9pt; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 8px; }
  .amount-value { font-family: 'Fraunces', serif; font-size: 32pt; font-weight: 700; color: var(--gold); line-height: 1; }
  .amount-currency { font-size: 14pt; font-weight: 400; color: var(--ink-muted); margin-left: 8px; }
  .amount-note { font-size: 9pt; color: var(--ink-muted); margin-top: 10px; }
  .conditions { margin-bottom: 36px; }
  .conditions h3 { font-family: 'Fraunces', serif; font-size: 13pt; font-weight: 700; margin-bottom: 16px; }
  .condition-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .condition-item { background: #f8f8f8; border-radius: 8px; padding: 16px 20px; }
  .condition-item .c-label { font-size: 8pt; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 4px; }
  .condition-item .c-value { font-family: 'Fraunces', serif; font-size: 12pt; font-weight: 700; color: var(--ink); }
  .validity-banner { background: #fff8ec; border: 1px solid var(--gold); border-radius: 8px; padding: 14px 20px; display: flex; align-items: center; gap: 12px; margin-bottom: 36px; font-size: 10pt; color: var(--ink-soft); }
  .validity-banner strong { color: var(--gold); }
  .signatures { margin-top: 48px; padding-top: 32px; border-top: 2px solid var(--ink); }
  .signatures-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
  .sig-party { font-size: 8pt; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
  .sig-name { font-family: 'Fraunces', serif; font-size: 12pt; font-weight: 700; margin-bottom: 4px; }
  .sig-role { font-size: 9pt; color: var(--ink-muted); margin-bottom: 24px; }
  .sig-field { border-bottom: 1.5px solid var(--ink); padding-bottom: 4px; margin-bottom: 8px; min-height: 60px; font-size: 9pt; color: var(--ink-muted); font-style: italic; }
  .sig-date-field { font-size: 9pt; color: var(--ink-muted); }
  .sig-date-field span { display: inline-block; border-bottom: 1px solid var(--ink); min-width: 120px; margin-left: 6px; }
  .page-footer { margin-top: 48px; padding-top: 20px; border-top: 1px solid var(--rule); display: flex; justify-content: space-between; font-size: 8pt; color: var(--ink-muted); }
  .korilab { font-weight: 600; color: var(--ink); }
  .korilab span { color: var(--accent); }
  .print-btn { position: fixed; bottom: 32px; right: 32px; background: var(--gold); color: white; border: none; padding: 14px 24px; border-radius: 100px; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; box-shadow: 0 8px 24px rgba(176,125,46,0.3); display: flex; align-items: center; gap: 8px; }
  .back-btn { position: fixed; bottom: 32px; left: 32px; background: #1C1A16; color: white; border: none; padding: 14px 24px; border-radius: 100px; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; text-decoration: none; display: flex; align-items: center; gap: 8px; }
  @media print {
    body { padding: 0; background: white; }
    .page { box-shadow: none; border-radius: 0; padding: 48px 56px; max-width: 100%; }
    .print-btn, .back-btn { display: none; }
  }
  @media (max-width: 640px) {
    body { padding: 0.75rem; padding-bottom: 100px; }
    .page { padding: 24px 20px; }
    .header { flex-direction: column; gap: 16px; padding-bottom: 20px; margin-bottom: 28px; }
    .doc-meta { text-align: left; }
    .parties { grid-template-columns: 1fr; }
    .condition-grid { grid-template-columns: 1fr; }
    .signatures-grid { grid-template-columns: 1fr; gap: 32px; }
    .amount-value { font-size: 24pt; }
    .print-btn { bottom: 16px; right: 16px; padding: 12px 18px; font-size: 13px; }
    .back-btn { bottom: 16px; left: 16px; padding: 12px 18px; font-size: 13px; }
  }
</style>
</head>
<body>

<button class="print-btn" onclick="window.print()">🖨️ Exporter en PDF</button>
<a class="back-btn" href="/dashboard/contrats">← Retour</a>

<div class="page">

  <div class="header">
    <div>
      <div style="display:flex; align-items:center; gap:10px;">
        <svg width="22" height="32" viewBox="0 0 60 84" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0;">
          <ellipse cx="30" cy="42" rx="21" ry="30" fill="none" stroke="#C84818" stroke-width="2"/>
          <path d="M30,14 L26,20 L34,26 L26,32 L34,38 L26,44 L34,50 L26,56 L34,62 L30,70" stroke="#C84818" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <line x1="17" y1="24" x2="24" y2="24" stroke="#C84818" stroke-width="1.4" stroke-linecap="round"/>
          <line x1="16" y1="29" x2="23" y2="29" stroke="#C84818" stroke-width="1.4" stroke-linecap="round"/>
          <path d="M13,35 L20,40 L13,45" stroke="#C84818" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <path d="M17,35 L24,40 L17,45" stroke="#C84818" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <circle cx="11" cy="42" r="2" fill="#C84818"/>
          <path d="M13,47 L20,52 L13,57" stroke="#C84818" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <path d="M17,47 L24,52 L17,57" stroke="#C84818" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <line x1="16" y1="60" x2="23" y2="60" stroke="#C84818" stroke-width="1.4" stroke-linecap="round"/>
          <line x1="43" y1="24" x2="36" y2="24" stroke="#C84818" stroke-width="1.4" stroke-linecap="round"/>
          <line x1="44" y1="29" x2="37" y2="29" stroke="#C84818" stroke-width="1.4" stroke-linecap="round"/>
          <path d="M47,35 L40,40 L47,45" stroke="#C84818" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <path d="M43,35 L36,40 L43,45" stroke="#C84818" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <circle cx="49" cy="42" r="2" fill="#C84818"/>
          <path d="M47,47 L40,52 L47,57" stroke="#C84818" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <path d="M43,47 L36,52 L43,57" stroke="#C84818" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <line x1="44" y1="60" x2="37" y2="60" stroke="#C84818" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
        <div>
          <div class="logo"><span>KORI</span>lab</div>
          <div class="tagline">Studio créatif · Dakar, Sénégal</div>
        </div>
      </div>
    </div>
    <div class="doc-meta">
      <div class="badge-devis">Devis</div>
      <div class="doc-type">Proposition commerciale</div>
      <div>Réf. : KL-DEVIS-{{ date('Y') }}-{{ str_pad($ref_number ?: '001', 3, '0', STR_PAD_LEFT) }}</div>
      <div>Date : {{ \Carbon\Carbon::parse($date)->locale('fr')->isoFormat('D MMMM YYYY') }}</div>
      <div style="margin-top:6px; color:#b07d2e; font-weight:600;">Valide {{ $validity_days }} jours</div>
    </div>
  </div>

  <div class="contract-title">
    <h1>Devis de <em>prestation</em></h1>
    <p class="subtitle">Proposition établie par KoriLab pour {{ $client_name }}</p>
    <div class="title-rule"></div>
  </div>

  <div class="parties">
    <div class="party-card prestataire" data-label="Prestataire">
      <div class="party-name">KoriLab</div>
      <div class="party-detail">
        <strong>Studio créatif & développement</strong><br>
        Dakar, Sénégal<br>
        contact@korilab.dev<br>
        korilab.dev
      </div>
    </div>
    <div class="party-card client" data-label="Client">
      <div class="party-name">{{ $client_name }}</div>
      <div class="party-detail">
        <strong>{{ $client_activity }}</strong><br>
        @if($client_email) {{ $client_email }}<br> @endif
        @if($client_phone) {{ $client_phone }} @endif
      </div>
    </div>
  </div>

  <div class="project-section">
    <div class="section-label">Objet du devis</div>
    <div class="project-title">{{ $project_title }}</div>
    <div class="project-desc">{{ $project_description }}</div>
  </div>

  <div class="amount-section">
    <div class="amount-label">Montant total estimé</div>
    <div class="amount-value">
      {{ number_format($amount, 0, ',', ' ') }}<span class="amount-currency">FCFA</span>
    </div>
    <div class="amount-note">Toutes taxes comprises · Paiement selon modalités convenues</div>
  </div>

  <div class="conditions">
    <h3>Conditions de la prestation</h3>
    <div class="condition-grid">
      <div class="condition-item">
        <div class="c-label">Acompte au démarrage</div>
        <div class="c-value">50%</div>
      </div>
      <div class="condition-item">
        <div class="c-label">Solde à la livraison</div>
        <div class="c-value">50%</div>
      </div>
      <div class="condition-item">
        <div class="c-label">Mode de paiement</div>
        <div class="c-value">Wave · Orange Money · Virement</div>
      </div>
      <div class="condition-item">
        <div class="c-label">Révisions incluses</div>
        <div class="c-value">2 cycles de retours</div>
      </div>
    </div>
  </div>

  <div class="validity-banner">
    ⏳ Ce devis est valable <strong>{{ $validity_days }} jours</strong> à compter du {{ \Carbon\Carbon::parse($date)->locale('fr')->isoFormat('D MMMM YYYY') }},
    soit jusqu'au <strong>{{ \Carbon\Carbon::parse($date)->addDays((int)$validity_days)->locale('fr')->isoFormat('D MMMM YYYY') }}</strong>.
  </div>

  <div class="signatures">
    <div class="signatures-grid">
      <div>
        <div class="sig-party">Le Prestataire</div>
        <div class="sig-name">KoriLab</div>
        <div class="sig-role">Studio créatif & développement</div>
        <div class="sig-field">Signature :</div>
        <div class="sig-date-field">Date : <span></span></div>
      </div>
      <div>
        <div class="sig-party">Le Client</div>
        <div class="sig-name">{{ $client_name }}</div>
        <div class="sig-role">{{ $client_activity }}</div>
        <div class="sig-field">Signature & cachet :</div>
        <div class="sig-date-field">Date : <span></span></div>
      </div>
    </div>
    <p style="text-align:center; font-size:8pt; color:var(--ink-muted); font-style:italic; margin-top:20px;">
      Bon pour accord — Signature précédée de la mention « Lu et approuvé »
    </p>
  </div>

  <div class="page-footer">
    <span><span class="korilab"><span>KORI</span>lab</span> · contact@korilab.dev · korilab.dev</span>
    <span>Réf. KL-DEVIS-{{ date('Y') }}-{{ str_pad($ref_number ?: '001', 3, '0', STR_PAD_LEFT) }}</span>
  </div>

</div>
</body>
</html>
