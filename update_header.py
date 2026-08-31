#!/usr/bin/env python3
import os
import re

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_PATH = os.path.join(ROOT_DIR, "layout", "header.html")

PAGE_HREF_MAP = {
    "index.html": "/",
    "average-calculator.html": "/average-calculator.html",
    "percentage-change-calculator.html": "/percentage-change-calculator.html",
    "percentage-calculator.html": "/percentage-calculator.html",
    "age-calculator.html": "/age-calculator.html",
    "emi-calculator.html": "/emi-calculator.html",
    "tip-calculator.html": "/tip-calculator.html",
    "themes.html": "/themes.html",
    "time.html": "/time.html",
    "world-clock-converter.html": "/world-clock-converter.html",
    "bar-code-scanner.html": "/bar-code-scanner.html"
}

def load_template():
    with open(TEMPLATE_PATH, "r", encoding="utf-8") as f:
        return f.read()

def get_header_for_page(template_content, filename):
    target_href = PAGE_HREF_MAP.get(filename)
    if not target_href:
        return template_content

    # Regex to add 'active' class to matching link
    pattern = rf'(<a\s+class="hr_nav-item)\s*("?\s+href="{re.escape(target_href)}")'
    replacement = r'\1 active\2'
    return re.sub(pattern, replacement, template_content)

def update_html_files():
    template_content = load_template()
    count = 0

    for fname in os.listdir(ROOT_DIR):
        if not fname.endswith(".html") or fname == "googlebc0022002daba497.html" or fname == "icons.html":
            continue

        file_path = os.path.join(ROOT_DIR, fname)
        if not os.path.isfile(file_path):
            continue

        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        header_html = get_header_for_page(template_content, fname)
        wrapped_header = f"<!-- HEADER_START -->\n{header_html.strip()}\n<!-- HEADER_END -->"

        if "<!-- HEADER_START -->" in content and "<!-- HEADER_END -->" in content:
            new_content = re.sub(
                r"<!-- HEADER_START -->.*?<!-- HEADER_END -->(\s*</div>)?(\s*<button[^>]*class=\"scroll-btn right\"[^>]*>.*?</button>)?(\s*</div>)?",
                wrapped_header,
                content,
                flags=re.DOTALL
            )
        else:
            # Match existing header block (nav + scroll-container + optional extra button)
            pattern = r'(<!-- nav bar -->\s*<nav class="navbar.*?</nav>\s*(?:<!--.*?-->\s*)*<div class="scroll-container">.*?</div>(?:\s*<button[^>]*class="scroll-btn right"[^>]*>.*?</button>\s*</div>)?)'
            if re.search(pattern, content, flags=re.DOTALL):
                new_content = re.sub(pattern, wrapped_header, content, flags=re.DOTALL)
            else:
                alt_pattern = r'(<nav class="navbar.*?</nav>.*?<div class="scroll-container">.*?</div>(?:\s*<button[^>]*class="scroll-btn right"[^>]*>.*?</button>\s*</div>)?)'
                new_content = re.sub(alt_pattern, wrapped_header, content, count=1, flags=re.DOTALL)

        if new_content != content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated header in: {fname}")
            count += 1
        else:
            print(f"No changes needed or header markers already synced in: {fname}")

    print(f"\nDone! Successfully updated header in {count} HTML file(s).")

if __name__ == "__main__":
    update_html_files()
