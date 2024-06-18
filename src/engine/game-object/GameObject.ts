import { Input } from "../input/Input";
import { Collider } from "../components/Collider";
import { SpriteRenderer } from "../components/SpriteRenderer";

export abstract class GameObject {
    public position: [number, number, number];
    public rotation: [number, number, number];
    public scale: [number, number, number];
    protected _tag: string;
    protected _width: number;
    protected _height: number;
    public collider: Collider;
    public spriteRenderer: SpriteRenderer;
    
    constructor(x: number = 0, y: number = 0) {
        this.position = [x, y, 0];
        this.rotation = [0, 0, 0];
        this.scale = [1, 1, 1];
    }
    abstract update(deltaTime: number, input: Input): void;
    abstract render(): void;
    abstract onCollisionEnter(other: GameObject): void;
    get tag(): string {
        return this._tag;
    }
    get width(): number {
        return this._width;
    }
    get height(): number {
        return this._height;
    }
}
