<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';

    // Sanitize inputs
    $name = filter_var($name, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);

    if (!empty($name) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Write to file (or replace this with DB logic)
        $file = 'waitlist.txt';
        $data = "Name: $name, Email: $email\n";

        // Append to file and check if the write operation was successful
        if (file_put_contents($file, $data, FILE_APPEND | LOCK_EX) !== false) {
            echo "Success: Data saved.";
        } else {
            // Provide feedback if file write fails
            echo "Error: Could not write to file.";
        }
    } else {
        echo "Error: Invalid input.";
    }
} else {
    echo "Error: Invalid request method.";
}
?>
