var Typo = require("typo-js");
var dictionary = new Typo("en_US");
const didYouMean = require("google-did-you-mean");

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
  return text.replace(/[.,;:?!'"]/g, "").toLowerCase();
}

function correctSpelling(inputString) {
  const words = inputString.split(/\s+/);
  function levenshteinDistance(word1, word2) {
    const dp = Array(word1.length + 1)
      .fill(null)
      .map(() => Array(word2.length + 1).fill(null));
    for (let i = 0; i <= word1.length; i++) {
      dp[i][0] = i;
    }
    for (let j = 0; j <= word2.length; j++) {
      dp[0][j] = j;
    }
    for (let i = 1; i <= word1.length; i++) {
      for (let j = 1; j <= word2.length; j++) {
        const cost = word1[i - 1] === word2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // deletion
          dp[i][j - 1] + 1, // insertion
          dp[i - 1][j - 1] + cost, // substitution
        );
      }
    }
    return dp[word1.length][word2.length];
  }

  function findClosestWord(word) {
    let minDistance = Infinity;
    let closestWord = word;

    for (let dictWord of dict) {
      const distance = levenshteinDistance(
        word.toLowerCase(),
        dictWord.toLowerCase(),
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestWord = dictWord;
      }
    }
    return closestWord;
  }
  const correctedWords = words.map((word) => findClosestWord(word));
  return correctedWords.join(" ");
}

const dict = [
  "hello",
  "world",
  "how",
  "are",
  "you",
  "procrastinate",
  "a",
  "I",
  "slip",
  "slit",
  "slot",
  "lot" /* add more words */,
];

async function correctSpelling1(word) {
  const query = await didYouMean(word);
  return query.suggestion != null ? query.suggestion : word;
}

async function correctSentence(sentence) {
  const words = sentence.split(/\s+/);
  const correctedWords = await Promise.all(
    words.map((word) => correctSpelling1(word)),
  );
  return correctedWords.join(" ");
}

async function main() {
  const sentence =
    "This is a test sentance procrastinot sloh with mispelled words.";
  const correctedSentence = await correctSentence(sentence);
  console.log("Original sentence:", sentence);
  console.log("Corrected sentence:", correctedSentence);
}

main();

text = "I Procastinot slop A lot, a lot.";
text = removePunctuation(text);
text = correctSpelling(text);
googleSearch(text);
console.log(text);
