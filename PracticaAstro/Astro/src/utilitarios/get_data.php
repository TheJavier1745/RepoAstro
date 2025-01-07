<?php
header('Content-Type: application/json');

// Conexión a la base de datos
$connection = new mysqli("mysql5050.site4now.net", "a917b4_practip", "j4v13r43v3r#", "db_a917b4_practip");
if ($connection->connect_error) {
    echo json_encode(['error' => 'Error al conectar con la base de datos: ' . $connection->connect_error]);
    exit();
}

// Realizar consulta a la base de datos
$query = 'SELECT * FROM datos';
$result = $connection->query($query);

if (!$result) {
    echo json_encode(['error' => 'Error en la consulta: ' . $connection->error]);
    $connection->close();
    exit();
}

// Procesar datos
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Devolver los datos como JSON
echo json_encode($data);
$connection->close();
?>

