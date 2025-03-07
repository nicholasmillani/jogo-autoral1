config = [800, 600, 300]//arr para configuraçoes
var config = {
  //cria a configuração
  type: Phaser.AUTO,
  width: config[0], //largura do jogo
  height: config[1], //altura do jogo
  physics: {
    default: "arcade", //define a física
    arcade: {
      gravity: { y: config[2] },
      debug: false, //ativa/desativa o modo debug (ver hitboxes)
    },
  },

  scene: [MenuScene, Fase1, Vitoria]
};
//cria um novo jogo phaser utilizando as configurações acima
const game = new Phaser.Game(config);
