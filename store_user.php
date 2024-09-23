<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];

    if (!empty($name) && !empty($email)) {
        $data = "Name: $name, Email: $email\n";
        $file = 'waitlist.txt';

        // Try writing the data to the file
        if (file_put_contents($file, $data, FILE_APPEND | LOCK_EX)) {
            echo json_encode(['message' => 'Data saved successfully!']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to write data to file']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Missing name or email']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
