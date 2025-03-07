class Vitoria extends Phaser.Scene {
    constructor() {
        super({ key: 'vitoria' }); // nome da cena
    }

    preload(){
        this.load.image('trofeu', 'assets/vitoria/trofeu.png');
    }

    create(){
        this.add.image(400, 300, 'trofeu');
        
    }

    update(){
        this.input.on('pointerdown', ()=>{
            this.scene.stop('vitoria')
            this.scene.start('menuScene')
        })
    }
}