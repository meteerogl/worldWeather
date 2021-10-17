let coreBase =  function()  {

    let loadCoreBase = function () {
        $('.mete').hover(function() {
             $('#onHover').show();
             $('#onExit').hide();
             //$('#main').css('margin-left',"200px")
        },function () {
            $('#onHover').hide();
            $('#onExit').show();
            //$('#main').css('margin-left',"60px")
        });
    };

    let unloadCoreBase = function () {

    };



    return{
        load:function () {
            loadCoreBase();
        },
        unload:function () {
            unloadCoreBase();
        }
    }
}();