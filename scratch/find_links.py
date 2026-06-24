from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

for a in soup.find_all("a", href=True):
    href = a["href"]
    # print the link and its text/classes
    classes = a.get("class", [])
    text = a.get_text(strip=True)[:50]
    print(f"href: {href} | classes: {classes} | text: {text}")
