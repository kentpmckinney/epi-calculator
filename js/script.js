let math = {
  '/': function (x, y) { return parseFloat(x) / parseFloat(y) },
  '*': function (x, y) { return parseFloat(x) * parseFloat(y) },
  '+': function (x, y) { return parseFloat(x) + parseFloat(y) },
  '-': function (x, y) { return parseFloat(x) - parseFloat(y) }
};

function calculate() {
  // Order of operations = brackets, exponents, division, multiplication, addition, subtraction
  while (/[^\.\d]+/g.test($("#display").val())) {
    ["/","*","+","-"].forEach(function(operator) {
      let str = $("#display").val();
      let re = new RegExp("[\\d\\.]+(?:\\" + operator + ")[\\d\\.]+");
      let divMatch = str.match(re)
      if (divMatch != null) { 
        let divValues = divMatch.toString().split(operator)
        let divResult = math[operator](divValues[0],divValues[1]);
        $("#display").val(str.replace(divMatch, divResult));
      }
    });
  }
}

$(document).ready(function() {
  
  $("#display").keyup(function() {
    $("#display").val($("#display").val().replace(/\D\D|[^/*0-9+-\.]/g,''));
  });

  $("button").click(function() {
    let btnValue = $(this).attr("value")
    switch (btnValue) {
      case "C":
        break;
      case "=":
          calculate()
        break;
      default:
        $("#display").val($("#display").val() + btnValue);
    }
    $("display").focus();
  });

});
