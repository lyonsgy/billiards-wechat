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
        is_debug: false, //是否显示调试信息 
        // 重力加速度是一个向量，有方向，2D，Vec重力加速度的大小
        gravity: cc.v2(0, -320)  // 系统默认
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 游戏引擎总控制
        // cc.Director, cc.director  区别？
        // 大写的cc.Director是一个类，小写的 cc.director是全局实例
        cc.director.getPhysicsManager().enabled = true //开启了物理引擎

        // 独立的形状，打开一个调试区域，游戏图像的逻辑区域
        // 开始调试
        if (this.is_debug) { // 开启调试信息
            let Bits = cc.PhysicsManager.DrawBits // 这个是我们要显示的类型
            cc.director.getPhysicsManager().debugDrawFlags = Bits.e_jointBit | Bits.e_shapeBit
        } else { // 关闭调试信息
            cc.director.getPhysicsManager().debugDrawFlags = 0
        }
        // 重力加速度配置
        cc.director.getPhysicsManager().gravity = this.gravity
    },

    start () {

    },

    // update (dt) {},
});
