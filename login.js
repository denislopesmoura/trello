
/* Salvando os elementos do formulário de login */
var lgn_form = document.querySelector("#form-login");
var lgn_username = document.querySelector("#login-username");
var lgn_password = document.querySelector("#login-password");
var lgn_btn_submit = document.querySelector("#login-btn");

lgn_form.addEventListener("submit", function (e) {

    e.preventDefault();

    var dados = {
        username: lgn_username.value,
        password: lgn_password.value
    };

    console.log(dados);

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            var resposta = JSON.parse(this.responseText);
            sessionStorage.setItem("token", resposta.token);
            alert("Login efetuado com sucesso!");
            window.open("homescreen.html", "_self");

        } else if (this.readyState == 4 && this.status == 400) {

            alert("Verifique os dados!");
        }
    };

    /*  local pra onde os dados serão enviados */
    var url = "https://tads-trello.herokuapp.com/api/trello/login";

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    /*  converte os dados para um JSON */
    xhttp.send(JSON.stringify(dados));

});



