from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

for a in soup.find_all("a", href=True):
    href = a["href"]
    if href.startswith("/product/"):
        print("="*60)
        print(f"PRODUCT: {href}")
        # Print classes of parent nodes up to 3 levels
        parents = []
        curr = a.parent
        while curr and curr.name != "main" and len(parents) < 3:
            parents.append(f"{curr.name} (class={curr.get('class', [])})")
            curr = curr.parent
        print("PARENTS: " + " -> ".join(parents))
        print("CARD CLASS:", a.get('class', []))
        
        # Print inner tags
        img = a.find("img")
        if img:
            print(f"IMAGE: src={img.get('src')} | srcset={img.get('srcset')} | class={img.get('class')}")
        else:
            print("NO IMAGE")
        
        # Find product name, price, category
        name_div = a.find(text=True, recursive=True)
        # print first few texts
        texts = [t.strip() for t in a.find_all(text=True) if t.strip()]
        print(f"TEXT ELEMENTS: {texts}")
