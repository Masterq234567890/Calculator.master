// Mobile-optimized version
(function() {
    'use strict';
    
    console.log('Script started');
    
    // Function to run when page loads
    function initWebsite() {
        console.log('Initializing...');
        
        // Show main screen after intro
        setTimeout(function() {
            var mainScreen = document.getElementById('main-screen');
            if (mainScreen) {
                mainScreen.style.display = 'flex';
                mainScreen.style.opacity = '1';
                mainScreen.classList.add('active');
            }
        }, 5000);
        
        // Navigation buttons - MOBILE FIXED
        var navButtons = document.querySelectorAll('.nav-button');
        console.log('Nav buttons found:', navButtons.length);
        
        for (var i = 0; i < navButtons.length; i++) {
            (function(button) {
                // Multiple event types for mobile compatibility
                button.addEventListener('touchstart', handleNavClick, {passive: true});
                button.addEventListener('click', handleNavClick);
                
                function handleNavClick(e) {
                    e.preventDefault();
                    console.log('Button clicked!');
                    
                    // Sound
                    try {
                        var audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OKbSgwOUKzn77NYFA1Jp+TyvmceCAM=');
                        audio.volume = 0.2;
                        audio.play();
                    } catch(err) {}
                    
                    var targetId = button.getAttribute('data-screen');
                    console.log('Opening screen:', targetId);
                    
                    // Hide all screens
                    var allScreens = document.querySelectorAll('.screen');
                    for (var j = 0; j < allScreens.length; j++) {
                        allScreens[j].classList.remove('active');
                        allScreens[j].style.display = 'none';
                    }
                    
                    // Show target screen
                    var targetScreen = document.getElementById(targetId);
                    if (targetScreen) {
                        targetScreen.style.display = 'flex';
                        setTimeout(function() {
                            targetScreen.classList.add('active');
                            targetScreen.style.opacity = '1';
                        }, 50);
                    }
                }
            })(navButtons[i]);
        }
        
        // Back buttons - MOBILE FIXED
        var backButtons = document.querySelectorAll('.back-button');
        console.log('Back buttons found:', backButtons.length);
        
        for (var k = 0; k < backButtons.length; k++) {
            (function(button) {
                button.addEventListener('touchstart', handleBackClick, {passive: true});
                button.addEventListener('click', handleBackClick);
                
                function handleBackClick(e) {
                    e.preventDefault();
                    console.log('Back clicked!');
                    
                    var allScreens = document.querySelectorAll('.screen');
                    for (var j = 0; j < allScreens.length; j++) {
                        allScreens[j].classList.remove('active');
                        allScreens[j].style.display = 'none';
                    }
                    
                    var mainScreen = document.getElementById('main-screen');
                    if (mainScreen) {
                        mainScreen.style.display = 'flex';
                        setTimeout(function() {
                            mainScreen.classList.add('active');
                            mainScreen.style.opacity = '1';
                        }, 50);
                    }
                }
            })(backButtons[k]);
        }
        
        // Calculator buttons - MOBILE FIXED
        setupCalculator();
        setupConversion();
        setupBMI();
        setupHeight();
    }
    
    // Calculator setup
    function setupCalculator() {
        var simpleExpression = '';
        var simpleInput = document.getElementById('simple-input');
        
        if (!simpleInput) return;
        
        var calcButtons = document.querySelectorAll('#simple-calc .calc-btn');
        for (var i = 0; i < calcButtons.length; i++) {
            (function(btn) {
                btn.addEventListener('touchstart', function(e) {
                    e.preventDefault();
                    handleCalcButton(btn);
                }, {passive: false});
                
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    handleCalcButton(btn);
                });
            })(calcButtons[i]);
        }
        
        function handleCalcButton(btn) {
            var value = btn.getAttribute('data-value');
            
            if (btn.id === 'simple-clear') {
                simpleExpression = '';
                simpleInput.value = '';
            } else if (btn.id === 'simple-delete') {
                simpleExpression = simpleExpression.slice(0, -1);
                simpleInput.value = simpleExpression;
            } else if (btn.id === 'simple-equals') {
                try {
                    var result = eval(simpleExpression.replace(/×/g, '*').replace(/÷/g, '/'));
                    simpleInput.value = result;
                    simpleExpression = result.toString();
                } catch(e) {
                    simpleInput.value = 'Error';
                }
            } else if (value) {
                simpleExpression += value;
                simpleInput.value = simpleExpression;
            }
        }
    }
    
    // Conversion setup
    function setupConversion() {
        var fromValue = document.getElementById('from-value');
        if (!fromValue) return;
        
        var convButtons = document.querySelectorAll('.conv-type-btn');
        for (var i = 0; i < convButtons.length; i++) {
            (function(btn) {
                btn.addEventListener('touchstart', function(e) {
                    e.preventDefault();
                    var allBtns = document.querySelectorAll('.conv-type-btn');
                    for (var j = 0; j < allBtns.length; j++) {
                        allBtns[j].classList.remove('active');
                    }
                    btn.classList.add('active');
                }, {passive: false});
            })(convButtons[i]);
        }
    }
    
    // BMI setup
    function setupBMI() {
        var calcBtn = document.getElementById('calc-bmi');
        if (!calcBtn) return;
        
        calcBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            calculateBMI();
        }, {passive: false});
        
        calcBtn.addEventListener('click', function(e) {
            e.preventDefault();
            calculateBMI();
        });
        
        function calculateBMI() {
            var weight = parseFloat(document.getElementById('bmi-weight').value);
            var height = parseFloat(document.getElementById('bmi-height').value) / 100;
            
            if (!weight || !height) {
                alert('Please enter values');
                return;
            }
            
            var bmi = weight / (height * height);
            var result = document.getElementById('bmi-result');
            
            var category = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese';
            
            result.querySelector('.bmi-value').textContent = bmi.toFixed(1);
            result.querySelector('.bmi-category').textContent = category;
        }
    }
    
    // Height setup
    function setupHeight() {
        var calcBtn = document.getElementById('calc-height');
        if (!calcBtn) return;
        
        calcBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            calculateHeight();
        }, {passive: false});
        
        calcBtn.addEventListener('click', function(e) {
            e.preventDefault();
            calculateHeight();
        });
        
        function calculateHeight() {
            var footSize = parseFloat(document.getElementById('foot-size').value);
            if (!footSize) {
                alert('Please enter foot size');
                return;
            }
            
            var height = footSize * 6.6;
            var feet = (height / 30.48).toFixed(2);
            
            document.getElementById('height-result').innerHTML = 
                '<div>Your height: ' + height.toFixed(1) + ' cm (' + feet + ' feet)</div>';
        }
    }
    
    // Start when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWebsite);
    } else {
        initWebsite();
    }
})();
