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
const confirmDeleteEl = document.getElementById("confirmDelete");



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

    localStorage.setItem("userName", order.username.stringValue);
    localStorage.setItem("adress", order.adress.stringValue);
    localStorage.setItem("article", order.article.integerValue);
    localStorage.setItem("email", order.email.stringValue);
    localStorage.setItem("shipping", order.shipping.stringValue);
    console.log(localStorage.getItem("userName", "adress", "article", "email", "shipping"));

    userNameEl.innerHTML = "<p>Name: " + localStorage.getItem("userName") + "</p>";
    articleEl.innerHTML = "<p>Article number: " + localStorage.getItem("article") + "</p>";
    emailEl.innerHTML=  "<p>Email: " + localStorage.getItem("email") + "</p>";
    adressEl.innerHTML = "<p>Adress: " + localStorage.getItem("adress") + "</p>";
    shippingEl.innerHTML = "<p>Shipping: " + localStorage.getItem("shipping") + "</p>";
}
//skickar ändringar
function makeChanges(number){
console.log(number)
     number; 
     
     
    
    //skriv in samtliga variabler och skicka med till sendChanges()
    switch(number) {
        case 0:
            localStorage.setItem("userName", newUserNameEl.value);
            sendChanges();
            break;
        case 1:
            localStorage.setItem("adress", newAdressEl.value);
            sendChanges();
            break;
        case 2:
            localStorage.setItem("article", newArticleEl.value);
            sendChanges();
            break;
        case 3:
            localStorage.setItem("email", newEmailEl.value);
            sendChanges();
            break;
        case 4:
            localStorage.setItem("shipping", newShippingEl.value);
            sendChanges();
        case 5:
            localStorage.setItem("userName", newUserNameEl.value);
            localStorage.setItem("adress", newAdressEl.value);
            localStorage.setItem("article", newArticleEl.value);
            localStorage.setItem("email", newEmailEl.value);
            localStorage.setItem("shipping", newShippingEl.value);
            sendChanges();
    }
}   
function sendChanges() {

    let body = JSON.stringify({
        "fields": {
            "username": {
                "stringValue": localStorage.getItem("userName")},
            "email": {
                "stringValue": localStorage.getItem("email")},
            "shipping": {
                "stringValue": localStorage.getItem("shipping")} ,
            "adress": {
                "stringValue": localStorage.getItem("adress")},
            "article": {
                "integerValue": localStorage.getItem("article")}    
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
    let article = change.article.integerValue;
    console.log(name,email,adress, shipping,article);

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
    confirmDeleteEl.innerHTML =
        "<p>Ordernumber " + sessionStorage.getItem("order") + " has been successfully deleted.</p>"

}

getOrderEl.addEventListener('click', getOrder);
changeButtonEl.addEventListener('click', makeChanges);
deleteButtonEl.addEventListener('click', deleteOrder);