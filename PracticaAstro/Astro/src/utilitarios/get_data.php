<?php
header('Content-Type: application/json');
$connection = new mysqli("mysql5050.site4now.net", "a917b4_practip", "j4v13r43v3r#", "db_a917b4_practip");
if ($mysqli->connect_error) {
    die(json_encode(['error' => 'Error al conectar a la base de datos']));
}

$query = "SELECT id, nombres, correo, mensaje, fecha_hora FROM datos";
$result = $mysqli->query($query);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
$mysqli->close();
?>
