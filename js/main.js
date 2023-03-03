import  renderProducts from './utils/renderProducts.js';
import changeLoading from './changeLoader.js';


let PageSize = 20;

let elTop = findElement('#products-top-id');
let elTopTemplate = findElement('#product-template');
let elLangSelect = findElement("#language-select");
let ulCategories = findElement('#categories');
let loginBtn = findElement('#login-btn');
let adminLink = findElement('#admin-link');

let elPaginationList = findElement('.pagination');

let elSearch = findElement('#search');

let products = [];
let favoriteProducts = [];
let categories = [];

///search

elSearch.addEventListener('input', ()=>{
    let value = elSearch.value;


    let  searchResultArray =  products.filter((product)=>{
    

        if (product.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
            return product;
        }
       
    });
    renderProducts(searchResultArray, elTop, elTopTemplate);
})


let allProductCount = 0;
let activePage = 1;

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
        allProductCount = res2.length
        products = res2;

        elPaginationList.innerHTML = `
        <li id="prev" class="opacity-50 page-item page-link">
        &laquo;
        </li>
        `

        for (let i = 0; i < Math.ceil(allProductCount / PageSize); i++) {
            
            let newLi = document.createElement('li');

            newLi.className = 'page-item  page-link page-number';
            newLi.textContent= i + 1;

            if (activePage == i + 1) {
                newLi.style.color = 'white';
                newLi.style.background = 'blue'
            }
            
            elPaginationList.appendChild(newLi)
        }
        elPaginationList.innerHTML += `
        <li id="next" class="page-item  page-link">             
         &raquo;
        </li>
        `
        
       
        renderProducts(res2.slice(0,20), elTop, elTopTemplate);
      
    }
    catch(err){
        alert(err)
    }
    finally {
		changeLoading(false);
	}

}

elPaginationList.addEventListener('click', (evt) => {
    const prevBtn = document.querySelector('#prev');
    const nextBtn = document.querySelector('#next');
   if (evt.target.className.includes('page-number')) {
    const page = evt.target.textContent;
    activePage= page;

   

    renderProducts(products.slice(PageSize * (page-1), PageSize * page), elTop, elTopTemplate);
    
   }
   if (evt.target.id === 'prev') {
      
        if (activePage != 1) {
            activePage--
            renderProducts(products.slice(PageSize * (activePage-1), PageSize * activePage), elTop, elTopTemplate);
           
        }
       
   }
   if (evt.target.id === 'next') {
    activePage++;
    renderProducts(products.slice(PageSize * (activePage-1), PageSize * activePage), elTop, elTopTemplate);
    
}
const lastPage = Math.ceil(products.length / PageSize)

if (activePage == 1) {
    prevBtn.className = 'opacity-50 page-item page-link'
}
else{
    prevBtn.className = 'page-item page-link'
}
elPaginationList.innerHTML = `
<li id="prev" class="${activePage == 1 ? 'opacity-50' : ''} page-item page-link">
&laquo;
</li>
`

for (let i = 0; i < Math.ceil(allProductCount / PageSize); i++) {
    
    let newLi = document.createElement('li');

    newLi.className = 'page-item  page-link page-number';
    newLi.textContent= i + 1;

    if (activePage == i + 1) {
        newLi.style.color = 'white';
        newLi.style.background = 'blue'
    }
    
    elPaginationList.appendChild(newLi)
}
elPaginationList.innerHTML += `
<li id="next" class="${activePage == lastPage ? 'opacity-50' : ''} page-item  page-link">             
 &raquo;
</li>
`
})

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