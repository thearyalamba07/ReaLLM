function search(query) {
  const apiKey = "AIzaSyCYzjs8J5sX4R75sI6fuN7Zwm1YyDX9tMw";
  const cx = "a11f3384e1cf243a3";
  const encodedQuery = encodeURIComponent(query);
  const numResults = 3;
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodedQuery}&num=${numResults}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const results = data.items.map((item) => ({
        title: item.title,
        link: item.link,
      }));
      console.log(results);
    })
    .catch((error) => {
      console.error("Error fetching search results:", error);
    });
}

module.exports = {
  search,
};
