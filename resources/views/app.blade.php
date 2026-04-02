<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#C84818">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Jost:wght@200;300;400;500;600&display=swap" rel="stylesheet">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="KoriLab">
    <link rel="icon" href="/icon.svg" type="image/svg+xml">
    <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <meta name="description" content="KoriLab — Studio de design et développement web. Nous créons des expériences digitales de haut niveau pour les startups et entreprises.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://korilab.dev">
    <meta property="og:title" content="KoriLab — Studio de développement web, mobile & desktop">
    <meta property="og:description" content="KoriLab conçoit des applications web, mobile et desktop ultra-performantes pour les startups et entreprises. React, Laravel, Next.js, Flutter.">
    <meta property="og:image" content="https://korilab.dev/images/og-preview.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="KoriLab — Studio de développement web, mobile & desktop">
    <meta name="twitter:description" content="KoriLab conçoit des applications web, mobile et desktop ultra-performantes pour les startups et entreprises. React, Laravel, Next.js, Flutter.">
    <meta name="twitter:image" content="https://korilab.dev/images/og-preview.jpg">
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://korilab.dev/#website",
          "url": "https://korilab.dev",
          "name": "KoriLab",
          "description": "Studio de design et développement web à Dakar, Sénégal.",
          "inLanguage": "fr-SN"
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://korilab.dev/#business",
          "name": "KoriLab",
          "alternateName": "KoriLab Studio",
          "description": "Studio créatif spécialisé en développement web, mobile et desktop. Nous créons des expériences digitales de haut niveau pour les startups et entreprises en Afrique.",
          "url": "https://korilab.dev",
          "logo": "https://korilab.dev/icon-192.png",
          "image": "https://korilab.dev/images/og-preview.jpg",
          "telephone": "+221775341954",
          "email": "contact@korilab.dev",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Dakar",
            "addressCountry": "SN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 14.6937,
            "longitude": -17.4441
          },
          "areaServed": ["Sénégal", "Afrique de l'Ouest", "France"],
          "serviceType": [
            "Développement web",
            "Développement mobile",
            "Design UI/UX",
            "Branding",
            "Applications desktop"
          ],
          "priceRange": "$$",
          "sameAs": [
            "https://github.com/KoriLab"
          ]
        }
      ]
    }
    </script>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
</head>
<body class="bg-[#F4F5F7] text-[#111827] antialiased">
    @inertia
</body>
</html>
