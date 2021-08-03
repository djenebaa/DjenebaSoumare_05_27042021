// ****************Product Display***************************
Bears()
async function Bears() {
  const products = await Getproduct()
  for (product of products) {
    DisplayProduct(product)
  }
}
function Getproduct() {
 return fetch(`http://localhost:3000/api/teddies`)
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
  <a href="Produit.html?id=${products._id}"> 
  <div class="container AllProduct">
          <div class="d-flex">
        <img src=${products.imageUrl}>
        </div>   
  </div> 
  </a>
  `;
}
