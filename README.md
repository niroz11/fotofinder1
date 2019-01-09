# Niraj Aryal- Fotofinder Project

## Architecture
For this project, we’ll be increasingly thinking about the “data model” and “dom model” as separate entities. We’ll be using:

JSON and localStorage to persist data on page reload.
JavaScript to manage client-side interactions.
O entire application will consist of one HTML page or template. You will have two javascript files:

An photo.js file that contains an Idea class.
Photo methods must include, but are not limited to:
constructor
saveToStorage (should only have one job which is to save the instance to storage)
deleteFromStorage
updateContent (should be able to update the title or body of photo)
A main.js file that contains all dom related javascript.
Note The photo.js file must be the first script in your html so that your main.js file has access to our Photo class.

# Screenshots

![Screenshot](localhost_8000_.png)
