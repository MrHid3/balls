import {ITile} from "./interfaces/ITile"
import {IColor} from "./interfaces/IColor";

export class Tile implements ITile{
    x: number;
    y: number;
    cont: HTMLElement;
    field: HTMLElement;
    color: IColor = {
        color : "transparent"
    }
    pathColor: string = "transparent";
    isClicked : boolean = false;

    constructor(x: number, y: number, cont: HTMLElement){
        this.x = x;
        this.y = y;
        this.cont = cont;
        this.field = this.cont.children[y].children[x] as HTMLElement;
    }

    isEmpty(): boolean{
        return this.color.color == "transparent";
    }

    setColor(color: string = "transparent") : void{
        this.field.style.backgroundColor = "transparent";
        this.field.style.backgroundImage = `radial-gradient(circle, ${color} 65%, white 70%, white 100%)`;
        this.color.color = color;
        // this.pathColor = "transparent";
    }

    setPathColor(color: string = "transparent") : void{
        this.field.style.backgroundImage = "none";
        this.field.style.backgroundColor = color;
        this.pathColor = color;
    }

    click() : void{
        if(!this.isEmpty())
            if(this.isClicked)
                this.field.style.filter = "brightness(1.00)";
            else
                this.field.style.filter = "brightness(0.85)";
            this.isClicked = !this.isClicked;
    }

    move(tile: Tile) : void {
        if(tile.isEmpty()){
            tile.setColor(this.color.color);
            this.field.style.filter = "brightness(1.00)";
            setTimeout(() => {
                this.setColor();
            }, 100)
            this.isClicked = false;
        }
    }
}