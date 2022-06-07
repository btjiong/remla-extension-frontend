const parent = document
    .getElementById('question-header')
    .getElementsByTagName('h1')[0];

// Get the actual Stack Overflow tags
const itemColl = document
    .getElementsByClassName('d-flex ps-relative fw-wrap')[0]
    .getElementsByTagName('a');

var items = [];
for (var i = 0; i < itemColl.length; i++) {
    items.push(itemColl[i].textContent);
}

chrome.runtime.sendMessage({ message: items });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Create a italics element on a newline
    const result = JSON.parse(request.message)['result'];
    const acc = JSON.parse(request.message)['accuracy'];
    if (parent.getElementsByTagName('br').length == 0) {
        const newline = document.createElement('br');
        const element = document.createElement('i');
        const tags = document.createTextNode(
            `[Predicted tags (${acc}): ${result}]`
        );

        // Put the predicted tags inside the created element
        element.appendChild(tags);
        parent.appendChild(newline);
        parent.appendChild(element);
    }
});
