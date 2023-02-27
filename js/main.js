import  renderProducts from './utils/renderProducts.js';
import changeLoading from './changeLoader.js';

let elTop = findElement('#products-top-id');
let elTopTemplate = findElement('#product-template');
let elLangSelect = findElement("#language-select");
let ulCategories = findElement('#categories');
let loginBtn = findElement('#login-btn');
let adminLink = findElement('#admin-link');


let token = localStorage.getItem('token');


if (token) {
    loginBtn.textContent = "Chiqish";
    adminLink.style.display = "block";
}
else{
    loginBtn.textContent = "Kirish";
    adminLink.style.display = "none";
}

loginBtn.addEventListener('click', ()=> {

   let token = localStorage.getItem('token'); 
    if(token){
        adminLink.style.display = "none";
        localStorage.removeItem('token');
        loginBtn.textContent = "Kirish"
    }
    else{
    window.location.href = '../pages/login.html'
    }
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
let categories = [];


fetch( BASE_URL + 'categories').then((res) => res.json()).then((res) => {
   res.forEach((catagory) => {
       categories = res;
       renderCategories(categories, ulCategories)
   })
}) 



const renderCategories = (array , parent ) =>{
        array.splice(0,10).forEach((category)  => {
         
            const newLi = document.createElement('li')
            newLi.className = 'header-bottom__item-list';

            newLi.textContent = category.name;
            parent.appendChild(newLi);
        })
}



ulCategories.addEventListener('click', (evt)=>{
    const target = evt.target;
  if(target.className.includes('header-bottom__item-list')){
    
    const catagory = target.textContent;
    const result = [];
    
    products.forEach((product)=>{
        if (product.category === catagory) {
        
           result.push(product)
        }
    })
    renderProducts(result, elTop, elTopTemplate);
  }
})

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
                    "Authorization" : "Bearer " + token,
                    'Content-Type': 'application/json',
                }
            }
            )
            .then((res) => res.json())
            .then((res) =>{
                
            })
        }
      });
      renderProducts(products, elTop, elTopTemplate)
   }
})