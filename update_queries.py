# update_queries.py
import re

with open('/share_2/users/umair_nawaz/MedObvious/Web-Project/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

replacements = {
    # Ex 1
    '"You are reviewing a 2×2 grid of medical scans. One scan is the clinical outlier. Which position contains the outlier? (A–E)"':
    '"You are reviewing a 2×2 grid of medical scans. One scan is the clinical outlier — does it differ in modality, anatomy, or pathology from the others? Which position contains the outlier? (A–E)"',
    
    # Ex 2
    '"You are a medical imaging expert reviewing a 3×3 grid. Identify the outlier position and briefly explain why it differs."':
    '"You are a medical imaging expert reviewing a 3×3 grid. Identify the outlier position — does it differ in modality, anatomy, or pathology from the others?"',
    
    # Ex 3
    '"In this 2×2 grid, one scan contains a clinical anomaly (abdomen CT scan). Which position is it? (A–E)"':
    '"In this 2×2 grid, one scan contains a clinical anomaly (abdomen CT scan) — does it differ in modality, anatomy, or pathology from the others? Which position is it? (A–E)"',
    
    # Ex 4
    '"In this 2×2 grid, one image contains a clinical anomaly. State its position and describe the anomaly in one sentence."':
    '"In this 2×2 grid, one image contains a clinical anomaly — does it differ in modality, anatomy, or pathology from the others? State its position."',
    
    # Ex 5
    '"The red box highlights one scan. Is this highlighted scan the clinical outlier — does it differ in modality, anatomy, or pathology from the others? Answer yes or no, then explain."':
    '"The red box highlights one scan. Is this highlighted scan the clinical outlier — does it differ in modality, anatomy, or pathology from the others? Answer yes or no."',
    
    # Ex 6
    '"The red box highlights one scan. Is this highlighted scan the clinical outlier — does it differ from the others? Answer yes or no, then explain."':
    '"The red box highlights one scan. Is this highlighted scan the clinical outlier — does it differ in modality, anatomy, or pathology from the others? Answer yes or no."',
    
    # Ex 8
    '"The red box in this 3×3 grid highlights one scan. Is this highlighted scan the clinical outlier?"':
    '"The red box in this 3×3 grid highlights one scan. Is this highlighted scan the clinical outlier — does it differ in modality, anatomy, or pathology from the others?"',
    
    # Ex 9
    '"The red box in this 3×3 medical image grid highlights one scan. Is this highlighted scan the clinical outlier — does it differ from the others? Answer yes or no, then briefly explain."':
    '"The red box in this 3×3 medical image grid highlights one scan. Is this highlighted scan the clinical outlier — does it differ in modality, anatomy, or pathology from the others? Answer yes or no."',
    
    # Ex 10
    '"If one scan is the outlier, identify it. If all scans appear consistent, select \'None\'. (A–J)"':
    '"If one scan is the outlier — does it differ in modality, anatomy, or pathology from the others? — identify it. If all scans appear consistent, select \'None\'. (A–J)"',
    
    # Ex 11
    '"The red box highlights one scan. Is this the clinical outlier?"':
    '"The red box highlights one scan. Is this the clinical outlier — does it differ in modality, anatomy, or pathology from the others?"'
}

for old, new in replacements.items():
    if old in html:
        html = html.replace(old, new)
        print("Replaced:", old[:30] + "...")
    else:
        # try handling loose formatting
        import textwrap
        old_clean = " ".join(old.split())
        html_clean = " ".join(html.split())
        if old_clean in html_clean:
             print("Found with split spaces but couldn't do direct replace:", old[:30] + "...")
             # fallback replacing using regex
             pattern = re.escape(old).replace(r'\ ', r'\s+')
             html = re.sub(pattern, new, html)
        else:
             print("NOT FOUND:", old[:30] + "...")

with open('/share_2/users/umair_nawaz/MedObvious/Web-Project/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
