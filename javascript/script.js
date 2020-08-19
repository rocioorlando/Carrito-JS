// Vector con los productos
var productos = [{
    id: 1,
    nombre: "harina",
    precioUnitario: 35,
    cantidad: 9
},
{
    id: 2,
    nombre: "pan",
    precioUnitario: 25,
    cantidad: 120
},
{
    id: 3,
    nombre: "papa",
    precioUnitario: 52,
    cantidad: 2
},
{
    id: 4,
    nombre: "palta",
    precioUnitario: 55,
    cantidad: 23
},
{
    id: 5,
    nombre: "fideos",
    precioUnitario: 85,
    cantidad: 58
},
];

// Funcion que crea la tabla dinamica
function crearElementoTabla(producto) {

// creo el td donde va a estar el nombre del producto
var tdNombre = document.createElement('td');
var txtNombre = document.createTextNode(producto.nombre);
tdNombre.appendChild(txtNombre);

// creo el td donde va a estar la cantidad
var tdCantidad = document.createElement('td');
var txtCantidad = document.createTextNode(producto.cantidad);
tdCantidad.setAttribute('cellName', 'stock');
tdCantidad.appendChild(txtCantidad);


// Creo el td donde va a estar el precio unitario
var tdPrecio = document.createElement('td');
var txtPrecio = document.createTextNode(producto.precioUnitario);
tdPrecio.appendChild(txtPrecio);

// Creo el input donde se va a elegir cuantos productos quiero
var tdInputCantidad = document.createElement('td');
var inputCantidad = document.createElement('input');
tdInputCantidad.appendChild(inputCantidad);
inputCantidad.setAttribute('type', 'text');

// creo un boton comprar que se va a usar para meter los productos en el array productos comprados
var tdBoton = document.createElement('td');
var btnCompra = document.createElement('button');
var txtBoton = document.createTextNode('Comprar');
btnCompra.setAttribute('id', producto.id);
btnCompra.appendChild(txtBoton);
btnCompra.addEventListener('click', agregarCarrito);
tdBoton.appendChild(btnCompra);


// Creo el tr donde van a estar los datos
var tr = document.createElement('tr');
tr.setAttribute('id', producto.id);
tr.appendChild(tdNombre);
tr.appendChild(tdCantidad);
tr.appendChild(tdPrecio);
tr.appendChild(tdInputCantidad);
tr.appendChild(tdBoton);

// creo el selector de donde quiero que se vea la tabla
var tbody = document.querySelector('tbody');
tbody.appendChild(tr);

}

function crearTablaInventario() {
// Esta funcion recorre el vector item por item, permite reconocer todos los datos
productos.forEach(item => {
    crearElementoTabla(item)
});
}

// Se vuelve a llamar a la funcion para actualizar la tabla
crearTablaInventario()

// Tabla de productos comprados
function crearElementoCompra(compra) {

// Creo el td para el nombre de los productos comprados
var tdNombreCompra = document.createElement('td');
var txtNombreCompra = document.createTextNode(compra.nombre);
tdNombreCompra.appendChild(txtNombreCompra);

// creo el td para la cantidad de productos comprados
var tdCantidadCompra = document.createElement('td');
var txtCantidadCompra = document.createTextNode(compra.cantidad);
tdCantidadCompra.appendChild(txtCantidadCompra);

// Creo el td para el precio por unidad
var tdPrecioCompra = document.createElement('td');
var txtPrecioCompra = document.createTextNode(compra.precioUnitario);
tdPrecioCompra.appendChild(txtPrecioCompra);

// Creo el td para el precio total de la compra de ese producto en particular, vendria a ser un parcial
var tdTotalCompra = document.createElement('td');

// Esta variable calcula el total del producto comprado en la misma fila 
var totalCompra = compra.cantidad * compra.precioUnitario;
var txtTotalCompra = document.createTextNode(totalCompra);
tdTotalCompra.appendChild(txtTotalCompra);

// Creo el boton para borrar el producto en la lista de compra
var tdBotonBorrar = document.createElement('td');
var tdButtonCompra = document.createElement('button');
var txtBotonCompra = document.createTextNode('Borrar');
tdButtonCompra.setAttribute('id', compra.id);
tdButtonCompra.appendChild(txtBotonCompra);
tdButtonCompra.addEventListener('click', borrarProducto);
tdBotonBorrar.appendChild(tdButtonCompra);


// Creo el tr con los datos de los productos comprados
var tr = document.createElement('tr');
tr.appendChild(tdNombreCompra);
tr.appendChild(tdCantidadCompra);
tr.appendChild(tdPrecioCompra);
tr.appendChild(tdTotalCompra);
tr.appendChild(tdBotonBorrar);

// creo el selector de donde quiero que se vea la tabla
var tbody = document.querySelector('.tablaCompra');
tbody.appendChild(tr);

}

// productos.forEach(comprado => {
// crearElementoCompra(comprado)
// });


// // Array donde van a ir los elementos comprados
var carritoCompras = [];

function restaurarStock(id, cantidad) {
// buscamos el item en productos usando el ID
var indexProductoRestaurarStock = productos.findIndex(producto => producto.id == id);
productos[indexProductoRestaurarStock].cantidad += parseInt(cantidad);

// Se llama al llega al ID mediante el get y se le indica el nombre que se le dio a la celda a la que quiere acceder
var celdaStock = document.getElementById(id).querySelector('[cellname="stock"]');
// Se imprime la cantidad que quedo de stock
celdaStock.innerHTML = productos[indexProductoRestaurarStock].cantidad
}

// Funcion que borraria el producto del carrito
function borrarProducto(e) {
// boton tiene como atributo el id del item a borrar
var idProductoBorrar = e.target.getAttribute('id');
// buscamos el item en el carrito usando el id
var indexProductoBorrar = carritoCompras.findIndex(item => item.id == idProductoBorrar);

// buscamos cantidad a borrar para restaurar el stock
var cantidadBorrada = carritoCompras[indexProductoBorrar].cantidad

// borramos item del carrito
carritoCompras.splice(indexProductoBorrar, 1);

// restauramos stock en productos
restaurarStock(idProductoBorrar, cantidadBorrada);

// se llega por los parientes al item que quiero borrar
borrarItem = e.target.parentNode.parentNode;
borrarItem.parentNode.removeChild(borrarItem);
}


// se inicializan las variables en 0
var inserteTotal = document.getElementById('inserteTotal');
var sumaTotal = 0;
var aux = 0;

function totalCompra(){
// Esto sumaria el total de todos los productos
carritoCompras.forEach(unProducto => {
sumaTotal += unProducto.precioUnitario * unProducto.cantidad;
sumaTotal += aux

});

console.log(sumaTotal);
inserteTotal.innerHTML = "El total de la compra es $" + sumaTotal;

}

//Agrega un producto al carrito, se creo una funcion con varios condicionales dentro
function agregarCarrito(e) {
//se creo la variable input y se accedio al valor a traves de los parientes
var input = e.target.parentNode.previousSibling.firstChild;

// Se asigno al valor que se ingresara al input a la variable cuantoCompro
var cuantoCompro = input.value;

// Se creo un condicional que compare la cantidad ingresada en el input en el caso que lo dejen vacio
if (cuantoCompro == '') {
    alert('La cantidad no puede ser 0');
    return;
    
}

// Se creo una variable a la que se asigno el evento al target ID
var idBoton = e.target.id;

// Esta variable busca los productos ya comprados en el carrito y los compara mediante el id 
// para ver si esta dos veces 
var buscarProductosComprados = carritoCompras.findIndex(item => item.id == idBoton);

// Aca tenemos el condicional que nos va a avisar que ya tenemos el producto en el carrito
if (buscarProductosComprados != -1) {
    alert('El producto ya esta en el carrito');
    input.value = '';
    return;
    
}

// Esta variable busca la posicion de todos los productos del vector para luego a traves del numero de index 
// poder acceder a todo los datos del producto
var posicionProducto = productos.findIndex(item => item.id == idBoton);
var producto = productos[posicionProducto];

var id = producto.id;
var nombre = producto.nombre;
var cantidad = producto.cantidad;
var precio = producto.precioUnitario;

// Este condicional indica que no puede ser mayor la cantidad a comprar que la cantidad de productos
if (cuantoCompro > cantidad) {
    alert('No tenemos todos los productos disponibles en este momento');
    input.value = '';
    return;
    
}

// se creo una variable que indique la cantidad que va a ser visible en el stock, se le asigno el valor que 
// tiene la columna cantidad
var cantidad_html = e.target.parentNode.previousSibling.previousSibling.previousSibling;

// se creo una variable que indique el stock y descuenta la cantidad de productos con la cantidad 
// introducida en el input que se la llamo cuantoCompro
var stock = cantidad - cuantoCompro;

// cree un innerHTML que imprima la cantidad que quedo de stock 
cantidad_html.innerHTML = stock;

// Esto hace que el stock sea igual que la cantidad que queda del producto en la primer tabla
producto.cantidad = stock;


// cree una variable con datos aux, deseable es que se vuelquen aca los datos del input 
// y esto se imprima en la lista de productos comprados

var datosAux = {
    id: id,
    nombre: nombre,
    precioUnitario: precio,
    cantidad: cuantoCompro,
};

// se agrega el producto al array
carritoCompras.push(datosAux);
crearElementoCompra(datosAux);
input.value = '';
}