module.exports = function zeros(expression) {
  function multiply(first, second) {
    var firstStr = first.toString();
    var secondStr = second.toString();
    var reversedArray1 = firstStr.split("").reverse();
    var reversedArray2 = secondStr.split("").reverse();
    var resultArray = [];

    for (var i = 0; i < reversedArray1.length; i++) {
      for (var k = 0; k < reversedArray2.length; k++) {
        var resultIndex = i + k;
        resultArray[resultIndex] =
          reversedArray1[i] * reversedArray2[k] +
          (resultIndex >= resultArray.length ? 0 : resultArray[resultIndex]);

        if (resultArray[resultIndex] > 9) {
          resultArray[resultIndex + 1] =
            Math.floor(resultArray[resultIndex] / 10) +
            (resultIndex + 1 >= resultArray.length
              ? 0
              : resultArray[resultIndex + 1]);
          resultArray[resultIndex] -=
            Math.floor(resultArray[resultIndex] / 10) * 10;
        }
      }
    }
    return resultArray.reverse().join("");
  }

  var resultArr = [];

  function calculateFactorial(numberforFactorial) {
    var factorialResult = 1;
    for (var i = numberforFactorial; i > 1; i--) {
      factorialResult = multiply(factorialResult, i);
    }
    resultArr.push(factorialResult);
  }

  function calculateCastratedFactorial(numberforFactorial) {
    var factorialResult = 1;
    for (var i = numberforFactorial; i > 1; i = i - 2) {
      factorialResult = multiply(factorialResult, i);
    }
    resultArr.push(factorialResult);
  }

  var numArr = expression.split("*");

  for (var j = 0; j < numArr.length; j++) {
    if (numArr[j].search("!!") === -1) {
      var numToUse = numArr[j].slice(0, numArr[j].length - 1);
      calculateFactorial(numToUse);
    } else {
      var thisNumToUse = numArr[j].slice(0, numArr[j].length - 2);
      calculateCastratedFactorial(thisNumToUse);
    }
  }

  var resultNum = resultArr.reduce(function(a, b) {
    return multiply(a, b);
  });

  var resultString = resultNum.toString();
  var answer = 0;
  var k = resultString.length - 1;

  function checkForZero(index) {
    if (resultString[index] === "0") {
      answer++;
      index--;
      checkForZero(index);
    }
  }

  checkForZero(k);

  return answer;
}
