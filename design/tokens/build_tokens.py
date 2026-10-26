"""Build tokens.css from tokens.json. Every theme becomes [data-theme="<id>"]; the active theme is also on :root."""
import json, pathlib
here = pathlib.Path(__file__).parent
t = json.loads((here / "tokens.json").read_text())
def block(sel, th):
    out = [f"{sel} {{"]
    for k, v in th["color"].items(): out.append(f"  --rb-{k}: {v};")
    for k, v in th["font"].items(): out.append(f"  --rb-font-{k}: {v};")
    return out
lines = ["/* GENERATED from tokens.json by build_tokens.py. Do not edit by hand. */",
         "/* Swap direction: <html data-theme=\"southern-sky\"> or change \"active\" in tokens.json. */", ""]
for tid, th in t["themes"].items():
    sel = f':root, [data-theme="{tid}"]' if tid == t["active"] else f'[data-theme="{tid}"]'
    lines += block(sel, th) + ["}", ""]
lines.append(":root {")
for k, v in t["space"].items(): lines.append(f"  --rb-space-{k}: {v}px;")
for k, v in t["radius"].items(): lines.append(f"  --rb-radius-{k}: {v}px;")
for k, v in t["shadow"].items(): lines.append(f"  --rb-shadow-{k}: {v};")
for k, v in t["motion"].items(): lines.append(f"  --rb-motion-{k}: {v};")
lines.append(f"  --rb-max-width: {t['section']['max-width']}px;")
lines.append(f"  --rb-text-max: {t['section']['text-max']}px;")
lines.append(f"  --rb-section-y: clamp({t['section']['padding-y']['mobile']}px, 9vw, {t['section']['padding-y']['desktop']}px);")
lines.append(f"  --rb-gutter: clamp({t['section']['gutter']['mobile']}px, 3vw, {t['section']['gutter']['desktop']}px);")
for k, s in [(k, s) for k, s in t["type"].items() if isinstance(s, dict)]:
    (ms, ml), (ds, dl) = s["mobile"], s["desktop"]
    # fluid between 390px and 1280px viewports
    def fl(a, b):
        if a == b: return f"{a}px"
        slope = (b - a) / (1280 - 390) * 100
        base = a - slope * 3.9
        return f"clamp({a}px, {base:.2f}px + {slope:.3f}vw, {b}px)"
    lines.append(f"  --rb-text-{k}-size: {fl(ms, ds)};")
    lines.append(f"  --rb-text-{k}-lh: {fl(ml, dl)};")
lines.append("}")
(here / "tokens.css").write_text("\n".join(lines) + "\n")
print("wrote tokens.css")
