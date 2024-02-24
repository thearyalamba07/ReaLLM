chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "runFunction") {
    const apiUrl = "https://reallm-backend.onrender.com/update_string";

    const promptData = {
      input_string: request.inputString,
    };

    fetch(apiUrl, {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        // You might need additional headers, such as authorization headers
      },
      body: JSON.stringify(promptData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the optimized prompt received from the server
        /*
         * data.output_string contains the optimized promptData
         * data.tokens_original contains the original token num
         * data.tokens_processed contains the optimized promptData token num
         * data.google_search contains the first google search link
         */
        console.log(data);
        sendResponse({ message: data.output_string });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        sendResponse({ message: "error" });
      });

    return true;
  }
});
