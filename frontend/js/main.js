const btnConectar = document.querySelector("#conectar"),
message = document.querySelector("#message");

btnConectar.addEventListener("click", () => {
message.innerHTML = "Conectando al servidor...";
  //Código a ejecutar
fetch("http://localhost:3030/test")
    .then((response) => response.json())
    .then((data) => {
    message.innerHTML = data.message;
    });
});