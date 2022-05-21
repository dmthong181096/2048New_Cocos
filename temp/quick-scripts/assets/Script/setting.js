(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/setting.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3e370K5sXlBeps6fYQ66z/F', 'setting', __filename);
// Script/setting.js

"use strict";

var V = require("Variables");
var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        mainMenu: cc.Node,
        noneSound: cc.Node,
        noneMusic: cc.Node,
        playBtn: cc.Node,
        _isNoneSound: false,
        _isNoneMusic: false,
        _isClick: false
    },
    get isClick() {
        return this._isClick;
    },
    set isClick(value) {
        return this._isClick = value;
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.isClick = false;
        this.node.y = 1000;
        this.node.active = false;
        this.noneSound.active = this._isNoneSound;
        this.noneMusic.active = this._isNoneMusic;
    },
    start: function start() {},
    onClickBtn: function onClickBtn() {
        console.log(this.isClick);
        if (this.isClick) {
            console.log("destroy");
            return;
        } else {
            this.isClick = false;
            console.log("open");
            this.openPopup();
        }
    },
    onClickBtnClose: function onClickBtnClose() {
        if (this.isClick == true) {
            V.audio.playSoundClick();
            this.hidePopup();
            this.isClick = false;
        }
    },
    openPopup: function openPopup() {
        if (this.isClick) {
            return;
        } else {
            V.audio.playSoundClick();
            this.isClick = true;
            this.node.active = true;
            this.playBtn.active = false;
            cc.tween(this.mainMenu).to(0.5, { opacity: 20 }).start();

            cc.tween(this.node).to(1, { position: cc.v2(0, 0) }, { easing: 'backInOut' }).start();
        }
    },
    hidePopup: function hidePopup() {
        this.playBtn.active = true;
        cc.tween(this.mainMenu).to(0.5, { opacity: 255 }).start();

        cc.tween(this.node).to(1, { position: cc.v2(0, 1000) }).start();
    },
    onClickSound: function onClickSound() {
        this.isNoneSound = !this.isNoneSound;
        if (this.isNoneSound) {
            V.audio.pauseSoundClick();
            V.audio.isNoneSound = true;
            V.isNoneSound = V.audio.isNoneSound;
        } else {
            V.audio.isNoneSound = false;
            V.isNoneSound = V.audio.isNoneSound;
            V.audio.playSoundClick();
        }
        this.noneSound.active = this.isNoneSound;
    },
    onClickMusic: function onClickMusic() {
        this.isNoneMusic = !this.isNoneMusic;
        if (this.isNoneMusic) {
            V.audio.pauseAll();
            V.audio.isNoneMusic = true;
            V.isNoneMusic = V.audio.isNoneMusic;
        } else {

            V.audio.isNoneMusic = false;
            V.isNoneMusic = V.audio.isNoneMusic;
            V.audio.playMusicBackground();
        }
        this.noneMusic.active = this.isNoneMusic;
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
        //# sourceMappingURL=setting.js.map
        