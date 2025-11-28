let buttons = document.querySelector("#buttons-container");
let display = document.querySelector("#displayNumbers");
let clearButton = document.querySelector("#clear");
let resultDisplay = document.querySelector("#result");
const equal = document.querySelector("#equal");

let currentDisplay = "";
let operator = null;
let result = null;
let point = false;
let justCalculated = false;

function operateNumbers(numbers) {

    switch (operator) {
        case "*":
            return Number(numbers[0]) * Number(numbers[1]);
        case "/":
            if(numbers[1] == 0) return "Error"
            return Number(numbers[0]) / Number(numbers[1]);
        case "+":
            return Number(numbers[0]) + Number(numbers[1]);
        case "-":
            return Number(numbers[0]) - Number(numbers[1]);
        default:
            break;
    }
}

function calculate() {
    let numbers = currentDisplay.split(operator);

    return operateNumbers(numbers);
}

function add(item) {
    let itemType = item.dataset.type;
    let itemValue = item.dataset.value;

    if (itemType !== "operator" && itemType !== "number") return
    if(!currentDisplay && itemType === "operator") return

    if (itemType === "operator") {
        point = false;
        if (!operator) {
            operator = itemValue;
        } else {
            if (["*", "/", "+", "-"].includes(currentDisplay.at(-1))) {
                currentDisplay = currentDisplay.slice(0, currentDisplay.length - 1);
                operator = itemValue;
            } else {
                currentDisplay = calculate();
                operator = itemValue;
            }
        }
    } else {
        if (itemValue === ".") point = true;
    }

    currentDisplay += itemValue;
}

function clearAll() {
    currentDisplay = "";
    operator = null;
    result = null;
}

function clearOperatorsAndResults() {
    operator = null;
    result = null;
}

function writeOnScreen(text) {
    display.textContent = text;
}

function writeOnResult(text) {
    let mod = text.split(".");
    if (mod.length > 1) {
        if (mod[1].length > 2)
            resultDisplay.textContent = Number(text).toFixed(2);

    } else {
        resultDisplay.textContent = text;
    }
}

function updateFocus(item) {
    if (item.dataset.type == "equal") {
        resultDisplay.classList.remove("focus-result");
        display.classList.add("focus-result");
    } else {
        resultDisplay.classList.add("focus-result");
        display.classList.remove("focus-result");
    }
}

buttons.addEventListener("click", (event) => {
    let item = event.target;

    if (item === equal) {
        if (justCalculated === true) return

        result = calculate();
        justCalculated = true;
        writeOnResult(String(result));
        updateFocus(item);
        currentDisplay = result;
        operator = null;

    } else if (item === clearButton) {
        clearAll();
        writeOnScreen(currentDisplay);
        writeOnResult(currentDisplay);
    } else {
        if (justCalculated && item.dataset.type === "number") {
            currentDisplay = "";
            writeOnResult(currentDisplay);
        } else if(justCalculated && currentDisplay === "Error") {
            clearAll();
            writeOnScreen(currentDisplay);
            writeOnResult(currentDisplay);
        }
        if (item.dataset.value === "." && point === true) return
        justCalculated = false;
        updateFocus(item);
        add(item);
        writeOnScreen(currentDisplay);
    }
})




