const textArea = document.getElementById("prompt-textarea");

if (textArea) {
  const separator = document.createElement("hr");
  separator.style.borderTop = "1px solid white";
  separator.style.width = "87%";
  separator.style.marginLeft = "auto";
  separator.style.marginRight = "auto";
  textArea.insertAdjacentElement("afterend", separator);

  const badgeContainer = document.createElement("div");
  badgeContainer.style.display = "flex";
  badgeContainer.style.flexDirection = "column"; // Stack elements vertically
  badgeContainer.style.alignItems = "flex-start"; // Align items to the start
  badgeContainer.style.paddingLeft = "52px";
  separator.insertAdjacentElement("afterend", badgeContainer);

  const tokbadge = document.createElement("p");
  tokbadge.textContent = `Tokens saved:`;
  tokbadge.style.color = "white";
  tokbadge.style.margin = "2";
  tokbadge.style.paddingLeft = "6px";
  tokbadge.style.fontWeight = "400";
  tokbadge.style.fontSize = "14px";
  badgeContainer.appendChild(tokbadge); // Add the token badge to the container

  const processedContainer = document.createElement("div"); // Create a container for the badge and button
  processedContainer.style.display = "flex"; // Set the display to flex for horizontal alignment
  processedContainer.style.alignItems = "center"; // Align items vertically in the center
  badgeContainer.appendChild(processedContainer); // Add the processed container to the badge container

  const arrowButton = document.createElement("button");
  arrowButton.innerHTML = "&#x27A4;";
  arrowButton.style.border = "none";
  arrowButton.style.background = "transparent";
  arrowButton.style.color = "red";
  arrowButton.style.fontSize = "16px";
  arrowButton.style.cursor = "pointer";
  arrowButton.style.padding = "6px 8px";
  processedContainer.appendChild(arrowButton); // Add the button to the processed container

  const badge = document.createElement("p");
  badge.textContent = `Processed prompt: `;
  badge.style.color = "white";
  badge.style.margin = "0";
  badge.style.fontWeight = "400";
  badge.style.fontSize = "14px";
  processedContainer.appendChild(badge); // Add the badge to the processed container

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

      // chrome.runtime.sendMessage({
      //   action: "displayPromptContent",
      //   promptContent: promptContent,
      // });
    }
  });
  textArea.addEventListener("keydown", function (event) {
    if (
      event.key === "Backspace" ||
      event.key === "Delete" ||
      event.key === "Enter"
    ) {
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

  arrowButton.addEventListener("click", function () {
    if (badge.textContent.includes("Processing") || badge.textContent == "") {
      alert("Processing... Please wait.");
    } else {
      const processedPrompt = badge.textContent.replace(
        "Processed prompt: ",
        "",
      );
      textArea.value = processedPrompt;
      const num_tokens = parseInt(tokbadge.textContent.substring(14), 10);
      chrome.runtime.sendMessage({
        action: "updateTokenCount",
        numTokens: num_tokens,
      });
      badge.textContent = "Processed prompt:";
      tokbadge.textContent = "Tokens saved: 0";
    }
  });

  function updateTokBadge(tokenCount) {
    tokbadge.textContent = `Tokens saved: ${tokenCount}`;
  }
}
