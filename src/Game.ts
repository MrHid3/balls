import {Tile} from "./Tile.ts"

import {IGame} from "./interfaces/IGame.ts"

export class Game implements IGame{
    readonly width : number = 9;
    readonly height: number = 9;
    cont: HTMLElement;
    colors: string[] = ["red", "orange", "yellow", "blue", "green", "black", "magenta"]
    playingField: Tile[][] = [];

    constructor(contId: string){
        this.cont = document.getElementById(contId) as HTMLElement;
        this.createBoard();
        this.playingField[2][5].setColor("cornflowerblue");
        this.playingField[7][3].setColor("bisque");
        this.createBall();
        this.createBall();
        this.createBall();
        this.createBall();
        this.createBall();
        this.createBall();
        this.createBall();
        this.createBall();
        this.createBall();
        this.createBall();
        this.createBall();
        this.createBall();
        this.createBall();
        this.createBall();
        this.createBall();
        this.createBall();
        this.createBall();
        this.createBall();
        this.createBall();
        this.createBall();
        let result: null | number[][] = this.pathFinder(5, 2, 3, 7);
        if(result) result.forEach((e: number[]) => {
            this.playingField[e[0]][e[1]].setColor("gray");
        })
        else console.log(result);
    }

    createBoard(){
        for(let i = 0; i < this.height; i++){
            let mid = document.createElement("div");
            mid.classList.add("mid");
            this.playingField[i] = [];
            for(let j = 0; j < this.width; j++){
                let small = document.createElement("div");
                small.classList.add("small");
                mid.append(small);
            }
            this.cont.append(mid);
            for(let j = 0; j < this.width; j++){
                this.playingField[i][j] = new Tile(j, i, this.cont);
            }

        }
    }

    createBall(){
        let counter: number = 1;
        let x: number = Math.floor(Math.random() * this.width);
        let y: number = Math.floor(Math.random() * this.height);
        while(this.playingField[y][x].color != "none" || counter > 81){
            x = Math.floor(Math.random() * this.width);
            y = Math.floor(Math.random() * this.height);
            counter++;
        }
        let color = Math.floor(Math.random() * this.colors.length);
        this.playingField[y][x].setColor(this.colors[color]);
    }

    pathFinder(x1: number, y1: number, x2: number, y2: number): number[][] | null{
        if(this.playingField[y1][x1].color == "none" || this.playingField[y2][x2].color == "none") return null;
        let table: number[][] | null[][] = [];
        for(let i = 0; i < this.height; i++){
            table[i] = [];
            for(let j = 0; j < this.width; j++){
                if(this.playingField[i][j].color == "none"){
                    table[i][j] = null;
                }else{
                    table[i][j] = 0;
                }

            }
        }
        table[y1][x1] = -1;
        table[y2][x2] = -2;
        if(y1 != 0 && table[y1 - 1][x1] == null) table[y1 - 1][x1] = 1;
        if(y1 != 8 && table[y1 + 1][x1] == null) table[y1 + 1][x1] = 1;
        if(x1 != 0 && table[y1][x1 - 1] == null) table[y1][x1 - 1] = 1;
        if(x1 != 8 && table[y1][x1 + 1] == null) table[y1][x1 + 1] = 1;
        for(let i = 1; i < 100; i++){
            for(let j = 0; j < this.height; j++){
                for(let k = 0; k < this.width; k++){
                    if(table[j][k] == i){
                        if(j != 0 && (table[j - 1][k] == null || table[j - 1][k]! > table[j][k]! + 1)) table[j - 1][k] = i + 1;
                        if(j != 8 && (table[j + 1][k] == null || table[j + 1][k]! > table[j][k]! + 1)) table[j + 1][k] = i + 1;
                        if(k != 0 && (table[j][k - 1] == null || table[j][k - 1]! > table[j][k]! + 1)) table[j][k - 1] = i + 1;
                        if(k != 8 && (table[j][k + 1] == null || table[j][k + 1]! > table[j][k]! + 1)) table[j][k + 1] = i + 1;
                        if(j != 0 && table[j - 1][k] == -2
                            || j != 8 && table[j + 1][k] == -2
                            || k != 0 && table[j][k - 1] == -2
                            || k != 8 && table[j][k + 1] == -2
                        ){
                            let result : number[][] = [];
                            let counter: number = 0;
                            while(table[j][k] != 1){
                                result[counter] = [j, k];
                                if(j != 0 && table[j - 1][k] == table[j][k]! - 1) j -= 1
                                else if(j != 8 && table[j + 1][k] == table[j][k]! - 1) j += 1;
                                else if(k != 0 && table[j][k - 1] == table[j][k]! - 1) k -= 1;
                                else if(k != 8 && table[j][k + 1] == table[j][k]! - 1) k += 1;
                                counter++;
                            }
                            counter++;
                            result[counter] = [j, k];
                            return result;
                        }
                    }
                }
            }
        }
        return null;
    }
}