var Typo = require("typo-js");
var dictionary = new Typo("en_US");

function googleSearch(query) {
  const apiKey = "AIzaSyCYzjs8J5sX4R75sI6fuN7Zwm1YyDX9tMw";
  const cx = "a11f3384e1cf243a3";
  const encodedQuery = encodeURIComponent(query);
  const numResults = 5;
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

function removePunctuation(text) {
  return text.replace(/[.,;:?!'"]/g, "");
}

function correctSpelling(prompt) {
  let words = prompt.split(" ");

  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    var val = dictionary.check(word);
    if (!val) {
      var array = dictionary.suggest(word);
      words[i] = array[0];
    }
  }
  return words.join(" ");
}

text = "I procastinate a lot, a lot.";
text = removePunctuation(text);
text = correctSpelling(text);
googleSearch(text);
console.log(text);
