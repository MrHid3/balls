export interface IGame{
    readonly width: number;
    readonly height: number;
    colors: string[];
    cont: HTMLElement;

    createBoard() : void;
}