"use strict";

const getOrderEl = document.getElementById("getOrder");
const orderNumberEl = document.getElementById("orderNumber");
const orderEl = document.getElementById("showOrder");

const userNameEl =document.getElementById("userName");
const articleEl = document.getElementById("article");
const emailEl = document.getElementById("email");
const adressEl = document.getElementById("adress");
const shippingEl = document.getElementById("shipping");
const changeButtonEl = document.getElementById("changeButton");
const deleteButtonEl =document.getElementById("deleteButton");
const changeNameEl = document.getElementById("changeName");
const changeEmailEl = document.getElementById("changeEmail");
const changeAdressEl = document.getElementById("changeAdress");
const changeArticleEl = document.getElementById("changeArticle");
const changeShippingEl = document.getElementById("changeShipping");

const newUserNameEl = document.getElementById("newUserName");
const newArticleEl= document.getElementById("newArticle");
const newEmailEl= document.getElementById("newEmail");
const newAdressEl = document.getElementById("newAdress");
const newShippingEl = document.getElementById("newShipping");

const confirmChangesEl = document.getElementById("confirmChanges");




//hämtar en order för administration
function getOrder() {
    
    let order = orderNumberEl.value;
    sessionStorage.setItem("order", order);
    console.log(order);
    
    fetch("https://firestore.googleapis.com/v1/projects/numberone-webshop/databases/(default)/documents/orders/" + order)
        .then(res=> res.json())
        .then(data=> printOrder(data));
  
}

//printar ut hämtad order
function printOrder(data) {
    console.log(data);
    let order = data.fields;
    console.log(order);

    sessionStorage.setItem("userName", order.username.stringValue);
    sessionStorage.setItem("adress", order.adress.stringValue);
    sessionStorage.setItem("article", order.article.stringValue);
    sessionStorage.setItem("email", order.email.stringValue);
    sessionStorage.setItem("shipping", order.shipping.stringValue);
    console.log(sessionStorage.getItem("userName", "adress", "article", "email", "shipping"));

    userNameEl.innerHTML = "<p>Name: " + sessionStorage.getItem("userName") + "</p>";
    articleEl.innerHTML = "<p>Article number: " + sessionStorage.getItem("article") + "</p>";
    emailEl.innerHTML=  "<p>Email: " + sessionStorage.getItem("email") + "</p>";
    adressEl.innerHTML = "<p>Adress: " + sessionStorage.getItem("adress") + "</p>";
    shippingEl.innerHTML = "<p>Shipping: " + sessionStorage.getItem("shipping") + "</p>";
}
//skickar ändringar
function makeChanges(number){
console.log(number)
    //skriv in samtliga variabler och skicka med till sendChanges()
    switch(number) {
        case 0:
            sessionStorage.setItem("userName", newUserNameEl.value);
            sendChanges();
            break;
        case 1:
            sessionStorage.setItem("adress", newAdressEl.value);
            sendChanges();
            break;
        case 2:
            sessionStorage.setItem("article", newArticleEl.value);
            sendChanges();
            break;
        case 3:
            sessionStorage.setItem("email", newEmailEl.value);
            sendChanges();
            break;
        case 4:
            sessionStorage.setItem("shipping", newShippingEl.value);
            sendChanges();
        case 5:
            sessionStorage.setItem("userName", newUserNameEl.value);
            sessionStorage.setItem("adress", newAdressEl.value);
            sessionStorage.setItem("article", newArticleEl.value);
            sessionStorage.setItem("email", newEmailEl.value);
            sessionStorage.setItem("shipping", newShippingEl.value);
            sendChanges();
    }
}   
function sendChanges() {

    let body = JSON.stringify({
        "fields": {
            "username": {
                "stringValue": sessionStorage.getItem("userName")},
            "email": {
                "stringValue": sessionStorage.getItem("email")},
            "shipping": {
                "stringValue": sessionStorage.getItem("shipping")} ,
            "adress": {
                "stringValue": sessionStorage.getItem("adress")},
            "article": {
                "stringValue": sessionStorage.getItem("article")}    
            }            
    })
    fetch("https://firestore.googleapis.com/v1/projects/numberone-webshop/databases/(default)/documents/orders/" + sessionStorage.getItem("order"),{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
        .then(res=> res.json())
        .then(data=>confirmChanges(data));

}
function confirmChanges(data) {
    console.log(data);
    let change = data.fields;
    let name = change.username.stringValue;
    let email = change.email.stringValue;
    let adress = change.adress.stringValue;
    let shipping = change.shipping.stringValue;
    let article = change.article.stringValue;
    console.log(name,email,adress,shipping,article);

    confirmChangesEl.innerHTML = `
        <p>The order with ordernumber '${sessionStorage.getItem("order")}' has been changed.<br>
        This is the current information: <br>
        Name: '${name}' <br>
        Email: '${email}' <br>
        Adress: '${adress}' <br>
        Shipping: '${shipping}' <br>
        Articlenr: '${article}'</p>
    `
    orderEl.reset();
}

function deleteOrder() {
    fetch("https://firestore.googleapis.com/v1/projects/numberone-webshop/databases/(default)/documents/orders/"+ sessionStorage.getItem("order"),{
        method: 'DELETE'})
        .then(res=> res.json())
        .then(data=> confirmDelete(data));
}

function confirmDelete(data) {
    console.log(data);
    confirmChangesEl.innerHTML =
        "<p>Ordernumber " + sessionStorage.getItem("order") + " has been successfully deleted.</p>"

}

getOrderEl.addEventListener('click', getOrder);
changeButtonEl.addEventListener('click', makeChanges);
deleteButtonEl.addEventListener('click', deleteOrder);