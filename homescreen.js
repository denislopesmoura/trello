
// Páginas do Trello
var homescreen = document.querySelector("#homescreen");
var error_screen = document.querySelector("#home-error-token");

// Botões e Links
var boards_menu = document.querySelector("#boards-menu");
var home_menu = document.querySelector("#home-menu");

//Modal
var modalCreateForm = document.querySelector("#modalCreateForm");
var modal_board_name = document.querySelector("#modal-board-name");
var modal_btn_create_board = document.querySelector("#modal-btn-create-quadro");
var modal_header = document.querySelector("#modal-header");

var modalRenameForm = document.getElementById("modalRenameForm");
var inputRename = document.getElementById("renameBoard");

// Board
var board_div = document.getElementById("board-div");
var board_row = document.getElementById("board-row");
var board = document.getElementsByClassName("board");
var boardRename = document.getElementsByClassName("rename");
var boardDelete = document.getElementsByClassName("delete");

// seletor de cor
var color_board;

// token do usuário
var token_user = sessionStorage.getItem("token");
console.log("Token deste usuário é " + token_user);

if (token_user) {
    homescreen.style.display = 'block';
    error_screen.style.display = 'none';

    getBoards();

} else {
    homescreen.style.display = 'none';
    error_screen.style.display = 'block';
}

//envia os dados do board para o servidor
modalCreateForm.addEventListener("submit", function (e) {

    e.preventDefault();

    var dados = {
        name: modal_board_name.value,
        color: color_board,
        token: token_user
    };

    console.log(dados);

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            console.log(this.responseText);
            alert("Board cadastrado com sucesso!");
            window.location.reload();

        }

        if (this.readyState == 4 && this.status == 400) {

            console.log(this.status, this.responseText);
            alert("Board não cadastrado!");
        }
    };

    var url = "https://tads-trello.herokuapp.com/api/trello/boards/new";

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send(JSON.stringify(dados));
});

/**
 * Seletores de Cor do Board presentes no modal
 * de criação do board
 */

function setColorOrange() {

    //salva a cor selecionada pelo usuário
    color_board = "#d29034";
    alert("Cor selecionada");
    console.log(color_board);

    //Altera a cor do cabeçalho do modal para a cor Laranja
    $("#modal-header").removeClass().addClass("modal-header");
    $("#modal-header").toggleClass("btn-orange");
}

function setColorGreen() {

    //salva a cor selecionada pelo usuário
    color_board = "#519839";
    alert("Cor selecionada");
    console.log(color_board);

    //Altera a cor do cabeçalho do modal para a cor Verde
    $("#modal-header").removeClass().addClass("modal-header");
    $("#modal-header").toggleClass("btn-green");
}

function setColorBlue() {

    //salva a cor selecionada pelo usuário
    color_board = "#055a8c";
    alert("Cor selecionada");
    console.log(color_board);

    //Altera a cor do cabeçalho do modal para a cor Azul
    $("#modal-header").removeClass().addClass("modal-header");
    $("#modal-header").toggleClass("btn-blue");
}

function setColorRed() {

    //salva a cor selecionada pelo usuário
    color_board = "#b04632";
    alert("Cor selecionada");
    console.log(color_board);

    //Altera a cor do cabeçalho do modal para a cor Vermelha
    $("#modal-header").removeClass().addClass("modal-header");
    $("#modal-header").toggleClass("btn-red");
}

/**
 * Retona todos os boards criado pelo usuário
 */
function getBoards() {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            var listBoard = JSON.parse(this.responseText);
            console.log(listBoard);

            for (let count = 0; count < listBoard.length; count++) {
                createBoard(listBoard[count]["id"], listBoard[count]["name"], listBoard[count]["color"])
            }


            for (let count = 0; count < listBoard.length; count++) {
                deleteBoard(board[count], boardDelete[count]);
                renameBoard(board[count], boardRename[count]);
                acessBoard(board[count]);

            }
        } else if (this.readyState == 4 && this.status == 400) {
            console.log(this.status, this.responseText);
        }
    }

    var url = "https://tads-trello.herokuapp.com/api/trello/boards/" + token_user;

    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send()

}

function createBoard(idBoard, nameBoard, colorBoard) {

    var boardDiv = document.createElement("div");

    boardDiv.classList = "col-3 card mb-3 mr-3 board"
    boardDiv.id = idBoard;
    boardDiv.setAttribute("name", nameBoard);
    boardDiv.setAttribute("color", colorBoard);
    boardDiv.style.backgroundColor = colorBoard;

    var boardBody = document.createElement("div");

    boardBody.classList = "card-body";


    var boardTitle = document.createElement("h6");
    var boldTag = document.createElement("b");
    boardTitle.classList = "card-title text-left";
    boldTag.innerText = nameBoard;

    var boardBtn = document.createElement("div");
    boardBtn.classList = "text-left"

    var boardBtnDelete = document.createElement("button");
    boardBtnDelete.classList = "btn btn-sm btn-danger delete mr-2";
    boardBtnDelete.innerText = "Delete";

    var boardBtnRename = document.createElement("button");
    boardBtnRename.classList = "btn btn-sm btn-secondary rename"
    boardBtnRename.innerText = "Edit"

    boardTitle.appendChild(boldTag);
    boardBody.appendChild(boardTitle);
    boardBtn.appendChild(boardBtnDelete);
    boardBtn.appendChild(boardBtnRename);
    boardBody.appendChild(boardBtn)

    boardDiv.appendChild(boardBody);
    board_row.appendChild(boardDiv);
    board_div.appendChild(board_row);
    homescreen.appendChild(board_div);


}

function renameBoard(board, boardRename) {

    boardRename.addEventListener("click", function (e) {

        e.stopPropagation();

        $('#mdRenameBoard').modal('show');

        modalRenameForm.addEventListener("submit", function (e) {
            e.preventDefault();

            var dadosRenameBoard = {
                board_id: board.getAttribute("id"),
                name: inputRename.value,
                token: token_user
            }

            var xhttpRenameBoard = new XMLHttpRequest();

            xhttpRenameBoard.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    alert("Nome Alterado");
                    location.reload();
                }
            };

            var urlRenameBoard = "https://tads-trello.herokuapp.com/api/trello/boards/rename";

            xhttpRenameBoard.open("PATCH", urlRenameBoard, true);
            xhttpRenameBoard.setRequestHeader("Content-type", "application/json");

            xhttpRenameBoard.send(JSON.stringify(dadosRenameBoard));

            if (board.getAttribute("color") != color_board) {
                var dadosColorBoard = {
                    board_id: board.getAttribute("id"),
                    color: color_board,
                    token: token_user
                }

                var xhttpColorBoard = new XMLHttpRequest();

                xhttpColorBoard.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        alert("Cor Alterada");
                        location.reload();
                    }
                };

                var urlColorBoard = "https://tads-trello.herokuapp.com/api/trello/boards/newcolor";

                xhttpColorBoard.open("PATCH", urlColorBoard, true);
                xhttpColorBoard.setRequestHeader("Content-type", "application/json");

                xhttpColorBoard.send(JSON.stringify(dadosColorBoard));

            }
        })
    });

}

function deleteBoard(board, boardDelete) {

    boardDelete.addEventListener("click", function (e) {

        e.stopPropagation();

        var dados = {
            board_id: board.getAttribute("id"),
            token: token_user
        }

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert("board deletado");
                location.reload();
            }
        };

        var url = "https://tads-trello.herokuapp.com/api/trello/boards/delete";

        xhttp.open("DELETE", url, true);
        xhttp.setRequestHeader("Content-type", "application/json");

        xhttp.send(JSON.stringify(dados));
    });

}

function acessBoard(board) {
    board.addEventListener("click", function(e){

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                sessionStorage.setItem("idBoard", board.getAttribute("id"));
                sessionStorage.setItem("nameBoard", board.getAttribute("name"));
                sessionStorage.setItem("colorBoard", board.getAttribute("color"));

                // Acessa a página do board
                location.replace("./boardscreen.html", "_self");
            }
        }

        var url = "https://tads-trello.herokuapp.com/api/trello/boards/" + token_user + "/" + board.getAttribute("id");

        xhttp.open("GET", url, true);
        xhttp.setRequestHeader("Content-type", "application/json");

        xhttp.send()
    })
}

