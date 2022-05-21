(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/block.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '34b8fYIuhBOVbel+3QMMdfw', 'block', __filename);
// Script/block.js

'use strict';

var Emitter = require('mEmitter');
var colors = require("colors");
// const colors = require('colors')

cc.Class({
    extends: cc.Component,

    properties: {
        labelNum: {
            default: null,
            type: cc.Label
        },
        background: {
            default: null,
            type: cc.Node
        }
    },
    onLoad: function onLoad() {
        Emitter.instance.emit('transBlock', this);
    },
    setLabel: function setLabel(label) {
        if (label == 0) {
            this.labelNum.string = "";
        } else {
            this.labelNum.string = label;
        }
        this.node.color = colors[label];
        return 1;
    },
    appear: function appear() {
        var actions = [cc.scaleTo(0, 0), cc.scaleTo(0.05, 1)];
        this.node.runAction(cc.sequence(actions));
    },
    merge: function merge() {
        var actions = [cc.scaleTo(0.05, 1.3), cc.scaleTo(0.05, 1)];
        this.node.runAction(cc.sequence(actions));
    }
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
        //# sourceMappingURL=block.js.map
        