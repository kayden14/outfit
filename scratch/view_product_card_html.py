from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

# Find the Neutral Grotesk card
for a in soup.find_all("a", href=True):
    if a["href"] == "/product/neutral-grotesk":
        print(a.prettify())
        break
