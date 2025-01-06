<?php
// Configurar cabeceras CORS (si es necesario)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Mostrar errores (opcional para depuración)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Conexión con la base de datos
$connection = new mysqli("localhost", "root", "", "consultoraap");

// Verificar conexión
if ($connection->connect_error) {
    die(json_encode(['error' => 'Error de conexión a la base de datos: ' . $connection->connect_error]));
}
date_default_timezone_set('America/Santiago');
// Obtener los valores del formulario
$nombres = $_POST['nombre'] ?? '';
$apellidos = $_POST['apellido'] ?? '';
$rut = $_POST['rut'] ?? '';
$correo = $_POST['correo'] ?? '';
$telefono = $_POST['telefono'] ?? '';
$mensaje = $_POST['mensaje'] ?? '';
$fechaHora = date('Y-m-d H:i:s'); // Obtener la fecha y hora actual

// Validar que todos los campos estén llenos
if (empty($nombres) || empty($apellidos) || empty($rut) || empty($correo) || empty($telefono) || empty($mensaje)) {
    echo json_encode(['error' => 'Todos los campos son obligatorios.']);
    exit;
}

// Preparar la consulta SQL
$stmt = $connection->prepare("INSERT INTO datos (nombre, apellido, rut, correo, telefono, mensaje, fecha_hora) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $nombres, $apellidos, $rut, $correo, $telefono, $mensaje, $fechaHora);

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
