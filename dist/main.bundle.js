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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Game: () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tile */ \"./src/Tile.ts\");\n\nclass Game {\n    width = 9;\n    height = 9;\n    clickedPathColor = \"#f56262\";\n    hoveredPathColor = \"#62c9f5\";\n    cont;\n    colors = [\"red\", \"orange\", \"yellow\", \"blue\", \"green\", \"black\", \"magenta\"];\n    playingField = [];\n    nextColors = [];\n    path = [];\n    clicked;\n    constructor(contId) {\n        this.cont = document.getElementById(contId);\n        this.createBoard();\n        this.clicked = {\n            one: new _Tile__WEBPACK_IMPORTED_MODULE_0__.Tile(0, 0, this.cont),\n            two: new _Tile__WEBPACK_IMPORTED_MODULE_0__.Tile(0, 0, this.cont),\n            length: 0,\n        };\n        this.newNextColors();\n        this.pushBalls(this.nextColors);\n        this.readInput();\n        this.readHover();\n    }\n    createBoard() {\n        for (let i = 0; i < this.height; i++) {\n            let mid = document.createElement(\"div\");\n            mid.classList.add(\"mid\");\n            this.playingField[i] = [];\n            for (let j = 0; j < this.width; j++) {\n                let small = document.createElement(\"div\");\n                small.classList.add(\"small\");\n                mid.append(small);\n            }\n            this.cont.append(mid);\n            for (let j = 0; j < this.width; j++) {\n                this.playingField[i][j] = new _Tile__WEBPACK_IMPORTED_MODULE_0__.Tile(j, i, this.cont);\n            }\n        }\n    }\n    createBall(color = \"black\") {\n        let x = Math.floor(Math.random() * this.width);\n        let y = Math.floor(Math.random() * this.height);\n        while (this.playingField[y][x].color != \"transparent\") {\n            x = Math.floor(Math.random() * this.width);\n            y = Math.floor(Math.random() * this.height);\n        }\n        this.playingField[y][x].setColor(color);\n    }\n    pathFinder(tile1, tile2) {\n        let table = [];\n        for (let i = 0; i < this.height; i++) {\n            table[i] = [];\n            for (let j = 0; j < this.width; j++) {\n                if (this.playingField[i][j].color == \"transparent\") {\n                    table[i][j] = null;\n                }\n                else {\n                    table[i][j] = -3;\n                }\n            }\n        }\n        table[tile1.y][tile1.x] = -1;\n        table[tile2.y][tile2.x] = -2;\n        let current = -1;\n        let didIt = true;\n        while (didIt) {\n            didIt = false;\n            for (let i = 0; i < this.height; i++) {\n                for (let j = 0; j < this.width; j++) {\n                    if (table[i][j] === current) {\n                        if (j !== 0 && table[i][j - 1] === null) {\n                            table[i][j - 1] = current + 1;\n                            didIt = true;\n                        }\n                        if (j !== 8 && table[i][j + 1] === null) {\n                            table[i][j + 1] = current + 1;\n                            didIt = true;\n                        }\n                        if (i !== 0 && table[i - 1][j] === null) {\n                            table[i - 1][j] = current + 1;\n                            didIt = true;\n                        }\n                        if (i !== 8 && table[i + 1][j] === null) {\n                            table[i + 1][j] = current + 1;\n                            didIt = true;\n                        }\n                        if (j !== 0 && table[i][j - 1] === -2\n                            || j !== 8 && table[i][j + 1] === -2\n                            || i !== 0 && table[i - 1][j] === -2\n                            || i !== 8 && table[i + 1][j] === -2) {\n                            let result = [];\n                            if (j !== 0 && table[i][j - 1] === -2)\n                                result.push(this.playingField[i][j - 1]);\n                            if (j !== 8 && table[i][j + 1] === -2)\n                                result.push(this.playingField[i][j + 1]);\n                            if (i !== 0 && table[i - 1][j] === -2)\n                                result.push(this.playingField[i - 1][j]);\n                            if (i !== 8 && table[i + 1][j] === -2)\n                                result.push(this.playingField[i + 1][j]);\n                            while (table[i][j] !== -1) {\n                                result.push(this.playingField[i][j]);\n                                if (i != 0 && table[i - 1][j] == table[i][j] - 1)\n                                    i -= 1;\n                                else if (i != 8 && table[i + 1][j] == table[i][j] - 1)\n                                    i += 1;\n                                else if (j != 0 && table[i][j - 1] == table[i][j] - 1)\n                                    j -= 1;\n                                else if (j != 8 && table[i][j + 1] == table[i][j] - 1)\n                                    j += 1;\n                            }\n                            console.table(table);\n                            return result;\n                        }\n                    }\n                }\n            }\n            current++;\n        }\n        return null;\n    }\n    pushBalls(colors) {\n        colors.forEach((color) => {\n            this.createBall(color);\n        });\n    }\n    readInput() {\n        this.playingField.forEach(child => {\n            child.forEach(grandchild => {\n                grandchild.field.addEventListener(\"click\", () => {\n                    if (this.clicked.length === 0) {\n                        if (!grandchild.isEmpty()) {\n                            grandchild.click();\n                            this.clicked.one = this.playingField[grandchild.y][grandchild.x];\n                            this.clicked.length = 1;\n                        }\n                    }\n                    else if (this.clicked.length === 1) {\n                        if (grandchild.isEmpty()) {\n                            this.clicked.two = this.playingField[grandchild.y][grandchild.x];\n                            if (this.path !== null) {\n                                this.drawPath(this.path, this.clickedPathColor);\n                                this.clicked.length = 0;\n                                setTimeout(() => {\n                                    this.clicked.one.move(this.clicked.two);\n                                    this.pushBalls(this.nextColors);\n                                    this.newNextColors();\n                                    this.seekAndDestroy();\n                                }, 200 * (1 + this.path.length * 0.15));\n                            }\n                        }\n                        else if (grandchild == this.clicked.one) {\n                            this.clicked.one.click();\n                            this.clicked.length = 0;\n                        }\n                        else {\n                            this.clicked.one.click();\n                            this.clicked.one = this.playingField[grandchild.y][grandchild.x];\n                            this.clicked.one.click();\n                            if (this.path !== null) {\n                                this.fastDrawPath(this.path);\n                            }\n                        }\n                    }\n                });\n            });\n        });\n    }\n    readHover() {\n        this.playingField.forEach(child => {\n            child.forEach(grandchild => {\n                let hovered;\n                grandchild.field.addEventListener(\"mouseover\", () => {\n                    if (this.clicked.length === 1) {\n                        hovered = this.playingField[grandchild.y][grandchild.x];\n                        this.path = this.pathFinder(this.clicked.one, hovered);\n                        if (this.path !== null) {\n                            this.fastDrawPath(this.path, this.hoveredPathColor);\n                        }\n                    }\n                });\n                grandchild.field.addEventListener(\"mouseout\", () => {\n                    if (this.clicked.length === 1 || this.clicked.length === 2) {\n                        if (this.path !== null) {\n                            this.fastDrawPath(this.path);\n                        }\n                    }\n                });\n            });\n        });\n    }\n    drawPath(path, color = \"transparent\") {\n        path.reverse();\n        path.forEach((e, i) => {\n            e.setPathColor(color);\n            setTimeout(() => {\n                e.setPathColor();\n            }, 200 * (1 + i * 0.15));\n        });\n    }\n    fastDrawPath(path, color = \"transparent\") {\n        path.forEach((e) => {\n            if (e.isEmpty()) {\n                e.setPathColor(color);\n            }\n        });\n    }\n    newNextColors() {\n        for (let i = 0; i < 3; i++)\n            this.nextColors[i] = this.colors[Math.floor(Math.random() * this.colors.length)];\n    }\n    seekAndDestroy() {\n        let table = [];\n        for (let i = 0; i < this.height; i++) {\n            table[i] = [];\n            let streak = 1;\n            for (let j = 1; j < this.width; j++) {\n                if (this.playingField[i][j].color == this.playingField[i][j - 1].color) {\n                    streak++;\n                }\n                else {\n                    if (streak >= 5) {\n                        for (let k = 0; k < streak; k++) {\n                            table[i][j - k - 1] = -1;\n                        }\n                    }\n                    streak = 1;\n                }\n            }\n            if (streak >= 5) {\n                for (let k = 0; k < streak; k++) {\n                    table[i][8 - k] = -1;\n                }\n            }\n        }\n        for (let j = 0; j < this.width; j++) {\n            let streak = 1;\n            for (let i = 1; i < this.height; i++) {\n                if (this.playingField[i][j].color == this.playingField[i - 1][j].color) {\n                    streak++;\n                }\n                else {\n                    if (streak >= 5) {\n                        for (let k = 0; k < streak; k++) {\n                            table[i - k - 1][j] = -1;\n                        }\n                    }\n                    streak = 1;\n                }\n            }\n            if (streak >= 5) {\n                for (let k = 0; k < streak; k++) {\n                    table[8 - k][j] = -1;\n                }\n            }\n        }\n        for (let i = 0; i < this.height; i++) {\n            for (let j = 0; j < this.width; j++) {\n                if (table[i][j] === -1) {\n                    this.playingField[i][j].setColor();\n                }\n            }\n        }\n    }\n}\n\n\n//# sourceURL=webpack://balls/./src/Game.ts?");

/***/ }),

/***/ "./src/Tile.ts":
/*!*********************!*\
  !*** ./src/Tile.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Tile: () => (/* binding */ Tile)\n/* harmony export */ });\nclass Tile {\n    x;\n    y;\n    cont;\n    field;\n    color = \"transparent\";\n    pathColor = \"transparent\";\n    isClicked = false;\n    constructor(x, y, cont) {\n        this.x = x;\n        this.y = y;\n        this.cont = cont;\n        this.field = this.cont.children[y].children[x];\n    }\n    isEmpty() {\n        return this.color == \"transparent\";\n    }\n    setColor(color = \"transparent\") {\n        this.field.style.backgroundColor = color;\n        this.color = color;\n        // this.pathColor = \"transparent\";\n    }\n    setPathColor(color = \"transparent\") {\n        this.field.style.backgroundColor = color;\n        this.pathColor = color;\n    }\n    click() {\n        if (!this.isEmpty())\n            if (this.isClicked)\n                this.field.style.filter = \"brightness(1.00)\";\n            else\n                this.field.style.filter = \"brightness(0.85)\";\n        this.isClicked = !this.isClicked;\n    }\n    move(tile) {\n        if (tile.isEmpty()) {\n            tile.setColor(this.color);\n            this.field.style.filter = \"brightness(1.00)\";\n            setTimeout(() => {\n                this.setColor();\n            }, 100);\n            this.isClicked = false;\n        }\n    }\n}\n\n\n//# sourceURL=webpack://balls/./src/Tile.ts?");

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