class Carrito {

    comprarProducto(e) {
        e.preventDefault();
        if (e.target.classList.contains('agregar-carrito')) {
            const producto = e.target.parentElement.parentElement;

            this.leerDatosProducto(producto);
        }
    }

    //DATOS PRODUCTOS
    leerDatosProducto(producto) {
        const infoProducto = {
            titulo: producto.querySelector('h4').textContent,
            precio: producto.querySelector('.precio span').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS){
            if(productoLS.id === infoProducto.id){
                productosLS = productoLS.id;
            }   
        });

        if(productosLS === infoProducto.id){
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'El producto ya está agregado',
                showConfirmButton: false,
                timer: 1000
            })     
        }
        else {
            this.insertarCarrito(infoProducto);
        }
    }

//PRODUCTOS DEL CARRITO
    insertarCarrito(producto) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
            </td>
        `;
        listaProductos.appendChild(row);
        this.guardarProductoLocalStorage(producto);
    }


    eliminarProducto(e) {
        e.preventDefault();
        let producto, productoID;
        if (e.target.classList.contains('borrar-producto')) {
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
        }        
        this.eliminarProductoLocalStorage(productoID);
    
    }

    //Elimina los productos del carrito
    vaciarCarrito(e) {
        e.preventDefault();
        
        while (listaProductos.firstChild) {
            listaProductos.removeChild(listaProductos.firstChild);
        }
        
      
        this.vaciarLocalStorage();

        return false;
    }


    guardarProductoLocalStorage(producto) {
        let productos;
     
        productos = this.obtenerProductosLocalStorage();
      
        productos.push(producto);
     
        localStorage.setItem('productos', JSON.stringify(productos));

    }


    obtenerProductosLocalStorage() {
        let productosLS;

      
        if (localStorage.getItem('productos') === null) {
            productosLS = [];
        }
        else {
            productosLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productosLS;
    }

    


    leerLocalStorage() {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();

        productosLS.forEach(function (producto) {
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
                </td>
            `;
            listaProductos.appendChild(row);
        });

    }

    leerLocalStorageCompra() {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto) {
                   
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                
                <td>
                    <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
                </td>
                <td id="subtotall">${producto.precio * producto.cantidad}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${producto.id}"></a>
                </td>
            `;
            listaCompra.appendChild(row);
        });
    }

   
    eliminarProductoLocalStorage(productoID){
        let productosLS;
       
        productosLS = this.obtenerProductosLocalStorage();
       
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productosLS.splice(index,1);
            }
        });
       //ARREGLO JSON
        localStorage.setItem('producto', JSON.stringify(productosLS));
    }

    vaciarLocalStorage(){
        localStorage.clear();
    }

    //PROCESO DE PEDIDO
    procesarPedido(e){
        e.preventDefault();
        console.log();
        if(this.obtenerProductosLocalStorage().length === 0){            
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'El carrito está vacío',
                    showConfirmButton: false,
                    timer: 2000
                })
        }
        else{
            location.href="compra.html";
        }
    }

    obtenerEvento(e) {
        e.preventDefault();
        let id, cantidad, producto, productoLS;
        console.log(e.target.classList);
        if (e.target.classList.contains('cantidad')) {
            producto = e.target.parentElement.parentElement;
            id = producto.querySelector('a').getAttribute('data-id');
            cantidad = producto.querySelector('input').value;
            let productosLS = this.obtenerProductosLocalStorage();
            productosLS.forEach(function (productoLS, index) {
                if (productoLS.id === id) {
                    productoLS.cantidad = cantidad;
                }
    
            });
            localStorage.setItem('producto', JSON.stringify(productosLS));
        }
    } 
}