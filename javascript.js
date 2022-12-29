function add(a, b) { return a + b; }

function subtract(a, b) { return a - b; }

function multiply(a, b) { return a * b; }

function divide(a, b) { return a / b; }

// Takes in operator and 2 numbers, then calls respective function
function operate(operator, a, b) { return operator(a, b); }