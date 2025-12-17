var form = document.getElementById("searchForm");
var wordInput = document.getElementById("wordInput");
var resultsDiv = document.getElementById("results");
var wordTitle = document.getElementById("wordTitle");
var phonetic = document.getElementById("phonetic");
var audioEl = document.getElementById("audio");
var definitionsDiv = document.getElementById("definitions");
var synonymsDiv = document.getElementById("synonyms");
var errorDiv = document.getElementById("error");

form.onsubmit = function(e) {
    e.preventDefault();
    var word = wordInput.value.trim();
    if (word === "") {
        return;
    }
    fetchWord(word);
};

function fetchWord(word) {
    resultsDiv.style.display = "none";
    errorDiv.style.display = "none";
    definitionsDiv.innerHTML = "";
    synonymsDiv.innerHTML = "";
    audioEl.style.display = "none";

    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
    .then(function(response) {
        if (!response.ok) {
            throw new Error("Word not found");
        }
        return response.json();
    })
    .then(function(data) {
        displayWord(data[0]);
    })
    .catch(function(err) {
        errorDiv.innerHTML = "Word not found or error fetching data.";
        errorDiv.style.display = "block";
    });
}

function displayWord(data) {
    wordTitle.innerHTML = data.word;
    phonetic.innerHTML = data.phonetic || "";

    if (data.phonetics && data.phonetics[0] && data.phonetics[0].audio) {
        audioEl.src = data.phonetics[0].audio;
        audioEl.style.display = "block";
    }

    for (var i = 0; i < data.meanings.length; i++) {
        var meaning = data.meanings[i];

        var pos = document.createElement("h3");
        pos.innerHTML = meaning.partOfSpeech;
        definitionsDiv.appendChild(pos);

        for (var j = 0; j < meaning.definitions.length; j++) {
            var def = meaning.definitions[j];
            var p = document.createElement("p");
            p.innerHTML = "- " + def.definition;
            if (def.example) {
                p.innerHTML += " (e.g., " + def.example + ")";
            }
            definitionsDiv.appendChild(p);
        }

        if (meaning.synonyms && meaning.synonyms.length > 0) {
            for (var k = 0; k < meaning.synonyms.length; k++) {
                var span = document.createElement("span");
                span.innerHTML = meaning.synonyms[k];
                synonymsDiv.appendChild(span);
            }
        }
    }

    resultsDiv.style.display = "block";
}
