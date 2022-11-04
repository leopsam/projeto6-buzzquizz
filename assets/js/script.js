const quizzUserElement = document.querySelector(".tela1-quizzUser")
const quizzUserContainerElement = document.querySelector(".tela1-quizzUser .tela1-containerQuizz")
const quizzEveryElement = document.querySelector(".tela1-everyQuizz .tela1-containerQuizz")
const noQuizzElemet = document.querySelector(".tela1-noQuizz")

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

function getLocalStorageQuizzes(){
    let quizzesLocalStorage = localStorage.getItem("quizzes")
    if(quizzesLocalStorage){
        quizzesStorage.push(...JSON.stringify(quizzesLocalStorage))
    }
}

getLocalStorageQuizzes()

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
            <div class="tela1-quizz">
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
            <div class="tela1-quizz">
                <img src="${quizz.image}" />
                <div class="tela1-gradientQuizz"></div>
                <p>${quizz.title}</p>
            </div>
            `
    })
}

getQuizzes()
//createQuizz()
