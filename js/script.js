let math = {
  '/': function (x, y) { return parseFloat(x) / parseFloat(y) },
  '*': function (x, y) { return parseFloat(x) * parseFloat(y) },
  '+': function (x, y) { return parseFloat(x) + parseFloat(y) },
  '-': function (x, y) { return parseFloat(x) - parseFloat(y) },
  '%': function (x, y) { return parseFloat(x) % parseFloat(y) },
  '^': function (x, y) { return parseFloat(x) ** parseFloat(y) }
};

function calculate() {

  let iterations = 0;
  let opsPresent = /[*+/%()\^]+|\d+(?:-)\d+/;
  while (opsPresent.test($("#display").val())) {
    if (iterations++ > 10) break; // FOR DEBUGGING - Break out of any unexpected infinite loops
    let parensPresent = /\(.*\)/g;
    let parenMatch = $("#display").val().match(parensPresent);
    let ops = ["^","%","/","*","+","-"]; // Order of operations = paren, exp, div, mul, add, sub
    for (let op of ops) {
      let str = parenMatch ? parenMatch.toString() : $("#display").val();
      let matchOpPattern = new RegExp("[\\d\\.]+(?:\\" + op + ")[\\d\\.]+");
      let match = str.match(matchOpPattern);
      if (match != null) {
        let values = match.toString().split(op);
        let result = math[op](values[0],values[1]);
        $("#display").val(str.replace(parenMatch ? '(' + match.toString() + ')' : match, result));
        break; // Start loop over
      }
    }
  }

}

$(document).ready(function() {
  
  $("#display").keyup(function() {
    let invalidChracters = /\D[^\d\^]|[^/*0-9+-.%\(\)\^]/g;
    $("#display").val($("#display").val().replace(invalidChracters,''));
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13') calculate(); 
  });

  $("button").click(function() {
    let btnValue = $(this).attr("value")
    switch (btnValue) {
      case "C":
          $("#display").val('');
        break;
      case "=":
          calculate()
        break;
      default:
        $("#display").val($("#display").val() + btnValue);
    }
    $("#display").focus();
  });

});
