// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

// 定义了一个类，new 构造函数
// extends：扩展自 Component
// new 类，实例化一个组件类，往对应的节点上添加我们的组件，new 出组件实例
cc.Class({
    extends: cc.Component,
    // 属性列表，他将会作为组件实例的数据成员，到组件里，绑定到编辑器上。
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
        value: 1
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this 指的是当前组件的实例
    },

    start () {
        // this 指的是当前组件的实例
        this.body = this.getComponent(cc.RigidBody)
        this.start_x = this.node.x
        this.start_y = this.node.y
    },
    // dt 距离上一次刷新的时间
    update (dt) {
        // this 指的是当前组件的实例

    },
    onBeginContact (contact, selfController, otherController) {
        // 球可能碰球杆、碰球、边、球袋
        if (otherController.node.groupIndex === 2) { // 球袋
            // 隐藏球
            this.node.active = false
            return
        }
    },
    reset () {
        this.node.active = true
        this.node.x = this.start_x
        this.node.y = this.start_y
        this.node.rotation = 0
        // 线性速度和旋转置为0
        this.body.linearVelocity = cc.v2(0, 0)
        this.body.angularVelocity = 0
    }
});
