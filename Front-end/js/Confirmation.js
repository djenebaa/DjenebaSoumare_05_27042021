
  const order = JSON.parse(localStorage.getItem("order"));
  const products =JSON.parse(localStorage.getItem("products"));
 order_info();
  function order_info() {
    localStorage.clear
    document.getElementById("ship").innerHTML+=`
    <div class="container-fluid order_confirm">
    <h1> Order registred </h1>
   <p>Your order number is : ${order.orderId}</p>
   <p> Thank you for ordering from us, see you soon at Orinoco </p>
    </div>
   `
  }