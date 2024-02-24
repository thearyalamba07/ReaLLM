import re

from spellchecker import SpellChecker


def remove_punctuation(text):
    return re.sub(r'.,;:?!\'"', "", text).lower().strip()


def correct_spelling(word):
    spell = SpellChecker()
    return spell.correction(word)


def remove_punctuation_sync(text):
    return remove_punctuation(text)


def correct_sentence(sentence):
    words = remove_punctuation_sync(sentence)
    corrected_words = [correct_spelling(word) for word in words.split()]
    return " ".join(corrected_words)
