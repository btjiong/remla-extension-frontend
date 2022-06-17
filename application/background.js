var title;
var tags = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    title = request.message[0];
    tags = request.message[1];
});

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    // Check if the page is loaded, otherwise the title is not correct
    if (change.status == 'complete') {
        // Check if the current tab is a Stack Overflow post
        if (
            /^https:\/\/stackoverflow.com\/questions\/*\//.test(tab.url) &&
            !/^https:\/\/stackoverflow.com\/questions\/tagged\//.test(tab.url)
        ) {
            chrome.tabs.insertCSS(null, { file: './style.css' });
            chrome.tabs.executeScript(null, { file: './foreground.js' }, () => {
                // Gets the tab title and removes ' - Stack Overflow'
                // const title = tab.title.slice(0, -17);

                // Create a new POST request to predict the tags of the Stack Overflow title
                const req = new XMLHttpRequest();
                const baseUrl = 'https://so-classifier.herokuapp.com/predict';
                // const baseUrl = 'http://127.0.0.1/predict';
                req.open('POST', baseUrl, true);
                req.setRequestHeader(
                    'Content-type',
                    'application/json;charset=UTF-8'
                );
                req.send(
                    JSON.stringify({
                        title: title,
                        tags: tags,
                    })
                );

                // Call a function when the state changes (a response is received)
                req.onreadystatechange = function () {
                    if (
                        this.readyState === XMLHttpRequest.DONE &&
                        this.status === 200
                    ) {
                        const result = JSON.parse(req.responseText)['result'];

                        // Send the result to the foreground
                        chrome.tabs.sendMessage(tabId, {
                            message: req.responseText,
                        });
                    }
                };
            });
        }
    }
});
