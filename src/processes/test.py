from acronym import shorten
from googleSearch import google_search
from textProcessing import correct_sentence
from tokenCount import num_Tokens


def process_text(text):
    print("Original Text:", text)
    print("Number of Tokens:", num_Tokens(text))

    processed_text = correct_sentence(text)
    shortened_text = shorten(processed_text)

    print("\nProcessed Text:", shortened_text)
    print("Number of Tokens:", num_Tokens(shortened_text))

    print("\nGoogle Search Results:")
    print(google_search(shortened_text))


# Example usage:
text = "This is a test. This is only a test. Procrastinate. Artificial Intelligence."
process_text(text)
