from googlesearch import search


def google_search(query):
    try:
        results = search(query, num_results=3)
        search_results = [result for result in results]
        return search_results
    except Exception as e:
        print("Error fetching search results:", e)
        return []
