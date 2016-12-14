$(document).ready(function(){
  //chiusura al click sulla parte scura
  $("#hover").click(function(){
		$(this).fadeOut();
    $("#confirmationPopup").fadeOut();
	});

  //chiusura al click sul pulsante
  $("#close").click(function(){
		$("#hover").fadeOut();
    $("#confirmationPopup").fadeOut();
	});

  $('.frmNotifyCustomer input').on('keyup blur', function () { // fires on every keyup & blur
    if ($('.frmNotifyCustomer').valid()) {                   // checks form for validity
        $('button.submitButton').prop('disabled', false);        // enables button
    } else {
        $('button.submitButton').prop('disabled', 'disabled');   // disables button
    }
  });

  //Validate entries
  validateForm();
});

$(".enterButton").click(function (e) {
    e.preventDefault();
    $(".frmNotifyCustomer").css('max-height', '300px');
    $('.enterButton').text('Unfortunately...');

    $('input[name=txtName]').focus();

});


$('.submitButton').click(function (e) {
  e.preventDefault(); // Prevent Link from Firing

  //e.unbind(); //unbind. to stop multiple form submit.
  doAjaxPost();
});

function validateForm(){
  $('.frmNotifyCustomer').validate({
    rules: {
        txtName: {
          required: true
        },
        txtEmail: {
            minlength: 2,
            maxlength: 255,
            required: true,
            email: true
        }
    },
    debug: true,
    focusInvalid: true,
    onkeyup: function(element) {
        $(element).valid();
    },
    onfocusout: function(element) {
        $(element).valid();
    },
    messages: {
      txtName: {
        required: "Please specify your name. We would like to get to know you better."
      },
      txtEmail: {
        required: "We need your email address to contact you",
        email: "Your email address must be in the format of name@domain.com"
      }
    },
    highlight: function (element) {
        $(element).closest('input[type="text"]').addClass('has-error');
    },
    unhighlight: function (element) {
        $(element).closest('input[type="text"]').removeClass('has-error');
    },
    errorContainer: $('#errorContainer'),
    errorLabelContainer: $('#errorContainer ul'),
    wrapper: 'li',
    errorPlacement: function (error, element) {
        if (element.parent('input[type="text"]').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    }
  });
}

function doAjaxPost(){
  // If it is, compile all user info into one object
  var newUser = {
      'name': $('input[name="txtName"]').val(),
      'email': $('input[name="txtEmail"]').val()
  }

  // Use AJAX to post the object to our adduser service
  $.ajax({
      type: 'POST',
      data: newUser,
      url: '/',
      dataType: 'JSON'
  }).done(function( response ) {

    // Check for successful (blank) response
    if (response.msg === '') {

        // Clear the form inputs
        $('.frmNotifyCustomer input[type="text"]').val('');
        showDialogBox('Success!', 'Thank you for adding your contact info to our mailing list. We look forward to serving you with some of the best organic meals very soon', '#5f964f');

    }
    else {

        // If something goes wrong, alert the error message that our service returned
        showDialogBox('Error!!!', response.msg, '#e28a15');

    }
  });
}

function showDialogBox(title, msg, color){
  $('#txtTitle').text(title);
  $('#txtNotice').text(msg);

  $('#txtTitle').css('color', color);
  $('#close').css('background-color', color);

  var border = '2px solid ' + color;
  $('#close').css('border', border);

  $("#hover").fadeIn();
  $('#confirmationPopup').fadeIn();

}
