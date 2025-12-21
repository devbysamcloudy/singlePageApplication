const form = document.getElementById("searchForm");
const wordInput = document.getElementById("wordInput");
const resultsDiv = document.getElementById("results");
const wordTitle = document.getElementById("wordTitle");
const phonetic = document.getElementById("phonetic");
const audioEl = document.getElementById("audio");
const definitionsDiv = document.getElementById("definitions");
const synonymsDiv = document.getElementById("synonyms");
const errorDiv = document.getElementById("error");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    var word = wordInput.value.trim();

    if (word === "") {
        alert("Please enter a word");
        return;
    }

    fetchWord(word);
});

function fetchWord(word) {
    resetUI();

    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
        .then(function (response) {
            if (!response.ok) throw new Error("Word not found");
            return response.json();
        })
        .then(function (data) {
            displayWord(data[0]);
        })
        .catch(function (err) {
            showError(err.message);
        });
}

function displayWord(data) {
    wordTitle.innerHTML = data.word;
    phonetic.innerHTML = data.phonetic || "";

    if (data.phonetics && data.phonetics[0]?.audio) {
        audioEl.src = data.phonetics[0].audio;
        audioEl.style.display = "block";
    }

    definitionsDiv.innerHTML = "";
    synonymsDiv.innerHTML = "";

    for (var i = 0; i < data.meanings.length; i++) {
        var m = data.meanings[i];

        var h3 = document.createElement("h3");
        h3.innerHTML = m.partOfSpeech;
        definitionsDiv.appendChild(h3);

        for (var j = 0; j < m.definitions.length; j++) {
            var def = m.definitions[j];
            var p = document.createElement("p");
            p.innerHTML = "- " + def.definition + (def.example ? " (e.g. " + def.example + ")" : "");
            definitionsDiv.appendChild(p);
        }

        if (m.synonyms && m.synonyms.length > 0) {
            for (var k = 0; k < m.synonyms.length; k++) {
                var span = document.createElement("span");
                span.innerHTML = m.synonyms[k] + " ";
                synonymsDiv.appendChild(span);
            }
        }
    }

    resultsDiv.style.display = "block";
}

function showError(message) {
    errorDiv.innerHTML = message;
    errorDiv.style.display = "block";
}

function resetUI() {
    resultsDiv.style.display = "none";
    errorDiv.style.display = "none";
    definitionsDiv.innerHTML = "";
    synonymsDiv.innerHTML = "";
    audioEl.style.display = "none";
}
