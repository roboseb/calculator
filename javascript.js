//Create a calculator object with methods for basic math.
const calculator = {  
    add: function() {
        let result = 0;
        for (let i = 0; i < arguments.length; i++) {
            result += arguments[i];
        }
        return result;
    },

    subtract: function() {
        let result = arguments[0];
        for (let i = 0; i < arguments.length-1; i++) {
            result -= arguments[i+1];
        }
        return result;
    },

    multiply: function() {
        let result = arguments[0];
        for (let i = 0; i < arguments.length-1; i++) {
            result *= arguments[i+1];
        }
        return result;
    },

    divide: function() {
        let result = arguments[0];
        for (let i = 0; i < arguments.length-1; i++) {
            result /= arguments[i+1];
        }
        return result;
    }
}    

const buttons = document.querySelectorAll('button');
const result = document.querySelector('#result');


//Enter input into result display div. Solve equation on equals input.
buttons.forEach(button => {
    button.addEventListener('click' , () => {
        let text = result.innerText;
        let lastChar = text.charAt(text.length-1)
        //Prevent entering excess digits.
        if (text.length >= 14 && button.id !== 'ac' && 
            button.id !== 'equals' && button.id !== "backspace") {
            return;
        }
        if (!isNaN(button.id)) {
            //Add a space before a number if the previous character was a math sign.
            if (lastChar === "×" || 
                lastChar === "-" || 
                lastChar === "+" || 
                lastChar === "÷") {
                result.innerText += ` ${button.id}`;
                emote = 'default';
            } else {
                result.innerText += button.id;
                emote = 'default';
            }
        } else if (button.id === "×" || button.id === "-" || button.id === "+" || button.id === "÷" || button.id === '.'){
            //Do not enter symbol if result box is empty,
            //or if last character was also a symbol.
            console.log(lastChar);
            if (!lastChar || lastChar === "×" || lastChar === "-" || lastChar === "+" || lastChar === "÷" || lastChar === '.') {
                emote = 'angry'
                return;
            }
            if (button.id === '.') {

                //Prevent enter several decimal points in one number.
                let splitResult = result.innerText.split(' ');
                if (splitResult[splitResult.length - 1].indexOf('.') > 0) {
                    emote = 'angry';
                    return;
                }
                result.innerText += (`${button.id}`);
                return;
            }

            result.innerText += (` ${button.id}`);
        } else if (button.id === "ac") {
            result.innerText = "";
            emote = 'default';
        } else if (button.id === "equals") {
            //Do not process if equation ends with a symbol.
            if (isNaN(lastChar)) {
                emote = 'angry';
                return;
            }
            emote = 'happy';
            result.innerText = process(text);
        } else if (button.id === "backspace") {
            if (text === "") {
                emote = "angry";
            }
            console.log(text.length)
            result.innerText = text.slice(0,text.length-1);
        
        }
    });
});

//Keyboard support.
document.addEventListener('keydown' , key => {
    let text = result.innerText;
    let lastChar = text.charAt(text.length-1)
    //Prevent entering excess digits.
    if (text.length >= 14 &&  key.key !== 'Delete' && 
        key.key !== 'Enter' && key.key !== "Backspace") {
        return;
    }
    if (!isNaN(key.key)) {
        //Add a space before a number if the previous character was a math sign.
        if (lastChar === "×" || 
            lastChar === "-" || 
            lastChar === "+" || 
            lastChar === "÷") {
            result.innerText += ` ${key.key}`;
            emote = 'default';
        } else {
            result.innerText += key.key;
            emote = 'default';
        }
    } else if (key.key === "*" || key.key === "-" || key.key === "+" || key.key === "/" || key.key === '.'){
        //Do not enter symbol if result box is empty,
        //or if last character was also a symbol.
        if (!lastChar || lastChar === "×" || lastChar === "-" || lastChar === "+" || lastChar === "÷" || lastChar === '.') {
            emote = 'angry'
            return;
        }
        if (key.key === '.') {

            //Prevent enter several decimal points in one number.
            let splitResult = result.innerText.split(' ');
            if (splitResult[splitResult.length - 1].indexOf('.') > 0) {
                emote = 'angry';
                return;
            }
            result.innerText += (`${key.key}`);
            return;
        }

        if (key.key === "-" || key.key === "+") {
            result.innerText += (` ${key.key}`);
        } else {
            (key.key === "*") ? result.innerText += " ×" : result.innerText += " ÷";
        }
    } else if (key.key === "Delete") {
        result.innerText = "";
        emote = 'default';
    } else if (key.key === "Enter") {
        //Do not process if equation ends with a symbol.
        if (isNaN(lastChar)) {
            emote = 'angry';
            return;
        }
        emote = 'happy';
        result.innerText = process(text);
    } else if (key.key === "Backspace") {
        if (text === "") {
            emote = "angry";
        }
        result.innerText = text.slice(0,text.length-1);
    
    }
});

function process(equation) {
    let splitEquation = equation.split(" ");
    for (let i = 0; i < splitEquation.length; i++) {
        //Remove numbers surrounding times symbol and
        //the symbol, replace with their product.
        if (splitEquation[i] === "×"){
            let num1 = parseFloat(splitEquation[i-1]);
            let num2 = parseFloat(splitEquation[i+1]);
            splitEquation.splice(i-1,1);
            splitEquation.splice(i,1);
            splitEquation[i-1] = calculator.multiply(num1,num2);
            i = 0;
        } else if (splitEquation[i] === "÷"){
            let num1 = parseFloat(splitEquation[i-1]);
            let num2 = parseFloat(splitEquation[i+1]);

            //If dividing by 0, leave result text as is
            //and change emote animation to 'error'.
            if (num2 === 0) {
                emote = "error";
                return result.innerText;
            }

            splitEquation.splice(i-1,1);
            splitEquation.splice(i,1);
            splitEquation[i-1] = calculator.divide(num1,num2);
            i = 0;
        } 
    }
    for (let i = 0; i < splitEquation.length; i++) {
        if (splitEquation[i] === "+"){
            let num1 = parseFloat(splitEquation[i-1]);
            let num2 = parseFloat(splitEquation[i+1]);
            splitEquation.splice(i-1,1);
            splitEquation.splice(i,1);
            splitEquation[i-1] = calculator.add(num1,num2);
            i = 0;
        } else if (splitEquation[i] === "-"){
            let num1 = parseFloat(splitEquation[i-1]);
            let num2 = parseFloat(splitEquation[i+1]);
            splitEquation.splice(i-1,1);
            splitEquation.splice(i,1);
            splitEquation[i-1] = calculator.subtract(num1,num2);
            i = 0;
        }
    }

    //Limit total result length, then round last decimal 
    //to based on leftover result screen space.
    let stringInt = splitEquation[0].toString();
    if (stringInt.length > 14) {
        stringInt = stringInt.slice(0,15);
        let intArray = stringInt.split('.');
        stringInt = Number(stringInt).toFixed(intArray[1].length-1);
    }
    return stringInt;
   
}

let allPumps = document.querySelectorAll('img');

for (let i = 0; i < allPumps.length; i++) {
    allPumps[i].style.display = "none";
}

let pumps = document.getElementsByClassName('default');


let slideIndex = 0;
let emote = 'default';


function carousel() {
    let i;
    let pumps = document.getElementsByClassName(`${emote}`);
    let allPumps = document.querySelectorAll('img');
    for (i = 0; i < allPumps.length; i++) {
        allPumps[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > pumps.length) {slideIndex = 1}

    pumps[slideIndex-1].style.display = "block";
    setTimeout(carousel,500);
}

carousel();

//Close welcome message on click.
let message = document.getElementById('message');
message.addEventListener('click', () => {
    message.style.display = "none";
});



