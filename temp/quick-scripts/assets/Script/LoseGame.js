(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/LoseGame.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '23a29CTqBlC1bFaQF0Hwhuw', 'LoseGame', __filename);
// Script/LoseGame.js

"use strict";

var Emitter = require('mEmitter');
var V = require("Variables");

cc.Class({
    extends: cc.Component,

    properties: {
        playAgainBtn: cc.Node,
        labelScore: cc.Label,
        boardGame: cc.Node,
        Ala: cc.Node
    },

    onLoad: function onLoad() {
        Emitter.instance.registerEvent("showPopupLoseGame", this._animOpenPopup.bind(this));
        this.node.y = 1000;
        this.node.active = false;
    },
    _animOpenPopup: function _animOpenPopup(score) {
        var _this = this;

        this.node.active = true;
        V.game.enabled = false;
        V.audio.playSoundLose();
        this._animAla();
        cc.tween(this.boardGame).to(.5, { opacity: 50 }).start();

        cc.tween(this.node).to(1, { position: cc.v2(0, 0) }, { easing: 'backInOut' }).call(function () {
            _this._animOpenBtnPlayAgain();
            _this.labelScore.string = 0;
            _this._animScore(score);
        }).start();
    },
    _animationBtn: function _animationBtn() {},
    _animHidePopup: function _animHidePopup() {
        cc.tween(this.boardGame).to(.5, { opacity: 255 }).start();

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
        }).start();
    },
    _animAla: function _animAla() {
        var actionScale1 = cc.scaleTo(2, 1.2, 1.2);
        var actionScale2 = cc.scaleTo(2, 1, 1);
        var Action = cc.repeatForever(cc.sequence(actionScale1, actionScale2));
        this.Ala.runAction(Action);
    },
    start: function start() {},
    onClickPlayAgainBtn: function onClickPlayAgainBtn() {
        this._animHidePopup();
        this.boardGame.opacity = 255;
        V.audio.pauseSoundLose();
        V.game.enabled = true;
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
        //# sourceMappingURL=LoseGame.js.map
        