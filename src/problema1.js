
/*Problema 1, el programa ya funciona*/ 
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var A = 'https://rickandmortyapi.com/api/character/';
var B = new XMLHttpRequest();

function X(a, b) {
  B.onreadystatechange = function () {//Se elimini la "e" ya que no se utilizaba
    if (B.readyState == 4) { //se cambio el estado de una cadena a un numero
      if (B.status === 200)//se cambio el estatus de una cadena a un numero
        b(null, B.responseText);
      else return b(a);
    }
    else return b(a);
  };
  B.open('GET', a, false);
  B.send();
};

X(A, function (c, d) {
  if (c) return console.error('Error' + ' ' + c);
  console.log('Primer Llamado...');
  X(A + JSON.parse(d).results[0].id, function (e, f) {//Se corrigio la forma de obtener el id del elemento cero
    if (e) return console.error('Error' + ' ' + e);
    console.log('Segundo Llamado...');
    X(JSON.parse(f).origin.url, function (g, h) {
      if (g) return console.error('Error' + ' ' + g);
      console.log('Tercer Llamado...');
      console.log('Personajes:' + ' ' + JSON.parse(d).info.count);
      console.log('Primer Personaje:' + ' ' + JSON.parse(f).name);
      console.log('Dimensión:' + ' ' + JSON.parse(h).dimension);
    });
  });
});
