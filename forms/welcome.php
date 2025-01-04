<?php
session_start();
if (!isset($_SESSION['username'])) {
    header('Location: login.html');
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Welcome</title>
    <meta http-equiv="refresh" content="5;url=index.html"> <!-- Redirect to index.html after 5 seconds -->
    <script>
        // Optional JavaScript redirection for more flexibility
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 5000); // Redirect after 5 seconds
    </script>
</head>
<body>
    <h1>Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?>!</h1>
    <p>You have successfully logged in. You will be redirected to the homepage shortly.</p>
    <p>If the redirection doesn't work, <a href="index.html">click here</a>.</p>
</body>
</html>
