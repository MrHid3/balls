import {Tile} from "./Tile"

import {IGame} from "./interfaces/IGame"

export class Game implements IGame{
    readonly width : number = 9;
    readonly height: number = 9;
    readonly clickedPathColor: string = "#f56262";
    readonly hoveredPathColor: string = "#62c9f5";
    cont: HTMLElement;
    colors: string[] = ["red", "orange", "yellow", "blue", "green", "black", "magenta"]
    playingField: Tile[][] = [];
    nextColors: string[] = [];
    path: Tile[] = [];
    clicked : {
        one : Tile,
        two : Tile,
        length: number,
    }

    constructor(contId: string){
        this.cont = document.getElementById(contId) as HTMLElement;
        this.createBoard();
        this.clicked = {
            one : new Tile(0, 0, this.cont),
            two : new Tile(0, 0, this.cont),
            length :     0,
        }
        this.newNextColors();

        this.pushBalls(this.nextColors);
        this.readInput();
        this.readHover();
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
        let x: number = Math.floor(Math.random() * this.width);
        let y: number = Math.floor(Math.random() * this.height);
        while(this.playingField[y][x].color != "transparent"){
            x = Math.floor(Math.random() * this.width);
            y = Math.floor(Math.random() * this.height);
        }
        this.playingField[y][x].setColor(color);
    }

    pathFinder(tile1: Tile, tile2: Tile): Tile[] | null{
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
        table[tile1.y][tile1.x] = -1;
        table[tile2.y][tile2.x] = -2;
        let current: number = -1;
        let didIt = true;

        while(didIt){
            didIt = false;
            for(let i = 0; i < this.height; i++){
                for(let j = 0; j < this.width; j++){
                    if(table[i][j] === current){
                        if(j !== 0 && table[i][j - 1] === null) {table[i][j - 1] = current + 1; didIt = true}
                        if(j !== 8 && table[i][j + 1] === null) {table[i][j + 1] = current + 1; didIt = true}
                        if(i !== 0 && table[i - 1][j] === null) {table[i - 1][j] = current + 1; didIt = true}
                        if(i !== 8 && table[i + 1][j] === null) {table[i + 1][j] = current + 1; didIt = true}
                        if(j !== 0 && table[i][j - 1] === -2
                            || j !== 8 && table[i][j + 1] === -2
                            || i !== 0 && table[i - 1][j] === -2
                            || i !== 8 && table[i + 1][j] === -2){
                            let result : Tile[] = [];
                            if(j !== 0 && table[i][j - 1] === -2) result.push(this.playingField[i][j - 1]);
                            if(j !== 8 && table[i][j + 1] === -2) result.push(this.playingField[i][j + 1]);
                            if(i !== 0 && table[i - 1][j] === -2) result.push(this.playingField[i - 1][j]);
                            if(i !== 8 && table[i + 1][j] === -2) result.push(this.playingField[i + 1][j]);
                            while(table[i][j] !== -1){
                                result.push(this.playingField[i][j]);
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

    pushBalls(colors: string[]): void{
        colors.forEach((color) => {
            this.createBall(color);
        })
    }

    readInput() : void{
        this.playingField.forEach(child => {
            child.forEach(grandchild => {
                grandchild.field.addEventListener("click", () => {
                    if(this.clicked.length === 0){
                        if(!grandchild.isEmpty()){
                            grandchild.click();
                            this.clicked.one = this.playingField[grandchild.y][grandchild.x];
                            this.clicked.length = 1;
                        }
                    }
                    else if(this.clicked.length === 1){
                        if(grandchild.isEmpty()){
                            this.clicked.two = this.playingField[grandchild.y][grandchild.x];
                            if(this.path !== null){
                                this.drawPath(this.path, this.clickedPathColor);
                                this.clicked.length = 0;
                                setTimeout(() => {
                                    this.clicked.one.move(this.clicked.two);
                                    setTimeout(() => {
                                        this.pushBalls(this.nextColors);
                                        this.newNextColors();
                                        this.seekAndDestroy();
                                    }, 200)
                                }, 200 * (1 + this.path.length * 0.15))
                                
                            }
                        } else if (grandchild == this.clicked.one){
                            this.clicked.one.click();
                            this.clicked.length = 0;
                        } else {
                            this.clicked.one.click();
                            this.clicked.one = this.playingField[grandchild.y][grandchild.x];
                            this.clicked.one.click();
                            if(this.path !== null){
                                this.fastDrawPath(this.path);
                            }
                        }
                    }
                })
            })
        })
    }

    readHover() : void{
        this.playingField.forEach(child => {
            child.forEach(grandchild => {
                let hovered: Tile
                grandchild.field.addEventListener("mouseover", () => {
                    if(this.clicked.length === 1){
                        hovered = this.playingField[grandchild.y][grandchild.x];
                        this.path = this.pathFinder(this.clicked.one, hovered);
                        if(this.path !== null){
                            this.fastDrawPath(this.path, this.hoveredPathColor);
                        }
                    }
                })
                grandchild.field.addEventListener("mouseout", () => {
                    if(this.clicked.length === 1 || this.clicked.length === 2){
                        if(this.path !== null){
                            this.fastDrawPath(this.path);
                        }
                    }
                })
            })
        })
    }

    drawPath(path: Tile[] | null, color: string = "transparent") : void{
        path.reverse()
        path.forEach((e: Tile, i : number) => {
            e.setPathColor(color);
            setTimeout(() => {
                e.setPathColor();
            }, 200 * (1 + i * 0.15));
        });
    }

    fastDrawPath(path: Tile[] | null, color: string = "transparent") : void{
        path.forEach((e: Tile) => {
            if(e.isEmpty()){
                e.setPathColor(color);
            }
        });
    }

    newNextColors() : void{
        for(let i = 0; i < 3; i++)
            this.nextColors[i] = this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    seekAndDestroy() : void{
        let table: number[][] = [];
        for(let i = 0; i < this.height; i++){
            table[i] = [];
            let streak = 1;
            for(let j = 1; j < this.width; j++){
                if(this.playingField[i][j].color == this.playingField[i][j - 1].color && this.playingField[i][j].color != "transparent"){
                    streak++;
                }else{
                    if(streak >= 5){
                        for(let k = 0; k < streak; k++){
                            table[i][j - k - 1] = -1;
                        }
                    }
                    streak = 1;
                }
            }
            if(streak >= 5){
                for(let k = 0; k < streak; k++){
                    table[i][8 - k] = -1;
                }
            }
        }

        for(let j = 0; j < this.width; j++){
            let streak = 1;
            for(let i = 1; i < this.height; i++){
                if(this.playingField[i][j].color == this.playingField[i - 1][j].color && this.playingField[i][j].color != "transparent"){
                    streak++;
                }else{
                    if(streak >= 5){
                        for(let k = 0; k < streak; k++){
                            table[i - k - 1][j] = -1;
                        }
                    }
                    streak = 1;
                }
            }
            if(streak >= 5){
                for(let k = 0; k < streak; k++){
                    table[8 - k][j] = -1;
                }
            }
        }
        
        for(let i = 1; i < 6; i++){
            let streak = 1;
            for(let k = 1; i + k < 9; k++){
                if(this.playingField[i + k][k].color == this.playingField[i + k - 1][k - 1].color && this.playingField[i + k][k].color != "transparent"){
                    streak++
                }else{
                    if(streak >= 5){
                        for(let l = 1; l <= streak; l++){
                            table[i + k - l][k - l] = -1;
                        }
                    }
                    streak = 1;
                }
            }
            if(streak >= 5){
                for(let l = 0; l <= streak; l++){
                    table[8 - l][(8 - i) - l] = -1;
                }
            }
        }

        for(let j = 0; j < 6; j++){
            let streak = 1;
            for(let k = 1; j + k < 9; k++){
                if(this.playingField[k][j + k].color == this.playingField[k - 1][j + k - 1].color && this.playingField[k][j + k].color != "transparent"){
                    streak++
                }else{
                    if(streak >= 5){
                        for(let l = 1; l <= streak; l++){
                            table[k - l][j + k - l] = -1;
                        }
                    }
                    streak = 1;
                }
            }
            if(streak >= 5){
                for(let l = 0; l <= streak; l++){
                    table[8 - l][(8 - j) - l] = -1;
                }
            }
        }

        for(let i = 1; i < 6; i++){
            let streak = 1;
            for(let k = 1; i + k < 9; k++){
                if(this.playingField[8 - (i + k)][k].color == this.playingField[8 - (i + k - 1)][k - 1].color && this.playingField[8 - (i + k)][k].color != "transparent"){
                    streak++;
                }else{
                    if(streak >= 5){
                        for(let l = 1; l <= streak; l++){
                            table[8 - (i + k - l)][k - l] = -1;
                        }
                    }
                    streak = 1;
                }
            }
            if(streak >= 5){
                for(let l = 0; l <= streak; l++){
                    table[8 + l][(8 - i) - l] = -1;
                }
            }
        }

        for(let j = 0; j < 5; j++){
            let streak = 1;
            for(let k = 1; j + k < 9; k++){
                // this.playingField[8 - k][j + k].setColor("red");
                if(this.playingField[8 - k][j + k].color == this.playingField[8 - k + 1][j + k - 1].color && this.playingField[8 - k][j + k].color != "transparent"){
                    streak++
                    console.log(streak)
                }else{
                    if(streak >= 5){
                        for(let l = 1; l <= streak; l++){
                            table[8 - (k - l)][j + k - l] = -1;
                        }
                    }
                    streak = 1;
                }
            }
            if(streak >= 5){
                for(let l = 1; l <= streak; l++){
                    table[l][j - l] = -1;
                }
            }
        }

        for(let i = 0; i < this.height; i++){
            for(let j = 0; j < this.width; j++){
                if(table[i][j] === -1){
                    this.playingField[i][j].setColor();
                }
            }
        }
    }
}

