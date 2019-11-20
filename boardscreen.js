// Telas
var listScreen = document.getElementById("listScreen");
var erroTokenScreen = document.getElementById("errorTokenScreen");

//lists
var formCreateList = document.getElementById("createListForm");
var btnCreateNewList = document.getElementById("btnCreateNewList");
var btnCancelCreateList = document.getElementById("btnCancelCreateList");
var inputNewListName = document.getElementById("inputNewListName");
var btnFormCreateList = document.getElementById("ibtnFormCreateList");
var divListCardBody = document.getElementsByClassName("divCardBody");

var deleteListBtn = document.getElementsByClassName("btnDelete");

//card
var divCardList = document.getElementById("cardLists");
var lista = document.getElementsByClassName("card");
var listEdit = document.getElementsByClassName("btnEdit");
var listNewCard = document.getElementsByClassName("btnNewCard");

//modal Edit List
var modalRenameCard = document.getElementById("modalRenameList");
var formRenameList = document.getElementById("formRenameList");
var inputRenameList = document.getElementById("inputRenameList");
var deleteList = document.getElementsByClassName("btnDelete")

//Modal Create Card
var formCreateCard = document.getElementById("formCreateCard");
var inputNameCard = document.getElementById("inputNameCard");
var inputDateCard = document.getElementById("inputDateCard");

var idBoard = sessionStorage.getItem("idBoard");
var nameBoard = sessionStorage.getItem("nameBoard")

// token do usuário
var token_user = sessionStorage.getItem("token");
console.log("Token deste usuário é " + token_user);

if (token_user) {
    listScreen.style.display = 'block';
    erroTokenScreen.style.display = 'none';
    defaultScreen();
    getLists();

} else {
    listScreen.style.display = 'none';
    erroTokenScreen.style.display = 'block';
}

function defaultScreen() {

    document.body.style.backgroundColor = sessionStorage.getItem("colorBoard");
    var bold = document.createElement("b");
    bold.innerText = nameBoard;
    document.getElementById("titleBoard").appendChild(bold);
}

/**
 * Exibe ou esconde o form para criar uma nova lista
 */
btnCreateNewList.addEventListener("click", function (e) {

    btnCreateNewList.style.display = "none";
    formCreateList.style.display = "block";

});

btnCancelCreateList.addEventListener("click", function (e) {

    btnCreateNewList.style.display = "block";
    formCreateList.style.display = "none";

})

/**
 * Cria uma nova lista no servidor
 */
formCreateList.addEventListener("submit", function (e) {

    e.preventDefault();

    var dados = {
        name: inputNewListName.value,
        token: token_user,
        board_id: idBoard
    }

    console.log(dados);

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            console.log(this.responseText);
            alert("List cadastrado com sucesso!");
            location.reload();

        }

        if (this.readyState == 4 && this.status == 400) {

            console.log(this.status, this.responseText);
            alert("List não cadastrado!");
        }
    };

    var url = "https://tads-trello.herokuapp.com/api/trello/lists/new";

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send(JSON.stringify(dados));

})


function getLists() {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var lists = JSON.parse(this.responseText);
            console.log(lists);

            for (let i = 0; i < lists.length; i++) {
                createList(lists[i]["id"], lists[i]["name"], idBoard);
            }

            for (let i = 0; i < lists.length; i++) {
                editList(lista[i], listEdit[i], lists[i]["name"]);
                removeList(lista[i], deleteList[i]);
                createNewCard(lista[i], listNewCard[i])
            }

        } else if ((this.responseText) == 4) {
            console.log(this.status);
        }
    }

    var url = "https://tads-trello.herokuapp.com/api/trello/lists/" + token_user + "/board/" + idBoard;

    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send();

}

function getCards(idList,divListCardBody) {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            console.log("Cards da lista " + idList + ":");
            var cards = JSON.parse(this.responseText);
            console.log(cards);

            for(let i = 0; i<cards.length; i++){
                generateCard(idList, cards[i]["id"], cards[i]["name"], cards[i]["data"],divListCardBody);
            }

            for(let i=0;i<cards.length;i++){
                editCard(cards[i]["id"], cards[i]["name"]);

            }


        } else if (this.readyState == 4) {
            console.log(this.status);
        }
    };

    var url = "https://tads-trello.herokuapp.com/api/trello/cards/" + token_user + "/list/" + idList;

    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send();

}

//gera uma nova lista
function createList(idList, nameList, idBoard) {
    var h6 = document.createElement("h6");

    var divCard = document.createElement("div");
    divCard.classList = "col-sm-4 card mb-2 mr-2";
    divCard.id = idList;
    divCard.setAttribute("name", nameList);
    divCard.setAttribute("idBoard", idBoard);

    var firstChild = document.getElementById("cardLists").firstChild;

    // divCardList.appendChild(divCard);
    // listScreen.appendChild(divCardList);

    divCardList.insertBefore(divCard, firstChild);
    listScreen.appendChild(divCardList);

    //cria a div "Header"
    var divHeader = document.createElement("div");
    divHeader.classList = "card-header"
    divCard.appendChild(divHeader);

    //cria a div "Row"
    var divRow = document.createElement("div");
    divRow.classList = "row";
    divHeader.appendChild(divRow);

    //cria campo para exibir nome do board
    var divCol = document.createElement("div");
    divCol.classList = "col-6 justify-content-between";
    h6.innerText = nameList;

    divCol.appendChild(h6);
    divRow.appendChild(divCol);

    // cria botão de editar
    var divButton = document.createElement("div");
    divButton.classList = "col-sm-3 text-right"
    var button = document.createElement("button");
    button.classList = "btn btn-sm btn-primary btnEdit";
    button.innerText = "Editar";

    divButton.appendChild(button);
    divRow.appendChild(divButton);

    var divBtnDelete = document.createElement("div");
    divBtnDelete.classList = "col-sm-3 text-right"
    var btnDelete = document.createElement("button");
    btnDelete.classList = "btn btn-sm btn-danger btnDelete";
    btnDelete.innerText = "delete"

    divBtnDelete.appendChild(btnDelete);
    divRow.appendChild(divBtnDelete);


    // cria a div body
    var divBody = document.createElement("div");
    divBody.classList = "card-body divCardBody";

    var divBodyRow = document.createElement("div");
    divBodyRow.classList = "row divCardBodyRow"

    var divNewCardBtn = document.createElement("div");
    divNewCardBtn.classList = "col-12 my-2";

    var buttonLink = document.createElement("button");
    buttonLink.classList = "btn btn-md btn-link text-left btnNewCard";
    buttonLink.innerText = "Adicionar um cartão";

    divNewCardBtn.appendChild(buttonLink);
    divBodyRow.appendChild(divNewCardBtn);
    divBody.appendChild(divBodyRow);
    divCard.appendChild(divBody);
    
    /** 
     * Esta variável retorna a div que será usada para adicionar os cards
     * da lista
     **/  
    var divListCardBody = document.getElementsByClassName("divCardBody");
    
    /**
     * O numero 0 passado junto a "divListCardBody" como parâmetro serve
     * para "dizer" que essa váriável refere-se a a lista atual(Que esta sendo criada)
     * ou seja NÃO MEXA NESSE ZERO PELO AMOR DE DEUS.
     */
    getCards(idList, divListCardBody[0]);

}

//Permite Renomear a lista
function editList(lista, listEdit,nameList) {
    listEdit.addEventListener("click", function (e) {

        document.getElementById("modalTitleRenameList").innerText = nameList;

        $('#modalRenameList').modal('show');

        formRenameList.addEventListener("submit", function (e) {

            e.preventDefault();

            var dados = {
                list_id: lista.getAttribute("id"),
                name: inputRenameList.value,
                token: token_user
            }

            console.log(dados);

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {

                    console.log(this.responseText);
                    alert("List renomeado com sucesso!");
                    location.reload();

                }

                if (this.readyState == 4 && this.status == 400) {

                    console.log(this.status, this.responseText);
                    alert("List não cadastrado! Confira seus dados");
                }
            };

            var url = "https://tads-trello.herokuapp.com/api/trello/lists/rename";

            xhttp.open("PATCH", url, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send(JSON.stringify(dados));


        })


    });
}

//Permite Excluir uma lista
function removeList(lista, deleteList) {
    deleteList.addEventListener("click", function (e) {

        var dados = {
            list_id: lista.getAttribute("id"),
            token: token_user
        }

        console.log(dados);

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert("List deletado com sucesso");
                location.reload()

            } else if ((this.responseText) == 4) {
                alert("Não foi possivel deletar esta list");
                console.log(this.status);
            }

        }

        var url = "https://tads-trello.herokuapp.com/api/trello/lists/delete";

        xhttp.open("DELETE", url, true);
        xhttp.setRequestHeader("Content-type", "application/json");

        xhttp.send(JSON.stringify(dados));

    })
}

//Cria um novo Cartão
function createNewCard(lista, listNewCard) {

    listNewCard.addEventListener("click", function (e) {

        $('#modalCreateCard').modal('show');

        formCreateCard.addEventListener("submit", function (e) {
            e.preventDefault();

            var dados = {
                name: inputNameCard.value,
                data: inputDateCard.value,
                token: token_user,
                list_id: lista.getAttribute("id")
            }

            console.log(dados);

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {

                    console.log(this.responseText);
                    // alert("Cartão cadastrado com sucesso!");
                    location.reload();

                }

                if (this.readyState == 4 && this.status == 400) {

                    console.log(this.status, this.responseText);
                    alert("Cartão não cadastrado!");
                }
            };

            var url = "https://tads-trello.herokuapp.com/api/trello/cards/new";

            xhttp.open("POST", url, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send(JSON.stringify(dados));

        })


    })

}

//Gera um novo Cartão
function generateCard(idList,idCard, nameCard, dataCard,divListCardBody){

    var divTitleCard = document.createElement("div");
    divTitleCard.classList = "col-sm-12";
    var h6 = document.createElement("h6");
    h6.innerText = nameCard;

    divTitleCard.appendChild(h6);

    var divCardRow = document.createElement("div");
    divCardRow.classList = "row";
    
    divCardRow.appendChild(divTitleCard);

    var divCardBody = document.createElement("div");
    divCardBody.classList = "card-body";

    divCardBody.appendChild(divCardRow);

    var divListCard = document.createElement("div");
    divListCard.classList = "col-12 my-2 card cardCartoes";

    divListCard.appendChild(divCardBody);

    var divListCardRow = document.createElement("div");
    divListCardRow.classList = "row cardLista";
    divListCardRow.id = idCard;
    divListCardRow.setAttribute("name", nameCard);
    divListCardRow.setAttribute("data", dataCard);
    divListCardRow.setAttribute("id_list", idList);

    divListCardRow.appendChild(divListCard);
    
    /**
     * Une a div dos cards com a div body da lista
     */
    divListCardBody.appendChild(divListCardRow);


}

function editCard(idCard, nameCard){
    
    document.getElementById(idCard).addEventListener("click", function(e){
        
        e.stopPropagation()

        getComments(idCard);

        document.getElementById("modalTitleEditCard").innerHTML = nameCard;

        $("#modalEditCard").modal("show");
         
        //deleta Card
        document.getElementById("btnDeleteCard").addEventListener("click", function(e){

            var dados = {
                card_id: idCard,
                token: token_user
            }
            
            var xhttp = new XMLHttpRequest;

            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    alert("Card Deletado Com sucesso");
                    location.reload();
                }

                if(this.readyState == 4 && this.status == 400){
                    alert("Não foi possivel deletar o card");
                }
            }

            var url = "https://tads-trello.herokuapp.com/api/trello/cards/delete";
            xhttp.open("DELETE", url, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send(JSON.stringify(dados));
        })
        
        //altera a data de criação do card
        document.getElementById("formEditDateCard").addEventListener("submit", function(e){
            
            e.preventDefault();

            var dadosData = {
                token: token_user,
                card_id: idCard,
                data: document.getElementById("inputEditDataCard").value
            }
            console.log(dadosData);
        
            //Alterar Data do Card
            var xhttpData = new XMLHttpRequest();

            xhttpData.onreadystatechange = function(){

                if(this.readyState == 4 && this.status == 200){
                    console.log(this.responseText);
                    alert("Card Atualizado");
                    location.reload();
                }

                if(this.readyState == 4 && this.status == 400){
                    console.log(this.responseText);
                    alert("Alterações não realizadas");
                }
            }

            var urlEditData = "https://tads-trello.herokuapp.com/api/trello/cards/newdata";

            xhttpData.open("PATCH", urlEditData, true);
            xhttpData.setRequestHeader("Content-type", "application/json");

            xhttpData.send(JSON.stringify(dadosData));


        })
         
        //edita título do card
        document.getElementById("formEditTitleCard").addEventListener("submit", function(e){
             e.preventDefault();

            var  dadosTitle = {
                token: token_user,
                card_id: idCard,
                name: document.getElementById("inputEditTitleCard").value
            }

            console.log(dadosTitle);

            //Alterar Titulo do Card
            var xhttpTitle = new XMLHttpRequest();

            xhttpTitle.onreadystatechange = function(){

                if(this.readyState == 4 && this.status == 200){
                    console.log(this.responseText);
                    alert("Card Atualizado");
                    location.reload();
                }

                if(this.readyState == 4 && this.status == 400){
                    console.log(this.responseText);
                    alert("Alterações não realizadas");
                }
            }

            var urlEditTitle = "https://tads-trello.herokuapp.com/api/trello/cards/rename";

            xhttpTitle.open("PATCH", urlEditTitle, true);
            xhttpTitle.setRequestHeader("Content-type", "application/json");

            xhttpTitle.send(JSON.stringify(dadosTitle));

        })

        //adiciona comentário ao card
        document.getElementById("formEditTextArea").addEventListener("submit", function(e){
            e.preventDefault();

             var dados = {
                 card_id: idCard,
                 comment: document.getElementById("inputTextAreaEditCard").value,
                 token: token_user
             }

             console.log(dados);

             var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function(){

                if(this.readyState == 4 && this.status == 200){
                    console.log(this.responseText);
                    alert("Comentário Inserido");
                    location.reload();
                }

                if(this.readyState == 4 && this.status == 400){
                    console.log(this.responseText);
                    alert("Alterações não realizadas");
                }
            }

            var url = "https://tads-trello.herokuapp.com/api/trello/cards/addcomment";

            xhttp.open("POST", url, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send(JSON.stringify(dados));
        })


    })

}

function getComments(idCard){

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var listComments = JSON.parse(this.responseText);
            console.log(listComments);

            for(let i = 0; i<listComments.length;i++){
                gerateListComments(listComments[i]["comment"]);
            }

        } else if ((this.responseText) == 4) {
            console.log(this.status);
        }
    }

    var url = "https://tads-trello.herokuapp.com/api/trello/cards/" + token_user + "/" + idCard + "/comments";

    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send();


}

function gerateListComments(comment){

    var li = document.createElement("li");
    li.innerText = comment;

    document.getElementById("listCommentCard").appendChild(li);
}
