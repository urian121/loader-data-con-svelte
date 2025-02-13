# 📌 Guía: Cargar Datos con Loader en Svelte

La carga de datos en **Svelte** se puede gestionar de manera eficiente con los loaders, facilitando la obtención de información desde APIs o bases de datos antes de renderizar un componente. En esta guía, exploraremos cómo usar loaders en Svelte para manejar datos asincrónicos de forma óptima.

## 1. Crear el store `loader.js`
Vamos a crear un store para manejar el estado del loader.

📁 Crea el archivo `src/stores/loader.js` y agrega:

```js
import { writable } from "svelte";

// Estado del loader (inicialmente en false)
export const loader = writable(false);
```


## 2. Crear el servicio para consumir la API
Para mantener el código limpio, crearemos un servicio que se encargue de hacer la petición a la API.

📁 Crea el archivo `src/services/apiService.js` y agrega:

```js
import { loader } from "../stores/loader.js";

// Función para obtener datos de una API
export async function fetchUsers() {
  loader.set(true); // Activamos el loader antes de hacer la petición

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error("Error al obtener los datos");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  } finally {
    loader.set(false); // Desactivamos el loader después de obtener los datos
  }
}
```

## 3. Crear el componente `Usuarios.svelte`
Ahora, creamos un componente para mostrar los datos.

📁 Crea el archivo `src/components/Usuarios.svelte` y agrega:

```svelte
<script>
  import { onMount } from "svelte";
  import { loader } from "../stores/loader.js";
  import { fetchUsers } from "../services/apiService.js";

  let users = [];

  onMount(async () => {
    users = await fetchUsers();
  });
</script>

{#if $loader}
  <div class="d-flex justify-content-center">
    <Spinner />
  </div>
{:else}
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
        </tr>
      </thead>
      <tbody>
        {#each users as user}
          <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
```


## 4. Crear el componente `Spinner.svelte`
Para que el loader se vea bien, creamos un componente de spinner.

📁 Crea el archivo `src/components/Spinner.svelte` y agrega:

```svelte
<style>
  .spinner {
    width: 3rem;
    height: 3rem;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>

<div class="d-flex justify-content-center mt-5">
  <div class="spinner"></div>
</div>
```


## 5. Integrar todo en `App.svelte`
Finalmente, modificamos el archivo principal para mostrar los usuarios.

📁 Edita el archivo `src/App.svelte` y agrega:

```svelte
<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap-icons/font/bootstrap-icons.css";

  import Usuarios from "./components/Usuarios.svelte";
</script>

<div class="container mt-5">
  <h1 class="text-center">Lista de Usuarios</h1>
  <Usuarios />
</div>
```


## 6. Ejecutar el proyecto
Guarda los archivos y ejecuta el servidor:

```sh
npm run dev
```

Abre en el navegador `http://localhost:5173`, y verás lo siguiente:

✅ Un spinner de carga mientras se obtienen los datos.
✅ Cuando la API responde, se muestra la tabla con los usuarios.


## 🙌 Cómo puedes apoyar 📢:

✨ **Comparte este proyecto** con otros desarrolladores para que puedan beneficiarse.

☕ **Invítame un café o una cerveza 🍺**:
   - [Paypal](https://www.paypal.me/iamdeveloper86) (`iamdeveloper86@gmail.com`).

### ⚡ ¡No olvides SUSCRIBIRTE a la [Comunidad WebDeveloper](https://www.youtube.com/WebDeveloperUrianViera?sub_confirmation=1)!


#### ⭐ **Déjanos una estrella en GitHub**:
   - Dicen que trae buena suerte 🍀.
**Gracias por tu apoyo 🤓.**