class game extends Phaser.Scene {

    constructor() {
        super({ key: 'game' }); // Use a chave 'game' para a cena
        this.player;
        this.bombs;
        this.princess;
        this.platforms;
        this.cursors;
        this.gameOver = false;
    }

    preload() {
        // Carrega as imagens e sprites necessárias para o jogo
        this.load.image('sky', 'assets/sky.png'); // Corrected path
        this.load.image('ground', 'assets/platform.png'); // Corrected path
        this.load.image('bomb', 'assets/bomb.png'); // Corrected path
        this.load.image('princess', 'assets/princess.png'); // Corrected path
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 }); // Corrected path
    }

    create() {
        // Adiciona o fundo do céu
        this.add.image(400, 300, 'sky');

        // Cria as plataformas estáticas
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        // Cria o grupo de bombas
        this.bombs = this.physics.add.group();

        // Adiciona várias bombas
        for (let i = 0; i < 5; i++) {
            var x = Phaser.Math.Between(0, 800);
            var bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
        }

        // Cria o jogador
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // Define a posição da princesa na plataforma mais alta
        this.princess = this.physics.add.sprite(50, 100, 'princess').setScale(0.2);
        this.princess.setBounce(0.2);
        this.princess.setCollideWorldBounds(true);
        this.princess.body.setGravityY(300); // Adiciona gravidade à princesa

        // Cria as animações do jogador
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // Cria as teclas de controle
        this.cursors = this.input.keyboard.createCursorKeys();

        // Adiciona o texto do objetivo
        this.objectiveText = this.add.text(250, 16, 'SALVE A PRINCESA', { fontSize: '32px', fill: '#000' });

        // Adiciona colisões entre o jogador, as plataformas, as bombas e a princesa
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.princess, this.platforms); // Adiciona colisão entre a princesa e as plataformas
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

        // Adiciona a sobreposição entre o jogador e a princesa
        this.physics.add.overlap(this.player, this.princess, this.collectPrincess, null, this);

        // Redefine o estado do jogo
        this.gameOver = false;
    }

    update() {
        // Verifica se o jogo acabou
        if (this.gameOver) {
            return;
        }

        // Controle do jogador
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    collectPrincess(player, princess) {
        // Pausa o jogo e muda a cor do jogador para verde
        this.physics.pause();
        this.player.setTint(0x00ff00);
        this.player.anims.play('turn');
        this.gameOver = true;
        this.objectiveText.setText('VOCÊ SALVOU A PRINCESA!');
        this.showRestartButton();
    }

    hitBomb(player, bomb) {
        // Pausa o jogo e muda a cor do jogador para vermelho
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.player.anims.play('turn');
        this.gameOver = true;

        // Reinicia a cena após um pequeno atraso
        this.time.delayedCall(1000, () => {
            this.scene.restart();
        }, [], this);
    }

    showRestartButton() {
        // Cria um botão HTML para reiniciar o jogo
        const button = document.createElement('button');
        button.innerText = 'Reiniciar Jogo';
        button.style.position = 'absolute';
        button.style.top = '10px'; // Topo superior esquerdo
        button.style.left = '10px'; // Topo superior esquerdo
        button.style.padding = '10px 20px';
        button.style.fontSize = '20px';
        button.style.backgroundColor = '#000';
        button.style.color = '#fff';
        button.style.border = 'none';
        button.style.cursor = 'pointer';
        document.body.appendChild(button);

        // Adiciona um evento de clique ao botão para reiniciar a cena da plataforma
        button.addEventListener('click', () => {
            document.body.removeChild(button);
            this.scene.stop('game'); // Encerra a cena atual
            this.scene.start('game'); // Inicia a cena 'game' (or change to an existing scene)
        });
    }
}