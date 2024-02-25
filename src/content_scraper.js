const textArea = document.getElementById("prompt-textarea");

if (textArea) {
  var wordCount = "";

  const badge = document.createElement("p");
  badge.textContent = `Processing...`;
  textArea.insertAdjacentElement("afterend", badge);

  const tokbadge = document.createElement("p");
  badge.textContent = `...`;
  textArea.insertAdjacentElement("afterend", tokbadge);

  const button = document.createElement("button");
  button.textContent = "Click Me";
  textArea.insertAdjacentElement("afterend", button);

  textArea.addEventListener("input", function () {
    const inputData = event.data;
    if (inputData === " " || inputData.match(/[.,!;:()]/)) {
      const text = textArea.value;
      chrome.runtime.sendMessage(
        { action: "runFunction", inputString: text },
        function (response) {
          prompt = response.message;
          num_tokens = response.token;
          updateTokBadge(num_tokens);
          badge.textContent = `Processed prompt: ${prompt}`;
        },
      );
    }
  });
  textArea.addEventListener("keydown", function (event) {
    if (event.key === "Backspace") {
      setTimeout(() => {
        const text = textArea.value;
        chrome.runtime.sendMessage(
          { action: "runFunction", inputString: text },
          function (response) {
            prompt = response.message;
            num_tokens = response.token;
            updateTokBadge(num_tokens);
            badge.textContent = `Processed prompt: ${prompt}`;
          },
        );
      }, 0);
    }
  });

  button.addEventListener("click", function () {
    if (badge.textContent.includes("Processing") || badge.textContent == "") {
      alert("Processing... Please wait.");
    } else {
      textArea.value = badge.textContent.substring(18);
      badge.textContent = "";
      num_tokens = parseInt(tokbadge.textContent.substring(14), 10);
      chrome.runtime.sendMessage({
        action: "updateTokenCount",
        numTokens: num_tokens,
      });
    }
  });

  function updateTokBadge(tokenCount) {
    tokbadge.textContent = `Tokens saved: ${tokenCount}`;
  }
}
