Bears()

async function Bears() {
  const products = await Getproduct()
  for (product of products) {
    DisplayProduct(product)
    
  }
}
function Getproduct() {
 return fetch("http://localhost:3000/api/teddies")
    .then(function (Response) {
      return Response.json()
    })
    .then(function (products) {
      return products
    })
    .catch(function (error) {
      alert(error)
    })
}
function DisplayProduct(products) {
  document.getElementById("Bears").innerHTML +=`
  <div class="row Produit"> 
          <div class="d-flex">
         <img src=${products.imageUrl}>
         <p> ${products.name}
         ${products.price} 
         </p></div>   
  </div> 
  `
}




// function Getproduct() {
//   fetch(`http://localhost:3000/api/teddies`)
//     .then(function (Response) {
//       return Response.json();
//     })
//     .then(function (products) {
//       console.log(products);
//     });
// }