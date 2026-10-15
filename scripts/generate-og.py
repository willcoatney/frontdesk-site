"""Render trade Open Graph images. Cleaning keeps the existing designed file."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
OUT = Path(__file__).resolve().parents[1] / "public" / "og"
SERIF = "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf"
SANS = "/usr/share/fonts/truetype/macos/Inter-Medium.ttf"
SANS_BOLD = "/usr/share/fonts/truetype/macos/Inter-SemiBold.ttf"

FOREST = (27, 67, 50)
FOREST_DEEP = (16, 42, 32)
CREAM = (246, 243, 236)
MUTED = (215, 230, 220)
GOLD = (196, 165, 116)

PAGES = [
    ("electricians", "Electricians", "Answered while you are on the ladder."),
    ("tree-service", "Tree service", "Answered while you are in the tree."),
    ("painters", "Painters", "Answered while the brush is in your hand."),
    ("handyman", "Handyman", "Answered while you are mid-repair."),
    ("mobile-detailing", "Mobile detailing", "Answered while you are on a driveway."),
    ("lawn-care", "Lawn care", "Answered while you are on the mower."),
    ("pest-control", "Pest control", "Answered while you are under the house."),
]


def wrap(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    lines: list[str] = []
    current = ""
    for word in text.split():
        trial = word if not current else f"{current} {word}"
        if draw.textlength(trial, font=font) <= max_width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def render(slug: str, kicker: str, headline: str) -> None:
    image = Image.new("RGB", (W, H), FOREST_DEEP)
    draw = ImageDraw.Draw(image)
    draw.ellipse((780, -220, 1420, 420), fill=FOREST)
    draw.rectangle((0, 0, 16, H), fill=GOLD)

    kicker_font = ImageFont.truetype(SANS_BOLD, 22)
    headline_font = ImageFont.truetype(SERIF, 68)
    sub_font = ImageFont.truetype(SANS, 28)
    foot_font = ImageFont.truetype(SANS, 24)

    draw.text((72, 78), "FRONTDESK AI  ·  OLATHE", font=kicker_font, fill=GOLD)
    draw.text((72, 118), kicker.upper(), font=kicker_font, fill=MUTED)

    y = 190
    for line in wrap(draw, headline, headline_font, 980):
        draw.text((72, y), line, font=headline_font, fill=CREAM)
        y += 82

    draw.text((72, y + 18), "Built and run from Olathe, for the Kansas City metro.", font=sub_font, fill=MUTED)
    draw.text((72, H - 78), "frontdeskkc.com   ·   (913) 717-7841", font=foot_font, fill=CREAM)
    image.save(OUT / f"{slug}.png", "PNG")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for slug, kicker, headline in PAGES:
        render(slug, kicker, headline)
    print(f"wrote {len(PAGES)} images to {OUT}")
