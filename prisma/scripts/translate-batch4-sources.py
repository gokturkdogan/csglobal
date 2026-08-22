#!/usr/bin/env python3
"""Generate batch4 translation JSON from Turkish sources (section-level translation)."""
from __future__ import annotations

import json
import re
import time
from pathlib import Path

from bs4 import BeautifulSoup, NavigableString
from deep_translator import GoogleTranslator

ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT / "data/fc-batch4-sources"
OUT_DIR = ROOT / "data/fc-batch4-translations"

SLUGS = [
    "bagimsiz-calisma-izni",
    "calisma-izni-transferi",
    "kilit-personel-calisma-izni",
    "sirket-ortagi-yabancilarin-calisma-izni",
    "yabanci-muhendis-mimar-calisma-izni",
    "yabanci-bakici-calisma-izni",
    "yabanci-ogretmen-calisma-izni",
    "yabanci-ogrenci-calisma-izni",
    "c-138-tahdit-kodu",
    "c-101-c-102-c-103-c-104-c-105-tahdit-kodlari",
    "m-67-interpol-dolandiricilik-tahdit-kodu",
    "v-70-tahdit-kodu",
]

SKIP_SLUGS = {
    "bagimsiz-calisma-izni",
    "calisma-izni-transferi",
    "c-138-tahdit-kodu",
    "v-70-tahdit-kodu",
    "m-67-interpol-dolandiricilik-tahdit-kodu",
    "c-101-c-102-c-103-c-104-c-105-tahdit-kodlari",
}

RETRANSLATE_SLUGS = {
    "sirket-ortagi-yabancilarin-calisma-izni",
    "yabanci-muhendis-mimar-calisma-izni",
    "yabanci-bakici-calisma-izni",
    "yabanci-ogretmen-calisma-izni",
    "yabanci-ogrenci-calisma-izni",
}

LOCALES = {"en": "en", "ar": "ar", "ru": "ru", "fa": "fa"}
CACHE: dict[tuple[str, str], str] = {}


def postprocess(text: str, locale: str) -> str:
    if not text:
        return text
    text = text.replace("\u2014", "-").replace("—", "-")
    if locale == "en":
        text = re.sub(r"\bTurkey\b", "Türkiye", text)
    return text


def translate_text(text: str, locale: str) -> str:
    text = text.strip()
    if not text:
        return text
    key = (locale, text)
    if key in CACHE:
        return CACHE[key]
    target = LOCALES[locale]
    out = None
    for attempt in range(4):
        try:
            out = GoogleTranslator(source="tr", target=target).translate(text)
            if out:
                break
        except Exception:
            time.sleep(1.0 * (attempt + 1))
    if not out:
        out = text
    out = postprocess(out, locale)
    CACHE[key] = out
    time.sleep(0.08)
    return out


def translate_html(html: str, locale: str) -> str:
    if not html or "<" not in html:
        return translate_text(html, locale)

    soup = BeautifulSoup(f"<root>{html}</root>", "html.parser")
    root = soup.root

    for tag in root.find_all(["p", "li", "em", "strong", "span"]):
        for child in list(tag.children):
            if isinstance(child, NavigableString):
                raw = str(child)
                if raw.strip():
                    child.replace_with(translate_text(raw, locale))

    # translate bare text nodes directly under root (headings without tags)
    for child in list(root.children):
        if isinstance(child, NavigableString):
            raw = str(child)
            if raw.strip():
                child.replace_with(translate_text(raw, locale))

    return "".join(str(c) for c in root.children)


def expand_field(value: str, intro_html: str) -> str:
    if value and not value.endswith("…") and not value.endswith("..."):
        return value
    plain = BeautifulSoup(intro_html, "html.parser").get_text(" ", strip=True)
    return plain[:650] if len(plain) > 650 else plain


def build_locale(data: dict, locale: str) -> dict:
    intro = data["sections"][0]["content"] if data.get("sections") else ""
    fields = {
        "name": data["name"],
        "excerpt": expand_field(data.get("excerpt", ""), intro),
        "shortDescription": expand_field(
            data.get("shortDescription", data.get("excerpt", "")), intro
        ),
        "heroTitle": data.get("heroTitle", data["name"]),
        "heroSubtitle": expand_field(data.get("heroSubtitle", data.get("excerpt", "")), intro),
    }
    return {
        **{k: translate_text(v, locale) for k, v in fields.items()},
        "sections": [
            {
                "title": translate_text(sec["title"], locale),
                "content": translate_html(sec["content"], locale),
            }
            for sec in data["sections"]
        ],
    }


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for slug in SLUGS:
        if slug in SKIP_SLUGS:
            print(f"skip (hand-crafted): {slug}")
            continue
        out_path = OUT_DIR / f"{slug}.json"
        if out_path.exists() and slug not in RETRANSLATE_SLUGS:
            print(f"skip (exists): {slug}")
            continue
        data = json.loads((SRC_DIR / f"{slug}.json").read_text(encoding="utf-8"))
        out = {locale: build_locale(data, locale) for locale in LOCALES}
        out_path.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"wrote {out_path}", flush=True)


if __name__ == "__main__":
    main()
