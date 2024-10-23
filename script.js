let table = [];
for (let i = 0; i < 10; i++) {
    table[i] = [];
    for (let j = 0; j < 10; j++) {
        table[i][j] = 0;
    }
}
class Kulka {
    constructor(color) {
        this.color = color;
        this.x = 3 //Math.floor(Math.random() * 10);
        this.y = 3 //Math.floor(Math.random() * 10);
        this.cont = document.getElementById("BIG");
    }
    draw() {
        table[this.y][this.x] = -1;
        console.log(this.cont);
        let skib = document.createElement("div");
        skib.style.backgroundColor = this.color;
        skib.style.borderRadius = 200;
        skib.style.height = 40;
        skib.style.width = 40;
        skib.style.margin = 10;
        this.cont.children[this.y].children[this.x].appendChild(skib);
    }
}
let tak = new Kulka("red");
tak.draw();

console.log(table)