class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "menuScene" }); // nome da cena
    }

    preload(){//faz o carregamento das imagens
        this.load.image('fundo1', 'assets/menu/fundoMenu.jpg');
        this.load.image('jogar', 'assets/menu/botaoJogar.png');
    }

    create(){
        //cria o fundo e o botao jogar
        this.add.image(400, 300, 'fundo1');
        this.jogar = this.add.image(400,300, 'jogar').setScale(0.2);
        //transforma o botao em interativo
        this.jogar.setInteractive()
        //cria a funçao de clique no jogar
        this.jogar.on('pointerdown',()=>{
            this.scene.stop('menuScene')
            this.scene.start('fase1')//vai direcionar o jogador para o minigame com um clique no botao de jogar
        })

    }

    update(){
        
    }
}