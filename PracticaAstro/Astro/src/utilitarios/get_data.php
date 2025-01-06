<?php
// Configurar la conexión con la base de datos
$connection = new mysqli("localhost", "root", "", "consultoraap");
if ($connection->connect_error) {
    die("Error de conexión: " . $connection->connect_error);
}

// Consulta para obtener los datos
$sql = "SELECT id, nombres, apellidos, rut, correo, telefono, mensaje,fecha_hora FROM datos";
$result = $connection->query($sql);

$datos = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $datos[] = $row;
    }
}

// Devolver los datos como JSON
header('Content-Type: application/json');
echo json_encode($datos);

$connection->close();
?>
