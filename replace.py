import re

with open('/share_2/users/umair_nawaz/MedObvious/Web-Project/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace tiers
html = html.replace('55 positive + 55 negative tasks', '440 tasks (275 positive + 165 negative)')
html = html.replace('60 positive + 60 negative tasks', '480 tasks (300 positive + 180 negative)')
html = html.replace('45 positive + 45 negative tasks', '360 tasks (225 positive + 135 negative)')
html = html.replace('40 positive + 40 negative tasks', '320 tasks (200 positive + 120 negative)')
html = html.replace('35 positive + 35 negative tasks', '280 tasks (175 positive + 105 negative)')

# Remove Example N ·
html = re.sub(r'Example \d+ · ', '', html)

# Teaser video link
html = html.replace('href="assets/teaser_video.mp4"', 'href="#teaser"')

with open('/share_2/users/umair_nawaz/MedObvious/Web-Project/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
