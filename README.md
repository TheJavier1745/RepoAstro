# 🏛️ Sistema de Optimización y Asignación de Salas Universitarias (UM)

Sistema web integral y motor de optimización basado en **Programación Lineal Entera Mixta (MILP)** diseñado para automatizar, planificar y optimizar la asignación de espacios, aulas y laboratorios universitarios.

El modelo maximiza la utilización eficiente de las salas, evita sobredimensionamientos, garantiza el cumplimiento estricto de restricciones físicas y pedagógicas (aforo, campus, equipamiento especializado), previene solapamientos horarios y proporciona herramientas avanzadas de diagnóstico de factibilidad, análisis de asignaciones históricas, reasignación manual interactiva y auditoría de calidad de datos.

---

## 🚀 Arquitectura y Tecnologías

El sistema implementa una arquitectura desacoplada moderna y reactiva:

* **Backend:** [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+) con [SQLAlchemy](https://www.sqlalchemy.org/) (ORM) y base de datos SQLite para persistencia integral de importaciones, eventos académicos, catálogo de salas, asignaciones fijadas, auditorías y corridas de optimización.
* **Motor Matemático (MILP):** [PuLP](https://coin-or.github.io/pulp/) integrado con el solver industrial **COIN-OR CBC** (modelos de *Factibilidad Estricta* y *Diagnóstico Parcial con Holguras / Minimización de No Asignados*).
* **Frontend:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/) + Vanilla CSS moderno, soporte responsivo y diseño ejecutivo optimizado para visualización de grandes volúmenes de datos.
* **Resiliencia Cloud:** Sistema de *heartbeat* y *keep-alive* con reintentos automáticos (`fetchWithRetry`) para tolerancia a *cold starts* en despliegues en la nube.
* **Despliegue:** Preparado para despliegue de frontend en [Vercel](https://vercel.com/) y backend API en [Render](https://render.com/).

---

## 📁 Estructura del Repositorio

```text
optimizacionsalasum/
├── api.py                     # API REST Backend (FastAPI, optimización, histórico, salas, auditoría)
├── database.py                # Conexión SQLite, pool y migraciones automáticas de esquema
├── models.py                  # Modelos de datos SQLAlchemy (Importacion, Evento, Sala, Corrida, Asignacion, etc.)
├── requirements.txt           # Dependencias oficiales de Python
├── vercel.json                # Configuración de build y rewrites para despliegue en Vercel
├── README.md                  # Documentación del sistema
│
├── frontend/                  # Aplicación Web SPA (React 18 + TypeScript + Vite)
│   ├── src/
│   │   ├── api/               # Cliente HTTP resiliente (fetchWithRetry, pingServer, config de entorno)
│   │   ├── components/        # Componentes UI reutilizables (Layout, Sidebar, Navbar, Grillas, Modales)
│   │   ├── pages/             # Vistas completas del sistema:
│   │   │   ├── Inicio.tsx               # Panel principal y bienvenida ejecutiva
│   │   │   ├── OfertaAcademica.tsx      # Carga, visualización y gestión de oferta docente
│   │   │   ├── InventarioSalas.tsx      # Catálogo físico de salas y características
│   │   │   ├── CalidadDatos.tsx         # Auditoría de consistencia y alertas previas a optimizar
│   │   │   ├── DetalleDatos.tsx         # Inspección detallada de registros importados
│   │   │   ├── EjecutarAsignacion.tsx   # Configuración de corrida, filtros, fijaciones y ejecución del solver
│   │   │   ├── Resultados.tsx           # Tabla detallada de asignaciones con filtros multicriterio
│   │   │   ├── Cambios.tsx              # Control de modificaciones y reasignaciones
│   │   │   ├── SinSolucion.tsx          # Diagnóstico de cuellos de botella y eventos no factibles
│   │   │   ├── ResumenGeneral.tsx       # Resumen ejecutivo de ocupación e indicadores clave
│   │   │   ├── UsoDeSalas.tsx           # Grilla interactiva semanal con drag & drop y auto-scroll
│   │   │   ├── OcupacionSala.tsx        # Detalle de uso cronológico por sala individual
│   │   │   ├── Laboratorios.tsx         # Gestión especializada de laboratorios y desactivación persistente
│   │   │   ├── Historico.tsx            # Análisis histórico y sugerencias automáticas inteligentes
│   │   │   ├── CompararEscenarios.tsx   # Comparativa métrica lado a lado entre corridas
│   │   │   ├── EjecucionesAnteriores.tsx# Historial y restauración de corridas previas
│   │   │   ├── Exportar.tsx             # Exportación avanzada estructurada a Excel
│   │   │   ├── Configuracion.tsx        # Parámetros del motor y ponderaciones del solver
│   │   │   ├── Auditoria.tsx            # Registro de auditoría y trazas del sistema
│   │   │   └── DetalleEvento.tsx        # Ficha individual de evento académico
│   │   ├── App.tsx            # Enrutamiento React Router v6 y ciclo de vida de heartbeat
│   │   └── main.tsx           # Entry point de la aplicación
│   ├── package.json           # Dependencias y scripts de Node.js
│   └── vite.config.ts         # Configuración del empaquetador Vite
│
├── src/                       # Núcleo algorítmico y procesamiento de datos
│   ├── data_loader.py         # ETL: Ingesta Excel, validaciones MECE y compatibilidad pedagógica
│   ├── model.py               # Modelos matemáticos MILP (Factibilidad Estricta y Diagnóstico con Holguras)
│   ├── visualization.py       # Grillas horarias y mapas de calor
│   └── ui_theme.py            # Tokens de diseño y estilos auxiliares
│
├── scripts/                   # Scripts de utilidad, validación y seeding
│   ├── validacion_completa_v44.py   # Verificación integral de inventario y endpoints
│   └── seed_clean_db.py             # Inicialización y saneamiento de base de datos
│
└── tests/                     # Suite de pruebas automatizadas con pytest
    ├── test_asignacion.py             # Pruebas de restricciones y funciones objetivo MILP
    ├── test_historico.py              # Pruebas del módulo de patrones históricos
    ├── test_compatibilidad_recursos.py# Pruebas de compatibilidad pedagógica y aforos
    ├── test_ui_workflow_verifications.py # Pruebas de integración de endpoints FastAPI
    └── test_ui_flow.py                # Pruebas de flujo E2E
```

---

## 🛠️ Instalación y Puesta en Marcha Local

### Prerrequisitos
* **Python 3.10+** (recomendado 3.10, 3.11 o 3.12)
* **Node.js 18+** y `npm`
* **Git**

---

### 1. Clonar el Repositorio e Instalar Dependencias

```bash
git clone https://github.com/JennGMRV/optimizacionsalasum.git
cd optimizacionsalasum
```

**Instalación Backend (Python):**
```bash
pip install -r requirements.txt
```

**Instalación Frontend (Node.js):**
```bash
cd frontend
npm install
cd ..
```

---

### 2. Ejecutar en Entorno de Desarrollo

**Paso 1 — Iniciar el Backend (FastAPI):**
```bash
python -m uvicorn api:app --host 127.0.0.1 --port 8000 --reload
```
* API REST: `http://127.0.0.1:8000`
* Documentación interactiva Swagger UI: `http://127.0.0.1:8000/docs`
* Endpoint de estado (Healthcheck): `http://127.0.0.1:8000/health`

**Paso 2 — Iniciar el Frontend (React + Vite):**
```bash
cd frontend
npm run dev
```
* Aplicación Web: `http://localhost:5173`

---

## 🧪 Pruebas Automatizadas

El proyecto cuenta con una suite completa de pruebas unitarias y de integración para validar la lógica matemática, los endpoints y los esquemas de datos:

```bash
python -m pytest tests/ -v
```

---

## 📐 Formulación Matemática del Modelo de Optimización (MILP)

El núcleo del sistema resuelve un problema de asignación de salas universitarias bajo programación lineal entera mixta (**Mixed-Integer Linear Programming - MILP**), formalizado e implementado en Python mediante **PuLP** y resuelto a través de **COIN-OR CBC**.

El modelo opera bajo proyección de **semana tipo** (Lunes a Sábado, con Domingos estrictamente excluidos para actividades presenciales) y discretización horaria exacta por minutos continuos desde medianoche ($t \in [0, 1440]$).

---

### 1. Conjuntos e Índices

* $e \in E$: Conjunto de eventos académicos presenciales válidos que requieren sala física ($Req_e = 1$).
* $s \in S$: Conjunto de salas y laboratorios disponibles en el inventario físico ($Disp_s = 1$).
* $d \in D$: Conjunto de días operativos de la semana, donde $D = \{\text{Lunes}, \text{Martes}, \text{Miércoles}, \text{Jueves}, \text{Viernes}, \text{Sábado}\}$.
* $E_d \subseteq E$: Subconjunto de eventos presenciales programados en el día $d \in D$.
* $E_{sab} \subseteq E$: Subconjunto de eventos presenciales programados el día Sábado.
* $S(e) \subseteq S$: Conjunto de salas físicas candidatas compatibles para el evento $e$, definidas por la matriz de compatibilidad: $S(e) = \{s \in S : A_{e,s} = 1\}$.
* $\mathcal{O}$: Conjunto de pares de eventos $(e, e') \in E \times E$ con $e \neq e'$ que presentan **solapamiento temporal estricto** en el mismo día ($d_e = d_{e'}$ y $\max(t_e^{ini}, t_{e'}^{ini}) < \min(t_e^{fin}, t_{e'}^{fin})$).
* $\mathcal{F} \subseteq E \times S$: Conjunto de pares evento-sala con asignación preestablecida o fijada manualmente por el planificador (*pinning*).
* $\mathcal{B}_s$: Conjunto de franjas horarias bloqueadas para la sala física $s$ (mantenimiento, obras, préstamos o reservas directas).

---

### 2. Parámetros del Sistema

* $D_e \in \mathbb{Z}_{\ge 0}$: Demanda de estudiantes (alumnos inscritos) para el evento $e$.
* $C_s \in \mathbb{Z}^+$: Capacidad o aforo físico máximo de la sala $s$.
* $Camp_e, Camp_s$: Campus geográfico del evento $e$ y de la sala $s$ (e.g. `MANUEL_MONTT`, `HUECHURABA`).
* $R_e$: Tipo de recurso o equipamiento pedagógico solicitado por el evento $e$ (e.g. `SALA CÁTEDRA`, `LABORATORIO COMPUTACIÓN`, `TALLER`).
* $T_s$: Tipo de sala o acondicionamiento disponible en la sala $s$.
* $[t_e^{ini}, t_e^{fin}]$: Intervalo horario del evento $e$ en minutos desde las 00:00 ($t_e^{fin} > t_e^{ini}$).
* $\omega_{sab} = 0.01$: Ponderación o penalización suave para el uso de salas físicas en días sábado ($0 < \omega_{sab} \ll 1$).
* $A_{e,s} \in \{0, 1\}$: Matriz binaria de compatibilidad entre el evento $e$ y la sala $s$, evaluada en la etapa ETL de preprocesamiento:

$$A_{e,s} = \begin{cases} 
1, & \text{si } Camp_e = Camp_s \ \land \ D_e \le C_s \ \land \ T_s \in \text{Compat}(R_e) \ \land \ \text{no coincide con bloqueos de } \mathcal{B}_s \\
0, & \text{en otro caso.}
\end{cases}$$

---

### 3. Variables de Decisión

* $x_{e,s} \in \{0, 1\}$: Variable binaria que vale $1$ si el evento $e$ es asignado a la sala $s$, y $0$ en caso contrario ($\forall e \in E, \, s \in S(e)$).
* $u_e \in \{0, 1\}$: Variable binaria de holgura diagnóstica que vale $1$ si el evento $e$ no recibe sala física asignada (*SIN ASIGNAR*), y $0$ si es asignado ($\forall e \in E$).

---

### 4. Funciones Objetivo

El motor provee dos modos de resolución según el contexto operativo:

#### Modo A: Factibilidad Estricta (Semana Común)
Busca una solución 100% entera factible donde cada evento presencial reciba una sala. Como criterio secundario de última prioridad física, minimiza el uso de salas físicas los días sábado:

$$\min Z_1 = \sum_{e \in E_{sab}} \sum_{s \in S(e)} \omega_{sab} \cdot x_{e,s}$$

*(Si no hay eventos en sábado o el objetivo es factibilidad pura, $Z_1 = 0$).*

#### Modo B: Diagnóstico Aislado con Minimización de Holguras
Diseñado para situaciones de sobredemanda o déficit de salas. Prioriza minimizar de forma estricta el número total de eventos no asignados (holguras), utilizando la penalización de sábados solo como criterio de desempate suave:

$$\min Z_2 = \sum_{e \in E} u_e + \sum_{e \in E_{sab}} \sum_{s \in S(e)} \omega_{sab} \cdot x_{e,s}$$

Dado que $\omega_{sab} = 0.01 \ll 1$, el solver garantiza matemáticamente encontrar el mínimo número de eventos sin asignar antes de optimizar las asignaciones del sábado.

---

### 5. Restricciones del Modelo

1. **Asignación Única en Factibilidad Estricta:**
   $$\sum_{s \in S(e)} x_{e,s} = 1 \quad \forall e \in E$$
   *Garantiza que todo evento presencial reciba exactamente una sala física compatible.*

2. **Asignación o Holgura en Diagnóstico:**
   $$\sum_{s \in S(e)} x_{e,s} + u_e = 1 \quad \forall e \in E$$
   *Permite al solver dejar el evento sin sala ($u_e = 1$) si no existe capacidad o compatibilidad disponible, identificando cuellos de botella exactos.*

3. **Prevención de Solapamientos Horarios (No Colisión):**
   $$x_{e,s} + x_{e',s} \le 1 \quad \forall s \in S(e) \cap S(e'), \ \forall (e, e') \in \mathcal{O}$$
   *Impide que dos eventos con horarios superpuestos en el mismo día ocupen la misma sala física.*

4. **Aforo y Capacidad Física:**
   $$D_e \cdot x_{e,s} \le C_s \cdot x_{e,s} \quad \forall e \in E, \, s \in S(e)$$
   *Garantizado a priori mediante el dominio restringido $S(e) = \{s \in S : D_e \le C_s\}$. Ningún evento excede el aforo de la sala.*

5. **Compatibilidad Pedagógica y de Campus:**
   $$x_{e,s} \le A_{e,s} \quad \forall e \in E, \, s \in S$$
   *Garantiza respeto estricto a las equivalencias pedagógicas (cátedra, computación, taller) y pertenencia al mismo campus.*

6. **Fijación de Asignaciones Manuales (Pinning):**
   $$x_{e,s} = 1 \quad \forall (e, s) \in \mathcal{F}$$
   *Fuerza al solver a respetar asignaciones bloqueadas por el usuario como restricciones duras obligatorias.*

7. **Consistencia de Holgura para Eventos Fijados:**
   $$u_e = 0 \quad \forall e \text{ tal que } \exists s : (e, s) \in \mathcal{F}$$
   *Impide que un evento fijado manualmente quede en estado no asignado.*

8. **Respeto a Bloqueos Horarios de Sala:**
   $$x_{e,s} = 0 \quad \forall e \in E_d, \, s \in S \text{ con bloqueo activo } b \in \mathcal{B}_s \text{ tal que } [t_e^{ini}, t_e^{fin}) \cap [t_{s,b}^{ini}, t_{s,b}^{fin}) \neq \emptyset$$
   *Excluye la asignación en bloques cerrados por administración, reparaciones o reservas manuales.*

9. **Condición de Integralidad Binaria:**
   $$x_{e,s} \in \{0, 1\}, \quad u_e \in \{0, 1\} \quad \forall e \in E, \, s \in S$$

---

### 6. Verificación Post-Solución Independiente

Para evitar anomalías numéricas o errores de redondeo del solver, el sistema ejecuta una rutina de verificación exhaustiva (`verificar_solucion_factible`) directamente contra los DataFrames originales en memoria antes de almacenar o presentar los resultados. Comprueba:
1. Exactamente una asignación por cada evento requerido.
2. Inexistencia de eventos fantasma o duplicados.
3. Validación estricta de solapamiento horario minuto a minuto.
4. Verificación de capacidad física: $D_e \le C_s$.
5. Validación de campus y equivalencia pedagógica.
6. Cumplimiento absoluto de bloqueos de sala y asignaciones fijadas.

> Para consultar la especificación matemática formal en formato LaTeX listo para compilación académica, revise el archivo [`modelo_optimizacion.tex`](file:///e:/Users/211466707/Documents/GitHub/optimizacionsalasum/modelo_optimizacion.tex) en la raíz del repositorio.

---

## 💡 Módulos y Funcionalidades Principales

1. **⚡ Motor de Optimización MILP:**
   * **Modo Factibilidad Estricta:** Garantiza cero solapamientos, aforos válidos y compatibilidad exacta.
   * **Modo Diagnóstico con Holguras:** Minimiza penalizaciones por eventos no asignados en escenarios de sobredemanda para identificar cuellos de botella exactos.
   * **Fijación de Asignaciones (Pinning):** Permite fijar manualmente salas o cursos que el solver respeta como restricciones obligatorias duras.
   * **Filtros Granulares:** Optimización selectiva por campus, tipo de sala, alcance histórico o prefijos específicos (e.g. `MALL-Z`, `MCSR`).

2. **📅 Matriz Horaria Interactiva (Uso de Salas):**
   * Grilla semanal completa (Lunes a Sábado, 08:00 a 22:00 hrs) con cabeceras fijas (*sticky headers*).
   * Filtros rápidos de visualización por turnos (*Mañana* y *Tarde*).
   * Interacción fluida con arrastrar y soltar (*drag & drop*), *auto-scroll* horizontal/vertical y modo de asignación manual libre.

3. **📊 Histórico y Recomendaciones Inteligentes:**
   * Análisis de patrones de asignación de periodos académicos anteriores.
   * Motor de sugerencias por coincidencia de asignatura, profesor y horario, con verificación de aforo y compatibilidad en tiempo real.

4. **🏢 Inventario y Gestión de Infraestructura:**
   * Control de capacidad, tipo de aula/laboratorio, campus y edificio.
   * Desactivación persistente de salas ("hasta nuevo aviso") con exclusión inmediata del motor de optimización.

5. **🔍 Auditoría y Calidad de Datos:**
   * Detección preventiva de inconsistencias en la oferta académica antes de optimizar (aforos en cero, horarios inválidos, cruces de profesor).
   * Fichas de detalle de evento con trazabilidad completa.

6. **⚖️ Comparación de Escenarios y Métricas:**
   * Comparación de resultados entre distintas corridas (porcentaje de cobertura, horas asignadas, salas utilizadas, sobredimensionamiento promedio).

7. **💾 Exportación e Interoperabilidad:**
   * Generación de archivos Microsoft Excel estructurados con hojas de resumen ejecutivo, asignaciones detalladas y listado de eventos no asignados con causa diagnosticada.

---

## 🌐 Configuración para Producción

* **Frontend:** Configurado para conectarse dinámicamente a la API de producción (`https://optimizacionsalasum.onrender.com`) o a la variable de entorno `VITE_API_URL`.
* **Backend:** Listo para ejecutarse con Uvicorn/Gunicorn en contenedores o servidores cloud (Render, AWS, GCP, etc.).

---

## 📄 Licencia

Proyecto desarrollado para la gestión y optimización de infraestructura académica universitaria.
