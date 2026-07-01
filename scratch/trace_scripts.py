import re

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    html = f.read()

# Let's search for $RC calls or script contents
matches = re.findall(r'\$RC\("([^"]+)"\s*,\s*"([^"]+)"\)', html)
print("Found $RC calls:", matches)

# Also let's search for similar replacement code
matches_general = re.findall(r'\.replaceWith\(.*?\)', html)
print("ReplaceWith calls count:", len(matches_general))
