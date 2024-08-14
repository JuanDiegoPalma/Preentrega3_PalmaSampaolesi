function agregarAlCarrito(producto){

    if(carrito.some(el => el.id === producto.id)){
        const indiceProducto = carrito.findIndex(el => el.id === producto.id);
        carrito[indiceProducto].cantidad += 1;
    } else {
        const nuevoProducto = {
            id: producto.id,
            nombre: producto.nombreDelProd,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1,
        };
        carrito.push(nuevoProducto);
    };

    localStorage.setItem("carrito", JSON.stringify(carrito));

};

function hacerCard(producto){
    const card = document.createElement("div");
    card.className = "card";

    const nombreProducto = document.createElement("h3");
    nombreProducto.innerText = producto.nombreDelProd || producto.nombre;

    const img = document.createElement("img")
    img.src = producto.imagen|| producto.imagen;
    img.className = "img";

    const precio = document.createElement("p");
    precio.innerText = producto.precio;

    const boton = document.createElement("button");
    boton.innerText = "Agregar al carrito";
    boton.onclick = () => agregarAlCarrito(producto);

    card.append(nombreProducto);
    card.append(img);
    card.append(precio);
    card.append(boton);

    container.append(card);

};
producto.forEach(el => hacerCard(el));


    const mostrar = document.createElement("button");
    mostrar.innerText = "Mostrar carrito";

    mostrar.addEventListener("click", () => {
    carrito.forEach(el => hacerCard(el));
});

container.append(mostrar);

const limpiar = document.createElement("button");
limpiar.innerText = "Limpiar carrito";

limpiar.addEventListener("click", () => {
    carrito = [];

    localStorage.setItem("carrito", JSON.stringify(carrito));
});

container.append(limpiar);