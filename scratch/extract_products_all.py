from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

out = []
for a in soup.find_all("a", href=True):
    href = a["href"]
    if href.startswith("/product/"):
        out.append("="*60)
        out.append(f"PRODUCT: {href}")
        # Print classes of parent nodes up to 3 levels
        parents = []
        curr = a.parent
        while curr and curr.name != "main" and len(parents) < 4:
            parents.append(f"{curr.name} (class={curr.get('class', [])})")
            curr = curr.parent
        out.append("PARENTS: " + " -> ".join(parents))
        out.append(f"CARD CLASS: {a.get('class', [])}")
        
        # Print inner tags
        img = a.find("img")
        if img:
            out.append(f"IMAGE: src={img.get('src')} | class={img.get('class')}")
        else:
            out.append("NO IMAGE")
        
        texts = [t.strip() for t in a.find_all(text=True) if t.strip()]
        out.append(f"TEXT ELEMENTS: {texts}")

with open("scratch/products_info.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(out))
