import re

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    html_content = f.read()

# Find all style tags
style_blocks = re.findall(r'<style.*?>.*?</style>', html_content, flags=re.DOTALL)
print(f"Found {len(style_blocks)} style blocks.")

# Let's search inside the style blocks for CSS variables like --black, --white, cream, red, etc.
css_text = "\n".join(style_blocks)

# Look for CSS variables
variables = re.findall(r'--[a-zA-Z0-9_-]+:\s*[^;]+;', css_text)
print("CSS Variables:")
for var in set(variables[:50]):
    print("  ", var)

# Let's search for theme specific rules like .dark, .red, etc.
# We can search for strings containing background colors
bg_colors = re.findall(r'background-color:\s*[^;]+;', css_text)
print("\nBackground Colors:")
for bg in set(bg_colors[:20]):
    print("  ", bg)

# Also check for colors
colors = re.findall(r'color:\s*[^;]+;', css_text)
print("\nColors:")
for c in set(colors[:20]):
    print("  ", c)
