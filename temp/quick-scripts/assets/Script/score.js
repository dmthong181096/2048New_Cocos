(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/score.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '43036c9A1VAnK4eP1MQguIb', 'score', __filename);
// Script/score.js

'use strict';

var V = require("Variables");
var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        scoreNumber: cc.Label,
        scoreExtra: cc.Label,
        score: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {
        Emitter.instance.emit('transScore', this);
        this.scoreExtra.node.active = false;
    },
    updateExtraScore: function updateExtraScore(number) {
        var _this = this;

        var duration = 0.5;
        if (number == 0) {
            return;
        }
        this.scoreExtra.node.active = true;
        this.scoreExtra.string = "+ " + number;
        var actions = [cc.moveTo(0, 0, 0), cc.moveTo(duration, 0, 20), cc.moveTo(0, 0, -20), cc.callFunc(function () {
            _this.scoreExtra.node.active = false;
        }), this.scoreExtra.node.stopAllActions()];
        this.scoreExtra.node.runAction(cc.sequence(actions));
    },
    updateScore: function updateScore(number) {
        this.scoreNumber.string = number;
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
        //# sourceMappingURL=score.js.map
        