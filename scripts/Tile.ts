import {ITile} from "../interfaces/ITile"

export class Tile implements ITile{
    x: number;
    y: number;
    field: HTMLElement;
    cont: HTMLElement;

    constructor(x: number, y: number, cont: HTMLElement){
        this.x = x;
        this.y = y;
        this.field = cont.children[y].children[x] as HTMLElement;
    }

    isEmpty(){
        return this.field.style.backgroundColor == "none";
    }

    setColor(color: string){
        this.field.style.backgroundColor = color;
    }
}