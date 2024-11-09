export interface IGame{
    readonly width: number;
    readonly height: number;
    colors: string[];
    cont: HTMLElement;

    createBoard(color: string) : void;
    pathFinder(x1: number, y1: number, x2: number, y2: number) : number[][] | boolean;
    pushBalls(color1? :string,color2? :string,color3? :string) : void;
    readInput() : void;
}