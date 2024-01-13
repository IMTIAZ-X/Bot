var telegram_bot_id = "6844695637:AAFslZSczg6bF4qC7PpfQOF3OmSZPDOgNwU";
var chat_id = 5457588902;
var u_name, email, message;

var ready = function () {
    u_name = document.getElementById("name").value;
    email = document.getElementById("email").value;
    message = document.getElementById("message").value;

    // Make an AJAX request to fetch note.php content
    $.ajax({
        url: "note.php",
        type: "GET",
        async: false, // Synchronous request to ensure note is fetched before sending the message
        success: function (noteContent) {
            message += "\nName: " + u_name + "\nEmail: " + email + "\nMessage: " + message + "\nBy: " + noteContent;
        }
    });
};

var sender = function () {
    ready();

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "data": JSON.stringify({
            "chat_id": chat_id,
            "text": message
        })
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });

    // Clear form fields after submission
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";

    return false;
};
