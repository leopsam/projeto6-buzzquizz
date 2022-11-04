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
let level = {
    title: "",
    image: "",
    text: "",
    inValue: 0
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
//createQuizz();


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
        console.log(response.data)
        quizzUni = response.data;
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
            <div onclick="quizzTela2(this)" class="tela1-quizz">
                <span class="hidden id-unitario">${quizz.id}</span>
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
            <div onclick="quizzTela2(this)" class="tela1-quizz">
                <span class="hidden id-unitario">${quizz.id}</span>
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
    let quizzesUsuario = document.querySelector('.tela1-quizzUser');
    let quizzesTodos = document.querySelector('.tela1-everyQuizz');
    
    telaCriar.classList.add('hidden');
    telaInfoBasico.classList.remove('hidden');
    quizzesUsuario.classList.add('hidden');
    quizzesTodos.classList.add('hidden');    
}

function perguntasTela3(){		
	
    let telaInfoBasico = document.querySelector('.info-basico');
    let perguntasQuiz = document.querySelector('.perguntas-quiz');
    
    telaInfoBasico.classList.add('hidden');
    perguntasQuiz.classList.remove('hidden');    
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

function quizzTela2(quizz){

    
    
    idSelecionado = document.querySelector('.id-unitario');
    idSelecionado = idSelecionado.innerHTML;

    let telaQuizz = document.querySelector('.quizz-selecionado');
    let tela1 = document.querySelector('.selecao-tela1'); 
    let tela3 = document.querySelector('.tela3'); 

    telaQuizz.classList.remove('hidden'); 
    tela1.classList.add('hidden'); 
    tela3.classList.add('hidden');

    let quizzUnitario = `
        <div class="banner">       
            <h2>${quizzUni.title}</h2>
        </div>            
        <div class="card-quizz">
            <h3>${quizzUni.title}</h3>
            <div class="respostas">
                <div class="item certo-errado-desmarcado">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHmXq_UovhRqnM96mGBIlrvg80vAinWuq0Vw&usqp=CAU" />
                    <p>Gatíneo</p>
                </div>
                <div class="certo-marcado item">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHmXq_UovhRqnM96mGBIlrvg80vAinWuq0Vw&usqp=CAU" />
                    <p class="certo-marcado">Gatíneo</p>
                </div>
                <div class="item errado-marcado">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHmXq_UovhRqnM96mGBIlrvg80vAinWuq0Vw&usqp=CAU" />
                    <p>Gatíneo</p>
                </div>
                <div class="item certo-errado-desmarcado">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHmXq_UovhRqnM96mGBIlrvg80vAinWuq0Vw&usqp=CAU" />
                    <p>Gatíneo</p>
                </div>
            </div>
        </div>`
        getUniqueQuizz(idSelecionado);
        telaQuizz.innerHTML = quizzUnitario 

        console.log(quizzUni)

    
}




