from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

# Find the div that acts as the menu overlay
# We can search for the one containing 'menu-footer'
menu_overlay = None
for div in soup.find_all("div"):
    if div.find(class_="menu-footer") or any("menu-footer" in c for c in div.get("class", [])):
        menu_overlay = div
        break

if menu_overlay:
    print("MENU OVERLAY DETAILS:")
    print(menu_overlay.prettify()[:3000])
else:
    # If not found by class, let's find the div with classes including 'h-dvh' and 'invisible'
    for div in soup.find_all("div"):
        classes = div.get("class", [])
        if "h-dvh" in classes and "invisible" in classes:
            print("FOUND POTENTIAL MENU OVERLAY:")
            print(div.prettify()[:2000])
            break
