let displayValue = '0';
let expressionStarted = false;

function updateDisplay() {
    document.querySelector('#display').textContent = displayValue;
}

function appendToDisplay(value) {
    if(!expressionStarted && /[+\-*/.]/.test(value)) {
        return;
    }
    if(displayValue === '0' && value !== '.') {
        displayValue = value;
    } else {
        displayValue += value;
    }

    expressionStarted = true;
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    expressionStarted = false;
    updateDisplay();
}

function backspace() {
    if(displayValue === 'Error') {
        clearDisplay();
    }
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
    if(displayValue === '') {
        clearDisplay();
    }
}

function calculate() {
    try {
        displayValue = Function('return ' + displayValue)().toString();
        updateDisplay();
    } catch (error) {
        displayValue = 'Error';
        updateDisplay();
    }
}

// Keyboard support
document.addEventListener('keydown', function (event) {
    const key = event.key;

    if ((/[0-9+\-*/.=]/).test(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    }
})