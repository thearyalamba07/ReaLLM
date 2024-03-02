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
  badgeContainer.style.height = "70px"; // Set a fixed height for the container
  badgeContainer.style.overflowY = "auto"; // Enable vertical scrolling
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
  processedContainer.appendChild(badge);

  const googleButton = document.createElement("button");
  googleButton.innerHTML = "GOOGLE";
  badgeContainer.insertAdjacentElement("afterend", googleButton);

  let timeoutId;

  function sendrequest(text) {
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

  function handleInput() {
    clearTimeout(timeoutId);
    console.log("input");
    timeoutId = setTimeout(() => {
      const text = textArea.value;
      sendrequest(text);
    }, 1000);
  }

  textArea.addEventListener("input", handleInput);

  textArea.addEventListener("input", function () {
    const inputData = event.data;
    if (inputData === " ") {
      const text = textArea.value;
      sendrequest(text);
    }
  });

  textArea.addEventListener("input", function () {
    const inputData = event.data;
    if (inputData.match(/[?.,!;:()]/)) {
      const text = textArea.value;
      sendrequest(text);
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
        sendrequest(text);
      }, 0);
    }
  });

  function insertProcessedPrompt() {
    if (textArea.value === "") {
      alert("Enter a prompt");
    } else if (badge.textContent === "Processed prompt: ") {
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
      badge.textContent = "Processed prompt: ";
      tokbadge.textContent = "Tokens saved: ";
    }
  }

  arrowButton.addEventListener("click", function () {
    event.preventDefault();
    insertProcessedPrompt();
  });

  googleButton.addEventListener("click", function () {
    event.preventDefault();
    const processedPrompt = badge.textContent.replace("Processed prompt: ", "");
    const url = `https://www.google.com/search?q=${processedPrompt}`;
    window.open(url, "_blank");
    textArea.value = "";
    badge.textContent = "Processed prompt:";
    tokbadge.textContent = "Tokens saved:";
  });

  function updateTokBadge(tokenCount) {
    tokbadge.textContent = `Tokens saved: ${tokenCount}`;
  }

  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.action === "insertNewPrompt") {
        insertProcessedPrompt();
      }
    },
  );
}
