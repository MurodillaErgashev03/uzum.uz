let elTop = findElement('#products-top-id');
let elTopTemplate = findElement('#product-template');
let elLangSelect = findElement("#language-select");
let elForm = findElement("#add-form");
let elLoaderPost =  findElement('#loader-post');


elForm.addEventListener("submit", (evt)=>{
    evt.preventDefault();

   let submitBtn = findElement('#submit-btn');
   submitBtn.disabled = "true"

  const elTitle = evt.target.title.value;
  const elImg = evt.target.image.value;
  const elPrice = evt.target.price.value;
  const elRating = evt.target.rating.value;
  const elCategory = evt.target.category.value

  let newProduct ={
        createdAt: new Date(),
        name: elTitle,
        images: elImg ,
        category: elCategory,
        price: elPrice,
        rating: elRating,
  }
  
  elLoaderPost.style.display = "inline-block";
   

   
  fetch(BASE_URL +  '/products',{
    method: "post",
    body: JSON.stringify(newProduct),
    headers:{
        'Content-Type': 'application/json',
    }   
  }).then((res) => res.json())
   .then((data) => {
    console.log(data);
    elLoaderPost.style.display = "none";
    submitBtn.disabled = ""
    window.location.reload();
   })
})

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
       
        renderProducts(res2, elTop, elTopTemplate, true);
      
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
   
   
   if (target.className.includes('btn-danger')) {


       const id = Number(target.dataset.id);
       
       fetch('https://63f5ba8059c944921f6552b8.mockapi.io/products/' + id,{
                    method: "delete",
                }
                )
                .then((res) => res.json())
                .then((res) =>{
                   window.location.reload();
                })
     
    


      renderProducts(products, elTop, elTopTemplate)
   }
})