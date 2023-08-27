const socket = io.connect('http://localhost:8080')
const form = document.getElementById('idForm')
const botonProds = document.getElementById('botonProductos')



    socket.on('products-data', (products) => {
        const tableBody = document.querySelector("#productsTable tbody");
        let tableContent = '';
        if (products && Array.isArray(products)) {
        products.forEach(product => {
            tableContent += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.title}</td>
                    <td>${product.description}</td>
                    <td>${product.price}</td>
                    <td>${product.thumbnail}</td>
                    <td>${product.code}</td>
                    <td>${product.stock}</td>
                    <td>${product.status}</td>
                </tr>
            `;
        });
    } else {
        console.error('Productos no definidos o no es un array:', products);
    }

        tableBody.innerHTML = tableContent;
        
    });

    
    socket.emit('update-products');