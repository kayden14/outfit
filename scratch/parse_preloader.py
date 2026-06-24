from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

# Find the second child of body, which corresponds to the preloader div
body = soup.find("body")
if body:
    children = list(body.find_all(recursive=False))
    if len(children) >= 2:
        preloader = children[1]
        print("PRELOADER DETAILS:")
        print(preloader.prettify()[:2000])
