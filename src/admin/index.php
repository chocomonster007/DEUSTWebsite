<?php
$pdo = new PDO("mysql:host=localhost;dbname=jeu", "root", "root");


?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="panel.php" method="POST">
        <input type="text" name="username">
        <input type="password" name="password">
        <button type="submit">Se connecter</button>
    </form>
</body>
</html>