const quizzUserElement = document.querySelector(".usuario");
const quizzUserContainerElement = document.querySelector(".quizes-user");
const quizzEveryElement = document.querySelector(".quizes");
const noQuizzElemet = document.querySelector(".cabecalho-tela1");

let telaQuizz = document.querySelector('.quizz-selecionado');

let quizzes = [];
let quizzUniRend = [];
let idSelecionado;
let quantidadePerguntas = 0;
let porcentoAcerto;
let quantAcerto = 0;
let calculo = 0;
let calculoUni = 0;
let recaregar = '';
let novoQuizz;
let quizzesStorage = [];
let idSelecionadoPronto;
let quizzInfoIniciais = {};
let questions = [];
let levels = [];

let quizzCreate =  {
    title: "",
    image: "",
    questions: [],
    levels: []
    }

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
    minValue: ""
}

getLocalStorageQuizzes();
pegarQuizzes();

function getLocalStorageQuizzes(){
        let quizzesLocalStorage = localStorage.getItem("quizzes")
        //console.log(quizzesLocalStorage)
        if(quizzesLocalStorage){
            quizzesStorage.push(...JSON.parse(quizzesLocalStorage))
        }
}

function pegarQuizzes(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promessa.then(respostaQuizzesChegou);
    promessa.catch(respostaQuizzesErro);    
}

function respostaQuizzesChegou(resposta){
    //console.log('Quizzes chegou com sucesso!!!');
    quizzes = resposta.data;
    //console.log(quizzes);
    renderizarQuizzes();
}

function respostaQuizzesErro(){
    console.log('ERRO, nao foi possivel pegar os quizzes!!!');
}

function renderizarQuizzes(){
   /* const listaQuizzes = document.querySelector('.quizes');
    listaQuizzes.innerHTML = '';


    for(let i=0; i<quizzes.length; i++){
        let quiz = quizzes[i];

        listaQuizzes.innerHTML +=`
        <div onclick="quizzUni(this)" class="tela1-quizz">
            <span class="hidden id-unitario">${quiz.id}</span>
            <img src="${quiz.image}" />
            <div class="gradientQuizz"></div>
            <p>${quiz.title}</p>
        </div>`
    }*/
    
    

    quizzEveryElement.innerHTML = ""
    if(quizzesStorage.length > 0){
        quizzUserContainerElement.innerHTML = ""
        noQuizzElemet.classList.add("hidden") 
        quizzUserElement.classList.remove("hidden")       
        quizzesStorage.forEach(quizz => {
            quizzUserContainerElement.innerHTML += `
            <div onclick="quizzUni(${quizz.id})" class="tela1-quizz">
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
            <div onclick="quizzUni(${quizz.id})" class="tela1-quizz">
                <img src="${quizz.image}" />
                <div class="tela1-gradientQuizz"></div>
                <p>${quizz.title}</p>
            </div>
            `
    })
}

function infoBasicoTela3(){		

	let telaCriar = document.querySelector('.tela1');
    let telaInfoBasico = document.querySelector('.info-basico');
    let quizzesUsuario = document.querySelector('.quizes');
    
    telaCriar.classList.add('hidden');
    telaInfoBasico.classList.remove('hidden');
    quizzesUsuario.classList.add('hidden');   
    window.scrollTo(0, 0); 
   
}

/*function perguntasTela3(dadosIniciais){		
	
    let telaInfoBasico = document.querySelector('.info-basico');
    let perguntasQuiz = document.querySelector('.perguntas-quiz');
    perguntasQuizz(dadosIniciais)
    telaInfoBasico.classList.add('hidden');
    perguntasQuiz.classList.remove('hidden');
}*/

function infoCadastroQuizz(){

    let tituloQuizz = document.querySelector(".info-basico input[name='tipo']").value
    let imagemQuizz = document.querySelector(".info-basico input[name='imagem']").value
    let qtdPerguntas = Number(document.querySelector(".info-basico input[name='perguntas']").value)
    let qtdNiveis = Number(document.querySelector(".info-basico input[name='niveis']").value)
    //console.log(tituloQuizz, imagemQuizz, qtdPerguntas, qtdNiveis)


    if((tituloQuizz.length >=20) && (tituloQuizz.length <= 65) && imagemQuizz && qtdPerguntas >= 3 && qtdNiveis >= 2){
        perguntasTela3({titulo: tituloQuizz, imagem: imagemQuizz, qtdPerguntas, qtdNiveis})
        quizzCreate.image = imagemQuizz
        quizzCreate.title = tituloQuizz
        quizzInfoIniciais = {titulo: tituloQuizz, imagem: imagemQuizz, qtdPerguntas, qtdNiveis}
    }else{
        alert('preencha os dados corretamente!')
    }
    //console.log(quizzInfoIniciais)

    window.scrollTo(0, 0); 
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
        <input type="text" name="pergunta" title="No mínimo 20 caracteres" placeholder="Texto da pergunta" onchange="infoQuizzPerguntas(${pergID})">
        <input type="text" name="cor" title="Deve ser uma cor em hexadecimal (começar em #, seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F)" placeholder="Cor de fundo da pergunta" onchange="infoQuizzPerguntas(${pergID})">
    </div>

    <label for="pergunta">Resposta correta</label>
    <div class="centralizando-filho">
        <input type="text" name="correta" title="Não pode estar vazio" placeholder="Resposta correta" onchange="infoQuizzPerguntas(${pergID})">
        <input type="text" name="imagem" title="Deve ter formato de URL" placeholder="URL da imagem" onchange="infoQuizzPerguntas(${pergID})">
    </div>

    <label for="pergunta">Respostas incorretas</label>
    <div class="centralizando-filho">
        <input type="text" name="correta" title="Não pode estar vazio" placeholder="Resposta incorreta 1" onchange="infoQuizzPerguntas(${pergID})">
        <input type="text" name="imagem" title="Deve ter formato de URL" placeholder="URL da imagem 1" onchange="infoQuizzPerguntas(${pergID})">
    </div>

    <div class="espaco"></div>

    <div class="centralizando-filho">
        <input type="text" name="correta" title="Não pode estar vazio" placeholder="Resposta incorreta 2" onchange="infoQuizzPerguntas(${pergID})">
        <input type="text" name="imagem" title="Deve ter formato de URL" placeholder="URL da imagem 2" onchange="infoQuizzPerguntas(${pergID})">
    </div>

    <div class="espaco"></div>
    <div class="centralizando-filho">
        <input type="text" name="correta" title="Não pode estar vazio" placeholder="Resposta incorreta 3" onchange="infoQuizzPerguntas(${pergID})">
        <input type="text" name="imagem" title="Deve ter formato de URL" placeholder="URL da imagem 3" onchange="infoQuizzPerguntas(${pergID})">
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
        window.scrollTo(0, 0); 
        niveisQuizz()
    }
}

function niveisQuizz(){
    let niveisQuiz = document.querySelector('.niveis-quiz');
    
    niveisQuiz.innerHTML = `
    <h1>Agora, decida os níveis</h1>
    <div class="caixa-formulario" id=1 >
        <label for="nivel">Nível 1</label>
        <div class="centralizando-filho">
            <input type="text" name="nivel" title="No mínimo de 10 caracteres" placeholder="Título do nível" onchange="infoQuizzLevels(1)">
            <input type="text" name="acerto" title="Um número entre 0 e 100" placeholder="% de acerto mínima" onchange="infoQuizzLevels(1)">
            <input type="text" name="imagem" title="Deve ter formato de URL" placeholder="URL da imagem do nível" onchange="infoQuizzLevels(1)">
            <input type="text" name="descricao" title="Mínimo de 30 caracteres" placeholder="Descrição do nível" onchange="infoQuizzLevels(1)">
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
        <input type="text" name="nivel" title="No mínimo de 10 caracteres" placeholder="Título do nível" onchange="infoQuizzLevels(${nivelID})">
        <input type="text" name="acerto" title="Um número entre 0 e 100" placeholder="% de acerto mínima" onchange="infoQuizzLevels(${nivelID})">
        <input type="text" name="imagem" title="Deve ter formato de URL" placeholder="URL da imagem do nível" onchange="infoQuizzLevels(${nivelID})">
        <input type="text" name="descricao" title="Mínimo de 30 caracteres" placeholder="Descrição do nível" onchange="infoQuizzLevels(${nivelID})">
    </div>
    `
    } else {
        alert('Você não cumpriu todos os requisitos')
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

function perguntasQuizz(dados){
    let perguntasQuizz = document.querySelector(".perguntas-quiz")
    perguntasQuizz.innerHTML = ""
    perguntasQuizz.innerHTML = `
    <h1>Crie suas perguntas</h1>
                <div class="caixa-formulario" id="1">

                    <label for="pergunta">Pergunta 1</label>
                    <div class="centralizando-filho">
                        <input type="text" name="pergunta" title="No mínimo 20 caracteres" placeholder="Texto da pergunta" onchange="infoQuizzPerguntas(1)">
                        <input type="text" name="cor" title="Deve ser uma cor em hexadecimal (começar em #, seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F)" placeholder="Cor de fundo da pergunta" onchange="infoQuizzPerguntas(1)">
                    </div>

                    <label for="pergunta">Resposta correta</label>
                    <div class="centralizando-filho">
                        <input type="text" name="correta" title="Não pode estar vazio" placeholder="Resposta correta" onchange="infoQuizzPerguntas(1)">
                        <input type="text" name="imagem" title="Deve ter formato de URL" placeholder="URL da imagem" onchange="infoQuizzPerguntas(1)">
                    </div>

                    <label for="pergunta">Respostas incorretas</label>
                    <div class="centralizando-filho">
                        <input type="text" name="correta" title="Não pode estar vazio" placeholder="Resposta incorreta 1" onchange="infoQuizzPerguntas(1)">
                        <input type="url" name="imagem" title="Deve ter formato de URL" placeholder="URL da imagem 1" onchange="infoQuizzPerguntas(1)">
                    </div>

                    <div class="espaco"></div>

                    <div class="centralizando-filho">
                        <input type="text" name="correta" title="Não pode estar vazio" placeholder="Resposta incorreta 2" onchange="infoQuizzPerguntas(1)">
                        <input type="text" name="imagem" title="Deve ter formato de URL" placeholder="URL da imagem 2" onchange="infoQuizzPerguntas(1)">
                    </div>

                    <div class="espaco"></div>
                    <div class="centralizando-filho">
                        <input type="text" name="correta" title="Não pode estar vazio" placeholder="Resposta incorreta 3" onchange="infoQuizzPerguntas(1)">
                        <input type="text" name="imagem" title="Deve ter formato de URL" placeholder="URL da imagem 3" onchange="infoQuizzPerguntas(1)">
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

function perguntasTela3(dadosIniciais){		
	
    let telaInfoBasico = document.querySelector('.info-basico');
    let perguntasQuiz = document.querySelector('.perguntas-quiz');
    perguntasQuizz(dadosIniciais)
    telaInfoBasico.classList.add('hidden');
    perguntasQuiz.classList.remove('hidden');
    window.scrollTo(0, 0);    
}

/*function niveisTela3(){		
    
    let perguntasQuiz = document.querySelector('.perguntas-quiz');
    let niveisQuiz = document.querySelector('.niveis-quiz');
    
    perguntasQuiz.classList.add('hidden');
    niveisQuiz.classList.remove('hidden'); 
    window.scrollTo(0, 0);   
}*/

/*function sucessoTela3(){   
    cadastraQuizz(); 
    let niveisQuiz = document.querySelector('.niveis-quiz');
    let sucessoQuiz = document.querySelector('.sucesso-quiz');    

    niveisQuiz.classList.add('hidden'); 
    sucessoQuiz.classList.remove('hidden'); 
    window.scrollTo(0, 0); 
     

     //cadastroSucesso();
  
    
}*/

function sucessoTela3(){    
    
    let niveisQuiz = document.querySelector('.niveis-quiz');
    let sucessoQuiz = document.querySelector('.sucesso-quiz');    

    if(levels.length === quizzInfoIniciais.qtdNiveis - 1 && level.text.length > 0 && level.title.length > 0 && level.image.length > 0){
        levels.push({...level}) 
    }
    if(levels.length === quizzInfoIniciais.qtdNiveis){
        quizzCreate.levels.push(...levels)
        cadastraQuizz();
        levels = [];
        niveisQuiz.classList.add('hidden')
        sucessoQuiz.classList.remove('hidden')
        window.scrollTo(0, 0); 
    }  
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

function cadastroSucesso(){
    let imgSucesso = document.querySelector('.sucesso-quiz');

    //console.log(imgSucesso.innerHTML)
    imgSucesso.innerHTML = `<h1>Seu quizz está pronto!</h1>
                                <div class="caixa-formulario img-fundo" style="background: url(${quizzesStorage[quizzesStorage.length-1].image}); background-size: 100% 100%;">
                                     <p>${quizzesStorage[quizzesStorage.length-1].title}</p>            
                                </div>
                                <button onclick="acessarQuizz()" class="botao-color quizz-pronto">Acessar Quizz</button>
                                <button onclick="voltarHome()" class="botao-retorno">Voltar pra home</button>`
    idSelecionadoPronto = quizzesStorage[quizzesStorage.length-1].id

}

function acessarQuizz(){
    quizzUni(idSelecionadoPronto)
}

function voltarHome(){    
    window.location.reload();
}

function quizzUni(id){   
    recaregar = id;
    idSelecionado = id;

    
    let tela1 = document.querySelector('.tela1'); 
    let tela3 = document.querySelector('.tela3'); 

    telaQuizz.classList.remove('hidden'); 
    tela1.classList.add('hidden'); 
    tela3.classList.add('hidden');

    pegarQuizzUni();

}

function pegarQuizzUni(){
    const promessa = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idSelecionado}`);
    promessa.then(quizzUniChegou);
    promessa.catch(quizzUniErro);    
}

function quizzUniChegou(resposta){
    console.log('Quizz unitario chegou com sucesso!!!');
    quizzUniRend = resposta.data;
    //console.log(quizzUniRend);
   


    let quizzResponse = '';
    let quizzResponseArray =[];
    

    telaQuizz.innerHTML =`  <div class="banner" style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url(${quizzUniRend.image})">       
                                <h2>${quizzUniRend.title}</h2>
                            </div>`



for(let i= 0; i < quizzUniRend.questions.length; i++){
    

    quizzResponse +=`  <div class="card-quizz invisivel" >
                                <h3 style="background-color: ${quizzUniRend.questions[i].color};">${quizzUniRend.questions[i].title}</h3>
                            <div class="respostas">`
        for(let j= 0; j < quizzUniRend.questions[i].answers.length; j++){
            
            quizzResponseArray.push(`   </span>
                                        <div class="item resposta" onclick="correcaoResposta(this)">
                                            <img src="${quizzUniRend.questions[i].answers[j].image}" />
                                            <p>${quizzUniRend.questions[i].answers[j].text}</p>
                                            <span class="hidden">${quizzUniRend.questions[i].answers[j].isCorrectAnswer}</span>
                                        </div>
                                        <span class="hidden">`)          

        }


        quizzResponseArray.sort(embaralha);
        quizzResponse += quizzResponseArray;
        quizzResponseArray =[];
        quizzResponse += `</div></div>`        
        
}
quantidadePerguntas = quizzUniRend.questions.length

//console.log(quantidadePerguntas);
telaQuizz.innerHTML += quizzResponse

}

function embaralha() {
	return Math.random() - 0.5;
}

function correcaoResposta(resposta){
    let resultado = resposta.querySelector('span');
    resultado = resultado.innerHTML;
    console.log(resultado);

    let pai = resposta.parentNode;
    pai = pai.parentNode;

    pai.classList.add('visivel');
    pai.classList.remove('invisivel')
    //console.log(pai);    
    

    if(resultado === 'true'){       
        resposta.classList.add('certo-marcado')
        resposta.classList.remove('resposta')
        quantAcerto++
        
        let erradas = pai.querySelectorAll('.resposta')
        //console.log(erradas);

        for(let i=0; i<erradas.length; i++){
            erradas[i].classList.add('certo-errado-desmarcado')
        }
       

    }else if(resultado === 'false'){
        resposta.classList.add('errado-marcado');
        resposta.classList.remove('resposta');
        resposta.removeAttribute("onclick");

        let erradas = pai.querySelectorAll('.resposta');
        //console.log(erradas);

        for(let i=0; i<erradas.length; i++){
            erradas[i].classList.add('certo-errado-desmarcado');
            erradas[i].removeAttribute("onclick");
        }
    }
    //console.log(quantAcerto)
    setTimeout(rolarUltimaQuestao, 2000);
    


}

function quizzUniErro(){
    console.log('ERRO, nao foi possivel pegar os quizz unitario!!!');
}

function rolarUltimaQuestao(){
	let elementoVisivel = document.querySelectorAll('.invisivel');
    elementoVisivel = elementoVisivel[0];
    //console.log(elementoVisivel)
    if(elementoVisivel != undefined){
        elementoVisivel.scrollIntoView();
        console.log(elementoVisivel);
    }else{
        resultadoFinalQuizz();
        console.log(elementoVisivel);
        rolarUltimaQuestao();

    }

}

function resultadoFinalQuizz(){

    let telaFinalQizz = '';

    calculoUni = 100/quantidadePerguntas
    calculo = quantAcerto * calculoUni
    calculo = Math.ceil(calculo)
    console.log(calculo);

    for(let i=0; i<quizzUniRend.levels.length; i++){
        if(quizzUniRend.levels[i].minValue <= calculo){

            telaFinalQizz = `   <div class="fim-quizz invisivel">
                                        <h3>${quizzUniRend.levels[i].minValue}% ${quizzUniRend.levels[i].title}</h3> 
                                        
                                        <div class="container">        
                                            <img src="${quizzUniRend.levels[i].image}" />
                                            <p>${quizzUniRend.levels[i].text}</p>                
                                        </div>
                                    </div>
                                    <button class="botao-color" onclick="reiniciaQuizz()">Reiniciar Quizz</button>
                                    <button onclick="voltarHome()" class="botao-retorno">Voltar pra home</button>`;

        }
    }

    telaQuizz.innerHTML += telaFinalQizz;   
}

function reiniciaQuizz(){
    quizzUni(recaregar);
    quantAcerto = 0;
    calculo = 0;
    calculoUni = 0;
    window.scrollTo(0, 0);
}

function cadastraQuizz(){

    novoQuizz = {
        title: "The Ultimate Video Game Quiz",
        image: "https://images.unsplash.com/photo-1604846887565-640d2f52d564?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z2FtaW5nJTIwY29uc29sZXxlbnwwfHwwfHw%3D&w=1000&q=80",
        questions: [
            {
                title: "Qual é o console da Sony",
                color: "#0B0B4F",
                answers: [
                    {
                        text: "PlayStation 4",
                        image: "https://s2.glbimg.com/apcbsDbYFv3D3A5G5Lbpsi52YoY=/800x0/smart/filters:strip_icc()/s.glbimg.com/po/tt2/f/original/2015/10/09/ps4-novo-preco-eua.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Xbox one",
                        image: "https://s2.glbimg.com/DiOI87kMqYfj43IiEGN9xjM7Sgc=/0x0:866x548/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/l/a/5XsmimQImDiBelwBrnvw/2013-12-09-xbox-one1.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Nintendo Switch",
                        image: "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.625/c_scale,w_400/ncom/en_US/switch/site-design-update/oled-model-promo",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Game Cube",
                        image: "https://files.meiobit.com/wp-content/uploads/2020/10/gamecube.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Qual é o console da Microsoft",
                color: "#0B0B4F",
                answers: [
                    {
                        text: "Xbox one",
                        image: "https://s2.glbimg.com/DiOI87kMqYfj43IiEGN9xjM7Sgc=/0x0:866x548/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/l/a/5XsmimQImDiBelwBrnvw/2013-12-09-xbox-one1.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "PlayStation 4",
                        image: "https://s2.glbimg.com/apcbsDbYFv3D3A5G5Lbpsi52YoY=/800x0/smart/filters:strip_icc()/s.glbimg.com/po/tt2/f/original/2015/10/09/ps4-novo-preco-eua.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Nintendo Switch",
                        image: "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.625/c_scale,w_400/ncom/en_US/switch/site-design-update/oled-model-promo",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Game Cube",
                        image: "https://files.meiobit.com/wp-content/uploads/2020/10/gamecube.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Qual é o console mais novo da Nintendo",
                color: "#0B0B4F",
                answers: [
                    {
                        text: "Xbox one",
                        image: "https://s2.glbimg.com/DiOI87kMqYfj43IiEGN9xjM7Sgc=/0x0:866x548/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/l/a/5XsmimQImDiBelwBrnvw/2013-12-09-xbox-one1.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "PlayStation 4",
                        image: "https://s2.glbimg.com/apcbsDbYFv3D3A5G5Lbpsi52YoY=/800x0/smart/filters:strip_icc()/s.glbimg.com/po/tt2/f/original/2015/10/09/ps4-novo-preco-eua.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Switch",
                        image: "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.625/c_scale,w_400/ncom/en_US/switch/site-design-update/oled-model-promo",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Game Cube",
                        image: "https://files.meiobit.com/wp-content/uploads/2020/10/gamecube.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Quem é o Kratos",
                color: "#0B0B4F",
                answers: [
                    {
                        text: "God of war",
                        image: "https://gorilagames.com.br/wp-content/uploads/2020/10/Cover-1.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Resident Evil",
                        image: "https://www.residentevildatabase.com/wp-content/uploads/2016/09/destaque-analise-re4-port-2016-1024x576.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Super Mario",
                        image: "https://ohmygeek.net/wp-content/uploads/2022/04/Super-Mario-Bros-Triste.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Sub-Zero",
                        image: "https://br.web.img2.acsta.net/newsv7/19/07/09/22/08/3332804.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Quem é o Leon Kennedy",
                color: "#0B0B4F",
                answers: [
                    {
                        text: "God of war",
                        image: "https://gorilagames.com.br/wp-content/uploads/2020/10/Cover-1.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Resident Evil",
                        image: "https://www.residentevildatabase.com/wp-content/uploads/2016/09/destaque-analise-re4-port-2016-1024x576.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Super Mario",
                        image: "https://ohmygeek.net/wp-content/uploads/2022/04/Super-Mario-Bros-Triste.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Sub-Zero",
                        image: "https://br.web.img2.acsta.net/newsv7/19/07/09/22/08/3332804.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [
            {
                title: "Você é café com leite",
                image: "http://vanillecafecolonial.com.br/wp-content/uploads/2019/08/Conhe%C3%A7a-a-hist%C3%B3ria-do-caf%C3%A9-com-leite-Vanille-Caf%C3%A9-Colonial.jpg",
                text: "É uma xícara com bastante café e só um pouquinho de leite. Misture o café somente com um pouco de leite, apenas para mudar a cor da bebida para um tom de caramelo.",
                minValue: 0
            },
            {
                title: "Você é um Gamer de verdade",
                image: "https://c.pxhere.com/photos/70/b7/controller_games_video_buttons_gaming_playstation_technology_entertainment-1365254.jpg!s2",
                text: "Gamer é o nome dado atualmente para os famosos “jogadores de videogame”. Esses podem ser tanto gamers profissionais como gamers das horas vagas.",
                minValue: 80
            }
        ]
    }

    console.log(quizzCreate)

    let promessa = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes',quizzCreate);
    promessa.then(respostaCadastraChegou);
    promessa.catch(respostaCadastraErro);  
}

function respostaCadastraChegou(resposta){
    console.log('cadastrado')

    quizzesStorage.push(resposta.data)
            console.log(quizzesStorage)
            localStorage.setItem("quizzes", JSON.stringify(quizzesStorage))

            cadastroSucesso();

            /*quizzCreate = {
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
            }*/
            
}

function respostaCadastraErro(resposta){
    console.log('erro cadastrado')
}

