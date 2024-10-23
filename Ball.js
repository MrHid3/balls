"use strict";
exports.__esModule = true;
exports.Ball = void 0;
var Ball = /** @class */ (function () {
    function Ball(color) {
        this.color = color;
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    }
    Ball.prototype.draw = function () {
        table[this.y][this.x] = -1;
        var cont = document.getElementById("BIG");
        console.log(cont);
        // cont.children[this.y].children[this.x].style.color = this.color;
        console.log(cont.children[this.y]);
    };
    return Ball;
}());
exports.Ball = Ball;
var table = [];
for (var i = 0; i < 10; i++) {
    table[i] = [];
    for (var j = 0; j < 10; j++) {
        table[i][j] = 0;
    }
}
