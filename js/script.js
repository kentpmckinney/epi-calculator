function calculate() {

  const input = $("#display").val();
  let output = input;
  try {
    const result = eval(input);
    output = result;
  }
  catch (e) {
    showError('Calculation error. Please check the syntax and try again!');
    return;
  }
  finally {
    $("#display").val(output);
  }

}

function showError(message) {

  $('#error').text(message);
  $('#error').show();

}

function clearError() {

  $('#error').text('');
  $('#error').hide();

}

$(document).ready( () => {

  $('#display').bind('keypress', e => {

    let event = e || window.event;
    let code = event.keyCode || event.which;
    let key = String.fromCharCode(code);

    const ENTER_KEY = 13;
    if (code === ENTER_KEY) {
      clearError();
      calculate()
    }

    let valid = /[^^/*0-9+-.%]/;
    if (valid.test(key)) {
      e.preventDefault();
      return;
    }

  });

  $("button").click(function() {

    let input = $("#display");
    let btnValue = $(this).attr("value")
    switch (btnValue) {
      case "C":
        input.val('');
        break;
      case "=":
        clearError();
        calculate();
        break;
      default: input.val(input.val() + btnValue);
    }
    input.focus();

  });

  $('#display').focus();
});
