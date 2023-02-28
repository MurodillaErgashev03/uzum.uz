import  renderProducts from "../js/utils/renderProducts.js"

let templete = findElement('#product-template');
let minus = document.querySelector('#amountMinus');
// console.log(minus)



let card = findElement('#card');


// btnPlus.addEventListener( "click", (evt)=>{
// 	console.log('click')
// });


const id = localStorage.getItem('id');

fetch('https://63f5ba8059c944921f6552b8.mockapi.io/products/' + id,)
	.then((res) => res.json())
	.then((data) => {
	

		renderProducts([data], card, templete);
	});

// console.log(id)