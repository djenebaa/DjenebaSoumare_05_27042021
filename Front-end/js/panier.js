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
      <td>${res._Id}</td>
      <td>${res.color_choice}</td>
      <td>${res.quantity}</td>
      <td>${res.price}€ </td>
    </tr>
`;
}
// ******************Total***********************
// total();
// function total (){
  
 let total =[];
for(let t = 0; t<resum.length; t++){
  let price = resum[t].price;
  // **********price in total**********
  total.push(price)
}
 const reduce = (accumulator, value) => accumulator + value;
 const total_price = total.reduce(reduce);
 console.log(total_price); 
 document.querySelector(".Total").innerHTML+=`
 Total: ${total_price}€
 `
 localStorage.setItem("total", JSON.stringify(total_price));



// ************************Variable du formulaire 
const submit = document.querySelector("#submit_order");
const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;

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
      (regexMail.test(contact.email) == true) &
      (regexName.test(contact.firstName) == true) &
      (regexName.test(contact.lastName) == true) &
      (regexCity.test(contact.city) == true) &
      (regexAddress.test(contact.address) == true)
  ) {
      e.preventDefault();
      let products = [];
      for (listid of resum) {
          products.push(listid._Id);
      }
 let order ={
     contact, products
 }
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
              localStorage.clear("products")
              localStorage.setItem("order", JSON.stringify(data))
              localStorage.setItem("total", JSON.stringify(total_price))
              document.location.href = "Confirmation.html";
          })
          .catch((erreur) => console.log("erreur : " + erreur));
  } else {
      alert(
          "Please fill in all the fields of the form"
      );
  }
});
}

