document.addEventListener("DOMContentLoaded", function () {
  var toggleSwitch = document.getElementById("toggle-switch");
  var dialogueWindow = document.getElementById("dialogue-window");
  var tokenSaved = document.getElementById("token-count");
  var carbonFootprint = document.getElementById("carbon-footprint");

  function calculateCarbonFootprint(numTokens) {
    return numTokens * (3 / 35);
  }

  function turnOn() {
    // dialogueWindow.textContent = `on`;
    chrome.runtime.sendMessage(
      { action: "getTokenCount" },
      function (response) {
        const num_tokens = response.num;
        tokenSaved.textContent = `Total Tokens saved: ${num_tokens}`;
        var carbonSaved = calculateCarbonFootprint(num_tokens);
        carbonFootprint.textContent = `Total Carbon saved: ${carbonSaved.toFixed(2)} grams`;
      },
    );
  }

  turnOn();
  // dialogueWindow.style.display = "block";

  toggleSwitch.addEventListener("change", function () {
    if (this.checked) {
      turnOn();
    } else {
      tokenSaved.textContent = `...`;
      // dialogueWindow.textContent = `...`;
      carbonFootprint.textContent = `...`;
    }
  });
});

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.action === "displayPromptContent") {
//     document.getElementById("dialogue-window").innerText =
//       request.promptContent;
//   }
// });
