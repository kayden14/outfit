with open("scratch/reference.html", "r", encoding="utf-8") as f:
    html = f.read()

# Let's search for '<template id="P:2">' and see what is after it, or parse it using regex
import re
for match in re.finditer(r'<template id="([^"]+)"', html):
    tid = match.group(1)
    start_idx = match.start()
    # Find closing tag </template>
    end_match = re.search(r'</template>', html[start_idx:])
    if end_match:
        end_idx = start_idx + end_match.start()
        content = html[start_idx:end_idx + len("</template>")]
        print(f"=== RAW TEMPLATE ID: {tid} ===")
        print(content[:500])
        # Find product links
        links = re.findall(r'href="(/product/[^"]+)"', content)
        print("  Product links in template:", links)
