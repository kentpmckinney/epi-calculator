let math = {
  '/': function (x, y) { return parseFloat(x) / parseFloat(y) },
  '*': function (x, y) { return parseFloat(x) * parseFloat(y) },
  '+': function (x, y) { return parseFloat(x) + parseFloat(y) },
  '-': function (x, y) { return parseFloat(x) - parseFloat(y) }
};

function calculate() {
  // Order of operations = brackets, exponents, division, multiplication, addition, subtraction
  while (/[*+/]+|\d+(?:-)\d+/.test($("#display").val())) {
    let ops = ["/","*","+","-"];
    for (let op of ops) {
      let str = $("#display").val();
      let re = new RegExp("[\\d\\.]+(?:\\" + op + ")[\\d\\.]+");
      let divMatch = str.match(re);
      let replacement = false;
      if (divMatch != null) {
        let divValues = divMatch.toString().split(op)
        let divResult = math[op](divValues[0],divValues[1]);
        $("#display").val(str.replace(divMatch, divResult));
        break; // Start back at the beginning of the while loop to maintain order of operations
      }
    }
  }
}

$(document).ready(function() {
  
  $("#display").keyup(function() {

    $("#display").val($("#display").val().replace(/\D\D|[^/*0-9+-\.]/g,''));

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      calculate(); 
    }

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
