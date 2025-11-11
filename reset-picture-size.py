import tkinter as tk
from tkinter import filedialog, messagebox
from PIL import Image
import os

def compress_image():
    file_path = filedialog.askopenfilename(filetypes=[("Image files", "*.jpg;*.jpeg;*.png;*.bmp;*.gif")])
    if not file_path:
        return  # 如果使用者取消選擇，直接返回

    try:
        img = Image.open(file_path)

        # 檢查圖片模式，若為 RGBA，則轉換為 RGB
        if img.mode == "RGBA":
            img = img.convert("RGB")

        save_path = os.path.join(os.getcwd(), "compressed_image.jpg")
        img.save(save_path, "JPEG", quality=50)

        messagebox.showinfo("成功", f"圖片已壓縮並儲存至:\n{save_path}")
    except Exception as e:
        messagebox.showerror("錯誤", f"壓縮失敗: {e}")

root = tk.Tk()
root.title("圖片壓縮工具")
root.geometry("300x150")  # 設定視窗大小

button = tk.Button(root, text='選擇圖片', command=compress_image)
button.pack(pady=20)

root.mainloop()
