// *****************Get info of product*****************
// const get_info = window.location.search;
// console.log(get_info);


// // ******************Get id************************
// const url = new URLSearchParams(get_info)
// console.log(url);

// const id = url.get("id");
// console.log(id);

// **************Get info of id*******************
// let res ={
//   colors:{},
//   _id:{},
//   name:"",
//   price:0,
//   description:"",
//   imageUrl:"",
// }
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
  <div class="displayproducts">
  <h1> ${info.name} </h1>
  <img src="${info.imageUrl}" alt="">
 <p> ${info.description}</p>
 <p>${info.price/100}€</p>
 <select id ="choice">
 <option value="">--Please choose an option--</option>
 <option value="colors" id="color-choice">${info.colors}</option>
  </div>
</select>
  `; 
}
