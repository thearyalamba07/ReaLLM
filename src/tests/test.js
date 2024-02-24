const { main } = require("../processes/textProcessing.js");
const { numTokens } = require("../processes/tokenCount.js");

text = "This is a test. This is only a test. Procastinite.";

main(text)
  .then((result) => {
    console.log("Result:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
console.log(numTokens(text));
