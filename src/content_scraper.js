const textArea = document.getElementById("prompt-textarea");

if (textArea) {
  const text = textArea.textContent;
  var wordCount = 0;

  const badge = document.createElement("p");
  badge.textContent = `how many words????  ${wordCount}`;
  textArea.insertAdjacentElement("afterend", badge);

  textArea.addEventListener("input", function () {
    const text = textArea.value;
    const words = text.match(/[^\s]+/g);
    wordCount = words ? words.length : 0;

    badge.textContent = `Word count: ${wordCount}`;
  });
}
