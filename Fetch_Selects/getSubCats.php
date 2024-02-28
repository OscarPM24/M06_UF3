<?php
$serverBD = "localhost"; // Variable de servidor de la BBDD
$db_name = "m6"; // Nombre de la base de datos
$db_user = "root";
$db_pwd = "system";

$conn = mysqli_connect($serverBD, $db_user, $db_pwd, $db_name);

if (mysqli_ping($conn)) {
    $cat = $_POST["cat"];
    $sql = "SELECT * FROM subcategories where id_cat = $cat";

    //Consulta a la BBDD
    $query = mysqli_query($conn, $sql);

    $object = new stdClass();

    $return = array();
    while ($row = $query->fetch_assoc()) {
        $object = new stdClass();
        $object->id = $row["id"];
        $object->nom = $row["nom"];
    
        array_push($return, $object);
    }

    echo json_encode($return);

    // Cerramos la conexión
    mysqli_close($conn);
}