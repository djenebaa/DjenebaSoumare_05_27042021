// *****************Display Cart product**********************
cart_resume()

async function cart_resume() {
const Jsonresume = JSON.parse(localStorage.getItem("product"))
for (res of Jsonresume) {
  displayresume(res)
}
}
function displayresume(res){
document.getElementById("shopping_resume").innerHTML+=`
<div class="resumeinfo">
<p>${res.ProductName}</p>
<ul> 
<li>Id: ${res.infosId}</li>
<li>Color: ${res.color_choice}</li>
<li>Quantity: ${res.quantity}</li>
<li>Price: ${res.price}</li>
</ul>
</div>
`

}
// **************Form *******************************************

let form = document.querySelector("#loginForm");

//ecouter la modification de l'eamil
form.email.addEventListener("change", function(){
  validemail(this)
});
//ecouter la soumission du formulaire
form.addEventListener("submit", function(e){
    e.preventDefault();
    if (validemail(form.email)){
        form.submit();
    }
});



//**********validation Email******** */ 
const validemail = function (inputemail){
// Création de la reg exp pour la validation de l'email
 let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$","g");
 
//recuperation de la balise small
 let small = inputemail.nextElementSibling;

 // On test la regex
 if(emailRegExp.test(inputemail.value)){
  small.innerHTML="Adresse Valide";
  small.classList.remove("text-danger");
  small.classList.add("text-success");
  return true;
 }
 else{
  small.innerHTML="Adresse Non Valide"  
  small.classList.remove("text-success");
  small.classList.add("text-danger");
  return false;
 }

};
// **************Envoi des donnée*****************
        // *******Variable des produits*********
let resum =JSON.parse(localStorage.getItem("product"))
 let products= []
 for (id of resum){
   products.push(id)
 }

       //*************Variable du formulaire de contact
 const contact ={
firstName: document.getElementById("firstName").value,
lastName: document.getElementById("lastName").value,
address: document.getElementById("address").value,
city: document.getElementById("city").value,
email: document.getElementById("email").value,
};


//  console.log(products,`${res.infosId}`);
// let _id = res.infosId
// console.log(_id);
const ship = fetch("http://localhost:3000/api/teddies", {
  method: "POST",
  body: JSON.stringify(contact),
})
 