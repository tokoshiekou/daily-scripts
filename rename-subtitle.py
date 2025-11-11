import os

# Replace with your subtitle folder path
folder_path = input("SUBTITLE FOLDER PATH: ")

# Edit subtitle's name
template = input("SUBTITLE FILENAME TEMPLATE: XXX Episode @number ").strip()

# Replace @number with {counter:02d}
template = template.replace('@number', '{counter:02d}')

file_list = sorted(os.listdir(folder_path))

# Starting number, default is 1
counter = 1

for filename in file_list:
    if os.path.isfile(os.path.join(folder_path, filename)):
        file_name, file_extension = os.path.splitext(filename)

        new_filename = template.format(counter=counter) + file_extension
        os.rename(os.path.join(folder_path, filename), os.path.join(folder_path, new_filename))
        counter += 1

print("File renaming complete!")