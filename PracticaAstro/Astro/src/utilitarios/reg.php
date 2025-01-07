<?php
// Configurar las cabeceras
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Conexión con la base de datos
$connection = new mysqli("mysql5050.site4now.net", "a917b4_practip", "j4v13r43v3r#", "db_a917b4_practip");
if ($connection->connect_error) {
    die("Error de conexión: " . $connection->connect_error);
}

// Obtener los valores del formulario
$nombres = $_POST['nombre'] ?? '';
$apellidos = $_POST['apellido'] ?? '';
$rut = $_POST['rut'] ?? '';
$correo = $_POST['correo'] ?? '';
$telefono = $_POST['telefono'] ?? '';
$mensaje = $_POST['mensaje'] ?? '';
$fecha_hora = $_POST['fecha_hora'] ?? '';

// Validar que todos los campos están llenos
if (empty($nombres) || empty($apellidos) || empty($rut) || empty($correo) || empty($telefono) || empty($mensaje)) {
    echo json_encode(['error' => 'Todos los campos son obligatorios.']);
    exit;
}

// Preparar la consulta SQL
$stmt = $connection->prepare("INSERT INTO datos (nombres, apellidos, rut, correo, telefono, fecha_hora) VALUES (?, ?, ?, ?, ?, ?,?");
$stmt->bind_param("ssssss", $nombres, $apellidos, $rut, $correo, $telefono, $mensaje,$fecha_hora);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo json_encode(['success' => 'Registro exitoso.']);
} else {
    echo json_encode(['error' => 'Error al guardar los datos.']);
}

// Cerrar la conexión
$stmt->close();
$connection->close();
?>
