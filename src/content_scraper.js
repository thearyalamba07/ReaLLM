function sendMessage(text) {
  chrome.runtime.sendMessage(
    {
      action: "message",
      input: text,
    },
    function (response) {
      console.log(response.message);
    },
  );
}

const textArea = document.getElementById("prompt-textarea");
var clipboard = "";

if (textArea) {
  sendMessage("reload");
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
  badgeContainer.style.paddingRight = "52px";
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
  arrowButton.style.color = "green";
  arrowButton.style.fontSize = "16px";
  arrowButton.style.cursor = "pointer";
  arrowButton.style.padding = "0px 8px";
  processedContainer.appendChild(arrowButton); // Add the button to the processed container

  const badge = document.createElement("p");
  badge.textContent = `Processed prompt: `;
  badge.style.color = "white";
  badge.style.margin = "0";
  badge.style.fontWeight = "400";
  badge.style.fontSize = "14px";
  badge.style.overflowY = "auto"; // Enable vertical scrolling
  badge.style.maxHeight = "50px"; // Set the maximum height of the badge
  processedContainer.appendChild(badge);

  const processedContainer2 = document.createElement("div"); // Create a container for the badge and button
  processedContainer2.style.display = "flex"; // Set the display to flex for horizontal alignment
  processedContainer2.style.alignItems = "center"; // Align items vertically in the center
  processedContainer2.style.justifyContent = "center"; // Align items horizontally in the center
  badgeContainer.insertAdjacentElement("afterend", processedContainer2); // Add the processed container to the badge container

  const googleButton = document.createElement("button");
  googleButton.innerHTML = "GOOGLE";
  processedContainer2.appendChild(googleButton);

  const textbox = document.createElement("p");
  textbox.textContent = `0`;
  textbox.style.color = "white";
  textbox.style.margin = "0 10px";
  textbox.style.fontWeight = "400";
  textbox.style.fontSize = "14px";
  processedContainer2.appendChild(textbox);

  let timeoutId;

  // Gets data whenever something is pasted in the text area
  textArea.onpaste = function (e) {
    var pastedText = undefined;
    if (window.clipboardData && window.clipboardData.getData) {
      pastedText = window.clipboardData.getData("Text");
    } else if (e.clipboardData && e.clipboardData.getData) {
      pastedText = e.clipboardData.getData("text/plain");
    }
    clipboard = pastedText;
  };

  // Sends a request to the background script to process the prompt
  function sendrequest(text, tag, prompt) {
    textArea.focus();
    chrome.runtime.sendMessage(
      {
        action: "runFunction",
        inputString: text,
        key: tag,
        prompt_string: prompt,
        clipboard_data: clipboard,
      },
      function (response) {
        prompt = response.message;
        num_tokens = response.token;
        coef = response.coefficient;
        update(prompt, num_tokens, coef);
      },
    );
  }

  // Calls request function if the user stops typing for 2 seconds
  function handleInput() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const text = textArea.value;
      const processedPrompt = badge.textContent.replace(
        "Processed prompt: ",
        "",
      );
      sendrequest(text, "timer", processedPrompt, "");
    }, 2000);
  }

  textArea.addEventListener("input", handleInput);

  // Calls request function if space is pressed
  textArea.addEventListener("input", function () {
    const inputData = event.data;
    if (inputData === " ") {
      const text = textArea.value;
      const processedPrompt = badge.textContent.replace(
        "Processed prompt: ",
        "",
      );
      sendrequest(text, "space", processedPrompt);
    }
  });

  // Calls request function if punctuation is pressed
  textArea.addEventListener("input", function () {
    const inputData = event.data;
    if (
      inputData !== null &&
      inputData !== undefined &&
      inputData.match(/[?.,!;:()]/)
    ) {
      const text = textArea.value;
      const processedPrompt = badge.textContent.replace(
        "Processed prompt: ",
        "",
      );
      sendrequest(text, "punctuation", processedPrompt);
    }
  });

  // Calls request function if backspace or delete is pressed
  textArea.addEventListener("keydown", function (event) {
    if (event.key === "Backspace" || event.key === "Delete") {
      setTimeout(() => {
        const text = textArea.value;
        const processedPrompt = badge.textContent.replace(
          "Processed prompt: ",
          "",
        );
        sendrequest(text, "delete", processedPrompt);
      }, 0);
    }
  });

  // Sends a request to the background script to store the prompt
  function storePrompt(text, tag, prompt) {
    chrome.runtime.sendMessage(
      {
        action: "storePrompt",
        inputString: text,
        key: tag,
        prompt_string: prompt,
      },
      function (response) {
        console.log(response.message);
      },
    );
  }

  // Calls storePrompt function if enter is pressed
  textArea.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      var text = "";
      setTimeout(() => {
        var divElements = document.querySelectorAll('div[class=""]');
        var lastDivElement = Array.from(divElements).pop();
        if (lastDivElement) {
          var text = lastDivElement.textContent.trim();
          console.log("Text content of the last div element:", text);
        } else {
          console.log("Last div element not found");
        }

        const processedPrompt = badge.textContent.replace(
          "Processed prompt: ",
          "",
        );
        storePrompt(text, "Enter", processedPrompt);
      }, 0);
      update("", 0, 0);
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
      update("", 0, 0);
    }
  }

  // Calls storePrompt function if the arrow button is clicked
  arrowButton.addEventListener("click", function () {
    event.preventDefault();
    storePrompt(
      textArea.value,
      "arrow",
      badge.textContent.replace("Processed prompt: ", ""),
    );
    insertProcessedPrompt();
    textArea.focus();
  });

  // Opens a new tab with a Google search for the processed prompt
  googleButton.addEventListener("click", function () {
    event.preventDefault();
    const processedPrompt = badge.textContent.replace("Processed prompt: ", "");
    const url = `https://www.google.com/search?q=${processedPrompt}`;
    window.open(url, "_blank");
    textArea.value = "";
    update("", 0, 0);
    textArea.focus();
  });

  // Updates the fields
  function update(prompt, token, coef) {
    badge.textContent = `Processed prompt: ${prompt}`;
    tokbadge.textContent = `Tokens saved: ${token}`;
    textbox.textContent = coef;
  }

  // Listens for messages from the background script
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.action === "insertNewPrompt") {
        insertProcessedPrompt();
      }
    },
  );
}
