import {Tile} from "../Tile";
import {IColor} from "./IColor";

export interface ITile{
    x: number;
    y: number;
    cont: HTMLElement;
    field: HTMLElement;
    color: IColor;
    pathColor: string;
    isClicked: boolean;

    isEmpty() : boolean;
    setColor(color: string) : void;
    setPathColor(color: string) : void;
    click() : void
    move(tile: Tile) : void
}