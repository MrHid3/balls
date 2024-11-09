import {Tile} from "./Tile"

import {IGame} from "./interfaces/IGame"

export class Game implements IGame{
    readonly width : number = 9;
    readonly height: number = 9;
    cont: HTMLElement;
    colors: string[] = ["red", "orange", "yellow", "blue", "green", "black", "magenta"]
    playingField: Tile[][] = [];
    nextColor1 : string;
    nextColor2 : string;
    nextColor3: string;
    clicked = {
        x1: -1,
        y1: -1,
        x2: -1,
        y2: -1,
        length: 0,
    }

    constructor(contId: string){
        this.cont = document.getElementById(contId) as HTMLElement;
        this.createBoard();
        this.newNextColors();

        this.pushBalls(this.colors[1], this.colors[2], this.colors[3]);
        this.readInput();

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

    createBall(color: string = "black"): void{
        let counter: number = 1;
        let x: number = Math.floor(Math.random() * this.width);
        let y: number = Math.floor(Math.random() * this.height);
        while(this.playingField[y][x].color != "transparent" || counter > 81){
            x = Math.floor(Math.random() * this.width);
            y = Math.floor(Math.random() * this.height);
            counter++;
        }
        this.playingField[y][x].setColor(color);
    }

    pathFinder(x1: number, y1: number, x2: number, y2: number): number[][] | null{
        let table: number[][] | null[][] = [];
        for(let i = 0; i < this.height; i++){
            table[i] = [];
            for(let j = 0; j < this.width; j++){
                if(this.playingField[i][j].color == "transparent"){
                    table[i][j] = null;
                }else{
                    table[i][j] = -3;
                }

            }
        }
        table[y1][x1] = -1;
        table[y2][x2] = -2;
        let current: number = -1;
        let didIt = true;

        while(didIt){
            didIt = false;
            for(let i = 0; i < this.height; i++){
                for(let j = 0; j < this.width; j++){
                    console.table(table);
                    console.log(current);
                    console.log(didIt);
                    if(table[i][j] === current){
                        if(j !== 0 && table[i][j - 1] === null) {table[i][j - 1] = current + 1; didIt = true}
                        if(j !== 8 && table[i][j + 1] === null) {table[i][j + 1] = current + 1; didIt = true}
                        if(i !== 0 && table[i - 1][j] === null) {table[i - 1][j] = current + 1; didIt = true}
                        if(i !== 8 && table[i + 1][j] === null) {table[i + 1][j] = current + 1; didIt = true}
                        if(j !== 0 && table[i][j - 1] === -2
                            || j !== 8 && table[i][j + 1] === -2
                            || i !== 0 && table[i - 1][j] === -2
                            || i !== 8 && table[i + 1][j] === -2){
                            let result : number[][] = [];
                            while(table[i][j] !== -1){
                                result.push([i ,j]);
                                if(i != 0 && table[i - 1][j] == table[i][j] - 1) i -= 1
                                else if(i != 8 && table[i + 1][j] == table[i][j] - 1) i += 1;
                                else if(j != 0 && table[i][j - 1] == table[i][j] - 1) j -= 1;
                                else if(j != 8 && table[i][j + 1] == table[i][j] - 1) j += 1;
                            }
                            return result
                        }
                    }
                }
            }
            current++;
        }
        return null
    }

    pushBalls(color1? :string,color2? :string,color3? :string): void{
        this.createBall(color1);
        this.createBall(color2);
        this.createBall(color3);
    }

    readInput() : void{
        this.playingField.forEach(child => {
            child.forEach(grandchild => {
                grandchild.field.addEventListener("click", () => {
                    if(this.clicked.length === 0){
                        if(!grandchild.isEmpty()){
                            grandchild.click();
                            this.clicked.x1 = grandchild.x;
                            this.clicked.y1 = grandchild.y;
                            this.clicked.length = 1;
                        }
                    }
                    else if(this.clicked.length === 1){
                        if(grandchild.isEmpty()){
                            this.clicked.x2 = grandchild.x;
                            this.clicked.y2 = grandchild.y;
                            let path : number[][] | null = this.pathFinder(this.clicked.x1, this.clicked.y1, this.clicked.x2, this.clicked.y2);
                            console.log(path);
                            if(path !== null){
                                this.playingField[this.clicked.y1][this.clicked.x1].move(this.playingField[this.clicked.y2][this.clicked.x2]);
                                this.drawPath(path);
                                this.clicked.length = 0;
                                setTimeout(() => {
                                    this.pushBalls(this.nextColor1, this.nextColor2, this.nextColor3);
                                    this.newNextColors();
                                }, 200 * (1 + path.length * 0.15))
                            }
                        }
                    }
                })
            })
        })
    }

    drawPath(path: number[][] | null) : void{
        path.reverse()
        path.forEach((e: number[], i) => {
            this.playingField[e[0]][e[1]].setColor("#f5988e");
            setTimeout(() => {
                this.playingField[e[0]][e[1]].setColor();
            }, 200 * (1 + i * 0.15));
        });
    }

    newNextColors() : void{
        this.nextColor1 = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.nextColor2 = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.nextColor3 = this.colors[Math.floor(Math.random() * this.colors.length)];
    }
}

