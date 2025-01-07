<?php
// Configurar la conexión con la base de datos
$connection = new mysqli("mysql5050.site4now.net", "a917b4_practip", "j4v13r43v3r#", "db_a917b4_practip");
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
