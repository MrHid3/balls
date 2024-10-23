"use strict";
exports.__esModule = true;
exports.Game = void 0;
var Tile_1 = require("./Tile");
var Game = /** @class */ (function () {
    function Game(cont) {
        this.width = 9;
        this.height = 9;
        this.colors = ["red", "orange", "yellow", "blue", "green", "black", ""];
        this.cont = cont;
        this.createBoard();
    }
    Game.prototype.createBoard = function () {
        for (var i = 0; i < this.height; i++) {
            var mid = document.createElement("div");
            mid.classList.add("mid");
            this.playingField[i] = [];
            for (var j = 0; j < this.width; j++) {
                var small = document.createElement("div");
                small.classList.add("small");
                mid.append(small);
                this.playingField[i][j] = new Tile_1.Tile(j, i, this.cont);
            }
            this.cont.append(mid);
        }
    };
    return Game;
}());
exports.Game = Game;
