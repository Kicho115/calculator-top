const operators = {
    '+': add,
    '-': subtract,
    '×': multiply,
    '÷': divide,
    '%': modulo,
}

let inputFunction = [];
let isInputComplete = false;
let isOpSelected = false;
const clickSound = new Audio('assets/click-sound.wav');
const enterSound = new Audio('assets/enter-sound.wav');
const acSound = new Audio('assets/ac-sound.wav');
enterSound.volume = 0.3;

const display = document.getElementById('display');
const inputButtons = document.getElementById('input');

inputButtons.addEventListener('click',(e) => {
    if (!(e.target.tagName === 'BUTTON')) {
        return;
    }

    const input = e.target.innerText;

    if (input === '=') {
        enterSound.play();
    } else if (input === 'AC') {
        acSound.play()
    } else {
        clickSound.play();
    }

    if (input === '=') {
        if (isOpSelected) {
            inputFunction = transformArray(inputFunction);
        let result = operate(inputFunction);
        inputFunction = [result]; // Carry
        result = result.toString();
        if (result.length >= 14) {
            display.innerText = (result).substring(0,13) + '...';
            }
        else {
            display.innerText = result;
        }
        isOpSelected = false;
        } else {
            // Prevents pressing equal when there is no operator
            return;
        }
    } else if (input === 'AC') {
        reset();
    } else if (input === 'del') {
        display.innerText = display.innerText.slice(0, -1);
        inputFunction.pop();
    } else {
        if (isNaN(parseInt(input)) && input !== '.') {
            if (!isOpSelected) {
                isOpSelected = true;
                inputFunction.push(input);
                updateDisplay(input);
            } else if (!/[0-9]$/.test(display.innerText)) {
                inputFunction.pop();
                updateDisplay('del');
                inputFunction.push(input);
                updateDisplay(input);
            }
        } else {
            inputFunction.push(input);
            updateDisplay(input);
        }
    }
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
    if (b === 0) {
        return 'MATH ERROR';
    }

    return a / b;
}

function modulo(a, b) {
    if (b === 0) return 'MATH ERROR';
    return a % b;
}

function operate(arr) {
    const a = parseFloat(arr[0]);
    const op = arr[1];
    const b = parseFloat(arr[2]);

    return operators[op](a, b);
}

function updateDisplay(input) {
    if (input === 'del') {
        display.innerText = display.innerText.substring(0, display.innerText.length - 1);
    } else if (input === 'AC') {
        reset();
    } else if (!(input === '.' && display.innerText.includes('.'))){
        // Prevent the string on the display from overflowing
        if (display.innerText.length >= 14) {
            display.innerText = '...' + (display.innerText + input).substring(display.innerText.length - 12);
        } else {
            display.innerText += input;
        }
    } 
}

function transformArray(arr) {
    const opIndex = arr.findIndex(item => isNaN(parseInt(item)) && item !== '.');
    const a = arr.slice(0, opIndex).join('');
    const b = arr.slice(opIndex + 1).join('');
    const op = arr[opIndex];

    return [a, op, b];
}

function updateIsInputComplete(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '') {
            isInputComplete = false;
            return;
        }
    }
    isInputComplete = true;
}

function reset() {
    inputFunction = [];
    isOpSelected = false;
    display.innerText = '';
}
