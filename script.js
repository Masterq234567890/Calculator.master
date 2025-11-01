// Button click sound
const buttonClickSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OKbSgwOUKzn77NYFA1Jp+ТyvmceCAM8OKfx0X0qBSJyxu/ekUAKEl2z6euqWBQLR5/h8r5rGgUogcvx14gzCBdnsuvpoVIXCUuh7fK8aBwGNJHZ8smALAUicMbw3Y5BChotsOvvsVoWDEme4vK9ax0FJ4DO8teJOAkYZrrs6aFTGA==');
    audio.volume = 0.3;
    audio.play();
};

// Intro animation
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('main-screen').style.display = 'flex';
        setTimeout(() => {
            document.getElementById('main-screen').classList.add('active');
        }, 100);
    }, 5000);
});

// Screen navigation
const screens = document.querySelectorAll('.screen');
const navButtons = document.querySelectorAll('.nav-button');
const backButtons = document.querySelectorAll('.back-button');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        buttonClickSound();
        const targetScreen = button.getAttribute('data-screen');
        screens.forEach(screen => screen.classList.remove('active'));
        setTimeout(() => {
            document.getElementById(targetScreen).classList.add('active');
        }, 100);
    });
});

backButtons.forEach(button => {
    button.addEventListener('click', () => {
        buttonClickSound();
        screens.forEach(screen => screen.classList.remove('active'));
        setTimeout(() => {
            document.getElementById('main-screen').classList.add('active');
        }, 100);
    });
});

// Simple Calculator
let simpleExpression = '';
const simpleInput = document.getElementById('simple-input');
const simpleLive = document.getElementById('simple-live');
const simpleError = document.getElementById('simple-error');

const calcButtons = document.querySelectorAll('#simple-calc .calc-btn');
calcButtons.forEach(button => {
    button.addEventListener('click', () => {
        buttonClickSound();
        const value = button.getAttribute('data-value');
        
        if (button.id === 'simple-clear') {
            simpleExpression = '';
            simpleInput.value = '';
            simpleLive.textContent = '';
            simpleError.textContent = '';
        } else if (button.id === 'simple-delete') {
            simpleExpression = simpleExpression.slice(0, -1);
            simpleInput.value = simpleExpression;
            updateLiveResult('simple');
        } else if (button.id === 'simple-equals') {
            calculateResult('simple');
        } else if (value) {
            simpleExpression += value;
            simpleInput.value = simpleExpression;
            updateLiveResult('simple');
        }
    });
});

function updateLiveResult(type) {
    const expression = type === 'simple' ? simpleExpression : sciExpression;
    const liveElement = type === 'simple' ? simpleLive : sciLive;
    const errorElement = type === 'simple' ? simpleError : sciError;
    
    errorElement.textContent = '';
    
    // Check for errors
    const openBrackets = (expression.match(/(/g) || []).length;
    const closeBrackets = (expression.match(/)/g) || []).length;
    
    if (openBrackets > closeBrackets) {
        errorElement.textContent = 'You have not completed last bracket';
        liveElement.textContent = '';
        return;
    }
    
    try {
        let evalExpression = expression.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
        evalExpression = evalExpression.replace(/sin/g, 'Math.sin');
        evalExpression = evalExpression.replace(/cos/g, 'Math.cos');
        evalExpression = evalExpression.replace(/tan/g, 'Math.tan');
        evalExpression = evalExpression.replace(/log/g, 'Math.log10');
        evalExpression = evalExpression.replace(/ln/g, 'Math.log');
        evalExpression = evalExpression.replace(/sqrt/g, 'Math.sqrt');
        evalExpression = evalExpression.replace(/pi/g, 'Math.PI');
        evalExpression = evalExpression.replace(/^/g, '**');
        
        const result = eval(evalExpression);
        if (isFinite(result)) {
            liveElement.textContent = result.toFixed(4);
        }
    } catch (e) {
        liveElement.textContent = '';
    }
}

function calculateResult(type) {
    const expression = type === 'simple' ? simpleExpression : sciExpression;
    const inputElement = type === 'simple' ? simpleInput : sciInput;
    const liveElement = type === 'simple' ? simpleLive : sciLive;
    const historyKey = type === 'simple' ? 'simpleHistory' : 'sciHistory';
    
    try {
        let evalExpression = expression.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
        evalExpression = evalExpression.replace(/sin/g, 'Math.sin');
        evalExpression = evalExpression.replace(/cos/g, 'Math.cos');
        evalExpression = evalExpression.replace(/tan/g, 'Math.tan');
        evalExpression = evalExpression.replace(/log/g, 'Math.log10');
        evalExpression = evalExpression.replace(/ln/g, 'Math.log');
        evalExpression = evalExpression.replace(/sqrt/g, 'Math.sqrt');
        evalExpression = evalExpression.replace(/pi/g, 'Math.PI');
        evalExpression = evalExpression.replace(/^/g, '**');
        
        const result = eval(evalExpression);
        
        if (isFinite(result)) {
            const historyItem = `${expression} = ${result}`;
            saveToHistory(historyKey, historyItem);
            
            if (type === 'simple') {
                simpleExpression = result.toString();
            } else {
                sciExpression = result.toString();
            }
            inputElement.value = result;
            liveElement.textContent = '';
        }
    } catch (e) {
        liveElement.textContent = 'Error';
    }
}

// History management
function saveToHistory(key, item) {
    let history = JSON.parse(localStorage.getItem(key) || '[]');
    history.unshift(item);
    history = history.slice(0, 20);
    localStorage.setItem(key, JSON.stringify(history));
}

function loadHistory(key, elementId) {
    const history = JSON.parse(localStorage.getItem(key) || '[]');
    const historyElement = document.getElementById(elementId);
    historyElement.innerHTML = '';
    
    history.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.textContent = item;
        historyElement.appendChild(div);
    });
}

document.getElementById('simple-history-btn').addEventListener('click', () => {
    buttonClickSound();
    const panel = document.getElementById('simple-history');
    panel.classList.toggle('show');
    loadHistory('simpleHistory', 'simple-history');
});

// Scientific Calculator (similar structure)
let sciExpression = '';
const sciInput = document.getElementById('sci-input');
const sciLive = document.getElementById('sci-live');
const sciError = document.getElementById('sci-error');

const sciCalcButtons = document.querySelectorAll('#scientific-calc .calc-btn');
sciCalcButtons.forEach(button => {
    button.addEventListener('click', () => {
        buttonClickSound();
        const value = button.getAttribute('data-value');
        
        if (button.id === 'sci-clear') {
            sciExpression = '';
            sciInput.value = '';
            sciLive.textContent = '';
            sciError.textContent = '';
        } else if (button.id === 'sci-delete') {
            sciExpression = sciExpression.slice(0, -1);
            sciInput.value = sciExpression;
            updateLiveResult('sci');
        } else if (button.id === 'sci-equals') {
            calculateResult('sci');
        } else if (value === 'pow') {
            sciExpression += '^2';
            sciInput.value = sciExpression;
            updateLiveResult('sci');
        } else if (value) {
            if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt'].includes(value)) {
                sciExpression += value + '(';
            } else {
                sciExpression += value;
            }
            sciInput.value = sciExpression;
            updateLiveResult('sci');
        }
    });
});

document.getElementById('sci-history-btn').addEventListener('click', () => {
    buttonClickSound();
    const panel = document.getElementById('sci-history');
    panel.classList.toggle('show');
    loadHistory('sciHistory', 'sci-history');
});

// Conversion Calculator
const conversionData = {
    length: {
        meter: 1,
        kilometer: 0.001,
        centimeter: 100,
        millimeter: 1000,
        mile: 0.000621371,
        yard: 1.09361,
        foot: 3.28084,
        inch: 39.3701
    },
    weight: {
        kilogram: 1,
        gram: 1000,
        milligram: 1000000,
        pound: 2.20462,
        ounce: 35.274
    },
    temperature: {
        celsius: 'base',
        fahrenheit: 'special',
        kelvin: 'special'
    },
    area: {
        'square meter': 1,
        'square kilometer': 0.000001,
        'square mile': 3.861e-7,
        'square yard': 1.19599,
        'square foot': 10.7639,
        acre: 0.000247105,
        hectare: 0.0001
    },
    volume: {
        liter: 1,
        milliliter: 1000,
        'cubic meter': 0.001,
        gallon: 0.264172,
        quart: 1.05669,
        pint: 2.11338,
        cup: 4.22675
    },
    time: {
        second: 1,
        minute: 0.0166667,
        hour: 0.000277778,
        day: 0.0000115741,
        week: 0.00000165344,
        month: 3.8052e-7,
        year: 3.171e-8
    }
};

let currentConversionType = 'length';

const convTypeButtons = document.querySelectorAll('.conv-type-btn');
const fromUnit = document.getElementById('from-unit');
const toUnit = document.getElementById('to-unit');
const fromValue = document.getElementById('from-value');
const toValue = document.getElementById('to-value');

convTypeButtons.forEach(button => {
    button.addEventListener('click', () => {
        buttonClickSound();
        convTypeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentConversionType = button.getAttribute('data-type');
        loadUnits();
    });
});

function loadUnits() {
    const units = Object.keys(conversionData[currentConversionType]);
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';
    
    units.forEach(unit => {
        const option1 = document.createElement('option');
        option1.value = unit;
        option1.textContent = unit;
        fromUnit.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = unit;
        option2.textContent = unit;
        toUnit.appendChild(option2);
    });
    
    toUnit.selectedIndex = 1;
}

loadUnits();

fromValue.addEventListener('input', () => {
    const value = parseFloat(fromValue.value);
    if (isNaN(value)) {
        toValue.value = '';
        return;
    }
    
    const from = fromUnit.value;
    const to = toUnit.value;
    
    if (currentConversionType === 'temperature') {
        toValue.value = convertTemperature(value, from, to).toFixed(2);
    } else {
        const fromFactor = conversionData[currentConversionType][from];
        const toFactor = conversionData[currentConversionType][to];
        const result = (value / fromFactor) * toFactor;
        toValue.value = result.toFixed(6);
    }
});

function convertTemperature(value, from, to) {
    let celsius;
    if (from === 'celsius') celsius = value;
    else if (from === 'fahrenheit') celsius = (value - 32) * 5/9;
    else celsius = value - 273.15;
    
    if (to === 'celsius') return celsius;
    else if (to === 'fahrenheit') return celsius * 9/5 + 32;
    else return celsius + 273.15;
}

document.getElementById('swap-units').addEventListener('click', () => {
    buttonClickSound();
    const tempUnit = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = tempUnit;
    
    const tempValue = fromValue.value;
    fromValue.value = toValue.value;
    toValue.value = tempValue;
});

// BMI Calculator
document.getElementById('calc-bmi').addEventListener('click', () => {
    buttonClickSound();
    const weight = parseFloat(document.getElementById('bmi-weight').value);
    const height = parseFloat(document.getElementById('bmi-height').value) / 100;
    
    if (isNaN(weight) || isNaN(height) || height === 0) {
        alert('Please enter valid values');
        return;
    }
    
    const bmi = weight / (height * height);
    const resultDiv = document.getElementById('bmi-result');
    
    let category, description;
    if (bmi < 18.5) {
        category = 'Underweight';
        description = 'You may need to gain weight';
    } else if (bmi < 25) {
        category = 'Normal';
        description = 'You have a healthy weight';
    } else if (bmi < 30) {
        category = 'Overweight';
        description = 'You may need to lose weight';
    } else {
        category = 'Obese';
        description = 'Consult a healthcare professional';
    }
    
    resultDiv.querySelector('.bmi-value').textContent = bmi.toFixed(1);
    resultDiv.querySelector('.bmi-category').textContent = category;
    resultDiv.querySelector('.bmi-description').textContent = description;
});

// Height Calculator
document.getElementById('calc-height').addEventListener('click', () => {
    buttonClickSound();
    const footSize = parseFloat(document.getElementById('foot-size').value);
    
    if (isNaN(footSize) || footSize <= 0) {
        alert('Please enter a valid foot size');
        return;
    }
    
    // Scientific formula: Height (cm) ≈ Foot length (cm) × 6.6
    const height = footSize * 6.6;
    const heightInFeet = (height / 30.48).toFixed(2);
    
    document.getElementById('height-result').innerHTML = `
        <div>Your estimated height is:</div>
        <div style="font-size: 36px; margin: 20px 0;">${height.toFixed(1)} cm</div>
        <div style="font-size: 24px;">(${heightInFeet} feet)</div>
    `;
});
