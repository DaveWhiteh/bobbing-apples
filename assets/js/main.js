// ----------------------------------------------------------------- Variables --------------------------------------------------------------- //


let arrayWords = "";
let randomWord = "";
let wordCount = 0;

const soundReal = new Audio("assets/sounds/real.mp3");
const soundFake = new Audio("assets/sounds/fake.mp3");


// ------------------------------------------------------------------ Events ----------------------------------------------------------------- //


// On click event for start button to change display to options layout
$("#options-1-start").on("click", startButton);

// On click event for the four option buttons to initiate function
$(".btn-options").click(function() {
    // Get button ID and store this in arrayWords variable
    arrayWords = this.id;
    // For testing purposes
    // console.log(arrayWords);
    // Call function to load random word
    loadWords(arrayWords);
    // Call function to load gameplay display
    optionButton();
    // Call function to play the game
    playGame();
});

// On click event for home button to reset game and change display
$("#btn-instructions-home").click(function() {
    // Return to the options layout display
    returnToMenu();
    // Reset the game variables
    resetGame();
});

// On click event for the four option buttons to initiate function
$("#options-3-again").click(function() {
    // Return to the start layout display
    returnToStart();
    // Reset the game variables
    resetGame();
});


// ----------------------------------------------------------------- Functions -------------------------------------------------------------- //


/**
 * Function to play the game
 */
function playGame() {
    $('.draggable').draggable({
        snapMode: 'inner',
        revert: "invalid",
        cursor: "pointer"
    });
    $(".droppable-real, .droppable-fake").droppable({
        drop: function(event, ui) {
            // Hides the draggable element
            ui.draggable.hide();

            // Get the id of the droppable element
            let dragDropElement = this.id;
            // For testing purposes
            // console.log(dragDropElement);

            // Check if random word is correct or not
            let answer = checkAnswer(dragDropElement);
            // For testing purposes
            // console.log(answer);

            // Play the relevant sound depending on whether the answer is correct or not
            playSound(answer);

            // Update the score shown in game
            updateScore(answer);

            // Increment how many words have been answered
            wordCount++;
            // For testing purposes
            // console.log(wordCount);

            // Check how many words have been answered
            checkWordCount();

            // Load new random word
            loadWords(arrayWords);

            // Shows the draggable element
            showApple();
        }
    });
};

/**
 * Function to change the game display 
 * from the start to options layout
 */
function startButton() {
    $("#game-header").hide();
    $("#instructions-1").hide();
    $("#options-1").hide();
    $("#instructions-2").removeClass("d-none");
    $("#instructions-2").show();
    $("#options-2").removeClass("d-none");
    $("#options-2").show();
};

/**
 * Function to change the game display
 * from the options to gameplay layout
 */
function optionButton() {
    $("#instructions-2").hide();
    $("#options-2").hide();
    $("#gameplay-1").hide();
    $("#instructions-3").removeClass("d-none");
    $("#instructions-3").show();
    $("#gameplay-2").removeClass("d-none");
    $("#gameplay-2").show();
};

/**
 * Function to change the game display
 * from the gameplay back to the options layout
 */
function returnToMenu() {
    $("#instructions-3").hide();
    $("#gameplay-2").hide();
    $("#instructions-2").show();
    $("#options-2").show();
    $("#gameplay-1").show();
};

/**
 * Function to change the game display
 * from the gameplay to the final score layout
 */
function finalScoreDisplay() {
    $("#gameplay-2").hide();    
    $("#instructions-3").hide();
    $("#instructions-4").removeClass("d-none");
    $("#instructions-4").show();
    $("#options-3").removeClass("d-none");
    $("#options-3").show();
    $("#gameplay-1").show();   
};

/**
 * Function to change the game display
 * from the final score to the start layout
 */
function returnToStart() {
    $("#instructions-4").hide();
    $("#options-3").hide();
    $("#game-header").show();
    $("#instructions-1").show();
    $("#options-1").show();
};

/**
 * Function to load a random word
 * for the chosen group of words
 */
function loadWords(arrayWords) {
    // Get random word from jWords array
    if (arrayWords === "jWords") {
        randomWord = jWords[Math.floor(Math.random() * jWords.length)];
    // Get random word from vWords array
    } else if (arrayWords === "vWords") {
        randomWord = vWords[Math.floor(Math.random() * vWords.length)];
    // Get random word from wWords array
    } else if (arrayWords === "wWords") {
        randomWord = wWords[Math.floor(Math.random() * wWords.length)];
    // Get random word from xWords array
    } else if (arrayWords === "xWords") {
        randomWord = xWords[Math.floor(Math.random() * xWords.length)];
    }
    // For testing purposes
    // console.log(randomWord);

    // Add random word to the caption div
    $(".caption").text(randomWord);
};

/**
 * Function to check if the
 * random word is real or fake
 */
function checkAnswer(dragDropElement) {
    let checkWord;
    // Check if the word is in the real words array
    if (dragDropElement === "real") {
        if (jQuery.inArray(randomWord, realWords) > -1) {
            checkWord = true;
        } else {
            checkWord = false;
        }
    // Check if the word is in the fake words array
    } else if (dragDropElement === "fake") {
        if (jQuery.inArray(randomWord, fakeWords) > -1) {
            checkWord = true;
        } else {
            checkWord = false;
        }
    }
    // Return true or false
    return checkWord;
};

/**
 * Function to play sound
 * depending on the answer
 */
function playSound(answer) {
    // Check if the answer is correct then play the real sound
    if (answer === true) {
        soundReal.play();
    // Check if the answer is wrong then play the fake sound
    } else if (answer === false) {
        soundFake.play();
    }
};

/**
 * Function to update the score
 * if the answer is correct
 */
function updateScore(answer) {
    let score = $("#score-number").text();
    // Only if the answer is correct will the gameplay score be updated
    if (answer === true) {
        score++;
        $("#score-number").text(score);
    }
};

/**
 * Function to check how
 * many words have been used
 */
function checkWordCount() {
    // Check if the word count is equal 10
    if (wordCount == 10) {
        finishGame();
    } else {
        playGame();
    }
};

/**
 * Function to show the apple
 * and new random word
 */
function showApple() {
    // Move the apple back to its original position
    $("#apple").css({
        top: "0px",
        left: "0px"
    });
    // Show the apple but with a fade in delay
    $("#apple").delay(2000).fadeIn();
};

/**
 * Function to get and show final score
 */
function finishGame() {
    // Get the final score from the score on the gameplay screen
    let finalScore = $("#score-number").text();
    // Update the final score
    $("#final-score").text(finalScore);
    // Change the layout from gameplay to play again
    finalScoreDisplay(); 
};


function resetGame() {
    // Reset the arrayWords variable
    arrayWords = "";
    // For testing purposes
    // console.log(arrayWords);
    // Reset the randomWord variable
    randomWord = "";
    // For testing purposes
    // console.log(randomWord);
    // Reset the wordCount variable
    wordCount = 0;
    // For testing purposes
    // console.log(wordCount);
    // Set the score to zero on the actual gameplay screen
    $("#score-number").text("0");
    // Set the final score to zero on the play again screen
    $("#final-score").text("0");
};