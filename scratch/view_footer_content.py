from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

footer = soup.find("footer")
if footer:
    print(footer.prettify()[:2500])
