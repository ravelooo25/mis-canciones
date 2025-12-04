const bienvenida = document.getElementById("bienvenida");
const pantalla1 = document.getElementById("pantalla1");
const btn = document.getElementById("btnComenzar");

btn.addEventListener("click", () => {
    bienvenida.classList.remove("visible");

    setTimeout(() => {
        pantalla1.classList.add("visible");
    }, 700);
});
