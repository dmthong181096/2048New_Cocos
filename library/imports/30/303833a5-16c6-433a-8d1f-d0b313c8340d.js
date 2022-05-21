"use strict";
cc._RF.push(module, '30383OlFsZDOo0f0LMTyDQN', 'audio');
// Script/audio.js

'use strict';

var Emitter = require('mEmitter');
var Variables = require('Variables');

cc.Class({
    extends: cc.Component,

    properties: {
        musicBackGround: {
            default: null,
            type: cc.AudioClip
        },
        soundLose: {
            default: null,
            type: cc.AudioClip
        },
        soundWin: {
            default: null,
            type: cc.AudioClip
        },
        soundClick: {
            default: null,
            type: cc.AudioClip
        },
        _isNoneSound: false,
        _isNoneMusic: false
    },
    get isNoneSound() {
        return this._isNoneSound;
    },
    set isNoneSound(value) {
        return this._isNoneSound = value;
    },
    get isNoneMusic() {
        return this._isNoneMusic;
    },
    set isNoneMusic(value) {
        return this._isNoneMusic = value;
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.isNoneMusic = false;
        Emitter.instance.emit("transAudio", this);
    },
    playMusicBackground: function playMusicBackground(loop) {
        // this.pauseAll()
        cc.audioEngine.stopAll();
        console.log(this.isNoneMusic);
        if (this.isNoneMusic) {
            return;
        }
        cc.audioEngine.play(this.musicBackGround, loop);
    },
    playSoundLose: function playSoundLose() {
        this.pauseAll();
        if (this.isNoneSound) {
            return;
        }
        cc.audioEngine.play(this.soundLose, false);
    },
    playSoundWin: function playSoundWin() {
        this.pauseAll();
        if (this.isNoneSound) {
            return;
        }
        var soundWin = cc.audioEngine.play(this.soundWin, false);
        return soundWin;
    },
    playSoundClick: function playSoundClick() {
        if (this.isNoneSound) {
            return;
        }
        var soundClick = cc.audioEngine.play(this.soundClick, false);
        return soundClick;
    },
    pauseSoundClick: function pauseSoundClick() {
        cc.audioEngine.stop(this.playSoundClick());
    },
    pauseSoundWin: function pauseSoundWin() {
        cc.audioEngine.stop(this.playSoundWin());
        this.playMusicBackground(false);
    },
    pauseSoundLose: function pauseSoundLose() {
        cc.audioEngine.stop(this.playSoundWin());
        this.playMusicBackground(false);
    },
    pauseAll: function pauseAll() {
        cc.audioEngine.pauseAll();
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();