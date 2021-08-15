
  const order = JSON.parse(localStorage.getItem("order"));
  document.getElementById("ship").innerHTML+=`
  ${order.orderId}
  `