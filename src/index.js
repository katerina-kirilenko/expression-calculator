function eval(prevNum, nextNum, sign) {
  switch (sign) {
    case "*":
      return prevNum * nextNum;
    case "/":
      return prevNum / nextNum;
    case "+":
      return prevNum + nextNum;
    case "-":
      return prevNum - nextNum;
  }
}

function foo(arrExpr) {
  while (arrExpr.includes("*") || arrExpr.includes("/")) {
    let include = arrExpr.includes("*") && arrExpr.includes("/");

    let mult = arrExpr.indexOf("*") > 0 ? arrExpr.indexOf("*") : 0;
    let del = arrExpr.indexOf("/") > 0 ? arrExpr.indexOf("/") : 0;
    let sign;

    if (mult < del && include) sign = mult;
    else if (mult > del && include) sign = del;
    else if (mult > 0) sign = mult;
    else sign = del;

    res = eval(+arrExpr[sign - 1], +arrExpr[sign + 1], arrExpr[sign]);
    arrExpr.splice(sign - 1, 3, res);
  }

  while (arrExpr.includes("+") || arrExpr.includes("-")) {
    let include = arrExpr.includes("+") && arrExpr.includes("-");

    let minus = arrExpr.indexOf("-") > 0 ? arrExpr.indexOf("-") : 0;
    let plus = arrExpr.indexOf("+") > 0 ? arrExpr.indexOf("+") : 0;
    let sign;

    if (minus < plus && include) sign = minus;
    else if (minus > plus && include) sign = plus;
    else if (minus > 0) sign = minus;
    else sign = plus;

    res = eval(+arrExpr[sign - 1], +arrExpr[sign + 1], arrExpr[sign]);
    arrExpr.splice(sign - 1, 3, res);
  }

  return res;
}

function expressionCalculator(expr) {
  let arrExpr = expr.indexOf(" ") + 1 ? expr.split(" ") : expr.split("");

  let leftCountBrs = 0;
  let rightCountBrs = 0;
  for (let i = arrExpr.indexOf("/"); i < arrExpr.length; i++) {
    if (arrExpr[i] == "/" && arrExpr[i + 1] == 0) {
      throw new Error("TypeError: Division by zero.");
    }
  }
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] == "(") {
      leftCountBrs++;
    } else if (expr[i] == ")") {
      rightCountBrs++;
    }
  }
  if (leftCountBrs != rightCountBrs)
    throw new Error("ExpressionError: Brackets must be paired");

  while (arrExpr.includes(")")) {
    let brsEnd = arrExpr.indexOf(")");
    let arrToBrsEnd = [];
    let counter = 1;

    for (let i = brsEnd - 1; i > 0; i--) {
      if (arrExpr[i] !== "(") {
        arrToBrsEnd.unshift(arrExpr[i]);
        counter++;
      } else {
        break;
      }
    }

    let item = foo(arrToBrsEnd);
    arrExpr.splice(brsEnd - counter, counter + 1, item);
  }

  return foo(arrExpr);
}

module.exports = {
  expressionCalculator
};
