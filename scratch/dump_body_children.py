from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

body = soup.find("body")
if body:
    print("BODY CHILDREN:")
    for child in body.find_all(recursive=False):
        classes = child.get("class", [])
        id_val = child.get("id", "")
        print(f"Child tag: {child.name} | id: {id_val} | class: {classes}")
