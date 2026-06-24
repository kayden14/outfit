from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

header = soup.find(id="header")
if header:
    print("HEADER DETAILS:")
    print(header.prettify())
