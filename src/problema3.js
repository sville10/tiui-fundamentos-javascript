
/*Transforma el código escrito en ECMAScript 6 (ES6) para que funcione con promesas y así evitar el Callback Hell del final.
*/
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = 'https://rickandmortyapi.com/api/character/';

const X = url => {
  return new Promise((resolve, reject) => {
    const B = new XMLHttpRequest();
    B.onreadystatechange = () => {
      if (B.readyState === 4) {
        if (B.status === 200) {
          resolve(B.responseText);
        } else {
          reject(url);
        }
      }else {
        reject(url);
      }
    };
    B.open('GET', url, false);
    B.send();
  });
}

X(A)
  .then(d => {
    console.log('Primer Llamado...');
    return X(`${A}${JSON.parse(d).results[0].id}`).then(f => {
      return {d, f} ;
    });
  })
  .then(({d, f} ) => {
    console.log('Segundo Llamado...');
    return X(JSON.parse(f).origin.url).then(h => {
      return {d,  f, h} ;
    });
  })
  .then(( {d, f, h} ) => {
    console.log('Tercer Llamado...');
    console.log(`Personajes: ${JSON.parse(d).info.count}`);
    console.log(`Primer Personaje: ${JSON.parse(f).name}`);
    console.log(`Dimensión: ${JSON.parse(h).dimension}`);
  })
  .catch(error => {
    console.error('Error: ' + error);
  });