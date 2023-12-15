<?php

$pdo = new PDO("mysql:host=localhost;dbname=jeu", "root", "root");

if(isset($_POST['username'])){
    $query = $pdo->prepare('SELECT * FROM account WHERE username = :username');
    $query->execute(['username'=>$_POST['username']]);
    $result = $query->fetch(PDO::FETCH_ASSOC);
    if(!password_verify($_POST['password'],$result['password'])){
        header('Location: index.php');
        exit;
    }
}else{
    header('Location: index.php');
    exit;
} 




?>

