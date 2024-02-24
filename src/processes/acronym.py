import re

from textProcessing import remove_punctuation


def shorten(text):
    try:
        with open("../data/abbreviations.txt", "r") as file:
            data = file.readlines()
            for line in data:
                line = line.strip()
                if line:
                    element1, element2 = re.match(r"^\s*(\S+)\s+(.+)", line).groups()
                    element2 = remove_punctuation(element2)
                    text = text.replace(element2, element1)
        return text
    except Exception as e:
        print("Error reading text file:", e)
        return None
