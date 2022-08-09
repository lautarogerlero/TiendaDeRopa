const divCarrito = document.querySelector("#carrito");
const sectionCarrito = document.querySelector("#sectionCarrito");
const vaciar = document.querySelector("#vaciarCarrito");
const carritoVacio = document.querySelector("#carritoVacio");

let carrito2 = JSON.parse(localStorage.getItem("carrito")) || [];

// funcion para mostrar secciones
const mostrarSeccion = (seccion) => {seccion.style.display = "flex"}; 

// mostrar carrito
function mostrarCarrito(carrito){
    mostrarSeccion(sectionCarrito);
    carrito.forEach(producto => {
        divCarrito.innerHTML += `
        <div class="productoCarrito">
            <img src=../${producto.img}>
            <h2>${producto.nombre}   $${producto.precio}</h2>
            <button class="botonBorrar" id="${producto.id}">X</button>
        </div>
        `
    });

    let total = carrito2.reduce((acc, curr) => acc + parseInt(curr.precio), 0);
    let totalCompra = document.createElement("p");
    totalCompra.setAttribute("class", "total");
    totalCompra.innerText = ("Total: " + total);
    divCarrito.append(totalCompra);

    let botonBorrar = document.getElementsByClassName("botonBorrar");

    for (boton of botonBorrar) {
        boton.addEventListener("click", borrarProducto);
    }

    // vaciar carrito
    vaciar.addEventListener("click", () => {
    carrito2 = [];
    localStorage.clear();
    divCarrito.innerHTML = "";
    window.location.href="../index.html"
    })

    // terminar compra
    let terminarCompra = document.createElement("button");
    terminarCompra.setAttribute("class", "terminarCompra");
    terminarCompra.innerHTML = ("Finalizar Compra");
    divCarrito.append(terminarCompra);

    // mostrar formulario
    let seguirComprando = document.querySelector(".seguir");
    let checkout = document.querySelector(".checkout");
    terminarCompra.addEventListener("click", () => {
        mostrarSeccion(seguirComprando);
        mostrarSeccion(checkout);
    });

    
}

// mostrar carrito si hay productos
carrito2.length > 0 ? mostrarCarrito(carrito2) : (carritoVacio.innerHTML = `<h3>El carrito está vacio</h3>`);

// eliminar producto
function borrarProducto(e){
    divCarrito.innerHTML = "";
    const botonX = e.target;
    const idBotonX = botonX.getAttribute("id");
    let indexProducto = carrito2.findIndex(producto => producto.id === idBotonX);
    carrito2.splice(indexProducto, 1);
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito(carrito2);
}

//FORMULARIO
let nombre = document.querySelector("#nombre");
let mail = document.querySelector("#mail");
let telefono = document.querySelector("#telefono");
let direccion = document.querySelector("#direccion");
let divConfirmacion = document.querySelector("#confirmacion");
let submit = document.querySelector("#submit");
let formulario = document.querySelector("#form");

function terminarCompra() {
    if (nombre.value !== "" && mail.value !== "" && telefono.value !== "" && direccion.value !== "") {
        divConfirmacion.innerHTML = `
        <h3>Gracias por tu compra ${nombre.value}!</h3>
        <p>En 2/3 días hábiles lo estaremos enviando a ${direccion.value}</p>
        `
    } else {
        divConfirmacion.innerHTML = `
        <h3>Por favor complete todos los campos</h3>`
    }
}


formulario.onsubmit = (e) => {
    e.preventDefault();
    terminarCompra();
    formulario.reset();
}