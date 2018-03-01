const fs = require('fs');

let autores = [
	'Autor A', 'Autor B', 'Autor C', 'Autor D', 'Autor E', 
	'Autor F', 'Autor G', 'Autor H', 'Autor I', 'Autor J'
];

let titulos = [
	'Cálculo', 'Mecánica', 'Álgebra', 'Física 2', 'Estadística'
];

let estados = [ 1, 2]

let libros = [];

let libro;

for (let i = 1; i <= 500; i++) {
	libro = {};
	
	libro.id = i;
	libro.autor = autores[Math.floor(Math.random() * autores.length)];
	libro.titulo = titulos[Math.floor(Math.random() * titulos.length)];
	libro.estado = estados[Math.floor(Math.random() * estados.length)];

	let referencia = 100 + i;
	libro.referencia = 'REF' + referencia.toString();

	libros.push(libro);
}

fs.writeFile('libros.json', JSON.stringify(libros), (err) => {
    if (err) {
      return console.error(err);
   }
   console.log("Data written successfully!");
});