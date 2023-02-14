function renderProducts(array,parent){
     
    parent.textContent = "";
   
  array.slice(0,20).forEach((product) => {
      let newProduct = elTopTemplate.content.cloneNode(true)
      
       let elTitle = findElement('#title',newProduct);
       let elReiting = findElement('#rating',newProduct);
       let elPrice = findElement('#price',newProduct);
       let elImg = findElement('#card-img-top',newProduct);
  
       elTitle.textContent = product.name;
       elPrice.textContent = product.price + "$";
       elReiting.textContent = '⭐️' + product.rating;
  
       elTop.appendChild(newProduct)
  
  })
}




