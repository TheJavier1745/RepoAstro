<?php
// Configurar encabezados para devolver JSON
header("Content-Type: application/json; charset=UTF-8");

// Conexión a la base de datos
$connection = new mysqli("localhost", "root", "", "consultoraap");

// Verificar conexión
if ($connection->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Error de conexión a la base de datos: ' . $connection->connect_error]);
    exit;
}

// Consulta SQL
$query = "SELECT nombres, apellidos, correo, mensaje, DATE_FORMAT(fecha_hora, '%d-%m-%Y %H:%i:%s') AS fecha_hora FROM datos";
$result = $connection->query($query);

// Verificar resultados
$mensajes = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $mensajes[] = $row;
    }
} else {
    $mensajes = ['error' => 'No se encontraron mensajes.'];
}

// Enviar datos como JSON
echo json_encode($mensajes);

// Cerrar conexión
$connection->close();
?>
