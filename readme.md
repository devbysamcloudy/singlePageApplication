### Wordly Dictionary SPA
---> Overview <----

This is a beginner-friendly Single Page Application (SPA) that acts as an interactive dictionary. Users can search for English words, view their definitions, synonyms, pronunciation, and even hear the word’s audio. The page updates dynamically without reloading, making it fast and user-friendly.

### Features

Search for words: Users can type any word and click “Search” to get results.

Display word details: Shows the word, part of speech, definitions, examples, and synonyms.

Audio playback: Plays pronunciation if available.

Error handling: Displays a message when the word is not found or if there’s a problem fetching data.

Dynamic page: Updates only the content needed, without reloading the whole page.

### How to Use

Open index.html in a web browser.

Type a word into the input box.

Click the Search button or press Enter.

If the word exists, definitions, synonyms, and pronunciation appear below.

If the word doesn’t exist, an error message appears.

### Technologies Used

HTML: Structure of the page.

CSS: Simple styling for readability.

JavaScript: Handles user input, fetches data from the Free Dictionary API, and updates the page dynamically.

Fetch API: Used to retrieve word data from the online dictionary.

### File Structure
wordly-spa/
│
├── index.html       --> The main page
├── style.css        --> Styles for the page
└── script.js        --> JavaScript logic for search and display
