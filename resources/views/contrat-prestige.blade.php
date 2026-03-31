<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Contrat Prestige — {{ $client_name }} — KoriLab</title>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;1,9..144,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --ink: #0f0f0f; --ink-soft: #4a4a4a; --ink-muted: #888;
    --accent: #C84818; --accent-light: #f5ede9;
    --gold: #b07d2e; --rule: #ddd; --bg: #fdfcfa; --page: #ffffff;
  }
  body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--ink); font-size: 11pt; line-height: 1.7; padding: 2rem; }
  .page { background: var(--page); max-width: 820px; margin: 0 auto; padding: 72px 80px; box-shadow: 0 4px 40px rgba(0,0,0,0.08); border-radius: 4px; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 32px; border-bottom: 2px solid var(--ink); margin-bottom: 48px; }
  .logo { font-family: 'Fraunces', serif; font-size: 24pt; font-weight: 700; letter-spacing: -0.5px; }
  .logo span { color: var(--accent); }
  .tagline { font-size: 8pt; color: var(--ink-muted); letter-spacing: 2px; text-transform: uppercase; margin-top: 4px; }
  .doc-meta { text-align: right; font-size: 9pt; color: var(--ink-muted); line-height: 1.8; }
  .doc-type { font-family: 'Fraunces', serif; font-size: 11pt; font-weight: 700; color: var(--ink); }
  .doc-ref { font-size: 8pt; color: var(--ink-muted); margin-top: 2px; }
  .contract-title { text-align: center; margin-bottom: 48px; }
  .contract-title h1 { font-family: 'Fraunces', serif; font-size: 22pt; font-weight: 700; letter-spacing: -1px; line-height: 1.2; margin-bottom: 8px; }
  .contract-title h1 em { font-style: italic; font-weight: 400; color: var(--accent); }
  .subtitle { font-size: 10pt; color: var(--ink-muted); letter-spacing: 1px; text-transform: uppercase; }
  .title-rule { width: 48px; height: 2px; background: var(--accent); margin: 16px auto 0; }
  .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 40px; }
  .party-card { border: 1px solid var(--rule); border-radius: 8px; padding: 20px 24px; position: relative; }
  .party-card::before { content: attr(data-label); position: absolute; top: -10px; left: 16px; background: white; padding: 0 8px; font-size: 8pt; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
  .party-card.prestataire::before { color: var(--accent); }
  .party-card.client::before { color: var(--gold); }
  .party-name { font-family: 'Fraunces', serif; font-size: 13pt; font-weight: 700; margin-bottom: 8px; }
  .party-detail { font-size: 9pt; color: var(--ink-soft); line-height: 1.9; }
  .party-detail strong { color: var(--ink); font-weight: 600; }
  .formule-section { background: var(--accent-light); border-left: 3px solid var(--accent); border-radius: 0 8px 8px 0; padding: 20px 24px; margin-bottom: 40px; }
  .formule-section .section-label { font-size: 8pt; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
  .formule-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .formule-option { background: white; border: 2px solid var(--rule); border-radius: 8px; padding: 14px 16px; }
  .formule-option.selected { border-color: var(--accent); }
  .formule-check { width: 16px; height: 16px; border: 2px solid var(--rule); border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; margin-right: 6px; vertical-align: middle; }
  .formule-option.selected .formule-check { background: var(--accent); border-color: var(--accent); color: white; font-size: 10px; font-weight: 700; }
  .formule-name { font-weight: 700; font-size: 10pt; margin-top: 6px; }
  .formule-price { font-family: 'Fraunces', serif; font-size: 14pt; font-weight: 700; color: var(--accent); margin: 4px 0 2px; }
  .formule-details { font-size: 8pt; color: var(--ink-muted); line-height: 1.6; }
  .article { margin-bottom: 32px; padding-bottom: 32px; border-bottom: 1px solid var(--rule); }
  .article:last-of-type { border-bottom: none; }
  .article-header { display: flex; align-items: baseline; gap: 12px; margin-bottom: 12px; }
  .article-num { font-family: 'Fraunces', serif; font-size: 9pt; font-weight: 700; color: var(--accent); letter-spacing: 1px; text-transform: uppercase; white-space: nowrap; }
  .article-title { font-family: 'Fraunces', serif; font-size: 13pt; font-weight: 700; letter-spacing: -0.3px; }
  .article-body { font-size: 10pt; color: var(--ink-soft); line-height: 1.8; }
  .article-body p { margin-bottom: 10px; }
  .article-body p:last-child { margin-bottom: 0; }
  .article-body strong { color: var(--ink); font-weight: 600; }
  .article-body ul { list-style: none; margin: 8px 0; padding: 0; }
  .article-body ul li { padding: 4px 0 4px 20px; position: relative; }
  .article-body ul li::before { content: '—'; position: absolute; left: 0; color: var(--accent); font-weight: 700; }
  .table-wrapper { overflow: hidden; border-radius: 8px; border: 1px solid var(--rule); margin: 12px 0; }
  table { width: 100%; border-collapse: collapse; font-size: 9.5pt; }
  th { background: var(--ink); color: white; padding: 10px 14px; text-align: left; font-weight: 600; font-size: 8.5pt; letter-spacing: 0.5px; }
  td { padding: 10px 14px; border-bottom: 1px solid var(--rule); color: var(--ink-soft); vertical-align: top; }
  tr:last-child td { border-bottom: none; }
  tr:nth-child(even) td { background: #fafafa; }
  td strong { color: var(--ink); }
  .alert { background: #fffbf0; border: 1px solid #e8c84a; border-radius: 8px; padding: 12px 16px; font-size: 9.5pt; color: #6b5a00; margin: 12px 0; }
  .signatures { margin-top: 48px; padding-top: 32px; border-top: 2px solid var(--ink); }
  .signatures-header { text-align: center; margin-bottom: 32px; }
  .signatures-header h3 { font-family: 'Fraunces', serif; font-size: 13pt; font-weight: 700; margin-bottom: 4px; }
  .signatures-header p { font-size: 9pt; color: var(--ink-muted); }
  .signatures-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
  .sig-party { font-size: 8pt; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
  .sig-name { font-family: 'Fraunces', serif; font-size: 12pt; font-weight: 700; margin-bottom: 4px; }
  .sig-role { font-size: 9pt; color: var(--ink-muted); margin-bottom: 24px; }
  .sig-field { border-bottom: 1.5px solid var(--ink); padding-bottom: 4px; margin-bottom: 8px; min-height: 60px; font-size: 9pt; color: var(--ink-muted); font-style: italic; }
  .sig-date-field { font-size: 9pt; color: var(--ink-muted); }
  .sig-date-field span { display: inline-block; border-bottom: 1px solid var(--ink); min-width: 120px; margin-left: 6px; }
  .lu-approuve { text-align: center; font-size: 8pt; color: var(--ink-muted); font-style: italic; margin-top: 16px; }
  .page-footer { margin-top: 48px; padding-top: 20px; border-top: 1px solid var(--rule); display: flex; justify-content: space-between; font-size: 8pt; color: var(--ink-muted); }
  .korilab { font-weight: 600; color: var(--ink); }
  .korilab span { color: var(--accent); }
  .print-btn { position: fixed; bottom: 32px; right: 32px; background: var(--accent); color: white; border: none; padding: 14px 24px; border-radius: 100px; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; box-shadow: 0 8px 24px rgba(200,72,24,0.3); display: flex; align-items: center; gap: 8px; }
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
    .logo { font-size: 18pt; }
    .contract-title h1 { font-size: 16pt; }
    .contract-title { margin-bottom: 28px; }
    .parties { grid-template-columns: 1fr; gap: 16px; margin-bottom: 24px; }
    .formule-grid { grid-template-columns: 1fr; gap: 10px; }
    .signatures-grid { grid-template-columns: 1fr; gap: 32px; }
    .print-btn { bottom: 16px; right: 16px; padding: 12px 18px; font-size: 13px; }
    .back-btn { bottom: 16px; left: 16px; padding: 12px 18px; font-size: 13px; }
    .page-footer { flex-direction: column; gap: 6px; }
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
        <div class="logo">Kori<span>Lab</span></div>
      </div>
      <div class="tagline">Studio digital · Dakar, Sénégal</div>
    </div>
    <div class="doc-meta">
      <div class="doc-type">Contrat de Prestation</div>
      <div>Offre KoriLab Prestige</div>
      <div class="doc-ref">Réf. : KL-PREST-{{ date('Y') }}-{{ str_pad($ref_number, 3, '0', STR_PAD_LEFT) }}</div>
      <div>Date : {{ \Carbon\Carbon::parse($date)->format('d/m/Y') }}</div>
    </div>
  </div>

  <div class="contract-title">
    <h1>Contrat d'abonnement<br><em>KoriLab Prestige</em></h1>
    <div class="subtitle">Présence digitale gérée · Engagement mensuel</div>
    <div class="title-rule"></div>
  </div>

  <div class="parties">
    <div class="party-card prestataire" data-label="Le Prestataire">
      <div class="party-name">KoriLab Studio</div>
      <div class="party-detail">
        <strong>Forme :</strong> Studio digital<br>
        <strong>NINEA :</strong> {{ $ninea ?: '(en cours d\'enregistrement)' }}<br>
        <strong>Adresse :</strong> Dakar, Sénégal<br>
        <strong>Email :</strong> contact@korilab.dev<br>
        <strong>Site :</strong> korilab.dev
      </div>
    </div>
    <div class="party-card client" data-label="Le Client">
      <div class="party-name">{{ $client_name }}</div>
      <div class="party-detail">
        <strong>Activité :</strong> {{ $client_activity }}<br>
        <strong>Adresse :</strong> {{ $client_address }}<br>
        <strong>Email :</strong> {{ $client_email }}<br>
        <strong>Téléphone :</strong> {{ $client_phone }}
      </div>
    </div>
  </div>

  <div class="formule-section">
    <div class="section-label">Formule souscrite</div>
    <div class="formule-grid">
      @foreach([
        ['key' => 'starter',  'name' => 'Starter',  'price' => '35 000 F', 'details' => "Site vitrine 5 pages\nJusqu'à 2 modif./mois\nHébergement inclus\nSupport WhatsApp"],
        ['key' => 'business', 'name' => 'Business', 'price' => '75 000 F', 'details' => "Site avancé multipage\nJusqu'à 6 modif./mois\nE-commerce ou blog\nRapport mensuel"],
        ['key' => 'premium',  'name' => 'Premium',  'price' => '250 000 F','details' => "Application sur-mesure\nJusqu'à 12 modif./mois\nRéseaux sociaux inclus\nCampagnes publicitaires"],
      ] as $f)
      <div class="formule-option {{ $formule === $f['key'] ? 'selected' : '' }}">
        <span class="formule-check">{{ $formule === $f['key'] ? '✓' : '' }}</span>
        <div class="formule-name">{{ $f['name'] }}</div>
        <div class="formule-price">{{ $f['price'] }}</div>
        <div class="formule-details">{{ $f['details'] }}</div>
      </div>
      @endforeach
    </div>
  </div>

  <div class="article">
    <div class="article-header"><div class="article-num">Art. 1</div><div class="article-title">Objet du contrat</div></div>
    <div class="article-body">
      <p>Le présent contrat a pour objet de définir les conditions dans lesquelles <strong>KoriLab Studio</strong> assure la gestion, la maintenance et l'évolution de la présence digitale du Client dans le cadre de l'offre <strong>KoriLab Prestige</strong>.</p>
      <p>Les prestations comprennent : conception ou refonte du site web, hébergement, maintenance technique, mises à jour de contenu et, selon la formule choisie, gestion des réseaux sociaux et campagnes publicitaires.</p>
    </div>
  </div>

  <div class="article">
    <div class="article-header"><div class="article-num">Art. 2</div><div class="article-title">Durée et renouvellement</div></div>
    <div class="article-body">
      <p>Le contrat prend effet à la date de signature pour une durée initiale de <strong>3 (trois) mois</strong>. À l'issue de cette période, il se renouvelle tacitement de mois en mois, sauf résiliation notifiée avec un préavis de <strong>30 jours</strong>.</p>
      <p>Date de début : {{ \Carbon\Carbon::parse($date)->format('d/m/Y') }}</p>
    </div>
  </div>

  <div class="article">
    <div class="article-header"><div class="article-num">Art. 3</div><div class="article-title">Conditions financières</div></div>
    <div class="article-body">
      <p>L'abonnement est facturé mensuellement selon le tarif de la formule souscrite, payable au plus tard le <strong>1er de chaque mois</strong>.</p>
      <div class="table-wrapper">
        <table>
          <thead><tr><th>Événement</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td>J+0 (1er du mois)</td><td>Émission de la facture mensuelle</td></tr>
            <tr><td>J+3</td><td>Première relance amiable (WhatsApp/Email)</td></tr>
            <tr><td>J+7</td><td>Deuxième relance — suspension des mises à jour</td></tr>
            <tr><td>J+15</td><td>Mise en demeure — suspension du site</td></tr>
            <tr><td>J+30</td><td>Résiliation de plein droit, facturation des arriérés</td></tr>
          </tbody>
        </table>
      </div>
      <p><strong>Paiements acceptés :</strong> Wave · Orange Money · Virement bancaire</p>
      <div class="alert"><strong>⚠️ Important :</strong> Tout mois commencé est dû intégralement. Aucun remboursement au prorata en cas de résiliation en cours de mois.</div>
    </div>
  </div>

  <div class="article">
    <div class="article-header"><div class="article-num">Art. 4</div><div class="article-title">Obligations du Prestataire</div></div>
    <div class="article-body"><ul>
      <li>Livrer le site initial dans un délai de <strong>10 à 21 jours ouvrés</strong> selon la formule</li>
      <li>Garantir une disponibilité du site d'au moins <strong>99 %</strong> hors maintenance planifiée</li>
      <li>Traiter les demandes de modification dans un délai de <strong>72h ouvrées</strong></li>
      <li>Assurer la sauvegarde des données et fichiers du client</li>
      <li>Informer le client de toute intervention majeure avec un préavis de 24h minimum</li>
    </ul></div>
  </div>

  <div class="article">
    <div class="article-header"><div class="article-num">Art. 5</div><div class="article-title">Obligations du Client</div></div>
    <div class="article-body"><ul>
      <li>Fournir les contenus (textes, photos, logo) dans les <strong>5 jours ouvrés</strong> suivant la signature</li>
      <li>Désigner un interlocuteur unique pour les échanges avec KoriLab</li>
      <li>Valider les maquettes et livrables dans un délai de <strong>5 jours ouvrés</strong></li>
      <li>Régler les factures aux échéances convenues</li>
      <li>Ne pas modifier directement les fichiers hébergés sans autorisation préalable</li>
    </ul></div>
  </div>

  <div class="article">
    <div class="article-header"><div class="article-num">Art. 6</div><div class="article-title">Limites des modifications</div></div>
    <div class="article-body">
      <p>Au-delà du quota mensuel inclus dans la formule, chaque modification supplémentaire est facturée à <strong>5 000 FCFA / modification</strong>. Une modification correspond à une demande unitaire. Toute refonte partielle ou totale de page fera l'objet d'un devis séparé.</p>
    </div>
  </div>

  <div class="article">
    <div class="article-header"><div class="article-num">Art. 7</div><div class="article-title">Propriété intellectuelle</div></div>
    <div class="article-body">
      <p>Les contenus fournis par le Client restent sa propriété exclusive. À l'issue du contrat, le Client reçoit l'ensemble des fichiers sources dans un délai de <strong>15 jours ouvrés</strong> après la dernière mensualité réglée.</p>
    </div>
  </div>

  <div class="article">
    <div class="article-header"><div class="article-num">Art. 8</div><div class="article-title">Confidentialité</div></div>
    <div class="article-body">
      <p>Chaque partie s'engage à traiter avec la plus stricte confidentialité toutes les informations échangées. Cette obligation survit à la résiliation du contrat pour une durée de <strong>3 ans</strong>.</p>
    </div>
  </div>

  <div class="article">
    <div class="article-header"><div class="article-num">Art. 9</div><div class="article-title">Résiliation</div></div>
    <div class="article-body">
      <p>Chaque partie peut résilier le contrat par écrit avec un préavis de <strong>30 jours calendaires</strong>. En cas de manquement grave, le Prestataire se réserve le droit de résilier sans préavis après mise en demeure restée sans réponse sous <strong>48 heures</strong>.</p>
    </div>
  </div>

  <div class="article">
    <div class="article-header"><div class="article-num">Art. 10</div><div class="article-title">Limitation de responsabilité</div></div>
    <div class="article-body">
      <p>La responsabilité du Prestataire est limitée au montant des mensualités perçues au cours des 3 derniers mois. Il ne saurait être tenu responsable de pertes indirectes ou de dysfonctionnements liés à des services tiers.</p>
    </div>
  </div>

  <div class="article">
    <div class="article-header"><div class="article-num">Art. 11</div><div class="article-title">Force majeure</div></div>
    <div class="article-body">
      <p>Aucune des parties ne pourra être tenue responsable de l'inexécution de ses obligations en cas de survenance d'un événement de force majeure tel que défini par le droit sénégalais.</p>
    </div>
  </div>

  <div class="article">
    <div class="article-header"><div class="article-num">Art. 12</div><div class="article-title">Droit applicable et juridiction</div></div>
    <div class="article-body">
      <p>Le présent contrat est régi par le droit sénégalais. En cas de litige, les parties s'engagent à rechercher une solution amiable. À défaut, le litige sera porté devant les tribunaux compétents de <strong>Dakar</strong>.</p>
    </div>
  </div>

  <div class="article" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">
    <div class="article-header"><div class="article-num">Art. 13</div><div class="article-title">Dispositions générales</div></div>
    <div class="article-body">
      <p>Le présent contrat constitue l'intégralité de l'accord entre les parties et annule tout accord antérieur. Toute modification doit faire l'objet d'un avenant signé par les deux parties.</p>
    </div>
  </div>

  <div class="signatures">
    <div class="signatures-header">
      <h3>Signatures des parties</h3>
      <p>Fait à Dakar, en deux exemplaires originaux.</p>
    </div>
    <div class="signatures-grid">
      <div>
        <div class="sig-party">Le Prestataire</div>
        <div class="sig-name">KoriLab Studio</div>
        <div class="sig-role">Représenté par son responsable habilité</div>
        <div class="sig-field">Signature précédée de la mention « Lu et approuvé »</div>
        <div class="sig-date-field">Date : <span></span></div>
        <div class="lu-approuve">Lu et approuvé</div>
      </div>
      <div>
        <div class="sig-party">Le Client</div>
        <div class="sig-name">{{ $client_name }}</div>
        <div class="sig-role">{{ $client_activity }}</div>
        <div class="sig-field">Signature précédée de la mention « Lu et approuvé »</div>
        <div class="sig-date-field">Date : <span></span></div>
        <div class="lu-approuve">Lu et approuvé</div>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <div><span class="korilab">Kori<span>Lab</span></span> Studio · contact@korilab.dev · korilab.dev</div>
    <div>Document confidentiel — © {{ date('Y') }} KoriLab</div>
  </div>

</div>
</body>
</html>
