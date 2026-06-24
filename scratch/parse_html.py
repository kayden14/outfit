import re
from html.parser import HTMLParser

class StructureParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.depth = 0
        self.in_body = False

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == 'body':
            self.in_body = True
        
        if self.in_body:
            indent = "  " * self.depth
            id_str = f" id='{attrs_dict['id']}'" if 'id' in attrs_dict else ""
            class_str = f" class='{attrs_dict['class']}'" if 'class' in attrs_dict else ""
            # Only print relevant layout tags or tags with class/id to avoid clutter
            if tag in ['header', 'main', 'footer', 'div', 'section', 'aside', 'nav', 'h1', 'button', 'a']:
                print(f"{indent}<{tag}{id_str}{class_str}>")
            self.depth += 1

    def handle_endtag(self, tag):
        if self.in_body:
            self.depth -= 1
            indent = "  " * self.depth
            if tag in ['header', 'main', 'footer', 'div', 'section', 'aside', 'nav', 'h1', 'button', 'a']:
                print(f"{indent}</{tag}>")
        if tag == 'body':
            self.in_body = False

with open("scratch/reference.html", "r", encoding="utf-8") as f:
    html_content = f.read()

# Let's clean up some script tags to make it parsing friendly
html_content = re.sub(r'<script.*?>.*?</script>', '', html_content, flags=re.DOTALL)
html_content = re.sub(r'<style.*?>.*?</style>', '', html_content, flags=re.DOTALL)

parser = StructureParser()
parser.feed(html_content)
