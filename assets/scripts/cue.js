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
        SHOOT_POWER: 60  // 冲力
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.body = this.getComponent(cc.RigidBody)
    },

    // update (dt) {},

    shootAt (dst) {
        // 冲量，给这个球杆一个方向的冲量，矢量（大小、方向）
        // 方向：src ---> dst
        let src = this.node.getPosition()
        let dir = dst.sub(src)

        // 大小
        let cue_len_half = this.node.width * 0.5
        let len = dir.mag()
        let distance = len - cue_len_half

        let power_x = distance * this.SHOOT_POWER * dir.x / len
        let power_y = distance * this.SHOOT_POWER * dir.y / len

        // applyLinearImpulse（冲量大小向量，球杆的原点转成世界坐标，true）
        this.body.applyLinearImpulse(cc.v2(power_x, power_y), this.node.convertToWorldSpaceAR(cc.v2(0, 0)), true);
    },
    onPreSolve (contact, selfController, otherController) {
        this.node.active = false
    }
});
