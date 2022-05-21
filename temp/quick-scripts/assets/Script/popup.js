(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/popup.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fe97b87LJ9Mkrk6rTulrKMn', 'popup', __filename);
// Script/popup.js

"use strict";

var Emitter = require('mEmitter');
var V = require("Variables");

cc.Class({
    extends: cc.Component,

    properties: {
        playAgainBtn: cc.Node,
        labelScore: cc.Label,
        particle: cc.Node,
        boardGame: cc.Node

    },

    onLoad: function onLoad() {
        Emitter.instance.registerEvent("showPopupWinGame", this._animOpenPopup.bind(this));
        this.node.y = 1100;
        this.node.active = false;
    },
    _animOpenPopup: function _animOpenPopup(scoreGame) {
        var _this = this;

        V.game.enabled = false;
        V.audio.playSoundWin();
        this.node.active = true;
        this.particle.active = false;
        cc.tween(this.boardGame).to(0.5, { opacity: 50 }).start();

        cc.tween(this.node).to(1, { position: cc.v2(0, 0) }, { easing: 'backInOut' }).call(function () {
            _this._animOpenBtnPlayAgain();
            _this.labelScore.string = 0;
            _this._animScore(scoreGame);
        }).start();
    },
    _animationBtn: function _animationBtn() {},
    _animHidePopup: function _animHidePopup() {
        cc.tween(this.boardGame).to(0.5, { opacity: 255 }).start();

        cc.tween(this.node).to(1, { position: cc.v2(0, 1000) }).start();
    },
    _animOpenBtnPlayAgain: function _animOpenBtnPlayAgain() {
        var action = cc.repeatForever(cc.sequence(cc.scaleBy(1, 0.9, 1.1), cc.scaleTo(1, 1, 1))).easing(cc.easeBackInOut(.5));
        this.playAgainBtn.runAction(action).easing(cc.easeBackInOut(.5));
    },
    _animScore: function _animScore(scoreGame) {
        var _this2 = this;

        var score = { value: 0 };
        cc.tween(score).to(2, { value: scoreGame }, {
            progress: function progress(s, e, c, t) {
                var num = Math.round(e * t);
                _this2.labelScore.string = String(num);
            }
        }).call(function () {
            _this2.particle.active = true;
        }).start();
    },
    start: function start() {},
    onClickPlayAgainBtn: function onClickPlayAgainBtn() {
        V.game.enabled = true;
        this.node.active = false;
        this._animHidePopup();
        this.particle.active = false;
        this.boardGame.opacity = 255;
        V.audio.pauseSoundWin();
    }

    // update (dt) {},

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=popup.js.map
        