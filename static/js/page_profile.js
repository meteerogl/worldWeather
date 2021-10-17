let pageProfile = function () {
    let userInformations = "";

    let fillForm = function (user_inf) {
        $('#firstName').val(user_inf.user_information.first_name);
        $('#lastName').val(user_inf.user_information.last_name);
        $('#username').val(user_inf.user_information.user_name);
        $('#email').val(user_inf.user_information.email_adress);
        $('#birthday').val(user_inf.user_information.birthday);
        $('#address').val(user_inf.user_information.adress);
    }

    let loadPage = function (user_data) {
        userInformations = user_data;
        fillForm(userInformations)
    };

    let formValidation = function (first_name, last_name, email, birthday, adress) {
        hasError = false;

        if (first_name.length == 0) {
            $('#firstName_error').css("display", "block");
            hasError = true;
        } else {
            $('#firstName_error').css("display", "none");
        }

        if (last_name.length == 0) {
            $('#lastName_error').css("display", "block");
            hasError = true;
        } else {
            $('#lastName_error').css("display", "none");
        }

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            $('#email_error').css("display", "none");
        }
        else  {
            $('#email_error').css("display", "block");
            hasError = true;
        }

        if (birthday.length == 0) {
            $('#birthday_error').css("display", "block");
            hasError = true;
        } else {
            $('#birthday_error').css("display", "none");
        }

        if (adress.length == 0) {
            $('#adress_error').css("display", "block");
            hasError = true;
        } else {
            $('#adress_error').css("display", "none");
        }

        return hasError;
    };

    let passwordValidation = function (pass1,pass2) {
        hasError = false;

        if (pass1.length == 0) {
            $('#password1_error').css("display", "block");
            hasError = true;
        } else {
            $('#password1_error').css("display", "none");
        }
        if (pass2.length == 0 || pass1 != pass2) {
            $('#password2_error').css("display", "block");
            hasError = true;
        } else {
            $('#password2_error').css("display", "none");
        }
        return hasError
    };

    $('#save').click(function () {
        let firstName = $('#firstName').val();
        let lastName = $('#lastName').val();
        let email = $('#email').val();
        let birthday = $('#birthday').val();
        let address = $('#address').val();
        if(formValidation(firstName, lastName, email, birthday, address)){
            return
        }
        let obj = {
            "first_name":firstName,
            "last_name":lastName,
            "email":email,
            "birthday":birthday,
            "adress":address
        }
        Core.updateUserInformation(obj);

    });

    $('#cancel').click(function () {
        TabNavigationHandler.backDashboard();
    });

    $('#change_password').click(function () {
        let pass1 = $('#password1').val()
        let pass2 = $('#password2').val()
        if(passwordValidation(pass1,pass2)){
            return
        }
        let obj = {
            "password1":pass1,
            "password2":pass2
        }
        Core.updateUserPassword(obj);
    });

    return {
        load: function () {
            Core.getUserInformationFromDb(loadPage)
        },
        unload: function () {
            userInformations = "";
        }
    }
}();