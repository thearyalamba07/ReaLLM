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

<<<<<<< HEAD
    chrome.runtime.sendMessage(
      { action: "executeFunction", text: text },
      function (response) {
        badge.textContent = `Token count: ${response.result}`;
        console.log("Response from background script:", response.result);
      },
    );

    // badge.textContent = `Word count: ${wordCount}`;
=======
>>>>>>> 282ac85 (figured out background api calls)
  });
}
