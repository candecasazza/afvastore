let productos;

document.addEventListener('DOMContentLoaded', cargaInicial);

function cargaInicial() {
	$.ajax({
		url: 'db.json',
		success: function (data) {
			console.log(data)
			productos = data;
			diagramarZapas();
			loadCarrito();
		},
		error: function (error, jqXHR, status) {
			console.log(error);
		}
	}
	)
}

const carrito = localStorage.carrito ? JSON.parse(localStorage.carrito) : [];

var divProductos = document.querySelector("#grilla_productos");
var divCarrito = document.querySelector("#contenedor_carrito");
var divTotal = document.querySelector("#contenedor_total");

//------------------------------------------------------------------------

function diagramarZapas() {
	console.log(productos)
	productos.forEach((producto) => {
		let divIn = document.createElement("div");
		divIn.style.border = "1px solid white";
		divIn.style.float = "left";
		divIn.style.margin = "50px";
		divIn.className = "producto";
		divIn.innerHTML = `<img src=${producto.img} alt="${producto.marca
			}" style="height: 100px; width:100px">
    <h2>${producto.marca}</h2>
    <h4>${producto.nombre}</h4>
    <button onclick="agregarACarrito(${productos.indexOf(
				producto
			)})">Agregar al carrito</button>
    <p>$ ${producto.precio}</p>`;

		divProductos.appendChild(divIn);
	});
}

//------------------------------------------------------------------------

function inputChange(e) {
	if (e.target.value == 0) {
		carrito.splice(e.target.name, 1);
	} else {
		carrito[e.target.name].cantidad = e.target.value;
	}
	loadCarrito();
	localStorage.carrito = JSON.stringify(carrito);
}

//------------------------------------------------------------------------

function agregarACarrito(index) {
	var producto = productos[index];
	if (carrito.length > 0) {
		var noExiste = true;
		for (var i = 0; i < carrito.length; i++) {
			if (producto.id === carrito[i].id) {
				carrito[i].cantidad++;
				noExiste = false;
			}
		}
		if (noExiste) {
			producto.cantidad = 1;
			carrito.push(producto);
		}
	} else {
		producto.cantidad = 1;
		carrito.push(producto);
	}
	loadCarrito();
	localStorage.carrito = JSON.stringify(carrito);
}

//------------------------------------------------------------------------

function loadCarrito() {
	divCarrito.innerHTML = "";
	divTotal.innerHTML = "";

	if (carrito.length > 0) {
		var sumador = 0;
		carrito.forEach((producto) => {
			let divCar = document.createElement("div");
			divCar.style = "clear:both; style:margin: 10px 0 10px 0";
			divCar.innerHTML = `<p>${producto.marca} ${producto.nombre} X${producto.cantidad} $ ${producto.precio * producto.cantidad
				}</p><input name="${carrito.indexOf(
					producto
				)}" style="float:left; width:50px;   vertical-align: baseline;
      " value="${producto.cantidad}" onchange="inputChange(event)"> 
      <button style="float:left" onclick="removerCarrito(${carrito.indexOf(
					producto
				)})">Remover</button>`;
			divCarrito.appendChild(divCar);
			sumador = sumador + producto.precio * producto.cantidad;
		});

		let divTot = document.createElement("p");
		divTot.style = "clear: both";
		divTot.innerHTML = `Total: $ ${sumador}`;
		divTotal.appendChild(divTot);
	}
}

//------------------------------------------------------------------------

function removerCarrito(index) {
	carrito[index].cantidad = carrito[index].cantidad - 1;
	if (carrito[index].cantidad <= 0) {
		carrito.splice(index, 1);
	}
	localStorage.carrito = JSON.stringify(carrito);
	loadCarrito();
}

//------------------------------------------------------------------------



//---------------------------------formulario---------------------------------------

