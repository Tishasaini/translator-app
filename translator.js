const translateApiKey = "AIzaSyAf0ws-Zl97acG5zk_WqF2njYJ_J6ssTMQ";//Replace with your translate API

// List of available languages (can be expanded as needed)
const languageList = [
          { "code": "en", "name": "English", "symbol": "🇬🇧" },
          { "code": "es", "name": "Spanish", "symbol": "🇪🇸" },
          { "code": "fr", "name": "French", "symbol": "🇫🇷" },
          { "code": "de", "name": "German", "symbol": "🇩🇪" },
          { "code": "hi", "name": "Hindi", "symbol": "🇮🇳" },
          { "code": "zh", "name": "Chinese", "symbol": "🇨🇳" },
          { "code": "ja", "name": "Japanese", "symbol": "🇯🇵" },
          { "code": "ar", "name": "Arabic", "symbol": "🇦🇪" },
          { "code": "ru", "name": "Russian", "symbol": "🇷🇺" },
          { "code": "it", "name": "Italian", "symbol": "🇮🇹" },
          { "code": "pt", "name": "Portuguese", "symbol": "🇵🇹" },
          { "code": "ko", "name": "Korean", "symbol": "🇰🇷" },
          { "code": "tr", "name": "Turkish", "symbol": "🇹🇷" },
          { "code": "bn", "name": "Bengali", "symbol": "🇧🇩" },
          { "code": "pa", "name": "Punjabi", "symbol": "🇮🇳" },
          { "code": "ta", "name": "Tamil", "symbol": "🇮🇳" },
          { "code": "ur", "name": "Urdu", "symbol": "🇵🇰" },
          { "code": "vi", "name": "Vietnamese", "symbol": "🇻🇳" },
          { "code": "th", "name": "Thai", "symbol": "🇹🇭" },
          { "code": "id", "name": "Indonesian", "symbol": "🇮🇩" },
          { "code": "fa", "name": "Persian", "symbol": "🇮🇷" },
          { "code": "pl", "name": "Polish", "symbol": "🇵🇱" },
          { "code": "uk", "name": "Ukrainian", "symbol": "🇺🇦" },
          { "code": "el", "name": "Greek", "symbol": "🇬🇷" },
          { "code": "he", "name": "Hebrew", "symbol": "🇮🇱" },
          { "code": "sv", "name": "Swedish", "symbol": "🇸🇪" },
          { "code": "no", "name": "Norwegian", "symbol": "🇳🇴" },
          { "code": "fi", "name": "Finnish", "symbol": "🇫🇮" },
          { "code": "hu", "name": "Hungarian", "symbol": "🇭🇺" },
          { "code": "cs", "name": "Czech", "symbol": "🇨🇿" },
          { "code": "ro", "name": "Romanian", "symbol": "🇷🇴" },
          { "code": "bg", "name": "Bulgarian", "symbol": "🇧🇬" },
          { "code": "hr", "name": "Croatian", "symbol": "🇭🇷" },
          { "code": "sr", "name": "Serbian", "symbol": "🇷🇸" },
          { "code": "sk", "name": "Slovak", "symbol": "🇸🇰" },
          { "code": "ms", "name": "Malay", "symbol": "🇲🇾" },
          { "code": "sw", "name": "Swahili", "symbol": "🇰🇪" },
          { "code": "am", "name": "Amharic", "symbol": "🇪🇹" },
          { "code": "my", "name": "Burmese", "symbol": "🇲🇲" },
          { "code": "tl", "name": "Tagalog", "symbol": "🇵🇭" },
          { "code": "mn", "name": "Mongolian", "symbol": "🇲🇳" },
          { "code": "ne", "name": "Nepali", "symbol": "🇳🇵" },
          { "code": "si", "name": "Sinhala", "symbol": "🇱🇰" },
          { "code": "km", "name": "Khmer", "symbol": "🇰🇭" },
          { "code": "yo", "name": "Yoruba", "symbol": "🇳🇬" },
          { "code": "zu", "name": "Zulu", "symbol": "🇿🇦" }
    
          ];

// Populate the language selectors dynamically
function populateLanguageSelectors() {
    const sourceLangSelect = document.getElementById('sourceLanguage');
    const targetLangSelect = document.getElementById('targetLanguage');
    
    languageList.forEach(lang => {
        const sourceOption = document.createElement('option');
        sourceOption.value = lang.code;
        sourceOption.textContent = lang.name;
        sourceLangSelect.appendChild(sourceOption);

        const targetOption = document.createElement('option');
        targetOption.value = lang.code;
        targetOption.textContent = lang.name;
        targetLangSelect.appendChild(targetOption);
    });

    // Set default language selections (e.g., English to Spanish)
    sourceLangSelect.value = 'en';
    targetLangSelect.value = 'es';
}

// Function to translate text using Google Translate API
function translateText() {
    const text = document.getElementById("inputText").value.trim();
    const sourceLang = document.getElementById("sourceLanguage").value;
    const targetLang = document.getElementById("targetLanguage").value;

    if (text === "") {
        alert("Please enter text to translate!");
        return;
    }

    fetch(`https://translation.googleapis.com/language/translate/v2?key=${translateApiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            q: text,
            source: sourceLang,
            target: targetLang
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const translatedText = data.data.translations[0].translatedText;
        document.getElementById("translatedText").textContent = "Translated: " + translatedText;
    })
    .catch(error => {
        console.error("Error during translation:", error);
        alert("Translation failed! Please try again.");
    });
}

// Voice recognition using Web Speech API
let recognition;

function startVoiceRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Your browser doesn't support speech recognition.");
        return;
    }

    const sourceLang = document.getElementById("sourceLanguage").value;
    recognition = new webkitSpeechRecognition();
    recognition.lang = sourceLang; // Set the language for recognition
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
        console.log('Speech recognition started...');
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        alert("Speech recognition failed. Please try again.");
    };

    recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        document.getElementById("inputText").value = spokenText;
        translateText(); // Automatically translate the spoken text
    };

    recognition.onend = () => {
        console.log('Speech recognition ended...');
    };

    recognition.start();
}

// Initialize language selectors
populateLanguageSelectors();
