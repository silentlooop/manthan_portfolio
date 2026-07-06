#!/usr/bin/env python3
"""
Convert a photo into terminal-style ASCII/dot art as SVG + .txt preview.

Configurable variables at the top — change them to tweak output.
"""

from PIL import Image
import sys
import math

# ── CONFIG ──────────────────────────────────────────────────────────────

# Input image path (drag & drop your photo here, or pass as CLI arg)
INPUT_IMAGE = "input_photo.jpg"

# Output filenames
OUTPUT_SVG = "ascii_art.svg"
OUTPUT_TXT = "ascii_art.txt"

# Grid width in characters (~100-150 recommended for portrait photos)
GRID_COLS = 120

# Character ramp: left = lightest pixels, right = darkest pixels
CHAR_RAMP = " .:;-=+*#%@"

# Colors — match your site's terminal theme
BG_COLOR = "#111111"
CHAR_COLOR = "#22d3ee"       # teal/cyan (Tailwind cyan-400)
CHAR_COLOR_DIM = "#0891b2"    # darker cyan for mid-tones

# Font size in SVG (adjust to taste)
FONT_SIZE = 5

# Character spacing in SVG
CHAR_SPACING_X = 3.5
CHAR_SPACING_Y = 7

# ── END CONFIG ──────────────────────────────────────────────────────────


def brightness(r, g, b):
    """Luminance formula — perceptual brightness."""
    return 0.299 * r + 0.587 * g + 0.114 * b


def map_to_char(bright, ramp):
    """Map brightness (0-255) to a character from the ramp."""
    idx = int((bright / 255) * (len(ramp) - 1))
    return ramp[idx]


def generate_ascii(image_path, cols):
    """Downsample image to character grid."""
    img = Image.open(image_path).convert("RGB")

    # Character cells are roughly 2x taller than wide, so halve the rows
    aspect = img.height / img.width
    rows = int(cols * aspect * 0.5)

    img = img.resize((cols, rows), Image.LANCZOS)

    pixels = img.load()
    lines = []

    for y in range(rows):
        line = []
        for x in range(cols):
            r, g, b = pixels[x, y]
            bright = brightness(r, g, b)
            char = map_to_char(bright, CHAR_RAMP)
            line.append(char)
        lines.append("".join(line))

    return lines


def to_svg(lines):
    """Render character grid as SVG."""
    rows = len(lines)
    cols = max(len(l) for l in lines) if lines else 0

    svg_w = cols * CHAR_SPACING_X + 10
    svg_h = rows * CHAR_SPACING_Y + 10

    parts = [
        f'<?xml version="1.0" encoding="UTF-8"?>',
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'width="{svg_w}" height="{svg_h}" '
        f'viewBox="0 0 {svg_w} {svg_h}">',
        f'  <rect width="100%" height="100%" fill="{BG_COLOR}" rx="4"/>',
        f'  <g font-family="monospace" font-size="{FONT_SIZE}" '
        f'fill="{CHAR_COLOR}" text-anchor="middle">',
    ]

    for y, line in enumerate(lines):
        # Dim mid-tone lines slightly for depth
        brightness_level = y / rows
        if brightness_level > 0.3 and brightness_level < 0.7:
            fill = CHAR_COLOR_DIM
        else:
            fill = CHAR_COLOR

        for x, ch in enumerate(line):
            if ch != " ":
                cx = x * CHAR_SPACING_X + CHAR_SPACING_X / 2 + 5
                cy = y * CHAR_SPACING_Y + FONT_SIZE + 5
                parts.append(
                    f'    <text x="{cx:.1f}" y="{cy:.1f}" fill="{fill}">{ch}</text>'
                )

    parts.append("  </g>")
    parts.append("</svg>")

    return "\n".join(parts)


def to_txt(lines):
    """Render as plain text."""
    return "\n".join(lines)


def main():
    path = sys.argv[1] if len(sys.argv) > 1 else INPUT_IMAGE

    try:
        img = Image.open(path)
        print(f"Loaded: {path} ({img.size[0]}x{img.size[1]})")
    except FileNotFoundError:
        print(f"Error: file not found — {path}")
        print("Usage: python ascii_art.py <your_photo.jpg>")
        sys.exit(1)

    print(f"Grid: {GRID_COLS} cols → ~{int(GRID_COLS * img.size[1] / img.size[0] * 0.5)} rows")
    lines = generate_ascii(path, GRID_COLS)

    # SVG
    svg = to_svg(lines)
    with open(OUTPUT_SVG, "w") as f:
        f.write(svg)
    print(f"SVG written: {OUTPUT_SVG}")

    # TXT preview
    txt = to_txt(lines)
    with open(OUTPUT_TXT, "w") as f:
        f.write(txt)
    print(f"Text preview written: {OUTPUT_TXT}")

    print(f"\nColors: bg={BG_COLOR} text={CHAR_COLOR}")
    print(f"Ramp: {CHAR_RAMP}")
    print(f"Font size: {FONT_SIZE}px, spacing: {CHAR_SPACING_X}x{CHAR_SPACING_Y}")


if __name__ == "__main__":
    main()
