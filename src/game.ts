import { SpriteRenderer } from './components/spriteRenderer';
import { Input } from './input';
import { GameObject } from './gameObject';
import { Renderer } from './renderer';
import { Player } from './player';
import { Cactus } from './cactus';
import { Bird } from './bird';
import { AudioManager } from './audioManager';

enum GameState {'READY', 'PLAYING', 'GAMEOVER'};

//const settingsBtn = document.createElement('button') as HTMLButtonElement;
const canvas = document.createElement('canvas') as HTMLCanvasElement;
const windowInput = new Input();
//settingsBtn.innerText = 'Settings';
//document.body.appendChild(settingsBtn);
document.body.appendChild(canvas);
const spriteRenderer = new SpriteRenderer('assets/images/phaser-logo.png');
export class Game {
    private _playerScore : number;
    private _gameState : GameState;
    private _highScore : number;
    private _delay : number;
    renderer = new Renderer(canvas);
    input: Input;
    private _gameObjects: GameObject[];
    lastFrameTime: number;
    private _audioManager = AudioManager.getInstance();
    constructor() {
        this._delay = 0;
        this._gameState = GameState.READY;
        console.log('Game created')
        this.renderer = new Renderer(canvas);
        this.input = new Input();
        this._gameObjects = [];
        this.lastFrameTime = 0;
        this._playerScore = 0;
        this._highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore') as string) : 0;
        this._audioManager.addAudioClip('bgm', 'assets/audios/BGM.wav');
    }
    public start(currentTime: number) {
        this.renderer.clear();
        var ctx = canvas.getContext('2d');
        if(!ctx)
        {
            console.log('Failed to get 2d context');
            return;
        }
        ctx.font = 'bold 50px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black';
        ctx.fillText('PRESS ENTER TO START!', window.innerWidth/2, window.innerHeight/2);
        if((this.input.isKeyPressed('Enter') || this.input.getTouchStart())&& this._gameState === GameState.READY)
        {
            this._playerScore = 0;
            this._audioManager.playAudioClip('bgm', true);
            this._gameState = GameState.PLAYING;
            let player = new Player();
            this.addGameObject(player);
            let cactus = new Cactus();
            this.addGameObject(cactus);
            let bird = new Bird();
            this.addGameObject(bird);
            requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
        }
        else if (this._gameState === GameState.READY)
        {
            this.lastFrameTime = currentTime;
            requestAnimationFrame((timestamp) => this.start(timestamp));
        }
        }
    public addGameObject(gameObject: GameObject) {
        this._gameObjects.push(gameObject);
    }
    private gameLoop(currentTime: number) {
        const deltaTime = (currentTime - this.lastFrameTime) / 1000;
        this.lastFrameTime = currentTime;

        this.update(deltaTime);
        this.checkCollisions();
        this.render();
        //spriteRenderer.render(0, 200, 100, 100);
        if(this._gameState === GameState.PLAYING)
            requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
        else if(this._gameState === GameState.GAMEOVER)
            console.log('Game Over');
    }
    private update(deltaTime: number) {
        this._gameObjects.forEach(obj => obj.update(deltaTime, this.input));
        if (this._gameState === GameState.PLAYING)
        {
            this._playerScore +=  deltaTime/2;   
            if(this._playerScore > this._highScore)
            {
                this._highScore = this._playerScore;
            }
        }
        //console.log('Score: ' + this._playerScore);
    }

    private render() {
        this.renderer.clear();
        //spriteRenderer.render(canvas.width-100, canvas.height-100, 100, 100);
        this._gameObjects.forEach(obj => obj.render());
        var ctx = canvas.getContext('2d');
        if(!ctx)
        {
            console.log('Failed to get 2d context');
            return;
        }
        ctx.font = 'bold 50px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Score: ' + Math.floor(this._playerScore), window.innerWidth/2, 50);
    }
    private checkCollisions() {
        //console.log('Checking collisions');
        for (let i = 0; i < this._gameObjects.length; i++) {
            for (let j = i + 1; j < this._gameObjects.length; j++) {
                const obj1 = this._gameObjects[i];
                const obj2 = this._gameObjects[j];

                // Check if obj1 and obj2 are colliding
                if (obj1.collider.isCollidingWith(obj2.collider)) {
                    // Handle the collision
                    this.handleCollision(obj1, obj2);
                }
            }
        }
    }
    private handleCollision(obj1: GameObject, obj2: GameObject) {
        console.log('Collision detected!');
        obj1.onCollisionEnter(obj2);
        obj2.onCollisionEnter(obj1);
        if(obj1.tag === 'player' || obj2.tag === 'player')
        {
            console.log('Player collided with obstacle');
            this.renderer.clear();
            this._delay = 0;
            this.gameOver(this.lastFrameTime);
        }
    }
    private gameOver(currentTime: number) {
        this._gameState = GameState.GAMEOVER;
        this.renderer.clear();
        this._gameObjects[0].render();
        var ctx = canvas.getContext('2d');
        if(!ctx)
        {
            console.log('Failed to get 2d context');
            return;
        }
        localStorage.setItem('highScore', this._highScore.toString());
        ctx.font = 'bold 50px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Your Score: ' + Math.floor(this._playerScore), window.innerWidth/2, 50);
        ctx.fillText('High Score: ' + Math.floor(this._highScore), window.innerWidth/2, 100);
        ctx.fillText('PRESS ENTER TO PLAY AGAIN!', window.innerWidth/2, window.innerHeight/2);
        ctx.fillText('PRESS ESC TO GO BACK TO MAIN MENU!', window.innerWidth/2, window.innerHeight/2 + 50);
        if(this.input.isKeyPressed('Enter') && this._gameState === GameState.GAMEOVER && this._delay > 10)
        {
            this._gameObjects = [];
            let player = new Player();
            this.addGameObject(player);
            let cactus = new Cactus();
            this.addGameObject(cactus);
            let bird = new Bird();
            this.addGameObject(bird);
            this._playerScore = 0;
            this._gameState = GameState.PLAYING;
            requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
        }
        else if (this.input.isKeyPressed('Escape') && this._gameState === GameState.GAMEOVER && this._delay > 10)
        {
            this._gameObjects = [];
            this._gameState = GameState.READY;
            this._delay = 0;
            this.start(0);
        }
        else
        {
            this._delay += 0.01 * (currentTime - this.lastFrameTime);
            this.lastFrameTime = currentTime;
            requestAnimationFrame((timestamp) => this.gameOver(timestamp));
        }
    }
}


let game = new Game()
game.start(0);




