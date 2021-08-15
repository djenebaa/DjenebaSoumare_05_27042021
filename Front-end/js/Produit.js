// ********************Display info of products***************************
(async function () {
  const infosId = GetinfoId();
  const info = await Getinfo(infosId);
  Displayinfo(info);
})();

function GetinfoId() {
  return new URL(location.href).searchParams.get("id");
}
function Getinfo(infosId) {
  return fetch(`http://localhost:3000/api/teddies/${infosId}`)
    .then(function (Response) {
      return Response.json();
    })
    .then(function (info) {
      return info;
    })
    .catch(function (error) {
      alert(error);
    });
}
function Displayinfo(info) {
  document.getElementById("Products-content").innerHTML += `
<div class="container displayproducts">
   <div class="products-info 1">
        <title>${info.name}</title>
        <img src="${info.imageUrl}" alt="image de ${info.name}" >
   </div>
   <div class="profuct-info 2">
        <p> ${info.description}</p>
        <p>${info.price / 100}€</p>
  </div>
</div>
 <form>
  <label for="products-choice"> Please choose an option </label>
   <select name ="products-choice" id="products-choice">
    
   </select>
 </form>
 <button type="submit" id="products-submit">Add to Cart</button>
  
 `;
  // **************Quantity of option***************************
  const QuantityOption = info.colors;
  for (let c = 0; c < QuantityOption.length; c++) {
    document.getElementById("products-choice").innerHTML += `
  <option value="${c}" >${QuantityOption[c]}</option>
 
  `;
  }

  //  ******************Id formulaire************************
  const FormId = document.querySelector("#products-choice");

  // *******************Target button*************************
  const Submit_button = document.querySelector("#products-submit");

  // ********************Listen button****************************
  Submit_button.addEventListener("click", (e) => {
    e.preventDefault();

    // ****************User choice*******************
    const FormChoice = FormId.value;
    // console.log(FormChoice);

    //  ***********Order info*********************
    let ProductOrder = {
       _Id: info._id,
      ProductName: info.name,
      price: info.price / 100,
      quantity: 1,
      color_choice: FormChoice,
    };
    console.log(ProductOrder);

    // ************Local Storage *************************

    // **********Panier
    let Total = JSON.parse(localStorage.getItem("products"));

    console.log(Total);
    // ********************Confirmation
    const Confirmation = () =>{
      if(window.confirm(`${info.name} option: ${FormChoice} your product was added to cart tap ok for consult your cart or annuler for go to firstpage` )){
        window.location.href = "panier.html"
      }
      else{
        window.location.href ="index.html"
      }
    }
    // ********ProductonLocalStorage
    if (Total) {
      Total.push(ProductOrder)
      localStorage.setItem("products", JSON.stringify(Total));
      console.log(Total);
      Confirmation();
    }
    // ********ProductoffLocalStorage
    else {
      Total = [];
      Total.push(ProductOrder);
      localStorage.setItem("products", JSON.stringify(Total));
      console.log(Total);
      Confirmation();
    }
  });
}