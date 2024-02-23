document.addEventListener("DOMContentLoaded", function () {
    var toggleSwitch = document.getElementById("toggle-switch");
    var contentContainer = document.getElementById("content-container");
  
    toggleSwitch.addEventListener("change", function () {
      if (this.checked) {
        contentContainer.style.display = "block";
      } else {
        contentContainer.style.display = "none";
      }
    });
  });
  