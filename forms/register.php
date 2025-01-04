<?php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    if (!empty($username) && !empty($email) && !empty($password)) {
        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        try {
            $stmt = $pdo->prepare('INSERT INTO users (username, email, password) VALUES (:username, :email, :password)');
            $stmt->execute([
                'username' => $username,
                'email' => $email,
                'password' => $hashedPassword,
            ]);
            echo "<script>alert('Registration successful! Redirecting to login page.');</script>";
            echo "<script>setTimeout(function() { window.location.href = '../login.html'; }, 3000);</script>";
        } catch (PDOException $e) {
            if ($e->getCode() == 23000) {
                echo "<script>alert('Username or email already exists.');</script>";
                echo "<script>setTimeout(function() { window.location.href = '../register.html'; }, 3000);</script>";
            } else {
                echo "<script>alert('Error: " . $e->getMessage() . "');</script>";
            }
        }
    } else {
        echo "<script>alert('Please fill in all fields.');</script>";
    }
}
?>
