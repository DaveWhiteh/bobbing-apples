// ----------------------------------------------------------------- Variables --------------------------------------------------------------- //


let arrayWords = "";
let randomWord = "";

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
});

// On click event for home button to change display back to options layout
$("#btn-instructions-home").on("click", returnToMenu);


// ----------------------------------------------------------------- Functions -------------------------------------------------------------- //


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
}

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
}

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
}

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
}

/**
 * Function to drag the apple
 * to one of the chosen containers
 */
function dragApple() {
    $('.draggable').draggable({
        containment: 'document',
        snap: '#rubbish-bin,#basket',
        snapMode: 'inner',
        revert: true
    });
    $(".droppable-real").droppable({
        drop: function() {
            console.log("real")
        }
    });
    $(".droppable-fake").droppable({
        drop: function() {
            console.log("fake")
        }
    });
};

/**
 * Function to check if the
 * random word is real or fake
 */
function checkRealFake(container) {
    if (container === "real") {
        if ($.inArray(randomWord, realWords) > -1) {
            return true;
        } else {
            return false;
        }
    } else if (container === "fake") {
        if ($.inArray(randomWord, fakeWords) > -1) {
            return true;
        } else {
            return false;
        }
    }
};

/**
 * Function to update the score
 * if the answer is correct
 */
function updateScore() {
    parseInt($(".score-number").val()) + 1;
}