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

console.log(calculator.subtract(10,3))