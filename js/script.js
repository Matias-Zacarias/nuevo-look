const productos = [
    { id: 1, nombre: "remera lisa negra-hombre", precio: 5000, img: "remera-negra.jpg" },
    { id: 2, nombre: "remera lisa blanca-hombre", precio: 5000, img: "remera-blanca.jpg" },
    { id: 3, nombre: "camisa manga larga-hombre", precio: 20000, img: "camisa.jpg" },
    { id: 4, nombre: "camisa manga corta-hombre", precio: 15000, img: "camisa-corta.jpg" },
    { id: 5, nombre: "chomba-hombre", precio: 7500, img: "chomba.jpg" },
    { id: 6, nombre: "jeans-hombre", precio: 15000, img: "jeans-azul.png" },
    { id: 7, nombre: "buzo térmico-hombre", precio: 10000, img: "buzo-micropolar.jpg" },
    { id: 8, nombre: "buzo canguro-hombre", precio: 12000, img: "canguro.jpg" },
    { id: 9, nombre: "conjunto deportivo-hombre", precio: 8000, img: "conjunto-deportivo.jpg" },
    { id: 10, nombre: "jogging-hombre", precio: 9500, img: "jogging.jpg" },
    { id: 11, nombre: "blusa roja-muje", precio: 12500, img: "blusa-roja.jpg" },
    { id: 12, nombre: "pantalón engomado-mujer", precio: 15000, img: "pantalon-engomado.jpg" },
    { id: 13, nombre: "top deportivo-mujer", precio: 5500, img: "top-deportivo.jpg" },
    { id: 14, nombre: "vestido de fiesta-mujer", precio: 18000, img: "vestido-fiesta.jpg" },
    { id: 15, nombre: "remera térmica manga corta-mujer", precio: 6000, img: "remera-termica-manga-corta.jpg" },
    { id: 16, nombre: "enterito-niña", precio: 10000, img: "enterito-niña.jpg" },
    { id: 17, nombre: "camisa a cuadros-niño", precio: 11500, img: "camisa-niño.jpg" },
    { id: 18, nombre: "conjunto de baño-niña", precio: 9000, img: "conjunto-baño.jpg" },
    { id: 19, nombre: "remera-niño", precio: 5000, img: "remeras-niño.jpg" },
    { id: 20, nombre: "vestido de fiesta-niña", precio: 30000, img: "vestido-de-fiesta-para-nina.jpg" }
]

const boton = document.querySelector("#boton"),
    ingreso = document.querySelector("#ingreso"),
    contenedor = document.querySelector("#contenedor-prendas");

//Búsqueda
function buscarProducto(arr, filtro) {
    const encontrado = arr.find((el) => {
        return el.nombre.includes(filtro);
    });
    return encontrado;
}

function filtrarProducto(arr, filtro) {
    const filtrado = arr.filter((el) => {
        return el.nombre.includes(filtro);
    });
    return filtrado;
}

function crearHtml(arr) {
    contenedor.innerHTML = "";
    let html;
    for (const el of arr) {
        html = `<div data-aos="zoom-in">
        <p>${el.nombre}</p>
        <img class="prendas" src=" ../assets/prendas-ropa/${el.img}" alt="${el.nombre}">
        <p>$${el.precio}</p>
        <button class="agregar-carrito">Agregar al carrito</button>

    </div>`;
        //se la agrego al contenedor
        contenedor.innerHTML += html;
    }
}

crearHtml(productos);

boton.addEventListener("click", () => {
    const filtrados = filtrarProducto(productos, ingreso.value);
    console.log(filtrados);
    crearHtml(filtrados);
});

// let filtrados;

// boton.addEventListener("click", () => {
//     filtrados = filtrarProducto(productos, ingreso.value)
//     console.log(filtrados);
//     crearHtml(filtrados);
// })

//Guardar en el carrito
const btnMostrar = document.querySelector(".btn-mostrar"),
    btnEliminar = document.querySelector(".btn-eliminar"),
    agregar = document.querySelector(".agregar-carrito");

const carrito = []
let carritoLS = JSON.parse(localStorage.getItem("carrito"));
localStorage.setItem("carrito", JSON.stringify(carrito))

agregar.addEventListener("click", () => {
    const encontrado = buscarProducto(productos, ingreso.value);
    console.log(encontrado);

    carrito.push(encontrado)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    console.log(carrito);
    carritoLS = JSON.parse(localStorage.getItem("carrito"))
    console.log(carritoLS);
})

btnMostrar.addEventListener("click", () => {
    crearHtml(carritoLS);
})

btnEliminar.addEventListener("click", () => {
    localStorage.removeItem("carrito")
    contenedor.innerHTML = "No tienes productos en el carrito";
})
