/* import 'phaser';
import { CST } from "../CST.js"; */

class LoginScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'LOGIN'
      })
    }
  
    preload() {
      // Charger les images et les sons nécessaires
      this.load.html('nameform', 'assets/htmlform.html');
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

  export default LoginScene;