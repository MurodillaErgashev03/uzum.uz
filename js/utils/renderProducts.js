function renderProducts(array,parent){
     
    parent.textContent = "";
   
  array.slice(0,20).forEach((product) => {
      let newProduct = elTopTemplate.content.cloneNode(true)
      
       let elTitle = findElement('#title',newProduct);
       let elReiting = findElement('#rating',newProduct);
       let elPrice = findElement('#price',newProduct);
       let elImg = findElement('#card-img-top',newProduct);
       let elDiscount  = findElement('.card-discount' , newProduct);
  
       elTitle.textContent = product.title;
       elDiscount.textContent = Math.trunc(product.price) + 10 + "$"
       elPrice.textContent = product.price + "$";
       elReiting.textContent = '⭐️' + '3';
  
       elTop.appendChild(newProduct)
  
  })
}




