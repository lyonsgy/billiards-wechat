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
        cue: {
            type: cc.Node,
            default: null
        },
        min_dis: 50 // 如果拖动位置到白球的中心 < 这个距离（min_dis），那么隐藏球杆
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.body = this.getComponent(cc.RigidBody)

        this.cue_inst = this.cue.getComponent('cue')
        this.start_x = this.node.x
        this.start_y = this.node.y
        // START（点击下去），MOVED（触摸移动），ENDED（触摸在节点范围内弹起）,CANCEL（节点范围外弹起）
        this.node.on(cc.Node.EventType.TOUCH_START, function (e) {

        }.bind(this), this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            let w_pos = e.getLocation()
            let dst = this.node.parent.convertToNodeSpaceAR(w_pos)
            let src = this.node.getPosition()
            let dir = dst.sub(src)
            let len = dir.mag() // 拉伸长度

            if (len < this.min_dis) {
                this.cue.active = false  // 设置球杆隐藏
                return
            }
            this.cue.active = true  // 设置球杆显示

            let r = Math.atan2(dir.y, dir.x)
            let degree = r * 180 / Math.PI
            degree = 360 - degree  // 数学旋转角度转换为 cocos 角度转换

            this.cue.rotation = degree + 180 // 球杆旋转角度随触摸点和球的相对位置改变

            let cue_pos = dst
            let cue_len_half = this.cue.width * 0.5
            cue_pos.x += (cue_len_half * dir.x / len)
            cue_pos.y += (cue_len_half * dir.y / len)

            this.cue.setPosition(cue_pos)
        }.bind(this), this)
        this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            if (!this.cue.active) {
                return
            }
            this.cue_inst.shootAt(this.node.getPosition()) // 发射球杆
        }.bind(this), this)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            if (!this.cue.active) {
                return
            }
            this.cue_inst.shootAt(this.node.getPosition()) // 发射球杆
        }.bind(this), this)
    },

    // update (dt) {},

    reset () {
        this.node.scale = 1
        this.node.x = this.start_x
        this.node.y = this.start_y

        this.body.linearVelocity = cc.v2(0, 0)
        this.body.angularVelocity = 0
    },
    onBeginContact (contact, selfController, otherController) {
        // 白球可能碰球杆、碰球、边、球袋
        if (otherController.node.groupIndex === 2) { // 球袋
            // 隔一秒以后把白球放回原点
            this.node.scale = 0
            this.scheduleOnce(this.reset.bind(this), 1)
            return
        }
    }
});
