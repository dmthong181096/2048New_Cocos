
const Emitter = require('mEmitter');
const V = require('Variables');
cc.Class({
    extends: cc.Component,

    properties: {
        bestScoreNumber: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance.emit('transBestScore', this);
    },
    updateBestScore(number) {
        this.bestScoreNumber.string = number
    },
    saveBestScore(userData) {
        cc.sys.localStorage.setItem('userData', JSON.stringify(userData))
    },
    loadBestScore() {
        let userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
        if (userData == null) {
            this.saveBestScore(V.userData)
            return
        }
        this.updateBestScore(userData.score)
        return userData
        
    },

    start () {

    },

    // update (dt) {},
});
