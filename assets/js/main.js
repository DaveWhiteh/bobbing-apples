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
    console.log(arrayWords);
    // Call function to load random word
    loadWords(arrayWords);
    // Call function to load gameplay display
    optionButton();
    playGame();
});

// On click event for home button to change display back to options layout
$("#btn-instructions-home").on("click", returnToMenu);


// ----------------------------------------------------------------- Functions -------------------------------------------------------------- //


/**
 * Function to play the game
 */
function playGame() {
    $('.draggable').draggable({
        snap: '#rubbish-bin,#basket',
        snapMode: 'inner',
        revert: "invalid"
    });
    $(".droppable-real, .droppable-fake").droppable({
        drop: function(event, ui) {
            // Hides the draggable element
            ui.draggable.hide();

            // Get the id of the droppable element
            let dragDropElement = this.id;
            console.log(dragDropElement);

            // Check if random word is correct or not
            let answer = checkAnswer(dragDropElement);
            console.log(answer);

            // Play the relevant sound depending on whether the answer is correct or not
            playSound(answer);

            // Update the score shown in game
            updateScore(answer);

            // Increment how many words have been answered
            wordCount++;
            console.log(wordCount);

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
 * Function to load a random word
 * for the chosen group of words
 */
function loadWords(arrayWords) {
    if (arrayWords === "jWords") {
        randomWord = jWords[Math.floor(Math.random() * jWords.length)];
    } else if (arrayWords === "vWords") {
        randomWord = vWords[Math.floor(Math.random() * vWords.length)];
    } else if (arrayWords === "wWords") {
        randomWord = wWords[Math.floor(Math.random() * wWords.length)];
    } else if (arrayWords === "xWords") {
        randomWord = xWords[Math.floor(Math.random() * xWords.length)];
    }
    // For testing purposes
    console.log(randomWord);

    // Add random word to the caption div
    $(".caption").text(randomWord);
};

/**
 * Function to check if the
 * random word is real or fake
 */
function checkAnswer(dragDropElement) {
    let checkWord;
    if (dragDropElement === "real") {
        if (jQuery.inArray(randomWord, realWords) > -1) {
            checkWord = true;
        } else {
            checkWord = false;
        }
    } else if (dragDropElement === "fake") {
        if (jQuery.inArray(randomWord, fakeWords) > -1) {
            checkWord = true;
        } else {
            checkWord = false;
        }
    }

    return checkWord;
};

/**
 * Function to play sound
 * depending on the answer
 */
function playSound(answer) {
    if (answer === true) {
        soundReal.play();
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
    if (wordCount == 10) {
        finishGame();
    } else {
        playGame();
    }
};

function showApple() {
    $("#apple").css({
        top: "0px",
        left: "0px"
    });
    $("#apple").delay(750).fadeIn();
};