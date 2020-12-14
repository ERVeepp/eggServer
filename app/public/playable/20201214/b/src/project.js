window.__require = function n(e, o, i) {
    function t(c, l) {
        if (!o[c]) {
            if (!e[c]) {
                var r = c.split("/");
                if (r = r[r.length - 1], !e[r]) {
                    var d = "function" == typeof __require && __require;
                    if (!l && d) return d(r, !0);
                    if (a) return a(r, !0);
                    throw new Error("Cannot find module '" + c + "'")
                }
            }
            var u = o[c] = {
                exports: {}
            };
            e[c][0].call(u.exports, function(n) {
                return t(e[c][1][n] || n)
            }, u, u.exports, n, e, o, i)
        }
        return o[c].exports
    }
    for (var a = "function" == typeof __require && __require, c = 0; c < i.length; c++) t(i[c]);
    return t
}({
    main: [function(n, e, o) {
        "use strict";
        cc._RF.push(e, "adf89jfCJRIxKD4FPOQG8Bp", "main"), cc.Class({
            extends: cc.Component,
            properties: {
                layer1: cc.Node,
                guanbi1: cc.Node,
                lblNum: cc.Label,
                bg_download: cc.Node,
                jindutiao: cc.Sprite,
                hongbaoItem: cc.Node,
                kdBtn: cc.Node,
                xzBtn: cc.Node,
                lingAnim: cc.Animation,
                guang: cc.Node,
                lingSf: cc.SpriteFrame,
                lingSf2: cc.SpriteFrame,
                lingSf3: cc.SpriteFrame
            },
            onLoad: function() {
                console.log("---------------------tryAd-load-----------------------"), window._ISCSJ = !0
            },
            start: function() {
                console.log("---------------------tryAd-start----------------------"), this.maxNum = 88.8, this.addNum = this.maxNum / 50, this.value = 0, window._ISCSJ ? (this.bg_download.active = !0, window.playableSDK && window.playableSDK.isViewable().then(function(n) {
                    console.log("---------------------CSJ-start-isViewable-----------------------", n)
                }), window.playableSDK && window.playableSDK.addEventListener("visibilityChange", function(n) {
                    console.log("---------------------CSJ-start-addEventListener-----------------------", n.viewable), n.viewable
                }), window.playableSDK && window.playableSDK.removeEventListener("visibilityChange", function(n) {
                    console.log("---------------------CSJ-start-removeEventListener-----------------------", n)
                })) : (this.bg_download.active = !1, this.lingAnim.node.getComponent(cc.Sprite).spriteFrame = this.lingSf, this.jindutiao.spriteFrame = this.lingSf2, window._gdtUnSdk = window.GDTUnSdk && new window.GDTUnSdk({
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
                cc.loader.loadRes("audio/Common", cc.AudioClip, function(n, e) {
                    n ? cc.error(n.message || n) : cc.audioEngine.playEffect(e, !1)
                });
                for (var n = 0, e = 0; e < 5; e++) this.randomRange(1, 3), this.createHB(n), n += this.randomRange(1, 2) / 20
            },
            createHB: function() {
                var n = this,
                    e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                this.scheduleOnce(function() {
                    var e = cc.instantiate(n.hongbaoItem);
                    e.active = !0, e.parent = n.layer1, e.x = n.randomRange(0, 120) - 60, e.angle = n.randomRange(0, 8), e.runAction(cc.sequence(cc.moveTo(.3, 0, 12), cc.callFunc(function() {
                        e.destroy(), cc.loader.loadRes("audio/piaohongbao", cc.AudioClip, function(n, e) {
                            n ? cc.error(n.message || n) : cc.audioEngine.playEffect(e, !1)
                        }), n.value != n.maxNum && (n.value += n.addNum, n.value += n.randomRange(1, 2) / 10, n.value >= n.maxNum && (n.value = n.maxNum), n.lblNum.string = n.value.toFixed(1) + "\u5143", n.jindutiao.fillRange = n.value / n.maxNum, n.value >= n.maxNum && (n.kdBtn.active = !1, n.xzBtn.active = !0, n.lingAnim.play(), n.guang.active = !0, window._ISCSJ || (n.jindutiao.spriteFrame = n.lingSf3)))
                    })))
                }, e)
            },
            randomRange: function(n, e) {
                e = e || 0, n = n || 0;
                var o = Math.random() * (e - n + 1);
                return Math.floor(n + o)
            }
        }), cc._RF.pop()
    }, {}]
}, {}, ["main"]);