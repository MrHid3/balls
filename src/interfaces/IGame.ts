import {Tile} from "../Tile";

export interface IGame{
    readonly width: number;
    readonly height: number;
    readonly clickedPathColor: string;
    readonly hoveredPathColor: string;
    moves: number;
    canmove: boolean;
    enabled: boolean;
    cont: HTMLElement;
    colors: string[];
    playingField: Tile[][];
    nextColors: string[];
    path: Tile[];
    clicked : {
        one : Tile;
        two: Tile;
        length: number;
    }

    createBoard(color: string) : void;
    createBall(color: string) : void;
    pathFinder(tile1: Tile, tile2: Tile) : Tile[] | null;
    pushBalls(colors: string[]) : void;
    readInput() : void;
    readHover() : void;
    drawPath(path: Tile[] | null, color: string) : void;
    fastDrawPath(path: Tile[] | null, color: string) : void;
    newNextColors() : void;
    seekAndDestroy() : number;
    avengers() : void;
}