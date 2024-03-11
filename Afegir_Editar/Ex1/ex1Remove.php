<?php
    
    if(isset($_GET["id"]) && !empty($_GET["id"])){
        $servername = "localhost";
        $username = "root";
        $password = "system";
        $dbname = "m6";

        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        $sql = "DELETE FROM productes WHERE id=" . $_GET["id"];
        
        echo $sql;

        if ($conn->query($sql) === TRUE) {
            echo "Deleted successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();

    }
    
    header('Location: ex1Llistat.php');

?>