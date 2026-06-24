from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

for s_id in ["S:2", "S:4", "S:5", "S:6"]:
    section = soup.find(id=s_id)
    if section:
        print("="*60)
        print(f"DUMP OF {s_id}:")
        # Pretty print the structure but strip deep contents
        # We can just print tags, classes and text of the outer elements
        def print_outer_html(el, depth=0):
            indent = "  " * depth
            classes = el.get("class", [])
            id_val = el.get("id", "")
            # Print element tag and class
            print(f"{indent}<{el.name} id='{id_val}' class='{classes}'>")
            
            # If it's a product link, print its text content and stop recursing deep inside it
            if el.name == "a" and any(href.startswith("/product/") for href in [el.get("href", "")]):
                print(f"{indent}  [PRODUCT LINK: {el.get('href')} | text={el.get_text(strip=True)[:60]}]")
                return
            
            for child in el.find_all(recursive=False):
                print_outer_html(child, depth+1)
        
        print_outer_html(section)
