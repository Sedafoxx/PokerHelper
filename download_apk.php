<?php
session_start();

// Check if the user is allowed to download
if (isset($_SESSION['download_allowed']) && $_SESSION['download_allowed'] === true) {
    // Provide the APK download link
    $apk_url = 'https://edef7.pcloud.com/cBZ7nD5WMZBtQLboZZZ3iWqkkZ2ZZBU0ZkZrodk5ZbzZ97ZdHZhkZq0ZtpZA0ZDFZdJZzVZ7zZNHZFpZ9pZ3J3PZbH2mCLrt8oRwwshaqA1Maz9qWcAV/pokerhelper.apk';
    header("Location: $apk_url");
    exit;
} else {
    echo "Unauthorized access.";
}
?>
