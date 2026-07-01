from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

# Resolve templates. Next.js template streaming replaces the placeholder P:X with the content of S:X.
# In bs4, we find P:X, then find the content of S:X, and move the content of S:X inside or replace P:X.
# Note: the content is usually the children of S:X.
for i in range(1, 10):
    pid = f"P:{i}"
    sid = f"S:{i}"
    placeholder = soup.find(id=pid) or soup.find(attrs={"id": pid})
    source = soup.find(id=sid) or soup.find(attrs={"id": sid})
    if placeholder and source:
        print(f"Resolving {pid} with {sid}...")
        # Replace placeholder with source children
        # We need to extract the children of source and insert them in place of placeholder
        # Note that in Next.js, the source div itself might have 'hidden' or be a template,
        # but the content is the actual children of the source.
        # Let's clone or move children:
        children = list(source.children)
        # remove placeholder
        parent = placeholder.parent
        index = parent.contents.index(placeholder)
        placeholder.extract()
        for child in reversed(children):
            if child.name or child.strip():
                parent.insert(index, child)
        # Also hide/remove the original source tag to avoid duplicates
        source.extract()

# Now let's dump the resolved main page's children
page = soup.find(id="page")
if page:
    # Let's print the structural overview of page
    def dump_layout(node, depth=0):
        indent = "  " * depth
        classes = node.get("class", [])
        id_val = node.get("id", "")
        tag = node.name
        
        # If it's a product card, print its link and some info
        if tag == "a" and node.get("href", "").startswith("/product/"):
            img = node.find("img")
            img_class = img.get("class", []) if img else "NO_IMG"
            texts = [t.strip() for t in node.find_all(text=True) if t.strip()]
            print(f"{indent}[PRODUCT CARD] href={node.get('href')} class={classes} | img_class={img_class} | texts={texts}")
            return
            
        print(f"{indent}<{tag} id='{id_val}' class='{classes}'>")
        for child in node.find_all(recursive=False):
            dump_layout(child, depth + 1)
            
    dump_layout(page)
else:
    print("Page not found after resolution")
