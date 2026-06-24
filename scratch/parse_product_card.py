from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

for a in soup.find_all("a", href=True):
    href = a["href"]
    if href == "/product/neutral-grotesk":
        print("NEUTRAL GROTESK CARD HTML:")
        print(a.prettify())
        break
