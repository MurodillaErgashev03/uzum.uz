import  renderProducts from './utils/renderProducts.js';
import changeLoading from './changeLoader.js';

const template = findElement('#product-template');
const elParent = findElement('.products-favorites');

let basketProduct = [];

fetch('https://63f5ba8059c944921f6552b8.mockapi.io/products/')
    .then((res) => res.json())
    .then((data) => {

        let result = data.filter((product) => {
            console.log(data)
            if (product.basket) {
                return product;
            }
        });

       
        

        basketProduct = result;

        if (basketProduct.length == 0) {
            alert("Maxsulot yo'q")
        };


        renderProducts(result, elParent, template);


    });


elParent.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target.className.includes('savat')) {
        const id = target.dataset.id;
        basketProduct.forEach((product) => {
            if (product.id == id) {
                product.basket = !product.basket;


                fetch('https://63f5ba8059c944921f6552b8.mockapi.io/products/' + id, {
                    method: "PUT",
                    body: JSON.stringify({
                        ...product,
                        basket: product.basket,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
                )
                    .then((res) => res.json())
                    .then((res) => {
                        console.log(res)
                        fetch('https://63f5ba8059c944921f6552b8.mockapi.io/products/')
                            .then((res) => res.json())
                            .then((data) => {
                                let result = data.filter((product) => {
 
                                  
                                    if (product.basket) {
                                        return product;
                                    }
                                });
                                
                              
                                basketProduct = result;
                                renderProducts(result, elParent, template);


                            });
                    })
            }
        });
       
    }
})