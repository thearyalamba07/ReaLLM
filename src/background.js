let tokenCount = 0;

chrome.storage.local.get(["tokenCount"], function (result) {
  tokenCount = result.tokenCount || 0;
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "runFunction") {
    // const apiUrl = "https://reallm-backend.onrender.com/update_string";
    const apiUrl = "http://127.0.0.1:8000/update_string";
    const promptData = {
      input_string: request.inputString,
      key: request.key,
      prompt_string: request.prompt_string,
      clipboard_string: request.clipboard_data,
    };
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promptData),
      type: "no-cors",
    })
      .then((response) => response.json())
      .then((data) => {
        /* data.output_string contains the optimized promptData
         * data.tokens_original contains the original token num
         * data.tokens_processed contains the optimized promptData token num
         * data.coefficient contains the google coefficient of the promptData
         */
        console.log(data);
        sendResponse({
          coefficient: data.coefficient,
          message: data.output_string,
          token:
            parseInt(data.tokens_original, 10) -
            parseInt(data.tokens_processed, 10),
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        sendResponse({ message: "error" });
      });

    return true;
  }

  if (request.action === "updateTokenCount") {
    tokenCount += request.numTokens;
    chrome.storage.local.set({ tokenCount });
  }

  if (request.action === "getTokenCount") {
    sendResponse({ num: tokenCount });
  }

  if (request.action === "storePrompt") {
    const apiUrl = "http://127.0.0.1:8000/store_prompt";
    const promptData = {
      input_string: request.inputString,
      key: request.key,
      prompt_string: request.prompt_string,
    };
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promptData),
      type: "no-cors",
    })
      .then(() => {
        console.log("Prompt data stored successfully.");
        console.log(promptData);
        sendResponse({ message: "success" });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        sendResponse({ message: "error" });
      });

    return true;
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "sendPrompt") {
    console.log(`Command: ${command}`);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "insertNewPrompt" });
    });
  }
});
