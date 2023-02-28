function renderProducts(array, parent, template, isAdmin = false) {

  parent.textContent = "";

  array.forEach((product) => {
    const newProduct = template.content.cloneNode(true);


    let svg = findElement('#like ', newProduct);
    let path = findElement('#path', newProduct);

    let elTitle = findElement('#title', newProduct);
    let elReiting = findElement('#rating', newProduct);
    let elPrice = findElement('#price', newProduct);
    let elImg = findElement('.card-img', newProduct);
    let elDiscount = findElement('.card-discount', newProduct);
    let elCatagory = findElement('.catagory' , newProduct);
    let elBody = findElement('#body', newProduct)




    svg.dataset.id = product.id


    if (product.favorite) {
      svg.style.fill = 'red'
    } else {
      svg.style.fill = 'white'
    }




    //admin

    if(isAdmin){
      const deleteBtn = findElement('.btn-danger', newProduct);
      deleteBtn.dataset.id = product.id

    }


    elTitle.textContent = product.name;
    elDiscount.textContent = Math.trunc(product.price) + 10 + "$"

    elPrice.textContent = product.price + "$";
    elReiting.textContent = '⭐️' + product.rating;
    elImg.src = product.images;
    elCatagory.textContent = product.category;


    if(elBody){
    elBody.textContent = product.body;
    }

    elImg.addEventListener('click', ()=> {
      localStorage.setItem('id', product.id)
      window.location.href = '../../pages/single-product.html'
    })


    parent.appendChild(newProduct)

  })
}

export default renderProducts;




