const btnConectar = document.querySelector("#conectar");
const orders = document.querySelector("#orders");
message = document.querySelector("#message");

const orderCards = (arr) => {
  let html;
  for (const order of arr) {
    const { number, totalPrice, status } = order;
    html = `<div class="card">
              <h3>Orden: ${number}</h3>
              <p>Precio: $${totalPrice}</p>
              <p>Estado: ${status}</p>
            </div>`;
    orders.innerHTML += html;
  }
};

btnConectar.addEventListener("click", () => {
message.innerHTML = "Conectando al servidor...";
  //Código a ejecutar
fetch("http://localhost:3030/api/orders")
    .then((response) => response.json())
    .then((data) => {
    message.innerHTML = data.message;
    orderCards(data.result);
    console.log(data.result);
    });
});