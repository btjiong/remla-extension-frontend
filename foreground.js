chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.message);
    // Get the Stack Overflow title element
    const parent = document
        .getElementById('question-header')
        .getElementsByTagName('h1')[0];

    // Create a italics element on a newline
    if (parent.getElementsByTagName('br').length == 0) {
        const newline = document.createElement('br');
        const element = document.createElement('i');
        const tags = document.createTextNode(
            `[Predicted tags: ${request.message}]`
        );

        // Put the predicted tags inside the created element
        element.appendChild(tags);
        parent.appendChild(newline);
        parent.appendChild(element);
    }
});
