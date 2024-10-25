export interface IGame{
    readonly width: number;
    readonly height: number;
    colors: string[];
    cont: HTMLElement;

    createBoard() : void;
    pathFinder(x1: number, y1: number, x2: number, y2: number) : number | boolean;
}