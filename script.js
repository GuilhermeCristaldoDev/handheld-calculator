let buttons = document.querySelector("#buttons-container");

buttons.addEventListener("click", (event) => {
    console.log(event.target.textContent);
})