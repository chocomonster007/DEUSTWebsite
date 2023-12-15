<?php

$pdo = new PDO("mysql:host=localhost;dbname=jeu", "root", "root");

$pdo->exec('CREATE TABLE IF NOT EXISTS tupreferes (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, question VARCHAR(200), reponse1 VARCHAR(200), reponse2 VARCHAR(200), nbreponse1 INT DEFAULT 0, nbreponse2 INT DEFAULT 0)');

$pdo->exec('CREATE TABLE IF NOT EXISTS ajout (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, question VARCHAR(200), reponse1 VARCHAR(200), reponse2 VARCHAR(200)');

$pdo->exec('CREATE TABLE IF NOT EXISTS account (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, username VARCHAR(50), password VARCAHR(250)');

if(isset($_POST['question'])){

}

?>



