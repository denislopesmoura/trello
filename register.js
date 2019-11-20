
/* Salvando os elementos do formulário de registro */
var rgstr_form = document.querySelector("#form-register");
var rgstr_name = document.querySelector("#register-name");
var rgstr_username = document.querySelector("#register-username");
var rgstr_password = document.querySelector("#register-password");
var rgstr_confirm_password = document.querySelector("#register-confirm-password");
var rgstr_btn_submit = document.querySelector("#register-btn");


rgstr_form.addEventListener("submit", function (e) {

    e.preventDefault();

    if(rgstr_confirm_password.value == rgstr_password.value ){
        /* objeto js com os elementos do form */
    var dados = {
        name: rgstr_name.value,
        username: rgstr_username.value,
        password: rgstr_password.value
    };

    console.log(dados);

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            alert("Usuário cadastrado com sucesso!");
            window.location.reload();
        }

        if (this.readyState == 4 && this.status == 400) {
            alert("Usuário não cadastrado, verifique o nome do usuário!");
            console.log(this.status, this.responseText);
        }
        //mensagem.style.display = 'block';
    };

    var url = "https://tads-trello.herokuapp.com/api/trello/users/new";

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send(JSON.stringify(dados));

    }else{
        alert("Senha Inválida");
        rgstr_password.value='';
        rgstr_confirm_password.value='';
    }

    
});

