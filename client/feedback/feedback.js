$(document).ready(function (){
    $(".submit").click(function (event) {
        var name = $('.name').val();
        var email = $('.email').val();
        var type = $('.type').val();
        var message = $('.message').val();
        var status = $('.status');
        status.empty();

        if(email.length > 5 && email.includes('@') && email.includes('.')) {
            console.log("valid email");
        } else {
            event.preventDefault();
            status.append('<div>Email Is Not Valid</div>');
        }

        if(name.length > 3) {
            console.log("valid name");
        } else {
            event.preventDefault();
            status.append('<div>Name Is Not Valid</div>');
        }


        if(message.length >= 10) {
            console.log("valid message");
        } else {
            event.preventDefault()
            status.append('<div>Message Is Not Valid</div>');
        }
    });
});