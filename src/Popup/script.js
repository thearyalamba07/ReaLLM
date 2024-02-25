document.addEventListener("DOMContentLoaded", function () {
  var toggleSwitch = document.getElementById("toggle-switch");
  var dialogueWindow = document.getElementById("dialogue-window");
  var tokenSaved = document.getElementById("token-count");

  function turnOn() {
    dialogueWindow.textContent = `on`;
    chrome.runtime.sendMessage(
      { action: "getTokenCount" },
      function (response) {
        const num_tokens = response.num;
        tokenSaved.textContent = `Tokens saved: ${num_tokens}`;
      },
    );
  }

  turnOn();
  dialogueWindow.style.display = "block";

  toggleSwitch.addEventListener("change", function () {
    if (this.checked) {
      turnOn();
    } else {
      tokenSaved.textContent = `...`;
      dialogueWindow.textContent = `...`;
    }
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "displayPromptContent") {
    document.getElementById("dialogue-window").innerText = request.promptContent;
  }
});
