let pageRegister = function () {

    let registerValidation = function (registerName,registerEmail,registerPassword1,registerPassword2) {
         hasError = false;

        if (registerName.length == 0) {
            $('#register_name_error').css("display", "block");
            hasError = true;
        } else {
            $('#register_name_error').css("display", "none");
        }

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(registerEmail)) {
            $('#register_email_error').css("display", "none");
        }
        else  {
            $('#register_email_error').css("display", "block");
            hasError = true;
        }

        if (registerPassword1.length == 0) {
            $('#register_password1_error').css("display", "block");
            hasError = true;
        } else {
            $('#register_password1_error').css("display", "none");
        }
        if (registerPassword2.length == 0 || registerPassword1 != registerPassword2) {
            $('#register_password2_error').css("display", "block");
            hasError = true;
        } else {
            $('#register_password2_error').css("display", "none");
        }


        return hasError

    }

    let registerUser = function (pos_data) {
        let registerName = $('#register_name').val();
        let registerEmail = $('#register_email').val();
        let registerPassword1 = $('#register_password1').val();
        let registerPassword2 = $('#register_password2').val();
        //let registerKey = $('#register_key').val();
        if(registerValidation(registerName,registerEmail,registerPassword1,registerPassword2)){
            return
        }
        let obj = {
            "register_name":registerName,
            "register_email":registerEmail,
            "register_password1":registerPassword1,
            "register_password2":registerPassword2,
        }

        Core.registerUser(obj)

    }

    $('#register_button') .click(function () {
        registerUser()
    })

    return {
        load:function () {
            console.log("Page register loaded")
        },
        unload:function () {

        }
    }


}()