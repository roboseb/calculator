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

let sClicks = 0;

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
       
    //Pump easter egg.    
    } else if (key.key === 's') {
        let imgbox = document.getElementById('imgbox');
        imgbox.style.width = `${90+sClicks*2}px`;
        imgbox.style.height = `${90+sClicks*2}px`;
        for (let i = 0; i < imgbox.children.length; i++) {
            let currentPump = imgbox.children[i];
            let currentClass = currentPump.className;
            let currentPumps = document.getElementsByClassName(currentClass);
            console.log(currentPumps)
            currentPumps[0].style.width = `${80+sClicks*2}px`;
            currentPumps[1].style.width = `${80+sClicks*2}px`;
            currentPumps[0].style.height = `${80+sClicks*2}px`;
            currentPumps[1].style.height = `${80+sClicks*2}px`;
        }
        sClicks++;
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

//Animate on screen keys on keypress. If I was rebuilding
//this entire project, this listener would be in the
//other keypress listener.
document.addEventListener('keydown', key => {
    
    let currentKey;
    if (!isNaN(key.key) || key.key === ".") {
        currentKey = document.getElementById(key.key);
        currentKey.style.animationName = "numberhover";
    } else if (key.key === 'Delete') {
        currentKey = document.getElementById('ac');
        currentKey.style.animationName = "acequalshover";
    } else if (key.key === 'Enter') {
        currentKey = document.getElementById('equals');
        currentKey.style.animationName = "acequalshover";
    } else if (key.key === '+' || key.key === '-') {
        currentKey = document.getElementById(key.key);
        currentKey.style.animationName = "operatorhover";
    } else if (key.key === '/') {
        currentKey = document.getElementById('÷');
        currentKey.style.animationName = "operatorhover";
    } else if (key.key === '*') {
        currentKey = document.getElementById('×');
        currentKey.style.animationName = "operatorhover";
    } else if (key.key === 'Backspace') {
        currentKey = document.getElementById('backspace');
        currentKey.style.animationName = "operatorhover";
    }
    if (currentKey) {
        currentKey.style.animationDuration = "0.25s";
        setTimeout(() => {currentKey.style.animationName = null}, 250);
    }

});

//Close welcome message on click.
let message = document.getElementById('message');
let messagebox = document.getElementById('messagebox');
message.addEventListener('click', () => {
    messagebox.style.animationName = "fade";
    messagebox.style.animationDuration = "1s";
    messagebox.style.height="0px";
    message.style.animationName = "message ,textfade";
    message.style.animationDuration = "2s,1s";
    message.innerText = "I hope my death brings you joy..."
    setTimeout(() => {message.style.display = "none"} , 1000);
});

let messages = ["Now with keyboard support!", 
                "Featuring a stolen color palette!",
                "Loot at that cute little guy!",
                "Why not divide by zero?",
                "He's not angry, it's just sharpie!",
                "Better than your calculator project!",
                "Don't look too closely at the code!",
                "document.getElementById('message')"]

message.innerText = messages[Math.floor(Math.random() * messages.length)];

let allPumps = document.querySelectorAll('img');

for (let i = 0; i < allPumps.length; i++) {
    if (!allPumps[i].id) {allPumps[i].style.display = "none"}
}

let pumps = document.getElementsByClassName('default');


let slideIndex = 0;
let emote = 'default';


function carousel() {
    //Easter egg
    if (emote === "error" && message.innerText === "Why not divide by zero?") {
        message.innerText = "Pretty cool, huh?";
    }

    let i;
    let pumps = document.getElementsByClassName(`${emote}`);
    let allPumps = document.querySelectorAll('img');
    for (i = 0; i < allPumps.length; i++) {
        if (!allPumps[i].id) {allPumps[i].style.display = "none"}
    }
    slideIndex++;
    if (slideIndex > pumps.length) {slideIndex = 1}

    pumps[slideIndex-1].style.display = "block";
    setTimeout(carousel,500);
}

carousel();

//Easter egg for pump colour on clicks.
let timesClicked = 0;
document.getElementById('imgbox').addEventListener('click', () => {
    if (timesClicked === 0) {document.getElementById('imgbox').style.backgroundColor = 'teal'}
    timesClicked++;
    document.getElementById('imgbox').style.filter = `hue-rotate(${timesClicked * 5}deg)`;
});



