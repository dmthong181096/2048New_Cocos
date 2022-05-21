"use strict";
cc._RF.push(module, 'ac303s7qJNGgbZQ6UpUYXr7', 'bestScore');
// Script/bestScore.js

'use strict';

var Emitter = require('mEmitter');
var V = require('Variables');
cc.Class({
    extends: cc.Component,

    properties: {
        bestScoreNumber: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        Emitter.instance.emit('transBestScore', this);
    },
    updateBestScore: function updateBestScore(number) {
        this.bestScoreNumber.string = number;
    },
    saveBestScore: function saveBestScore(userData) {
        cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
    },
    loadBestScore: function loadBestScore() {
        var userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
        if (userData == null) {
            this.saveBestScore(V.userData);
            return;
        }
        this.updateBestScore(userData.score);
        return userData;
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();