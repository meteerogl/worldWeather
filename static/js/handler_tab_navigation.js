let TabNavigationHandler = function () {
    let last_clicked_tab = "tab_dashboard";
    let last_clicked_selector = "selector_dashboard";
    let load_element_handlers = Array();
    let tab_handlers = new Array();
    let active_tab;
    let number_of_tabs;

    let navigateToTab = function (current_clicked_tab,tab_number) {
        $('#'+last_clicked_tab).hide();
        $('#'+current_clicked_tab).show();
        last_clicked_tab = current_clicked_tab;
        tab_handlers[active_tab].unload();
        active_tab = tab_number;
        tab_handlers[tab_number].load(load_element_handlers[active_tab]);
        load_element_handlers[active_tab] =false;
    };

    let navigateTabButtons = function (clicked_selector) {
        $('#'+last_clicked_selector + "1").removeClass("active");
        $('#'+last_clicked_selector + "2").removeClass("active");
        $('#'+clicked_selector + "1").addClass("active");
        $('#'+clicked_selector + "2").addClass("active");
        last_clicked_selector = clicked_selector;
    };

    let initNavigationHandlers = function () {
        active_tab=0;
        tab_handlers.push(pageDashBoard);
        tab_handlers.push(pageProfile);
        number_of_tabs = tab_handlers.length;
        for(let i = 0; i < number_of_tabs; i++) {
            load_element_handlers.push(true);
        }

        navigateToTab('tab_dashboard',0);
        navigateTabButtons("selector_dashboard");

        $("#selector_dashboard1").click(function () {
            if(last_clicked_tab != "tab_dashboard"){
                navigateToTab( "tab_dashboard",0);
                navigateTabButtons("selector_dashboard")
            }

        });

        $("#selector_profile1").click(function () {
            if(last_clicked_tab != "tab_profile"){
                navigateToTab( "tab_profile",1);
                navigateTabButtons("selector_profile")
            }

        });

    };

    return {
        initNavigationTabHandler : function () {
            initNavigationHandlers();
        },
        backDashboard:function () {
            navigateToTab( "tab_dashboard",0);
            navigateTabButtons("selector_dashboard")
        }
    };

}();