"use strict";

const itemEl = document.getElementById("container");

const buyButtonEl = document.getElementById("buyButton");


fetch("https://fakestoreapi.com/products")
    .then(res=> res.json())
    .then(data=> articles(data));

//skriver ut alla produkter tillsammans med info och bilder    
function articles(products) {
    console.log(products);
    for(const items of products) {
        itemEl.innerHTML += `
        <article id='item'>
        <h3>'${items.title}'<br>'${items.category}'</h3><br>
        <p><i>Article nr: '${items.id}'</i></p><br>
        <img src='${items.image}'style='width:30%'><br>
        <h4>'${items.description}'</h4><br>
        <h6>€ = '${items.price}'</h6><br>
        <input type='button' id='buyButton' class='btn btn-secondary' value='Buy' onclick='buyProduct("${items.id}","${items.title}")'>
        </article><hr>
        `
    }
    
}
//när man väljer en produkt man vill köpa
function buyProduct(id, title){
    localStorage.setItem("product", id );
    localStorage.setItem("title", title);
    console.log(localStorage.getItem("title"));
    
    
}

buyButtonEl.addEventListener('click', buyProduct);
