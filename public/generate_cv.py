"""
CV Ibrahima Sarr — Reproduction fidele design Daniel Gallego
- Police Arial Black pour le nom
- Accent bleu acier #4F7298 pour titres
- Icones dessinées contact
- Format experience: Titre -> Entreprise -> Periode -> Bullets
- Grand espace blanc sous header
"""

import os, sys, tempfile, subprocess, math

for pkg in ["reportlab", "qrcode[pil]", "pymupdf"]:
    try:
        if "qrcode" in pkg: import qrcode
        elif "pymupdf" in pkg: import fitz
        else: import reportlab
    except ImportError:
        subprocess.check_call([sys.executable, "-m", "pip", "install", pkg, "-q"])

from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import qrcode as qrlib

# ── Fontes ────────────────────────────────────────────────────────────────────
HEAVY  = "Helvetica-Bold"   # fallback
BODY   = "Helvetica"
BODY_B = "Helvetica-Bold"
BODY_I = "Helvetica-Oblique"

_fonts = [
    ("ArialBlack",  r"C:\Windows\Fonts\ariblk.ttf",   "HEAVY"),
    ("SegoeUI",     r"C:\Windows\Fonts\segoeui.ttf",   "BODY"),
    ("SegoeUIBold", r"C:\Windows\Fonts\segoeuib.ttf",  "BODY_B"),
    ("SegoeUIItal", r"C:\Windows\Fonts\segoeuii.ttf",  "BODY_I"),
]
for fname, path, var in _fonts:
    if os.path.exists(path):
        try:
            pdfmetrics.registerFont(TTFont(fname, path))
            globals()[var] = fname
        except Exception: pass

# ── Palette ───────────────────────────────────────────────────────────────────
S_BG    = HexColor("#1E3353")   # sidebar navy
S_DARK  = HexColor("#152740")   # polygone sombre
S_MID   = HexColor("#263F60")   # polygone intermediaire
S_DIV   = HexColor("#2A4468")   # separateurs sidebar
S_TEXT  = HexColor("#FFFFFF")
S_TEXT2 = HexColor("#B0C4D8")

M_BG    = HexColor("#FFFFFF")
M_TEXT  = HexColor("#1C2536")
M_TEXT2 = HexColor("#3D4F62")
M_TEXT3 = HexColor("#9099AA")
M_BORDER= HexColor("#D8E0EA")

ACCENT  = HexColor("#4F7298")   # acier bleu — titres sections + icones

# ── Geometrie ─────────────────────────────────────────────────────────────────
PW, PH  = A4                    # 595.27 x 841.89
SB_W    = 200
MAIN_X  = SB_W
MAIN_W  = PW - SB_W
PAD_S   = 22
PAD_M   = 30
CX_M    = MAIN_X + PAD_M
CW_M    = MAIN_W - PAD_M * 2

# ── Primitives ────────────────────────────────────────────────────────────────
def frect(c, x, y, w, h, col):
    c.setFillColor(col); c.rect(x, y, w, h, fill=1, stroke=0)

def txt(c, s, x, y, font=None, size=9, col=None):
    f = font or BODY
    if col: c.setFillColor(col)
    c.setFont(f, size); c.drawString(x, y, str(s))

def txt_r(c, s, x, y, font=None, size=9, col=None):
    f = font or BODY
    if col: c.setFillColor(col)
    c.setFont(f, size); c.drawRightString(x, y, str(s))

def txt_c(c, s, cx, y, font=None, size=9, col=None):
    f = font or BODY
    if col: c.setFillColor(col)
    c.setFont(f, size)
    c.drawString(cx - c.stringWidth(str(s), f, size)/2, y, str(s))

def tracked(c, s, cx, y, font=None, size=8, col=None, sp=2.5):
    """Tracking lettre par lettre, centre sur cx."""
    f = font or BODY_B
    if col: c.setFillColor(col)
    c.setFont(f, size)
    s = str(s)
    total = sum(c.stringWidth(ch, f, size) for ch in s) + sp*(len(s)-1)
    x = cx - total/2
    for ch in s:
        c.drawString(x, y, ch); x += c.stringWidth(ch, f, size) + sp

def tracked_left(c, s, x, y, font=None, size=9, col=None, sp=2.2):
    """Tracking aligne gauche."""
    f = font or BODY_B
    if col: c.setFillColor(col)
    c.setFont(f, size)
    for ch in str(s):
        c.drawString(x, y, ch); x += c.stringWidth(ch, f, size) + sp

def hline(c, x1, x2, y, lw=0.5, col=M_BORDER):
    c.setStrokeColor(col); c.setLineWidth(lw)
    c.line(x1, y, x2, y); c.setLineWidth(0.5)

def wrap(c, text, x, y, maxw, font=None, size=9, col=None, lh=14):
    f = font or BODY
    if col: c.setFillColor(col)
    c.setFont(f, size)
    words = str(text).split(); line = ""
    for w in words:
        test = (line+" "+w).strip()
        if c.stringWidth(test, f, size) <= maxw: line = test
        else:
            if line: c.drawString(x, y, line); y -= lh
            line = w
    if line: c.drawString(x, y, line); y -= lh
    return y

# ── Titres sections ────────────────────────────────────────────────────────────
def sb_title(c, y, label):
    """Sidebar : tracked centre, filets lateraux, ACCENT color."""
    cx = SB_W / 2
    f  = BODY_B; sz = 7.5; sp = 2.2
    tw = sum(c.stringWidth(ch, f, sz) for ch in str(label)) + sp*(len(str(label))-1)
    g  = 10
    hline(c, PAD_S, cx-tw/2-g, y+4, lw=0.35, col=S_DIV)
    hline(c, cx+tw/2+g, SB_W-PAD_S, y+4, lw=0.35, col=S_DIV)
    tracked(c, label, cx, y, f, sz, ACCENT, sp=sp)
    return y - 18

def main_title(c, y, label):
    """Main : tracked gauche, ACCENT color, filet sous."""
    tracked_left(c, label, CX_M, y, BODY_B, 9.5, ACCENT, sp=2.5)
    hline(c, CX_M, CX_M+CW_M, y-6, lw=0.7, col=M_BORDER)
    return y - 24

# ── Icones contact (dessinées) ─────────────────────────────────────────────────
def icon_phone(c, x, cy):
    """Combine: boite + combiné."""
    c.setFillColor(ACCENT)
    # Corps du téléphone
    c.roundRect(x+1, cy-6, 9, 13, 2, fill=1, stroke=0)
    c.setFillColor(S_BG)
    # Ecran
    c.roundRect(x+2.5, cy-4, 6, 8, 1, fill=1, stroke=0)
    c.setFillColor(ACCENT)
    # Bouton bas
    c.circle(x+5.5, cy-5.5, 1.2, fill=1, stroke=0)

def icon_email(c, x, cy):
    """Enveloppe simple."""
    c.setFillColor(ACCENT)
    c.roundRect(x, cy-5, 12, 9, 1.5, fill=1, stroke=0)
    # V blanc
    c.setStrokeColor(S_BG); c.setLineWidth(1.3)
    c.line(x+0.5, cy+3.5, x+6, cy-1)
    c.line(x+6, cy-1, x+11.5, cy+3.5)
    c.setLineWidth(0.5)

def icon_location(c, x, cy):
    """Pin localisation."""
    c.setFillColor(ACCENT)
    # Cercle haut
    c.circle(x+5.5, cy+5, 5.5, fill=1, stroke=0)
    # Triangle bas (pointe)
    p = c.beginPath()
    p.moveTo(x+1, cy+2); p.lineTo(x+10, cy+2); p.lineTo(x+5.5, cy-5)
    p.close()
    c.drawPath(p, fill=1, stroke=0)
    # Trou blanc central
    c.setFillColor(S_BG)
    c.circle(x+5.5, cy+5, 2.2, fill=1, stroke=0)

# ══════════════════════════════════════════════════════════════════════════════
# SIDEBAR
# ══════════════════════════════════════════════════════════════════════════════
def draw_sidebar(c, qr_path):
    frect(c, 0, 0, SB_W, PH, S_BG)

    # Polygone 1 sombre (diagonal large)
    p = c.beginPath()
    p.moveTo(0, PH); p.lineTo(SB_W, PH)
    p.lineTo(SB_W, PH-120); p.lineTo(0, PH-200)
    p.close()
    c.setFillColor(S_DARK); c.drawPath(p, fill=1, stroke=0)

    # Polygone 2 intermediaire (bande croisee)
    p = c.beginPath()
    p.moveTo(SB_W, PH); p.lineTo(SB_W, PH-60)
    p.lineTo(0, PH-110); p.lineTo(0, PH-68)
    p.close()
    c.setFillColor(S_MID); c.drawPath(p, fill=1, stroke=0)

    # ── Avatar ────────────────────────────────────────────────────────────────
    cx  = SB_W / 2
    avy = PH - 106
    avr = 50

    # Anneau externe
    c.setStrokeColor(HexColor("#FFFFFF15")); c.setLineWidth(1.5)
    c.circle(cx, avy, avr+8, fill=0, stroke=1)

    # Cercle principal
    c.setFillColor(S_DARK); c.setStrokeColor(white); c.setLineWidth(2.5)
    c.circle(cx, avy, avr, fill=1, stroke=1); c.setLineWidth(0.5)

    # Bande diagonale clippee dans le cercle
    c.saveState()
    pts = [(cx + avr*math.cos(math.radians(a)),
            avy + avr*math.sin(math.radians(a))) for a in range(0, 360, 3)]
    cp = c.beginPath()
    cp.moveTo(*pts[0])
    for pt in pts[1:]: cp.lineTo(*pt)
    cp.close()
    c.clipPath(cp, fill=0, stroke=0)
    c.translate(cx, avy); c.rotate(-42)
    c.setFillColor(HexColor("#3A5775"))
    c.rect(-avr, -12, avr*2, 24, fill=1, stroke=0)
    c.restoreState()

    # Rebord blanc du cercle
    c.setStrokeColor(white); c.setLineWidth(2.5)
    c.circle(cx, avy, avr, fill=0, stroke=1); c.setLineWidth(0.5)

    # Initiales I et S (decalees pour eviter la bande)
    c.setFillColor(white)
    c.setFont(BODY_B, 34)
    iw = c.stringWidth("I", BODY_B, 34)
    c.drawString(cx - iw/2 - 8, avy + 13, "I")

    c.setFont(BODY_B, 34)
    sw = c.stringWidth("S", BODY_B, 34)
    c.drawString(cx - sw/2 + 8, avy - 32, "S")

    # Position debut contenu sidebar
    y = avy - avr - 28

    # ── CONTACT ───────────────────────────────────────────────────────────────
    y = sb_title(c, y, "CONTACT")
    for draw_icon, val in [
        (icon_phone,    "+221 77-534-19-54"),
        (icon_email,    "sarriboo534@gmail.com"),
        (icon_location, "MTOA, Rufisque"),
    ]:
        draw_icon(c, PAD_S, y+4)
        txt(c, val, PAD_S+20, y, BODY, 8.5, S_TEXT)
        y -= 17
    y -= 6

    # ── FORMATIONS ────────────────────────────────────────────────────────────
    hline(c, PAD_S, SB_W-PAD_S, y+2, lw=0.35, col=S_DIV)
    y -= 12
    y = sb_title(c, y, "FORMATIONS")
    for deg_lines, school, yr in [
        (["CERTIFICATION CYBER-S\u00c9CURIT\u00c9"],
         "4ITSEC AFRICA - Dakar", "2025"),
        (["LICENCE 3 EN PROGRAMMATION -", "D\u00c9VELOPPEMENT"],
         "Sup' Info - Dakar", "2021"),
        (["BACCALAUREAT"],
         "Lyc\u00e9e Etoile du Saloum - Sokone", "2019"),
    ]:
        for line in deg_lines:
            txt(c, line, PAD_S, y, BODY_B, 8.5, S_TEXT)
            y -= 11
        txt(c, school, PAD_S, y, BODY, 7.5, S_TEXT2)
        y -= 11
        txt(c, yr, PAD_S, y, BODY_B, 8, S_TEXT)
        y -= 15
    y -= 2

    # ── COMPETENCES ───────────────────────────────────────────────────────────
    hline(c, PAD_S, SB_W-PAD_S, y+2, lw=0.35, col=S_DIV)
    y -= 12
    y = sb_title(c, y, "COMP\u00c9TENCES")
    for sk in ["Maintenance informatique",
               "Framework : PHP/Laravel, C#",
               "Cms: Wordpress, Wix, Ojs",
               "Infographie",
               "Maitrise IA",
               "Voix off"]:
        txt(c, sk, PAD_S, y, BODY, 8.5, S_TEXT2)
        y -= 13
    y -= 2

    # ── LANGUES ───────────────────────────────────────────────────────────────
    hline(c, PAD_S, SB_W-PAD_S, y+2, lw=0.35, col=S_DIV)
    y -= 12
    y = sb_title(c, y, "LANGUES")
    for lang, lvl in [("Fran\u00e7ais",  "Excellent"),
                      ("Anglais",        "Bien"),
                      ("Wolof",          "Langue maternelle"),
                      ("Sereer",         "Langue maternelle")]:
        txt(c, lang + " : " + lvl, PAD_S, y, BODY, 8.5, S_TEXT2)
        y -= 13

    # ── QR code fixe en bas ───────────────────────────────────────────────────
    qr_s = 38
    qr_x = (SB_W - qr_s) / 2
    c.drawImage(qr_path, qr_x, 28, width=qr_s, height=qr_s,
                preserveAspectRatio=True)
    lbl = "korilab.dev"
    lw  = c.stringWidth(lbl, BODY, 7)
    txt(c, lbl, (SB_W-lw)/2, 17, BODY, 7, S_TEXT2)


# ══════════════════════════════════════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════════════════════════════════════
def draw_main(c):
    frect(c, MAIN_X, 0, MAIN_W, PH, M_BG)

    y = PH - 38

    # ── Nom — font lourde ─────────────────────────────────────────────────────
    txt(c, "IBRAHIMA SARR", CX_M, y, HEAVY, 36, M_TEXT)
    y -= 22
    tracked_left(c, "D\u00c9VELOPPEUR WEB - INFOGRAPHE",
                 CX_M, y, BODY, 10, ACCENT, sp=1.8)
    y -= 54   # grand espace blanc comme dans la reference

    # ── RESUME ────────────────────────────────────────────────────────────────
    y = main_title(c, y, "R\u00c9SUM\u00c9")
    resume = ("Jeune dipl\u00f4m\u00e9 en Programmation et D\u00e9veloppement, je suis \u00e0 la "
              "recherche de nouveaux d\u00e9fis pour approfondir mes comp\u00e9tences et contribuer "
              "\u00e0 des projets plus complexes. Je suis pr\u00eat \u00e0 m'investir pleinement pour "
              "apporter une valeur ajout\u00e9e \u00e0 votre \u00e9quipe et participer activement "
              "\u00e0 votre r\u00e9ussite.")
    y = wrap(c, resume, CX_M, y, CW_M, BODY, 9.5, M_TEXT2, lh=15)
    y -= 24

    hline(c, CX_M, CX_M+CW_M, y+2, lw=0.6, col=M_BORDER)
    y -= 22

    # ── EXPERIENCE ────────────────────────────────────────────────────────────
    y = main_title(c, y, "EXPERIENCE")

    # Format ref: Titre (bold) -> Entreprise (regular) -> Periode (bold) -> bullets
    txt(c, "TECHNICIEN & D\u00c9VELOPPEUR", CX_M, y, BODY_B, 10.5, M_TEXT)
    y -= 14
    txt(c, "FASTEF - Ex Ecole Normale Sup\u00e9rieure", CX_M, y, BODY, 9.5, M_TEXT2)
    y -= 13
    txt(c, "Depuis 2023", CX_M, y, BODY_B, 9.5, M_TEXT)
    y -= 16

    for b in [
        "D\u00e9veloppement d'applications Web sur Ojs pour le D\u00e9partement "
        "Math\u00e9matiques - Site de revues risadima",
        "D\u00e9veloppement d'applications pour le Service d'Approvisionnement",
        "Application Web de r\u00e9servation des salles de classes",
        "Support \u00e0 la r\u00e9alisation des outils de communication : b\u00e2che, "
        "roll up, flyers, etc. & montage vid\u00e9os",
        "Maintance des outils informatique : sofware & hardware",
    ]:
        txt(c, "\u2022", CX_M+2, y, BODY, 9.5, ACCENT)
        y = wrap(c, b, CX_M+14, y, CW_M-14, BODY, 9.5, M_TEXT2, lh=14)
        y -= 4

    hline(c, CX_M, CX_M+CW_M, y-2, lw=0.6, col=M_BORDER)
    y -= 24

    # ── REALISATIONS FREELANCE ────────────────────────────────────────────────
    y = main_title(c, y, "R\u00c9ALISATIONS FREELANCE")

    # Agence Emerite
    txt(c, "DEVELOPPEUR WEB", CX_M, y, BODY_B, 10.5, M_TEXT)
    y -= 14
    txt(c, "Agence Emerite Canada", CX_M, y, BODY, 9.5, M_TEXT2)
    y -= 13
    txt(c, "2025", CX_M, y, BODY_B, 9.5, M_TEXT)
    y -= 16
    for b in [
        "R\u00e9actualisation du site de l'agence emerite",
        "Cr\u00e9ation site one page de coiffure mendi's",
        "Cr\u00e9ation site one page salon de beaut\u00e9 bergeron esth\u00e9tique",
    ]:
        txt(c, "\u2022", CX_M+2, y, BODY, 9.5, ACCENT)
        txt(c, b, CX_M+14, y, BODY, 9.5, M_TEXT2)
        y -= 14
    y -= 8

    # E-commerce CTGHT
    txt(c, "E-COMMERCE CTGHT", CX_M, y, BODY_B, 10.5, M_TEXT)
    y -= 14
    txt(c, "Conception et d\u00e9veloppement e-commerce complet", CX_M, y, BODY, 9.5, M_TEXT2)
    y -= 13
    txt(c, "2024", CX_M, y, BODY_B, 9.5, M_TEXT)
    y -= 16
    for b in ["Conception et d\u00e9veloppement WooCommerce / PHP complet"]:
        txt(c, "\u2022", CX_M+2, y, BODY, 9.5, ACCENT)
        txt(c, b, CX_M+14, y, BODY, 9.5, M_TEXT2)
        y -= 14
    y -= 8

    # Voix off
    txt(c, "VOIX OFF \u2014 kL_says", CX_M, y, BODY_B, 10.5, M_TEXT)
    y -= 14
    txt(c, "Production contenu Instagram", CX_M, y, BODY, 9.5, M_TEXT2)
    y -= 13
    txt(c, "2025", CX_M, y, BODY_B, 9.5, M_TEXT)
    y -= 16
    txt(c, "\u2022", CX_M+2, y, BODY, 9.5, ACCENT)
    txt(c, "Enregistrement et production de voix off pour contenu digital", CX_M+14, y, BODY, 9.5, M_TEXT2)

    # ── Footer ────────────────────────────────────────────────────────────────
    hline(c, CX_M, CX_M+CW_M, 30, lw=0.5, col=M_BORDER)
    txt(c, "sarriboo534@gmail.com  \u00b7  +221 77-534-19-54",
        CX_M, 18, BODY, 7.5, M_TEXT3)
    txt_r(c, "linkedin.com/in/ibrahima-sarr  \u00b7  korilab.dev",
          CX_M+CW_M, 18, BODY, 7.5, M_TEXT3)


# ══════════════════════════════════════════════════════════════════════════════
# QR + Generation
# ══════════════════════════════════════════════════════════════════════════════
def make_qr(url, path):
    qr = qrlib.QRCode(version=1, error_correction=qrlib.constants.ERROR_CORRECT_M,
                      box_size=5, border=1)
    qr.add_data(url); qr.make(fit=True)
    img = qr.make_image(fill_color="#1E3353", back_color="white")
    img.save(path)

def generate(out_pdf, out_png=None):
    qr_tmp = os.path.join(tempfile.gettempdir(), "_cv_qr.png")
    make_qr("https://korilab.dev", qr_tmp)

    c = canvas.Canvas(out_pdf, pagesize=A4)
    c.setTitle("CV \u2014 Ibrahima Sarr")
    c.setAuthor("Ibrahima Sarr")

    frect(c, 0, 0, PW, PH, M_BG)
    draw_sidebar(c, qr_tmp)
    draw_main(c)
    c.save()

    try: os.remove(qr_tmp)
    except: pass

    print(f"PDF: {out_pdf} ({os.path.getsize(out_pdf)//1024} KB)")
    if out_png:
        import fitz
        doc = fitz.open(out_pdf)
        pix = doc[0].get_pixmap(matrix=fitz.Matrix(2, 2))
        pix.save(out_png); doc.close()
        print(f"PNG: {out_png} ({os.path.getsize(out_png)//1024} KB)")


if __name__ == "__main__":
    base = os.path.dirname(os.path.abspath(__file__))
    generate(
        os.path.join(base, "cv-ibrahima-sarr.pdf"),
        os.path.join(base, "cv-preview.png"),
    )
