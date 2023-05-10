import LoadScene from './scenes/LoadScene.js'
import MenuScene from './scenes/MenuScene.js'
import LoginScene from './scenes/LoginScene.js'
import PlayScene from './scenes/PlayScene2.js'

var game = new Phaser.Game({
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
  ]

})