import re

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    html_content = f.read()

# Let's search inside the HTML for styles containing [data-theme=red] and [data-theme=dark]
rules = re.findall(r'[^}]*\[data-theme=[a-z]+\][^}]*\{[^}]*\}', html_content)
print(f"Found {len(rules)} theme rules.")

for r in set(rules[:50]):
    # clean up whitespaces
    r_clean = re.sub(r'\s+', ' ', r).strip()
    if 'red' in r_clean or 'dark' in r_clean:
        print("RULE:", r_clean)
