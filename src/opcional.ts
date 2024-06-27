const A = 'https://rickandmortyapi.com/api/character/';

interface Character {
  id: string;
  name: string;
  origin: {
    url: string;
  };
}

interface ApiResponse {
  info: {
    count: number;
  };
  results: Character[];
}

interface Origin {
  dimension: string;
}

const peticion = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error ${url}: ${response.statusText}`);
  }
  return response.json();
};

const obtenerDatos = async (): Promise<void> => {
  try {
    console.log('Primer Llamado...');
    const jsonCompleto = await peticion<ApiResponse>(A);
    const primerPersonaje = jsonCompleto.results[0];
    
    console.log('Segundo Llamado...');
    const jsonPrimerPersonaje = await peticion<Character>(`${A}${primerPersonaje.id}`);
    const originPrimerPersonajeUrl = jsonPrimerPersonaje.origin.url;

    console.log('Tercer Llamado...');
    const jsonOriginPrimerPersonaje = await peticion<Origin>(originPrimerPersonajeUrl);
    
    console.log(`Personajes: ${jsonCompleto.info.count}`);
    console.log(`Primer Personaje: ${jsonPrimerPersonaje.name}`);
    console.log(`Dimensión: ${jsonOriginPrimerPersonaje.dimension}`);
  } catch (error) {
    console.error('Error:', error);
  }
};

obtenerDatos();