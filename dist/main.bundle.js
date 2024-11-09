/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Game: () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tile */ \"./src/Tile.ts\");\n\nclass Game {\n    width = 9;\n    height = 9;\n    cont;\n    colors = [\"red\", \"orange\", \"yellow\", \"blue\", \"green\", \"black\", \"magenta\"];\n    playingField = [];\n    nextColor1;\n    nextColor2;\n    nextColor3;\n    clicked = {\n        x1: -1,\n        y1: -1,\n        x2: -1,\n        y2: -1,\n        length: 0,\n    };\n    constructor(contId) {\n        this.cont = document.getElementById(contId);\n        this.createBoard();\n        this.newNextColors();\n        this.pushBalls(this.colors[1], this.colors[2], this.colors[3]);\n        this.readInput();\n    }\n    createBoard() {\n        for (let i = 0; i < this.height; i++) {\n            let mid = document.createElement(\"div\");\n            mid.classList.add(\"mid\");\n            this.playingField[i] = [];\n            for (let j = 0; j < this.width; j++) {\n                let small = document.createElement(\"div\");\n                small.classList.add(\"small\");\n                mid.append(small);\n            }\n            this.cont.append(mid);\n            for (let j = 0; j < this.width; j++) {\n                this.playingField[i][j] = new _Tile__WEBPACK_IMPORTED_MODULE_0__.Tile(j, i, this.cont);\n            }\n        }\n    }\n    createBall(color = \"black\") {\n        let counter = 1;\n        let x = Math.floor(Math.random() * this.width);\n        let y = Math.floor(Math.random() * this.height);\n        while (this.playingField[y][x].color != \"transparent\" || counter > 81) {\n            x = Math.floor(Math.random() * this.width);\n            y = Math.floor(Math.random() * this.height);\n            counter++;\n        }\n        this.playingField[y][x].setColor(color);\n    }\n    pathFinder(x1, y1, x2, y2) {\n        let table = [];\n        for (let i = 0; i < this.height; i++) {\n            table[i] = [];\n            for (let j = 0; j < this.width; j++) {\n                if (this.playingField[i][j].color == \"transparent\") {\n                    table[i][j] = null;\n                }\n                else {\n                    table[i][j] = -3;\n                }\n            }\n        }\n        table[y1][x1] = -1;\n        table[y2][x2] = -2;\n        let current = -1;\n        let didIt = true;\n        while (didIt) {\n            didIt = false;\n            for (let i = 0; i < this.height; i++) {\n                for (let j = 0; j < this.width; j++) {\n                    console.table(table);\n                    console.log(current);\n                    console.log(didIt);\n                    if (table[i][j] === current) {\n                        if (j !== 0 && table[i][j - 1] === null) {\n                            table[i][j - 1] = current + 1;\n                            didIt = true;\n                        }\n                        if (j !== 8 && table[i][j + 1] === null) {\n                            table[i][j + 1] = current + 1;\n                            didIt = true;\n                        }\n                        if (i !== 0 && table[i - 1][j] === null) {\n                            table[i - 1][j] = current + 1;\n                            didIt = true;\n                        }\n                        if (i !== 8 && table[i + 1][j] === null) {\n                            table[i + 1][j] = current + 1;\n                            didIt = true;\n                        }\n                        if (j !== 0 && table[i][j - 1] === -2\n                            || j !== 8 && table[i][j + 1] === -2\n                            || i !== 0 && table[i - 1][j] === -2\n                            || i !== 8 && table[i + 1][j] === -2) {\n                            let result = [];\n                            while (table[i][j] !== -1) {\n                                result.push([i, j]);\n                                if (i != 0 && table[i - 1][j] == table[i][j] - 1)\n                                    i -= 1;\n                                else if (i != 8 && table[i + 1][j] == table[i][j] - 1)\n                                    i += 1;\n                                else if (j != 0 && table[i][j - 1] == table[i][j] - 1)\n                                    j -= 1;\n                                else if (j != 8 && table[i][j + 1] == table[i][j] - 1)\n                                    j += 1;\n                            }\n                            return result;\n                        }\n                    }\n                }\n            }\n            current++;\n        }\n        return null;\n    }\n    pushBalls(color1, color2, color3) {\n        this.createBall(color1);\n        this.createBall(color2);\n        this.createBall(color3);\n    }\n    readInput() {\n        this.playingField.forEach(child => {\n            child.forEach(grandchild => {\n                grandchild.field.addEventListener(\"click\", () => {\n                    if (this.clicked.length === 0) {\n                        if (!grandchild.isEmpty()) {\n                            grandchild.click();\n                            this.clicked.x1 = grandchild.x;\n                            this.clicked.y1 = grandchild.y;\n                            this.clicked.length = 1;\n                        }\n                    }\n                    else if (this.clicked.length === 1) {\n                        if (grandchild.isEmpty()) {\n                            this.clicked.x2 = grandchild.x;\n                            this.clicked.y2 = grandchild.y;\n                            let path = this.pathFinder(this.clicked.x1, this.clicked.y1, this.clicked.x2, this.clicked.y2);\n                            console.log(path);\n                            if (path !== null) {\n                                this.playingField[this.clicked.y1][this.clicked.x1].move(this.playingField[this.clicked.y2][this.clicked.x2]);\n                                this.drawPath(path);\n                                this.clicked.length = 0;\n                                setTimeout(() => {\n                                    this.pushBalls(this.nextColor1, this.nextColor2, this.nextColor3);\n                                    this.newNextColors();\n                                }, 200 * (1 + path.length * 0.15));\n                            }\n                        }\n                    }\n                });\n            });\n        });\n    }\n    drawPath(path) {\n        path.reverse();\n        path.forEach((e, i) => {\n            this.playingField[e[0]][e[1]].setColor(\"#f5988e\");\n            setTimeout(() => {\n                this.playingField[e[0]][e[1]].setColor();\n            }, 200 * (1 + i * 0.15));\n        });\n    }\n    newNextColors() {\n        this.nextColor1 = this.colors[Math.floor(Math.random() * this.colors.length)];\n        this.nextColor2 = this.colors[Math.floor(Math.random() * this.colors.length)];\n        this.nextColor3 = this.colors[Math.floor(Math.random() * this.colors.length)];\n    }\n}\n\n\n//# sourceURL=webpack://balls/./src/Game.ts?");

/***/ }),

/***/ "./src/Tile.ts":
/*!*********************!*\
  !*** ./src/Tile.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Tile: () => (/* binding */ Tile)\n/* harmony export */ });\nclass Tile {\n    x;\n    y;\n    cont;\n    field;\n    color = \"transparent\";\n    isClicked = false;\n    constructor(x, y, cont) {\n        this.x = x;\n        this.y = y;\n        this.cont = cont;\n        this.field = this.cont.children[y].children[x];\n    }\n    isEmpty() {\n        return this.color == \"transparent\";\n    }\n    setColor(color = \"transparent\") {\n        this.field.style.backgroundColor = color;\n        this.color = color;\n    }\n    click() {\n        if (!this.isEmpty())\n            if (this.isClicked)\n                this.field.style.filter = \"brightness(1.00)\";\n            else\n                this.field.style.filter = \"brightness(0.85)\";\n        this.isClicked = !this.isClicked;\n    }\n    move(tile) {\n        if (tile.isEmpty()) {\n            tile.setColor(this.color);\n            this.field.style.filter = \"brightness(1.00)\";\n            setTimeout(() => {\n                this.setColor();\n            }, 100);\n            this.isClicked = false;\n        }\n    }\n}\n\n\n//# sourceURL=webpack://balls/./src/Tile.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.ts\");\n\nnew _Game__WEBPACK_IMPORTED_MODULE_0__.Game(\"BIG\");\n\n\n//# sourceURL=webpack://balls/./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;