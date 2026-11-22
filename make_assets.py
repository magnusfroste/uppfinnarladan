#!/usr/bin/env python3
"""Ikoner, og-bild och småfiler för Uppfinnarlådan – allt lokalt, inga CDN:er."""
from __future__ import annotations

import json
import pathlib
import shutil

from PIL import Image, ImageDraw, ImageFont

APP = pathlib.Path("/opt/data/projects/uppfinnarladan/public")
KÄLLA = pathlib.Path("/opt/data/projects/marre-marta/public")
PAPPER = (250, 247, 242)
INK = (20, 24, 31)
BLÅ = (47, 111, 159)
MÖRKBLÅ = (35, 85, 119)
RÖD = (217, 74, 61)
GULD = (233, 182, 47)
GRÄDDE = (253, 251, 247)


def typsnitt(vikt: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(KÄLLA / f"fonts/fredoka-{vikt}.ttf"), 10)


def tile(sida: int, märke: float) -> Image.Image:
    """Rundad blå ruta med en öppen låda och en drake som sticker upp."""
    s = sida * 4
    im = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((0, 0, s - 1, s - 1), radius=int(s * 0.235), fill=BLÅ)

    # låda
    bx0, bx1 = s * 0.22, s * 0.78
    by0, by1 = s * 0.56, s * 0.80
    d.polygon([(bx0, by0), (bx1, by0), (bx1 - s * 0.06, by1), (bx0 + s * 0.06, by1)], fill=GRÄDDE)
    d.rounded_rectangle((bx0 - s * 0.03, by0 - s * 0.055, bx1 + s * 0.03, by0 + s * 0.035),
                        radius=int(s * 0.02), fill=(255, 255, 255))
    # kant inuti locket
    d.rounded_rectangle((bx0 + s * 0.02, by0 + s * 0.055, bx1 - s * 0.02, by0 + s * 0.075),
                        radius=int(s * 0.01), fill=(214, 226, 236))

    # drake (romb) ovanför lådan
    cx, cy = s * 0.5, s * 0.34
    w, h = s * 0.15, s * 0.20
    d.polygon([(cx, cy - h), (cx + w, cy), (cx, cy + h), (cx - w, cy)], fill=RÖD)
    d.polygon([(cx, cy - h * 0.5), (cx + w * 0.45, cy), (cx, cy + h * 0.5), (cx - w * 0.45, cy)], fill=GULD)
    # stjärt
    d.line([(cx, cy + h), (cx + s * 0.06, cy + h + s * 0.05), (cx + s * 0.02, cy + h + s * 0.09)],
           fill=GULD, width=int(s * 0.012), joint="curve")

    if märke < 1.0:
        ins = int(s * (1 - märke) / 2)
        im = im.crop((ins, ins, s - ins, s - ins))
    return im.resize((sida, sida), Image.LANCZOS)


def og() -> None:
    W, H = 1200, 630
    im = Image.new("RGB", (W, H), PAPPER)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((0, 0, W - 1, H - 1), radius=0, fill=PAPPER)

    # vänster: ikon + text
    ikon = tile(150, 1.0)
    im.paste(ikon, (86, 96), ikon)

    f_titel = ImageFont.truetype(str(KÄLLA / "fonts/fredoka-700.ttf"), 92)
    f_under = ImageFont.truetype(str(KÄLLA / "fonts/fredoka-500.ttf"), 38)
    f_liten = ImageFont.truetype(str(KÄLLA / "fonts/fredoka-500.ttf"), 26)

    d.text((86, 282), "Uppfinnarlådan", font=f_titel, fill=INK)
    d.text((90, 392), "kombinera två saker –", font=f_under, fill=(74, 82, 96))
    d.text((90, 438), "och använd det du byggt", font=f_under, fill=(74, 82, 96))

    d.text((90, 528), "Gratis · 4–8 år · iPad & dator · ingen inloggning", font=f_liten, fill=(120, 128, 140))

    # höger: en liten kedja papper + pinne = drake
    bx = 760
    d.rounded_rectangle((bx - 20, 150, W - 70, 500), radius=44, fill=(246, 241, 232))
    steg = [("papper", 0), ("pinne", 1)]
    for i, (_, k) in enumerate(steg):
        cy = 214 + k * 132
        d.ellipse((bx + 40, cy, bx + 160, cy + 120), fill=GRÄDDE, outline=(228, 220, 208), width=2)
        if i == 0:
            d.rounded_rectangle((bx + 76, cy + 26, bx + 124, cy + 92), radius=5, fill=(223, 230, 238))
        else:
            d.line([(bx + 62, cy + 84), (bx + 138, cy + 40)], fill=(169, 124, 80), width=16)
    d.text((bx + 188, 246), "+", font=ImageFont.truetype(str(KÄLLA / "fonts/fredoka-600.ttf"), 54), fill=(120, 128, 140))
    d.text((bx + 188, 378), "=", font=ImageFont.truetype(str(KÄLLA / "fonts/fredoka-600.ttf"), 54), fill=(120, 128, 140))
    cy = 368
    d.ellipse((bx + 250, cy, bx + 390, cy + 140), fill=GRÄDDE, outline=(228, 220, 208), width=2)
    cx2, cy2 = bx + 320, cy + 70
    d.polygon([(cx2, cy2 - 50), (cx2 + 40, cy2), (cx2, cy2 + 50), (cx2 - 40, cy2)], fill=RÖD)
    d.polygon([(cx2, cy2 - 24), (cx2 + 18, cy2), (cx2, cy2 + 24), (cx2 - 18, cy2)], fill=GULD)

    im.save(APP / "og.png", optimize=True)


def main() -> None:
    APP.mkdir(parents=True, exist_ok=True)
    if not (APP / "fonts").exists():
        shutil.copytree(KÄLLA / "fonts", APP / "fonts")

    tile(512, 1.0).save(APP / "icon-512.png")
    tile(512, 0.78).save(APP / "icon-maskable-512.png")
    tile(192, 1.0).save(APP / "icon-192.png")
    tile(180, 1.0).save(APP / "apple-touch-icon.png")
    tile(48, 1.0).save(APP / "favicon.png")

    (APP / "favicon.svg").write_text(
        """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="15" fill="#2f6f9f"/>
  <path d="M14 36h36l-4 15H18z" fill="#fdfbf7"/>
  <rect x="12" y="32" width="40" height="6" rx="3" fill="#fff"/>
  <path d="M32 12l9 11-9 11-9-11z" fill="#d94a3d"/>
  <path d="M32 17l4.5 6-4.5 6-4.5-6z" fill="#e9b62f"/>
</svg>
""",
        encoding="utf-8",
    )

    (APP / "site.webmanifest").write_text(
        json.dumps(
            {
                "name": "Uppfinnarlådan",
                "short_name": "Uppfinnarlådan",
                "description": "Kombinera två saker till något nytt och använd det du byggt. Pusselspel för barn 4–8 år.",
                "lang": "sv-SE",
                "start_url": "/",
                "scope": "/",
                "display": "standalone",
                "orientation": "any",
                "background_color": "#faf7f2",
                "theme_color": "#2f6f9f",
                "icons": [
                    {"src": "/icon-192.png", "sizes": "192x192", "type": "image/png"},
                    {"src": "/icon-512.png", "sizes": "512x512", "type": "image/png"},
                    {"src": "/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"},
                ],
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )

    (APP / "robots.txt").write_text(
        "User-agent: *\nAllow: /\n\nSitemap: https://uppfinnarladan.shipholm.dev/sitemap.xml\n",
        encoding="utf-8",
    )
    (APP / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        "  <url>\n    <loc>https://uppfinnarladan.shipholm.dev/</loc>\n"
        "    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n"
        "</urlset>\n",
        encoding="utf-8",
    )

    og()
    print("klart:", sorted(p.name for p in APP.iterdir()))


if __name__ == "__main__":
    main()