import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const LoginAndMessages = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rows, setRows] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      fetch('http://localhost/src/utilitarios/get_data.php')
        .then((response) => response.json())
        .then((data) => {
          const formattedData = data.map((row) => ({
            ...row,
            id: row.id,
            fecha_hora: row.fecha_hora || 'No disponible',
          }));
          setRows(formattedData);
        })
        .catch((error) => console.error('Error al obtener los datos:', error))
        .finally(() => setLoading(false));
    }
  }, [isLoggedIn]);

  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.username.value.trim();
    const password = event.target.password.value.trim();

    if (username === 'admin' && password === '1234') {
      setIsLoggedIn(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Usuario o contraseña incorrectos');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRows([]);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nombres', headerName: 'Nombre', width: 150 },
    { field: 'correo', headerName: 'Correo', width: 200 },
    { field: 'mensaje', headerName: 'Mensaje', width: 300 },
    {
      field: 'fecha_hora',
      headerName: 'Fecha y Hora',
      width: 200,
      valueFormatter: (params) => {
        if (!params.value || params.value === 'No disponible') return 'No disponible';
        const date = new Date(params.value);
        return date.toLocaleString('es-CL', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      },
    },
  ];

  return (
    <div className="admin-container">
      <header className="header">
        <h1>Admin - Consultora AP</h1>
        {isLoggedIn && (
          <button className="logout-btn" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        )}
      </header>

      <main className="main-content">
        {isLoggedIn ? (
          <div>
            <h2>Mensajes Recibidos</h2>
            {loading ? (
              <p>Cargando mensajes...</p>
            ) : (
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5, 10, 20]}
                  pagination
                />
              </div>
            )}
          </div>
        ) : (
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Inicio de Sesión</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Usuario"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Clave</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Clave"
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              Iniciar Sesión
            </button>
          </form>
        )}
      </main>

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          background-color: #000;
          color: #fff;
          border-radius: 5px;
        }

        .header h1 {
          margin: 0;
        }

        .logout-btn {
          background-color: #dc3545;
          color: #fff;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
        }

        .main-content {
          max-width: 800px;
          margin: 50px auto;
        }

        .login-form {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .form-group {
          margin-bottom: 15px;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .btn-primary {
          display: inline-block;
          background-color: #007bff;
          color: #fff;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .btn-primary:hover {
          background-color: #0056b3;
        }

        .error-message {
          color: red;
          margin-bottom: 10px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default LoginAndMessages;
