# wedding-app

Este repositorio contiene una API y un cliente diseñados para gestionar matrimonios, incluyendo funcionalidades como:

- Inicio de sesión.
- Cambio de contraseña.
- Registro de personas.
- Listado de personas registradas.
- Emparejamiento (casamiento).

**Limitaciones:**
- No soporta divorcios.
- No incluye interfaz de administración.

## Estructura
- `/api`: Backend de la aplicación.
- `/client`: Frontend de la aplicación.

## Instalación

### API
1. Navega a la carpeta `/api`.
2. Ejecuta `npm install` para instalar las dependencias.
3. Inicia el servidor con `npm start`.

### Cliente
1. Navega a la carpeta `/client`.
2. Ejecuta `npm install` para instalar las dependencias.
3. Inicia la aplicación con `npm run dev`.

### Base de datos
1. Importa el archivo `bodas.sql` en un gestor de base de datos SQL (como MySQL o PostgreSQL).
2. Inserta datos en la tabla `admis` para habilitar el inicio de sesión (por ejemplo, un usuario y contraseña).
3. Configura las credenciales de la base de datos en el archivo de configuración de la API (si aplica, como en un `.env`).

## Uso
1. Una vez que la API y el cliente estén ejecutándose, la aplicación mostrará la pantalla principal de inicio de sesión. Usa las credenciales que creaste en la tabla `admis`.
2. En la interfaz:
   - **Navbar:** Incluye las opciones "Registrar" y "Casar" (arriba a la izquierda), y el nombre de usuario con un menú desplegable que contiene la opción "Perfil" (arriba a la derecha).
   - **Cuerpo:** Muestra la lista de personas registradas.
3. **Registrar:**
   - Selecciona esta opción para mostrar un formulario donde puedes ingresar los datos de una persona.
   - Para generar un CURP ficticio, consulta la función en `/api/src/controllers/casarController.js`. Ejecuta la ruta correspondiente (revisa `/api/src/routes/casar.routes.js` para más detalles).
4. **Casar:**
   - Muestra un formulario con dos campos para ingresar las CURPs de las personas a emparejar.