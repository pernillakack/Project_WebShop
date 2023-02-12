"use strict";

const itemEl = document.getElementById("allproducts");
const electronicsEl = document.getElementById("electronics");
const jeweleryEl = document.getElementById("jewelery");
const menEl = document.getElementById("men");
const womenEl = document.getElementById("women");

const buyButtonEl = document.getElementById("buyButton");
const categoryEl = document.getElementById("category");

let id = [];
let title = [];

fetch("https://fakestoreapi.com/products")
.then(res=> res.json())
.then(data=> showAllProducts(data));

function showAllProducts(products) {
    console.log(products);
    
    for(const items of products) {
        itemEl.innerHTML += `
        <article id='item'>
        <h3>'${items.title}'<br>'${items.category}'</h3><br>
        <p><i>Article nr: '${items.id}'</i></p><br>
        <img src='${items.image}'style='width:30%'><br>
        <h4>'${items.description}'</h4><br>
        <h5>Rating: '${items.rating.rate}' Count: '${items.rating.count}'</h5><br>
        <h6>€ = '${items.price}'</h6><br>
        <input type='button' id='buyButton' class='btn btn-secondary' value='Buy' onclick='buyProduct("${items.id}","${items.title.replace("'", "")}")'>
        </article><hr>
        `
    
}
}
//väljer kategori

function chooseCategory(){
    let choice = document.getElementById("category").value;

    switch(choice) {
        case "Electronics":
            fetch("https://fakestoreapi.com/products/category/electronics")
            .then(res=> res.json())
            .then(data=> showElectronics(data));
            itemEl.classList.add("hide");
            jeweleryEl.classList.add("hide");
            menEl.classList.add("hide");
            womenEl.classList.add("hide");
            electronicsEl.classList.remove("hide");    
        break;
        case "Jewelery":
            fetch("https://fakestoreapi.com/products/category/jewelery")
            .then(res=> res.json())
            .then(data=> showJewelery(data));
            itemEl.classList.add("hide");
            electronicsEl.classList.add("hide");
            menEl.classList.add("hide");
            womenEl.classList.add("hide");  
            jeweleryEl.classList.remove("hide"); 
        break;
        case "Men's clothing":
            fetch("https://fakestoreapi.com/products/category/men's clothing")
            .then(res=> res.json())
            .then(data=> showMen(data));
            itemEl.classList.add("hide");
            jeweleryEl.classList.add("hide");
            electronicsEl.classList.add("hide");
            womenEl.classList.add("hide");  
            menEl.classList.remove("hide");  
            break;
        case "Women's clothing":
            fetch("https://fakestoreapi.com/products/category/women's clothing")
            .then(res=> res.json())
            .then(data=> showWomen(data));
            itemEl.classList.add("hide");
            jeweleryEl.classList.add("hide");
            electronicsEl.classList.add("hide");
            menEl.classList.add("hide"); 
            womenEl.classList.remove("hide");   
            break;
            case "All":
                menEl.classList.add("hide");
                jeweleryEl.classList.add("hide");
                electronicsEl.classList.add("hide");
                womenEl.classList.add("hide"); 
                itemEl.classList.remove("hide");       
    }
}
function showElectronics(products) {
    console.log(products);
    
    for(const items of products) {
        electronicsEl.innerHTML += `
        <article id='item'>
        <h3>'${items.title}'<br>'${items.category}'</h3><br>
        <p><i>Article nr: '${items.id}'</i></p><br>
        <img src='${items.image}'style='width:30%'><br>
        <h4>'${items.description}'</h4><br>
        <h5>Rating: '${items.rating.rate}' Count: '${items.rating.count}'</h5>
        <h6>€ = '${items.price}'</h6><br>
        <input type='button' id='buyButton' class='btn btn-secondary' value='Buy' onclick='buyProduct("${items.id}","${items.title.replace("'", "")}")'>
        </article><hr>
        `
    
}
}
function showJewelery(products) {
    console.log(products);
    
    for(const items of products) {
        jeweleryEl.innerHTML += `
        <article id='item'>
        <h3>'${items.title}'<br>'${items.category}'</h3><br>
        <p><i>Article nr: '${items.id}'</i></p><br>
        <img src='${items.image}'style='width:30%'><br>
        <h4>'${items.description}'</h4><br>
        <h5>Rating: '${items.rating.rate}' Count: '${items.rating.count}'</h5>
        <h6>€ = '${items.price}'</h6><br>
        <input type='button' id='buyButton' class='btn btn-secondary' value='Buy' onclick='buyProduct("${items.id}","${items.title.replace("'", "")}")'>
        </article><hr>
        `
    }
}
function showMen(products) {
    console.log(products);
    
    for(const items of products) {
        menEl.innerHTML += `
        <article id='item'>
        <h3>'${items.title}'<br>'${items.category}'</h3><br>
        <p><i>Article nr: '${items.id}'</i></p><br>
        <img src='${items.image}'style='width:30%'><br>
        <h4>'${items.description}'</h4><br>
        <h5>Rating: '${items.rating.rate}' Count: '${items.rating.count}'</h5>
        <h6>€ = '${items.price}'</h6><br>
        <input type='button' id='buyButton' class='btn btn-secondary' value='Buy' onclick='buyProduct("${items.id}","${items.title.replace("'", "")}")'>
        </article><hr>
        `
    }
}
function showWomen(products) {
    console.log(products);
    
    for(const items of products) {
        womenEl.innerHTML += `
        <article id='item'>
        <h3>'${items.title}'<br>'${items.category}'</h3><br>
        <p><i>Article nr: '${items.id}'</i></p><br>
        <img src='${items.image}'style='width:30%'><br>
        <h4>'${items.description}'</h4><br>
        <h5>Rating: '${items.rating.rate}' Count: '${items.rating.count}'</h5>
        <h6>€ = '${items.price}'</h6><br>
        <input type='button' id='buyButton' class='btn btn-secondary' value='Buy' onclick='buyProduct("${items.id}","${items.title.replace("'", "")}")'>
        </article><hr>
        `
    }
}

//när man väljer en produkt man vill köpa
function buyProduct(items_id, items_title){

    
    id.push(items_id);
    title.push(items_title);
    console.log(id, title);

    localStorage.setItem("article", JSON.stringify(id));
    localStorage.setItem("title", JSON.stringify(title));


    console.log(localStorage.getItem("article"));
    console.log(localStorage.getItem("title"));
    
    console.log(id, title);
}



