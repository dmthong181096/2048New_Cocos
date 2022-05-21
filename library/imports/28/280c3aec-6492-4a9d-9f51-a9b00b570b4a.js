"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'welcome');
// Script/welcome.js

'use strict';

var V = require("Variables");
var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        _text: '2048',
        _isClick: false,
        mainMenu: cc.Node,
        btnPlay: cc.Node,
        btnSetting: cc.Node,
        cloud1: cc.Node,
        cloud2: cc.Node,
        logo: cc.Node

    },
    get isClick() {
        return this._isClick;
    },
    set isClick(value) {
        return this._isClick = value;
    },

    onLoad: function onLoad() {
        var _this = this;

        this.isClick = false;
        this.label.string = this._text;
        this.label.fontSize = 200;
        this.mainMenu.active = false;
        cc.tween(this.label.node).to(2, { opacity: 0 }).call(function () {
            _this._initMainScreen();
        }).call(function () {
            V.audio.playMusicBackground(true);
        }).start();
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent("transAudio", this.transAudio, this);
    },
    transAudio: function transAudio(data) {
        V.audio = data;
    },
    _initMainScreen: function _initMainScreen() {
        this.mainMenu.active = true;
        this.btnPlay.runAction(this._animationBtn());
        this.btnSetting.runAction(this._animationBtn());
        this.cloud1.runAction(this._animationCloud());
        this.cloud2.runAction(this._animationCloud());
        this.logo.runAction(this._animLogo());
    },
    _animationBtn: function _animationBtn() {
        return this.anim = cc.repeatForever(cc.sequence(cc.scaleBy(1, 0.9, 1.1), cc.scaleTo(1, 1, 1))).easing(cc.easeBackInOut(.5));
    },
    _animationCloud: function _animationCloud() {
        return this.anim2 = cc.repeatForever(cc.sequence(cc.moveBy(1, cc.v2(-15, 0)), cc.moveBy(1, cc.v2(15, 0)))).easing(cc.easeBackInOut(.5));
    },
    _animLogo: function _animLogo() {
        return this.anim3 = cc.rotateTo(5, 0).easing(cc.easeBackInOut(.5));
    },
    onClickBtnPlay: function onClickBtnPlay() {
        if (this.isClick == false) {
            console.log(V.isNoneSound);
            V.audio.playSoundClick();
            Emitter.instance.emit("transAudioSceneWelcomeToMain", V.audio.isNoneSound);
            cc.director.loadScene("Main");
            this.isClick = true;
        }
        return;
    }

    // update: function (dt) {
    // },

});

cc._RF.pop();