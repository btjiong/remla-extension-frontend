let active_tab_id = 0;

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    active_tab_id = tabId;
    // Check if the page is loaded, otherwise the title is not correct
    if (change.status == 'complete') {
        // Check if the current tab is a Stack Overflow post
        if (/^https:\/\/stackoverflow/.test(tab.url)) {
            chrome.tabs.executeScript(null, { file: './foreground.js' }, () => {
                // Gets the tab title and removes ' - Stack Overflow'
                const title = tab.title.slice(0, -17);

                // Create a new POST request to predict the tags of the Stack Overflow title
                const req = new XMLHttpRequest();
                const baseUrl = 'https://so-classifier.herokuapp.com/predict';
                req.open('POST', baseUrl, true);
                req.setRequestHeader(
                    'Content-type',
                    'application/json;charset=UTF-8'
                );
                req.send(
                    JSON.stringify({
                        title: title,
                    })
                );

                // Call a function when the state changes (a response is received)
                req.onreadystatechange = function () {
                    if (
                        this.readyState === XMLHttpRequest.DONE &&
                        this.status === 200
                    ) {
                        const result = JSON.parse(req.responseText)[
                            'result'
                        ][0];

                        // Send the result to the foreground
                        chrome.tabs.sendMessage(active_tab_id, {
                            message: result,
                        });
                        console.log(result);
                    }
                };
            });
        }
    }
});
