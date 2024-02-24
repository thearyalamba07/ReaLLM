chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "runFunction") {

        const apiUrl = "https://dada-avatar.onrender.com/health";
        var result;
        var str1 = ""

        // Make a GET request to the API endpoint
        fetch(apiUrl)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                result = data
                console.log(result.message);
                str1 = result.message;
                console.log(str1);
                // sendResponse({ data });
                sendResponse({message: str1});

            })
            .catch((error) => {
                console.error("Fetch error:", error);
                sendResponse({ message: "error"});
            });

        return true;
    }
});
