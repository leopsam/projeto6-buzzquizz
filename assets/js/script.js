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

let questions = []

let level = {
    title: "",
    image: "",
    text: "",
    minValue: ""
}

let levels = []


let quizzCreate =  {
title: "",
image: "",
questions: [],
levels: []
}

let quizzInfoIniciais = {}

let = quizzUni = {};

getLocalStorageQuizzes();
getQuizzes();


function getLocalStorageQuizzes(){
    let quizzesLocalStorage = localStorage.getItem("quizzes")
    console.log(quizzesLocalStorage)
    if(quizzesLocalStorage){
        quizzesStorage.push(...JSON.parse(quizzesLocalStorage))
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
            quizzesStorage.push(response.data)
            console.log(quizzesStorage)
            localStorage.setItem("quizzes", JSON.stringify(quizzesStorage))
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
    if(quizzesStorage.length > 0){
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
    if((tituloQuizz.length >=20) && (tituloQuizz.length <= 65) && imagemQuizz && qtdPerguntas >= 3 && qtdNiveis >= 2){
        perguntasTela3({titulo: tituloQuizz, imagem: imagemQuizz, qtdPerguntas, qtdNiveis})
        quizzCreate.image = imagemQuizz
        quizzCreate.title = tituloQuizz
        quizzInfoIniciais = {titulo: tituloQuizz, imagem: imagemQuizz, qtdPerguntas, qtdNiveis}
    }
}

function perguntasQuizz(dados){
    let perguntasQuizz = document.querySelector(".perguntas-quiz")
    perguntasQuizz.innerHTML = ""
    perguntasQuizz.innerHTML = `
    <h1>Crie suas perguntas</h1>
                <div class="caixa-formulario" id="1">

                    <label for="pergunta">Pergunta 1</label>
                    <div class="centralizando-filho">
                        <input type="text" name="pergunta" placeholder="Texto da pergunta" onchange="infoQuizzPerguntas(1)">
                        <input type="text" name="cor" placeholder="Cor de fundo da pergunta" onchange="infoQuizzPerguntas(1)">
                    </div>

                    <label for="pergunta">Resposta correta</label>
                    <div class="centralizando-filho">
                        <input type="text" name="correta" placeholder="Resposta correta" onchange="infoQuizzPerguntas(1)">
                        <input type="text" name="imagem" placeholder="URL da imagem" onchange="infoQuizzPerguntas(1)">
                    </div>

                    <label for="pergunta">Respostas incorretas</label>
                    <div class="centralizando-filho">
                        <input type="text" name="correta" placeholder="Resposta incorreta 1" onchange="infoQuizzPerguntas(1)">
                        <input type="url" name="imagem" placeholder="URL da imagem 1" onchange="infoQuizzPerguntas(1)">
                    </div>

                    <div class="espaco"></div>

                    <div class="centralizando-filho">
                        <input type="text" name="correta" placeholder="Resposta incorreta 2" onchange="infoQuizzPerguntas(1)">
                        <input type="text" name="imagem" placeholder="URL da imagem 2" onchange="infoQuizzPerguntas(1)">
                    </div>

                    <div class="espaco"></div>
                    <div class="centralizando-filho">
                        <input type="text" name="correta" placeholder="Resposta incorreta 3" onchange="infoQuizzPerguntas(1)">
                        <input type="text" name="imagem" placeholder="URL da imagem 3" onchange="infoQuizzPerguntas(1)">
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
    console.log(question)
    if(question.answers.length >= 2 && question.title.length > 0 && question.title.length > 0){
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

        questions.push({...question})
        question = {
            title: "",
            color: "",
            answers: []
        }
        console.log(questions)
   element.classList.remove("recolhido")
   element.removeAttribute("onclick")
    element.innerHTML = `
    <div class="caixa-formulario" id="${pergID}">

    <label for="pergunta">Pergunta ${pergID}</label>
    <div class="centralizando-filho">
        <input type="text" name="pergunta" placeholder="Texto da pergunta" onchange="infoQuizzPerguntas(${pergID})">
        <input type="text" name="cor" placeholder="Cor de fundo da pergunta" onchange="infoQuizzPerguntas(${pergID})">
    </div>

    <label for="pergunta">Resposta correta</label>
    <div class="centralizando-filho">
        <input type="text" name="correta" placeholder="Resposta correta" onchange="infoQuizzPerguntas(${pergID})">
        <input type="text" name="imagem" placeholder="URL da imagem" onchange="infoQuizzPerguntas(${pergID})">
    </div>

    <label for="pergunta">Respostas incorretas</label>
    <div class="centralizando-filho">
        <input type="text" name="correta" placeholder="Resposta incorreta 1" onchange="infoQuizzPerguntas(${pergID})">
        <input type="text" name="imagem" placeholder="URL da imagem 1" onchange="infoQuizzPerguntas(${pergID})">
    </div>

    <div class="espaco"></div>

    <div class="centralizando-filho">
        <input type="text" name="correta" placeholder="Resposta incorreta 2" onchange="infoQuizzPerguntas(${pergID})">
        <input type="text" name="imagem" placeholder="URL da imagem 2" onchange="infoQuizzPerguntas(${pergID})">
    </div>

    <div class="espaco"></div>
    <div class="centralizando-filho">
        <input type="text" name="correta" placeholder="Resposta incorreta 3" onchange="infoQuizzPerguntas(${pergID})">
        <input type="text" name="imagem" placeholder="URL da imagem 3" onchange="infoQuizzPerguntas(${pergID})">
    </div>
</div>
    `
    } else {
        alert("Você não cumpriu todos os requisitos.")
    }
}

function niveisTela3(){		
    
    let perguntasQuiz = document.querySelector('.perguntas-quiz');
    let niveisQuiz = document.querySelector('.niveis-quiz');

    if(questions.length === quizzInfoIniciais.qtdPerguntas - 1 && question.title.length > 0 && question.color.length > 0 && question.answers.length >= 2){
        questions.push({...question})
    }
    
    if(questions.length === quizzInfoIniciais.qtdPerguntas){
        quizzCreate.questions.push(...questions)
        console.log(quizzCreate)
        perguntasQuiz.classList.add('hidden');
        niveisQuiz.classList.remove('hidden');
        niveisQuizz()
    }
}

function infoQuizzPerguntas(){
    let pergunta = document.querySelector(`.perguntas-quiz input[name="pergunta"]`).value
    let cor = document.querySelector(`.perguntas-quiz .caixa-formulario input[name="cor"]`).value
    let respostaCorreta = document.querySelector(`.perguntas-quiz .caixa-formulario input[name="correta"]`).value
    let imagemRespostaCorreta = document.querySelectorAll(`.perguntas-quiz input[name="imagem"]`)[0].value
    let respostaIncorreta1 = document.querySelectorAll(`.perguntas-quiz .caixa-formulario .centralizando-filho`)[2]
    let respostaIncorreta2 = document.querySelectorAll(`.perguntas-quiz .caixa-formulario .centralizando-filho`)[3]
    let respostaIncorreta3 = document.querySelectorAll(`.perguntas-quiz .caixa-formulario .centralizando-filho`)[4]

    let respostaIncorreta1Text = respostaIncorreta1.children[0].value
    let respostaIncorreta1imagem = respostaIncorreta1.children[1].value

    let respostaIncorreta2Text = respostaIncorreta2.children[0].value
    let respostaIncorreta2imagem = respostaIncorreta2.children[1].value

    let respostaIncorreta3Text = respostaIncorreta3.children[0].value
    let respostaIncorreta3imagem = respostaIncorreta3.children[1].value

        if(pergunta.length >= 20){
            question.title = pergunta    
        }
    
        const regexHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
        if(regexHex.test(cor)){
            question.color = cor;
        }
    
        if(respostaCorreta && imagemRespostaCorreta){
            answer.isCorrectAnswer = true
            answer.text = respostaCorreta
            answer.image = imagemRespostaCorreta
            if(!question.answers.some(resp => resp.text === answer.text)){
                question.answers.push({...answer});
            }
        }
    
        if(respostaIncorreta1Text && respostaIncorreta1imagem){
            answer.text = respostaIncorreta1Text
            answer.isCorrectAnswer = false
            answer.image = respostaIncorreta1imagem
            if(!question.answers.some(resp => resp.text === answer.text)){
                question.answers.push({...answer})
            }
        }
    
        if(respostaIncorreta2Text && respostaIncorreta2imagem){
            answer.text = respostaIncorreta2Text
            answer.isCorrectAnswer = false
            answer.image = respostaIncorreta2imagem
            if(!question.answers.some(resp => resp.text === answer.text)){
            question.answers.push({...answer})
            }
        }
    
        if(respostaIncorreta3Text && respostaIncorreta3imagem){
                answer.text = respostaIncorreta3Text
                answer.isCorrectAnswer = false
                answer.image = respostaIncorreta3imagem
            if(!question.answers.some(resp => resp.text === answer.text)){
                question.answers.push(...answer)
            }
        }
    console.log(question) 
}

function niveisQuizz(){
    let niveisQuiz = document.querySelector('.niveis-quiz');
    
    niveisQuiz.innerHTML = `
    <h1>Agora, decida os níveis</h1>
    <div class="caixa-formulario" id=1 >
        <label for="nivel">Nível 1</label>
        <div class="centralizando-filho">
            <input type="text" name="nivel" placeholder="Título do nível" onchange="infoQuizzLevels(1)">
            <input type="text" name="acerto" placeholder="% de acerto mínima" onchange="infoQuizzLevels(1)">
            <input type="text" name="imagem" placeholder="URL da imagem do nível" onchange="infoQuizzLevels(1)">
            <input type="text" name="descricao" placeholder="Descrição do nível" onchange="infoQuizzLevels(1)">
        </div>
    </div>
    `

    for(let i=1; i < quizzInfoIniciais.qtdNiveis; i++){
        niveisQuiz.innerHTML += `
        <div class="caixa-formulario recolhido" id=${i+1} onclick="abrirNivelAoClicar(this, ${i+1})">
        <label for="nivel">Nível ${i+1}</label>
        <ion-icon name="create-outline"></ion-icon>
    </div>
        `
    }
    niveisQuiz.innerHTML += `<button onclick="sucessoTela3()" class="botao-color">Finalizar Quizz</button>`
}

function infoQuizzLevels(){
    let titulo = document.querySelector(".niveis-quiz .caixa-formulario input[name='nivel']").value
    let acerto = Number(document.querySelector(".niveis-quiz .caixa-formulario input[name='acerto']").value)
    let imagem = document.querySelector(".niveis-quiz .caixa-formulario input[name='imagem']").value
    let descricao = document.querySelector(".niveis-quiz .caixa-formulario input[name='descricao']").value

    let validarAcerto = (acerto >= 0) && acerto <= 100 && !isNaN(acerto)

    if(titulo.length >= 10 && validarAcerto && descricao.length >= 30 && imagem.length > 0){
        
        if(!levels.some(lev => lev.title === titulo)){
            level.text = descricao
            level.minValue = acerto
            level.title = titulo
            level.image = imagem
        }
    }
    console.log(level)
    console.log(levels)
}

function abrirNivelAoClicar(element, nivelID){

    if(level.image.length >0 && level.text.length > 0 && level.title.length > 0 && level.minValue >=0){
    let nivelQuizzForm = document.querySelectorAll(".niveis-quiz .caixa-formulario")

    nivelQuizzForm.forEach(nivel => {
        if(nivel.getAttribute("id") !== nivelID){
            nivel.classList.add("recolhido")
            nivel.innerHTML = `
            <label for="pergunta">Nivel ${nivel.getAttribute("id")}</label>
            <ion-icon name="create-outline"></ion-icon>
            `
        }
    })
    
    levels.push({...level})
    level = {
        title: "",
        image: "",
        text: "",
        minValue: ""
        }

    element.classList.remove("recolhido")
    element.removeAttribute("onclick")
    element.innerHTML = `
    <label for="nivel">Nível ${nivelID}</label>
    <div class="centralizando-filho">
        <input type="text" name="nivel" placeholder="Título do nível" onchange="infoQuizzLevels(${nivelID})">
        <input type="text" name="acerto" placeholder="% de acerto mínima" onchange="infoQuizzLevels(${nivelID})">
        <input type="text" name="imagem" placeholder="URL da imagem do nível" onchange="infoQuizzLevels(${nivelID})">
        <input type="text" name="descricao" placeholder="Descrição do nível" onchange="infoQuizzLevels(${nivelID})">
    </div>
    `
    } else {
        alert('Você não cumpriu todos os requisitos')
    }
}

function sucessoTela3(){    
    
    let niveisQuiz = document.querySelector('.niveis-quiz');
    let sucessoQuiz = document.querySelector('.sucesso-quiz');    

    if(levels.length === quizzInfoIniciais.qtdNiveis - 1 && level.text.length > 0 && level.title.length > 0 && level.image.length > 0){
        levels.push({...level}) 
    }
    if(levels.length === quizzInfoIniciais.qtdNiveis){
        quizzCreate.levels.push(...levels)
        createQuizz();
        levels = [];
        niveisQuiz.classList.add('hidden')
        sucessoQuiz.classList.remove('hidden')
    }  
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