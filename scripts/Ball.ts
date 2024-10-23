import {Tile} from "./Tile"
import {IBall} from "../interfaces/IBall"


export class Ball implements IBall{
    color: string;
    x: number;
    y: number;

    constructor(color: string){
        this.color = color;
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    }

    draw(){
        table[this.y][this.x] = -1;
        let cont : HTMLElement = document.getElementById("BIG")! as HTMLElement;
        console.log(cont);
        // cont.children[this.y].children[this.x].style.color = this.color;
        console.log(cont.children[this.y])
    }
}

let table : number[][] = [];
for(let i = 0; i < 10; i++){
    table[i] = [];
    for(let j = 0; j < 10; j++){
        table[i][j] = 0;
    }
}