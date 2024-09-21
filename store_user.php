<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';

    // Sanitize inputs
    $name = filter_var($name, FILTER_SANITIZE_STRING);
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);

    if (!empty($name) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Write to file (you can replace this with DB logic)
        $file = 'waitlist.txt';
        $data = "Name: $name, Email: $email\n";

        // Append to file
        file_put_contents($file, $data, FILE_APPEND);
        echo "Success";
    } else {
        echo "Invalid input.";
    }
} else {
    echo "Invalid request method.";
}
?>
