from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

main_tag = soup.find("main")
if main_tag:
    # Print the immediate children of main or sections inside main
    print("MAIN CHILDREN:")
    for child in main_tag.find_all(recursive=False):
        classes = child.get("class", [])
        id_val = child.get("id", "")
        print(f"Child tag: {child.name} | id: {id_val} | class: {classes}")
        
        # If it's a div or section, print its direct children
        for subchild in child.find_all(recursive=False):
            subclass = subchild.get("class", [])
            subid = subchild.get("id", "")
            print(f"  Subchild: {subchild.name} | id: {subid} | class: {subclass}")
            for s3 in subchild.find_all(recursive=False):
                print(f"    S3: {s3.name} | id: {s3.get('id','')} | class: {s3.get('class',[])}")
