window.__require = function n(o, e, c) {
    function i(a, l) {
        if (!e[a]) {
            if (!o[a]) {
                var r = a.split("/");
                if (r = r[r.length - 1], !o[r]) {
                    var d = "function" == typeof __require && __require;
                    if (!l && d) return d(r, !0);
                    if (t) return t(r, !0);
                    throw new Error("Cannot find module '" + a + "'")
                }
            }
            var s = e[a] = {
                exports: {}
            };
            o[a][0].call(s.exports, function(n) {
                return i(o[a][1][n] || n)
            }, s, s.exports, n, o, e, c)
        }
        return e[a].exports
    }
    for (var t = "function" == typeof __require && __require, a = 0; a < c.length; a++) i(c[a]);
    return i
}({
    main: [function(n, o, e) {
        "use strict";
        cc._RF.push(o, "adf89jfCJRIxKD4FPOQG8Bp", "main"), cc.Class({
            extends: cc.Component,
            properties: {
                bg_downloadCSJ: cc.Node,
                bg_downloadGDT: cc.Node,
                layer1: cc.Node,
                layer2: cc.Node,
                guanbi1: cc.Node,
                guanbi2: cc.Node,
                smLayout: cc.Node,
                bgLayout: cc.Node,
                gdjNode: cc.Node,
                zhuaBtn: cc.Animation,
                zhuaziNode: cc.Animation,
                lblNum: cc.Label
            },
            onLoad: function() {
                console.log("---------------------tryAd-load-----------------------"), window._ISCSJ = !0, this.num = 8.55, this.layer1.active = !0, this.layer2.active = !1, this.touched = !1
            },
            start: function() {
                var n = this;
                console.log("---------------------tryAd-start----------------------"), this.lblNum.string = this.num, this.zhuaziNode.on(cc.Animation.EventType.FINISHED, function(o, e) {
                    cc.log("```````end````````", o, e);
                    for (var c = n.bgLayout.children, i = null, t = 0; t < c.length; t++) 0 == t ? i = c[t] : Math.abs(i.x) > Math.abs(c[t].x) && (i = c[t]);
                    i.isZhong = !0, i.zIndex = 2;
                    var a = n.zhuaziNode.node.getChildByName("posNode").convertToWorldSpaceAR(cc.v2(0, 0)),
                        l = n.gdjNode.convertToNodeSpaceAR(a);
                    i.runAction(cc.sequence(cc.moveTo(.2, l), cc.callFunc(function() {
                        n.zhuaziNode.node.runAction(cc.moveBy(.4, 0, 200)), i.runAction(cc.sequence(cc.moveBy(.4, 0, 200), cc.delayTime(.5), cc.callFunc(function() {
                            n.playLayer2()
                        })))
                    })))
                }, this), window._ISCSJ ? (this.bg_downloadCSJ.active = !0, this.bg_downloadGDT.active = !1, window.playableSDK && window.playableSDK.isViewable().then(function(n) {
                    console.log("---------------------CSJ-start-isViewable-----------------------", n)
                }), window.playableSDK && window.playableSDK.addEventListener("visibilityChange", function(n) {
                    console.log("---------------------CSJ-start-addEventListener-----------------------", n.viewable), n.viewable
                }), window.playableSDK && window.playableSDK.removeEventListener("visibilityChange", function(n) {
                    console.log("---------------------CSJ-start-removeEventListener-----------------------", n)
                })) : (this.guanbi1.active = !1, this.guanbi2.active = !1, this.bg_downloadCSJ.active = !1, this.bg_downloadGDT.active = !0, window._gdtUnSdk = window.GDTUnSdk && new window.GDTUnSdk({
                    type: "playable",
                    onSuccess: function(n) {
                        console.log("---------------------GDT-start-onSuccess-----------------------"), console.log(n)
                    },
                    onError: function(n) {
                        console.log("---------------------GDT-start-onError-----------------------"), console.log(n)
                    }
                })), this.schedule(function() {
                    for (var o = n.smLayout.children, e = 0; e < o.length; e++) {
                        var c = o[e];
                        c.x -= 1, c.x <= -418.5 && (c.x = 418.5)
                    }
                    for (var i = n.bgLayout.children, t = 0; t < i.length; t++) {
                        var a = i[t];
                        a.isZhong || (a.x += 1, a.x >= 448 && (a.x = -448))
                    }
                }, .015)
            },
            onClick: function(n) {
                console.log("------tryAd-onClick------", n.target.name), window._ISCSJ ? (cc.log("\u4e0b\u8f7d"), window.playableSDK && window.playableSDK.openAppStore()) : (cc.log("\u4e0b\u8f7d"), window._gdtUnSdk && window._gdtUnSdk.playAble.onClick())
            },
            onClick2: function(n) {
                var o = this;
                console.log("------tryAd-onClick2------", n.target.name), this.touched || (this.touched = !0, this.zhuaBtn.play("zhuabtnan"), this.scheduleOnce(function() {
                    o.zhuaziNode.play("zhuazizhua")
                }, .2), window._ISCSJ && (cc.log("\u4e0b\u8f7d"), window.playableSDK && window.playableSDK.openAppStore()))
            },
            onCSJ: function(n) {
                window._ISCSJ && this.onClick(n)
            },
            playLayer2: function() {
                this.layer2.active || (this.layer2.active = !0, this.layer2.scale = 0, this.layer2.runAction(cc.sequence(cc.scaleTo(.3, 1), cc.callFunc(function() {}))))
            }
        }), cc._RF.pop()
    }, {}]
}, {}, ["main"]);