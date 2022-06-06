chrome.tabs.onActivated.addListener((tab) => {
    // chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    chrome.tabs.get(tab.tabId, (current_tab_info) => {
        // var current_tab_info = tabs[0];
        if (/^https:\/\/stackoverflow/.test(current_tab_info.url)) {
            chrome.tabs.insertCSS(null, { file: './styles.css' });
            chrome.tabs.executeScript(null, { file: './foreground.js' }, () =>
                console.log(
                    'STACKOVERFLOW PAGE',
                    // Gets the tab title and removes ' - Stack Overflow'
                    current_tab_info.title.slice(0, -17)
                )
            );
        }
    });
});

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    if (change.status == 'complete') {
        if (/^https:\/\/stackoverflow/.test(tab.url)) {
            chrome.tabs.insertCSS(null, { file: './styles.css' });
            chrome.tabs.executeScript(null, { file: './foreground.js' }, () =>
                console.log(
                    'STACKOVERFLOW PAGE',
                    // Gets the tab title and removes ' - Stack Overflow'
                    tab.title.slice(0, -17)
                )
            );
        }
    }
});
