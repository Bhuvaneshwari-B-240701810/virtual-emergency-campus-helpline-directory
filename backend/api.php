<?php
/**
 * Virtual Emergency Campus Helpline Directory
 * File: backend/api.php
 * Description: Unified RESTful API router handling all CRUD and feedback operations
 */

// Enable CORS for local development with React
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include database connection
require_once __DIR__ . '/db.php';

// Helper function to send JSON response
function sendResponse($statusCode, $data) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}

// Parse request payload (supports JSON body as well as form-data)
$rawInput = file_get_contents('php://input');
$jsonBody = json_decode($rawInput, true) ?? [];
$requestData = array_merge($_REQUEST, $jsonBody);

// Retrieve requested action parameter
$action = isset($_GET['action']) ? trim($_GET['action']) : (isset($requestData['action']) ? trim($requestData['action']) : '');

if (empty($action)) {
    sendResponse(400, [
        "success" => false,
        "error" => "Missing required 'action' parameter. Example: api.php?action=get_contacts"
    ]);
}

// Router based on action
switch ($action) {

    // ------------------------------------------------------------------------
    // Action: get_contacts
    // Method: GET
    // Returns: List of all campus emergency contacts
    // ------------------------------------------------------------------------
    case 'get_contacts':
        $query = "SELECT id, name, category, phone, email, location, available_hours, description FROM contacts ORDER BY id ASC";
        $result = $conn->query($query);

        if (!$result) {
            sendResponse(500, [
                "success" => false,
                "error" => "Failed to retrieve contacts from database."
            ]);
        }

        $contacts = [];
        while ($row = $result->fetch_assoc()) {
            $contacts[] = [
                "id" => (int)$row['id'],
                "name" => $row['name'],
                "category" => $row['category'],
                "phone" => $row['phone'],
                "email" => $row['email'],
                "location" => $row['location'],
                "available_hours" => $row['available_hours'],
                "description" => $row['description']
            ];
        }

        sendResponse(200, [
            "success" => true,
            "count" => count($contacts),
            "data" => $contacts
        ]);
        break;

    // ------------------------------------------------------------------------
    // Action: add_contact
    // Method: POST
    // Adds a new emergency contact
    // ------------------------------------------------------------------------
    case 'add_contact':
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            sendResponse(405, ["success" => false, "error" => "Method Not Allowed. Use POST for adding contacts."]);
        }

        $name = trim($requestData['name'] ?? '');
        $category = trim($requestData['category'] ?? '');
        $phone = trim($requestData['phone'] ?? '');
        $email = trim($requestData['email'] ?? '');
        $location = trim($requestData['location'] ?? '');
        $available_hours = trim($requestData['available_hours'] ?? '');
        $description = trim($requestData['description'] ?? '');

        // Validation
        if (empty($name) || empty($category) || empty($phone)) {
            sendResponse(422, [
                "success" => false,
                "error" => "Name, category, and phone number are required fields."
            ]);
        }

        $stmt = $conn->prepare("INSERT INTO contacts (name, category, phone, email, location, available_hours, description) VALUES (?, ?, ?, ?, ?, ?, ?)");
        if (!$stmt) {
            sendResponse(500, ["success" => false, "error" => "Failed to prepare insert statement."]);
        }

        $stmt->bind_param("sssssss", $name, $category, $phone, $email, $location, $available_hours, $description);

        if ($stmt->execute()) {
            $newId = $stmt->insert_id;
            $stmt->close();
            sendResponse(201, [
                "success" => true,
                "message" => "Contact added successfully.",
                "id" => $newId
            ]);
        } else {
            $stmt->close();
            sendResponse(500, ["success" => false, "error" => "Database error while adding contact."]);
        }
        break;

    // ------------------------------------------------------------------------
    // Action: update_contact
    // Method: POST / PUT
    // Updates an existing contact by ID
    // ------------------------------------------------------------------------
    case 'update_contact':
        if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'PUT') {
            sendResponse(405, ["success" => false, "error" => "Method Not Allowed. Use POST or PUT to update contacts."]);
        }

        $id = isset($requestData['id']) ? (int)$requestData['id'] : 0;
        $name = trim($requestData['name'] ?? '');
        $category = trim($requestData['category'] ?? '');
        $phone = trim($requestData['phone'] ?? '');
        $email = trim($requestData['email'] ?? '');
        $location = trim($requestData['location'] ?? '');
        $available_hours = trim($requestData['available_hours'] ?? '');
        $description = trim($requestData['description'] ?? '');

        if ($id <= 0 || empty($name) || empty($category) || empty($phone)) {
            sendResponse(422, [
                "success" => false,
                "error" => "Valid ID, name, category, and phone number are required."
            ]);
        }

        $stmt = $conn->prepare("UPDATE contacts SET name = ?, category = ?, phone = ?, email = ?, location = ?, available_hours = ?, description = ? WHERE id = ?");
        if (!$stmt) {
            sendResponse(500, ["success" => false, "error" => "Failed to prepare update statement."]);
        }

        $stmt->bind_param("sssssssi", $name, $category, $phone, $email, $location, $available_hours, $description, $id);

        if ($stmt->execute()) {
            $stmt->close();
            sendResponse(200, [
                "success" => true,
                "message" => "Contact updated successfully."
            ]);
        } else {
            $stmt->close();
            sendResponse(500, ["success" => false, "error" => "Database error while updating contact."]);
        }
        break;

    // ------------------------------------------------------------------------
    // Action: delete_contact
    // Method: POST / DELETE
    // Deletes an emergency contact by ID
    // ------------------------------------------------------------------------
    case 'delete_contact':
        if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'DELETE') {
            sendResponse(405, ["success" => false, "error" => "Method Not Allowed. Use POST or DELETE to delete contacts."]);
        }

        $id = isset($requestData['id']) ? (int)$requestData['id'] : 0;

        if ($id <= 0) {
            sendResponse(422, [
                "success" => false,
                "error" => "Valid contact ID is required for deletion."
            ]);
        }

        $stmt = $conn->prepare("DELETE FROM contacts WHERE id = ?");
        if (!$stmt) {
            sendResponse(500, ["success" => false, "error" => "Failed to prepare delete statement."]);
        }

        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            $affected = $stmt->affected_rows;
            $stmt->close();
            if ($affected > 0) {
                sendResponse(200, [
                    "success" => true,
                    "message" => "Contact deleted successfully."
                ]);
            } else {
                sendResponse(404, [
                    "success" => false,
                    "error" => "Contact not found with ID " . $id
                ]);
            }
        } else {
            $stmt->close();
            sendResponse(500, ["success" => false, "error" => "Database error while deleting contact."]);
        }
        break;

    // ------------------------------------------------------------------------
    // Action: submit_feedback
    // Method: POST
    // Submits user feedback or reported issue
    // ------------------------------------------------------------------------
    case 'submit_feedback':
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            sendResponse(405, ["success" => false, "error" => "Method Not Allowed. Use POST to submit feedback."]);
        }

        $name = trim($requestData['name'] ?? '');
        $email = trim($requestData['email'] ?? '');
        $category = trim($requestData['category'] ?? '');
        $message = trim($requestData['message'] ?? '');

        // Validation
        if (empty($name) || empty($email) || empty($category) || empty($message)) {
            sendResponse(422, [
                "success" => false,
                "error" => "All fields (name, email, category, and message) are required."
            ]);
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            sendResponse(422, [
                "success" => false,
                "error" => "Please provide a valid email address."
            ]);
        }

        $stmt = $conn->prepare("INSERT INTO feedback (name, email, category, message) VALUES (?, ?, ?, ?)");
        if (!$stmt) {
            sendResponse(500, ["success" => false, "error" => "Failed to prepare feedback statement."]);
        }

        $stmt->bind_param("ssss", $name, $email, $category, $message);

        if ($stmt->execute()) {
            $newFeedbackId = $stmt->insert_id;
            $stmt->close();
            sendResponse(201, [
                "success" => true,
                "message" => "Feedback submitted successfully. Thank you for helping keep our campus safe!",
                "id" => $newFeedbackId
            ]);
        } else {
            $stmt->close();
            sendResponse(500, ["success" => false, "error" => "Database error while submitting feedback."]);
        }
        break;

    // ------------------------------------------------------------------------
    // Action: get_feedback
    // Method: GET
    // Retrieves submitted feedback for admin viewing
    // ------------------------------------------------------------------------
    case 'get_feedback':
        $query = "SELECT id, name, email, category, message, created_at FROM feedback ORDER BY id DESC";
        $result = $conn->query($query);

        if (!$result) {
            sendResponse(500, ["success" => false, "error" => "Failed to retrieve feedback."]);
        }

        $feedbacks = [];
        while ($row = $result->fetch_assoc()) {
            $feedbacks[] = [
                "id" => (int)$row['id'],
                "name" => $row['name'],
                "email" => $row['email'],
                "category" => $row['category'],
                "message" => $row['message'],
                "created_at" => $row['created_at']
            ];
        }

        sendResponse(200, [
            "success" => true,
            "count" => count($feedbacks),
            "data" => $feedbacks
        ]);
        break;

    default:
        sendResponse(400, [
            "success" => false,
            "error" => "Invalid action requested: " . htmlspecialchars($action)
        ]);
        break;
}

$conn->close();
?>
