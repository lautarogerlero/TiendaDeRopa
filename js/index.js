const divProductos = document.querySelector("#productos");

// Obtener los datos del local storage, si no hay nada se genera un array vacio
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// funcion para mostrar los productos en el html
function mostrarProductos(array) {
    array.forEach(producto => {
        divProductos.innerHTML += `
        <div class="producto">
            <img src=${producto.img}>
            <p>${producto.nombre}   $${producto.precio}</p>
            <button class="agregar" id="${producto.id}">Agregar al carrito</button>
        </div>
        `
    });
}

mostrarProductos(productos);

// funcion para filtrar los productos
function filtrar(e){
    let boton = e.target;
    let categoria = boton.innerText;
    let productosFiltrados = productos.filter(producto => producto.categoria === categoria);
    divProductos.innerHTML = "";
    mostrarProductos(productosFiltrados);
}

// filtar los productos al apretar los botones
const botonFiltro = document.getElementsByClassName("filtrar");
for (boton of botonFiltro){
    boton.addEventListener("click", filtrar);
}

// mostrar todos los productos
const mostrarTodo = document.querySelector(".todo");
mostrarTodo.addEventListener("click", () => {
    divProductos.innerHTML = "";
    mostrarProductos(productos);
})

// agregar al carrito
const botonAgregar = document.querySelectorAll(".agregar");
 
// NO AGREGA LOS FILTRADOS
function agregarAlCarrito(e) {
    const boton = e.target;
    const idBoton = Number(boton.getAttribute("id"));
    let productoSeleccionado = productos.find(producto => producto.id === idBoton);
    carrito.push(productoSeleccionado);
    
    // subir el array al local storage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

for (boton of botonAgregar) {
    boton.addEventListener("click", agregarAlCarrito);
}



