import os
import urllib.request

out_dir = "public/preloader"
os.makedirs(out_dir, exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

for i in range(1, 7):
    filename = f"image-0{i}.jpg"
    url = f"https://outfit.hellohello.is/preloader/{filename}"
    dest = os.path.join(out_dir, filename)
    print(f"Downloading {filename}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response, open(dest, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Saved to {dest}")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")
