import  renderProducts from './utils/renderProducts.js';
import changeLoading from './changeLoader.js';

const template = findElement('#product-template');
const elParent = findElement('.products-favorites');

let favouriteProduct = [];

fetch('https://63f5ba8059c944921f6552b8.mockapi.io/products/')
    .then((res) => res.json())
    .then((data) => {

        let result = data.filter((product) => {
            console.log(data)
            if (product.favorite) {
                return product;
            }
        });

       
        

        favouriteProduct = result;

        if (favouriteProduct.length == 0) {
            alert("Maxsulot yo'q")
        };


        renderProducts(result, elParent, template);


    });


elParent.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target.id.includes('like')) {
        const id = target.dataset.id;
        favouriteProduct.forEach((product) => {
            if (product.id == id) {
                product.favorite = !product.favorite;


                fetch('https://63f5ba8059c944921f6552b8.mockapi.io/products/' + id, {
                    method: "PUT",
                    body: JSON.stringify({
                        ...product,
                        favorite: product.favorite,
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
 
                                  
                                    if (product.favorite) {
                                        return product;
                                    }
                                });
                                
                              
                                favouriteProduct = result;
                                renderProducts(result, elParent, template);


                            });
                    })
            }
        });
       
    }
})