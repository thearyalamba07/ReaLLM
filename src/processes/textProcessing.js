const didYouMean = require("google-did-you-mean");

function removePunctuation(text) {
  return text.replace(/[.,;:?!'"]/g, "").toLowerCase();
}

async function correctSpelling(word) {
  const query = await didYouMean(word);
  return query.suggestion != null ? query.suggestion : word;
}

async function correctSentence(sentence) {
  const words = sentence.split(/\s+/);
  const correctedWords = await Promise.all(
    words.map((word) => correctSpelling(word)),
  );
  return correctedWords.join(" ");
}

async function main(sentence) {
  text = removePunctuation(sentence);
  text = await correctSentence(text);
}

module.exports = {
  main,
};
