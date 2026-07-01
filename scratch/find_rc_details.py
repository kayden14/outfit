import re
from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")

# Let's look for script tags that contain "P:" or "S:"
for i, script in enumerate(soup.find_all("script")):
    text = script.string
    if text and ("P:" in text or "S:" in text):
        print(f"Script {i} contains P: or S: (len={len(text)}):")
        # Print lines in script that contain P: or S:
        for line in text.split("\n"):
            if "P:" in line or "S:" in line:
                print("  ", line[:200])
