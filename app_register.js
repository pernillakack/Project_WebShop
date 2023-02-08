"use strict";

const orderButtonEl = document.getElementById("orderButton");
const userNameEl = document.getElementById("userName");
const emailEl = document.getElementById("email");  
const adressEl = document.getElementById("adress"); 
const shippingEl = document.getElementById("shipping");
const articleEl = document.getElementById("article"); 
const titleEl =document.getElementById("title");
const confirmEl = document.getElementById("confirm");
const priceEl = document.getElementById("price");


    articleEl.innerHTML = localStorage.getItem("article");
    titleEl.innerHTML = localStorage.getItem("title");
    priceEl.innerHTML = localStorage.getItem("price");
    console.log(localStorage.getItem("article", "title", "price"));


//när man skickar sin beställning
function sendOrder() {
    
    let username = userNameEl.value;
    let email = emailEl.value;
    let adress = adressEl.value;
    let shipping = shippingEl.value;
    let article = localStorage.getItem("article");
    console.log(username, email, adress, shipping, article);

    let body = JSON.stringify({
        
        "fields": {
            "username": {
                "stringValue": username},
            "email": {
                "stringValue": email},
            "shipping": {
                "stringValue": shipping} ,
            "adress": {
                "stringValue": adress},
            "article": {
                "integerValue": article},
        }
    
    })

    fetch("https://firestore.googleapis.com/v1/projects/numberone-webshop/databases/(default)/documents/orders", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
        .then (res=> res.json())
        .then(data=> confirmation(data));

    
}
//skriver ut en konfirmation om att beställningen registrerats
function confirmation(data) {
    
    console.log(data);
    let orderlink = data.name;
    console.log(orderlink);
    let ordernr = orderlink.substring(64);
    console.log(ordernr);

    confirmEl.innerHTML = 
        `Your order has been registered.<br>Please note your ordernumber: '${ordernr}';`

    localStorage.clear();
}

orderButtonEl.addEventListener('click', sendOrder);