const { main } = require("../processes/textProcessing.js");
const { numTokens } = require("../processes/tokenCount.js");
const { shorten } = require("../processes/acronyms.js");

text =
  "This is a test. This is only a test. Procastinite. Artificial Intelligence.";

console.log("Test:", text);
main(text)
  .then((result) => {
    text = result;
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
console.log(numTokens(text));
shorten(text, (err, result) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log("Shortened text:", result);
});
