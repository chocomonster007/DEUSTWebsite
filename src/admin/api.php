<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin : *');

$pdo = new PDO("mysql:host=localhost;dbname=jeu", "root", "root");

$pdo->exec('CREATE TABLE IF NOT EXISTS tupreferes (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, reponse1 VARCHAR(200), reponse2 VARCHAR(200), nbreponse1 INT DEFAULT 0, nbreponse2 INT DEFAULT 0)');

$pdo->exec('CREATE TABLE IF NOT EXISTS ajout (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, reponse1 VARCHAR(200), reponse2 VARCHAR(200))');

$pdo->exec('CREATE TABLE IF NOT EXISTS account (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, username VARCHAR(50), password VARCHAR(250))');


if(isset($_GET['recup'])){
    $query = $pdo->query("SELECT * FROM tupreferes");
    $result = $query->fetch();
    echo json_encode($result, JSON_UNESCAPED_UNICODE);
}

if(isset($_GET['ajoutquestion'])){
    
}



?>



