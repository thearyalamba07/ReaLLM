const textArea = document.getElementById("prompt-textarea");

if (textArea) {
  // const text = textArea.textContent;
  var wordCount = "";

  const badge = document.createElement("p");
  badge.textContent = `how many tokens????  ${wordCount}`;
  textArea.insertAdjacentElement("afterend", badge);

  textArea.addEventListener("input", function () {
    const text = textArea.value;
    // const words = text.match(/[^\s]+/g);
    // wordCount = words ? words.length : 0;

    chrome.runtime.sendMessage(
      { action: "runFunction", inputString: text },
      function (response) {
        wordCount = response.message;
        console.log(wordCount);
          badge.textContent = `token count: ${wordCount}`;
      },
    );

  });
}
