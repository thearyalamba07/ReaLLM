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


function injectElements() {
    const textArea = document.getElementById("prompt-textarea");
    const submitButton = textArea.nextSibling;

    var clipboard = "";

    if (textArea && submitButton) {
        sendMessage("reload");

        // change class of submitButton
        submitButton.className = "absolute top-3 right-2 rounded-lg border border-black bg-black p-0.5 text-white transition-colors enabled:bg-black disabled:text-gray-400 disabled:opacity-10 dark:border-white dark:bg-white dark:hover:bg-white md:top-3 md:right-3";

        const separator = document.createElement("hr");
        separator.id = "separator";
        submitButton.insertAdjacentElement("afterend", separator);

        const badgeContainer = document.createElement("div");
        badgeContainer.id = "badge-container";
        separator.insertAdjacentElement("afterend", badgeContainer);

        const tokbadge = document.createElement("p");
        tokbadge.textContent = `Tokens saved:`;
        tokbadge.id = "tokbadge";
        badgeContainer.appendChild(tokbadge);

        const processedContainer = document.createElement("div");
        processedContainer.id = "processed-container";
        badgeContainer.appendChild(processedContainer);

        const arrowButton = document.createElement("button");
        arrowButton.innerHTML = "&#x27A4;";
        arrowButton.id = "arrow-button";
        processedContainer.appendChild(arrowButton);

        const badge = document.createElement("p");
        badge.textContent = `Processed prompt: `;
        badge.id = "badge";
        processedContainer.appendChild(badge);

        const processedContainer2 = document.createElement("div");
        processedContainer2.id = "processed-container2";
        badgeContainer.insertAdjacentElement("afterend", processedContainer2);

        const googleButton = document.createElement("button");
        googleButton.innerHTML = "GOOGLE";
        googleButton.id = "google-button";
        processedContainer2.appendChild(googleButton);

        const textbox = document.createElement("p");
        textbox.textContent = `0`;
        textbox.id = "textbox";
        processedContainer2.appendChild(textbox);

        let timeoutId;

        // Gets data whenever something is pasted in the text area
        textArea.onpaste = function(e) {
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
                function(response) {
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
        textArea.addEventListener("input", function() {
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
        textArea.addEventListener("input", function() {
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
        textArea.addEventListener("keydown", function(event) {
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
                function(response) {
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
        storePrompt(textArea.value, "arrow", processedPrompt);
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
      insertProcessedPrompt();
      textArea.focus();
    });

    // Opens a new tab with a Google search for the processed prompt
    googleButton.addEventListener("click", function () {
      event.preventDefault();
      const processedPrompt = badge.textContent.replace(
        "Processed prompt: ",
        "",
      );
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
}

function removeElements() {
  const separator = document.getElementById("separator");
  const tokbadge = document.getElementById("tokbadge");
  const arrowButton = document.getElementById("arrow-button");
  const badge = document.getElementById("badge");
  const processedContainer = document.getElementById("processed-container");
  const googleButton = document.getElementById("google-button");
  const textbox = document.getElementById("textbox");
  const processedContainer2 = document.getElementById("processed-container2");
  const badgeContainer = document.getElementById("badge-container");

  if (separator) {
    separator.remove();
  }
  if (tokbadge) {
    tokbadge.remove();
  }
  if (arrowButton) {
    arrowButton.remove();
  }
  if (badge) {
    badge.remove();
  }
  if (processedContainer) {
    processedContainer.remove();
  }
  if (googleButton) {
    googleButton.remove();
  }
  if (textbox) {
    textbox.remove();
  }
  if (processedContainer2) {
    processedContainer2.remove();
  }
  if (badgeContainer) {
    badgeContainer.remove();
  }
}

chrome.storage.local.get("isOn", function (data) {
  if (data.isOn) {
    injectElements();
  } else {
    removeElements();
  }
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (changes.isOn) {
    if (changes.isOn.newValue) {
      injectElements();
    } else {
      removeElements();
    }
  }
});
