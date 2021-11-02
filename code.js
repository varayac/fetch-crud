// Definicion de variables
const url = 'http://localhost:3000/api/articulos/';  // Conectamos con nuestra API.
const contenedor = document.querySelector('tbody');  // Seleccionamos la tabla del DOM.
let resultados = '';

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'));  // Creamos un modal de bootstrap mediante JS.
const formArticulo = document.querySelector('form');  // Seleccionamos el form del DOM.
const descripcion = document.getElementById('descripcion'); // Seleccionamos el inpud descripcion.
const precio = document.getElementById('precio'); // Seleccionamos el inpud precio.
const stock = document.getElementById('stock'); // Seleccionamos el inpud stock.
let opcion = ''; // Una variable condicional para Guardar o Editar segun el caso.

// Seleccionamos el boton crear y mediante el evento click lo mostramos con el metodo show().
btnCrear.addEventListener('click', ()=>{
    descripcion.value = '';
    precio.value = '';
    stock.value = '';
    modalArticulo.show();
    opcion = 'crear'; // ??
});

// Funcion para mostrar
const mostrar = (articulos) => {
    articulos.forEach(articulo => {
        resultados += `<tr>
                        <td>${articulo.id}</td>
                        <td>${articulo.descripcion}</td>
                        <td>${articulo.precio}</td>
                        <td>${articulo.stock}</td>
                        <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a> <a class="btnBorrar btn btn-danger">Borrar</a></td>
                      </tr>`
    })
    contenedor.innerHTML = resultados;
    console.log(contenedor);
}

// Procedimiento Mostrar
fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .then( error => console.log(error) )
    console.log(data)