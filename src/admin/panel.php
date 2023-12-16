<?php
session_start();

require_once 'class/Choix.php';

$pdo = new PDO("mysql:host=localhost;dbname=jeu", "root", "root");

if(isset($_POST['username'])){
    $query = $pdo->prepare('SELECT * FROM account WHERE username = :username');
    $query->execute(['username'=>$_POST['username']]);
    $result = $query->fetch(PDO::FETCH_ASSOC);
    if(!password_verify($_POST['password'],$result['password'])){
        header('Location: index.php');
        exit;
    }
    $_SESSION['username'] = $result['username'];
}else if(isset($_SESSION)){
    $query = $pdo->prepare('SELECT * FROM account WHERE username = :username');
    $query->execute(['username'=>$_SESSION['username']]);
    $session = $query->fetch();
    if(!$session){
        header('Location: index.php');
        exit;
    }
}
else{
    header('Location: index.php');
    exit;
} 

if(isset($_GET['add'])){
    $query = $pdo->query('SELECT * FROM ajout WHERE id = '.$_GET['add']);
    $addition = $query->fetch();
    if($addition){
        $insert = $pdo->prepare("INSERT INTO tupreferes SET reponse1 = :reponse1, reponse2 =:reponse2");
        $insert->execute(['reponse1'=>$addition["reponse1"], 'reponse2'=>$addition['reponse2']]);
        $pdo->exec("DELETE FROM ajout WHERE id = ".$_GET['add']);
    }
 
}
if(isset($_GET['supp'])){
    $pdo->exec("DELETE FROM ajout WHERE id = ".$_GET['supp']);
}

$query = $pdo->query('SELECT * FROM ajout');
$result = $query->fetchAll(PDO::FETCH_CLASS, Choix::class);



?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <table>

        <?php foreach($result as $value):?>
            <?php $supp = 'http://localhost:8000/panel.php'.'?supp='.$value->id; ?>
            <?php $add = 'http://localhost:8000/panel.php'.'?add='.$value->id; ?>
            <tr>
                <th><?= $value->reponse1 ?></th>
                <th><?= $value->reponse2 ?></th>
                <th><a href="<?= $supp  ?>">Supprimer</a></th>
                <th><a href="<?= $add ?>">Ajouter</a></th>

            </tr>
        <?php endforeach;?>
    </table>
    
</body>
</html>