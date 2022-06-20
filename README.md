# Instructions
1. Download the latest release (zip)
2. Go to chrome://extensions/
3. Drag the downloaded zip into the page

Alternatively, you can manually download this repo
1. Go to chrome://extensions/
2. Click on `Load unpacked` and select the application directory of the repository
3. Go to a Stack Overflow page and the predicted tags will be displayed below the title, and the accuracy will be displayed below the predicted tags.

**NOTE: The browser extension uses the model that is deployed on [Heroku](https://so-classifier.herokuapp.com/), which is also the latest version on the [main branch](https://github.com/btjiong/remla-extension-project). It is possible to use a model that runs locally (e.g. via a Kubernetes cluster) by changing the _baseUrl_ in _background.js_** 
