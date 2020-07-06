class Calculator {
    constructor(prevOperandText, currOperandText) {
        this.prevOperandText = prevOperandText,
        this.currOperandText = currOperandText,
        this.clear()
    }
    clear() {
        this.prevOperand = '';
        this.currOperand = '';
        this.operation = undefined;
    }

    appendNumber(number) {
        if (number === '.' && this.currOperand.includes('.')) {
            return
        }
        this.currOperand = this.currOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currOperand === '') {
            return
        }
        if (this.prevOperand !== '') {
            compute();
        }
        this.operation = operation;
        this.prevOperand = this.currOperand;
        this.currOperand = '';
    }

    compute() {
        let computation;
        let prev = parseFloat(this.prevOperand);
        let curr = parseFloat(this.currOperand);
        if (isNaN(prev) || isNaN(curr)) {
            return
        }
        switch(this.operation) {
            case '*':
                computation = prev * curr;
                break;
            case '/':
                computation = prev / curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '+':
                computation = prev + curr;
                break;
            default:
                return
        }

        this.currOperand = computation;
        this.operation = undefined;
        this.prevOperand = '';
    }

    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1);
    }

    getDisplayNumber(number) {
        let stringNumber = number.toString();
        let interDigits = parseFloat(stringNumber.split('.')[0]);
        let decimalNumber = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(interDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = interDigits.toLocaleString(
                'en', 
                {maximumFractionDigits: 0}
            )
        }
        if (decimalNumber != null) {
            return `${integerDisplay}.${decimalNumber}`;
        } else {
            return integerDisplay;
        }   

    }

    updateDisplay() {
        this.currOperandText.innerHTML = this.getDisplayNumber(this.currOperand);
        if (this.operation != null) {
            this.prevOperandText.innerHTML = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`;
        } else {
            this.prevOperandText.innerHTML = '';
        }
        
    }
}

const numberData = document.querySelectorAll('[data-number]');
const useOperation = document.querySelectorAll('[data-operation]');
const prevOperandText = document.querySelector('[previous-operand-text]');
const currOperandText = document.querySelector('[current-operand-text]');
const equalButton = document.querySelector('[data-equal]');
const allClear = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');


const calculator = new Calculator(prevOperandText, currOperandText);

numberData.forEach(button => {
    button.addEventListener('click', function() {
        calculator.appendNumber(button.innerHTML);
        calculator.updateDisplay();
    })
})

useOperation.forEach(button => {
    button.addEventListener('click', function() {
        calculator.chooseOperation(button.innerHTML)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', function() {
    calculator.compute();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', function() {
    calculator.delete();
    calculator.updateDisplay();
})

allClear.addEventListener('click', function() {
    calculator.clear();
    calculator.updateDisplay();
})