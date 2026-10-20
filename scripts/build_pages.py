"""Prepare the static site for GitHub Pages without changing local source files."""
import os
from pathlib import Path
import re
import shutil

root = Path(__file__).resolve().parent.parent
source = root / "dist"
output = root / "_site"
base = os.environ.get("PAGES_BASE_PATH", "/patroa-auto-socorro-transportes").strip("/")
prefix = f"/{base}" if base else ""

if output.exists():
    shutil.rmtree(output)
shutil.copytree(source, output)
for page in output.rglob("*.html"):
    html = page.read_text(encoding="utf-8")
    html = re.sub(
        r'(\b(?:href|src|action)=["\'])/(?!/)',
        lambda match: match[1] + prefix + "/",
        html,
    )
    page.write_text(html, encoding="utf-8")
(output / ".nojekyll").touch()
print(f"Site prepared in {output.name} with base path {prefix or '/'}.")
