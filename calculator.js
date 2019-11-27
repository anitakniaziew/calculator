window.onload = function() {
  createButton(numbers);
  createButton(operators);
};

const calc = document.getElementById("calc");
let button = null;
const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const operators = ["C", "+", "-", "*", "/", ".", "="];
let state = {
  num1: null,
  operator: null,
  num2: null
};

function clickedC() {
  return {
    num1: null,
    operator: null,
    num2: null
  };
}

function clickedDot(currentState) {
  const { num1, operator, num2 } = currentState;

  if (num1 === null && operator === null && num2 === null) {
    return currentState;
  } else if (operator === null && num2 === null) {
    if (num1.indexOf(".") >= 0) {
      return currentState;
    } else {
      return {
        num1: num1 + ".",
        operator,
        num2
      };
    }
  } else if (num2 === null) {
    return currentState;
  } else {
    if (num2.indexOf(".") >= 0) {
      return currentState;
    } else {
      return {
        num1,
        operator,
        num2: num2 + "."
      };
    }
  }
}

function parseNumber(num) {
  if (num.indexOf(".") >= 0) {
    return Number.parseFloat(num);
  } else {
    return Number.parseInt(num);
  }
}

function calculateResult(number1, operator, number2) {
  number1 = parseNumber(number1);
  number2 = parseNumber(number2);
  switch (operator) {
    case "+":
      return (number1 + number2).toString();
    case "-":
      return (number1 - number2).toString();
    case "*":
      return (number1 * number2).toString();
    case "/":
      return (number1 / number2).toString();
  }
}

function clickedOperator(currentState, clickedOperator) {
  const { num1, operator, num2 } = currentState;

  if (num1 === null && operator === null && num2 === null) {
    return currentState;
  } else if (num2 === null) {
    return {
      num1,
      operator: clickedOperator,
      num2
    };
  } else {
    return {
      num1: calculateResult(num1, operator, num2),
      operator: clickedOperator,
      num2: null
    };
  }
}

function clickedEquals(currentState) {
  const { num1, operator, num2 } = currentState;

  if (num1 !== null && operator !== null && num2 !== null) {
    return {
      num1: calculateResult(num1, operator, num2),
      operator: null,
      num2: null
    };
  } else {
    return currentState;
  }
}

function numberClicked(currentState, id) {
  const { num1, operator, num2 } = currentState;

  if (num1 === null && operator === null && num2 === null) {
    return {
      num1: id,
      operator,
      num2
    };
  } else if (operator === null && num2 === null) {
    return {
      num1: num1 + id,
      operator,
      num2
    };
  } else if (num2 === null) {
    return {
      num1,
      operator,
      num2: id
    };
  } else {
    return {
      num1,
      operator,
      num2: num2 + id
    };
  }
}

function render(state) {
  const { num1, num2 } = state;
  let output = document.getElementById("output");
  if (num1 !== null && num2 === null) {
    output.innerHTML = num1;
  } else {
    output.innerHTML = num2;
  }
}

function clicked() {
  id = this.id[6];
  switch (id) {
    case "C":
      state = clickedC();
      break;
    case ".":
      state = clickedDot(state);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      state = clickedOperator(state, id);
      break;
    case "=":
      state = clickedEquals(state);
      break;
    default:
      state = numberClicked(state, id);
  }
  console.log(state);
  render(state);
}

function createButton(list) {
  for (let i = 0; i < list.length; i++) {
    button = document.createElement("button");
    button.innerHTML = list[i];
    button.id = "button" + list[i];
    button.onclick = clicked;
    calc.appendChild(button);
  }
}
