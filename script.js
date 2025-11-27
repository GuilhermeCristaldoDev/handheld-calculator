let buttons = document.querySelector("#buttons-container");
let display = document.querySelector("#display");

function writeOnDisplay(text) {
    display.textContent += text;
}

buttons.addEventListener("click", (event) => {
    let value = event.target;

    if (value.dataset.type == "number" || value.dataset.type == "operator")
        writeOnDisplay(event.target.textContent);
})

