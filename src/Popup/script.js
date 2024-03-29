document.addEventListener("DOMContentLoaded", function() {
    var toggleSwitch = document.getElementById("toggle-switch");
    var dialogueWindow = document.getElementById("dialogue-window");
    var tokenSaved = document.getElementById("token-count");
    var carbonFootprint = document.getElementById("carbon-footprint");

    function calculateCarbonFootprint(numTokens) {
        return numTokens * (3 / 35);
    }

    function turnOn() {
        chrome.runtime.sendMessage(
            { action: "getTokenCount" },
            function(response) {
                const num_tokens = response.num;
                tokenSaved.textContent = `Total Tokens saved: ${num_tokens}`;
                var carbonSaved = calculateCarbonFootprint(num_tokens);
                carbonFootprint.textContent = `Total Carbon saved: ${carbonSaved.toFixed(2)} grams`;
            },
        );
    }

    chrome.storage.local.get('isOn', function(data) {
        // Update the checkbox state based on the stored value
        toggleSwitch.checked = data.isOn;
        turnOn();
    });

    toggleSwitch.addEventListener("change", function() {
        chrome.storage.local.set({ isOn: this.checked });
        turnOn();
    });
});
