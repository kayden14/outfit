from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

for pid in ["P:2", "P:3", "P:4", "P:5", "P:6"]:
    node = soup.find(id=pid) or soup.find(attrs={"id": pid})
    if node:
        parents = []
        curr = node.parent
        while curr and curr.name != "main":
            parents.append(f"{curr.name} (class={curr.get('class', [])})")
            curr = curr.parent
        print(f"Placeholder {pid}: parents={parents}")
    else:
        print(f"Placeholder {pid} not found")
