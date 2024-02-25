document.addEventListener("DOMContentLoaded", function () {
  var toggleSwitch = document.getElementById("toggle-switch");
  var dialogueWindow = document.getElementById("dialogue-window");
  var tokenSaved = document.getElementById("token-count");

  dialogueWindow.style.display = "block";
  chrome.runtime.sendMessage(
    { action: "getTokenCount" },
    function (response) {
      const num_tokens = response.num;
      tokenSaved.textContent = `Tokens saved: ${num_tokens}`;
    },
  );

  toggleSwitch.addEventListener("change", function () {
    if (this.checked) {
      dialogueWindow.textContent = `on`;

      chrome.runtime.sendMessage(
        { action: "getTokenCount" },
        function (response) {
          const num_tokens = response.num;
          tokenSaved.textContent = `Tokens saved: ${num_tokens}`;
        },
      );
    } else {
      tokenSaved.textContent = `...`;
      dialogueWindow.textContent = `...`;
    }
  });
});
