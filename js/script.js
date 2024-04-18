const boton = document.querySelector("#boton"),
    ingreso = document.querySelector("#ingreso"),
    contenedor = document.querySelector("#contenedor-prendas");

//Búsqueda
function buscarProducto(arr, producto) {
    const encontrado = arr.find((el) => {
        return el.nombre.includes(producto);
    });
    return encontrado;
}

function filtrarProducto(arr, producto) {
    const filtrado = arr.filter((el) => {
        return el.nombre.includes(producto);
    });
    return filtrado;
}

function card(obj) {
    contenedor.innerHTML = "";
    let cardHtml;
    for (const el of obj) {
        cardHtml = `<div data-aos="zoom-in">
        <p class= "nombre-producto">${el.nombre}</p>
        <img class="prendas" src=" ../assets/prendas-ropa/${el.img}" alt="${el.nombre}">
        <p>$${el.precio}</p>
        <button class="btn-comprar">Comprar</button>
    </div>`;
        //Se agrega al contenedor de prendas
        contenedor.innerHTML += cardHtml;
    }
}

//card(productos);
const cargando = document.querySelector(".cargando");

let productosDB = [];

fetch("../db/db.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        productosDB = data
        cargando.classList.add("activo")
        setTimeout(() => {
            cargando.classList.remove("activo")
            console.log(productosDB);
            card(productosDB)
        }, 1000)
    })

boton.addEventListener("click", () => {
    const filtrados = filtrarProducto(productosDB, ingreso.value);
    setTimeout(() => {
        console.log(filtrados);
        card(filtrados);
    }, 500);
});


//Guardar en el carrito
const botonMostrar = document.querySelector(".boton-mostrar"),
    botonEliminar = document.querySelector(".boton-eliminar"),
    botonEspecifico = document.querySelector("#produc-espec")

let carrito = []
localStorage.setItem("carrito", JSON.stringify(carrito))
let carritoLS = JSON.parse(localStorage.getItem("carrito"));

botonEspecifico.addEventListener("click", () => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto agregado al carrito",
        showConfirmButton: false,
        timer: 1700
    });
    const productoEncontrado = buscarProducto(productosDB, ingreso.value);
    //console.log(productoEncontrado);
    carrito.push(productoEncontrado);
    localStorage.setItem("carrito", JSON.stringify(carrito))
    //console.log(carrito);
    carritoLS = JSON.parse(localStorage.getItem("carrito"))
    console.log("Carrito LocalStorage");
    console.log(carritoLS);
})

let bandera = false;

botonMostrar.addEventListener("click", () => {
    //Usando operador ternario
    !bandera ? card(carritoLS) : setTimeout(() => {
        contenedor.innerHTML = "No tienes productos en el carrito";
        bandera = false;
    }, 1000)
})

botonEliminar.addEventListener("click", () => {
    carrito = [];
    //localStorage.removeItem("carrito")
    setTimeout(() => {
        contenedor.innerHTML = "El carrito se encuentra vacío";
        bandera = true;
    }, 500)
})


const botonComprar = document.querySelector(".btn-comprar");

const nombreProducto = document.querySelector(".nombre-producto");

// botonComprar.addEventListener("click", () => {
//     const productoEncontrado = buscarProducto(productosDB, ingreso.value);
//     //console.log(productoEncontrado);
//     carrito.push(productoEncontrado);
//     localStorage.setItem("carrito", JSON.stringify(carrito))
//     //console.log(carrito);
//     carritoLS = JSON.parse(localStorage.getItem("carrito"))
//     console.log("Carrito LocalStorage");
//     console.log(carritoLS);
// })

