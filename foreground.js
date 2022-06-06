chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Get the Stack Overflow title element
    const parent = document
        .getElementById('question-header')
        .getElementsByTagName('h1')[0];

    // Get the actual Stack Overflow tags
    const items = document
        .getElementsByClassName('d-flex ps-relative fw-wrap')[0]
        .getElementsByTagName('a');

    // Create a italics element on a newline
    if (parent.getElementsByTagName('br').length == 0) {
        const newline = document.createElement('br');
        const element = document.createElement('i');
        const tags = document.createTextNode(
            `[Predicted tags (${accuracy(request.message, items)}): ${
                request.message
            }]`
        );

        // Put the predicted tags inside the created element
        element.appendChild(tags);
        parent.appendChild(newline);
        parent.appendChild(element);
    }
});

function accuracy(pred, actual) {
    var tp = 0;
    var fn = 0;
    for (var i = 0; i < actual.length; i++) {
        if (pred.includes(actual[i].textContent)) {
            tp++;
        } else {
            fn++;
        }
    }
    const fp = pred.length - tp;
    const accuracy = tp / (tp + fn + fp);
    return +parseFloat(accuracy).toFixed(2);
}
