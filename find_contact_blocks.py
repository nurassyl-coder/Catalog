import os
import re

html_files = []
for root, dirs, files in os.walk('.'):
    for str_file in files:
        if str_file.endswith('.html'):
            html_files.append(os.path.join(root, str_file))

wa_links = set()
ig_links = set()

for path in html_files:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        wa_m = re.findall(r'href="(https://wa\.me/[^"]+)"', content)
        wa_links.update(wa_m)
        ig_m = re.findall(r'href="(https://(www\.)?instagram\.com/[^"]+)"', content)
        ig_links.update([x[0] for x in ig_m])

print("WhatsApp links:")
for l in wa_links: print(l)

print("Instagram links:")
for l in ig_links: print(l)
