from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

page = soup.find(id="page")
if page:
    first_div = page.find("div")
    if first_div:
        print(first_div.prettify()[:3000])
