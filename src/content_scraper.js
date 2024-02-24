const textArea = document.getElementById("prompt-textarea");

if (textArea) {
  // const text = textArea.textContent;
  var wordCount = "";

  const badge = document.createElement("p");
  badge.textContent = `Processing...`;
  textArea.insertAdjacentElement("afterend", badge);

  textArea.addEventListener("input", function () {
    if (event.data === " ") {
      const text = textArea.value;
      chrome.runtime.sendMessage(
        { action: "runFunction", inputString: text },
        function (response) {
          prompt = response.message;
          num_tokens = response.token;
          console.log(prompt);
          badge.textContent = `Processed prompt: ${prompt}\nNo. of tokens: ${num_tokens}`;
        },
      );
    }
  });
}
