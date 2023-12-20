<?php
session_start();
$pdo = new PDO("mysql:host=localhost;dbname=jeu", "root", "root");

$pdo->exec("INSERT INTO ajout SET reponse1='Utiliser ton ordi', reponse2='Utiliser l\'ordi du deust'");
$pdo->exec("INSERT INTO ajout SET reponse1='Aller en cours en vélo sous la pluie', reponse2='Prendre un bus bondé de monde'");

$pass = password_hash('Lereste@:11.04',PASSWORD_BCRYPT);
$pdo->exec("INSERT INTO account SET username = 'KingOfDeust', password = '$pass'");


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