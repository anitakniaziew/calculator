const { num1, operator, num2 } = clickedEquals({
  num1: "2",
  operator: "*",
  num2: "4"
});

console.assert(num1 === "8");
console.assert(operator === null);
console.assert(num2 === null);
