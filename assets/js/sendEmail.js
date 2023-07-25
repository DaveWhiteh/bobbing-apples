emailjs.init("iRcktNPzIIx7QSCwX");

function sendMail(contactForm) {
    emailjs.send("gmail", "bobbing-apples", {
        from_name: contactForm.name.value,
        from_email: contactForm.emailaddress.value,
        message: contactForm.message.value
    })
        .then(
            function(response) {
                console.log("SUCCESS", response.status, response.text);
                $("#modal-contact").modal('hide');
                $("#modal-contact-success").modal('show');
            },
            function(error) {
                console.log("FAILED", error);
                $("#modal-contact").modal('hide');
                $("modal-contact-fail").modal('show');
            }
        );
    return false;
}