from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

# Find the div that contains 'menu-footer'
menu_overlay = None
for div in soup.find_all("div"):
    if div.find(class_="menu-footer") or any("menu-footer" in c for c in div.get("class", [])):
        menu_overlay = div
        break

if not menu_overlay:
    for div in soup.find_all("div"):
        classes = div.get("class", [])
        if "h-dvh" in classes and "invisible" in classes:
            menu_overlay = div
            break

if menu_overlay:
    with open("scratch/menu_info.html", "w", encoding="utf-8") as f_out:
        f_out.write(menu_overlay.prettify())
    print("Menu HTML saved to scratch/menu_info.html")
else:
    print("Menu overlay not found.")
