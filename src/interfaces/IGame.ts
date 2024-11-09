export interface IGame{
    readonly width: number;
    readonly height: number;
    colors: string[];
    cont: HTMLElement;

    createBoard(color: string) : void;
    createBall(color: string) : void;
    pathFinder(x1: number, y1: number, x2: number, y2: number) : number[][] | null;
    pushBalls(color1? :string,color2? :string,color3? :string) : void;
    readInput() : void;
    drawPath(path: number[][] | null) : void;
    newNextColors() : void;
}