// Importando el store writable (loader) para manejar el estado del loader
import { loader } from "../stores/loader.js";

// Función para obtener datos de una API
export async function fetchUsers() {
  loader.set(true); // Activamos el loader antes de hacer la petición

  try {
    let url_api = "https://jsonplaceholder.typicode.com/users";
    // Realiza una solicitud para obtener los datos desde la API
    const response = await fetch(url_api);

    // Verifica si la solicitud fue exitosa
    if (!response.ok) throw new Error("Error al obtener los datos");

    // Convierte la respuesta en formato JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  } finally {
    loader.set(false); // Desactivamos el loader después de obtener los datos
  }
}
