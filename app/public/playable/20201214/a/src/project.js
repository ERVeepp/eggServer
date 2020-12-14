window.__require = function e(t, n, i) {
    function o(l, a) {
        if (!n[l]) {
            if (!t[l]) {
                var s = l.split("/");
                if (s = s[s.length - 1], !t[s]) {
                    var r = "function" == typeof __require && __require;
                    if (!a && r) return r(s, !0);
                    if (c) return c(s, !0);
                    throw new Error("Cannot find module '" + l + "'")
                }
            }
            var d = n[l] = {
                exports: {}
            };
            t[l][0].call(d.exports, function(e) {
                return o(t[l][1][e] || e)
            }, d, d.exports, e, t, n, i)
        }
        return n[l].exports
    }
    for (var c = "function" == typeof __require && __require, l = 0; l < i.length; l++) o(i[l]);
    return o
}({
    main: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "adf89jfCJRIxKD4FPOQG8Bp", "main"), cc.Class({
            extends: cc.Component,
            properties: {
                bg_download: cc.Node,
                layer1: cc.Node,
                layer2: cc.Node,
                guanbi1: cc.Node,
                guanbi2: cc.Node,
                lblNum: cc.Label,
                lblNum2: cc.Label,
                gbItem1: cc.Node,
                gbItem2: cc.Node,
                szAnim: cc.Animation,
                roleNode: cc.Node,
                hbNode: cc.Node
            },
            onLoad: function() {
                console.log("---------------------tryAd-load-----------------------"), window._ISCSJ = !0, this.layer1.active = !0, this.layer2.active = !1, this.touched = !1, this.postab = [{
                    x: -218,
                    y: -199
                }, {
                    x: -286,
                    y: -158
                }, {
                    x: -215,
                    y: -128
                }, {
                    x: -143,
                    y: -87
                }], this.posidx = 0
            },
            playMove: function() {
                var e = this;
                this.postab[this.posidx] ? this.roleNode.runAction(cc.sequence(cc.delayTime(.05), cc.scaleTo(.1, .7), cc.scaleTo(.1, 1), cc.callFunc(function() {
                    e.roleNode.x = e.postab[e.posidx].x, e.roleNode.y = e.postab[e.posidx].y, e.posidx++, e.playMove()
                }))) : this.scheduleOnce(function() {
                    e.playLayer2()
                }, .3)
            },
            start: function() {
                console.log("---------------------tryAd-start----------------------"), this.num = 19.8, this.lblNum.string = this.num, window._ISCSJ ? (this.bg_download.active = !0, window.playableSDK && window.playableSDK.isViewable().then(function(e) {
                    console.log("---------------------CSJ-start-isViewable-----------------------", e)
                }), window.playableSDK && window.playableSDK.addEventListener("visibilityChange", function(e) {
                    console.log("---------------------CSJ-start-addEventListener-----------------------", e.viewable), e.viewable
                }), window.playableSDK && window.playableSDK.removeEventListener("visibilityChange", function(e) {
                    console.log("---------------------CSJ-start-removeEventListener-----------------------", e)
                })) : (this.guanbi1.active = !1, this.guanbi2.active = !1, this.bg_download.active = !1, window._gdtUnSdk = window.GDTUnSdk && new window.GDTUnSdk({
                    type: "playable",
                    onSuccess: function(e) {
                        console.log("---------------------GDT-start-onSuccess-----------------------"), console.log(e)
                    },
                    onError: function(e) {
                        console.log("---------------------GDT-start-onError-----------------------"), console.log(e)
                    }
                })), this.ht = 35, this.delayTime = .5, this.gbItem1.getChildByName("lbl").getComponent(cc.Label).string = this.getSTR(), this.gbItem2.getChildByName("lbl").getComponent(cc.Label).string = this.getSTR(), this.playGB1(), this.playGB2()
            },
            onClick: function(e) {
                console.log("------tryAd-onClick------", e.target.name), window._ISCSJ ? window.playableSDK && window.playableSDK.openAppStore() : window._gdtUnSdk && window._gdtUnSdk.playAble.onClick()
            },
            onClick2: function(e) {
                var t = this;
                console.log("------tryAd-onClick2------", e.target.name), this.touched || (this.touched = !0, this.lblNum2.string = "7", this.szAnim.play(), this.scheduleOnce(function() {
                    t.playMove()
                }, 1), window._ISCSJ && window.playableSDK && window.playableSDK.openAppStore())
            },
            onCSJ: function(e) {
                window._ISCSJ && this.onClick(e)
            },
            randomRange: function(e, t) {
                t = t || 0, e = e || 0;
                var n = Math.random() * (t - e + 1);
                return Math.floor(e + n)
            },
            playGB1: function() {
                var e = this;
                this.gbItem1.runAction(cc.sequence(cc.delayTime(this.delayTime), cc.moveBy(1, 0, this.ht), cc.callFunc(function() {
                    e.gbItem1.y = -e.ht, e.gbItem1.getChildByName("lbl").getComponent(cc.Label).string = e.getSTR()
                }), cc.delayTime(this.delayTime), cc.moveBy(1, 0, this.ht), cc.callFunc(function() {
                    e.playGB1()
                })))
            },
            playGB2: function() {
                var e = this;
                this.gbItem2.runAction(cc.sequence(cc.delayTime(this.delayTime), cc.moveBy(1, 0, this.ht), cc.delayTime(this.delayTime), cc.moveBy(1, 0, this.ht), cc.callFunc(function() {
                    e.gbItem2.y = -e.ht, e.gbItem2.getChildByName("lbl").getComponent(cc.Label).string = e.getSTR()
                }), cc.callFunc(function() {
                    e.playGB2()
                })))
            },
            getSTR: function() {
                var e = [134, 135, 136, 137, 138, 139, 147, 150, 151, 152, 157, 158, 159, 182, 187, 188],
                    t = [5, 10, 15, 30, 50, 100];
                return "\u7528\u6237" + e[this.randomRange(0, e.length - 1)] + "****" + this.randomRange(1e3, 9999) + "\u83b7\u5f97" + t[this.randomRange(0, t.length - 1)] + "\u5143\u73b0\u91d1\u7ea2\u5305"
            },
            playLayer2: function() {
                var e = this;
                this.layer2.active || (this.layer2.active = !0, this.layer2.scale = 0, this.layer2.runAction(cc.sequence(cc.scaleTo(.3, 1), cc.callFunc(function() {
                    e.hbNode.runAction(cc.moveBy(1, 0, 484))
                }))))
            }
        }), cc._RF.pop()
    }, {}]
}, {}, ["main"]);