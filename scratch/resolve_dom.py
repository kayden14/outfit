import re
from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")

# Find all templates
templates = {t.get("id"): t for t in soup.find_all("template") if t.get("id")}

print(f"Found templates: {list(templates.keys())}")

# Let's inspect the page container
page = soup.find(id="page")
if page:
    # Now let's print the structure of page
    def print_node(node, depth=0):
        indent = "  " * depth
        classes = node.get("class", [])
        id_val = node.get("id", "")
        tag = node.name
        
        # If it's a template placeholder, try to resolve it
        if id_val and id_val.startswith("P:") or tag == "template":
            tmpl_id = id_val or node.get("id")
            print(f"{indent}[TEMPLATE PLACEHOLDER {tmpl_id}]")
            return
            
        print(f"{indent}<{tag} id='{id_val}' class='{classes}'>")
        
        # If this node has a href or text, print it if it's a product or header
        if tag == "a" and node.get("href"):
            print(f"{indent}  href: {node.get('href')}")
            texts = [t.strip() for t in node.find_all(text=True) if t.strip()]
            print(f"{indent}  text: {texts}")
            
        for child in node.find_all(recursive=False):
            print_node(child, depth + 1)
            
    print("PAGE STRUCTURE BEFORE RESOLUTION:")
    print_node(page)
else:
    print("No #page found")
