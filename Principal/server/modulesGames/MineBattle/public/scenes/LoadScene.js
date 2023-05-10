class LoadScene extends Phaser.Scene {

    constructor() {
      super({
        key: 'LOAD'
      })
    }
  
    init() {
  
    }
  
    preload() {
  
      this.load.image("title_bg", "../assets/background.jpg");
      this.load.image("options_button", "../assets/options.png");
      this.load.image("pause_play", "../assets/pause_play.png");
      this.load.image("backbutton", "../assets/directional_arrow.png");
      this.load.image("logo", "../assets/lyon1logo.png");
      this.load.image("gear", "../assets/gear.png");
      this.load.image('arrow', '../assets/arrow.png');
      this.load.image('bullet', '../assets/purple_ball.png');

      this.load.spritesheet("sprite", "../assets/dude.png", {
        frameWidth: 32,
        frameHeight: 48
      });
  
      this.load.image('skin', '../assets/skin.png');
      this.load.image('ciel', '../assets/sky.png');
      this.load.image('sol', '../assets/platform.png');
      this.load.image('fleche', '../assets/fleche.png');
      this.load.atlas('steve', '../assets/steve_mine_spritesheet.png', '../assets/minestevesprites.json');
  
      this.load.audio("title_music", "../assets/nomore.mp3");
      this.load.audio("thedark", "../assets/thedark.mp3");
  
      let loadingBar = this.add.graphics({
        fillStyle: {
          color: 0xffffff //white
        }
      })
  
  
      //pour simuler un chargement lent: 
      /*
      for (let i=0;i<100;i++){
       this.load.spritesheet("sprite"+ i,"./../assets/running_girl.png",{
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
      //this.scene.start(CST.SCENES.MENU, "Hello from load scene");
      this.scene.start('MENU', "Hello from load scene");
      //  this.scene.launch();
    }
  
  }

  export default LoadScene;