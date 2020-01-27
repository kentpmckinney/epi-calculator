let math = {
  '/': function (x, y) { return x / y },
  '*': function (x, y) { return x * y },
  '+': function (x, y) { return x + y },
  '-': function (x, y) { return x - y },
  '%': function (x, y) { return x % y },
  '^': function (x, y) { return x ** y }
};

function calculate() {
  let iterations = 0;
  // Loop while there are operators ( ^ % / * + - ) in the input field
  let opsPresent = /\D+/g; ///[*-+/%()^]+/; //|\d+(?:\-\+\*\\\%\^)\d+
  while (opsPresent.test($("#display").val())) {
    if (iterations++ > 10) break; // FOR DEBUGGING - Break out of any unexpected infinite loops
    // Check for parenthetical expressions
    let parensPresent = /\(.*\)/g;
    let parenMatch = $("#display").val().match(parensPresent);
    // Remove parentheses if there are no operators within them
    let onlyNumInParen = $("#display").val().match(/\(-?[\d?\.?\d?]*\)/);
    if (onlyNumInParen) {
      let output = $("#display").val();
      output = output.replace(/[\(\)]/g,'');
      $("#display").val(output);
    }
    else {
      // Loop for each math operator
      let ops = ["^","%","/","*","+","-"];
      for (let op of ops) {
        console.log(op)
        // Evaluate parenthetical expressions first if present
        str = parenMatch ? parenMatch.toString() : $("#display").val();
        let matchOpPattern = new RegExp("(-?[\\d\\.]+)(\\"+op+")(-?[\\d\\.]+)");
        let match = Array.from(str.matchAll(matchOpPattern));
        console.log(match)
        if (match && match.length && match[0][2] === op) {
          let matchStr = match[0][0].toString();
          let val1 = match[0][1].toString();
          let val2 = match[0][3].toString();
          // Perform math calculation
          let result = math[op](parseFloat(val1),parseFloat(val2));
          let output = $("#display").val().replace(matchStr,
            (val1 < 0 && result > 0) ? "+" + result : result);
          output = output.replace(/^\+/,''); // Remove leading + operators
          $("#display").val(output);
          break; // Return to while loop
        }
      }
      console.log("after for loop")
    }
  }
}

$(document).ready(function() {
  
  $("#display").keyup(function() {
    let invalid = /[^^/*0-9+-.%()]|^[+]/g; //[^\d^%*+-][^\d^%*+-]|
    $("#display").val($("#display").val().replace(invalid,''));
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13') calculate(); 
  });

  $("button").click(function() {
    let btnValue = $(this).attr("value")
    switch (btnValue) {
      case "C": $("#display").val('');
        break;
      case "=": calculate()
        break;
      default: $("#display").val($("#display").val() + btnValue);
    }
    $("#display").focus();
  });

});
