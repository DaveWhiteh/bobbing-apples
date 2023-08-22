// ----------------------------------------------------------------- Functions -------------------------------------------------------------- //


// Public Key for using emailJS
emailjs.init("iRcktNPzIIx7QSCwX");

/**
 * Function to send email via emailJS
 * through the feedback modal
 */
function sendMail(contactForm) {
    emailjs.send("gmail", "bobbing-apples", {
        from_name: contactForm.name.value,
        from_email: contactForm.emailaddress.value,
        message: contactForm.message.value
    })
        .then(
            function(response) {
                // For testing purposes
                //console.log("SUCCESS", response.status, response.text);
                // Hide modal-contact
                $("#modal-contact").modal('hide');
                // Show modal-contact-success upon email success
                $("#modal-contact-success").modal('show');
            },
            function(error) {
                // For testing purposes
                //console.log("FAILED", error);
                // Hide modal-contact
                $("#modal-contact").modal('hide');
                // Show modal-contact-fail upon email fail
                $("modal-contact-fail").modal('show');
            }
        );
    return false;
}