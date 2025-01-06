<?php
// Configurar cabeceras CORS (si es necesario)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Conexión con la base de datos
$connection = new mysqli("localhost", "root", "", "consultoraap");

// Verificar conexión
if ($connection->connect_error) {
    die(json_encode(['error' => 'Error de conexión a la base de datos: ' . $connection->connect_error]));
}

// Consultar los mensajes
$query = "SELECT nombre, correo, mensaje FROM datos";
$result = $connection->query($query);

// Verificar si hay resultados
if ($result->num_rows > 0) {
    $messages = [];

    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }

    echo json_encode($messages);
} else {
    echo json_encode([]);
}

$connection->close();
?>
