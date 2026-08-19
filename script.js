var generateBtn = document.getElementById("generate-btn");
var submitBtn = document.getElementById("submit-btn");
var guessInput = document.getElementById("guess-input");
var messageBox = document.getElementById("message-box");
var statusTitle = document.getElementById("status-title");
var guessContainer = document.getElementById("guess-container");
var optionsBox = document.getElementById("options-box");

let targetNumber = 0;
let attempts = 0;

generateBtn.addEventListener("click", function() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;

    messageBox.textContent = "Number generated. You have 10 attempts.";
    statusTitle.textContent = "Game Active";
    guessInput.value = "";
    optionsBox.innerHTML = "";
    guessContainer.style.display = "flex";
});

submitBtn.addEventListener("click", function() {
    if (targetNumber == 0) {
        messageBox.textContent = "Please click Generate first.";
        return;
    }

    let guess = Number(guessInput.value);

    if (guess < 1 || guess > 100) {
        messageBox.textContent = "Please enter a number between 1 and 100.";
        return;
    }

    attempts = attempts + 1;

    if (guess == targetNumber) {
        messageBox.textContent = "You won! You found the number in " + attempts + " attempts.";
        guessContainer.style.display = "none";
        optionsBox.innerHTML = "";
        statusTitle.textContent = "Game Over";
        targetNumber = 0;
        return;
    }

    if (attempts == 10) {
        messageBox.textContent = "Game Over! The number was " + targetNumber + ".";
        guessContainer.style.display = "none";
        optionsBox.innerHTML = "";
        statusTitle.textContent = "Game Over";
        targetNumber = 0;
        return;
    }

    if (attempts < 6) {
        if (guess < targetNumber) {
            messageBox.textContent = "Attempt " + attempts + "/10. Try a greater number.";
        } else {
            messageBox.textContent = "Attempt " + attempts + "/10. Try a lesser number.";
        }
    } else {
        messageBox.textContent = "Attempt " + attempts + "/10. Choose one of the options.";
        optionsBox.innerHTML = "";

        let option1 = targetNumber - (attempts - 4);
        let option2 = targetNumber + (attempts - 5);
        let option3 = targetNumber;
        let option4 = targetNumber + (attempts - 3);

        if (attempts == 6) {
            option1 = targetNumber - 2;
            option2 = targetNumber + 1;
            option3 = targetNumber;
            option4 = targetNumber + 3;
        }

        if (attempts == 7) {
            option1 = targetNumber + 2;
            option2 = targetNumber - 3;
            option3 = targetNumber + 4;
            option4 = targetNumber;
        }

        if (attempts == 8) {
            option1 = targetNumber - 5;
            option2 = targetNumber;
            option3 = targetNumber + 5;
            option4 = targetNumber - 2;
        }

        if (attempts == 9) {
            option1 = targetNumber + 1;
            option2 = targetNumber - 4;
            option3 = targetNumber;
            option4 = targetNumber + 6;
        }

        createButton(option1);
        createButton(option2);
        createButton(option3);
        createButton(option4);
    }

    guessInput.value = "";
});

function createButton(number) {
    let button = document.createElement("button");

    button.textContent = number;
    button.className = "btn opt-btn";

    button.addEventListener("click", function() {
        guessInput.value = number;
        submitBtn.click();
    });

    optionsBox.appendChild(button);
}
