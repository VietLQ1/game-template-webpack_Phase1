import { SpriteRenderer } from './engine/components/SpriteRenderer';
import { SceneManager } from './engine/scene/SceneManager';
import { MenuScene } from './dinogame/scene/MenuScene';
import { PlayScene } from './dinogame/scene/PlayScene';
import { GameOverScene } from './dinogame/scene/GameOverScene';
import { Game } from './engine/Game';
import { AssetLoader } from './engine/AssetLoader';


const canvas = document.createElement('canvas') as HTMLCanvasElement;

document.body.appendChild(canvas);
//const spriteRenderer = new SpriteRenderer('assets/images/phaser-logo.png');

class DinoGame extends Game
{
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this._aPath = ['assets/audios/jump.wav', 'assets/audios/collide.wav', 'assets/audios/button.mp3', 'assets/audios/up.wav', 'assets/audios/duck.wav'];
        this._iPath = ['assets/images/BG.png','assets/images/pixel_cactus.png','assets/images/bird_flap_0.png','assets/images/bird_flap_1.png','assets/images/bird_flap_2.png'
            , 'assets/images/dragon_0.png','assets/images/dragon_1.png','assets/images/dragon_2.png','assets/images/dragon_3.png','assets/images/seiba_hurt.png'
            , 'assets/images/seiba_walking_0.png','assets/images/seiba_walking_1.png','assets/images/seiba_walking_2.png','assets/images/seiba_walking_3.png'
            , 'assets/images/setting.png'
        ];
        this.loadAssets().then(() => {
            this.start(0);
        }).catch(error => {
            console.error("Failed to load assets:", error);
        });
    }
    public start(currentTime: number): void {
        SceneManager.getInstance().addScene(new MenuScene(this.renderer, canvas));
        SceneManager.getInstance().addScene(new PlayScene(this.renderer, canvas));
        SceneManager.getInstance().addScene(new GameOverScene(this.renderer, canvas));
        SceneManager.getInstance().loadScene(0);
        super.start(currentTime);
        this.renderer.setBG('assets/images/BG.png');
    }
}

const game = new DinoGame(canvas);
const context = canvas.getContext('2d');
function loading() {
    context?.clearRect(0, 0, canvas.width, canvas.height);
    if (context) {
        context.font = '30px Arial';
        context.textAlign = 'center';
        context.fillStyle = 'white';
        context.fillText('Loading ' + Math.floor(100 * AssetLoader.assetMap.size / (game.iPath.length + game.aPath.length)) + '%', canvas.width / 2, canvas.height / 2);
    }
    if(AssetLoader.assetMap.size == game.iPath.length + game.iPath.length)
    {
        return;
    }
    else
    {
        requestAnimationFrame(loading);
    }
}
loading();

// game.start(0);




