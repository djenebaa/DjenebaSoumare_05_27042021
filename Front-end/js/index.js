// ****************Product Display***************************
Bears();
async function Bears() {
  const products = await Getproduct();
  for (product of products) {
    DisplayProduct(product);
  }
}
function Getproduct() {
  return fetch(`http://localhost:3000/api/teddies`)
    .then(function (Response) {
      return Response.json();
    })
    .then(function (products) {
      return products;
    })
    .catch(function (error) {
      alert(error);
    });
}
function DisplayProduct(products) {
  document.getElementById("Bears").innerHTML += `
  <p class="productname"> ${products.name} </p>
  <a href="Produit.html?id=${products._id}"> 
  <div class="container AllProduct">
          <div class="d-flex indexproduct">
          <img src=${products.imageUrl} class="container bears">  
        
        </div>
        </div>
  </div> 
  </a>
  `;
}
