const operators = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
}
const display = document.getElementById('display');
const inputButtons = document.getElementById('input');

inputButtons.addEventListener('click',(e) => {
    if (!(e.target.tagName === 'BUTTON')) {
        return;
    }

    const input = e.target.innerText;
    updateDisplay(input);
})

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) {
        return;
    }

    return a / b;
}

function operate(str) {
    const operation = str.split(' ');
    const a = operation[0];
    const op = operation[1];
    const b = operation[2];

    return operators[op](a, b);
}

function updateDisplay(input) {
    display.innerText += input;
}