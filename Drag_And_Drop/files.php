<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<?php
    print_r($_FILES["inputFiles"]);

    for ($i=0; $i<count($_FILES["inputFiles"]["name"]); $i++) {
        echo $_FILES["inputFiles"]["tmp_name"][$i] .'<br>';
        echo $_FILES["inputFiles"]["name"][$i] .'<br>';
    }
?>
</body>
</html>