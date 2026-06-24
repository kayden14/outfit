import os
import urllib.request

images = {
    "positive-space.jpg": "https://cdn.shopify.com/s/files/1/0665/1455/0837/files/totebag-_-white-outfit_461af856-288d-4e39-9913-4ce3febba67d.jpg?v=1753306427",
    "whitespace-matters.jpg": "https://cdn.shopify.com/s/files/1/0665/1455/0837/files/t-shirt-_-white-outfit.jpg?v=1753306027",
    "off-by-design.jpg": "https://cdn.shopify.com/s/files/1/0665/1455/0837/files/t-shirt-time-off-outfit_dfee3661-54e4-43ab-8d38-34388179952d.jpg?v=1753359304",
    "kerned-confidence.jpg": "https://cdn.shopify.com/s/files/1/0665/1455/0837/files/cap-_-black-outfit_9a3389f2-3570-4130-8abc-c7d891c7c073.jpg?v=1775830283",
    "command-k.jpg": "https://cdn.shopify.com/s/files/1/0665/1455/0837/files/keychain-_-black-outfit.jpg?v=1753306385",
    "specimen-no-hh01.jpg": "https://cdn.shopify.com/s/files/1/0665/1455/0837/files/jersey-red-square-outfit_d6d9ae9b-b22d-4eed-93e2-8b0913b773f4.jpg?v=1753359372",
    "grid-system-go.jpg": "https://cdn.shopify.com/s/files/1/0665/1455/0837/files/mochila1.jpg?v=1775839677"
}

out_dir = "public/products"
os.makedirs(out_dir, exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

for name, url in images.items():
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
