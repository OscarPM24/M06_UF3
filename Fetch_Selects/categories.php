<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
<?php
$serverBD = "localhost"; // Variable de servidor de la BBDD
$db_name = "m6"; // Nombre de la base de datos
$db_user = "root";
$db_pwd = "system";

$conn = mysqli_connect($serverBD, $db_user, $db_pwd, $db_name);

if (mysqli_ping($conn)) {
    $cat = 1;
    $sql = "SELECT * FROM subcategories where id_cat = $cat";

    //Consulta a la BBDD
    $query = mysqli_query($conn, $sql);

    $object = new stdClass();
    $rows = mysqli_fetch_all($query);
    echo $rows;

    $return = array();
    foreach ($rows as $row) {
        $object->nom = $row["nom"];
        $object->id = $row["id"];
        array_push($return, $object);
    }

    //echo json_encode($return);

    // Cerramos la conexión
    mysqli_close($conn);
}
?>
</body>
</html>