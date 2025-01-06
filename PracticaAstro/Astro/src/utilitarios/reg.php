<?php
// Configurar cabeceras CORS (si es necesario)
ini_set('display_errors', 1);
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Conexión con la base de datos
$connection = new mysqli("localhost", "root", "", "consultoraap");

if ($connection->connect_error) {
    die("<h2>Error de conexión: " . $connection->connect_error . "</h2>");
}

// Obtener los valores del formulario
$nombres = $_POST['nombre'] ?? '';
$apellidos = $_POST['apellido'] ?? '';
$rut = $_POST['rut'] ?? '';
$correo = $_POST['correo'] ?? '';
$telefono = $_POST['telefono'] ?? '';
$mensaje = $_POST['mensaje'] ?? '';

// Validar que todos los campos estén llenos
if (empty($nombres) || empty($apellidos) || empty($rut) || empty($correo) || empty($telefono) || empty($mensaje)) {
    echo json_encode(['error' => 'Todos los campos son obligatorios.']);
    exit;
}

// Preparar la consulta SQL
$stmt = $connection->prepare("INSERT INTO datos (nombres, apellidos, rut, correo, telefono, mensaje) VALUES (?, ?, ?, ?, ?, ?)");

// Verificar si la preparación de la consulta falló
if (!$stmt) {
    die("<h2>Error en la consulta SQL: " . $connection->error . "</h2>");
}

// Vincular los parámetros
$stmt->bind_param("ssssss", $nombres, $apellidos, $rut, $correo, $telefono, $mensaje);

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
