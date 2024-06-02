// CADASTRAR 

let arrayDados = [];

function criarCadastro(){
    let cadastro = this.lerDados();
    this.adicionarCadastro(cadastro);
    console.log(arrayDados)
}

function adicionarCadastro(cadastro){
    arrayDados.push(cadastro);
}

// Ira puxar e armazenar os dados do cadastrar para inserir no array
function lerDados(){
    let cadastro = {}

    cadastro.email = document.getElementById("email").value;
    cadastro.password = document.getElementById("password").value;

    return cadastro;
}

// LOGAR
function acessar(){

   // for (i=0; i<=this.arrayDados; i++){
    console.log(arrayDados)
    //}
}