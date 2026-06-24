from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

body = soup.find("body")
if body:
    children = list(body.find_all(recursive=False))
    if len(children) >= 2:
        preloader = children[1]
        with open("scratch/preloader_info.html", "w", encoding="utf-8") as f_out:
            f_out.write(preloader.prettify())
        print("Preloader HTML saved to scratch/preloader_info.html")
