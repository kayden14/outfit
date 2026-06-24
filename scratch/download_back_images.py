import os
import urllib.request
from bs4 import BeautifulSoup

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

out_dir = "public/products"
os.makedirs(out_dir, exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

product_back_images = {}

for a in soup.find_all("a", href=True):
    href = a["href"]
    if href.startswith("/product/"):
        slug = href.split("/")[-1]
        imgs = a.find_all("img")
        print(f"Product: {slug} | Found {len(imgs)} images.")
        # If there are multiple images, the first is front, the second is back
        if len(imgs) >= 2:
            back_img_src = imgs[1].get("src")
            # Parse shopify URL from nextjs img src
            # Example: /_next/image?url=https%3A%2F%2Fcdn.shopify.com%2F...
            if "url=" in back_img_src:
                actual_url = back_img_src.split("url=")[1].split("&")[0]
                # decode url characters like %2F, %3A, %3F, %3D
                actual_url = urllib.parse.unquote(actual_url)
                product_back_images[f"{slug}-back.jpg"] = actual_url
                print(f"  Back image URL: {actual_url}")

# Let's download these back images
for name, url in product_back_images.items():
    dest = os.path.join(out_dir, name)
    if not os.path.exists(dest):
        print(f"Downloading {name}...")
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req) as response, open(dest, 'wb') as out_file:
                out_file.write(response.read())
            print(f"Saved to {dest}")
        except Exception as e:
            print(f"Error downloading {name}: {e}")
    else:
        print(f"{name} already exists.")
