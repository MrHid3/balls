import {Tile} from "../Tile";

export interface ITile{
    x: number;
    y: number;
    cont: HTMLElement;
    field: HTMLElement;
    color: string;
    pathColor: string;
    isClicked: boolean;

    isEmpty() : boolean;
    setColor(color: string) : void;
    setPathColor(color: string) : void;
    click() : void
    move(tile: Tile) : void
}