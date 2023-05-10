/* 
import { CST } from "../CST.js"; */

class MenuScene extends Phaser.Scene {
    constructor() {
      super({
        key: "MENU"
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

  export default MenuScene;