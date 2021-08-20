let resum = JSON.parse(localStorage.getItem("products"));
//***************Display Cart product**********************
cart_resume();
async function cart_resume() {
  const Jsonresume = JSON.parse(localStorage.getItem("products"));
  for (res of Jsonresume) {
    displayresume(res);
  }
}
function displayresume(res) {
  document.querySelector(".order_resume").innerHTML += `
    <tr>
      <td>${res.ProductName}</td>
      <td>${res.color_choice}</td>
      <td>${res.quantity}</td>
      <td>${res.price}€ </td>
      <td><input type="button" value="Delete" class="delete-btn"> </td>
    </tr>
`;
}
// *****************Panier vide********************
if (resum === null || resum == 0) {
  const emptycart = `
 <div class ="container-emptycart">
 <div> The cart is empty </div>
 </div>
 `;
  document.getElementById("cart_resume").innerHTML = emptycart;
}
// *********************Delete product*************
deleteproduct();
function deleteproduct() {
  let delete_button = document.querySelectorAll(".delete-btn");
  console.log(delete_button);
  for (let i = 0; i < delete_button.length; i++) {
    delete_button[i].addEventListener("click", (e) => {
      e.preventDefault();
      // ************Id du produit a supprimer
      let productdelete = resum[i]._Id;
      console.log(productdelete);
      // ***************Choix element a suppimer************
      resum = resum.filter((elm) => elm._Id !== productdelete);
      console.log(resum);
      // *****************Envoi de le localstorage
      localStorage.setItem("products", JSON.stringify(resum));
      // ****************Alert
      alert("this product as being delete");
      window.location.href = "panier.html";
    });
  }
}
  // ******************Total***********************
    //  ******Price to total******
  let total = [];
  for (let t = 0; t < resum.length; t++) {
    let price = resum[t].price;
    total.push(price);
  }
  const reduce = (accumulator, value) => accumulator + value;
  const total_price = total.reduce(reduce);
  console.log(total_price);
  // **********Price display to html**********
  document.querySelector(".resumetotal").innerHTML += `
 <p>Total : ${total_price}€</p> 
 `;
  //  ***********************Price to localstorage
  localStorage.setItem("total", JSON.stringify(total_price));

  
  // ************************Variable du formulaire
  const submit = document.querySelector("#submit_order");
  const nameregex = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
  const cityregex =
    /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
  const emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
  const addressregex = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;
  let email= document.querySelector("#email");
  let Fname = document.querySelector("#firstName");
  let Lname = document.querySelector("#lastName")
  // *************Email regex valid*******
  email.addEventListener("change", function(){
    validEmail(this)
});
  const validEmail = function (inputEmail){
    //recuperation de la balise small
     let small = inputEmail.nextElementSibling;
    
     // On test la regex
     if(emailregex.test(inputEmail.value)){
      small.innerHTML="Valid email ";
      small.classList.remove("text-danger");
      small.classList.add("text-success");
      return true;
     }
     else{
      small.innerHTML="Invalid email must be : email@gmail.com"  
      small.classList.remove("text-success");
      small.classList.add("text-danger");
      return false;
     }
    
    };
    // ***************firstName regex valid*************
    Fname.addEventListener("change", function(){
      validname(this)
    });
    const validname = function (inputname){
      //recuperation de la balise small
     let small = inputname.nextElementSibling;
    
       // On test la regex
       if(nameregex.test(inputname.value)){
        small.innerHTML="Valid";
        small.classList.remove("text-danger");
        small.classList.add("text-success");
        return true;
       }
       else{
        small.innerHTML="Invalid must not contain number or special caracter"  
        small.classList.remove("text-success");
        small.classList.add("text-danger");
        return false;
       }
      
      };
      // ******************Lastname regex valid*************
      Lname.addEventListener("change", function(){
        validname(this)
      });
      const validLname = function (inputLname){
        //recuperation de la balise small
       let small = inputLname.nextElementSibling;
      
         // On test la regex
         if(nameregex.test(inputLname.value)){
          small.innerHTML="Valid";
          small.classList.remove("text-danger");
          small.classList.add("text-success");
          return true;
         }
         else{
          small.innerHTML="Invalid must not contain number or special caracter "  
          small.classList.remove("text-success");
          small.classList.add("text-danger");
          return false;
         }
        
        };
  // **********************Envoi des information au backend***********************************
  send_order();
  function send_order() {
    submit.addEventListener("click", (e) => {
      // on prépare les infos pour l'envoie en POST
      let contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
      };
      // on valide que le formulaire soit correctement rempli
      if (
        (emailregex.test(contact.email) == true) &
        (nameregex.test(contact.firstName) == true) &
        (nameregex.test(contact.lastName) == true) &
        (cityregex.test(contact.city) == true) &
        (addressregex.test(contact.address) == true)
        )
         {
        e.preventDefault();
        let products = [];
        for (listid of resum) {
          products.push(listid._Id);
        }
        let order = {
          contact,
          products,
        };
        // on envoie en POST
        fetch("http://localhost:3000/api/teddies/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        })
          .then((response) => response.json())
          .then((data) => {
            localStorage.clear("products");
            localStorage.setItem("order", JSON.stringify(data));
            localStorage.setItem("total", JSON.stringify(total_price));
            document.location.href = "Confirmation.html";
          })
          .catch((erreur) => console.log("erreur : " + erreur));
      } 
      else {
        alert("Please fill in all the fields of the form");
      }
    });
  }

