window.__require = function n(o, e, t) {
    function i(c, l) {
        if (!e[c]) {
            if (!o[c]) {
                var r = c.split("/");
                if (r = r[r.length - 1], !o[r]) {
                    var d = "function" == typeof __require && __require;
                    if (!l && d) return d(r, !0);
                    if (a) return a(r, !0);
                    throw new Error("Cannot find module '" + c + "'")
                }
            }
            var s = e[c] = {
                exports: {}
            };
            o[c][0].call(s.exports, function(n) {
                return i(o[c][1][n] || n)
            }, s, s.exports, n, o, e, t)
        }
        return e[c].exports
    }
    for (var a = "function" == typeof __require && __require, c = 0; c < t.length; c++) i(t[c]);
    return i
}({
    main: [function(n, o, e) {
        "use strict";
        cc._RF.push(o, "adf89jfCJRIxKD4FPOQG8Bp", "main"), cc.Class({
            extends: cc.Component,
            properties: {
                layer1: cc.Node,
                guanbi1: cc.Node,
                lblNum: cc.Label,
                bg_download: cc.Node,
                hongbaoItem: cc.Node,
                kdBtn: cc.Node,
                xzBtn: cc.Node,
                shouzhi: cc.Node,
                btnFont1: cc.Node,
                btnFont2: cc.Node,
                btnAnim: cc.Node,
                gameIcon: cc.Sprite,
                gameTypeSf: {
                    type: cc.SpriteFrame,
                    default: []
                }
            },
            onLoad: function() {
                console.log("---------------------tryAd-load-----------------------"), window._ISCSJ = !0, this.maxNum = 70, this.gameType = 2
            },
            start: function() {
                var n = this;
                console.log("---------------------tryAd-start----------------------"), this.btnFont1.active = !0, this.btnFont2.active = !1, this.addNum = this.maxNum / 5, this.value = 0, this.loopAnim = !0, this.delayX = this.randomRange(3, 6) / 10, this.count = 0, this.schedule(function() {
                    n.loopAnim && (n.count += .1, n.count >= n.delayX && (n.count = 0, n.delayX = n.randomRange(3, 6) / 10, n.onKuangDian()))
                }, .1), 1 == this.gameType ? this.gameIcon.spriteFrame = this.gameTypeSf[0] : this.gameIcon.spriteFrame = this.gameTypeSf[1], window._ISCSJ ? (this.bg_download.active = !0, window.playableSDK && window.playableSDK.isViewable().then(function(n) {
                    console.log("---------------------CSJ-start-isViewable-----------------------", n)
                }), window.playableSDK && window.playableSDK.addEventListener("visibilityChange", function(n) {
                    console.log("---------------------CSJ-start-addEventListener-----------------------", n.viewable), n.viewable
                }), window.playableSDK && window.playableSDK.removeEventListener("visibilityChange", function(n) {
                    console.log("---------------------CSJ-start-removeEventListener-----------------------", n)
                })) : (this.bg_download.active = !1, this.guanbi1.active = !1, window._gdtUnSdk = window.GDTUnSdk && new window.GDTUnSdk({
                    type: "playable",
                    onSuccess: function(n) {
                        console.log("---------------------GDT-start-onSuccess-----------------------"), console.log(n)
                    },
                    onError: function(n) {
                        console.log("---------------------GDT-start-onError-----------------------"), console.log(n)
                    }
                }))
            },
            onClick: function(n) {
                n && console.log("------tryAd-onClick------", n.target.name), window._ISCSJ ? window.playableSDK && window.playableSDK.openAppStore() : window._gdtUnSdk && window._gdtUnSdk.playAble.onClick()
            },
            onClick2: function(n) {
                console.log("------tryAd-onClick2------", n.target.name), window._ISCSJ ? this.onClick(n) : this.xzBtn.active && this.onClick(n)
            },
            onClickKD: function() {
                window._ISCSJ ? window.playableSDK && window.playableSDK.openAppStore() : window._gdtUnSdk && window._gdtUnSdk.playAble.onClick(), this.loopAnim && (this.loopAnim = !1, this.lblNum.string = "0", this.value = 0, this.kdBtn.getComponent(cc.Animation).stop(), this.kdBtn.scale = 1), this.onKuangDian()
            },
            onKuangDian: function() {
                cc.loader.loadRes("audio/Common", cc.AudioClip, function(n, o) {
                    n ? cc.error(n.message || n) : cc.audioEngine.playEffect(o, !1)
                });
                for (var n = 0, o = 0; o < 5; o++) this.randomRange(1, 3), this.createHB(n), n += this.randomRange(1, 2) / 20
            },
            createHB: function() {
                var n = this,
                    o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                this.scheduleOnce(function() {
                    var o = cc.instantiate(n.hongbaoItem);
                    o.active = !0, o.parent = n.layer1, o.x = n.randomRange(0, 120) - 60, o.angle = n.randomRange(0, 8), o.runAction(cc.sequence(cc.moveTo(.3, 0, 140), cc.callFunc(function() {
                        if (o.destroy(), cc.loader.loadRes("audio/piaohongbao", cc.AudioClip, function(n, o) {
                                n ? cc.error(n.message || n) : cc.audioEngine.playEffect(o, !1)
                            }), n.value != n.maxNum) {
                            if (n.value += n.addNum, n.value += n.randomRange(1, 2) / 10, n.value >= n.maxNum && (n.value = n.maxNum), n.lblNum.string = n.value.toFixed(1), n.loopAnim && n.value >= 20) return n.lblNum.string = "0", void(n.value = 0);
                            n.value >= n.maxNum && (n.btnFont1.active = !1, n.btnFont2.active = !0, n.shouzhi.active = !1, n.xzBtn.active = !0, n.lblNum.node.getComponent(cc.Animation).play(), n.btnAnim.getComponent(cc.Animation).play())
                        }
                    })))
                }, o)
            },
            randomRange: function(n, o) {
                o = o || 0, n = n || 0;
                var e = Math.random() * (o - n + 1);
                return Math.floor(n + e)
            }
        }), cc._RF.pop()
    }, {}]
}, {}, ["main"]);