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
    let userName = order.username.stringValue;
    let article = order.article.integerValue;
    let email = order.email.stringValue;
    let adress = order.adress.stringValue;
    let shipping = order.shipping.stringValue;
    

    userNameEl.innerHTML = "<p>Name: " +userName + "</p>";
    articleEl.innerHTML = "<p>Article number: " + article + "</p>";
    emailEl.innerHTML=  "<p>Email: " + email + "</p>";
    adressEl.innerHTML = "<p>Adress: " + adress + "</p>";
    shippingEl.innerHTML = "<p>Shipping: "+ shipping+ "</p>";
    
}
//skickar ändringar
function sendChanges(){
    
    let newUserName = newUserNameEl.value;
    console.log(newUserName);
    let newArticle= newArticleEl.value;
    let newEmail = newEmailEl.value;
    let newAdress = newAdressEl.value;
    let newShipping = newShippingEl.value;
    console.log(newUserName, newArticle, newEmail, newAdress, newShipping);
   


    let body = JSON.stringify({
        "fields": {
            "username": {
                "stringValue": newUserName},
            "email": {
                "stringValue": newEmail},
            "shipping": {
                "stringValue": newShipping} ,
            "adress": {
                "stringValue": newAdress},
            "article": {
                "integerValue": newArticle}    
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
changeButtonEl.addEventListener('click', sendChanges);
deleteButtonEl.addEventListener('click', deleteOrder);