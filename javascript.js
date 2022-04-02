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
let solution;

//Enter input into result display div. Solve equation on equals input.
buttons.forEach(button => {
    button.addEventListener('click' , () => {
        let text = result.innerText;
        let lastChar = text.charAt(text.length-1)
        if (!isNaN(button.id)) {
            //Add a space before a number if the previous character was a math sign.
            if (lastChar === "×" || 
                lastChar === "-" || 
                lastChar === "+" || 
                lastChar === "÷") {
                result.innerText += ` ${button.id}`;
            } else {
                result.innerText += button.id;
            }
        } else if (button.id === "×" || button.id === "-" || button.id === "+" || button.id === "÷"){
            result.innerText += (` ${button.id}`);
        } else if (button.id === "ac") {
            result.innerText = "";
        } else {
            
            
        }
    });
});

let test = "10 - 4 ÷ 2";
function process(equation) {
    let splitEquation = equation.split(" ")
    for (let i = 0; i < splitEquation.length; i++) {
        //Remove numbers surrounding times symbol and
        //the symbol, replace with their product.
        if (splitEquation[i] === "×"){
            let num1 = parseInt(splitEquation[i-1]);
            let num2 = parseInt(splitEquation[i+1]);
            splitEquation.splice(i-1,1);
            splitEquation.splice(i,1);
            splitEquation[i-1] = calculator.multiply(num1,num2);
            i = 0;
        } else if (splitEquation[i] === "÷"){
            let num1 = parseInt(splitEquation[i-1]);
            let num2 = parseInt(splitEquation[i+1]);
            splitEquation.splice(i-1,1);
            splitEquation.splice(i,1);
            splitEquation[i-1] = calculator.divide(num1,num2);
            i = 0;
        } else if (splitEquation[i] === "+"){
            let num1 = parseInt(splitEquation[i-1]);
            let num2 = parseInt(splitEquation[i+1]);
            splitEquation.splice(i-1,1);
            splitEquation.splice(i,1);
            splitEquation[i-1] = calculator.add(num1,num2);
            i = 0;
        } else if (splitEquation[i] === "-"){
            let num1 = parseInt(splitEquation[i-1]);
            let num2 = parseInt(splitEquation[i+1]);
            splitEquation.splice(i-1,1);
            splitEquation.splice(i,1);
            splitEquation[i-1] = calculator.subtract(num1,num2);
            i = 0;
        }
    }

    return splitEquation;
   
}

console.log(process(test));

