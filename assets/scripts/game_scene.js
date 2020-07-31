// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        ball_root: {
            type: cc.Node,
            default: null
        },
        white_ball: {
            type: cc.Node,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.is_game_started = true
    },
    restart_game () {
        console.log(this.ball_root.childrenCount)
        for (let i = 0; i < this.ball_root.childrenCount; i++) {
            let b = this.ball_root.children[i]
            b.getComponent('ball').reset()
        }
        this.white_ball.getComponent('white_ball').reset()
        this.is_game_started = true
    },
    check_game_over () {
        for (let i = 0; i < this.ball_root.childrenCount; i++) {
            let b = this.ball_root.children[i];
            if (b.active === true) { // 如果还有球在桌面上
                return
            }
        }
        this.is_game_started = false  // game over
        this.scheduleOnce(this.restart_game.bind(this), 5)
    },

    update (dt) {
        if (!this.is_game_started) {
            return
        }
        // 是否所有球都打入进去
        this.check_game_over()
    },
});
