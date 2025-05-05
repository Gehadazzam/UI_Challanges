const textInput = document.getElementById("textInput");
const countButton = document.getElementById("countButton");
const resultDiv = document.getElementById("vowelCount");

const vowels = ["a", "e", "i", "o", "u"];

countButton.addEventListener("click", () => {
    const text = textInput.value.toLowerCase();
    let count = 0;
    
    for (let i = 0; i < text.length; i++) {
        if (vowels.includes(text[i])) {
        count++;
        }
    }
    
    resultDiv.textContent = `Number of vowels: ${count}`;
    resultDiv.style.display = "block";
    textInput.value = ""; 
});
