import {ITile} from "./interfaces/ITile.ts"

export class Tile implements ITile{
    x: number;
    y: number;
    cont: HTMLElement;
    field: HTMLElement;
    color: string = "none";

    constructor(x: number, y: number, cont: HTMLElement){
        this.x = x;
        this.y = y;
        this.cont = cont;
        this.field = this.cont.children[y].children[x] as HTMLElement;
    }

    isEmpty(){
        return this.field.style.backgroundColor == "none";
    }

    setColor(color: string){
        this.field.style.backgroundColor = color;
        this.color = color;
    }
}