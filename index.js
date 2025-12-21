const form = document.getElementById("searchForm");
const wordInput = document.getElementById("wordInput");
const resultsDiv = document.getElementById("results");
const wordTitle = document.getElementById("wordTitle");
const phonetic = document.getElementById("phonetic");
const audioEl = document.getElementById("audio");
const definitionsDiv = document.getElementById("definitions");
const synonymsDiv = document.getElementById("synonyms");
const errorDiv = document.getElementById("error");

/* event listener */
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var word = wordInput.value.trim();

    if (word === "") {
        showError("Please enter a word");
        return;
    }

    fetchWord(word, displayWord, showError);
});

/* function to fetch data (callback used) */
function fetchWord(word, successCallback, errorCallback) {
    clearUI();

    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
        .then(function (response) {
            if (!response.ok) {
                throw "error";
            }
            return response.json();
        })
        .then(function (data) {
            successCallback(data[0]);
        })
        .catch(function () {
            errorCallback("Word not found or error fetching data.");
        });
}

/* function to display word data */
function displayWord(data) {
    wordTitle.innerHTML = data.word;
    phonetic.innerHTML = data.phonetic ? data.phonetic : "";

    if (data.phonetics && data.phonetics.length > 0) {
        if (data.phonetics[0].audio) {
            audioEl.src = data.phonetics[0].audio;
            audioEl.style.display = "block";
        }
    }

    data.meanings.forEach(function (meaning) {
        addPartOfSpeech(meaning.partOfSpeech);
        addDefinitions(meaning.definitions);
        addSynonyms(meaning.synonyms);
    });

    resultsDiv.style.display = "block";
}

/* helper functions */

function addPartOfSpeech(text) {
    var h3 = document.createElement("h3");
    h3.innerHTML = text;
    definitionsDiv.appendChild(h3);
}

function addDefinitions(definitions) {
    definitions.forEach(function (def) {
        var p = document.createElement("p");
        p.innerHTML = "- " + def.definition;

        if (def.example) {
            p.innerHTML += " (e.g. " + def.example + ")";
        }

        definitionsDiv.appendChild(p);
    });
}

function addSynonyms(synonyms) {
    if (!synonyms || synonyms.length === 0) {
        return;
    }

    synonyms.forEach(function (syn) {
        var span = document.createElement("span");
        span.innerHTML = syn + " ";
        synonymsDiv.appendChild(span);
    });
}

function showError(message) {
    errorDiv.innerHTML = message;
    errorDiv.style.display = "block";
}

function clearUI() {
    resultsDiv.style.display = "none";
    errorDiv.style.display = "none";
    definitionsDiv.innerHTML = "";
    synonymsDiv.innerHTML = "";
    audioEl.style.display = "none";
}