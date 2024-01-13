<?php
// Telegram bot token
$telegram_bot_id = "6844695637:AAFslZSczg6bF4qC7PpfQOF3OmSZPDOgNwU";
// Telegram chat ID
$chat_id = 5457588902;

// Function to prepare message data
function prepareMessage($name, $email, $message) {
    return "Name: $name\nEmail: $email\nMessage: $message";
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $u_name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Prepare the message
    $telegram_message = prepareMessage($u_name, $email, $message);

    // Send message to Telegram
    $telegram_url = "https://api.telegram.org/bot$telegram_bot_id/sendMessage";
    $telegram_data = [
        'chat_id' => $chat_id,
        'text' => $telegram_message
    ];

    $options = [
        'http' => [
            'header' => "Content-Type: application/json\r\n",
            'method' => 'POST',
            'content' => json_encode($telegram_data)
        ]
    ];

    $context = stream_context_create($options);
    $result = file_get_contents($telegram_url, false, $context);

    // Clear form fields after submission
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
