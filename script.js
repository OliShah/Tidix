import { texts } from './texts.js'; 
console.log('Imported texts:', texts);


function displayRandomText() {
    console.log('displayRandomText function called');
    const textIds = Object.keys(texts);
    const randomId = textIds[Math.floor(Math.random() * textIds.length)];
    const displayTextElement = document.getElementById('displayText');
    displayTextElement.textContent = texts[randomId];
}

window.onload = () => {
    console.log('Window loaded');
    displayRandomText();
};
