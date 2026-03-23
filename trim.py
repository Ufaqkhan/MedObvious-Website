import sys

try:
    from PIL import Image, ImageChops
    
    def trim(im):
        # Pick top-left pixel as background color
        bg = Image.new(im.mode, im.size, (255,255,255))
        diff = ImageChops.difference(im, bg)
        diff = ImageChops.add(diff, diff, 2.0, -100)
        bbox = diff.getbbox()
        if bbox:
            padding = 10
            x1 = max(0, bbox[0] - padding)
            y1 = max(0, bbox[1] - padding)
            x2 = min(im.size[0], bbox[2] + padding)
            y2 = min(im.size[1], bbox[3] + padding)
            return im.crop((x1, y1, x2, y2))
        return im

    img_path = sys.argv[1]
    out_path = sys.argv[2]
    im = Image.open(img_path).convert("RGB")
    cropped = trim(im)
    cropped.save(out_path)
    print("Trimmed successfully to", cropped.size)
except ImportError as e:
    print("PIL not found, copying directly:", e)
    import shutil
    shutil.copyfile(sys.argv[1], sys.argv[2])
