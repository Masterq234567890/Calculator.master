// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Button click sound
    const buttonClickSound = () => {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OKbSgwOUKzn77NYFA1Jp+TyvmceCAM8OKfx0X0qBSJyxu/ekUAKEl2z6euqWBQLR5/h8r5rGgUogcvx14gzCBdnsuvpoVIXCUuh7fK8aBwGNJHZ8smALAUicMbw3Y5BChotsOvvsVoWDEme4vK9ax0FJ4DO8teJOAkYZrrs6aFTGA==');
        audio.volume = 0.3;
        audio.play().catch(e => console.log('Audio play failed:', e));
    };

    // Intro animation
    setTimeout(() => {
        const mainScreen = document.getElementById('main-screen');
        if (mainScreen) {
            mainScreen.style.display = 'flex';
            setTimeout(() => {
                mainScreen.classList.add('active');
            }, 100);
        }
    }, 5000);

    // Get all elements
    const screens = document.querySelectorAll('.screen');
    const navButtons = document.querySelectorAll('.nav-button');
    const backButtons = document.querySelectorAll('.back-button');

    // Navigation functionality
    if (navButtons.length > 0) {
        navButtons.forEach(button => {
            button.addEventListener('click', function() {
                buttonClickSound();
                const targetScreen = this.getAttribute('data-screen');
                console.log('Navigating to:', targetScreen); // Debug log
                
                screens.forEach(screen => {
                    screen.classList.remove('active');
                    screen.style.display = 'none';
                });
                
                const target = document.getElementById(targetScreen);
                if (target) {
                    target.style.display = 'flex';
                    setTimeout(() => {
                        target.classList.add('active');
                    }, 50);
                }
            });
        });
    }

    if (backButtons.length > 0) {
        backButtons.forEach(button => {
            button.addEventListener('click', function() {
                buttonClickSound();
                console.log('Going back to main'); // Debug log
                
                screens.forEach(screen => {
                    screen.classList.remove('active');
                    screen.style.display = 'none';
                });
                
                const mainScreen = document.getElementById('main-screen');
                if (mainScreen) {
                    mainScreen.style.display = 'flex';
                    setTimeout(() => {
                        mainScreen.classList.add('active');
                    }, 50);
                }
            });
        });
    }

    // Simple Calculator
    let simpleExpression = '';
    const simpleInput = document.getElementById('simple-input');
    const simpleLive = document.getElementById('simple-live');
    const simpleError = document.getElementById('simple-error');

    if (simpleInput) {
        const calcButtons = document.querySelectorAll('#simple-calc .calc-btn');
        calcButtons.forEach(button => {
            button.addEventListener('click', function() {
                buttonClickSound();
                const value = this.getAttribute('data-value');
                
                if (this.id === 'simple-clear') {
                    simpleExpression = '';
                    simpleInput.value = '';
                    if (simpleLive) simpleLive.textContent = '';
                    if (simpleError) simpleError.textContent = '';
                } else if (this.id === 'simple-delete') {
                    simpleExpression = simpleExpression.slice(0, -1);
                    simpleInput.value = simpleExpression;
                    updateLiveResult('simple');
                } else if (this.id === 'simple-equals') {
                    calculateResult('simple');
                } else if (value) {
                    simpleExpression += value;
                    simpleInput.value = simpleExpression;
                    updateLiveResult('simple');
                }
            });
        });
    }

    function updateLiveResult(type) {
        const expression = type === 'simple' ? simpleExpression : sciExpression;
        const liveElement = type === 'simple' ? simpleLive : sciLive;
        const errorElement = type === 'simple' ? simpleError : sciError;
        
        if (!liveElement || !errorElement) return;
        
        errorElement.textContent = '';
        
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
        
        if (!inputElement || !liveElement) return;
        
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

    function saveToHistory(key, item) {
        let history = JSON.parse(localStorage.getItem(key) || '[]');
        history.unshift(item);
        history = history.slice(0, 20);
        localStorage.setItem(key, JSON.stringify(history));
    }

    function loadHistory(key, elementId) {
        const history = JSON.parse(localStorage.getItem(key) || '[]');
        const historyElement = document.getElementById(elementId);
        if (!historyElement) return;
        
        historyElement.innerHTML = '';
        history.forEach(item => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.textContent = item;
            historyElement.appendChild(div);
        });
    }

    const simpleHistoryBtn = document.getElementById('simple-history-btn');
    if (simpleHistoryBtn) {
        simpleHistoryBtn.addEventListener('click', function() {
            buttonClickSound();
            const panel = document.getElementById('simple-history');
            if (panel) {
                panel.classList.toggle('show');
                loadHistory('simpleHistory', 'simple-history');
            }
        });
    }

    // Scientific Calculator
    let sciExpression = '';
    const sciInput = document.getElementById('sci-input');
    const sciLive = document.getElementById('sci-live');
    const sciError = document.getElementById('sci-error');

    if (sciInput) {
        const sciCalcButtons = document.querySelectorAll('#scientific-calc .calc-btn');
        sciCalcButtons.forEach(button => {
            button.addEventListener('click', function() {
                buttonClickSound();
                const value = this.getAttribute('data-value');
                
                if (this.id === 'sci-clear') {
                    sciExpression = '';
                    sciInput.value = '';
                    if (sciLive) sciLive.textContent = '';
                    if (sciError) sciError.textContent = '';
                } else if (this.id === 'sci-delete') {
                    sciExpression = sciExpression.slice(0, -1);
                    sciInput.value = sciExpression;
                    updateLiveResult('sci');
                } else if (this.id === 'sci-equals') {
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
    }

    const sciHistoryBtn = document.getElementById('sci-history-btn');
    if (sciHistoryBtn) {
        sciHistoryBtn.addEventListener('click', function() {
            buttonClickSound();
            const panel = document.getElementById('sci-history');
            if (panel) {
                panel.classList.toggle('show');
                loadHistory('sciHistory', 'sci-history');
            }
        });
    }

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

    if (convTypeButtons.length > 0) {
        convTypeButtons.forEach(button => {
            button.addEventListener('click', function() {
                buttonClickSound();
                convTypeButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                currentConversionType = this.getAttribute('data-type');
                loadUnits();
            });
        });
    }

    function loadUnits() {
        if (!fromUnit || !toUnit) return;
        
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

    if (fromUnit && toUnit) {
        loadUnits();
    }

    if (fromValue) {
        fromValue.addEventListener('input', function() {
            const value = parseFloat(this.value);
            if (isNaN(value) || !toValue) {
                if (toValue) toValue.value = '';
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
    }

    function convertTemperature(value, from, to) {
        let celsius;
        if (from === 'celsius') celsius = value;
        else if (from === 'fahrenheit') celsius = (value - 32) * 5/9;
        else celsius = value - 273.15;
        
        if (to === 'celsius') return celsius;
        else if (to === 'fahrenheit') return celsius * 9/5 + 32;
        else return celsius + 273.15;
    }

    const swapBtn = document.getElementById('swap-units');
    if (swapBtn) {
        swapBtn.addEventListener('click', function() {
            buttonClickSound();
            if (!fromUnit || !toUnit || !fromValue || !toValue) return;
            
            const tempUnit = fromUnit.value;
            fromUnit.value = toUnit.value;
            toUnit.value = tempUnit;
            
            const tempValue = fromValue.value;
            fromValue.value = toValue.value;
            toValue.value = tempValue;
        });
    }

    // BMI Calculator
    const calcBmiBtn = document.getElementById('calc-bmi');
    if (calcBmiBtn) {
        calcBmiBtn.addEventListener('click', function() {
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
            
            if (resultDiv) {
                const valueEl = resultDiv.querySelector('.bmi-value');
                const categoryEl = resultDiv.querySelector('.bmi-category');
                const descEl = resultDiv.querySelector('.bmi-description');
                
                if (valueEl) valueEl.textContent = bmi.toFixed(1);
                if (categoryEl) categoryEl.textContent = category;
                if (descEl) descEl.textContent = description;
            }
        });
    }

    // Height Calculator
    const calcHeightBtn = document.getElementById('calc-height');
    if (calcHeightBtn) {
        calcHeightBtn.addEventListener('click', function() {
            buttonClickSound();
            const footSize = parseFloat(document.getElementById('foot-size').value);
            
            if (isNaN(footSize) || footSize <= 0) {
                alert('Please enter a valid foot size');
                return;
            }
            
            const height = footSize * 6.6;
            const heightInFeet = (height / 30.48).toFixed(2);
            
            const resultDiv = document.getElementById('height-result');
            if (resultDiv) {
                resultDiv.innerHTML = `
                    <div>Your estimated height is:</div>
                    <div style="font-size: 36px; margin: 20px 0;">${height.toFixed(1)} cm</div>
                    <div style="font-size: 24px;">(${heightInFeet} feet)</div>
                `;
            }
        });
    }

    console.log('All event listeners attached successfully!');
});
