<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['password'])) {
    if ($_POST['password'] === 'I am all in!') {
        // Set a session or token indicating the user has access to the download
        $_SESSION['download_allowed'] = true;
        header('Location: download_page.php'); // Redirect to the download page
        exit;
    } else {
        echo "Incorrect password";
    }
}
?>
