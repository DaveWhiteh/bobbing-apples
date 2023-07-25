// ------------------------------------------------------------------ Events ----------------------------------------------------------------- //

// On click event for start button to change display to options layout
$("#options-1-start").on("click", startButton);




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