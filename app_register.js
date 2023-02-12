"use strict";

const orderButtonEl = document.getElementById("orderButton");
const userNameEl = document.getElementById("userName");
const emailEl = document.getElementById("email");  
const adressEl = document.getElementById("adress"); 
const shippingEl = document.getElementById("shipping");
const idEl = document.getElementsByClassName("id"); 
const titleEl =document.getElementsByClassName("title");
const confirmEl = document.getElementById("confirm");
const emptyEl = document.getElementById("empty");

let storedArticle = sessionStorage.getItem("article");
let storedTitle = sessionStorage.getItem("title");
let article = storedArticle.toString();

let id2 = JSON.parse(storedArticle);
let title2 = JSON.parse(storedTitle);
console.log(storedArticle);

for(let i=0; i<id2.length; i++) {
    if(id2[i]>0) {
    idEl.innerHTML += "<td>" +id2[i]+"</td>";
    console.log(id2[i]);
    for(let j=0; j<title2.length; j++) {
        titleEl.innerHTML += "<td>" +title2[j]+ "</td>";
        console.log(title2[j]);
    }
    }
    else {
        emptyEl.innerHTML = "You haven't chosen any articles yet.";
    }
}



    
//när man skickar sin beställning
function sendOrder() {
    // if(required === "false") {
    //     alert("You need to fill in all fields!");
    // }
    let username = userNameEl.value;
    let email = emailEl.value;
    let adress = adressEl.value;
    let shipping = shippingEl.value;
    
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

    sessionStorage.clear();
}

orderButtonEl.addEventListener('click', sendOrder);