const quizzUserElement = document.querySelector(".tela1-quizzUser")
const quizzUserContainerElement = document.querySelector(".tela1-quizzUser .tela1-containerQuizz")
const quizzEveryElement = document.querySelector(".tela1-everyQuizz .tela1-containerQuizz")
const noQuizzElemet = document.querySelector(".tela1-noQuizz")

let idSelecionado;
let quizzes = [];
let quizzesStorage = [];
let answer = {
    text: "",
    image: "",
    isCorrectAnswer: true
}

let question = {
    title: "",
    color: "",
    answers: []
}

let level = {
    title: "",
    image: "",
    text: "",
    minValue: 0
}


let quizzCreate = {
	title: "",
	image: "",
	questions: [
		{
			title: "",
			color: "",
			answers: []
		},
		{
			title: "",
			color: "",
			answers: []
		},
		{
			title: "",
			color: "",
			answers: []
		}
	],
	levels: []
}

let = quizzUni = {};

getLocalStorageQuizzes();
getQuizzes();


function getLocalStorageQuizzes(){
    let quizzesLocalStorage = localStorage.getItem("quizzes")
    if(quizzesLocalStorage){
        quizzesStorage.push(...JSON.stringify(quizzesLocalStorage))
    }
}

function getQuizzes(){
    let promisse = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    promisse.then((response) => {
        quizzes = response.data
        handleQuizzes()
    })
    promisse.catch((err)=> {
        console.log(err)
    })
}

function getUniqueQuizz(id){
    let promisse = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`)
    promisse.then((response) => {
        quizzUni = response.data;
        quizzTela2()
    })
    promisse.catch((err)=> {
        console.log(err)
    })
}

function createQuizz(){
    let promisse = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizzCreate)
    promisse.then((response) => {
        console.log(response.status)
            quizzesStorage.push(response.data)
            localStorage.setItem("quizzes", quizzesStorage)
            quizzCreate = {
                title: "",
                image: "",
                questions: [
                    {
                        title: "",
                        color: "",
                        answers: []
                    },
                    {
                        title: "",
                        color: "",
                        answers: []
                    },
                    {
                        title: "",
                        color: "",
                        answers: []
                    }
                ],
                levels: []
            }
    })
    promisse.catch((err) => {
        console.log(err)
    })
}

function handleQuizzes(){
    quizzEveryElement.innerHTML = ""
    if(quizzesStorage.length){
        quizzUserContainerElement.innerHTML = ""
        noQuizzElemet.classList.add("hidden")        
        quizzesStorage.forEach(quizz => {
            quizzUserContainerElement.innerHTML += `
            <div onclick="getUniqueQuizz(${quizz.id})" class="tela1-quizz">
                <img src="${quizz.image}" />
                <div class="tela1-gradientQuizz"></div>
                <p>${quizz.title}</p>
            </div>
            `
        })
    } else {
        noQuizzElemet.classList.remove("hidden")
        quizzUserElement.classList.add("hidden")
        console.log(quizzUserElement)
    }

        quizzes.forEach(quizz => {
            quizzEveryElement.innerHTML += `
            <div onclick="getUniqueQuizz(${quizz.id})" class="tela1-quizz">
                <img src="${quizz.image}" />
                <div class="tela1-gradientQuizz"></div>
                <p>${quizz.title}</p>
            </div>
            `
    })
}

//---------------------PAGINAÇÃO-------------------

function infoBasicoTela3(){		
	
	let telaCriar = document.querySelector('.tela1-noQuizz');
    let telaInfoBasico = document.querySelector('.info-basico');
    let tela1 = document.querySelector('.tela1');
    telaCriar.classList.add('hidden');
    telaInfoBasico.classList.remove('hidden');
    tela1.classList.add("hidden")    
}

function perguntasTela3(dadosIniciais){		
	
    let telaInfoBasico = document.querySelector('.info-basico');
    let perguntasQuiz = document.querySelector('.perguntas-quiz');
    perguntasQuizz(dadosIniciais)
    telaInfoBasico.classList.add('hidden');
    perguntasQuiz.classList.remove('hidden');
}

function infoCadastroQuizz(){
    let tituloQuizz = document.querySelector(".info-basico input[name='tipo']").value
    let imagemQuizz = document.querySelector(".info-basico input[name='imagem']").value
    let qtdPerguntas = Number(document.querySelector(".info-basico input[name='perguntas']").value)
    let qtdNiveis = Number(document.querySelector(".info-basico input[name='niveis']").value)
    console.log(qtdNiveis)
    if((tituloQuizz.length >=20) && (tituloQuizz.length <= 65) && imagemQuizz && qtdPerguntas >= 3 && qtdNiveis >= 2){
        perguntasTela3({titulo: tituloQuizz, imagem: imagemQuizz, qtdPerguntas, qtdNiveis})
    }
}

function perguntasQuizz(dados){
    let perguntasQuizz = document.querySelector(".perguntas-quiz")
    perguntasQuizz.innerHTML = ""
    perguntasQuizz.innerHTML = `
    <h1>Crie suas perguntas</h1>
                <div class="caixa-formulario" id="1" onclick="abrirFormularioAoClicar(this, 1)">

                    <label for="pergunta">Pergunta 1</label>
                    <div class="centralizando-filho">
                        <input type="text" name="pergunta" placeholder="Texto da pergunta">
                        <input type="text" name="cor" placeholder="Cor de fundo da pergunta">
                    </div>

                    <label for="pergunta">Resposta correta</label>
                    <div class="centralizando-filho">
                        <input type="text" name="correta" placeholder="Resposta correta">
                        <input type="text" name="imagem" placeholder="URL da imagem">
                    </div>

                    <label for="pergunta">Respostas incorretas</label>
                    <div class="centralizando-filho">
                        <input type="text" name="correta" placeholder="Resposta incorreta 1">
                        <input type="text" name="imagem" placeholder="URL da imagem 1">
                    </div>

                    <div class="espaco"></div>

                    <div class="centralizando-filho">
                        <input type="text" name="correta" placeholder="Resposta incorreta 2">
                        <input type="text" name="imagem" placeholder="URL da imagem 2">
                    </div>

                    <div class="espaco"></div>
                    <div class="centralizando-filho">
                        <input type="text" name="correta" placeholder="Resposta incorreta 3">
                        <input type="text" name="imagem" placeholder="URL da imagem 3">
                    </div>
                </div>
    `
    for(let i=1; i<dados.qtdPerguntas; i++){
        perguntasQuizz.innerHTML += `
        <div class="caixa-formulario recolhido" id='${i+1}' onclick='abrirFormularioAoClicar(this, ${i+1})'>
        <label for="pergunta">Pergunta ${i+1}</label>
        <ion-icon name="create-outline"></ion-icon>
        </div>
        `   
    }

    perguntasQuizz.innerHTML += `<button onclick="niveisTela3()" class="botao-color">Prosseguir pra criar níveis</button>`
}

function abrirFormularioAoClicar(element, pergID){
    let perguntasQuizzForm = document.querySelectorAll(".perguntas-quiz .caixa-formulario")
   
    perguntasQuizzForm.forEach(pergunta => {
        if(pergunta.getAttribute("id") !== pergID){
            pergunta.classList.add("recolhido")
            pergunta.innerHTML = `
            <label for="pergunta">Pergunta ${pergunta.getAttribute("id")}</label>
            <ion-icon name="create-outline"></ion-icon>
            `
        }
    })

   
    element.innerHTML = `
    <div class="caixa-formulario" id="${pergID}">

    <label for="pergunta">Pergunta ${pergID}</label>
    <div class="centralizando-filho">
        <input type="text" name="pergunta" placeholder="Texto da pergunta">
        <input type="text" name="cor" placeholder="Cor de fundo da pergunta">
    </div>

    <label for="pergunta">Resposta correta</label>
    <div class="centralizando-filho">
        <input type="text" name="correta" placeholder="Resposta correta">
        <input type="text" name="imagem" placeholder="URL da imagem">
    </div>

    <label for="pergunta">Respostas incorretas</label>
    <div class="centralizando-filho">
        <input type="text" name="correta" placeholder="Resposta incorreta 1">
        <input type="text" name="imagem" placeholder="URL da imagem 1">
    </div>

    <div class="espaco"></div>

    <div class="centralizando-filho">
        <input type="text" name="correta" placeholder="Resposta incorreta 2">
        <input type="text" name="imagem" placeholder="URL da imagem 2">
    </div>

    <div class="espaco"></div>
    <div class="centralizando-filho">
        <input type="text" name="correta" placeholder="Resposta incorreta 3">
        <input type="text" name="imagem" placeholder="URL da imagem 3">
    </div>
</div>
    `
}

function niveisTela3(){		
    
    let perguntasQuiz = document.querySelector('.perguntas-quiz');
    let niveisQuiz = document.querySelector('.niveis-quiz');
    
    perguntasQuiz.classList.add('hidden');
    niveisQuiz.classList.remove('hidden');    
}

function sucessoTela3(){    
    
    let niveisQuiz = document.querySelector('.niveis-quiz');
    let sucessoQuiz = document.querySelector('.sucesso-quiz');    

    niveisQuiz.classList.add('hidden'); 
    sucessoQuiz.classList.remove('hidden');   
}

function voltarHome(){    
    window.location.reload();
}

function quizzTela2(){

    let tela2 = document.querySelector('.tela2');
    let tela1 = document.querySelector('.tela1'); 
    let tela3 = document.querySelector('.tela3'); 
    let quizzSelecionado = document.querySelector('.quizz-selecionado')

    tela2.classList.remove('hidden');
    tela1.classList.add('hidden'); 
    tela3.classList.add('hidden');

    quizzSelecionado.innerHTML = `<div class="banner">       
    <h2>${quizzUni.title}</h2>
    </div>`
    
    for(let i=0; i<quizzUni.questions.length; i++){
        quizzSelecionado.innerHTML+=`<div class="card-quizz">
        <h3>${quizzUni.questions[i].title}</h3>
        <div class="respostas">`
        quizzSelecionado.innerHTML+=`
        </div>
    </div>`
    let respostasElement = document.querySelectorAll(".respostas")[i]
        quizzUni.questions[i].answers.forEach(resp => {
            respostasElement.innerHTML += `
            <div class="item">
            <img src="${resp.image}" />
            <p>${resp.text}</p>
        </div>
            `
        })
    }
}

function renderTela3(){

}