<?php
	//conexion con la base de datos y el servidor
	$link = mysql_connect("localhost","root","") or die("<h2>No se encuentra el servidor</h2>");
	$db = mysql_select_db("consultoraap",$link) or die("<h2>Error de Conexion</h2>");

	//obtenemos los valores del formulario
	$nombres = $_POST['nombre'];
	$apellidos = $_POST['apellido'];
	$rut = $_POST['rut'];
	$correo = $_POST['correo'];
    $telefono = $_POST['telefono'];
	$mensaje = $_POST['mensaje'];

	//Obtiene la longitus de un string
	$req = (strlen($nombres)*strlen($apellidos)*strlen($rut)*strlen($correo)*strlen($telefono)*strlen($mensaje)) or die("No se han llenado todos los campos");
	//ingresamos la informacion a la base de datos
	mysql_query("INSERT INTO datos VALUES('','$nombres','$apellidos','$rut','$correo','$telefono','$mensaje')",$link) or die("<h2>Error Guardando los datos</h2>");
	echo'
		<script>
			alert("Registro Exitoso");
			location.href="index.html";
		</script>
	'


?>