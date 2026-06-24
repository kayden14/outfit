from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

main_tag = soup.find("main")
if main_tag:
    children = list(main_tag.find_all(recursive=False))
    if len(children) >= 2:
        second_child = children[1]
        print("SECOND CHILD DETAIL:")
        # Let's print the child tree of second_child up to 4 levels deep
        def print_node(node, depth=0):
            indent = "  " * depth
            classes = node.get("class", [])
            id_val = node.get("id", "")
            print(f"{indent}<{node.name} id='{id_val}' class='{classes}'>")
            for child in node.find_all(recursive=False):
                print_node(child, depth+1)
        
        print_node(second_child)
