import {Ball} from "./Ball";
import {Tile} from "./Tile"

import {IGame} from "../Interfaces/IGame"

export class Game implements IGame{
    readonly width : number = 9;
    readonly height: number = 9;
    cont: HTMLElement;
    colors: string[] = ["red", "orange", "yellow", "blue", "green", "black", ""]
    playingField: Tile[][];

    constructor(contId: string){
        this.cont = document.getElementById(contId);
        this.createBoard();
    }

    createBoard(){
        for(let i = 0; i < this.height; i++){
            let mid = document.createElement("div");
            mid.classList.add("mid");
            console.log("skibidi")
            this.playingField[i] = [];
            for(let j = 0; j < this.width; j++){
                let small = document.createElement("div");
                small.classList.add("small");
                mid.append(small);
                this.playingField[i][j] = new Tile(j, i, this.cont);
            }
            this.cont.append(mid);
        }
    }
}