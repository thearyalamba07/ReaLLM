document.addEventListener("DOMContentLoaded", function () {
  var toggleSwitch = document.getElementById("toggle-switch");
  var dialogueWindow = document.getElementById("dialogue-window");

  toggleSwitch.addEventListener("change", function () {
    if (this.checked) {
      dialogueWindow.style.display = "block";
    } else {
      dialogueWindow.style.display = "none";
    }
  });
});
