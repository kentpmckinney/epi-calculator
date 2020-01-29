let math = {
  '/': function (x, y) { return x / y },
  '*': function (x, y) { return x * y },
  '+': function (x, y) { return x + y },
  '-': function (x, y) { return x - y },
  '%': function (x, y) { return x % y },
  '^': function (x, y) { return x ** y }
};

function calculate() {
  //let iterations = 0;
  let input = $("#display");
  let operatorsPresent = /\D+/g; ///[*-+/%()^]+/; //|\d+(?:\-\+\*\\\%\^)\d+
  while (operatorsPresent.test(input.val())) {
    //if (iterations++ > 10) break; // FOR DEBUGGING - Break out of any unexpected infinite loops
    // Loop for each math operator
    let ops = ["^","%","/","*","+","-"];
    for (let op of ops) {
      // Evaluate parenthetical expressions first if present
      let matchOpPattern = new RegExp("(-?[\\d\\.]+)(\\"+op+")(-?[\\d\\.]+)");
      let match = Array.from(input.val().matchAll(matchOpPattern));
      if (match && match.length && match[0][2] === op) {
        let matchStr = match[0][0].toString();
        let val1 = match[0][1].toString();
        let val2 = match[0][3].toString();
        // Perform math calculation
        let result = math[op](parseFloat(val1),parseFloat(val2));
        let output = input.val().replace(matchStr,
          (val1 < 0 && result > 0) ? "+" + result : result);
        output = output.replace(/^\+/,''); // Remove leading + operators
        input.val(output);
        break; // Return to while loop
      }
    }
  }
}

// function calculate() {
//   let iterations = 0;
//   // Loop while there are operators ( ^ % / * + - ) in the input field
//   let opsPresent = /\D+/g; ///[*-+/%()^]+/; //|\d+(?:\-\+\*\\\%\^)\d+
//   while (opsPresent.test($("#display").val())) {
//     if (iterations++ > 10) break; // FOR DEBUGGING - Break out of any unexpected infinite loops
//     // Check for parenthetical expressions
//     let parensPresent = /\(.*\)/g;
//     let parenMatch = $("#display").val().match(parensPresent);
//     // Remove parentheses if there are no operators within them
//     let onlyNumInParen = $("#display").val().match(/\(-?[\d?\.?\d?]*\)/);
//     if (onlyNumInParen) {
//       let output = $("#display").val();
//       output = output.replace(/[\(\)]/g,'');
//       $("#display").val(output);
//     }
//     else {
//       // Loop for each math operator
//       let ops = ["^","%","/","*","+","-"];
//       for (let op of ops) {
//         console.log(op)
//         // Evaluate parenthetical expressions first if present
//         str = parenMatch ? parenMatch.toString() : $("#display").val();
//         let matchOpPattern = new RegExp("(-?[\\d\\.]+)(\\"+op+")(-?[\\d\\.]+)");
//         let match = Array.from(str.matchAll(matchOpPattern));
//         console.log(match)
//         if (match && match.length && match[0][2] === op) {
//           let matchStr = match[0][0].toString();
//           let val1 = match[0][1].toString();
//           let val2 = match[0][3].toString();
//           // Perform math calculation
//           let result = math[op](parseFloat(val1),parseFloat(val2));
//           let output = $("#display").val().replace(matchStr,
//             (val1 < 0 && result > 0) ? "+" + result : result);
//           output = output.replace(/^\+/,''); // Remove leading + operators
//           $("#display").val(output);
//           break; // Return to while loop
//         }
//       }
//       console.log("after for loop")
//     }
//   }
// }

$(document).ready(function() {
  
  $('#display').bind('keypress',function(event) {
    switch (KeyboardEvent.code) {
        case 8:  // Backspace
        case 13: // Enter
        case 17: // Ctrl
        case 37: // Left
        case 39: // Right
        break;
        default:
        let invalid = /[^^/*0-9+-.%()]/;
        let key = event.key;
        if (invalid.test(key)) {
            event.preventDefault();
            return false;
        }
        break;
    }
  });

  // $("#display").keydown(function(event) {
  //   // pattern="^[a-zA-Z0-9]+$"
  //   console.log("keypress")
  //   var keycode = (event.keyCode ? event.keyCode : event.which);
  //   if(keycode == '13') calculate();
  //   let input = $("#display");
  //   let invalid = /[^^/*0-9+-.%()]|^[+]/g; //[^\d^%*+-][^\d^%*+-]|
  //   if (invalid.test(input.val())) { event.preventDefault(); return false; }
  //   //let valid = input.val().replace(invalid,'')
  //   //input.val(valid);
  // });

  $("button").click(function() {
    let input = $("#display");
    let btnValue = $(this).attr("value")
    switch (btnValue) {
      case "C": input.val('');
        break;
      case "=": calculate()
        break;
      default: input.val(input.val() + btnValue);
    }
    input.focus();
  });

});
