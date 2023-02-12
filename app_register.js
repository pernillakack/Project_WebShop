"use strict";

const orderButtonEl = document.getElementById("orderButton");
const userNameEl = document.getElementById("userName");
const emailEl = document.getElementById("email");  
const adressEl = document.getElementById("adress"); 
const shippingEl = document.getElementById("shipping");
const idEl = document.getElementById("id"); 
const titleEl =document.getElementById("title");
const confirmEl = document.getElementById("confirm");
const registerEl = document.getElementsByClassName("register");

let storedArticle = localStorage.getItem("article");
let storedTitle = localStorage.getItem("title");
let article = storedArticle.toString();

let id2 = JSON.parse(storedArticle);
let title2 = JSON.parse(storedTitle);
console.log(storedArticle);
console.log(id2);

for(let i=0; i<article.length; i++) {
    idEl.innerHTML += article[i];
}

    
//när man skickar sin beställning
function sendOrder() {
    
    let username = userNameEl.value;
    let email = emailEl.value;
    let adress = adressEl.value;
    let shipping = shippingEl.value;
    
    console.log(username, email, adress, shipping, article);

    if(username == ""|| email == "" || adress == "" || shipping == "Choose") {
        alert("You need to fill in all fields!");
        return false;
    }
    else {

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
                "stringValue": article},
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

    
}}
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