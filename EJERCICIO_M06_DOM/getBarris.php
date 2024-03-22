<?php
$serverBD = "localhost"; // Variable de servidor de la BBDD
$db_name = "m6"; // Nombre de la base de datos
$db_user = "root";
$db_pwd = "system";

$conn = mysqli_connect($serverBD, $db_user, $db_pwd, $db_name);

if (mysqli_ping($conn)) {
    $id = $_POST["id"];
    $sql = "SELECT * FROM barris WHERE id_districte = $id";

    //Consulta a la BBDD
    $query = mysqli_query($conn, $sql);

    $object = new stdClass();

    $return = array();
    while ($row = $query->fetch_assoc()) {
        $object = new stdClass();
        $object->id = $row["id"];
        $object->name = $row["name"];
    
        array_push($return, $object);
    }
    
    echo json_encode($return);

    // Cerramos la conexión
    mysqli_close($conn);
}