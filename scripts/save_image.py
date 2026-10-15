import sys
import os
import json
import base64

def main():
    if len(sys.argv) < 3:
        print("Usage: python3 save_image.py <step_json_path> <output_dir_or_file>")
        sys.exit(1)
        
    json_path = sys.argv[1]
    target = sys.argv[2]
    
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    res = data.get("result", {})
    if isinstance(res, list):
        # Multiple images
        os.makedirs(target, exist_ok=True)
        for item in res:
            fname = item.get("filename")
            b64_str = item.get("base64")
            if fname and b64_str:
                out_file = os.path.join(target, fname)
                img_data = base64.b64decode(b64_str)
                with open(out_file, 'wb') as f_out:
                    f_out.write(img_data)
                print(f"Saved {fname} ({len(img_data)} bytes)")
    elif isinstance(res, dict) and "base64" in res:
        b64_str = res["base64"]
        img_data = base64.b64decode(b64_str)
        with open(target, 'wb') as f:
            f.write(img_data)
        print(f"Saved {target} ({len(img_data)} bytes)")
    else:
        print("Unknown result format")
        sys.exit(1)

if __name__ == "__main__":
    main()

