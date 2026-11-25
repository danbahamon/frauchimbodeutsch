# -*- coding: utf-8 -*-
import json
import os
import sys

VALID_CATS = {
    "hello", "numbers", "colors", "family", "body", "clothes", "food", "fruit", "veg",
    "drinks", "animals", "house", "furniture", "kitchen", "city", "transport", "school",
    "jobs", "nature", "weather", "time", "feelings", "verbs", "adjectives", "travel",
    "shop", "hobbies", "tech", "lands", "bath", "office", "music", "sport", "health",
    "tools", "garden", "money", "materials", "shapes",
}
BANNED_DE = {"hallo", "haus", "apfel", "rot", "eins", "ich", "und"}
HERE = os.path.dirname(os.path.abspath(__file__))


def row_to_line(r):
    cefr, cat, kind, de, en, es = r[:6]
    if cat not in VALID_CATS:
        raise ValueError(f"invalid cat: {cat}")
    if de.lower() in BANNED_DE:
        raise ValueError(f"banned de: {de}")
    if kind == "noun":
        art, pl = r[6], r[7]
        if art not in ("der", "die", "das"):
            raise ValueError(f"bad article for {de}")
        return f"{cefr}|{cat}|noun|{de}|{en}|{es}|{art}|{pl}"
    return f"{cefr}|{cat}|{kind}|{de}|{en}|{es}"


def validate_and_write(rows, path):
    de, en, es = set(), set(), set()
    lines = []
    cats = {}
    for r in rows:
        line = row_to_line(r)
        parts = line.split("|")
        d, e, espan = parts[3].lower(), parts[4].lower(), parts[5].lower()
        if d in de:
            raise ValueError(f"dup de in file: {parts[3]}")
        if e in en:
            raise ValueError(f"dup en in file: {parts[4]}")
        if espan in es:
            raise ValueError(f"dup es in file: {parts[5]}")
        de.add(d)
        en.add(e)
        es.add(espan)
        cats[parts[1]] = cats.get(parts[1], 0) + 1
        lines.append(line)
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(lines) + "\n")
    return len(lines), cats


def load(name):
    with open(os.path.join(HERE, name), encoding="utf-8") as f:
        return json.load(f)


if __name__ == "__main__":
    a2_path = os.path.join(HERE, "pipe-a2.txt")
    b1_path = os.path.join(HERE, "pipe-b1.txt")
    a2 = load("data-a2.json")
    b1 = load("data-b1.json")
    if len(a2) != 360:
        print(f"A2 expected 360 got {len(a2)}", file=sys.stderr)
        sys.exit(1)
    if len(b1) != 450:
        print(f"B1 expected 450 got {len(b1)}", file=sys.stderr)
        sys.exit(1)
    n2, c2 = validate_and_write(a2, a2_path)
    n1, c1 = validate_and_write(b1, b1_path)
    print(json.dumps({"a2": n2, "b1": n1, "a2_cats": len(c2), "b1_cats": len(c1)}, indent=2))