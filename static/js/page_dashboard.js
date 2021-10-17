let pageDashBoard = function () {
    let data = undefined;
    let city_names = undefined;
    let city_name = undefined;
    let number_of_day = undefined;

    let initCitySelection = function(city_names) {
        $('#city_select').html("");
        html_content = "";
        html_content = "<option value='0'  disabled selected>"+'Select a city'+"</option>";

        for(var i=0;i<city_names.length;i++){
            html_content += "<option value='"+ city_names[i].name +"'>"+city_names[i].name+"</option>";
        }

        $('#city_select').html(html_content);
    }

    let loadPage = function (ct_names) {
        city_names = ct_names[2]['data'];
        initCitySelection(city_names)
    };

    let formValidation = function(city_name,number_of_day) {
        hasError = false;
        if (city_name.length == 0 || city_name == "0" ) {
            $('#city_select_error').css("display", "block");
            hasError = true;
        } else {
            $('#city_select_error').css("display", "none");
        }

        if (number_of_day.length == 0 || number_of_day == "0") {
            $('#day_select_error').css("display", "block");
            hasError = true;
        } else {
            $('#day_select_error').css("display", "none");
        }

        return hasError;

    };

    let renderWeatherCards = function (data) {
        $('#weather_cards').html("");
        html_content = "";
        for(let i = 0;i<data.length;i++){
            html_content += '<div class="col-12 col-md-4 col-sm-12 col-xs-12 mt-3">\n' +
                    '<div class="card p-4">\n' +
                        '<div class="d-flex">\n' +
                            '<p id="city_name" class="flex-grow-1">'+city_name+'</p>\n' +
                            '<h6>'+data[i]['date']+'</h6>\n' +
                        '</div>\n' +
                        '<div class="d-flex flex-column temp mt-5 mb-3">\n' +
                            '<h1 class="mb-0 font-weight-bold" id="city_weather"> '+data[i]['avgtempC']+'° C </h1>\n' +
                            '<span class="small grey ml-1">'+data[i]['avgtempF']+'° F</span>\n' +
                        '</div>\n' +
                        '<button type="button" value="'+i+'" class="btn btn-light btn-sm stretched-link weather_detail_button" data-toggle="modal" data-target="#exampleModalCenter" data-whatever="@getbootstrap">Detail</button>\n' +
                    '</div>\n' +
            '</div>'
        }
        $('#weather_cards').html(html_content);

        $('.weather_detail_button').click(function () {
            renderModal($(this).val())
        });
    }

    let renderModal = function (index) {

        $('#modal_date').text(data[index]['date']);
        $('#modal_avgtempC').text(data[index]['avgtempC'])
        $('#modal_maxtempC').text(data[index]['maxtempC'])
        $('#modal_mintempC').text(data[index]['mintempC'])
    }

    let getAndRenderWeatherConditions = function (weather_data) {
        data = weather_data['data']['weather'];
        renderWeatherCards(data);
    }

    $('#get_weather_condition').click(function () {
        city_name = $("select#city_select option").filter(":selected").val();
        number_of_day = $("select#day_select option").filter(":selected").val()
        if(formValidation(city_name,number_of_day)){
            return
        }
        Core.getWeatherDataByName(city_name,number_of_day,getAndRenderWeatherConditions)
    });


    return {
        load: function () {
            Core.getCityNames(loadPage)
        },
        unload: function () {
            data = undefined;
            city_names = undefined;
        }
    }
}();