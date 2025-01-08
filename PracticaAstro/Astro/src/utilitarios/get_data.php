<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Conexión a la base de datos
$connection = new mysqli("mysql5050.site4now.net", "a917b4_practip", "j4v13r43v3r#", "db_a917b4_practip");
if ($connection->connect_error) {
    die(json_encode(['error' => "Error de conexión: " . $connection->connect_error]));
}

// Consulta de datos
$result = $connection->query("SELECT id, nombres, correo, mensaje, fecha_hora FROM datos");

if ($result->num_rows > 0) {
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $row['fecha_hora'] = date('Y-m-d\TH:i:s', strtotime($row['fecha_hora']));
        $rows[] = $row;
    }
    echo json_encode($rows);
} else {
    echo json_encode([]);
}

$connection->close();
?>
