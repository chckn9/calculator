let displayValue = "", storedNum, operator, operatorToggled;

function add(a, b) { return +a + +b; }

function subtract(a, b) { return +a - +b; }

function multiply(a, b) { return +a * +b; }

function divide(a, b) { return +a / +b; }

// Add eventListener to all buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (operatorToggled === true) {
            operatorToggled = false;
            clearDisplay();
        }
        populateDisplay(btn);
    });
});

// When an operator is pressed, store display number and operator
const operators = document.querySelectorAll('.operator');
operators.forEach(op => {
    op.addEventListener('click', () => {
        const display = document.querySelector('.display');
        
        // First number
        if (typeof storedNum === 'undefined') {
            operator = op.id;
            storedNum = displayValue;
            operatorToggled = true;
            console.log("number 1");
        } else if (op.id === 'equal') {
            storedNum = givenOperator(operator, storedNum, displayValue);
            operatorToggled = true;
            displayValue = storedNum;
            display.textContent = displayValue;  
            console.log("number 2");  
        } else {
            storedNum = givenOperator(operator, storedNum, displayValue);
            operator = op.id;
            operatorToggled = true;
            displayValue = storedNum;
            display.textContent = displayValue;  
            console.log("number 3");  
        }

    });
});

// Takes in operator and 2 numbers, then calls respective function
function givenOperator(operator, a, b) { 
    if (operator === "divide")
        return divide(a, b);
    if (operator === "multiply")
        return multiply(a, b);
    if (operator === "subtract")
        return subtract(a, b);
    if (operator === "add")
        return add(a, b);
}

// Displays number when button is pressed
function populateDisplay(btn) {
    const display = document.querySelector('.display');

    /*
    TO FIX:
    - Do not allow decimal to be first "digit"
    - Show negative sign if display is empty
    - No double negatives or decimals
    */
    if (!isNaN((+(btn.id))) || btn.id === "decimal") {
        console.log(+(btn.id));
        if (btn.id === "decimal") {
            display.insertAdjacentHTML('beforeend', ".");
            displayValue += ".";
        } else {
            display.insertAdjacentHTML('beforeend', btn.id);
            displayValue += btn.id;
        }
    }
}

// Clears the display
function clearDisplay() {
    const display = document.querySelector('.display');
    display.replaceChildren();
    displayValue = "";
}

// Add eventListener to clear button
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
    clearDisplay();
    storedNum = undefined;
    operator = undefined;
    operatorToggled = undefined;
})