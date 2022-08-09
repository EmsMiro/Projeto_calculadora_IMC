//Capturar evento de submit do formulário:
const form = document.querySelector('#form');
//adicionando o escutador de eventos no submit
form.addEventListener('submit', function(e){
   e.preventDefault();
   //capturando os inputs do form:
   const inputPeso = e.target.querySelector('#peso')
   const inputAltura = e.target.querySelector('#altura')
   //convertendo os inputs para number:
   const peso = Number(inputPeso.value)
   const altura = Number(inputAltura.value)
   //criando condicional para evitar que o user digite palavras para os inputs(NaN)
   if (!peso) {
      setResultado('Peso Inválido', false);
      return 
   }
   if (!altura) {
      setResultado('Altura Inválida', false);
      return 
   }
   const imc = getImc(peso,altura);
   const classificacaoImc = getClassificacaoImc(imc);   
   const msg = `Seu IMC é ${imc}  |  Classificação: ${classificacaoImc}`;
   setResultado(msg, true)
});

/*
Entre 16 e 16.9 Muito abaixo do peso
Menor que 18,5 Abaixo do peso
Entre 18,5 e 24,9 Peso normal
Entre 25 e 29,9 Sobrepeso
Entre 30 e 34,9 Obesidade grau 1
Entre 35 e 39,9 Obesidade grau 2
Acima de 40 Obesidade grau 3
*/ 

//função que mostra a classificação do imc do user de acordo com o resultado:
function getClassificacaoImc (imc) {
   const classificacao = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade mórbida'];

   if(imc >=39.9) {return classificacao[5];} 
   if (imc >= 34.9) {return classificacao[4];}
   if (imc >= 29.9) {return classificacao[3];}
   if (imc >= 24.9) {return classificacao[2];}
   if (imc >= 18.5) {return classificacao[1];} 
   if (imc <18.5) {return classificacao[0];}
}

//função que efetua o cálculo do Imc
function getImc (peso, altura) {
   const imc = peso / (altura * altura);
   return imc.toFixed(2); //retornar o valor do imc calculado com 2 casas decimais
}

//função responsável por criar um elemento p no HTML pelo Js
function criaParagrafo () {
   const p = document.createElement('p'); //criando um parágrafo
   //p.innerHTML = 'qualquer coisa'; //colocando um conteúdo no HTML desse parágrafo
   //p.classList.add('paragrafo-resultado') // adiciona uma classe ao parágrafo (p)
   return p;
}

//função que mostra o texto a ser exibido no resultado do cálculo:
function setResultado (msg, isValid) {
   const resultado = document.querySelector('#resultado')
   //resultado.innerHTML = `<p>${msg}</p>`; inserindo um parágrafo na div do doc HTML via Js
   //zerando a div:
   resultado.innerHTML = '';
   //criar um elemento em Js e inserir o elemento criado com Js dentro da div no HTML:
   //resultado.appendChild(p);// insira um elemento (o p no caso) dentro de resultado (que é nossa div no HTML)   
   const p = criaParagrafo();
   // colocando uma condicional para alterar a cor de fundo da mensagem de resultado
   if (isValid) {
      p.classList.add('paragrafo-resultado')
   } else {
      p.classList.add('input-error')
   }
   p.innerHTML = msg;
   resultado.appendChild(p);   
}

