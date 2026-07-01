from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

hc = soup.find(id="hero-content")
if hc:
    print(hc.prettify())
