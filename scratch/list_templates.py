from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

for t in soup.find_all("template"):
    print(f"Template ID: {t.get('id')} | parent tag={t.parent.name} | parent class={t.parent.get('class', [])}")
