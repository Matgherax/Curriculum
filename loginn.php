<?php
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Page Title</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
    <script src='main.js'></script>
</head>
<body>
    <div id="header">
        <img style="height:150px;" alt="CV" src="CV.png"> 
    </div>
    <br><br><br>
    <div id="content"><div style="text-align: center;">
        <h2>Autenticazzzzione</h2>
        <p>
            <label>Nome Utente: </label><input type="text" placeholder="Nickname" name="nick"><br><br>
            <label>Password: </label><input type="password" placeholder="Nutella03" name="pw"><br><br>
            <button type="submit" name="login" style="padding: 7px;">Login</button> 
        </p>
        <p>
            <a href="./index.html">Non hai un account  O.o? Crealo</a>    
        </p>
    </div></div>
    <?php   
    
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "curriculum";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $nick = $_POST["nick"];
    $pw = $_POST["pw"];

    $sql = "SELECT * FROM Logino WHERE nick = $nick AND pw = $pw;";

    $conn -> query($sql);
    $result = $conn -> query($sql);

    if(query($sql) === TRUE){
        echo "<br> Nome usato<br>" 
    }else{
        $sql = "INSERT INTO Logino VALUES ($nick, $pw);";
        $conn -> query($sql);
    }
    ?>
</body>
</html>
?>