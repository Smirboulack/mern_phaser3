import React, { useState } from 'react';
import Phaser from 'phaser';

function GameWindow() {
  const [gameStarted, setGameStarted] = useState(false);

  const CST = {
    SCENES: {
      LOAD: "LOAD",
      MENU: "MENU",
      LOGIN: "LOGIN",
      PLAY: "PLAY"
    }
  }

  class LoadScene extends Phaser.Scene {

    constructor() {
      super({
        key: CST.SCENES.LOAD
      })
    }

    init() {

    }

    preload() {

      this.load.image("title_bg", "../assets/images/background.jpg");
      this.load.image("options_button", "../assets/images/options.png");
      this.load.image("pause_play", "../assets/images/pause_play.png");
      this.load.image("backbutton", "../assets/images/directional_arrow.png");
      this.load.image("logo", "../assets/images/lyon1logo.png");
      this.load.image("gear", "../assets/images/gear.png");
      this.load.image('arrow', '../assets/images/arrow.png');
      this.load.image('bullet', '../assets/images/purple_ball.png');
      this.load.spritesheet("sprite", "../assets/images/dude.png", {
        frameWidth: 32,
        frameHeight: 48
      });

      this.load.image('skin', '../assets/images/skin.png');
      this.load.image('ciel', '../assets/images/sky.png');
      this.load.image('sol', '../assets/images/platform.png');
      this.load.image('fleche', '../assets/images/fleche.png');
      this.load.atlas('steve', '../assets/images/steve_mine_spritesheet.png', '../assets/images/minestevesprites.json');

      this.load.audio("title_music", "../assets/images/nomore.mp3");
      this.load.audio("thedark", "../assets/images/thedark.mp3");

      let loadingBar = this.add.graphics({
        fillStyle: {
          color: 0xffffff //white
        }
      })


      //pour simuler un chargement lent: 
      /*
      for (let i=0;i<100;i++){
       this.load.spritesheet("sprite"+ i,"./assets/running_girl.png",{
           frameWidth:32,
           frameHeight:32
          });
      }*/


      this.load.on("progress", (percent) => {
        //  loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
        loadingBar.fillRect(0, 250, 900 * percent, 50);
        console.log(percent);
      })

      this.load.on("complete", () => {
        console.log("donee");
      })

      this.plugins.install('dom');
    }

    create() {
      //this.scene.add(CST.SCENES.MENU,MenuScene,false);
      this.scene.start(CST.SCENES.MENU, "Hello from load scene");
      //  this.scene.launch();
    }

  }

  class MenuScene extends Phaser.Scene {
    constructor() {
      super({
        key: CST.SCENES.MENU
      })
    }
    init(data) {
      console.log(data);
      console.log("I Got it");
    }

    preload() {

    }

    create() {


      this.add.image(0, 0, "title_bg").setOrigin(0).setScale(0.60);
      /* this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "logo").setScale(0.4);
       let gear = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "gear").setScale(0.1);
       let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "pause_play").setScale(0.1);
       let gearbutton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "options_button").setScale(0.1);*/
      this.add.image(450, 150, "logo").setScale(0.4);
      let gear = this.add.image(450, 200, "gear").setScale(0.1);
      let playButton = this.add.image(450, 350, "pause_play").setScale(0.1);
      let gearbutton = this.add.image(450, 450, "options_button").setScale(0.1);

      let hoverSprite = this.add.sprite(100, 100, "sprite");
      let text = this.add.text(playButton.x + 30, playButton.y - 20, "play", {
        fontSize: "32px",
        fill: "#fff",
        fontWeight: "bold",
        stroke: "#000",
        strokeThickness: 5
      });

      let text2 = this.add.text(gearbutton.x + 30, gearbutton.y - 20, "Options", {
        fontSize: "32px",
        fill: "#fff",
        fontWeight: "bold",
        stroke: "#000",
        strokeThickness: 5
      });

      text.setVisible(false);
      text2.setVisible(false);

      hoverSprite.setScale(2);
      hoverSprite.setVisible(false);
      gear.setVisible(false);

      this.sound.pauseOnBlur = false;
      this.sound.play("title_music", {
        loop: true
      })



      this.anims.create({
        key: "walk",
        frameRate: 10,
        repeat: -1,
        frames: this.anims.generateFrameNumbers("sprite", {
          frames: [0, 1, 2, 3, 4, 5, 6]
        })
      })

      /*
       // Afficher l'arrière-plan et le logo
       this.add.image(0, 0, 'background').setOrigin(0);
       this.add.image(400, 100, 'logo');
   
       // Ajouter le formulaire de connexion/inscription
       let form = this.add.image(400, 300, 'form');
   
       // Ajouter les champs de saisie
       let emailInput = this.add.dom(400, 250, 'input', {
         type: 'text',
         name: 'email',
         placeholder: 'Adresse e-mail'
       });
   
       let passwordInput = this.add.dom(400, 300, 'input', {
         type: 'password',
         name: 'password',
         placeholder: 'Mot de passe'
       });
   
       let confirmPasswordInput = this.add.dom(400, 350, 'input', {
         type: 'password',
         name: 'confirm-password',
         placeholder: 'Confirmer le mot de passe'
       });
   
       // Ajouter les boutons de connexion/inscription
       let loginButton = this.add.image(400, 425, 'login-button').setInteractive();
       let registerButton = this.add.image(400, 500, 'register-button').setInteractive();
   
       // Ajouter les événements de clic pour les boutons
       loginButton.on('pointerdown', () => {
         this.sound.play('button-click');
         let email = emailInput.node.value;
         let password = passwordInput.node.value;
         // Vérifier les informations de connexion
         // ...
       });
   
       registerButton.on('pointerdown', () => {
         this.sound.play('button-click');
         let email = emailInput.node.value;
         let password = passwordInput.node.value;
         let confirmPassword = confirmPasswordInput.node.value;
         // Vérifier les informations d'inscription
         // ...
       });*/

      playButton.setInteractive();
      gearbutton.setInteractive();

      playButton.on("pointerover", () => {
        hoverSprite.setVisible(true);
        hoverSprite.x = playButton.x - 100;
        hoverSprite.y = playButton.y - 15;
        hoverSprite.play("walk");
        text.setVisible(true);

      })
      playButton.on("pointerout", () => {
        hoverSprite.setVisible(false);
        text.setVisible(false);
      })
      playButton.on("pointerup", () => {
        this.scene.start("PLAY");
        /* stopper la musique title_music */
        this.sound.stopAll();
      })
      playButton.on("pointerdown", () => {
        //  console.log("pointer down")
        //     this.scene.start();

      })


      gearbutton.on("pointerover", () => {
        gear.setVisible(true);
        gear.x = gearbutton.x - 100;
        gear.y = gearbutton.y;
        text2.setVisible(true);
      })
      gearbutton.on("pointerout", () => {
        gear.setVisible(false);
        text2.setVisible(false);
      })
      gearbutton.on("pointerup", () => {
        this.scene.start("LOGIN");
      })
      gearbutton.on("pointerdown", () => {

      })


    }
  }

  class LoginScene extends Phaser.Scene {
    constructor() {
      super({
        key: CST.SCENES.LOGIN
      })
    }

    preload() {
      // Charger les images et les sons nécessaires
      this.load.html('nameform', '../assets/images/htmlform.html');
    }

    create() {
      let backarrow = this.add.image(100, 100, "backbutton").setScale(0.1);
      let hoverSprite = this.add.sprite(100, 100, "sprite");
      hoverSprite.setScale(2);
      hoverSprite.setVisible(false);
      backarrow.setInteractive();

      backarrow.on("pointerover", () => {
        hoverSprite.setVisible(true);
        hoverSprite.x = backarrow.x + 100;
        hoverSprite.y = backarrow.y - 15;
        hoverSprite.play("walk");
      })
      backarrow.on("pointerout", () => {
        hoverSprite.setVisible(false);
      })
      backarrow.on("pointerup", () => {
        this.scene.start("MENU");
      })
      backarrow.on("pointerdown", () => {
        //  console.log("pointer down")
        //     this.scene.start();

      })
      var text = this.add.text(300, 10, 'Création de compte', { color: 'white', fontSize: '20px ' });
      // Ajouter le formulaire de connexion/inscription
      var element = this.add.dom(400, 0).createFromCache('nameform');
      element.addListener('click');
      element.on('click', function (event) {

        if (event.target.name === 'playButton') {
          var inputText = this.getChildByName('nameField');

          //  Have they entered anything?
          if (inputText.value !== '') {
            //  Turn off the click events
            this.removeListener('click');

            //  Hide the login element
            this.setVisible(false);

            //  Populate the text with whatever they typed in
            text.setText('Welcome ' + inputText.value);
          }
          else {
            //  Flash the prompt
            this.scene.tweens.add({
              targets: text,
              alpha: 0.2,
              duration: 250,
              ease: 'Power3',
              yoyo: true
            });
          }
        }

      });

      this.tweens.add({
        targets: element,
        y: 300,
        duration: 3000,
        ease: 'Power3'
      });


    }

  }


  class PlayScene extends Phaser.Scene {
    constructor() {
      super({ key: CST.SCENES.PLAY });

    }

    preload() {
      this.anims.create({ key: 'stance', frames: this.anims.generateFrameNames('steve', { prefix: 'stance', end: 10, zeroPad: 4 }), repeat: -1 });
      this.anims.create({ key: 'run', frames: this.anims.generateFrameNames('steve', { prefix: 'run', end: 20, zeroPad: 4 }), repeat: -1 });
      this.anims.create({ key: 'shield', frames: this.anims.generateFrameNames('steve', { prefix: 'shield', end: 7, zeroPad: 4 }), repeat: 0 });
      this.anims.create({ key: 'frape', frames: this.anims.generateFrameNames('steve', { prefix: 'frape', end: 3, zeroPad: 4 }), repeat: 0 });
      this.anims.create({ key: 'saut', frames: this.anims.generateFrameNames('steve', { prefix: 'saut', end: 4, zeroPad: 4 }), repeat: -1 });
      this.anims.create({ key: 'tir', frames: this.anims.generateFrameNames('steve', { prefix: 'tir', end: 20, zeroPad: 4 }), repeat: -1 });
    }




    create() {

      // let cursors;
      // var this.personnage;
      //var this.personnage2;
      let platforms;
      let score = 0;
      let scoreText;
      let keysDown = {};
      let fleches;
      // let spacebar;

      let ciel = this.add.image(0, 0, 'ciel');
      ciel.setScale(5);

      this.personnage2 = this.physics.add.sprite(800, 0, 'steve');
      this.personnage = this.physics.add.sprite(0, 0, 'steve');
      window.this.personnage2 = this.personnage2;
      window.this.personnage = this.personnage;



      let tabfleches = []
      for (let i = 0; i < 10; i++) {
        tabfleches[i] = this.physics.add.sprite(this.personnage.x, this.personnage2.y, 'fleche').setScale(1);
        tabfleches[i].disableBody(true, true);
      }
      platforms = this.physics.add.staticGroup();
      platforms.create(400, 568, 'sol').setScale(2).refreshBody();
      platforms.create(1400, 568, 'sol').setScale(2).refreshBody();
      platforms.create(200, 450, 'sol');
      platforms.create(500, 320, 'sol');
      platforms.create(1000, 320, 'sol');
      platforms.create(1600, 450, 'sol');
      this.physics.add.collider(this.personnage, platforms);
      this.physics.add.collider(this.personnage2, platforms);
      this.physics.add.collider(this.personnage2, this.personnage);
      this.personnage.body.collideWorldBounds = true
      this.personnage2.body.collideWorldBounds = true
      this.personnage.setScale(1.5)
      this.personnage2.setScale(1.5)
      this.personnage.body.setBounce(0.2)
      this.personnage2.body.setBounce(0.2)



      this.keyboard = this.input.keyboard.addKeys("Z,Q,S,D");
      this.cursors = this.input.keyboard.createCursorKeys();

      this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.touche_z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
      this.touche_q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
      this.touche_s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.touche_d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);




      /*
      var gfx = this.add.graphics().setDefaultStyles({ lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 } });
      var line = new Phaser.Geom.Line();
      var angle = 0;
      this.input.on('pointermove', function (pointer) {
        angle = Phaser.Math.Angle.BetweenPoints(this.personnage, pointer);
        Phaser.Geom.Line.SetToAngle(line, this.personnage.x, this.personnage.y, angle, 500);
        gfx.clear().strokeLineShape(line);
      }, this);
 
      var nbfleches = tabfleches.length;
      this.input.on('pointerup', function () {
        nbfleches--; let i = nbfleches;
        console.log(nbfleches);
        if (nbfleches >= 0) {
          tabfleches[i].enableBody(true, this.personnage.x, this.personnage.y, true, true);
          //  tabfleches[i].play('fly');
          this.physics.velocityFromRotation(angle, 800, tabfleches[i].body.velocity);
          this.physics.add.collider(tabfleches[i], platforms);
          this.physics.add.collider(tabfleches[i], this.personnage2);
          this.physics.add.collider(tabfleches[i], this.personnage);
          //tabfleches[i].body.collideWorldBounds = true;
          tabfleches[i].body.setBounce(0.5);
        }
      }, this);
      */



      this.physics.world.setBounds(0, 0, 2000, 600);
      //  this.cameras.main.setBounds(0, 0, 2000, 600);
      /*
      if(this.personnage.body.x<this.personnage2.body.x){
        this.cameras.main.startFollow(this.personnage2, false, 0.2, 0.2);
      }else{
        this.cameras.main.startFollow(this.personnage, false, 0.2, 0.2);
      }*/

      this.data.set('touches 1', 'Fleches directionnelles,Clic-gauche,Espace');
      this.data.set('score1', 0);
      this.data.set('touches 2', 'ZQSD,Clic-gauche,Espace');
      this.data.set('score2', 0);

      var text = this.add.text(16, 16, '', { font: '15px Courier', fill: '#00ff00' });
      var text2 = this.add.text(16, 40, '', { font: '15px Courier', fill: '#00ff00' });

      text.setText([
        'Touches 1: ' + this.data.get('touches 1'),
        'Score 1: ' + this.data.get('score1'),
      ]);
      text2.setText([
        'Touches 2: ' + this.data.get('touches 2'),
        'Score 2: ' + this.data.get('score2'),
      ]);

      this.sound.pauseOnBlur = false;
      this.sound.play("thedark", {
        loop: true
      });


    }






    update() {

      if (this.cursors.left.isDown) {
        this.personnage.setVelocityX(-200);
        this.personnage.flipX = true;
        if (this.personnage.body.touching.down) { this.personnage.anims.play('run', true); }

      }
      else if (this.cursors.right.isDown) {
        this.personnage.setVelocityX(200);
        this.personnage.flipX = false;
        if (this.personnage.body.touching.down) { this.personnage.anims.play('run', true); }
      }
      else if (this.cursors.down.isDown) {
        this.personnage.setVelocityX(0);
        this.personnage.anims.play('shield');
      } else if (this.spacebar.isDown) {
        this.personnage.setVelocityX(0);
        //   this.personnage.anims.play('frape',true);
        this.personnage.anims.play('tir', true);
      }
      else {
        this.personnage.setVelocityX(0);
        this.personnage.play('stance', true);
      }
      if (this.cursors.up.isDown && this.personnage.body.touching.down) {
        this.personnage.setVelocityY(-350)
      }

      if (!this.personnage.body.touching.down && !this.cursors.down.isDown && !this.spacebar.isDown && this.personnage.body.velocity.y >= 100 || this.personnage.body.velocity.y <= -50) this.personnage.anims.play('saut', true);

      //BLOC PERSO 2
      if (this.touche_q.isDown) {
        this.personnage2.setVelocityX(-200);
        this.personnage2.flipX = true;
        if (this.personnage2.body.touching.down) this.personnage2.anims.play('run', true);
      }
      else if (this.touche_d.isDown) {
        this.personnage2.setVelocityX(200);
        this.personnage2.flipX = false;
        if (this.personnage2.body.touching.down) this.personnage2.anims.play('run', true);
      }
      else if (this.touche_s.isDown) {
        this.personnage2.setVelocityX(0);
        this.personnage2.anims.play('shield');
      } else if (this.spacebar.isDown) {
        this.personnage2.setVelocityX(0);
        //   this.personnage.anims.play('frape',true);
        this.personnage2.anims.play('tir', true);
      } else {
        this.personnage2.setVelocityX(0);
        this.personnage2.anims.play('stance', true);
      }
      if (this.touche_z.isDown && this.personnage2.body.touching.down) { this.personnage2.setVelocityY(-350) }

      if (!this.personnage2.body.touching.down && !this.touche_s.isDown && !this.spacebar.isDown && this.personnage2.body.velocity.y >= 100 || this.personnage2.body.velocity.y <= -50) this.personnage2.anims.play('saut', true);


      if (this.personnage.body.y > 504 && this.cursors.up.isDown) {
        this.personnage.setVelocityY(-350)
      }
      if (this.personnage2.body.y > 504 && this.touche_z.isDown) {
        this.personnage2.setVelocityY(-350)
      }

      const distanceMax = 500; // distance maximale pour effectuer un zoom
      const distanceMin = 910; // distance minimale pour effectuer un dézoom
      const distanceX = Math.abs(this.personnage.body.x - this.personnage2.body.x); // distance horizontale entre les this.personnages
      const centerX = (this.personnage.body.x + this.personnage2.body.x) / 2;
      const centerY = (this.personnage.body.y + this.personnage2.body.y) / 2;
      const distanceY = Math.abs(this.personnage.body.y - this.personnage2.body.y); // distance verticale entre les this.personnages
      const heightMax = Math.max(distanceY, distanceMax * this.game.config.height / this.game.config.width);
      const widthMax = heightMax * this.game.config.width / this.game.config.height;
      const heightMin = Math.max(distanceY, distanceMin * this.game.config.height / this.game.config.width);
      const widthMin = heightMin * this.game.config.width / this.game.config.height;

      if (distanceX > distanceMax) { // si les this.personnages sont éloignés, effectuer un zoom pour les rapprocher
        this.cameras.main.stopFollow();
        this.cameras.main.zoomTo(widthMax / this.game.config.width, 1000);
        this.cameras.main.pan(centerX, centerY, 1000);
      } else if (distanceX < distanceMin) { // si les this.personnages sont proches, effectuer un dézoom pour les éloigner
        this.cameras.main.stopFollow();
        this.cameras.main.zoomTo(widthMin / this.game.config.width, 1000);
        this.cameras.main.pan(centerX, centerY, 1000);
      } else { // si les this.personnages sont à une distance moyenne, zoomer sur le this.personnage le plus à droite
        const target = (this.personnage.body.x < this.personnage2.body.x) ? this.personnage2 : this.personnage;
        this.cameras.main.startFollow(target, false, 0.1, 0.1);
        this.cameras.main.zoomTo(1.5, 1000);
      }

    }

  }

  const startGame = () => {
    setGameStarted(true);

    const gameConfig = {
      width: 900,
      height: 600,
      parent: 'phaser-example',
      backgroundColor: '#222288',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 450 },
        }
      },
      dom: {
        createContainer: true
      },
      scene: [
        LoadScene, MenuScene, LoginScene, PlayScene
      ],
      render: {
        //  pixelArt:false
      },
    };

    const game = new Phaser.Game(gameConfig);


  };

  const openGameWindow = () => {
    const gameWindow = window.open('', 'gameWindow', 'width=800,height=600');

    const gameHtml = `
      <html>
        <head>
          <title>Phaser 3 Game Window</title>
        </head>
        <body>
          <div id="game"></div>
          <script defer src="https://cdn.jsdelivr.net/npm/phaser/dist/phaser.min.js"></script>
          <script>
            ${startGame.toString()}
            //startGame();
          </script>
          <div id="game">
          salutation</div>
            <script type="text/javascript">

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', '../assets/images/sky.png');
    this.load.image('ground', '../assets/images/platform.png');
    this.load.image('star', '../assets/images/star.png');
    this.load.image('bomb', '../assets/images/bomb.png');
    this.load.spritesheet('dude', '../assets/images/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
    //  A simple background for our game
    this.add.image(400, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
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

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function update ()
{
    if (gameOver)
    {
        return;
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}

function collectStar (player, star)
{
    star.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    }
}

function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}

</script>
          
        </body>
      </html>
    `;

    gameWindow.document.write(gameHtml);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button style={{ fontSize: '24px' }} onClick={openGameWindow}>
        Start Game
      </button>
      {gameStarted && <p>Le jeu a démarré dans une nouvelle fenêtre.</p>}
    </div>
  );
}

export default GameWindow;