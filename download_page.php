<?php
session_start();

// Check if the user is allowed to download
if (isset($_SESSION['download_allowed']) && $_SESSION['download_allowed'] === true) {
    // Path to your version.json file
    $json_url = 'https://pokerhelper.ddns.com/version.json';  // Change this to the correct path to version.json

    // Fetch and decode the JSON data
    $json_data = file_get_contents($json_url);
    if ($json_data !== false) {
        $version_data = json_decode($json_data, true);
        
        // Check if apk_url is present in the JSON
        if (isset($version_data['apk_url'])) {
            $apk_url = $version_data['apk_url'];
            
            // Redirect to the APK URL
            header("Location: $apk_url");
            exit;
        } else {
            echo "APK URL not found in version.json.";
        }
    } else {
        echo "Error fetching version.json.";
    }
} else {
    echo "Unauthorized access.";
}
?>
