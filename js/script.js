function calculate() {
  const input = $("#display").val();
  const output = eval(input);
  $("#display").val(output);
}

$(document).ready(function () {

  $('#display').bind('keypress', function (e) {
    let event = e || window.event;
    let code = event.keyCode || event.which;
    let key = String.fromCharCode(code);

    if (code === 13) { calculate() }

    // Filter out keys that are always invalid
    let validCharacters = /[^^/*0-9+-.%]/;
    if (validCharacters.test(key)) {
      e.preventDefault();
      return;
    }

    // Filter keys that are invalid in certain contexts
    let string = $('#display').val();
    let valid = /[^^/*0-9+-.%]/;
    if (valid.test(string)) {
      e.preventDefault();
      return;
    }

  });

  $("button").click(function () {
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
