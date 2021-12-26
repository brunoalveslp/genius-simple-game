let order = [];
let clickedOrder = [];
let score = 0;

// 0 - verde
// 1 - vermelho
// 2 - amarelo
// 3 - azul

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");

// cria ordem aletória de cores
let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);

  order.push(colorOrder);
  clickedOrder = [];

  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
};

// acende a próxima cor
let lightColor = (element, number) => {
  number = number * 500;
  setTimeout(() => {
    element.classList.toggle("selected");
  }, number - 100);
  setTimeout(() => {
    element.classList.toggle("selected");
    checkOrder();
  }, 100);
};

// checa se os botões clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] != order[i]) {
      gameOver();
      break;
    }
  }

  if (clickedOrder.length == order.length) {
    alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
    nextLevel();
  }
};

// função para o clique do usuário
let click = (color) => {
  clickedOrder.push(color);
  createColorElement(color).classList.add("selected");

  setTimeout(() => {
    createColorElement(color).classList.remove("selected");
    checkOrder();
  }, 100);
};

// função que retorna a cor
let createColorElement = (color) => {
  switch (color) {
    case 0:
      return green;
    case 1:
      return red;
    case 2:
      return yellow;
    case 3:
      return blue;
  }
};

// função para próximo nível do jogo
let nextLevel = () => {
  score++;
  shuffleOrder();
};

// função para game over
let gameOver = () => {
  alert(
    `Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`
  );
  order = [];
  clickedOrder = [];

  playGame();
};

// função de início do jogo
let playGame = () => {
  alert("Bem vindo ao Genius! Iniciando novo jogo!");
  score = 0;

  nextLevel();
};

// eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

// iniciando o jogo
playGame();
