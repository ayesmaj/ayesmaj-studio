from pathlib import Path
from io import BytesIO

from PIL import Image, ImageChops
from reportlab.lib.colors import Color, HexColor, white
from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "output" / "pdf" / "AYESMAJ_Storyboard_Portfolio.pdf"
PAGE_W, PAGE_H = landscape(letter)

IVORY = HexColor("#F7F3EC")
PAPER = HexColor("#FFFCF7")
INK = HexColor("#17130F")
MUTED = HexColor("#6F685F")
GOLD = HexColor("#D9A441")
PURPLE = HexColor("#7B3FF2")
LAVENDER = HexColor("#D7C4FF")
LINE = HexColor("#D9D1C5")


PROJECTS = [
    ("01", "PARANORMAL VODKA", "THE PEACOCK AWAKENS", "Luxury Spirits / Product Film", ROOT / "public/storyboards-10/01-paranormal-the-peacock-awakens.webp"),
    ("02", "ASHE COFFEE", "FROM ORIGIN TO RITUAL", "Coffee / Origin Story", ROOT / "public/storyboards-10/02-ashe-from-origin-to-ritual.webp"),
    ("03", "VUDU ENERGY", "ACTIVATE THE NIGHT", "Beverage / Energy Campaign", ROOT / "public/storyboards-10/03-vudu-activate-the-night.webp"),
    ("04", "PODOS AI", "INFRASTRUCTURE ARRIVES", "AI Infrastructure / Product Launch", ROOT / "public/storyboards-10/04-podos-infrastructure-arrives.webp"),
    ("05", "SYNTROPIC", "ONE COMPUTER DOES THE WORK OF TEN", "AI Systems / Technical Explainer", ROOT / "public/storyboards-10/05-syntropic-one-computer-does-the-work-of-ten.webp"),
    ("06", "ELECTRIC FUEL AMERICA", "POWER ACROSS EVERY DOMAIN", "Defense Energy / Mission Film", ROOT / "public/storyboards-10/06-electric-fuel-power-across-every-domain.webp"),
    ("07", "REBOUND AESTHETICS", "RETURN TO YOURSELF", "Beauty / Human Story", ROOT / "public/storyboards-10/07-rebound-return-to-yourself.webp"),
    ("08", "KOLIE", "THE CALL YOU ALMOST MISSED", "AI Calling / Product Story", ROOT / "public/storyboards-10/08-kolie-the-call-you-almost-missed.webp"),
    ("09", "ARIZONA CHIMNEY PROS", "FROM OUTDATED TO CENTERPIECE", "Home Service / Transformation Story", ROOT / "public/storyboards-10/09-arizona-from-outdated-to-centerpiece.webp"),
    ("10", "AYESMAJ STUDIOS", "BUILDING A BRAND WORLD", "Studio / Brand Universe", ROOT / "public/storyboards-10/10-ayesmaj-building-a-brand-world.webp"),
]


def image_reader(path: Path):
    with Image.open(path) as image:
        rgb = image.convert("RGB")
        buffer = BytesIO()
        rgb.save(buffer, "JPEG", quality=94, optimize=True)
    buffer.seek(0)
    return ImageReader(buffer), buffer


def draw_cover_art(c: canvas.Canvas, path: Path, x, y, w, h, angle=0):
    c.saveState()
    c.translate(x + w / 2, y + h / 2)
    c.rotate(angle)
    c.setFillColor(Color(0, 0, 0, alpha=0.12))
    c.roundRect(-w / 2 + 5, -h / 2 - 6, w, h, 12, fill=1, stroke=0)
    c.setFillColor(white)
    c.roundRect(-w / 2, -h / 2, w, h, 12, fill=1, stroke=0)
    reader, keepalive = image_reader(path)
    c.drawImage(reader, -w / 2 + 8, -h / 2 + 8, w - 16, h - 16, preserveAspectRatio=True, anchor="c")
    c.restoreState()
    return keepalive


def draw_page_number(c, value):
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8)
    c.drawRightString(PAGE_W - 36, 22, f"AYESMAJ STUDIOS  /  STORYBOARD PORTFOLIO  /  {value:02d}")


def cover(c):
    c.setFillColor(IVORY)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    # Soft editorial color fields.
    c.setFillColor(Color(0.86, 0.64, 0.25, alpha=0.15))
    c.circle(80, PAGE_H - 40, 150, fill=1, stroke=0)
    c.setFillColor(Color(0.48, 0.25, 0.95, alpha=0.12))
    c.circle(PAGE_W - 80, 60, 190, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.rect(0, PAGE_H - 8, PAGE_W * 0.58, 8, fill=1, stroke=0)
    c.setFillColor(PURPLE)
    c.rect(PAGE_W * 0.58, PAGE_H - 8, PAGE_W * 0.42, 8, fill=1, stroke=0)

    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(48, PAGE_H - 55, "AYESMAJ STUDIOS  /  SELECTED WORK 2026")
    c.setFont("Helvetica-Bold", 38)
    c.drawString(48, PAGE_H - 137, "STORYBOARD")
    c.drawString(48, PAGE_H - 178, "PORTFOLIO")
    c.setFillColor(PURPLE)
    c.rect(48, PAGE_H - 195, 52, 4, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.rect(100, PAGE_H - 195, 52, 4, fill=1, stroke=0)

    c.setFillColor(INK)
    c.setFont("Helvetica", 15)
    c.drawString(48, PAGE_H - 232, "10 cinematic brand narratives.")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 9.5)
    c.drawString(48, PAGE_H - 253, "Creative direction / visual storytelling / production design")

    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(48, 91, "WE BUILD BRANDS. WE CREATE WORLDS.")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8.5)
    c.drawString(48, 72, "Brand / Web / AI / Motion / 3D")
    c.drawString(48, 52, "ayesmajstudios.com")

    keepalive = []
    keepalive.append(draw_cover_art(c, PROJECTS[0][4], 425, 320, 310, 174, 2.5))
    keepalive.append(draw_cover_art(c, PROJECTS[4][4], 445, 180, 280, 158, -2.5))
    keepalive.append(draw_cover_art(c, PROJECTS[9][4], 402, 38, 330, 186, 1.5))
    c.showPage()
    return keepalive


def project_page(c, project, page_no):
    number, brand, title, category, image_path = project
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 20)
    c.drawString(40, PAGE_H - 42, brand)
    brand_width = stringWidth(brand, "Helvetica-Bold", 20)
    c.setFillColor(GOLD if page_no % 2 else PURPLE)
    c.circle(52 + brand_width, PAGE_H - 35, 3, fill=1, stroke=0)

    c.setFillColor(MUTED)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(40, PAGE_H - 60, f"{number}  /  {category.upper()}")
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 10)
    c.drawRightString(PAGE_W - 40, PAGE_H - 44, title)

    x, y, w, h = 40, 64, PAGE_W - 80, 426
    c.setFillColor(Color(0, 0, 0, alpha=0.09))
    c.roundRect(x + 5, y - 6, w, h, 10, fill=1, stroke=0)
    c.setFillColor(white)
    c.roundRect(x, y, w, h, 10, fill=1, stroke=0)
    reader, keepalive = image_reader(image_path)
    c.drawImage(reader, x + 6, y + 6, w - 12, h - 12, preserveAspectRatio=True, anchor="c")

    c.setStrokeColor(LINE)
    c.setLineWidth(0.6)
    c.line(40, 43, PAGE_W - 40, 43)
    draw_page_number(c, page_no)
    c.showPage()
    return keepalive


def closing(c, page_no):
    c.setFillColor(INK)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(Color(0.48, 0.25, 0.95, alpha=0.20))
    c.circle(PAGE_W - 45, PAGE_H - 30, 150, fill=1, stroke=0)
    c.setFillColor(Color(0.86, 0.64, 0.25, alpha=0.16))
    c.circle(30, 20, 150, fill=1, stroke=0)

    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(48, PAGE_H - 55, "AYESMAJ STUDIOS  /  CREATIVE PROFILE")
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 32)
    c.drawString(48, PAGE_H - 115, "FROM IDEA TO FRAME.")
    c.setFont("Helvetica-Bold", 32)
    c.drawString(48, PAGE_H - 151, "FROM FRAME TO WORLD.")

    c.setFillColor(HexColor("#D7D0C8"))
    c.setFont("Helvetica", 11)
    lines = [
        "AYESMAJ Studios connects brand strategy, cinematic storytelling,",
        "AI-assisted production, websites, motion, and 3D into one visual system.",
    ]
    for i, line in enumerate(lines):
        c.drawString(48, PAGE_H - 190 - i * 17, line)

    capabilities = [
        "BRAND STRATEGY & IDENTITY",
        "STORYBOARD & ART DIRECTION",
        "AI CONTENT PRODUCTION",
        "WEB DESIGN & DEVELOPMENT",
        "MOTION, FILM & VFX",
        "3D & CGI WORLDS",
    ]
    c.setFont("Helvetica-Bold", 9)
    for index, capability in enumerate(capabilities):
        col = index % 2
        row = index // 2
        x = 48 + col * 226
        y = PAGE_H - 270 - row * 45
        c.setFillColor(PURPLE if col else GOLD)
        c.circle(x + 4, y + 4, 3, fill=1, stroke=0)
        c.setFillColor(white)
        c.drawString(x + 16, y, capability)

    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(48, 80, "LET'S BUILD THE NEXT BRAND WORLD.")
    c.setFont("Helvetica", 9)
    c.setFillColor(HexColor("#D7D0C8"))
    c.drawString(48, 59, "ayesmajstudios.com  /  ayesmajstudios@gmail.com  /  +1 (509) 319-7999")

    # Mini contact-sheet strip of the ten projects.
    keepalive = []
    thumb_w, thumb_h = 102, 57.4
    start_x, start_y = 500, 346
    for index, project in enumerate(PROJECTS):
        col, row = index % 2, index // 2
        x = start_x + col * 112
        y = start_y - row * 66
        c.setFillColor(white)
        c.roundRect(x - 2, y - 2, thumb_w + 4, thumb_h + 4, 4, fill=1, stroke=0)
        reader, buffer = image_reader(project[4])
        keepalive.append(buffer)
        c.drawImage(reader, x, y, thumb_w, thumb_h, preserveAspectRatio=True, anchor="c")

    c.setFillColor(HexColor("#8E887F"))
    c.setFont("Helvetica", 8)
    c.drawRightString(PAGE_W - 36, 22, f"AYESMAJ STUDIOS  /  STORYBOARD PORTFOLIO  /  {page_no:02d}")
    c.showPage()
    return keepalive


def build():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
    c.setTitle("AYESMAJ Studios - Storyboard Portfolio")
    c.setAuthor("AYESMAJ Studios")
    c.setSubject("Ten cinematic storyboard case studies")

    buffers = []
    buffers.extend(cover(c))
    for page_no, project in enumerate(PROJECTS, start=2):
        buffers.append(project_page(c, project, page_no))
    buffers.extend(closing(c, 12))
    c.save()

    reader = PdfReader(str(OUT))
    if len(reader.pages) != 12:
        raise RuntimeError(f"Expected 12 pages, found {len(reader.pages)}")
    print(f"Wrote {OUT}")
    print(f"Pages: {len(reader.pages)}")


if __name__ == "__main__":
    build()
