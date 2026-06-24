import re

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    html_content = f.read()

# Let's search inside the HTML for --color-cream, --color-red, --color-black, and --color-white definitions
matches = re.findall(r'--color-[a-zA-Z0-9_-]+:\s*[^;}]+', html_content)
for m in set(matches):
    print(m)
