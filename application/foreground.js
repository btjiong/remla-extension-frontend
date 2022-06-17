const parent = document
    .getElementById('question-header')
    .getElementsByTagName('h1')[0];

const title =
    document.getElementsByClassName('question-hyperlink')[0].innerText;

// Get the actual Stack Overflow tags
const itemColl = document
    .getElementsByClassName('d-flex ps-relative fw-wrap')[0]
    .getElementsByTagName('a');

var items = [];
for (var i = 0; i < itemColl.length; i++) {
    items.push(itemColl[i].textContent);
}

chrome.runtime.sendMessage({ message: [title, items] });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Create a italics element on a newline
    const result = JSON.parse(request.message)['result'];
    const acc = JSON.parse(request.message)['accuracy'];
    if (parent.getElementsByTagName('br').length == 0) {
        const newline = document.createElement('br');
        const newlineTag = document.createElement('br');

        // Put the tags on a new line
        if (result.length > 0) {
            parent.appendChild(newline);
        }
        for (const tag of result) {
            const tagElement = document.createElement('span');
            if (items.includes(tag)) {
                // If the tag is correct, it should be green
                tagElement.className = 'correct-tag pred-tag';
            } else {
                // If the tag is incorrect, it should be red
                tagElement.className = 'incorrect-tag pred-tag';
            }
            tagElement.appendChild(document.createTextNode(`${tag}`));
            parent.appendChild(tagElement);
        }

        // Prediction accuracy
        const textElement = document.createElement('span');
        textElement.className = 'pred-text fc-light mr2';
        textElement.appendChild(
            document.createTextNode(`Prediction accuracy `)
        );

        // {acc}
        const accElement = document.createElement('span');
        accElement.className = 'accuracy';
        accElement.appendChild(document.createTextNode(`${acc.toFixed(2)}`));

        // Put the accuracy on a new line
        parent.appendChild(newlineTag);
        parent.appendChild(textElement);
        parent.appendChild(accElement);
    }
});
