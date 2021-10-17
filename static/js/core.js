let Core = function () {
    const API_URL = "https://api.ratesapi.io/api/"
    let data = []


    /**TODO: ADD PAGE LOADER FOR AJAX */
    let getUserInformation = function (callback) {
        $.post("get-user-information", function (data) {
            if (data.status) {
                callback(data)
            } else {
                console.log(data)
            }
        });
    }

    let updateUserInformation = function (pos_data) {
        $.post("update-user-information",pos_data, function (data) {
            if(data.status){
                alert("Personal information updated successfully!")
            }
            else {
                alert(data.server_message)
            }
        });
    }

    let updateUserPassword = function (pos_data) {
        $.post("update-user-password",pos_data, function (data) {
            if(data.status){
                alert("Passwords updated successfully!")
            }
            else {
                alert(data.server_message)
            }
        });
    };

    let registerUser = function (pos_data) {
        $.post("register",pos_data, function (data) {
            if(data.status){
                alert("Registered successfully!")
            }
            else {
                alert(data.server_message)
            }
        });
    };

    let getCityNames = function (callback) {
        $.get("static/json/il.json", function (data) {
            callback(data)
        });
    }

    /**TODO:TEST WEATHER DATA **/
    let getWeatherDataByName = function (city_name,number_of_day,callback) {
        /**
        $.get("static/json/test.json", function (data) {
            callback(data)
        });
        **/
        let pos_data = {
            city_name:city_name,
            number_of_day:number_of_day
        }

        $.post('get-weather-data-by-name',pos_data,function (data) {
            callback(data)
        })

    }

    return {
        init:function () {
            TabNavigationHandler.initNavigationTabHandler();
        },
        getUserInformationFromDb:function (callback) {
            getUserInformation(callback)
        },
        updateUserInformation:function (pos_data) {
            updateUserInformation(pos_data);
        },
        updateUserPassword:function (pos_data) {
            updateUserPassword(pos_data)
        },
        registerUser:function (pos_data) {
            registerUser(pos_data)
        },
        getCityNames:function (callback) {
            getCityNames(callback)
        },
        getWeatherDataByName:function (city_name,number_of_day,callback) {
            getWeatherDataByName(city_name,number_of_day,callback)
        }
    }
}()