function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function division(num1, num2) {
    if (num2 === 0) {
        return "ERROR"
    }
    return num1 / num2
}

function operate(num1, num2, operator) {
    if (operator === "+") {
        return add(num1, num2)
    }
    else if (operator === "-") {
        return subtract(num1, num2)
    }
    else if (operator === "x") {
        return multiply(num1, num2)
    }
    else if (operator === "/") {
        return division(num1, num2)
    }
}

let num1 = "";
let operator = "";
let num2 = "";
let dots = 0;
let isNum1aResult = false
let num2beforeErase;

function updateNumber1(number) {
    if (number === ".") {
        dots++;
    }

    if (dots <= 1) {
        num1 += number
    }
    else {
        if (number != ".") {
            num1 += number
        }
    }
}

function updateNumber2(number) {
    if (number === ".") {
        dots++;
    }

    if (dots <= 1) {
        num2 += number
    }
    else {
        if (number != ".") {
            num2 += number
        }
    }
}

function getNumber(btn) {
    if (btn.classList.contains("number")) {
        return btn.textContent;
    }
    else if (btn.classList.contains("dot")) {
        return btn.textContent;
    }

}

function checkDecimalDigits(number) {
    let num = number.toString()
    let numArray = num.split(".")
    let lengthOfNumber = numArray[1].length
    return lengthOfNumber

}

function digitsLessThan5(digits) {
    if (digits <= 4) {
        return true
    }
    else {
        return false
    }
}

function minimizeDigits(number) {
    if (Number.isInteger(number)) {
        return number
    }
    else {
        let digits = checkDecimalDigits(number)
        if (digitsLessThan5(digits)) {
            return number
        }
        else {
            return number.toFixed(4)
        }
    }

}

function clearAll() {
    num1 = ""
    num2 = ""
    operator = ""
    dots = 0
    isNum1aResult = false
    screen_calc.textContent = ""

}

const btnsClicked = document.querySelector(".buttons-calc")
const screen_calc = document.querySelector(".screen-calc")

btnsClicked.addEventListener("click", (e) => {

    let target = e.target

    if (target.classList.contains("number") || target.classList.contains("dot")) {
        if (operator.length === 0) {
            if (isNum1aResult) {
                num1 = ""
                isNum1aResult = false
            }
            updateNumber1(getNumber(target))
            screen_calc.textContent = num1
        }
        else {
            updateNumber2(getNumber(target))
            screen_calc.textContent = num2

        }
    }

    if (num1.length != 0 && num2.length != 0) {

        if (target.classList.contains("equals") || target.classList.contains("operator")) {
            num1 = operate(Number(num1), Number(num2), operator)
            num1 = minimizeDigits(Number(num1))
            screen_calc.textContent = num1
            isNum1aResult = true
            if (num1 === "ERROR") {
                num1 = ""
                isNum1aResult = false
            }
            num2 = ""
            operator = ""
        }
    }

    if (num1.length != 0) {
        if (target.classList.contains("operator")) {
            operator = target.textContent
            dots = 0
            isNum1aResult = false

        }

    }

    if (target.classList.contains("clear")) {
        clearAll()
    }

    if (target.classList.contains("erase")) {
        if (isNum1aResult) {
            clearAll()
        }
        else {
            screen_calc.textContent = screen_calc.textContent.slice(0, -1)
            if (operator.length === 0) {
                if (num1.slice(-1) === ".") {
                    dots = 0
                }
                num1 = num1.slice(0, -1)

            }
            else {
                if (num2.slice(-1) === ".") {
                    dots = 0
                }
                num2 = num2.slice(0, -1)

            }

        }

    }

})
