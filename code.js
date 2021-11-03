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
    
}

// Procedimiento Mostrar
fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .then( error => console.log(error) )

// ON() Método
const on = (element, event, selector, handler) => {
    //console.log(handler)
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

// Procedimiento borrar
on(document, 'click', '.btnBorrar', e => {
    // console.log('Borrado');
    const fila = e.target.parentNode.parentNode //Captura la fila completa y la asigana al btnBorrar
    const id = fila.firstElementChild.innerHTML //Captura el id de la fila
    //console.log(id)
    alertify.confirm("Articulo eliminado",
    function(){
        fetch(url+id, {
            method: 'DELETE'
        })
        .then( res => res.json() )
        .then( ()=> location.reload() )
        //alertify.success('Ok')
    },
    function(){
        alertify.error('Cancel')
    })
})

// Procedimiento editar
let idForm = 0
on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML // Captura el id de la fila y se lo asigna a la variable idForm
    //console.log(idForm)
    const descripcionForm = fila.children[1].innerHTML
    const precioForm = fila.children[2].innerHTML
    const stockForm = fila.children[3].innerHTML
    descripcion.value = descripcionForm;
    precio.value = precioForm;
    stock.value = stockForm;
    opcion = 'editar'
    modalArticulo.show()
})

// Procedimiento Crear & Editar
formArticulo.addEventListener('submit', (e) => {
    e.preventDefault() //evita recargar la pagina
    if(opcion=='crear'){
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                descripcion:descripcion.value,
                precio:precio.value,
                stock:stock.value
            })
        })
        .then( res => res.json() )
        .then( data => {
            const nuevoArticulo = []
            nuevoArticulo.push(data)
            mostrar(nuevoArticulo)
        })
    }
    if(opcion=='editar'){
        fetch(url+idForm, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                descripcion:descripcion.value,
                precio:precio.value,
                stock:stock.value
            })
        })
        .then( res => res.json() )
        .then( res => location.reload() )
    }
    modalArticulo.hide()
})