let elTop = findElement('#products-top-id');
let elTopTemplate = findElement('#product-template');
let elLangSelect = findElement("#language-select");

let  lang = localStorage.getItem("lang");
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



renderProducts(products, elTop);