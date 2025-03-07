class Fase1 extends Phaser.Scene {
  constructor() {
      super({ key: "fase1" }); // nome da cena
  }

  preload() {
      // carrega as imagens usadas na fase 01
      this.load.image("mapa1", "assets/mapa1.png");
      this.load.image("chao", "assets/chao.png");
      this.load.image("personagem", "assets/coelho-reto.png");
      this.load.spritesheet("personagemD", "assets/coelho-direita.png", { frameWidth: 32, frameHeight: 32 });
      this.load.image("cenoura", "assets/Carrot.png");
      this.load.image('plataforma', 'assets/plataforma.png');
  }

  create() {
      // Adiciona o fundo e o chão na cena
      this.fundo = this.add.image(400, 300, "mapa1");
      this.chao = this.physics.add.staticImage(400, 568, "chao"); // cria o chao com uma hitbox

      // Adiciona o personagem
      this.personagem = this.physics.add.sprite(400, 500, "personagem").setScale(1.5); // setScale para aumentar

      // Cria animações para a spritesheet
      this.anims.create({
          key: "andarDireita",
          frames: this.anims.generateFrameNumbers("personagemD", { start: 0, end: 3 }),
          frameRate: 10,
          repeat: -1,
      });

      // Adiciona as teclas WASD
      this.keys = this.input.keyboard.addKeys({
          up: Phaser.Input.Keyboard.KeyCodes.W, // up = W
          left: Phaser.Input.Keyboard.KeyCodes.A, // left = A
          down: Phaser.Input.Keyboard.KeyCodes.S, // down = S
          right: Phaser.Input.Keyboard.KeyCodes.D, // right = D
      });

      // Adiciona a cenoura na cena (com física)
      this.cenoura = this.physics.add.image(400, 300, 'cenoura');
      this.physics.add.collider(this.cenoura, this.chao);
      this.cenoura.setBounce(0.3);

      //add o placar
        this.placar=0
       this.textDoPlacar;
       this.textDoPlacar = this.add.text(16, 16, 'pontuação: 0', { fontSize: '32px', fill: '#000' });

      // Adiciona overlap da cenoura com o personagem
      this.physics.add.overlap(this.cenoura, this.personagem, () => {
          this.cenoura.setVisible(false);
          // Define a posição da cenoura aleatoriamente entre o intervalo 50-650
          this.posicao_cenouraY = Phaser.Math.Between(50, 650);
          this.cenoura.setPosition(this.posicao_cenouraY, 100);
          this.cenoura.setVisible(true);
          this.placar +=1
          this.textDoPlacar.setText('pontuação: '+this.placar)
      });

      // Variável para controlar o estado da cenoura
      this.cenouraCrescendo = true;

      // Adiciona plataformas
      this.plataforma1 = this.physics.add.staticImage(400, 270, 'plataforma');
      this.plataforma2 = this.physics.add.staticImage(120, 400, 'plataforma');
      this.plataforma3 = this.physics.add.staticImage(680, 400, 'plataforma');

      // Adiciona colisões
      this.physics.add.collider(this.cenoura, this.plataforma1);
      this.physics.add.collider(this.cenoura, this.plataforma2);
      this.physics.add.collider(this.cenoura, this.plataforma3);
      this.physics.add.collider(this.personagem, this.plataforma1);
      this.physics.add.collider(this.personagem, this.plataforma2);
      this.physics.add.collider(this.personagem, this.plataforma3);
      this.physics.add.collider(this.chao, this.personagem);
      this.personagem.setCollideWorldBounds(true);

      
  }

  update() {

    
      // movimentação do personagem
      // tecla D for apertada o personagem anda para a direita
      if (this.keys.right.isDown) {
          this.personagem.setVelocityX(150);
          this.personagem.anims.play("andarDireita", true);
          this.personagem.flipX = false;
      }

      // tecla A for apertada o personagem anda para a esquerda
      else if (this.keys.left.isDown) {
          this.personagem.setVelocityX(-150);
          this.personagem.anims.play("andarDireita", true);
          this.personagem.flipX = true; // faz o personagem virar para a esquerda
      }

      // se nada for apertado o personagem para de se movimentar
      else {
          this.personagem.setVelocityX(0); // senão ele para
          this.personagem.anims.stop(); // para a animação
      }

      // se W é apertado, o personagem pula
      // player.body.touching.down faz o comando só ser executado quando o personagem está tocando algo
      if (this.keys.up.isDown && this.personagem.body.touching.down) {
          this.personagem.setVelocityY(-300);
      }

      // Aumenta e diminui a cenoura continuamente
      if (this.cenouraCrescendo) {
          this.cenoura.setScale(this.cenoura.scale + 0.01);
          if (this.cenoura.scale >= 1.0) {
              this.cenouraCrescendo = false;
          }
      } else {
          this.cenoura.setScale(this.cenoura.scale - 0.01);
          if (this.cenoura.scale <= 0.8) {
              this.cenouraCrescendo = true;
          }
      }
      //se a pontuaçao for menor ou igual a 10 o jogo se manterá no minigame
      if(this.placar<=4){
        
      }
      //senao ele ira para tela de vitória
      else{
        this.scene.stop('fase1');
        this.scene.start('vitoria');
      }
    }
  

}