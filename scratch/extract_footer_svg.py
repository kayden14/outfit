from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

footer = soup.find("footer")
if footer:
    a_tag = footer.find("a", href="https://www.hellohello.is")
    if a_tag:
        svg = a_tag.find("svg")
        if svg:
            print(svg.prettify())
