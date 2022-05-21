"use strict";
cc._RF.push(module, 'eacb9rmiiNOg5I83YAHp9T6', 'board');
// Script/board.js

'use strict';

var ROWS = 4;
var NUMBERS = [2, 4];
var V = require("Variables");
var Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
        blockPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        Emitter.instance.emit('transBlocksLayout', this);
        Emitter.instance.registerEvent("transAudioSceneWelcomeToMain", this.transAudioSceneWelcomeToMain, this);
    },
    transAudioSceneWelcomeToMain: function transAudioSceneWelcomeToMain(data) {},
    start: function start() {
        this.createBlocksLayout();
        this.gameInit();
    },
    countScore: function countScore() {
        if (V.scoreExtra == 0) {
            return;
        }
        V.scoreGame += V.scoreExtra;
        var userData = new Object();
        userData.score = V.scoreGame;
        userData.moveStep = 10;
        var bestScore = V.bestScore.loadBestScore();
        if (userData.score > bestScore.score) {
            V.bestScore.saveBestScore(userData);
            V.bestScore.loadBestScore();
        }
        V.score.updateExtraScore(V.scoreExtra);
        V.score.updateScore(V.scoreGame);
        V.scoreExtra = 0;
    },
    createdBlock: function createdBlock(width, height, x, y, label) {
        var block = cc.instantiate(this.blockPrefab);
        block.width = width;
        block.height = height;
        block.parent = this.node;
        block.setPosition(cc.v2(x, y));
        block.getComponent('block').setLabel(label);
        block.getComponent('block').appear();
        return block;
    },
    createBlocksLayout: function createBlocksLayout() {
        var y = 250;
        var distance = 20;
        var size = 150;
        for (var row = 0; row < 4; row++) {
            V.positions.push([0, 0, 0, 0]);
            var x = -250;
            for (var col = 0; col < V.cols; col++) {
                this.createdBlock(size, size, x, y, 0);
                V.positions[row][col] = cc.v2(x, y);
                x += distance + size;
            }
            y -= distance + size;
        }
    },
    getEmptyLocations: function getEmptyLocations() {
        var emptyLocations = [];
        for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++) {
                if (V.blocks[row][col] == null) {
                    emptyLocations.push({
                        x: row,
                        y: col
                    });
                }
            }
        }
        return emptyLocations;
    },
    createArray2D: function createArray2D(row, col, value) {
        var arr = new Array();
        for (var i = 0; i < row; i++) {
            arr[i] = new Array();
            for (var j = 0; j < col; j++) {
                arr[i][j] = value;
            }
        }
        return arr;
    },
    gameInit: function gameInit() {
        V.scoreExtra = 0;
        V.scoreGame = 0;
        V.isCompleted = true;
        V.score.updateScore(V.scoreGame);
        V.blocks = this.createArray2D(4, 4, null);
        V.data = this.createArray2D(4, 4, 0);
        this.randomBlock();
        this.randomBlock();
    },
    randomBlock: function randomBlock() {
        var emptyLocations = this.getEmptyLocations();
        if (emptyLocations.length > 0) {
            var locationRandom = emptyLocations[Math.floor(Math.random() * emptyLocations.length)];
            var x = locationRandom.x;
            var y = locationRandom.y;
            var size = 150;
            var numberRandom = V.numbers[Math.floor(Math.random() * V.numbers.length)];
            var block = this.createdBlock(size, size, V.positions[x][y].x, V.positions[x][y].y, numberRandom);
            V.blocks[x][y] = block;
            V.data[x][y] = numberRandom;
            block.getComponent('block').appear();
            emptyLocations = this.getEmptyLocations();
            if (emptyLocations.length == 0) {
                if (this.checkLose()) {
                    Emitter.instance.emit("showPopupLoseGame", V.scoreGame);
                    Emitter.instance.emit('onDisableKeyDownLoseGame');
                }
            }
        }
    },
    afterMove: function afterMove() {
        var _this = this;

        if (V.isMoved == false) {
            V.isCompleted = true;
            return;
        }
        var actions = [cc.callFunc(function () {
            _this.countScore();
        }), cc.callFunc(function () {
            _this.randomBlock();
        }), cc.callFunc(function () {
            if (_this.checkWin()) {
                Emitter.instance.emit("showPopupWinGame", V.scoreGame);
                Emitter.instance.emit("onDisabledKeyDown");
            }
        }), cc.callFunc(function () {
            V.isCompleted = true;
        })];
        this.node.runAction(cc.sequence(actions));
    },
    moveNode: function moveNode(block, position, callback) {
        var actions = [cc.moveTo(0.05, position), cc.callFunc(function () {
            V.isMoved = true;
        }), cc.callFunc(function () {
            callback();
        })];
        block.runAction(cc.sequence(actions));
    },
    mergeNode: function mergeNode(block, blockTarget, label, callback) {
        block.destroy();
        var actions = [cc.callFunc(function () {
            blockTarget.getComponent('block').setLabel(label);
        }), cc.callFunc(function () {
            blockTarget.getComponent('block').merge();
        }), cc.callFunc(function () {
            V.isMoved = true;
        }), cc.callFunc(function () {
            callback();
        })];
        blockTarget.runAction(cc.sequence(actions));
    },
    moveLeft: function moveLeft(row, col, callback) {
        var _this2 = this;

        if (col == 0 || V.data[row][col] == 0) {
            callback();
            return;
        } else if (V.data[row][col - 1] == 0) {
            var block = V.blocks[row][col];
            var position = V.positions[row][col - 1];
            V.blocks[row][col - 1] = block;
            V.data[row][col - 1] = V.data[row][col];
            V.data[row][col] = 0;
            V.blocks[row][col] = null;
            this.moveNode(block, position, function () {
                V.isMoved = true;
                _this2.moveLeft(row, col - 1, callback);
            });
        } else if (V.data[row][col - 1] == V.data[row][col]) {
            var _block = V.blocks[row][col];
            var _position = V.positions[row][col - 1];
            V.data[row][col - 1] *= 2;
            V.scoreExtra += V.data[row][col - 1];
            V.data[row][col] = 0;
            V.blocks[row][col] = null;

            this.moveNode(_block, _position, function () {

                _this2.mergeNode(_block, V.blocks[row][col - 1], V.data[row][col - 1], function () {
                    V.isMoved = true;
                    callback();
                });
            });
        } else {

            callback();
            return;
        }
    },
    moveRight: function moveRight(row, col, callback) {
        var _this3 = this;

        if (col == V.rows - 1 || V.data[row][col] == 0) {

            callback();
            return;
        } else if (V.data[row][col + 1] == 0) {
            var block = V.blocks[row][col];
            var position = V.positions[row][col + 1];
            V.blocks[row][col + 1] = block;
            V.data[row][col + 1] = V.data[row][col];
            V.data[row][col] = 0;
            V.blocks[row][col] = null;
            this.moveNode(block, position, function () {
                V.isMoved = true;
                _this3.moveRight(row, col + 1, callback);
            });
        } else if (V.data[row][col + 1] == V.data[row][col]) {
            var _block2 = V.blocks[row][col];
            var _position2 = V.positions[row][col + 1];
            V.data[row][col + 1] *= 2;
            V.scoreExtra += V.data[row][col + 1];
            V.data[row][col] = 0;
            V.blocks[row][col] = null;
            this.moveNode(_block2, _position2, function () {
                _this3.mergeNode(_block2, V.blocks[row][col + 1], V.data[row][col + 1], function () {
                    V.isMoved = true;
                    callback();
                });
            });
        } else {

            callback();
            return;
        }
    },
    inputRight: function inputRight() {
        var _this4 = this;

        var getNodeToMove = [];
        for (var row = 0; row < V.rows; row++) {
            for (var col = V.rows - 1; col >= 0; col--) {
                if (V.data[row][col] != 0) {
                    getNodeToMove.push({ x: row, y: col });
                }
            }
        }
        var counter = 0;
        for (var i = 0; i < getNodeToMove.length; ++i) {
            this.moveRight(getNodeToMove[i].x, getNodeToMove[i].y, function () {
                counter++;
                _this4.checkCounter(counter, getNodeToMove);
            });
        }
    },
    inputLeft: function inputLeft() {
        var _this5 = this;

        var getNodeToMove = [];
        for (var row = 0; row < V.rows; ++row) {
            for (var col = 0; col < V.rows; ++col) {
                if (V.data[row][col] != 0) {
                    getNodeToMove.push({ x: row, y: col });
                }
            }
        }

        var counter = 0;
        for (var i = 0; i < getNodeToMove.length; ++i) {
            this.moveLeft(getNodeToMove[i].x, getNodeToMove[i].y, function () {
                counter++;

                _this5.checkCounter(counter, getNodeToMove);
            });
        }
    },
    moveUp: function moveUp(row, col, callback) {
        var _this6 = this;

        if (row == 0 || V.data[row][col] == 0) {
            callback();
            return;
        } else if (V.data[row - 1][col] == 0) {
            var block = V.blocks[row][col];
            var position = V.positions[row - 1][col];
            V.blocks[row - 1][col] = block;
            V.data[row - 1][col] = V.data[row][col];
            V.data[row][col] = 0;
            V.blocks[row][col] = null;

            this.moveNode(block, position, function () {
                V.isMoved = true;
                _this6.moveUp(row - 1, col, callback);
            });
        } else if (V.data[row - 1][col] == V.data[row][col]) {
            var _block3 = V.blocks[row][col];
            var _position3 = V.positions[row - 1][col];
            V.data[row - 1][col] *= 2;
            V.scoreExtra += V.data[row - 1][col];
            V.data[row][col] = 0;
            V.blocks[row][col] = null;

            this.moveNode(_block3, _position3, function () {
                _this6.mergeNode(_block3, V.blocks[row - 1][col], V.data[row - 1][col], function () {
                    V.isMoved = true;
                    callback();
                });
            });
        } else {
            callback();
            return;
        }
    },
    inputUp: function inputUp() {
        var _this7 = this;

        var getNodeToMove = [];
        for (var row = 0; row < V.rows; row++) {
            for (var col = 0; col < V.rows; col++) {
                if (V.data[row][col] != 0) {
                    getNodeToMove.push({ x: row, y: col });
                }
            }
        }
        var counter = 0;
        for (var i = 0; i < getNodeToMove.length; ++i) {
            this.moveUp(getNodeToMove[i].x, getNodeToMove[i].y, function () {
                counter++;
                _this7.checkCounter(counter, getNodeToMove);
            });
        }
    },
    moveDown: function moveDown(row, col, callback) {
        var _this8 = this;

        if (row == V.rows - 1 || V.data[row][col] == 0) {
            callback();
            return;
        } else if (V.data[row + 1][col] == 0) {
            var block = V.blocks[row][col];
            var position = V.positions[row + 1][col];
            V.blocks[row + 1][col] = block;
            V.data[row + 1][col] = V.data[row][col];
            V.data[row][col] = 0;
            V.blocks[row][col] = null;
            this.moveNode(block, position, function () {
                V.isMoved = true;
                _this8.moveDown(row + 1, col, callback);
            });
        } else if (V.data[row + 1][col] == V.data[row][col]) {
            var _block4 = V.blocks[row][col];
            var _position4 = V.positions[row + 1][col];
            V.data[row + 1][col] *= 2;
            V.scoreExtra += V.data[row + 1][col];
            V.data[row][col] = 0;
            V.blocks[row][col] = null;
            this.moveNode(_block4, _position4, function () {
                _this8.mergeNode(_block4, V.blocks[row + 1][col], V.data[row + 1][col], function () {
                    V.isMoved = true;
                    callback();
                });
            });
        } else {
            callback();
            return;
        }
    },
    inputDown: function inputDown() {
        var _this9 = this;

        var getNodeToMove = [];
        for (var row = V.rows - 1; row >= 0; row--) {
            for (var col = 0; col < V.rows; col++) {
                if (V.data[row][col] != 0) {
                    getNodeToMove.push({ x: row, y: col });
                }
            }
        }
        var counter = 0;
        for (var i = 0; i < getNodeToMove.length; i++) {
            this.moveDown(getNodeToMove[i].x, getNodeToMove[i].y, function () {
                counter++;
                _this9.checkCounter(counter, getNodeToMove);
            });
        }
    },
    checkCounter: function checkCounter(counter, getNodeToMove) {
        if (counter == getNodeToMove.length) {
            this.afterMove();
        }
    },
    newGame: function newGame() {
        for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++) {
                if (V.blocks[row][col] != null) {
                    V.blocks[row][col].destroy();
                }
            }
        }
        this.gameInit();
        Emitter.instance.emit('onEnableKeyDown');
        V.audio1.playSoundClick();
    },
    checkWin: function checkWin() {
        for (var row = 0; row < V.rows; row++) {
            for (var col = 0; col < V.rows; col++) {
                if (V.data[row][col] == 2048) {
                    return true;
                }
            }
        }
        return false;
    },
    checkLose: function checkLose() {
        for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++) {
                if (row == 3 && col < 3) {
                    if (V.data[row][col] == V.data[row][col + 1]) {
                        return false;
                    }
                } else if (col == 3) {
                    if (row < 3) {
                        if (V.data[row][col] == V.data[row + 1][col]) {
                            return false;
                        }
                    }
                } else if (V.data[row][col] == V.data[row + 1][col] || V.data[row][col] == V.data[row][col + 1]) {
                    return false;
                }
            }
        }
        return true;
    }
});

cc._RF.pop();