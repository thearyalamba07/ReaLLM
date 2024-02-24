const { main } = require("../processes/textProcessing.js");
const { numTokens } = require("../processes/tokenCount.js");
const { shorten } = require("../processes/acronyms.js");

let text =
  "This is a test. This is only a test. Procrastinate. Artificial Intelligence.";

console.log("Original Text:", text);

console.log("Number of Tokens:", numTokens(text));
main(text)
  .then((result) => {
    shorten(result, (err, shortenedText) => {
      if (err) {
        console.error("Error:", err);
        return;
      }
      console.log("\nProcessed Text:", shortenedText);
      console.log("Number of Tokens:", numTokens(shortenedText));
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
