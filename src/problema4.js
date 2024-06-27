/* Problema 4 optimiza el código para mejorar su legibilidad y eficiencia.
    Se utiliza fetch ya que es una manera mas legible y mas actual de realizar una peticion a un API
    y se ordena el codigo generando algunas constantes
*/

const A = 'https://rickandmortyapi.com/api/character/';

const peticion = async (url) => {
  const todo = await fetch(url);
  if (!todo.ok) {
    throw new Error(`Error ${url}: ${todo.statusText}`);
  }
  return todo.json();
};

const obtenerDatos = async () => {
  try {
    console.log('Primer Llamado...');
    const jsonCompleto = await peticion(A);
    const primerPersonaje = jsonCompleto.results[0];
    
    console.log('Segundo Llamado...');
    const jsonPrimerPersonaje = await peticion(`${A}${primerPersonaje.id}`);
    const OriginPrimerPersonaje = jsonPrimerPersonaje.origin.url;

    console.log('Tercer Llamado...');
    const jsonOriginPrimerPersonaje = await peticion(OriginPrimerPersonaje);
    
    console.log(`Personajes: ${jsonCompleto.info.count}`);
    console.log(`Primer Personaje: ${jsonCompleto.name}`);
    console.log(`Dimensión: ${jsonOriginPrimerPersonaje.dimension}`);
  } catch (error) {
    console.error('Error:', error);
  }
};

obtenerDatos();