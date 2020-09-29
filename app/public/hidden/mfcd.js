var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, f, k) {
    a != Array.prototype && a != Object.prototype && (a[f] = k.value)
};
$jscomp.getGlobal = function (a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
    $jscomp.initSymbol = function () {};
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.Symbol = function () {
    var a = 0;
    return function (f) {
        return $jscomp.SYMBOL_PREFIX + (f || "") + a++
    }
}();
$jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.iterator;
    a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function () {
            return $jscomp.arrayIterator(this)
        }
    });
    $jscomp.initSymbolIterator = function () {}
};
$jscomp.initSymbolAsyncIterator = function () {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.asyncIterator;
    a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("asyncIterator"));
    $jscomp.initSymbolAsyncIterator = function () {}
};
$jscomp.arrayIterator = function (a) {
    var f = 0;
    return $jscomp.iteratorPrototype(function () {
        return f < a.length ? {
            done: !1,
            value: a[f++]
        } : {
            done: !0
        }
    })
};
$jscomp.iteratorPrototype = function (a) {
    $jscomp.initSymbolIterator();
    a = {
        next: a
    };
    a[$jscomp.global.Symbol.iterator] = function () {
        return this
    };
    return a
};
$jscomp.makeIterator = function (a) {
    $jscomp.initSymbolIterator();
    var f = a[Symbol.iterator];
    return f ? f.call(a) : $jscomp.arrayIterator(a)
};
$jscomp.polyfill = function (a, f, k, h) {
    if (f) {
        k = $jscomp.global;
        a = a.split(".");
        for (h = 0; h < a.length - 1; h++) {
            var d = a[h];
            d in k || (k[d] = {});
            k = k[d]
        }
        a = a[a.length - 1];
        h = k[a];
        f = f(h);
        f != h && null != f && $jscomp.defineProperty(k, a, {
            configurable: !0,
            writable: !0,
            value: f
        })
    }
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function (a) {
    function f() {
        this.batch_ = null
    }

    function k(c) {
        return c instanceof d ? c : new d(function (a, d) {
            a(c)
        })
    }
    if (a && !$jscomp.FORCE_POLYFILL_PROMISE) return a;
    f.prototype.asyncExecute = function (c) {
        null == this.batch_ && (this.batch_ = [], this.asyncExecuteBatch_());
        this.batch_.push(c);
        return this
    };
    f.prototype.asyncExecuteBatch_ = function () {
        var c = this;
        this.asyncExecuteFunction(function () {
            c.executeBatch_()
        })
    };
    var h = $jscomp.global.setTimeout;
    f.prototype.asyncExecuteFunction = function (c) {
        h(c,
            0)
    };
    f.prototype.executeBatch_ = function () {
        for (; this.batch_ && this.batch_.length;) {
            var c = this.batch_;
            this.batch_ = [];
            for (var a = 0; a < c.length; ++a) {
                var d = c[a];
                c[a] = null;
                try {
                    d()
                } catch (w) {
                    this.asyncThrow_(w)
                }
            }
        }
        this.batch_ = null
    };
    f.prototype.asyncThrow_ = function (c) {
        this.asyncExecuteFunction(function () {
            throw c;
        })
    };
    var d = function (c) {
        this.state_ = 0;
        this.result_ = void 0;
        this.onSettledCallbacks_ = [];
        var a = this.createResolveAndReject_();
        try {
            c(a.resolve, a.reject)
        } catch (v) {
            a.reject(v)
        }
    };
    d.prototype.createResolveAndReject_ =
        function () {
            function c(c) {
                return function (f) {
                    d || (d = !0, c.call(a, f))
                }
            }
            var a = this,
                d = !1;
            return {
                resolve: c(this.resolveTo_),
                reject: c(this.reject_)
            }
        };
    d.prototype.resolveTo_ = function (c) {
        if (c === this) this.reject_(new TypeError("A Promise cannot resolve to itself"));
        else if (c instanceof d) this.settleSameAsPromise_(c);
        else {
            a: switch (typeof c) {
            case "object":
                var a = null != c;
                break a;
            case "function":
                a = !0;
                break a;
            default:
                a = !1
            }
            a ? this.resolveToNonPromiseObj_(c) : this.fulfill_(c)
        }
    };
    d.prototype.resolveToNonPromiseObj_ = function (a) {
        var c =
            void 0;
        try {
            c = a.then
        } catch (v) {
            this.reject_(v);
            return
        }
        "function" == typeof c ? this.settleSameAsThenable_(c, a) : this.fulfill_(a)
    };
    d.prototype.reject_ = function (a) {
        this.settle_(2, a)
    };
    d.prototype.fulfill_ = function (a) {
        this.settle_(1, a)
    };
    d.prototype.settle_ = function (a, d) {
        if (0 != this.state_) throw Error("Cannot settle(" + a + ", " + d + "): Promise already settled in state" + this.state_);
        this.state_ = a;
        this.result_ = d;
        this.executeOnSettledCallbacks_()
    };
    d.prototype.executeOnSettledCallbacks_ = function () {
        if (null != this.onSettledCallbacks_) {
            for (var a =
                0; a < this.onSettledCallbacks_.length; ++a) A.asyncExecute(this.onSettledCallbacks_[a]);
            this.onSettledCallbacks_ = null
        }
    };
    var A = new f;
    d.prototype.settleSameAsPromise_ = function (a) {
        var c = this.createResolveAndReject_();
        a.callWhenSettled_(c.resolve, c.reject)
    };
    d.prototype.settleSameAsThenable_ = function (a, d) {
        var c = this.createResolveAndReject_();
        try {
            a.call(d, c.resolve, c.reject)
        } catch (w) {
            c.reject(w)
        }
    };
    d.prototype.then = function (a, f) {
        function c(a, c) {
            return "function" == typeof a ? function (b) {
                    try {
                        k(a(b))
                    } catch (u) {
                        h(u)
                    }
                } :
                c
        }
        var k, h, I = new d(function (a, c) {
            k = a;
            h = c
        });
        this.callWhenSettled_(c(a, k), c(f, h));
        return I
    };
    d.prototype.catch = function (a) {
        return this.then(void 0, a)
    };
    d.prototype.callWhenSettled_ = function (a, d) {
        function c() {
            switch (f.state_) {
            case 1:
                a(f.result_);
                break;
            case 2:
                d(f.result_);
                break;
            default:
                throw Error("Unexpected state: " + f.state_);
            }
        }
        var f = this;
        null == this.onSettledCallbacks_ ? A.asyncExecute(c) : this.onSettledCallbacks_.push(c)
    };
    d.resolve = k;
    d.reject = function (a) {
        return new d(function (c, d) {
            d(a)
        })
    };
    d.race = function (a) {
        return new d(function (c,
            d) {
            for (var f = $jscomp.makeIterator(a), h = f.next(); !h.done; h = f.next()) k(h.value).callWhenSettled_(c, d)
        })
    };
    d.all = function (a) {
        var c = $jscomp.makeIterator(a),
            f = c.next();
        return f.done ? k([]) : new d(function (a, d) {
            function h(c) {
                return function (d) {
                    b[c] = d;
                    l--;
                    0 == l && a(b)
                }
            }
            var b = [],
                l = 0;
            do b.push(void 0), l++, k(f.value).callWhenSettled_(h(b.length - 1), d), f = c.next(); while (!f.done)
        })
    };
    return d
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.fill", function (a) {
    return a ? a : function (a, k, h) {
        var d = this.length || 0;
        0 > k && (k = Math.max(0, d + k));
        if (null == h || h > d) h = d;
        h = Number(h);
        0 > h && (h = Math.max(0, d + h));
        for (k = Number(k || 0); k < h; k++) this[k] = a;
        return this
    }
}, "es6", "es3");
window.__abbaidu_20180315_lid_score_cb = function (a, f) {
    document.cookie = encodeURIComponent("yjs_ab_lid") + "=" + encodeURIComponent(a);
    document.cookie = encodeURIComponent("yjs_ab_score") + "=" + encodeURIComponent(f)
};
(function () {
    function a() {
        function a(a) {
            (new Image).src = "https://anti-bot.baidu.com/abdr?data=" + encodeURIComponent(U(JSON.stringify(a))) + "&_=" + Math.random()
        }

        function m() {
            x || (x = n.f("anti-bot-df" + Math.random() + t["108"] + t["109"] + t["27"] + y));
            if (b.__abbaidu_20180315_cidcb) try {
                b.__abbaidu_20180315_cidcb(x)
            } catch (p) {}
        }

        function C(g) {
            m();
            var e = g.type,
                c = g.clientX + "",
                d = g.clientY + "",
                f = g.pageX + "",
                V = g.pageY + "";
            a: {
                for (var p = g.target, r = []; p && 1 === p.nodeType; p = p.parentNode) {
                    if (p.hasAttribute("id")) {
                        r.unshift('id("' +
                            p.getAttribute("id") + '")');
                        p = r.join("/");
                        break a
                    }
                    if (p.hasAttribute("class")) r.unshift(p.localName.toLowerCase() + '[@class="' + p.getAttribute("class") + '"]');
                    else {
                        for (var h = 1, k = p.previousSibling; k; k = k.previousSibling) k.localName == p.localName && h++;
                        r.unshift(p.localName.toLowerCase() + "[" + h + "]")
                    }
                }
                p = r.length ? "/" + r.join("/") : null
            }
            g = {
                1: e,
                2: c,
                3: d,
                4: f,
                5: V,
                6: p,
                7: (new Date).getTime() + "",
                8: D + "",
                9: E + "",
                10: F + "",
                11: void 0 === g.isTrusted ? "2" : g.isTrusted ? "1" : "0",
                12: "0",
                13: K + "",
                14: L + "",
                15: M + "",
                16: N + "",
                17: O + "",
                18: P + "",
                19: (b.innerWidth || l.documentElement.clientWidth || l.body.clientWidth) + "x" + (b.innerHeight || l.documentElement.clientHeight || l.body.clientHeight),
                20: (new Date).getTime() - y + "",
                101: x,
                103: (new Date).getTime() + "",
                104: Q,
                106: R,
                107: "12",
                108: l.URL,
                109: l.referrer,
                110: b.navigator.userAgent || "",
                200: "2"
            };
            l.removeEventListener("click", C, !0);
            a(g)
        }

        function f(a) {
            var g = a.accelerationIncludingGravity;
            g && (K = g.x || 0, L = g.y || 0, M = g.z || 0);
            if (g = a.acceleration) D = g.x || 0, E = g.y || 0, F = g.z || 0;
            if (a = a.rotationRate) N = a.alpha || 0, O = a.beta ||
                0, P = a.gamma || 0;
            0 !== z || 0 === D && 0 === E && 0 === F || (z = (new Date).getTime());
            r(!1)
        }

        function r(g) {
            if (!W) {
                var e = !1;
                g || 0 === B || 0 === z || (e = !0);
                !g || 0 === B && 0 === z || (e = !0);
                e && (b.removeEventListener("devicemotion", f, !0), W = !0, m(), a({
                    1: D + "",
                    2: E + "",
                    3: F + "",
                    4: K + "",
                    5: L + "",
                    6: M + "",
                    7: N + "",
                    8: O + "",
                    9: P + "",
                    10: 0 !== z ? z - y + "" : "-1",
                    11: X,
                    12: 0 !== B ? B - y + "" : "-1",
                    13: Y,
                    14: Z,
                    15: aa,
                    16: ba,
                    101: x,
                    103: (new Date).getTime() + "",
                    104: Q,
                    106: R,
                    107: "12",
                    108: l.URL,
                    109: l.referrer,
                    110: b.navigator.userAgent || "",
                    200: "3"
                }))
            }
        }

        function e() {
            var a = new XMLHttpRequest;
            a.open("POST", "https://anti-bot.baidu.com/abdr", !0);
            a.withCredentials = !0;
            a.onreadystatechange = function () {
                if (4 === this.readyState && 200 === this.status) {
                    var a = this.responseText;
                    if (-1 !== a.indexOf("|")) {
                        var g = a.split("|");
                        a = g[0];
                        g = g[1]
                    }
                    try {
                        b.localStorage && b.localStorage.setItem("abbaidu_ls_key&^%", a)
                    } catch (J) {}
                    if (b.__abbaidu_20180306_idcb) try {
                        b.__abbaidu_20180306_idcb(a)
                    } catch (J) {}
                    if (b.__abbaidu_20180315_scorecb) try {
                        b.__abbaidu_20180315_scorecb(g)
                    } catch (J) {}
                    if (b.__abbaidu_20180315_lid_score_cb) try {
                        b.__abbaidu_20180315_lid_score_cb(a,
                            g)
                    } catch (J) {}
                }
            };
            a.send(U(JSON.stringify(t)))
        }
        var y = (new Date).getTime(),
            ca = "",
            da = "",
            ea = "",
            G = "";
        if (b.__abbaidu_20180315_zidgetf) try {
            ca = b.__abbaidu_20180315_zidgetf() || ""
        } catch (p) {}
        if (b.__abbaidu_20180315_bidgetf) try {
            da = b.__abbaidu_20180315_bidgetf() || ""
        } catch (p) {}
        if (b.__abbaidu_20180315_subidgetf) try {
            ea = b.__abbaidu_20180315_subidgetf() || ""
        } catch (p) {}
        if (b.__abbaidu_20180315_extra_datagetf) try {
            G = b.__abbaidu_20180315_extra_datagetf() || ""
        } catch (p) {}
        var u = A() + "",
            ja = c(!0, "antifraud", !1),
            q = (b.screen.colorDepth ||
                "") + "",
            ka = b.screen.width + "x" + b.screen.height,
            H = b.screen.availWidth + "x" + b.screen.availHeight,
            la = [b.screen.deviceXDPI || "", b.screen.G || ""].join(),
            ma = I(),
            na = v();
        try {
            var S = !!b.localStorage + 0
        } catch (p) {
            S = 1
        }
        S += "";
        try {
            var T = !!b.sessionStorage + 0
        } catch (p) {
            T = 1
        }
        T += "";
        var oa = (b.navigator.cookieEnabled || "") + "",
            pa = (new Date).getTimezoneOffset() + "",
            qa = b.navigator.language || "",
            ra = b.navigator.L || "",
            sa = w(),
            ta = (b.devicePixelRatio || "") + "",
            ua = (b.navigator.hardwareConcurrency || "") + "",
            va = ha() + "",
            wa = b.navigator.i || b.navigator.K ||
            b.window.i || "",
            xa = d(),
            ya = h();
        try {
            var fa = !!b.indexedDB + 0
        } catch (p) {
            fa = 1
        }
        var t = {
            1: u,
            3: ja,
            4: q,
            5: ka,
            6: H,
            7: la,
            8: ma,
            9: na,
            11: S,
            12: T,
            13: oa,
            14: pa,
            15: qa,
            16: ra,
            17: sa,
            18: ta,
            19: ua,
            20: va,
            21: wa,
            22: xa,
            23: ya,
            24: fa + "",
            27: b.navigator.userAgent || "",
            28: [!!l.getBoxObjectFor, !!b.opera].join(),
            29: ["undefined" === typeof b.eval.prototype, "eval" === b.eval.name, -1 != b.eval.toString().indexOf("native")].join(),
            32: "0",
            34: b.navigator.platform || "",
            35: [!!(b.navigator.D || b.navigator.I || b.navigator.M), !!b.navigator.getBattery].join(),
            101: "",
            103: (new Date).getTime() + "",
            104: "",
            106: "",
            107: "12",
            108: l.URL,
            109: l.referrer,
            110: "",
            112: ca,
            113: da,
            114: ea,
            115: G,
            200: "1"
        };
        t["32"] = "" + ((new Date).getTime() - y);
        var U = b.btoa || function (a) {
                return (new ia).encode(a)
            },
            K = 0,
            L = 0,
            M = 0,
            D = 0,
            E = 0,
            F = 0,
            N = 0,
            O = 0,
            P = 0,
            X = "",
            z = 0,
            B = 0,
            W = !1,
            Y = "",
            Z = "",
            aa = "",
            ba = "",
            x = "",
            R = "",
            Q = "";
        this.o = function () {
            m();
            R = "2008";
            Q = "";
            t["106"] = "2008";
            t["104"] = "";
            t["101"] = x;
            try {
                t["110"] = b.localStorage.getItem("abbaidu_ls_key&^%") || ""
            } catch (p) {}
            if (b.navigator.getBattery) try {
                b.navigator.getBattery().then(function (a) {
                    try {
                        Y =
                            "" + a.charging, Z = "" + a.chargingTime, aa = "" + a.dischargingTime, ba = "" + a.level
                    } catch (za) {}
                })
            } catch (p) {}
            e();
            k(function (a) {
                a && (X = a, B = (new Date).getTime(), r(!1))
            });
            b.addEventListener("devicemotion", f, !0);
            l.addEventListener("click", C, !0);
            setTimeout(function () {
                r(!0)
            }, 2E3)
        }
    }

    function f() {
        "interactive" !== l.readyState && "complete" !== l.readyState || u || (u = !0, (new a).o())
    }

    function k(a) {
        try {
            (new Promise(function (g) {
                try {
                    var m = function (a) {
                            if (a = k.exec(a)) a = a[1], "0.0.0.0" !== a && (void 0 === e[a] && d.push(a), e[a] = !0)
                        },
                        c = b.RTCPeerConnection ||
                        b.J || b.webkitRTCPeerConnection;
                    if (c) {
                        var d = [],
                            e = {},
                            f = new c({
                                iceServers: [{
                                    urls: "stun:stun.services.mozilla.com"
                                }]
                            }, {
                                optional: [{
                                    RtpDataChannels: !0
                                }]
                            }),
                            k = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
                        f.onicecandidate = function (a) {
                            a.candidate && m(a.candidate.candidate)
                        };
                        f.createDataChannel("");
                        f.createOffer(function (a) {
                            f.setLocalDescription(a, function () {}, function () {})
                        }, function () {});
                        var h = 0,
                            l = setInterval(function () {
                                try {
                                    if (f.localDescription.sdp.split("\n").forEach(function (a) {
                                        0 !== a.indexOf("a=candidate:") &&
                                            0 !== a.indexOf("c=IN") || m(a)
                                    }), 0 < d.length || 2 < ++h) g(d.join(",")), clearInterval(l)
                                } catch (G) {
                                    g(d.join(",")), clearInterval(l)
                                }
                            }, 1E3)
                    } else g("")
                } catch (G) {
                    a("")
                }
            })).then(function (g) {
                a(g)
            })
        } catch (m) {
            a(null)
        }
    }

    function h() {
        var a = 0,
            m = 0;
        "undefined" !== typeof navigator.maxTouchPoints ? a = navigator.maxTouchPoints : "undefined" !== typeof navigator.msMaxTouchPoints && (a = navigator.msMaxTouchPoints);
        try {
            l.createEvent("TouchEvent"), m = 1
        } catch (C) {}
        return [a, m, !!("ontouchstart" in b) + 0].join()
    }

    function d() {
        var a = b.navigator;
        return [a.product,
            a.productSub, a.vendor, a.vendorSub, a.appCodeName, a.appName, a.platform, eval.toString().length, a.F || ""
        ].join()
    }

    function A() {
        var a = l.createElement("canvas");
        try {
            return !(!a.getContext || !a.getContext("2d")) + 0
        } catch (m) {
            return 0
        }
    }

    function c(a, b, c) {
        if (!A()) return "";
        var g = [],
            m = l.createElement("canvas");
        m.width = 2E3;
        m.height = 200;
        m.style.display = "inline";
        var e = m.getContext("2d");
        if (c) try {
            e.lineWidth = 1, e.lineCap = "butt", e.lineJoin = "miter", e.miterLimit = 10, e.lineDashOffset = 0, e.textAlign = "start", e.textBaseline = "alphabetic",
                e.direction = "inherit", e.strokeStyle = "#000", e.shadowBlur = 0, e.shadowColor = 0, e.shadowOffsetX = 0, e.shadowOffsetY = 0, e.globalAlpha = 1, e.H = !0
        } catch (y) {}
        e.rect(0, 0, 10, 10);
        e.rect(2, 2, 6, 6);
        e.isPointInPath && g.push("canvas winding:" + (!1 === e.isPointInPath(5, 5, "evenodd") ? "yes" : "no"));
        e.textBaseline = "alphabetic";
        e.fillStyle = "#f60";
        e.fillRect(125, 1, 62, 20);
        e.fillStyle = "#069";
        e.font = "11pt Arial";
        e.fillText(b, 2, 15);
        e.fillStyle = "rgba(102, 204, 0, 0.2)";
        e.font = "18pt Arial";
        e.fillText(b, 4, 45);
        a && (e.globalCompositeOperation =
            "multiply");
        e.fillStyle = "rgb(255,0,255)";
        e.beginPath();
        e.arc(50, 50, 50, 0, 2 * Math.PI, !0);
        e.closePath();
        e.fill();
        e.fillStyle = "rgb(0,255,255)";
        e.beginPath();
        e.arc(100, 50, 50, 0, 2 * Math.PI, !0);
        e.closePath();
        e.fill();
        e.fillStyle = "rgb(255,255,0)";
        e.beginPath();
        e.arc(75, 100, 50, 0, 2 * Math.PI, !0);
        e.closePath();
        e.fill();
        e.fillStyle = "rgb(255,0,255)";
        e.arc(75, 75, 75, 0, 2 * Math.PI, !0);
        e.arc(75, 75, 25, 0, 2 * Math.PI, !0);
        e.fill("evenodd");
        g.push("canvas fp:" + m.toDataURL());
        return n.f(g.join("~"))
    }

    function I() {
        for (var a = "", m =
            b.navigator.plugins, c = 0; c < m.length; c++) a = c === m.length - 1 ? a + encodeURIComponent(m[c].name) : a + (encodeURIComponent(m[c].name) + ",");
        return a
    }

    function v() {
        for (var a = "", m = b.navigator.mimeTypes, c = 0; c < m.length; c++) a = c === m.length - 1 ? a + encodeURIComponent(m[c].description) : a + (encodeURIComponent(m[c].description) + ",");
        return a
    }

    function w() {
        function a(a, b) {
            return a.canPlayType(b).replace(/^no$/, "0").replace(/^probably$/, "1").replace(/^maybe$/, "1")
        }
        var c = l.createElement("video"),
            b = !1;
        try {
            if (b = !!c.canPlayType) b = new Boolean(b),
                b.s = a(c, 'video/ogg; codecs="theora"'), b.j = a(c, 'video/mp4; codecs="avc1.42E01E"'), b.B = a(c, 'video/webm; codecs="vp8, vorbis"'), b.A = a(c, 'video/webm; codecs="vp9"'), b.m = a(c, 'application/x-mpegURL; codecs="avc1.42E01E"')
        } catch (V) {}
        return [!!b + 0, b.s || "0", b.j || "0", b.B || "0", b.A || "0", b.m || "0"].join()
    }

    function ha() {
        var a = l.createElement("div");
        a.innerHTML = "&nbsp;";
        a.className = "adsbox";
        var b = !1;
        try {
            l.body.appendChild(a), b = (0 === l.getElementsByClassName("adsbox")[0].offsetHeight) + 0, l.body.removeChild(a)
        } catch (C) {
            b = !1
        }
        return b
    }

    function ia() {
        this.encode = function (a) {
            var b = "",
                c, g = 0;
            a = a.replace(/\r\n/g, "\n");
            var d = "";
            for (c = 0; c < a.length; c++) {
                var e = a.charCodeAt(c);
                128 > e ? d += String.fromCharCode(e) : (127 < e && 2048 > e ? d += String.fromCharCode(e >> 6 | 192) : (d += String.fromCharCode(e >> 12 | 224), d += String.fromCharCode(e >> 6 & 63 | 128)), d += String.fromCharCode(e & 63 | 128))
            }
            for (a = d; g < a.length;) {
                var f = a.charCodeAt(g++);
                d = a.charCodeAt(g++);
                c = a.charCodeAt(g++);
                e = f >> 2;
                f = (f & 3) << 4 | d >> 4;
                var k = (d & 15) << 2 | c >> 6,
                    h = c & 63;
                isNaN(d) ? k = h = 64 : isNaN(c) && (h = 64);
                b = b + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(e) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(f) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(k) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(h)
            }
            return b
        }
    }
    var b = window,
        l = b.document;
    b.__abbaidu_20180306_idagetterf = function () {
        return b.localStorage.getItem("abbaidu_ls_key&^%") || ""
    };
    var n = {
            l: 0,
            C: "",
            b: 8,
            f: function (a) {
                return n.g(n.h(n.w(a),
                    a.length * n.b))
            }, h: function (a, b) {
                a[b >> 5] |= 128 << 24 - b % 32;
                a[15 + (b + 64 >> 9 << 4)] = b;
                b = Array(80);
                for (var c = 1732584193, d = -271733879, g = -1732584194, e = 271733878, f = -1009589776, m = 0; m < a.length; m += 16) {
                    for (var h = c, k = d, l = g, u = e, v = f, q = 0; 80 > q; q++) {
                        b[q] = 16 > q ? a[m + q] : n.c(b[q - 3] ^ b[q - 8] ^ b[q - 14] ^ b[q - 16], 1);
                        var w = n.a(n.a(n.c(c, 5), n.u(q, d, g, e)), n.a(n.a(f, b[q]), n.v(q)));
                        f = e;
                        e = g;
                        g = n.c(d, 30);
                        d = c;
                        c = w
                    }
                    c = n.a(c, h);
                    d = n.a(d, k);
                    g = n.a(g, l);
                    e = n.a(e, u);
                    f = n.a(f, v)
                }
                return [c, d, g, e, f]
            }, u: function (a, b, c, d) {
                return 20 > a ? b & c | ~b & d : 40 > a ? b ^ c ^ d : 60 > a ? b &
                    c | b & d | c & d : b ^ c ^ d
            }, v: function (a) {
                return 20 > a ? 1518500249 : 40 > a ? 1859775393 : 60 > a ? -1894007588 : -899497514
            }, a: function (a, b) {
                var c = (65535 & a) + (65535 & b);
                return (a >> 16) + (b >> 16) + (c >> 16) << 16 | 65535 & c
            }, c: function (a, b) {
                return a << b | a >>> 32 - b
            }, w: function (a) {
                for (var b = [], c = (1 << n.b) - 1, d = 0; d < a.length * n.b; d += n.b) b[d >> 5] |= (a.charCodeAt(d / n.b) & c) << 24 - d % 32;
                return b
            }, g: function (a) {
                for (var b = n.l ? "0123456789ABCDEF" : "0123456789abcdef", c = "", d = 0; d < 4 * a.length; d++) c += b.charAt(a[d >> 2] >> 8 * (3 - d % 4) + 4 & 15) + b.charAt(a[d >> 2] >> 8 * (3 - d % 4) & 15);
                return c
            }
        },
        u = !1;
    b.addEventListener("load", function () {
        f()
    }, !0);
    var H = l.onreadystatechange;
    l.onreadystatechange = function () {
        f();
        if (H) try {
            H()
        } catch (g) {}
    };
    f()
})();