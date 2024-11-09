export interface ITile{
    x: number;
    y: number;
    field: HTMLElement;

    isEmpty() : boolean;
    setColor(color: string) : void;
    click() : void;
}