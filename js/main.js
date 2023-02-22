let elTop = findElement('#products-top-id');
let elTopTemplate = findElement('#product-template');
let elLangSelect = findElement("#language-select");

let lang = localStorage.getItem("lang");
elLangSelect.value = lang;

if (lang === "uz") {
    document.title = "Internet do'kon";
}
else if (lang === "eng") {
    document.title = "e-commerce";
}
else if (lang === "ru") {
    document.title = "Интернет магазин";
}

elLangSelect.addEventListener("change", () => {

    let value = elLangSelect.value;

    localStorage.setItem("lang", value);
    lang = value;



    if (lang === "uz") {
        document.title = "Internet do'kon";
    }
    else if (lang === "eng") {
        document.title = "e-commerce";
    }
    else if (lang === "ru") {
        document.title = "Интернет магазин";
    }


})

let BASE_URL = 'https://63f5ba8059c944921f6552b8.mockapi.io/'


let products = [];
let favoriteProducts = [];

function changeLoading(isLoading) {
	if (isLoading) {
		loader.style.display = 'block';
	} else {
		loader.style.display = 'none';
	}
}

const getData = async () => {
    try {
        const res = await fetch(BASE_URL + '/products');
       

        if (res.status === 404 ) {
            throw new Error("Qaytadan urinib ko'ring")
        }
        const res2 = await res.json();
        
        products = res2;
       
        renderProducts(res2, elTop, elTopTemplate);
      
    }
    catch(err){
        alert(err)
    }
    finally {
		changeLoading(false);
	}

}

getData();


elTop.addEventListener('click', (evt) => {
   const target = evt.target;
   
   if (target.id.includes('like')) {
       const id = target.dataset.id;
      products.forEach((product) => {
        if (product.id == id) {
            product.favorite = !product.favorite;
          

            fetch('https://63f5ba8059c944921f6552b8.mockapi.io/products/' + id,{
                method: "PUT",
                body: JSON.stringify({
                    ...product,
                    favorite: product.favorite,
                }),
                headers:{
                    'Content-Type': 'application/json',
                }
            }
            )
            .then((res) => res.json())
            .then((res) =>{
                console.log(res)
            })
        }
      });
      renderProducts(products, elTop, elTopTemplate)
   }
})