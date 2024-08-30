let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function cardCarrito(data) {
    const card = document.createElement("div");
    card.className = "card";

    const nombreProducto = document.createElement("h3");
    nombreProducto.innerText = data.nombre;

    const img = document.createElement("img");
    img.src = data.imagen;
    img.className = "img";

    const precio = document.createElement("p");
    precio.innerText = `$${(data.precio * data.cantidad).toFixed(2)}`;

    const cantidad = document.createElement("p");
    cantidad.innerText = `Cantidad: ${data.cantidad}`;

    card.append(nombreProducto, img, precio, cantidad);
    carritoCompras.append(card);
}

fetch('./data.json')
.then(response => response.json())
.then(data => {
    function hacerCard(data) {
        const card = document.createElement("div");
        card.className = "card";
    
        const nombreProducto = document.createElement("h3");
        nombreProducto.innerText = data.nombreDelProd || data.nombre;
    
        const img = document.createElement("img")
        img.src = data.imagen;
        img.className = "img";
    
        const precio = document.createElement("p");
        precio.innerText = data.precio;
    
        const boton = document.createElement("button");
        boton.innerText = "Agregar al carrito";
        boton.className = "botonAgregarAlCarrito"
        boton.onclick = () => agregarAlCarrito(data);
    
        card.append(nombreProducto, img, precio, boton);
        container.append(card);
    };
    
    data.forEach(el => hacerCard(el));
    
    function agregarAlCarrito(data) {
        if (carrito.some(el => el.id === data.id)) {
            const indiceProducto = carrito.findIndex(el => el.id === data.id);
            carrito[indiceProducto].cantidad += 1;
        } else {
            const nuevoProducto = {
                id: data.id,
                nombre: data.nombreDelProd,
                precio: parseFloat(data.precio.replace('$', '')), 
                imagen: data.imagen,
                cantidad: 1,
            };
            carrito.push(nuevoProducto);
        }
    
        Toastify({
            text: `${data.nombreDelProd} agregado al carrito`,
            gravity: "bottom",
            duration: 1500
        }).showToast();
    
        localStorage.setItem("carrito", JSON.stringify(carrito));
    
        actualizarTotalCarrito();
    
        carritoCompras.innerHTML = ""; 
        carrito.forEach(el => cardCarrito(el)); 
    };

})

function actualizarTotalCarrito() {
    const totalCarrito = carrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0);
    const totalCompra = document.querySelector(".total");

    if (totalCompra) {
        totalCompra.innerText = "Total a pagar: $" + totalCarrito.toFixed(2);
    } else {
        const totalCompraNuevo = document.createElement("div");
        totalCompraNuevo.className = "total";
        totalCompraNuevo.innerText = "Total a pagar: $" + totalCarrito.toFixed(2);
        document.getElementById("div-carrito").append(totalCompraNuevo);
    }

    
    localStorage.setItem("totalCarrito", totalCarrito.toFixed(2));
}

document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length > 0) {
        carritoCompras.innerHTML = "";
        carrito.forEach(el => cardCarrito(el));
        actualizarTotalCarrito();
    } else {
        const totalCarrito = localStorage.getItem("totalCarrito") || "0.00";
        const totalCompraNuevo = document.createElement("div");
        totalCompraNuevo.className = "total";
        totalCompraNuevo.innerText = "Total a pagar: $" + totalCarrito;
        document.getElementById("div-carrito").append(totalCompraNuevo);
    }
});

const botonComprar = document.createElement("button");
botonComprar.innerText = "Comprar ahora";
botonComprar.className = "botonComprar";

botonComprar.addEventListener("click", () => {
    if (carrito.length > 0) {
        Swal.fire({
            title: "",
            text: "Gracias por tu compra",
            icon: "success",
        }).then(() => {
            carrito = [];
            localStorage.setItem("carrito", JSON.stringify(carrito));
            carritoCompras.innerHTML = ""; 
            actualizarTotalCarrito(); 
        });
    } else {
        Swal.fire({
            title: "",
            text: "No se pudo realizar la compra, revisa el carrito",
            icon: "error",
        });
    }
});

document.getElementById("botonCompras").append(botonComprar);


const mostrar = document.createElement("button");
mostrar.innerText = "Carrito";
mostrar.className = "mostrar";

mostrar.addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire({
            title: "",
            text: "Tu carrito está vacío",
            icon: "error",
        });
    } else {
        Swal.fire({
            title: "",
            text: "Mira tu carrito mas abajo",
            icon: "warning",
        });
        carritoCompras.innerHTML = ""; 
        carrito.forEach(el => cardCarrito(el));
        actualizarTotalCarrito(); 
    }
});

document.getElementById("div-carrito").append(mostrar);

const limpiar = document.createElement("button");
limpiar.innerText = "Limpiar carrito";
limpiar.className = "limpiar";

limpiar.addEventListener("click", () => {
    if (carrito.length > 0) {
        Swal.fire({
            title: 'Vas a limpiar el carrito, ¿estás seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then(result => {
            if (result.isConfirmed) {
                carrito = [];
                localStorage.setItem("carrito", JSON.stringify(carrito));
                carritoCompras.innerHTML = ""; 
                actualizarTotalCarrito(); 
                Swal.fire({
                    title: "",
                    text: "Limpiaste tu carrito",
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: "",
                    text: "No eliminaste nada del carrito",
                    icon: "error",
                });
            }
        });
    }
});

document.getElementById("div-carrito").append(limpiar);
