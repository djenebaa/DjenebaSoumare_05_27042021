

function DisplayTotal() {
document.getElementById("shopping_resume").innerHTML +=`
 <h1> Formulaire </h1>
 <ul class="form-section"> 

   <li class= "form-line" data-type="control_fullname">Firstname
   <input type="firstname" name="" id=""></li>
   <li class= "form-line" data-type="control_fullname">Lastname
   <input type="lastname" name="" id=""></li>
   <li class= "form-line" data-type="control_fullname">Address
   <input type="address" name="" id=""></li>
   <li class= "form-line" data-type="control_fullname">City
   <input type="city" name="" id=""></li>
   <li class= "form-line" data-type="control_fullname">Email
   <input type="email" name="" id=""></li>

</ul>

`
} 
DisplayTotal()

/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */