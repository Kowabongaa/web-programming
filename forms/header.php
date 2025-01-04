<?php
session_start();
?>
<nav>
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="contact.html">Contact</a></li>
        <?php if (isset($_SESSION['username'])): ?>
            <li><a href="profile.html">Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?></a></li>
            <li><a href="logout.php" class="logout-button">Logout</a></li>
        <?php else: ?>
            <li><a href="login.html" id="login-link" class="login-button">Login</a></li>
        <?php endif; ?>
    </ul>
</nav>
