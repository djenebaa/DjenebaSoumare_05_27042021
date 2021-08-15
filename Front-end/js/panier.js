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
  document.getElementById("shopping_resume").innerHTML += `
<div class="resumeorder">
<p>${res.ProductName}</p>
<ul> 
<li>Id: ${res._Id}</li>
<li>Color: ${res.color_choice}</li>
<li>Quantity: ${res.quantity}</li>
<li>Price: ${res.price}</li>
</ul>
</div>
`;
}


// //**********validation Email******** *
//   // Création de la reg exp pour la validation de l'email
//   let emailRegExp = new RegExp(
//     "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
//     "g"
//   );

//   //recuperation de la balise small
//   let small = inputemail.nextElementSibling;

//   // On test la regex
//   if (emailRegExp.test(inputemail.value)) {
//     small.innerHTML = "Adresse Valide";
//     small.classList.remove("text-danger");
//     small.classList.add("text-success");
//     return true;
//   } else {
//     small.innerHTML = "Adresse Non Valide";
//     small.classList.remove("text-success");
//     small.classList.add("text-danger");
//     return false;
//   }
// ;

// // // **************Envoi des donnée*****************
const submit = document.querySelector("#submit_order");
const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;

submit.addEventListener("click", (event) => {
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
      event.preventDefault();

      // // on stocke l'heure et la date de la commande
      // const todayDate = new Date();
      // let nowadays = todayDate.getDate();
      // let month = todayDate.getMonth() + 1;
      // let todayHours = todayDate.getHours();
      // let todayMinutes = todayDate.getMinutes();

      // if (nowadays < 10) {
      //     nowadays = "0" + nowadays;
      // }

      // if (month < 10) {
      //     month = "0" + month;
      // }

      // if (todayHours < 10) {
      //     todayHours = "0" + todayHours;
      // }

      // if (todayMinutes < 10) {
      //     todayMinutes = "0" + todayMinutes;
      // }

      // const date = nowadays + "-" + month + "-" + todayDate.getFullYear();
      // const hours = todayHours + ":" + todayMinutes;
      // const fullDate = { date, hours };
      // const infoOrder = JSON.parse(localStorage.getItem("date")) || [];
      // infoOrder.push(fullDate);
      // localStorage.setItem("date", JSON.stringify(infoOrder));

      let products = [];
      for (listid of resum) {
          products.push(listid._Id);
      }

      // on envoie en POST
      fetch("http://localhost:3000/api/teddies/order", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ contact, products }),
      })
          .then((response) => response.json())
          .then((data) => {
              localStorage.setItem("order", JSON.stringify(data));
              document.location.href = "Confirmation.html";
          })
          .catch((erreur) => console.log("erreur : " + erreur));
  } else {
      alert(
          "Veuillez correctement renseigner l'entièreté du formulaire pour valider votre commande."
      );
  }
});
