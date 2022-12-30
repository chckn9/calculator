let displayValue = '', storedNum, operator, operatorToggled;

function add(a, b) { return +a + +b; }

function subtract(a, b) { return +a - +b; }

function multiply(a, b) { return +a * +b; }

function divide(a, b) { return +a / +b; }

function key(keyName) {
    if (keyName === 'Backspace') {
        return 'clear';
    }
    if (keyName === '/') {
        return 'divide';
    }
    if (keyName === 'x' || keyName === '*') {
        return 'multiply';
    }
    if (keyName === '-') {
        return 'subtract';
    }
    if (keyName === '.') {
        return 'decimal';
    }
    if (keyName === '=' || keyName === 'Enter') {
        return 'equal';
    }
    if (keyName === '+') {
        return 'add';
    }
    return keyName;
}

// Add eventListener to all buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    // Add to display when pressed
    btn.addEventListener('click', () => {
        if (operatorToggled === true) {
            operatorToggled = false;
            clearDisplay();
        }
        populateDisplay(btn);
    });

    // Change font size when hovered over
    btn.addEventListener('mouseover', () => {
        btn.classList.add("hovered");
    });
    btn.addEventListener('mouseout', () => {
        btn.classList.remove("hovered");
    });

    // Change button color when clicked
    btn.addEventListener('mousedown', () => {
        btn.classList.add("clicked");
    });
    btn.addEventListener('mouseup', () => {
        btn.classList.remove("clicked");
    });
});

// Add eventListener (key presses)
window.addEventListener('keypress', (e) => {
    console.log(e.key);
    let keyName = key(e.key);
    console.log(keyName);

    let btn = document.querySelector(`[id="${keyName}"]`);
    console.log(btn);
    if (!btn) return;

    // Add to display when pressed
    if (operatorToggled === true) {
        operatorToggled = false;
        clearDisplay();
    }
    populateDisplay(btn);

    const display = document.querySelector('.display');

    if (btn.classList.contains('operator')) {
        // First number
        if (typeof storedNum === 'undefined') {
            operator = btn.id;
            storedNum = displayValue;
            operatorToggled = true;
        } else if (btn.id === 'equal') {
            storedNum = givenOperator(operator, storedNum, displayValue);
            operatorToggled = true;
            displayValue = storedNum;
            display.textContent = displayValue;    
        } else {
            storedNum = givenOperator(operator, storedNum, displayValue);
            operator = btn.id;
            operatorToggled = true;
            displayValue = storedNum;
            display.textContent = displayValue;  
        }
    }

    if (keyName === 'clear') {
        clearDisplay();
        storedNum = undefined;
        operator = undefined;
        operatorToggled = undefined;
    }

    // Change font size when key down
    btn.classList.add("hovered");
    btn.classList.add("clicked");
})

// Add eventListener (key releases)
window.addEventListener('keyup', (e) => {
    let keyName = key(e.key);

    let btn = document.querySelector(`[id="${keyName}"]`);
    if (!btn) return;

    // Change font size when key up
    btn.classList.remove("hovered");
    btn.classList.remove("clicked");
})

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
        } else if (op.id === 'equal') {
            storedNum = givenOperator(operator, storedNum, displayValue);
            operatorToggled = true;
            displayValue = storedNum;
            display.textContent = displayValue;    
        } else {
            storedNum = givenOperator(operator, storedNum, displayValue);
            operator = op.id;
            operatorToggled = true;
            displayValue = storedNum;
            display.textContent = displayValue;  
        }
    });
});

// Takes in operator and 2 numbers, then calls respective function
function givenOperator(operator, a, b) { 
    if (operator === 'divide')
        return divide(a, b);
    if (operator === 'multiply')
        return multiply(a, b);
    if (operator === 'subtract')
        return subtract(a, b);
    if (operator === 'add')
        return add(a, b);
}

// Displays number when button is pressed
function populateDisplay(btn) {
    const display = document.querySelector('.display');

    /*
    TO FIX:
    - Show negative sign if display is empty
    - No double negatives or decimals
    */

    // Only displays numbers and decimals
    if (!isNaN((+(btn.id))) || btn.id === 'decimal' && displayValue !== '') {
        console.log(+(btn.id));
        if (btn.id === 'decimal') {
            display.insertAdjacentHTML('beforeend', '.');
            displayValue += '.';
        // } else if (btn.id === 'subtract') {
        //         display.insertAdjacentHTML('beforeend', '-');
        //         displayValue += '-';    
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