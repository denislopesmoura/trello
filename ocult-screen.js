window.onload = function () {

    var lgn_screen = document.querySelector("#login-container");
    var rgstr_screen = document.querySelector("#register-container");
    var navbar_homescreen = document.querySelector("#navbar-homescreem");
    var welcome_screen = document.querySelector("#welcome-screen");

    var lgn_link_rgstr = document.querySelector("#login-link-register");
    var rgstr_link_lgn = document.querySelector("#register-link-login");

    var navbar_link_login = document.querySelector("#navbar-link-login");
    var navbar_link_register = document.querySelector("#navbar-link-register");

    navbar_link_login.addEventListener("click", function(e){
       
        lgn_screen.style.display = 'block';
        rgstr_screen.style.display = 'none';
        navbar_homescreen.style.display = 'none';
        welcome_screen.style.display = 'none';
    });

    navbar_link_register.addEventListener("click", function(e){

        lgn_screen.style.display = 'none';
        rgstr_screen.style.display = 'block';
        navbar_homescreen.style.display = 'none';
        welcome_screen.style.display = 'none';
    });

    lgn_link_rgstr.addEventListener("click", function (e) {

        lgn_screen.style.display = 'none';
        rgstr_screen.style.display = 'block';

    });

    rgstr_link_lgn.addEventListener("click", function (e) {

        lgn_screen.style.display = 'block';
        rgstr_screen.style.display = 'none';

    });

}