
import {
    PLAYER_SPRITE_HEIGHT,
    PLAYER_SPRITE_WIDTH,
    PLAYER_HEIGHT,
    PLAYER_WIDTH,
    PLAYER_START_X,
    PLAYER_START_Y,
} from './constants.js';
import { movePlayer } from './movement.js';
import { animateMovement } from './animation.js';

const player = {};
const otherPlayer = {};
let pressedKeys = [];

var platforms;
var score = 0;
var scoreText;
//var this.personnage;
var player2;
var cursors;
var self;
var autreJoueurs;
var socket;
var ciel;



class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PLAY' });
    }

    preload() {
        socket = io('localhost:3500');
        this.load.image('star', 'assets/star_gold.png');
        this.load.image('map','../assets/nouvellemap.png');

        this.load.spritesheet('player','../assets/player.png', {
            frameWidth: PLAYER_SPRITE_WIDTH,
            frameHeight: PLAYER_SPRITE_HEIGHT,
          });
          this.load.spritesheet('otherPlayer', '../assets/player.png', {
            frameWidth: PLAYER_SPRITE_WIDTH,
            frameHeight: PLAYER_SPRITE_HEIGHT,
          });

    }

    create() {
    const map = this.add.image(0, 0, 'map');
    player.sprite = this.add.sprite(PLAYER_START_X, PLAYER_START_Y, 'player');
    player.sprite.displayHeight = PLAYER_HEIGHT;
    player.sprite.displayWidth = PLAYER_WIDTH;
    otherPlayer.sprite = this.add.sprite(
      PLAYER_START_X,
      PLAYER_START_Y,
      'otherPlayer',
    );
    otherPlayer.sprite.displayHeight = PLAYER_HEIGHT;
    otherPlayer.sprite.displayWidth = PLAYER_WIDTH;

    this.anims.create({
      key: 'running',
      frames: this.anims.generateFrameNumbers('player'),
      frameRate: 24,
      reapeat: -1,
    });

    this.input.keyboard.on('keydown', (e) => {
      if (!pressedKeys.includes(e.code)) {
        pressedKeys.push(e.code);
      }
    });
    
    this.input.keyboard.on('keyup', (e) => {
      pressedKeys = pressedKeys.filter((key) => key !== e.code);
    });

    socket.on('move', ({ x, y }) => {
      console.log('revieved move');
      if (otherPlayer.sprite.x > x) {
        otherPlayer.sprite.flipX = true;
      } else if (otherPlayer.sprite.x < x) {
        otherPlayer.sprite.flipX = false;
      }
      otherPlayer.sprite.x = x;
      otherPlayer.sprite.y = y;
      otherPlayer.moving = true;
    });
    socket.on('moveEnd', () => {
      console.log('revieved moveend');
      otherPlayer.moving = false;
    });
    }

    update() {
        this.scene.scene.cameras.main.centerOn(player.sprite.x, player.sprite.y);
        const playerMoved = movePlayer(pressedKeys, player.sprite);
        if (playerMoved) {
          socket.emit('move', { x: player.sprite.x, y: player.sprite.y });
          player.movedLastFrame = true;
        } else {
          if (player.movedLastFrame) {
            socket.emit('moveEnd');
          }
          player.movedLastFrame = false;
        }
        animateMovement(pressedKeys, player.sprite);
        // Aninamte other player
        if (otherPlayer.moving && !otherPlayer.sprite.anims.isPlaying) {
          otherPlayer.sprite.play('running');
        } else if (!otherPlayer.moving && otherPlayer.sprite.anims.isPlaying) {
          //otherPlayer.sprite.stop('running');
        }


    }



}


export default PlayScene;