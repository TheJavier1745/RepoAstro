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
$correo = $_POST['correo'] ?? '';
$clave = $_POST['clave'] ?? '';

// Validar que todos los campos están llenos
if (empty($correo) || empty($clave)) {
    echo json_encode(['error' => 'Todos los campos son obligatorios.']);
    exit;
}

// Preparar la consulta SQL
// Prepara la consulta SQL
$stmt = $connection->prepare("SELECT tipoUsuario FROM usuarios WHERE correo = ? AND contrasena = ?");

// Vincula los parámetros (los valores de correo y contraseña)
$stmt->bind_param("ss", $correo, $clave);

// Ejecuta la consulta
$stmt->execute();

// Obtiene el resultado
$result = $stmt->get_result();

// Procesa el resultado
if ($result->num_rows > 0) {
    // Extrae el tipoUsuario
    $row = $result->fetch_assoc();
    $tipoUsuario = $row['tipoUsuario'];

    // Redirige según el tipo de usuario
    if ($tipoUsuario === 'admin') {
        header("Location: /admin"); // Redirige al panel de administrador
        exit(); // Termina la ejecución del script
    } elseif ($tipoUsuario === 'usuario') {
        header("Location: /"); // Redirige a la página principal
        exit(); // Termina la ejecución del script
    }
} else {
    // Si no se encuentran resultados, muestra una alerta
    echo "<script>alert('Correo o contraseña inválida'); window.location.href = '/login';</script>";
}

// Cerrar la conexión
$stmt->close();
$connection->close();
?>
