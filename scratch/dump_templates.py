from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

for t in soup.find_all("template"):
    tid = t.get("id")
    print(f"=== TEMPLATE ID: {tid} ===")
    if not tid:
        print("No ID, parent:", t.parent.name, t.parent.get("class"))
        continue
    # Let's print the direct child tags
    # Since template content is inside, BS4 parses template.content for real template tags, or they might just be normal tags inside a template tag in some HTML dumps.
    # In BS4, sometimes the content is inside t.content, or t.children.
    children = list(t.children)
    print(f"Direct children count: {len(children)}")
    for child in children:
        if child.name:
            print(f"  <{child.name} class='{child.get('class', [])}'>")
            # If it contains products, list them
            for a in child.find_all("a", href=True):
                if a["href"].startswith("/product/"):
                    print(f"    Product link: {a['href']}")
                    texts = [txt.strip() for txt in a.find_all(text=True) if txt.strip()]
                    print(f"      Texts: {texts}")
