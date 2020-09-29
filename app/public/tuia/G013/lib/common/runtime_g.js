!
function(e) {
  var n = {};
  function t(r) {
    if (n[r]) return n[r].exports;
    var a = n[r] = {
      i: r,
      l: !1,
      exports: {}
    };
    return e[r].call(a.exports, a, a.exports, t),
    a.l = !0,
    a.exports
  }
  t.m = e,
  t.c = n,
  t.d = function(e, n, r) {
    t.o(e, n) || Object.defineProperty(e, n, {
      configurable: !1,
      enumerable: !0,
      get: r
    })
  },
  t.n = function(e) {
    var n = e && e.__esModule ?
    function() {
      return e.
    default
    }:
    function() {
      return e
    };
    return t.d(n, "a", n),
    n
  },
  t.o = function(e, n) {
    return Object.prototype.hasOwnProperty.call(e, n)
  },
  t.p = "",
  t(t.s = 27)
} ({
  27 : function(e, n, t) {
    "use strict";
    var r = o(t(28)),
    a = o(t(29));
    function o(e) {
      return e && e.__esModule ? e: {
      default:
        e
      }
    } (0, r.
  default)(),
    (0, a.
  default)()
  },
  28 : function(e, n, t) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    }),
    n.
  default = function() {
      var e = ["T098review", "T047review", "T009review"].some(function(e) {
        return window.location.pathname.indexOf(e) >= 0
      }),
      n = window.location.search.substr(1).match(new RegExp("(^|&)supportPc=([^&]*)(&|$)", "i")) ? window.location.search.substr(1).match(new RegExp("(^|&)supportPc=([^&]*)(&|$)", "i"))[2] : null,
      t = navigator.platform;
      console.log(navigator.platform)
      e || n || -1 == t.indexOf("Mac") && -1 == t.indexOf("Win") || window.location.replace(location.origin + "/dist/welfareAT02/private/U/U002/Error.html")
    }
  },
  29 : function(e, n, t) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    }),
    n.
  default = function() {
      var e = function() {
        try {
          var e = location.search;
          e.indexOf("?");
          e = e.match(/\?([^#]+)/)[1];
          for (var n = {},
          t = e.split("&"), r = 0; r < t.length; r++) {
            var a = t[r].split("=");
            n[a[0]] = a[1]
          }
          return n
        } catch(e) {
          return {}
        }
      } ();
      if (e.appkey && e.appkey.match(new RegExp("-")) && e.appkey.match(new RegExp("-")).index > 0 && e.appkey.length > e.appkey.match(new RegExp("-")).index + 1 || !e.business) {
        e.appkey = "fbca14bb5bb74d5a9b5fa165ad78a15a",
        e.business = "money-19";
        var n = "";
        for (var t in e) if (e.hasOwnProperty(t)) {
          var r = e[t];
          n += ( - 1 === n.indexOf("?") ? "?": "&") + t + "=" + r
        }
        window.location.href = "" + location.origin + location.pathname + n
      }
    }
  }
});