(()=>{"use strict";class t{constructor(){this._scenes=[]}addScene(t){this._scenes.push(t)}loadScene(t){var e;this._scenes[t].onSceneLoad(),null===(e=this._currentScene)||void 0===e||e.onSceneUnload(),this._currentScene=this._scenes[t]}get currentScene(){return this._currentScene}static getInstance(){return this._instance||(this._instance=new t),this._instance}}class e{constructor(){window.navigator.userAgent.match(/Mobile/)||window.navigator.userAgent.match(/Tablet/)?this._isMobile=!0:this._isMobile=!1,this._menuText="Press Button to Start",this._gameOverText="Press Restart or ESC to go back to Menu",this._isMobile&&(this._menuText="Tap Start Game",this._gameOverText="Tap Restart")}static getInstance(){return this._instance||(this._instance=new e),this._instance}get isMobile(){return this._isMobile}set isMobile(t){this._isMobile=t}get menuText(){return this._menuText}get gameOverText(){return this._gameOverText}}class i{constructor(t,e){this._renderer=t,this._gameObjects=[],this._uiObjects=[],this._canvas=e}update(t,e){for(let i=0;i<this._gameObjects.length;i++)this._gameObjects[i].update(t,e);for(let i=0;i<this._uiObjects.length;i++)this._uiObjects[i].update(t,e)}render(){this._renderer.clear();for(let t=0;t<this._gameObjects.length;t++)this._gameObjects[t].render();for(let t=0;t<this._uiObjects.length;t++)this._uiObjects[t].render()}addGameObject(t){this._gameObjects.push(t)}addUIObject(t){this._uiObjects.push(t)}get gameObjects(){return this._gameObjects}get uiObjects(){return this._uiObjects}}class s{static loadImage(t){return new Promise(((e,i)=>{const s=new Image;s.onload=()=>{e(s),this.assetMap.set(t,s)},s.onerror=()=>i(new Error(`Failed to load image at ${t}`)),s.src=t}))}static loadImages(t){return Promise.all(t.map((t=>s.loadImage(t))))}static loadAudio(t){return new Promise(((e,i)=>{const s=new Audio;s.oncanplaythrough=()=>{e(s),this.assetMap.set(t,s)},s.onerror=()=>i(new Error(`Failed to load audio at ${t}`)),s.src=t,s.load()}))}static loadAudios(t){return Promise.all(t.map((t=>s.loadAudio(t))))}}s.assetMap=new Map;class n{constructor(t){if(s.assetMap.has(t))return this._audio=s.assetMap.get(t),void console.log("Audio loaded from assetMap");this._audio=new Audio(t)}play(){this._audio.loop=!1,this._audio.play().catch((t=>{}))}playLoop(){this._audio.loop=!0,this._audio.play().catch((t=>{}))}pause(){this._audio.pause()}changeVolume(t){this._audio.volume=t}mute(){this._audio.muted=!0}unmute(){this._audio.muted=!1}}class a{constructor(){this._volume=.5,this._audioClips=new Map}static getInstance(){return a._instance||(a._instance=new a),a._instance}addAudioClip(t,e){var i;this._audioClips.has(t)||(this._audioClips.set(t,new n(e)),null===(i=this._audioClips.get(t))||void 0===i||i.changeVolume(this._volume))}getAudioClip(t){return this._audioClips.get(t)}changeVolume(t){this._volume=t;for(let t of this._audioClips.values())t.changeVolume(this._volume)}playAudioClip(t,e=!1){let i=this._audioClips.get(t);i&&!e?i.play():i&&e&&i.playLoop()}mute(){for(let t of this._audioClips.values())t.mute()}unmute(){for(let t of this._audioClips.values())t.unmute()}}class o{constructor(t,e,i,s){this.x=t,this.y=e,this.width=i,this.height=s}isCollidingWith(t){return this.x<t.x+t.width&&this.x+this.width>t.x&&this.y<t.y+t.height&&this.y+this.height>t.y}}class h{constructor(t=0,e=0){this.position=[t,e,0],this.rotation=[0,0,0],this.scale=[1,1,1],this.enable()}enable(){this._isEnable=!0,this.onEnable()}disable(){this._isEnable=!1,this.onDisable()}get isEnable(){return this._isEnable}onEnable(){}onDisable(){}get tag(){return this._tag}get width(){return this._width}get height(){return this._height}}class r extends h{constructor(t=0,e=0){super(t,e),this.collider=new o(this.position[0],this.position[1],0,0)}update(t,e){}render(){}onCollisionEnter(t){}get text(){return this._text}set text(t){this._text=t}startBlink(t){}stopBlink(){}}class d extends r{constructor(t,e,i,s,n,a,h,r,d,c){super(t,e),this.collider=new o(this.position[0],this.position[1],0,0),this._x=t,this._y=e,this._width=i,this._height=s,this._text=n,this._isBold=a,this._fontSize=h,this._font=r,this._color=d,this._backgroundColor=c}update(t,e){let i=e.getLastClick();if(i&&i.x>=this.position[0]&&i.x<=this.position[0]+this._width&&i.y>=this.position[1]&&i.y<=this.position[1]+this._height)e.clearTouch(),this.onButtonClicked();else{let t=e.getTouchEnd();t&&t.x>=this.position[0]&&t.x<=this.position[0]+this._width&&t.y>=this.position[1]&&t.y<=this.position[1]+this._height&&(e.clearTouch(),this.onButtonClicked())}}render(){let t=document.querySelector("canvas").getContext("2d");null!=t?(t.fillStyle=this._backgroundColor,t.fillRect(this.position[0],this.position[1],this._width,this._height),t.font=this._fontSize+"px "+this._font,this._isBold&&(t.font="bold "+t.font),t.fillStyle=this._color,t.textAlign="center",t.textBaseline="middle",t.fillText(this._text,this.position[0]+this._width/2,this.position[1]+this._height/2)):console.error("2D context is null")}onCollisionEnter(t){}onButtonClicked(){}set text(t){this._text=t}}class c extends d{constructor(){console.log(window.innerWidth,window.innerHeight),super(window.innerWidth/2-100,window.innerHeight/2-50,200,100,"Start Game",!0,30,"Arial","blue","orange"),a.getInstance().addAudioClip("button","assets/audios/button.mp3")}update(t,e){super.update(t,e),e.clearTouch()}render(){super.render()}onButtonClicked(){var e;null===(e=a.getInstance().getAudioClip("button"))||void 0===e||e.play(),t.getInstance().loadScene(1)}}class l extends r{constructor(t,e,i,s,n,a,o,h,r){super(t,e),this._text=i,this._fontSize=o,this._color=r,this._font=h,this._isBold=a,this._align=s,this._baseline=n,this._ogSize=o,this.isBlinking=!1}render(){let t=document.querySelector("canvas").getContext("2d");null!=t?(t.font=(this._isBold?"bold ":"")+this._fontSize+"px "+this._font,t.textAlign=this._align,t.textBaseline=this._baseline,t.fillStyle=this._color,t.fillText(this._text,this.position[0],this.position[1])):console.error("2D context is null")}startBlink(t){this.isBlinking||(this.isBlinking=!0,this._blinkID=setInterval((()=>{this.blink()}),t),console.log(this._blinkID))}blink(){this._fontSize==this._ogSize?this._fontSize=0:this._fontSize=this._ogSize}stopBlink(){this.isBlinking=!1,console.log(this._blinkID),clearInterval(this._blinkID),this._fontSize=this._ogSize}}class u{constructor(){this._playerScore=0,this._highScore=localStorage.getItem("highScore")?parseInt(localStorage.getItem("highScore")):0}static getInstance(){return this._instance||(this._instance=new u),this._instance}get score(){return this._playerScore}get highScore(){return this._highScore}resetScore(){this._playerScore=0}increaseScore(t){this._playerScore+=10*t,this._playerScore>this._highScore&&(this._highScore=this._playerScore,localStorage.setItem("highScore",this._highScore.toString()))}}class g extends i{onSceneLoad(){this._gameObjects=[],this._renderer.clear(),this.addUIObject(new c),this.addUIObject(new l(window.innerWidth/2,window.innerHeight/2-100,"Record: "+Math.floor(u.getInstance().highScore),"center","middle",!0,50,"Arial","black"))}onSceneUnload(){this._gameObjects=[],this._uiObjects=[]}update(t,i){super.update(t,i),i.getTouchStart()&&e.getInstance().isMobile&&document.hasFocus()||i.getTouchEnd()&&document.hasFocus()&&(e.getInstance().isMobile=!0,i.clearTouch())}render(){super.render()}}class _{constructor(){this._frame=0}setState(t){this._currentState=t}update(t){this._currentState.update(this._frame++)}render(t,e,i,s){this._currentState.render(t,e,i,s)}addSprite(t){this._currentState.addSprite(t)}}class p extends h{constructor(){super(),this._animator=new _}update(t,e){this._isEnable&&this._animator.update(t)}render(){this._isEnable&&this._animator.render(this.position[0],this.position[1],this._width,this._height)}onCollisionEnter(t){}}class w extends p{constructor(){super(),this._tag="obstacle",this.position[0]=Math.max(window.innerWidth,1536)+100*Math.random()}update(t,e){this.position[0]-=.08*t*this._speed*(1+u.getInstance().score/2e3),this.collider.x=this.position[0],this.collider.y=this.position[1],super.update(t,e)}render(){super.render()}onCollisionEnter(t){}}class m{constructor(t){s.assetMap.has(t)?(this._image=s.assetMap.get(t),console.log("Sprite loaded from assetMap")):(this._image=new Image,this._image.src=t,this._image.onload=()=>{})}render(t,e,i,s){let n=document.querySelector("canvas").getContext("2d");null!=n?n.drawImage(this._image,t,e,i,s):console.error("2D context is null")}}class b{constructor(){this._sprites=[],this._currentSprite=0}update(t){t%10==0&&(this._currentSprite++,this._currentSprite>=this._sprites.length&&(this._currentSprite=0))}render(t,e,i,s){this._sprites[this._currentSprite].render(t,e,i,s)}addSprite(t){this._sprites.push(t)}}class S extends w{constructor(){super(),this._width=60*window.innerHeight/1080,this._height=60*window.innerHeight/1080,this._speed=1e4,this.position[1]=window.innerHeight-this._height-160*window.innerHeight/1080,this._animator.setState(new b),this._animator.addSprite(new m("assets/images/bird_flap_0.png")),this._animator.addSprite(new m("assets/images/bird_flap_1.png")),this._animator.addSprite(new m("assets/images/bird_flap_2.png")),this.collider=new o(this.position[0],this.position[1],this._width,this._height)}update(t,e){super.update(t,e)}render(){super.render()}onCollisionEnter(t){}}class v extends w{constructor(){super(),this._width=80*window.innerHeight/1080,this._height=100*window.innerHeight/1080,this._speed=8e3,this.position[1]=window.innerHeight-this._height,this.collider=new o(this.position[0],this.position[1],this._width,this._height),this._animator.setState(new b),this._animator.addSprite(new m("assets/images/pixel_cactus.png"))}update(t,e){super.update(t,e)}render(){super.render()}onCollisionEnter(t){}}class y{constructor(){this._sprites=[],this._currentSprite=0,this._sprites.push(new m("assets/images/seiba_hurt.png"))}update(t){}render(t,e,i,s){this._sprites[this._currentSprite].render(t,e,i,s)}addSprite(t){this._sprites.push(t)}}class x{constructor(t,e,i=1,s=4900,n=!1){this._gameObject=t,this._isGrounded=e,this._velocity=[0,0],this._gravity=s,i<=0&&(i=1),this._mass=i,this._isKinematic=n}update(t){0!=this._gameObject.isEnable&&(this._isKinematic||this._isGrounded||(this._velocity[1]-=this._gravity*t*window.innerHeight/1080,this._gameObject.position[1]-=this._velocity[1]*t,this._gameObject.position[1]>=window.innerHeight-this._gameObject.height&&(this._gameObject.position[1]=window.innerHeight-this._gameObject.height,this._isGrounded=!0,this._velocity[1]=0)),this._gameObject.position[0]+=this._velocity[0]*t)}applyForce(t){0!=this._gameObject.isEnable&&(this._velocity[0]+=t[0]/this._mass,this._velocity[1]+=t[1]/this._mass,this._isGrounded&&t[1]>0&&(this._isGrounded=!1))}get velocity(){return this._velocity}get isGrounded(){return this._isGrounded}}class f extends p{constructor(){super(),this._isDuck=!1,this._jumpForce=1690*window.innerHeight/1080,this._rigidbody=new x(this,!0),this._alive=!0,this._width=160*window.innerHeight/1080,this._height=200*window.innerHeight/1080,this._tag="player",this.position[0]=window.innerWidth/5-this._width/2,this.position[1]=window.innerHeight-this._height,a.getInstance().addAudioClip("jump","assets/audios/jump.wav"),a.getInstance().addAudioClip("collide","assets/audios/collide.wav"),this._animator.setState(new b),this.collider=new o(this.position[0],this.position[1],this._width,this._height),this._animator.addSprite(new m("assets/images/seiba_walking_0.png")),this._animator.addSprite(new m("assets/images/seiba_walking_1.png")),this._animator.addSprite(new m("assets/images/seiba_walking_2.png")),this._animator.addSprite(new m("assets/images/seiba_walking_3.png"))}update(t,e){var i;if(!this._alive)return;let s=e.getTouchStart();(e.isKeyPressed("KeyW")||e.isKeyPressed("Space")||e.isKeyPressed("ArrowUp")||s&&s.x>window.innerWidth/2)&&this._rigidbody.isGrounded&&!this._isDuck&&(this._rigidbody.applyForce([0,this._jumpForce]),null===(i=a.getInstance().getAudioClip("jump"))||void 0===i||i.play(),console.log("jump")),this._rigidbody.update(t),this._rigidbody.isGrounded||e.clearTouch(),(e.isKeyPressed("KeyS")||e.isKeyPressed("ArrowDown")||s&&s.x<window.innerWidth/2&&null==e.getTouchEnd())&&this._rigidbody.isGrounded?(this._isDuck=!0,this._height=100*window.innerHeight/1080,this.position[1]=window.innerHeight-this._height):this._rigidbody.isGrounded&&(e.clearTouch(),this._height=200*window.innerHeight/1080,this.position[1]=window.innerHeight-this._height,this._isDuck=!1),this.collider.x=this.position[0],this.collider.y=this.position[1],this.collider.height=this._height,super.update(t,e)}render(){super.render()}onCollisionEnter(e){var i;this._animator.setState(new y),"obstacle"==e.tag&&t.getInstance().loadScene(2),null===(i=a.getInstance().getAudioClip("collide"))||void 0===i||i.play(),this._alive=!1}}class I extends S{constructor(){super(),this.position[1]=window.innerHeight-2*this._height}}class j extends p{constructor(){super(),this.collider=new o(0,0,0,0),this._tag="bg",this.position[0]=0,this.position[1]=0,this._animator.setState(new b)}update(t,e){this.position[0]+=.1*t*this._speed,super.update(t,e)}render(){super.render()}}class C extends j{constructor(){super(),this._speed=5e3+3e3*Math.random(),this._width=100*window.innerHeight/1080,this._height=100*window.innerHeight/1080,this.position[1]=2*this._height*window.innerHeight/1080,this._animator.addSprite(new m("assets/images/dragon_0.png")),this._animator.addSprite(new m("assets/images/dragon_1.png")),this._animator.addSprite(new m("assets/images/dragon_2.png")),this._animator.addSprite(new m("assets/images/dragon_3.png"))}update(t,e){super.update(t,e),this.position[0]>window.innerWidth&&(this.position[0]=-this._width-1e3*Math.random())}}class O extends S{constructor(){super(),this.position[1]-=2*this._width}}class k extends v{constructor(){super(),this._width*=1.5,this._height*=1.5,this._speed*=1.05,this.collider.width=this._width,this.collider.height=this._height,this.position[1]=window.innerHeight-this._height}}class M extends i{onSceneLoad(){this._delay=0,u.getInstance().resetScore(),this.addGameObject(new f),this.addGameObject(new C),this.addGameObject(new v),this.addUIObject(new l(window.innerWidth/2,50,"Score: "+Math.floor(u.getInstance().score),"center","middle",!0,50,"Arial","black")),a.getInstance().addAudioClip("up","assets/audios/up.wav"),this._renderer.clear()}onSceneUnload(){this._gameObjects=[],this._uiObjects=[]}update(e,i){var s;if(super.update(e,i),2==this.gameObjects.length||this._gameObjects[2].position[0]<=window.innerWidth/3&&this.gameObjects.length<4){let t=Math.random();t<.3?this.addGameObject(new v):t<.55?this.addGameObject(new k):t<.7?this.addGameObject(new O):t<.85?this.addGameObject(new I):this.addGameObject(new S)}for(let t=2;t<this._gameObjects.length;t++)this._gameObjects[t].position[0]<-this._gameObjects[t].collider.width&&this._gameObjects.splice(t,1);document.hasFocus()?(u.getInstance().increaseScore(e),this._uiObjects[0].text="Score: "+Math.floor(u.getInstance().score),Math.floor(u.getInstance().score)%100==0&&0!=Math.floor(u.getInstance().score)?(null===(s=a.getInstance().getAudioClip("up"))||void 0===s||s.play(),this._uiObjects[0].startBlink(200)):Math.floor(u.getInstance().score)%100==15&&Math.floor(u.getInstance().score)>100&&this._uiObjects[0].stopBlink()):t.getInstance().loadScene(0)}render(){super.render(),this._canvas.getContext("2d")||console.log("Failed to get 2d context")}}class E extends d{constructor(){super(window.innerWidth/2-100,window.innerHeight/2,200,100,"Restart",!0,30,"Arial","blue","pink"),a.getInstance().addAudioClip("button","assets/audios/button.mp3")}update(t,e){super.update(t,e)}render(){super.render()}onButtonClicked(){var e;null===(e=a.getInstance().getAudioClip("button"))||void 0===e||e.play(),t.getInstance().loadScene(1)}}class T extends i{onSceneLoad(){this._delay=0,this.addGameObject(t.getInstance().currentScene.gameObjects[0]),this.addUIObject(new l(window.innerWidth/2,50,"Your Score: "+Math.floor(u.getInstance().score),"center","middle",!0,50,"Arial","black")),this.addUIObject(new l(window.innerWidth/2,100,"High Score: "+Math.floor(u.getInstance().highScore),"center","middle",!0,50,"Arial","black"))}onSceneUnload(){this._gameObjects=[],this._uiObjects=[],this._delay=0}update(e,i){super.update(e,i),this._delay+=10*e,this._delay>10&&null==this.uiObjects.find((t=>t instanceof E))&&this.addUIObject(new E),this._delay>10&&i.isKeyPressed("Escape")?(this._delay=0,t.getInstance().loadScene(0)):i.clearTouch()}render(){super.render()}}class G{constructor(){this.keys={},this.touchStart=null,this.touchEnd=null,this.lastClick=null,window.addEventListener("keydown",(t=>this.keys[t.code]=!0)),window.addEventListener("keyup",(t=>this.keys[t.code]=!1)),window.addEventListener("touchstart",(t=>this.handleTouchStart(t))),window.addEventListener("touchend",(t=>this.handleTouchEnd(t))),window.addEventListener("click",(t=>this.handleMouseClick(t)))}handleTouchStart(t){this.touchStart={x:t.touches[0].clientX,y:t.touches[0].clientY}}handleTouchEnd(t){t.changedTouches&&t.changedTouches[0]&&(this.touchEnd={x:t.changedTouches[0].clientX,y:t.changedTouches[0].clientY})}handleMouseClick(t){this.lastClick={x:t.clientX,y:t.clientY}}getLastClick(){return this.lastClick}isKeyPressed(t){return!!this.keys[t]}getTouchStart(){return this.touchStart}getTouchEnd(){return this.touchEnd}clearTouch(){this.touchStart=null,this.touchEnd=null,this.lastClick=null}}class A{constructor(t){this.BGX=0,this.canvas=t,this.BG=new Image,this.resizeCanvas()}resizeCanvas(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight}render(t){null!=t&&(this._renderingScene!=t&&(this.resizeCanvas(),this._renderingScene=t),t.render())}setBG(t){if(s.assetMap.has(t)&&s.assetMap.get(t)instanceof HTMLImageElement)return this.BG=s.assetMap.get(t),void console.log("BG set from asset map");this.BG.src=t}clear(){var t,e,i;null===(t=this.canvas.getContext("2d"))||void 0===t||t.clearRect(0,0,this.canvas.width,this.canvas.height),null===(e=this.canvas.getContext("2d"))||void 0===e||e.drawImage(this.BG,this.BGX,0,this.canvas.width,this.canvas.height),null===(i=this.canvas.getContext("2d"))||void 0===i||i.drawImage(this.BG,this.BGX+this.canvas.width,0,this.canvas.width,this.canvas.height),this.BGX--,this.BGX<-this.canvas.width&&(this.BGX=0)}}class B{constructor(){}static getInstance(){return this._instance||(this._instance=new B),this._instance}checkCollisions(t){let e=t.gameObjects;for(let t=0;t<e.length;t++)for(let i=t+1;i<e.length;i++){const s=e[t],n=e[i];s.collider.isCollidingWith(n.collider)&&this.handleCollision(s,n)}}handleCollision(t,e){t.onCollisionEnter(e),e.onCollisionEnter(t)}}class H{constructor(t){console.log("Game created"),this.renderer=new A(t),this.input=new G,this.lastFrameTime=0}loadAssets(){return t=this,i=void 0,a=function*(){if(!this._iPath||!this._aPath)throw new Error("Paths not set");yield s.loadImages(this._iPath),e.getInstance().isMobile||(yield s.loadAudios(this._aPath))},new((n=void 0)||(n=Promise))((function(e,s){function o(t){try{r(a.next(t))}catch(t){s(t)}}function h(t){try{r(a.throw(t))}catch(t){s(t)}}function r(t){var i;t.done?e(t.value):(i=t.value,i instanceof n?i:new n((function(t){t(i)}))).then(o,h)}r((a=a.apply(t,i||[])).next())}));var t,i,n,a}start(t){this.renderer.resizeCanvas(),requestAnimationFrame((t=>this.gameLoop(t)))}gameLoop(e){const i=(e-this.lastFrameTime)/1e3;this.lastFrameTime=e;let s=t.getInstance().currentScene;s.update(i,this.input),B.getInstance().checkCollisions(s),this.renderer.render(s),requestAnimationFrame((t=>this.gameLoop(t)))}get iPath(){return this._iPath}get aPath(){return this._aPath}}const P=document.createElement("canvas");document.body.appendChild(P);const z=new class extends H{constructor(t){super(t),this._aPath=["assets/audios/jump.wav","assets/audios/collide.wav","assets/audios/button.mp3","assets/audios/up.wav"],this._iPath=["assets/images/BG.png","assets/images/pixel_cactus.png","assets/images/bird_flap_0.png","assets/images/bird_flap_1.png","assets/images/bird_flap_2.png","assets/images/dragon_0.png","assets/images/dragon_1.png","assets/images/dragon_2.png","assets/images/dragon_3.png","assets/images/seiba_hurt.png","assets/images/seiba_walking_0.png","assets/images/seiba_walking_1.png","assets/images/seiba_walking_2.png","assets/images/seiba_walking_3.png"],this.loadAssets().then((()=>{this.start(0)})).catch((t=>{console.error("Failed to load assets:",t)}))}start(e){t.getInstance().addScene(new g(this.renderer,P)),t.getInstance().addScene(new M(this.renderer,P)),t.getInstance().addScene(new T(this.renderer,P)),t.getInstance().loadScene(0),super.start(e),this.renderer.setBG("assets/images/BG.png")}}(P),L=P.getContext("2d");!function t(){null==L||L.clearRect(0,0,P.width,P.height),L&&(L.font="30px Arial",L.textAlign="center",L.fillStyle="white",L.fillText("Loading "+Math.floor(100*s.assetMap.size/(z.iPath.length+z.aPath.length))+"%",P.width/2,P.height/2)),s.assetMap.size!=z.iPath.length+z.iPath.length&&requestAnimationFrame(t)}()})();