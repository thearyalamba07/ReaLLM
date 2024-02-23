function googleSearch(query) {
  const apiKey = "AIzaSyCYzjs8J5sX4R75sI6fuN7Zwm1YyDX9tMw";
  const cx = "a11f3384e1cf243a3";
  const encodedQuery = encodeURIComponent(query);
  const numResults = 5;
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodedQuery}&num=${numResults}`;

  // Perform the HTTP request
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Handle the search results
      const links = data.items.map((item) => item.link);
      console.log(links);
    })
    .catch((error) => {
      // Handle any errors
      console.error("Error fetching search results:", error);
    });
}

googleSearch("install open-cv");
