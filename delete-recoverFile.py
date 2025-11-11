import os
import re
from send2trash import send2trash

def remove_duplicate_files(directory_path):
    if not os.path.exists(directory_path):
        print(f"指定的目錄 {directory_path} 不存在！")
        return

    # 用來存儲所有原始文件名及其對應的文件路徑
    file_map = {}

    # 遍歷目錄中的所有文件
    for dirpath, _, filenames in os.walk(directory_path):
        for filename in filenames:
            # 匹配文件名中的 "(數字)" 部分
            match = re.match(r'^(.*?)(\(\d+\))(\.\w+)$', filename)
            
            if match:
                # 如果是副本文件，提取原文件名部分
                original_name = match.group(1) + match.group(3)
                
                # 檢查是否有對應的原文件
                if original_name in file_map:
                    # 如果有，這是副本文件，將其移到垃圾桶
                    file_path = os.path.join(dirpath, filename)
                    print(f"發現副本：{file_path}，將移動到垃圾桶。")
                    send2trash(file_path)
                else:
                    # 如果沒有，將原文件的路徑記錄下來
                    original_file_path = os.path.join(dirpath, original_name)
                    file_map[original_name] = original_file_path
            else:
                # 如果文件沒有數字後綴，即是原文件
                original_file_path = os.path.join(dirpath, filename)
                file_map[filename] = original_file_path

    # 確保對每個原文件的副本進行檢查，即使副本是 "(1)" 等
    for dirpath, _, filenames in os.walk(directory_path):
        for filename in filenames:
            # 如果文件名中有 "(數字)" 副本標記
            if re.match(r'^(.*?)(\(\d+\))(\.\w+)$', filename):
                original_name = filename.split('(')[0] + filename.split('.')[-1]
                # 檢查是否有對應的原文件，並移動副本
                if original_name in file_map:
                    file_path = os.path.join(dirpath, filename)
                    print(f"發現副本：{file_path}，將移動到垃圾桶。")
                    send2trash(file_path)

# 輸入目錄地址
directory = input("請輸入要清除副本的目錄地址: ")
remove_duplicate_files(directory)
