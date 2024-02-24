const fs = require("fs");
const { removePunctuation } = require("./textProcessing.js");

function shorten(text, callback) {
  fs.readFile("../data/abbreviations.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading text file:", err);
      return;
    }
    const lines = data.split("\n");
    lines.forEach((line) => {
      if (line.trim() === "") {
        return;
      }
      [element1, element2] = line.match(/^\s*(\S+)\s+(.+)/).slice(1);
      element2 = removePunctuation(element2);
      text = text.replace(element2, element1);
    });
    callback(null, text);
  });
}
module.exports = {
  shorten,
};
