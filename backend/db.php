<?php
/**
 * Virtual Emergency Campus Helpline Directory
 * File: backend/db.php
 * Description: Database connection setup using MySQLi with safe error handling
 */

// Database configuration settings
$db_host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "campus_helpline";
$db_port = 3306;

// Suppress default mysqli exception output for safe error handling
mysqli_report(MYSQLI_REPORT_OFF);

// Attempt database connection
$conn = @new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);

// Check if connection succeeded
if ($conn->connect_error) {
    // Return clean JSON error without exposing sensitive system credentials
    http_response_code(500);
    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode([
        "success" => false,
        "error" => "Database connection failed. Please check MySQL service in XAMPP and verify the campus_helpline database exists."
    ]);
    exit();
}

// Set character encoding to UTF-8
$conn->set_charset("utf8mb4");
?>
