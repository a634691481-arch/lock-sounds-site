(function (I) {
  function k(d) {
    var g = d[0];
    var w = d[1];
    var E = d[2];
    var x,
      A,
      J = 0,
      N = [];
    for (; J < g.length; J++) {
      A = g[J];
      if (Object.prototype.hasOwnProperty.call(C, A) && C[A]) {
        N.push(C[A][0]);
      }
      C[A] = 0;
    }
    for (x in w) {
      if (Object.prototype.hasOwnProperty.call(w, x)) {
        I[x] = w[x];
      }
    }
    if (v) v(d);
    while (N.length) {
      N.shift()();
    }
    T.push.apply(T, E || []);
    return _();
  }
  function _() {
    var d;
    for (var g = 0; g < T.length; g++) {
      var w = T[g];
      var E = true;
      for (var x = 1; x < w.length; x++) {
        var A = w[x];
        if (C[A] !== 0) E = false;
      }
      if (E) {
        T.splice(g--, 1);
        d = t((t.s = w[0]));
      }
    }
    return d;
  }
  var y = {};
  var C = { "login/loginpage/loginpage": 0 };
  var T = [];
  function t(d) {
    if (y[d]) {
      return y[d].exports;
    }
    var g = (y[d] = { i: d, l: false, exports: {} });
    I[d].call(g.exports, g, g.exports, t);
    g.l = true;
    return g.exports;
  }
  t.m = I;
  t.c = y;
  t.d = function (d, g, w) {
    if (!t.o(d, g)) {
      Object.defineProperty(d, g, { enumerable: true, get: w });
    }
  };
  t.r = function (d) {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(d, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(d, "__esModule", { value: true });
  };
  t.t = function (d, g) {
    if (g & 1) d = t(d);
    if (g & 8) return d;
    if (g & 4 && typeof d === "object" && d && d.__esModule) return d;
    var w = Object.create(null);
    t.r(w);
    Object.defineProperty(w, "default", { enumerable: true, value: d });
    if (g & 2 && typeof d != "string")
      for (var E in d)
        t.d(
          w,
          E,
          function (x) {
            return d[x];
          }.bind(null, E),
        );
    return w;
  };
  t.n = function (d) {
    var g =
      d && d.__esModule
        ? function w() {
            return d["default"];
          }
        : function w() {
            return d;
          };
    t.d(g, "a", g);
    return g;
  };
  t.o = function (d, g) {
    return Object.prototype.hasOwnProperty.call(d, g);
  };
  t.p = "/mpres/zh_CN/htmledition/";
  var r = (window["webpackJsonp"] = window["webpackJsonp"] || []);
  var u = r.push.bind(r);
  r.push = k;
  r = r.slice();
  for (var o = 0; o < r.length; o++) k(r[o]);
  var v = u;
  T.push([
    57,
    "pages/vendors~advanced/menusetting/menusetting~advanced/menusetting4Web1~album/edit/edit~album/list/list~b~vendors",
    "pages/modules~advanced/menusetting/menusetting~advanced/menusetting4Web1~album/edit/edit~album/list/list~b~modules",
    "pages/threerd~advanced/menusetting/menusetting~advanced/menusetting4Web1~album/edit/edit~album/list/list~b~threerd",
    "pages/modules~advanced/menusetting/menusetting~advanced/menusetting4Web1~album/edit/edit~city/service_edit~modules",
    "pages/default~advanced/menusetting/menusetting~advanced/menusetting4Web1~album/edit/edit~album/list/list~b~default",
  ]);
  return _();
})({
  "../../packages/mmbizweb-web2-common/biz_common/utils/url/parse.js": function (I, k, _) {
    var y;
    !((y = function (C) {
      function T(o) {
        var v = o.length,
          d = o.indexOf("?"),
          g = o.indexOf("#");
        g = g == -1 ? v : g;
        d = d == -1 ? g : d;
        var w = o.substr(0, d);
        var E = o.substr(d + 1, g - d - 1);
        var x = o.substr(g + 1);
        return { host: w, query_str: E, hash: x };
      }
      function t(o, v, d) {
        var g = T(o);
        var w = g.query_str;
        var E = [];
        for (var x in v) {
          if (v.hasOwnProperty(x)) {
            E.push(x + "=" + (d ? v[x] : encodeURIComponent(v[x])));
          }
        }
        if (E.length > 0) {
          w += (w != "" ? "&" : "") + E.join("&");
        }
        return g.host + (w != "" ? "?" + w : "") + (g.hash != "" ? "#" + g.hash : "");
      }
      function r(o, v, d, g) {
        o = o || location.href;
        var w = o.indexOf("&");
        var E = o.length;
        var x = o
          .replace(/^[\w\d]+:[\/\\]+/g, "")
          .split("")
          .reverse();
        if (!Array.prototype.indexOf) {
          Array.prototype.indexOf = function (re, _e) {
            var V;
            if (this == null) {
              throw new TypeError('"this" is null or not defined');
            }
            var se = Object(this);
            var a = se.length >>> 0;
            if (a === 0) {
              return -1;
            }
            var l = +_e || 0;
            if (Math.abs(l) === Infinity) {
              l = 0;
            }
            if (l >= a) {
              return -1;
            }
            V = Math.max(l >= 0 ? l : a - Math.abs(l), 0);
            while (V < a) {
              if (V in se && se[V] === re) {
                return V;
              }
              V++;
            }
            return -1;
          };
        }
        var A = E - 1 - x.indexOf("/");
        if (w != -1 && o.indexOf("?") == -1 && w > A) {
          o = o.replace("&", "?");
        }
        var J = new RegExp("([\\?&]" + v + "=)[^&#]*");
        if (!o.match(J)) {
          var N = T(o);
          var ne = N.hash ? "#" + N.hash : "";
          o = o.replace(ne, "");
          var ae = o.indexOf("?");
          if (ae == -1) {
            return o + "?" + v + "=" + d + ne;
          } else {
            if (ae == o.length - 1) {
              return o + v + "=" + d + ne;
            }
            return o + "&" + v + "=" + d + ne;
          }
        }
        if (g === true) {
          return o.replace(J, "$1" + d);
        }
        return o;
      }
      function u(o, v) {
        var d = arguments[1] || window.location.search,
          g = new RegExp("(^|&)" + o + "=([^&]*)(&|$)"),
          w = d.substr(d.indexOf("?") + 1).match(g);
        return w != null ? w[2] : "";
      }
      return { parseUrl: T, join: t, addParam: r, getQuery: u };
    }.call(k, _, k, I)),
    y !== void 0 && (I.exports = y));
  },
  "../../packages/mmbizweb-web2-common/common/wx/hash.js": function (I, k, _) {
    var y;
    !((y = function (C, T, t) {
      t.exports = {
        setHash: function r(u) {
          setTimeout(function () {
            location.hash = u;
          }, 0);
        },
        getHash: function r(u) {
          var o = u || location.hash;
          return o ? o.replace(/.*#/, "") : "";
        },
        addParam: function r(u, o, v, d) {
          u = u || location.href;
          var g = u.indexOf("&");
          var w = u.length;
          var E = u
            .replace(/^[\w\d]+:[\/\\]+/g, "")
            .split("")
            .reverse();
          var x = w - 1 - E.indexOf("/");
          if (g !== -1 && u.indexOf("?") === -1 && g > x) {
            u = u.replace("&", "?");
          }
          var A = new RegExp("([\\?&]" + o + "=)[^&#]*");
          if (!u.match(A)) {
            var J = u.indexOf("?");
            if (J === -1) {
              return u + "?" + o + "=" + v;
            } else {
              if (J === u.length - 1) {
                return u + o + "=" + v;
              }
              return u + "&" + o + "=" + v;
            }
          }
          if (d === true) {
            return u.replace(A, "$1" + v);
          }
          return u;
        },
        getHashModelName: function r() {
          var u = this.getHash();
          if (u == "") return "";
          return u ? u.split("&")[0].split("=")[0] : [];
        },
        getHashActionName: function r() {
          var u = this.getHash();
          if (u == "") return "";
          return (u ? u.split("&") : [])[0].split("=")[1];
        },
        getHashParam: function r(u) {
          var o = this.getHash().match(new RegExp("(^|&)" + u + "=([^&]*)(&|$)"));
          return o != null ? o[2] : "";
        },
        getUrlParam: function r(u, o) {
          var v = arguments[1] || window.location.search,
            d = new RegExp("(^|&)" + u + "=([^&]*)(&|$)"),
            g = v.substr(v.indexOf("?") + 1).match(d);
          return g != null ? g[2] : "";
        },
        getParams: function r() {
          var u = [],
            o = this.getHash();
          paramArr = o ? o.split("&") : [];
          for (var v = 1, d = paramArr.length; v < d; v++) {
            u.push(paramArr[v]);
          }
          return u;
        },
        decodeUrl: function r(u) {
          u = decodeURIComponent(u);
          var o = this.parseUrl(u),
            v = [];
          $.each(o.params, function (g, w) {
            w = decodeURIComponent(w);
            v.push(g + "=" + w);
          });
          var d = u.split("?")[0];
          return d + "?" + v.join("&");
        },
      };
    }.call(k, _, k, I)),
    y !== void 0 && (I.exports = y));
  },
  "../../packages/mmbizweb-web2-common/modules/dialog/oauth_check_pwd_dialog.vue": function (I, k, _) {
    "use strict";
    _.r(k);
    var y = _(
      "../../packages/mmbizweb-web2-common/modules/dialog/oauth_check_pwd_dialog.vue?vue&type=template&id=fe099466",
    );
    var C = _("../../packages/mmbizweb-web2-common/modules/dialog/oauth_check_pwd_dialog.vue?vue&type=script&lang=js");
    for (var T in C)
      if (T !== "default")
        (function (o) {
          _.d(k, o, function () {
            return C[o];
          });
        })(T);
    var t = _(
      "../../packages/mmbizweb-web2-common/modules/dialog/oauth_check_pwd_dialog.vue?vue&type=style&index=0&id=fe099466&prod&lang=less",
    );
    var r = _("./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
    var u = Object(r["a"])(C["default"], y["render"], y["staticRenderFns"], false, null, null, null);
    k["default"] = u.exports;
  },
  "../../packages/mmbizweb-web2-common/modules/dialog/oauth_check_pwd_dialog.vue?vue&type=script&lang=js": function (
    I,
    k,
    _,
  ) {
    "use strict";
    _.r(k);
    var y = _(
      "./node_modules/thread-loader/dist/cjs.js!./node_modules/cache-loader/dist/cjs.js!./node_modules/@tencent/webpack-vat-loader/index.js?!./node_modules/babel-loader/lib/index.js?!./webpack_loader/i18n-loader.js?!./node_modules/vue-loader/lib/index.js?!./webpack_loader/i18n-loader.js?!../../packages/mmbizweb-web2-common/modules/dialog/oauth_check_pwd_dialog.vue?vue&type=script&lang=js",
    );
    var C = _.n(y);
    for (var T in y)
      if (T !== "default")
        (function (t) {
          _.d(k, t, function () {
            return y[t];
          });
        })(T);
    k["default"] = C.a;
  },
  "../../packages/mmbizweb-web2-common/modules/dialog/oauth_check_pwd_dialog.vue?vue&type=style&index=0&id=fe099466&prod&lang=less":
    function (I, k, _) {
      "use strict";
    },
  "../../packages/mmbizweb-web2-common/modules/dialog/oauth_check_pwd_dialog.vue?vue&type=template&id=fe099466":
    function (I, k, _) {
      "use strict";
      var y = _(
        "./node_modules/cache-loader/dist/cjs.js!./node_modules/@tencent/webpack-vat-loader/index.js?!./node_modules/babel-loader/lib/index.js?!./webpack_loader/i18n-loader.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./webpack_loader/i18n-loader.js?!../../packages/mmbizweb-web2-common/modules/dialog/oauth_check_pwd_dialog.vue?vue&type=template&id=fe099466",
      );
      var C = _.n(y);
      if (_.o(y, "render"))
        _.d(k, "render", function () {
          return y["render"];
        });
      if (_.o(y, "staticRenderFns"))
        _.d(k, "staticRenderFns", function () {
          return y["staticRenderFns"];
        });
    },
  "../../packages/mmbizweb-web2-common/modules/dialog/oauth_set_pwd_dialog.vue": function (I, k, _) {
    "use strict";
    _.r(k);
    var y = _(
      "../../packages/mmbizweb-web2-common/modules/dialog/oauth_set_pwd_dialog.vue?vue&type=template&id=3ccd8b95",
    );
    var C = _("../../packages/mmbizweb-web2-common/modules/dialog/oauth_set_pwd_dialog.vue?vue&type=script&lang=js");
    for (var T in C)
      if (T !== "default")
        (function (o) {
          _.d(k, o, function () {
            return C[o];
          });
        })(T);
    var t = _(
      "../../packages/mmbizweb-web2-common/modules/dialog/oauth_set_pwd_dialog.vue?vue&type=style&index=0&id=3ccd8b95&prod&lang=less",
    );
    var r = _("./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
    var u = Object(r["a"])(C["default"], y["render"], y["staticRenderFns"], false, null, null, null);
    k["default"] = u.exports;
  },
  "../../packages/mmbizweb-web2-common/modules/dialog/oauth_set_pwd_dialog.vue?vue&type=script&lang=js": function (
    I,
    k,
    _,
  ) {
    "use strict";
    _.r(k);
    var y = _(
      "./node_modules/thread-loader/dist/cjs.js!./node_modules/cache-loader/dist/cjs.js!./node_modules/@tencent/webpack-vat-loader/index.js?!./node_modules/babel-loader/lib/index.js?!./webpack_loader/i18n-loader.js?!./node_modules/vue-loader/lib/index.js?!./webpack_loader/i18n-loader.js?!../../packages/mmbizweb-web2-common/modules/dialog/oauth_set_pwd_dialog.vue?vue&type=script&lang=js",
    );
    var C = _.n(y);
    for (var T in y)
      if (T !== "default")
        (function (t) {
          _.d(k, t, function () {
            return y[t];
          });
        })(T);
    k["default"] = C.a;
  },
  "../../packages/mmbizweb-web2-common/modules/dialog/oauth_set_pwd_dialog.vue?vue&type=style&index=0&id=3ccd8b95&prod&lang=less":
    function (I, k, _) {
      "use strict";
    },
  "../../packages/mmbizweb-web2-common/modules/dialog/oauth_set_pwd_dialog.vue?vue&type=template&id=3ccd8b95":
    function (I, k, _) {
      "use strict";
      var y = _(
        "./node_modules/cache-loader/dist/cjs.js!./node_modules/@tencent/webpack-vat-loader/index.js?!./node_modules/babel-loader/lib/index.js?!./webpack_loader/i18n-loader.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./webpack_loader/i18n-loader.js?!../../packages/mmbizweb-web2-common/modules/dialog/oauth_set_pwd_dialog.vue?vue&type=template&id=3ccd8b95",
      );
      var C = _.n(y);
      if (_.o(y, "render"))
        _.d(k, "render", function () {
          return y["render"];
        });
      if (_.o(y, "staticRenderFns"))
        _.d(k, "staticRenderFns", function () {
          return y["staticRenderFns"];
        });
    },
  "./node_modules/cache-loader/dist/cjs.js!./node_modules/@tencent/webpack-vat-loader/index.js?!./node_modules/babel-loader/lib/index.js?!./webpack_loader/i18n-loader.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./webpack_loader/i18n-loader.js?!../../packages/mmbizweb-web2-common/modules/dialog/oauth_check_pwd_dialog.vue?vue&type=template&id=fe099466":
    function (I, k, _) {
      "use strict";
      Object.defineProperty(k, "__esModule", { value: true });
      k.staticRenderFns = k.render = void 0;
      var y = (k.render = function T() {
        var t = this,
          r = t._self._c;
        return t.innerShowDialog
          ? r(
              "mp-dialog",
              {
                attrs: { width: 600, height: 484, weui: "true", "wrap-class": "oauth-check-pwd-dialog" },
                on: { close: t.closeDialog },
                model: {
                  value: t.innerShowDialog,
                  callback: function u(o) {
                    t.innerShowDialog = o;
                  },
                  expression: "innerShowDialog",
                },
              },
              [
                r("div", { attrs: { slot: "header" }, slot: "header" }, [t._v("\u9A8C\u8BC1\u5BC6\u7801")]),
                t._v(" "),
                r("p", { staticClass: "oauth-check-pwd-dialog__desc" }, [
                  t._v(
                    "\u4E3A\u4FDD\u969C\u8D26\u53F7\u300C" +
                      t._s(t.nickname) +
                      "\u300D\u5B89\u5168\uFF0C\u8BF7\u8F93\u5165\u5BC6\u7801\u9A8C\u8BC1",
                  ),
                ]),
                t._v(" "),
                r("div", { staticClass: "oauth-check-pwd-dialog__body" }, [
                  r("div", { staticClass: "oauth-check-pwd-dialog__form" }, [
                    t.hasMailOrQQ
                      ? r("div", { staticClass: "oauth-check-pwd-dialog__row" }, [
                          r("label", { staticClass: "oauth-check-pwd-dialog__label" }, [
                            t._v(t._s(t.accountTypeLabel)),
                          ]),
                          t._v(" "),
                          r("div", { staticClass: "oauth-check-pwd-dialog__field" }, [
                            r("span", { staticClass: "oauth-check-pwd-dialog__value" }, [
                              t._v(t._s(t.accountTypeValue)),
                            ]),
                          ]),
                        ])
                      : t._e(),
                    t._v(" "),
                    r("div", { staticClass: "oauth-check-pwd-dialog__row oauth-check-pwd-dialog__row--input" }, [
                      r("label", { staticClass: "oauth-check-pwd-dialog__label" }, [t._v("\u5BC6\u7801")]),
                      t._v(" "),
                      r(
                        "div",
                        { staticClass: "oauth-check-pwd-dialog__field" },
                        [
                          r("mp-input", {
                            ref: "pwdInput",
                            attrs: {
                              type: "password",
                              placeholder: "\u8BF7\u8F93\u5165\u8D26\u53F7\u5BC6\u7801",
                              clearable: true,
                              filter: "trim",
                              autocomplete: "off",
                            },
                            on: {
                              keypress: function u(o) {
                                if (!o.type.indexOf("key") && t._k(o.keyCode, "enter", 13, o.key, "Enter")) return null;
                                return t.onSubmit.apply(null, arguments);
                              },
                            },
                            model: {
                              value: t.pwd,
                              callback: function u(o) {
                                t.pwd = o;
                              },
                              expression: "pwd",
                            },
                          }),
                          t._v(" "),
                          !t.hasMailOrQQ
                            ? r("div", { staticClass: "oauth-check-pwd-dialog__hint-inline" }, [
                                t._v(
                                  "\u5982\u5FD8\u8BB0\u5BC6\u7801\uFF0C\u8BF7\u7BA1\u7406\u5458\u5728\u516C\u4F17\u5E73\u53F0\u7F51\u9875\u7248\u626B\u7801\u767B\u5F55\u8FDB\u884C\u627E\u56DE",
                                ),
                              ])
                            : t._e(),
                        ],
                        1,
                      ),
                    ]),
                    t._v(" "),
                    r("div", { staticClass: "oauth-check-pwd-dialog__forget-row" }, [
                      r(
                        "a",
                        {
                          staticClass: "oauth-check-pwd-dialog__forget",
                          attrs: { href: "javascript:;" },
                          on: { click: t.onForgetPwd },
                        },
                        [t._v("\u627E\u56DE\u5BC6\u7801")],
                      ),
                    ]),
                  ]),
                ]),
                t._v(" "),
                r(
                  "div",
                  { staticClass: "oauth-check-pwd-dialog__footer", attrs: { slot: "footer" }, slot: "footer" },
                  [
                    r(
                      "mp-button",
                      {
                        staticClass: "oauth-check-pwd-dialog__submit",
                        attrs: { type: "primary", disabled: !t.pwd, loading: t.submitting },
                        on: { click: t.onSubmit },
                      },
                      [t._v("\u786E\u5B9A")],
                    ),
                  ],
                  1,
                ),
              ],
            )
          : t._e();
      });
      var C = (k.staticRenderFns = []);
    },
  "./node_modules/cache-loader/dist/cjs.js!./node_modules/@tencent/webpack-vat-loader/index.js?!./node_modules/babel-loader/lib/index.js?!./webpack_loader/i18n-loader.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./webpack_loader/i18n-loader.js?!../../packages/mmbizweb-web2-common/modules/dialog/oauth_set_pwd_dialog.vue?vue&type=template&id=3ccd8b95":
    function (I, k, _) {
      "use strict";
      Object.defineProperty(k, "__esModule", { value: true });
      k.staticRenderFns = k.render = void 0;
      var y = (k.render = function T() {
        var t = this,
          r = t._self._c;
        return t.innerShowDialog
          ? r(
              "mp-dialog",
              {
                class: { "oauth-set-pwd-dialog--success": t.step === "success" },
                attrs: { width: 600, height: 484, weui: "true", "wrap-class": "oauth-set-pwd-dialog" },
                on: { close: t.closeDialog },
                model: {
                  value: t.innerShowDialog,
                  callback: function u(o) {
                    t.innerShowDialog = o;
                  },
                  expression: "innerShowDialog",
                },
              },
              [
                r("div", { attrs: { slot: "header" }, slot: "header" }, [t._v("\u8BBE\u7F6E\u5BC6\u7801")]),
                t._v(" "),
                t.step !== "success"
                  ? r("p", { staticClass: "oauth-set-pwd-dialog__desc" }, [
                      t._v(
                        "\u4E3A\u4FDD\u969C\u8D26\u53F7\u300C" +
                          t._s(t.nickname) +
                          "\u300D\u5B89\u5168\uFF0C\u9700\u9A8C\u8BC1\u624B\u673A\u5E76\u8BBE\u7F6E\u5BC6\u7801\uFF0C\u5BC6\u7801\u81F3\u5C11\u75318\u4E2A\u5B57\u7B26\u7EC4\u6210\uFF0C\u5FC5\u987B\u5305\u542B\u6570\u5B57\u3001\u5B57\u6BCD\uFF0C\u533A\u5206\u5927\u5C0F\u5199",
                      ),
                    ])
                  : t._e(),
                t._v(" "),
                t.step === "phone"
                  ? r("div", { staticClass: "oauth-set-pwd-dialog__body" }, [
                      r("div", { staticClass: "oauth-set-pwd-dialog__form" }, [
                        r("div", { staticClass: "oauth-set-pwd-dialog__row" }, [
                          r("label", { staticClass: "oauth-set-pwd-dialog__label" }, [t._v("\u624B\u673A\u53F7")]),
                          t._v(" "),
                          r("div", { staticClass: "oauth-set-pwd-dialog__field" }, [
                            r("span", { staticClass: "oauth-set-pwd-dialog__value" }, [t._v(t._s(t.phoneWithMask))]),
                          ]),
                        ]),
                        t._v(" "),
                        r("div", { staticClass: "oauth-set-pwd-dialog__row oauth-set-pwd-dialog__row--input" }, [
                          r("label", { staticClass: "oauth-set-pwd-dialog__label" }, [t._v("\u9A8C\u8BC1\u7801")]),
                          t._v(" "),
                          r("div", { staticClass: "oauth-set-pwd-dialog__field" }, [
                            r("div", { staticClass: "oauth-set-pwd-dialog__vcode-wrap" }, [
                              r("input", {
                                directives: [
                                  { name: "model", rawName: "v-model", value: t.verifyCode, expression: "verifyCode" },
                                ],
                                ref: "codeInput",
                                staticClass: "oauth-set-pwd-dialog__vcode-input",
                                attrs: {
                                  type: "text",
                                  placeholder: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",
                                  maxlength: "6",
                                  autocomplete: "off",
                                },
                                domProps: { value: t.verifyCode },
                                on: {
                                  keypress: function u(o) {
                                    if (!o.type.indexOf("key") && t._k(o.keyCode, "enter", 13, o.key, "Enter"))
                                      return null;
                                    return t.onPhoneNext.apply(null, arguments);
                                  },
                                  input: function u(o) {
                                    if (o.target.composing) return;
                                    t.verifyCode = o.target.value;
                                  },
                                },
                              }),
                              t._v(" "),
                              t.verifyCode
                                ? r("i", {
                                    staticClass: "oauth-set-pwd-dialog__vcode-clear",
                                    on: { click: t.onClearVerifyCode },
                                  })
                                : t._e(),
                              t._v(" "),
                              r(
                                "a",
                                {
                                  staticClass: "oauth-set-pwd-dialog__vcode-btn",
                                  class: { "oauth-set-pwd-dialog__vcode-btn--disabled": t.cdLeft > 0 || t.smsSending },
                                  attrs: { href: "javascript:;" },
                                  on: { click: t.onSendSms },
                                },
                                [
                                  t.cdLeft > 0
                                    ? [t._v("\u91CD\u65B0\u83B7\u53D6(" + t._s(t.cdLeft) + "s)")]
                                    : [t._v("\u83B7\u53D6\u9A8C\u8BC1\u7801")],
                                ],
                                2,
                              ),
                            ]),
                          ]),
                        ]),
                      ]),
                    ])
                  : t.step === "setPwd"
                    ? r("div", { staticClass: "oauth-set-pwd-dialog__body" }, [
                        r("div", { staticClass: "oauth-set-pwd-dialog__form" }, [
                          r("div", { staticClass: "oauth-set-pwd-dialog__row oauth-set-pwd-dialog__row--input" }, [
                            r("label", { staticClass: "oauth-set-pwd-dialog__label" }, [
                              t._v("\u8BBE\u7F6E\u5BC6\u7801"),
                            ]),
                            t._v(" "),
                            r(
                              "div",
                              { staticClass: "oauth-set-pwd-dialog__field" },
                              [
                                r("mp-input", {
                                  ref: "newPwdInput",
                                  attrs: {
                                    type: "password",
                                    placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                                    clearable: true,
                                    filter: "trim",
                                    autocomplete: "off",
                                  },
                                  model: {
                                    value: t.newPwd,
                                    callback: function u(o) {
                                      t.newPwd = o;
                                    },
                                    expression: "newPwd",
                                  },
                                }),
                              ],
                              1,
                            ),
                          ]),
                          t._v(" "),
                          r("div", { staticClass: "oauth-set-pwd-dialog__row oauth-set-pwd-dialog__row--input" }, [
                            r("label", { staticClass: "oauth-set-pwd-dialog__label" }, [
                              t._v("\u786E\u8BA4\u5BC6\u7801"),
                            ]),
                            t._v(" "),
                            r(
                              "div",
                              { staticClass: "oauth-set-pwd-dialog__field" },
                              [
                                r("mp-input", {
                                  attrs: {
                                    type: "password",
                                    placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801",
                                    clearable: true,
                                    filter: "trim",
                                    autocomplete: "off",
                                  },
                                  on: {
                                    keypress: function u(o) {
                                      if (!o.type.indexOf("key") && t._k(o.keyCode, "enter", 13, o.key, "Enter"))
                                        return null;
                                      return t.onSetPwdSubmit.apply(null, arguments);
                                    },
                                  },
                                  model: {
                                    value: t.confirmPwd,
                                    callback: function u(o) {
                                      t.confirmPwd = o;
                                    },
                                    expression: "confirmPwd",
                                  },
                                }),
                              ],
                              1,
                            ),
                          ]),
                        ]),
                      ])
                    : t.step === "success"
                      ? r(
                          "div",
                          { staticClass: "oauth-set-pwd-dialog__success" },
                          [r("mp-msg", { attrs: { icon: "success", title: "\u5BC6\u7801\u8BBE\u7F6E\u6210\u529F" } })],
                          1,
                        )
                      : t._e(),
                t._v(" "),
                r(
                  "div",
                  { staticClass: "oauth-set-pwd-dialog__footer", attrs: { slot: "footer" }, slot: "footer" },
                  [
                    t.step === "phone"
                      ? r(
                          "mp-button",
                          {
                            staticClass: "oauth-set-pwd-dialog__submit",
                            attrs: { type: "primary", disabled: !t.verifyCode, loading: t.submitting },
                            on: { click: t.onPhoneNext },
                          },
                          [t._v("\u4E0B\u4E00\u6B65")],
                        )
                      : t.step === "setPwd"
                        ? r(
                            "mp-button",
                            {
                              staticClass: "oauth-set-pwd-dialog__submit",
                              attrs: { type: "primary", disabled: !t.newPwd || !t.confirmPwd, loading: t.submitting },
                              on: { click: t.onSetPwdSubmit },
                            },
                            [t._v("\u786E\u5B9A")],
                          )
                        : t.step === "success"
                          ? r(
                              "mp-button",
                              {
                                staticClass: "oauth-set-pwd-dialog__submit",
                                attrs: { type: "default" },
                                on: { click: t.onFinish },
                              },
                              [t._v("\u6211\u77E5\u9053\u4E86")],
                            )
                          : t._e(),
                  ],
                  1,
                ),
              ],
            )
          : t._e();
      });
      var C = (k.staticRenderFns = []);
    },
  "./node_modules/thread-loader/dist/cjs.js!./node_modules/cache-loader/dist/cjs.js!./node_modules/@tencent/webpack-vat-loader/index.js?!./node_modules/babel-loader/lib/index.js?!./webpack_loader/i18n-loader.js?!./node_modules/vue-loader/lib/index.js?!./webpack_loader/i18n-loader.js?!../../packages/mmbizweb-web2-common/modules/dialog/oauth_check_pwd_dialog.vue?vue&type=script&lang=js":
    function (I, k, _) {
      "use strict";
      Object.defineProperty(k, "__esModule", { value: true });
      k.default = void 0;
      var y = _("../../packages/mmbizweb-web2-common/modules/utils/cgi.js");
      var C = _("./src/3rd/md5/md5.js");
      var T = "2011407726";
      var t = (k.default = {
        name: "mp-oauth-check-pwd-dialog",
        props: {
          showDialog: { type: Boolean, default: false },
          accountInfo: {
            type: Object,
            default: function r() {
              return {};
            },
          },
          phoneWithMask: { type: String, default: "" },
        },
        data: function r() {
          return { innerShowDialog: false, pwd: "", submitting: false, needWaterProof: false };
        },
        computed: {
          nickname: function r() {
            return this.accountInfo.nickname || this.accountInfo.username || "";
          },
          hasMailOrQQ: function r() {
            return !!(this.accountInfo.alias || this.accountInfo.email || this.accountInfo.qq);
          },
          accountTypeLabel: function r() {
            return this.accountInfo.alias || this.accountInfo.email ? "\u90AE\u7BB1" : "QQ\u53F7";
          },
          accountTypeValue: function r() {
            return this.accountInfo.alias || this.accountInfo.email || this.accountInfo.qq || "";
          },
        },
        watch: {
          showDialog: {
            handler: function r(u) {
              var o = this;
              this.innerShowDialog = u;
              if (u) {
                this.pwd = "";
                this.submitting = false;
                this.needWaterProof = false;
                this.$nextTick(function () {
                  var v = o.$refs.pwdInput;
                  if (v && typeof v.focus === "function") {
                    v.focus();
                  } else if (v && v.$refs && v.$refs.field) {
                    v.$refs.field.focus();
                  }
                });
              }
            },
            immediate: true,
          },
        },
        methods: {
          closeDialog: function r() {
            this.innerShowDialog = false;
            this.$emit("close");
          },
          onForgetPwd: function r() {
            var u = this.accountInfo.email
              ? "/acct/resetpwd?action=send_email_page&email=".concat(encodeURIComponent(this.accountInfo.email))
              : "/cgi-bin/readtemplate?t=forgetpwd/index_tmpl";
            window.openUrl(u, null, true);
          },
          onSubmit: function r() {
            var u = this;
            if (this.submitting || !this.pwd) return;
            if (this.needWaterProof) {
              this.runCaptcha(function (o, v) {
                return u.doCheckPwd(o, v);
              });
            } else {
              this.doCheckPwd();
            }
          },
          runCaptcha: function r(u) {
            var o = this;
            var v = function g(w) {
              if (w.errorCode || w.errorMessage) {
                o.$tipsErr && o.$tipsErr("\u9A8C\u8BC1\u7801\u9519\u8BEF\uFF0C\u8BF7\u91CD\u8BD5");
                return;
              }
              if (w.ret === 2) {
                o.$tipsErr && o.$tipsErr("\u8BF7\u6ED1\u52A8\u9A8C\u8BC1\u7801");
                return;
              }
              if (w.ret !== 0) {
                o.$tipsErr && o.$tipsErr("\u9A8C\u8BC1\u7801\u9519\u8BEF\uFF0C\u8BF7\u91CD\u8BD5");
                return;
              }
              u(w.ticket, w.randstr);
            };
            try {
              var d = new TencentCaptcha(T, v, { ready: function g() {}, needFeedBack: true, type: "popup" });
              d.show();
            } catch (g) {
              v({
                ret: 0,
                randstr: "@" + Math.random().toString(36).substr(2),
                ticket: "terror_1001__" + Math.floor(Date.now() / 1e3),
                errorCode: 1001,
                errorMessage: "jsload_error",
              });
            }
          },
          doCheckPwd: function r() {
            var u = this;
            var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
            var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
            this.submitting = true;
            var d = {
              username: this.accountInfo.username || "",
              pwd: C((this.pwd || "").substr(0, 16)),
              acct_type: this.accountInfo.acct_type * 1 || 0,
            };
            if (this.needWaterProof) {
              d.verify_ticket = o;
              d.rand_str = v;
            }
            y.post({
              url: "/cgi-bin/oauthlogin?action=oauthcheckpwd",
              data: d,
              success: function g() {
                var w = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                u.submitting = false;
                var E = w.base_resp && w.base_resp.ret;
                switch (E) {
                  case 0:
                    u.innerShowDialog = false;
                    u.$emit("verified");
                    break;
                  case 200008:
                    u.needWaterProof = true;
                    u.runCaptcha(function (x, A) {
                      return u.doCheckPwd(x, A);
                    });
                    break;
                  case 200138:
                    u.$tipsErr &&
                      u.$tipsErr("\u64CD\u4F5C\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5");
                    break;
                  case 200132:
                    u.$tipsErr && u.$tipsErr("\u5BC6\u7801\u9519\u8BEF\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165");
                    u.pwd = "";
                    break;
                  default:
                    u.$tipsErr &&
                      u.$tipsErr(
                        (w.base_resp && w.base_resp.err_msg) ||
                          "\u7CFB\u7EDF\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5",
                      );
                }
              },
              error: function g() {
                u.submitting = false;
                u.$tipsErr && u.$tipsErr("\u7CFB\u7EDF\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5");
              },
            });
          },
        },
      });
    },
  "./node_modules/thread-loader/dist/cjs.js!./node_modules/cache-loader/dist/cjs.js!./node_modules/@tencent/webpack-vat-loader/index.js?!./node_modules/babel-loader/lib/index.js?!./webpack_loader/i18n-loader.js?!./node_modules/vue-loader/lib/index.js?!./webpack_loader/i18n-loader.js?!../../packages/mmbizweb-web2-common/modules/dialog/oauth_set_pwd_dialog.vue?vue&type=script&lang=js":
    function (I, k, _) {
      "use strict";
      Object.defineProperty(k, "__esModule", { value: true });
      k.default = void 0;
      var y = _("../../packages/mmbizweb-web2-common/modules/utils/cgi.js");
      var C = _("./src/3rd/md5/md5.js");
      var T = (k.default = {
        name: "mp-oauth-set-pwd-dialog",
        props: {
          showDialog: { type: Boolean, default: false },
          accountInfo: {
            type: Object,
            default: function t() {
              return {};
            },
          },
          phoneWithMask: { type: String, default: "" },
        },
        data: function t() {
          return {
            innerShowDialog: false,
            step: "phone",
            verifyCode: "",
            newPwd: "",
            confirmPwd: "",
            ticketKey: "",
            submitting: false,
            smsSending: false,
            cdLeft: 0,
            cdTimer: null,
          };
        },
        computed: {
          nickname: function t() {
            return this.accountInfo.nickname || this.accountInfo.username || "";
          },
        },
        watch: {
          showDialog: {
            handler: function t(r) {
              this.innerShowDialog = r;
              if (r) {
                this.resetState();
              } else {
                this.clearCdTimer();
              }
            },
            immediate: true,
          },
        },
        beforeDestroy: function t() {
          this.clearCdTimer();
        },
        methods: {
          resetState: function t() {
            this.step = "phone";
            this.verifyCode = "";
            this.newPwd = "";
            this.confirmPwd = "";
            this.ticketKey = "";
            this.submitting = false;
            this.smsSending = false;
            this.cdLeft = 0;
            this.clearCdTimer();
          },
          clearCdTimer: function t() {
            if (this.cdTimer) {
              clearInterval(this.cdTimer);
              this.cdTimer = null;
            }
          },
          closeDialog: function t() {
            this.innerShowDialog = false;
            this.clearCdTimer();
            if (this.step !== "success") {
              this.$emit("close");
            }
          },
          onSendSms: function t() {
            var r = this;
            if (this.cdLeft > 0 || this.smsSending) return;
            this.smsSending = true;
            y.post({
              url: "/cgi-bin/oauthlogin?action=smsnotify",
              data: { username: this.accountInfo.username },
              success: function u() {
                var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                r.smsSending = false;
                var v = o.base_resp && o.base_resp.ret;
                if (v === 0) {
                  r.startCountdown();
                } else {
                  r.$tipsErr &&
                    r.$tipsErr(
                      (o.base_resp && o.base_resp.err_msg) ||
                        "\u7CFB\u7EDF\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5",
                    );
                }
              },
              error: function u() {
                r.smsSending = false;
                r.$tipsErr && r.$tipsErr("\u7CFB\u7EDF\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5");
              },
            });
          },
          startCountdown: function t() {
            var r = this;
            this.cdLeft = 60;
            this.clearCdTimer();
            this.cdTimer = setInterval(function () {
              r.cdLeft -= 1;
              if (r.cdLeft <= 0) {
                r.clearCdTimer();
              }
            }, 1e3);
          },
          onClearVerifyCode: function t() {
            var r = this;
            this.verifyCode = "";
            this.$nextTick(function () {
              var u = r.$refs.codeInput;
              if (u && typeof u.focus === "function") {
                u.focus();
              }
            });
          },
          onPhoneNext: function t() {
            var r = this;
            if (this.submitting || !this.verifyCode) return;
            this.submitting = true;
            y.post({
              url: "/cgi-bin/oauthlogin?action=smsverify",
              data: { username: this.accountInfo.username, verifycode: this.verifyCode },
              success: function u() {
                var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                r.submitting = false;
                var v = o.base_resp && o.base_resp.ret;
                if (v === 0) {
                  r.ticketKey = o.ticket_key || "";
                  r.step = "setPwd";
                  r.clearCdTimer();
                  r.$nextTick(function () {
                    var d = r.$refs.newPwdInput;
                    if (d && typeof d.focus === "function") {
                      d.focus();
                    } else if (d && d.$refs && d.$refs.field) {
                      d.$refs.field.focus();
                    }
                  });
                } else if (v === -1) {
                  r.$tipsErr && r.$tipsErr("\u9A8C\u8BC1\u7801\u9519\u8BEF\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165");
                } else {
                  r.$tipsErr &&
                    r.$tipsErr(
                      (o.base_resp && o.base_resp.err_msg) ||
                        "\u7CFB\u7EDF\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5",
                    );
                }
              },
              error: function u() {
                r.submitting = false;
                r.$tipsErr && r.$tipsErr("\u7CFB\u7EDF\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5");
              },
            });
          },
          onSetPwdSubmit: function t() {
            var r = this;
            if (this.submitting || !this.newPwd || !this.confirmPwd) return;
            if (this.newPwd !== this.confirmPwd) {
              this.$tipsErr &&
                this.$tipsErr(
                  "\u4E24\u6B21\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165",
                );
              return;
            }
            if (this.newPwd.length < 8) {
              this.$tipsErr && this.$tipsErr("\u5BC6\u7801\u957F\u5EA6\u4E0D\u8DB38\u4F4D");
              return;
            }
            if (this.newPwd.length > 16) {
              this.$tipsErr && this.$tipsErr("\u5BC6\u7801\u957F\u5EA6\u8D85\u8FC716\u4F4D");
              return;
            }
            if (!/^(?=.*\d)(?=.*[A-Za-z])[\x21-\xfe]{8,16}$/.test(this.newPwd)) {
              this.$tipsErr &&
                this.$tipsErr(
                  "\u5BC6\u7801\u5FC5\u987B\u5305\u542B\u6570\u5B57\u3001\u5B57\u6BCD\uFF0C\u533A\u5206\u5927\u5C0F\u5199",
                );
              return;
            }
            this.submitting = true;
            y.post({
              url: "/cgi-bin/oauthlogin?action=setpwd",
              data: {
                username: this.accountInfo.username,
                ticket_key: this.ticketKey,
                pwd: C(this.newPwd.substr(0, 16)),
              },
              success: function u() {
                var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                r.submitting = false;
                var v = o.base_resp && o.base_resp.ret;
                if (v === 0) {
                  r.step = "success";
                  r.$emit("finish");
                } else if (v === 200139) {
                  r.$tipsErr &&
                    r.$tipsErr("\u7968\u636E\u5DF2\u5931\u6548\uFF0C\u8BF7\u91CD\u65B0\u9A8C\u8BC1\u624B\u673A");
                  r.step = "phone";
                  r.verifyCode = "";
                } else {
                  r.$tipsErr &&
                    r.$tipsErr(
                      (o.base_resp && o.base_resp.err_msg) ||
                        "\u7CFB\u7EDF\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5",
                    );
                }
              },
              error: function u() {
                r.submitting = false;
                r.$tipsErr && r.$tipsErr("\u7CFB\u7EDF\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5");
              },
            });
          },
          onFinish: function t() {
            this.innerShowDialog = false;
          },
        },
      });
    },
  "./src/3rd/cookie/cookie.js": function (I, k, _) {
    var y; /*!
     * jQuery Cookie Plugin v1.3.1
     * https://github.com/carhartl/jquery-cookie
     *
     * Copyright 2013 Klaus Hartl
     * Released under the MIT license
     */
    !((y = function (C, T, t) {
      var r = /\+/g;
      function u(E) {
        return E;
      }
      function o(E) {
        var x;
        try {
          x = v(decodeURIComponent(E.replace(r, " ")));
        } catch (A) {
          x = "";
        }
        return x;
      }
      function v(E) {
        if (E.indexOf('"') === 0) {
          E = E.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
        }
        return E;
      }
      function d(E) {
        return w.json ? JSON.parse(E) : E;
      }
      var g = {};
      var w = (g.cookie = function (E, x, A) {
        if (x !== void 0) {
          A = (function (c) {
            for (var R = 1, B = arguments.length; R < B; R++) {
              for (var H in arguments[R]) {
                c[H] = arguments[R][H];
              }
            }
            return c;
          })({}, w.defaults, A);
          if (x === null) {
            A.expires = -1;
          }
          if (typeof A.expires === "number") {
            var J = A.expires,
              N = (A.expires = new Date());
            N.setDate(N.getDate() + J);
          }
          x = w.json ? JSON.stringify(x) : String(x);
          return (document.cookie = [
            encodeURIComponent(E),
            "=",
            w.raw ? x : encodeURIComponent(x),
            A.expires ? "; expires=" + A.expires.toUTCString() : "",
            A.path ? "; path=" + A.path : "",
            A.domain ? "; domain=" + A.domain : "",
            A.secure ? "; secure" : "",
          ].join(""));
        }
        var ne = w.raw ? u : o;
        var ae = document.cookie.split("; ");
        var re = E ? null : {};
        for (var _e = 0, V = ae.length; _e < V; _e++) {
          var se = ae[_e].split("=");
          var a = ne(se.shift());
          var l = ne(se.join("="));
          if (E && E === a) {
            re = d(l);
            break;
          }
          if (!E) {
            re[a] = d(l);
          }
        }
        return re;
      });
      w.defaults = {};
      g.remove = function (E, x) {
        if (this.cookie(E) !== null) {
          this.cookie(E, null, x);
          return true;
        }
        return false;
      };
      t.exports = g;
    }.call(k, _, k, I)),
    y !== void 0 && (I.exports = y));
  },
  "./src/3rd/md5/md5.js": function (I, k, _) {
    "use strict";
    var y;
    !((y = function (C, T, t) {
      function r(a, l) {
        var c = (a & 65535) + (l & 65535),
          R = (a >> 16) + (l >> 16) + (c >> 16);
        return (R << 16) | (c & 65535);
      }
      function u(a, l) {
        return (a << l) | (a >>> (32 - l));
      }
      function o(a, l, c, R, B, H) {
        return r(u(r(r(l, a), r(R, H)), B), c);
      }
      function v(a, l, c, R, B, H, X) {
        return o((l & c) | (~l & R), a, l, B, H, X);
      }
      function d(a, l, c, R, B, H, X) {
        return o((l & R) | (c & ~R), a, l, B, H, X);
      }
      function g(a, l, c, R, B, H, X) {
        return o(l ^ c ^ R, a, l, B, H, X);
      }
      function w(a, l, c, R, B, H, X) {
        return o(c ^ (l | ~R), a, l, B, H, X);
      }
      function E(a, l) {
        a[l >> 5] |= 128 << l % 32;
        a[(((l + 64) >>> 9) << 4) + 14] = l;
        var c,
          R,
          B,
          H,
          X,
          p = 1732584193,
          f = -271733879,
          m = -1732584194,
          h = 271733878;
        for (c = 0; c < a.length; c += 16) {
          R = p;
          B = f;
          H = m;
          X = h;
          p = v(p, f, m, h, a[c], 7, -680876936);
          h = v(h, p, f, m, a[c + 1], 12, -389564586);
          m = v(m, h, p, f, a[c + 2], 17, 606105819);
          f = v(f, m, h, p, a[c + 3], 22, -1044525330);
          p = v(p, f, m, h, a[c + 4], 7, -176418897);
          h = v(h, p, f, m, a[c + 5], 12, 1200080426);
          m = v(m, h, p, f, a[c + 6], 17, -1473231341);
          f = v(f, m, h, p, a[c + 7], 22, -45705983);
          p = v(p, f, m, h, a[c + 8], 7, 1770035416);
          h = v(h, p, f, m, a[c + 9], 12, -1958414417);
          m = v(m, h, p, f, a[c + 10], 17, -42063);
          f = v(f, m, h, p, a[c + 11], 22, -1990404162);
          p = v(p, f, m, h, a[c + 12], 7, 1804603682);
          h = v(h, p, f, m, a[c + 13], 12, -40341101);
          m = v(m, h, p, f, a[c + 14], 17, -1502002290);
          f = v(f, m, h, p, a[c + 15], 22, 1236535329);
          p = d(p, f, m, h, a[c + 1], 5, -165796510);
          h = d(h, p, f, m, a[c + 6], 9, -1069501632);
          m = d(m, h, p, f, a[c + 11], 14, 643717713);
          f = d(f, m, h, p, a[c], 20, -373897302);
          p = d(p, f, m, h, a[c + 5], 5, -701558691);
          h = d(h, p, f, m, a[c + 10], 9, 38016083);
          m = d(m, h, p, f, a[c + 15], 14, -660478335);
          f = d(f, m, h, p, a[c + 4], 20, -405537848);
          p = d(p, f, m, h, a[c + 9], 5, 568446438);
          h = d(h, p, f, m, a[c + 14], 9, -1019803690);
          m = d(m, h, p, f, a[c + 3], 14, -187363961);
          f = d(f, m, h, p, a[c + 8], 20, 1163531501);
          p = d(p, f, m, h, a[c + 13], 5, -1444681467);
          h = d(h, p, f, m, a[c + 2], 9, -51403784);
          m = d(m, h, p, f, a[c + 7], 14, 1735328473);
          f = d(f, m, h, p, a[c + 12], 20, -1926607734);
          p = g(p, f, m, h, a[c + 5], 4, -378558);
          h = g(h, p, f, m, a[c + 8], 11, -2022574463);
          m = g(m, h, p, f, a[c + 11], 16, 1839030562);
          f = g(f, m, h, p, a[c + 14], 23, -35309556);
          p = g(p, f, m, h, a[c + 1], 4, -1530992060);
          h = g(h, p, f, m, a[c + 4], 11, 1272893353);
          m = g(m, h, p, f, a[c + 7], 16, -155497632);
          f = g(f, m, h, p, a[c + 10], 23, -1094730640);
          p = g(p, f, m, h, a[c + 13], 4, 681279174);
          h = g(h, p, f, m, a[c], 11, -358537222);
          m = g(m, h, p, f, a[c + 3], 16, -722521979);
          f = g(f, m, h, p, a[c + 6], 23, 76029189);
          p = g(p, f, m, h, a[c + 9], 4, -640364487);
          h = g(h, p, f, m, a[c + 12], 11, -421815835);
          m = g(m, h, p, f, a[c + 15], 16, 530742520);
          f = g(f, m, h, p, a[c + 2], 23, -995338651);
          p = w(p, f, m, h, a[c], 6, -198630844);
          h = w(h, p, f, m, a[c + 7], 10, 1126891415);
          m = w(m, h, p, f, a[c + 14], 15, -1416354905);
          f = w(f, m, h, p, a[c + 5], 21, -57434055);
          p = w(p, f, m, h, a[c + 12], 6, 1700485571);
          h = w(h, p, f, m, a[c + 3], 10, -1894986606);
          m = w(m, h, p, f, a[c + 10], 15, -1051523);
          f = w(f, m, h, p, a[c + 1], 21, -2054922799);
          p = w(p, f, m, h, a[c + 8], 6, 1873313359);
          h = w(h, p, f, m, a[c + 15], 10, -30611744);
          m = w(m, h, p, f, a[c + 6], 15, -1560198380);
          f = w(f, m, h, p, a[c + 13], 21, 1309151649);
          p = w(p, f, m, h, a[c + 4], 6, -145523070);
          h = w(h, p, f, m, a[c + 11], 10, -1120210379);
          m = w(m, h, p, f, a[c + 2], 15, 718787259);
          f = w(f, m, h, p, a[c + 9], 21, -343485551);
          p = r(p, R);
          f = r(f, B);
          m = r(m, H);
          h = r(h, X);
        }
        return [p, f, m, h];
      }
      function x(a) {
        var l,
          c = "";
        for (l = 0; l < a.length * 32; l += 8) {
          c += String.fromCharCode((a[l >> 5] >>> l % 32) & 255);
        }
        return c;
      }
      function A(a) {
        var l,
          c = [];
        c[(a.length >> 2) - 1] = void 0;
        for (l = 0; l < c.length; l += 1) {
          c[l] = 0;
        }
        for (l = 0; l < a.length * 8; l += 8) {
          c[l >> 5] |= (a.charCodeAt(l / 8) & 255) << l % 32;
        }
        return c;
      }
      function J(a) {
        return x(E(A(a), a.length * 8));
      }
      function N(a, l) {
        var c,
          R = A(a),
          B = [],
          H = [],
          X;
        B[15] = H[15] = void 0;
        if (R.length > 16) {
          R = E(R, a.length * 8);
        }
        for (c = 0; c < 16; c += 1) {
          B[c] = R[c] ^ 909522486;
          H[c] = R[c] ^ 1549556828;
        }
        X = E(B.concat(A(l)), 512 + l.length * 8);
        return x(E(H.concat(X), 512 + 128));
      }
      function ne(a) {
        var l = "0123456789abcdef",
          c = "",
          R,
          B;
        for (B = 0; B < a.length; B += 1) {
          R = a.charCodeAt(B);
          c += l.charAt((R >>> 4) & 15) + l.charAt(R & 15);
        }
        return c;
      }
      function ae(a) {
        return unescape(encodeURIComponent(a));
      }
      function re(a) {
        return J(ae(a));
      }
      function _e(a) {
        return ne(re(a));
      }
      function V(a, l) {
        return N(ae(a), ae(l));
      }
      function se(a, l) {
        return ne(V(a, l));
      }
      t.exports = function (a, l, c) {
        if (!l) {
          if (!c) {
            return _e(a);
          } else {
            return re(a);
          }
        }
        if (!c) {
          return se(l, a);
        } else {
          return V(l, a);
        }
      };
    }.call(k, _, k, I)),
    y !== void 0 && (I.exports = y));
  },
  "./src/pages/login/loginpage/loginpage.js": function (I, k, _) {
    function y(i) {
      "@babel/helpers - typeof";
      return (
        (y =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        y(i)
      );
    }
    function C(i) {
      return u(i) || r(i) || t(i) || T();
    }
    function T() {
      throw new TypeError(
        "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
      );
    }
    function t(i, e) {
      if (i) {
        if ("string" == typeof i) return o(i, e);
        var n = {}.toString.call(i).slice(8, -1);
        return (
          "Object" === n && i.constructor && (n = i.constructor.name),
          "Map" === n || "Set" === n
            ? Array.from(i)
            : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? o(i, e)
              : void 0
        );
      }
    }
    function r(i) {
      if (("undefined" != typeof Symbol && null != i[Symbol.iterator]) || null != i["@@iterator"]) return Array.from(i);
    }
    function u(i) {
      if (Array.isArray(i)) return o(i);
    }
    function o(i, e) {
      (null == e || e > i.length) && (e = i.length);
      for (var n = 0, s = Array(e); n < e; n++) s[n] = i[n];
      return s;
    }
    function v(i, e) {
      var n = Object.keys(i);
      if (Object.getOwnPropertySymbols) {
        var s = Object.getOwnPropertySymbols(i);
        (e &&
          (s = s.filter(function (L) {
            return Object.getOwnPropertyDescriptor(i, L).enumerable;
          })),
          n.push.apply(n, s));
      }
      return n;
    }
    function d(i) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? v(Object(n), true).forEach(function (s) {
              w(i, s, n[s]);
            })
          : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(n))
            : v(Object(n)).forEach(function (s) {
                Object.defineProperty(i, s, Object.getOwnPropertyDescriptor(n, s));
              });
      }
      return i;
    }
    function g() {
      "use strict";
      /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ g =
        function j() {
          return e;
        };
      var i,
        e = {},
        n = Object.prototype,
        s = n.hasOwnProperty,
        L = "function" == typeof Symbol ? Symbol : {},
        z = L.iterator || "@@iterator",
        D = L.asyncIterator || "@@asyncIterator",
        W = L.toStringTag || "@@toStringTag";
      function F(j, b, S, P) {
        return Object.defineProperty(j, b, { value: S, enumerable: !P, configurable: !P, writable: !P });
      }
      try {
        F({}, "");
      } catch (j) {
        F = function b(S, P, O) {
          return (S[P] = O);
        };
      }
      function te(j, b, S, P) {
        var O = b && b.prototype instanceof ce ? b : ce,
          M = Object.create(O.prototype);
        return (
          F(
            M,
            "_invoke",
            (function (K, oe, U) {
              var ee = 1;
              return function (de, le) {
                if (3 === ee) throw Error("Generator is already running");
                if (4 === ee) {
                  if ("throw" === de) throw le;
                  return { value: i, done: true };
                }
                for (U.method = de, U.arg = le; ; ) {
                  var Ae = U.delegate;
                  if (Ae) {
                    var Le = Te(Ae, U);
                    if (Le) {
                      if (Le === Z) continue;
                      return Le;
                    }
                  }
                  if ("next" === U.method) U.sent = U._sent = U.arg;
                  else if ("throw" === U.method) {
                    if (1 === ee) throw ((ee = 4), U.arg);
                    U.dispatchException(U.arg);
                  } else "return" === U.method && U.abrupt("return", U.arg);
                  ee = 3;
                  var he = Q(K, oe, U);
                  if ("normal" === he.type) {
                    if (((ee = U.done ? 4 : 2), he.arg === Z)) continue;
                    return { value: he.arg, done: U.done };
                  }
                  "throw" === he.type && ((ee = 4), (U.method = "throw"), (U.arg = he.arg));
                }
              };
            })(j, S, new ye(P || [])),
            true,
          ),
          M
        );
      }
      function Q(j, b, S) {
        try {
          return { type: "normal", arg: j.call(b, S) };
        } catch (P) {
          return { type: "throw", arg: P };
        }
      }
      e.wrap = te;
      var Z = {};
      function ce() {}
      function Y() {}
      function ie() {}
      var q = {};
      F(q, z, function () {
        return this;
      });
      var me = Object.getPrototypeOf,
        pe = me && me(me(ke([])));
      pe && pe !== n && s.call(pe, z) && (q = pe);
      var ue = (ie.prototype = ce.prototype = Object.create(q));
      function Ie(j) {
        ["next", "throw", "return"].forEach(function (b) {
          F(j, b, function (S) {
            return this._invoke(b, S);
          });
        });
      }
      function be(j, b) {
        function S(O, M, K, oe) {
          var U = Q(j[O], j, M);
          if ("throw" !== U.type) {
            var ee = U.arg,
              de = ee.value;
            return de && "object" == y(de) && s.call(de, "__await")
              ? b.resolve(de.__await).then(
                  function (le) {
                    S("next", le, K, oe);
                  },
                  function (le) {
                    S("throw", le, K, oe);
                  },
                )
              : b.resolve(de).then(
                  function (le) {
                    ((ee.value = le), K(ee));
                  },
                  function (le) {
                    return S("throw", le, K, oe);
                  },
                );
          }
          oe(U.arg);
        }
        var P;
        F(
          this,
          "_invoke",
          function (O, M) {
            function K() {
              return new b(function (oe, U) {
                S(O, M, oe, U);
              });
            }
            return (P = P ? P.then(K, K) : K());
          },
          true,
        );
      }
      function Te(j, b) {
        var S = b.method,
          P = j.i[S];
        if (P === i)
          return (
            (b.delegate = null),
            ("throw" === S && j.i.return && ((b.method = "return"), (b.arg = i), Te(j, b), "throw" === b.method)) ||
              ("return" !== S &&
                ((b.method = "throw"), (b.arg = new TypeError("The iterator does not provide a '" + S + "' method")))),
            Z
          );
        var O = Q(P, j.i, b.arg);
        if ("throw" === O.type) return ((b.method = "throw"), (b.arg = O.arg), (b.delegate = null), Z);
        var M = O.arg;
        return M
          ? M.done
            ? ((b[j.r] = M.value),
              (b.next = j.n),
              "return" !== b.method && ((b.method = "next"), (b.arg = i)),
              (b.delegate = null),
              Z)
            : M
          : ((b.method = "throw"), (b.arg = new TypeError("iterator result is not an object")), (b.delegate = null), Z);
      }
      function Me(j) {
        this.tryEntries.push(j);
      }
      function ve(j) {
        var b = j[4] || {};
        ((b.type = "normal"), (b.arg = i), (j[4] = b));
      }
      function ye(j) {
        ((this.tryEntries = [[-1]]), j.forEach(Me, this), this.reset(true));
      }
      function ke(j) {
        if (null != j) {
          var b = j[z];
          if (b) return b.call(j);
          if ("function" == typeof j.next) return j;
          if (!isNaN(j.length)) {
            var S = -1,
              P = function O() {
                for (; ++S < j.length; ) if (s.call(j, S)) return ((O.value = j[S]), (O.done = false), O);
                return ((O.value = i), (O.done = true), O);
              };
            return (P.next = P);
          }
        }
        throw new TypeError(y(j) + " is not iterable");
      }
      return (
        (Y.prototype = ie),
        F(ue, "constructor", ie),
        F(ie, "constructor", Y),
        (Y.displayName = F(ie, W, "GeneratorFunction")),
        (e.isGeneratorFunction = function (j) {
          var b = "function" == typeof j && j.constructor;
          return !!b && (b === Y || "GeneratorFunction" === (b.displayName || b.name));
        }),
        (e.mark = function (j) {
          return (
            Object.setPrototypeOf ? Object.setPrototypeOf(j, ie) : ((j.__proto__ = ie), F(j, W, "GeneratorFunction")),
            (j.prototype = Object.create(ue)),
            j
          );
        }),
        (e.awrap = function (j) {
          return { __await: j };
        }),
        Ie(be.prototype),
        F(be.prototype, D, function () {
          return this;
        }),
        (e.AsyncIterator = be),
        (e.async = function (j, b, S, P, O) {
          void 0 === O && (O = Promise);
          var M = new be(te(j, b, S, P), O);
          return e.isGeneratorFunction(b)
            ? M
            : M.next().then(function (K) {
                return K.done ? K.value : M.next();
              });
        }),
        Ie(ue),
        F(ue, W, "Generator"),
        F(ue, z, function () {
          return this;
        }),
        F(ue, "toString", function () {
          return "[object Generator]";
        }),
        (e.keys = function (j) {
          var b = Object(j),
            S = [];
          for (var P in b) S.unshift(P);
          return function O() {
            for (; S.length; ) if ((P = S.pop()) in b) return ((O.value = P), (O.done = false), O);
            return ((O.done = true), O);
          };
        }),
        (e.values = ke),
        (ye.prototype = {
          constructor: ye,
          reset: function j(b) {
            if (
              ((this.prev = this.next = 0),
              (this.sent = this._sent = i),
              (this.done = false),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = i),
              this.tryEntries.forEach(ve),
              !b)
            )
              for (var S in this) "t" === S.charAt(0) && s.call(this, S) && !isNaN(+S.slice(1)) && (this[S] = i);
          },
          stop: function j() {
            this.done = true;
            var b = this.tryEntries[0][4];
            if ("throw" === b.type) throw b.arg;
            return this.rval;
          },
          dispatchException: function j(b) {
            if (this.done) throw b;
            var S = this;
            function P(de) {
              ((K.type = "throw"), (K.arg = b), (S.next = de));
            }
            for (var O = S.tryEntries.length - 1; O >= 0; --O) {
              var M = this.tryEntries[O],
                K = M[4],
                oe = this.prev,
                U = M[1],
                ee = M[2];
              if (-1 === M[0]) return (P("end"), false);
              if (!U && !ee) throw Error("try statement without catch or finally");
              if (null != M[0] && M[0] <= oe) {
                if (oe < U) return ((this.method = "next"), (this.arg = i), P(U), true);
                if (oe < ee) return (P(ee), false);
              }
            }
          },
          abrupt: function j(b, S) {
            for (var P = this.tryEntries.length - 1; P >= 0; --P) {
              var O = this.tryEntries[P];
              if (O[0] > -1 && O[0] <= this.prev && this.prev < O[2]) {
                var M = O;
                break;
              }
            }
            M && ("break" === b || "continue" === b) && M[0] <= S && S <= M[2] && (M = null);
            var K = M ? M[4] : {};
            return ((K.type = b), (K.arg = S), M ? ((this.method = "next"), (this.next = M[2]), Z) : this.complete(K));
          },
          complete: function j(b, S) {
            if ("throw" === b.type) throw b.arg;
            return (
              "break" === b.type || "continue" === b.type
                ? (this.next = b.arg)
                : "return" === b.type
                  ? ((this.rval = this.arg = b.arg), (this.method = "return"), (this.next = "end"))
                  : "normal" === b.type && S && (this.next = S),
              Z
            );
          },
          finish: function j(b) {
            for (var S = this.tryEntries.length - 1; S >= 0; --S) {
              var P = this.tryEntries[S];
              if (P[2] === b) return (this.complete(P[4], P[3]), ve(P), Z);
            }
          },
          catch: function j(b) {
            for (var S = this.tryEntries.length - 1; S >= 0; --S) {
              var P = this.tryEntries[S];
              if (P[0] === b) {
                var O = P[4];
                if ("throw" === O.type) {
                  var M = O.arg;
                  ve(P);
                }
                return M;
              }
            }
            throw Error("illegal catch attempt");
          },
          delegateYield: function j(b, S, P) {
            return ((this.delegate = { i: ke(b), r: S, n: P }), "next" === this.method && (this.arg = i), Z);
          },
        }),
        e
      );
    }
    function w(i, e, n) {
      return (
        (e = E(e)) in i
          ? Object.defineProperty(i, e, { value: n, enumerable: true, configurable: true, writable: true })
          : (i[e] = n),
        i
      );
    }
    function E(i) {
      var e = x(i, "string");
      return "symbol" == y(e) ? e : e + "";
    }
    function x(i, e) {
      if ("object" != y(i) || !i) return i;
      var n = i[Symbol.toPrimitive];
      if (void 0 !== n) {
        var s = n.call(i, e || "default");
        if ("object" != y(s)) return s;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === e ? String : Number)(i);
    }
    function A(i, e, n, s, L, z, D) {
      try {
        var W = i[z](D),
          F = W.value;
      } catch (te) {
        return void n(te);
      }
      W.done ? e(F) : Promise.resolve(F).then(s, L);
    }
    function J(i) {
      return function () {
        var e = this,
          n = arguments;
        return new Promise(function (s, L) {
          var z = i.apply(e, n);
          function D(F) {
            A(z, s, L, D, W, "next", F);
          }
          function W(F) {
            A(z, s, L, D, W, "throw", F);
          }
          D(void 0);
        });
      };
    }
    var N = _("../../packages/mmbizweb-web2-common/modules/utils/cgi.js");
    var ne = _("./src/pages/modules/utils/get_cgi_data.js");
    var ae = _("./src/pages/modules/utils/get_custom_service.js");
    var re = _("./src/pages/modules/utils/string.js").htmlDecode;
    var _e = _("./src/3rd/md5/md5.js");
    var V = _("./src/3rd/cookie/cookie.js");
    var se = _("./node_modules/vuex/dist/vuex.esm.js");
    var a = _("./src/3rd/utils/comm_report.js");
    var l = _("./src/3rd/editor/common/monitor.js");
    var c = _("./src/pages/modules/faq/faq_hover/faq_hover.js");
    var R = _("./src/3rd/wxgspeedsdk/wxgspeedsdk.js");
    var B = _("./src/pages/modules/utils/object.js"),
      H = B.assign;
    var X = _("./src/pages/modules/utils/report.js"),
      p = X.idkey;
    var f = _("../../packages/mmbizweb-web2-common/common/wx/hash.js");
    var m = _("./src/pages/modules/base/base.js");
    _("./src/pages/login/loginpage/style/loginpage.less");
    _("./src/pages/login/loginpage/style/loginpage.en_US.less");
    sessionStorage.removeItem("menu_info_key");
    var h = _("./src/pages/modules/safe_input/safe_input.js");
    var Fe = _("../../packages/mmbizweb-web2-common/biz_common/utils/url/parse.js");
    var je = _("../../packages/mmbizweb-web2-common/modules/dialog/account_list_dialog.vue").default;
    var Ce = _("../../packages/mmbizweb-web2-common/modules/dialog/oauth_check_pwd_dialog.vue").default;
    var Se = _("../../packages/mmbizweb-web2-common/modules/dialog/oauth_set_pwd_dialog.vue").default;
    var fe = ne("pages/login/loginpage");
    var ge = "loginMode";
    var Ee = f.getUrlParam("appid", location.href);
    var Pe = 0;
    var xe = 0;
    if (navigator && !navigator.cookieEnabled) {
      Pe = 1;
    }
    if (window.localStorage && !window.localStorage.getItem(ge)) {
      xe = 1;
    }
    var ze = 0;
    function $e() {
      var i = document.createElement("script");
      i.onload = function () {
        ze = 1;
        document.body.removeChild(i);
      };
      i.src = "chrome-extension://kjmjndilfndibkgdfkekhnbnmiifcpjk/resource/jsencrypt.min.js";
      document.body.appendChild(i);
    }
    try {
      setTimeout(function () {
        $e();
      }, 200);
    } catch (i) {}
    var De = function i(e) {
      if (e <= 3) {
        return 1500;
      } else if (e > 3 && e <= 30) {
        return 1e3;
      } else if (e > 30 && e <= 50) {
        return 1500;
      }
      return 2e3;
    };
    function Oe() {
      return we.apply(this, arguments);
    }
    function we() {
      we = J(
        g().mark(function i() {
          var e;
          return g().wrap(
            function n(s) {
              while (1)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.prev = 0;
                    s.next = 3;
                    return navigator.permissions.query({ name: "local-network-access" });
                  case 3:
                    e = s.sent;
                    return s.abrupt("return", e.state);
                  case 7:
                    s.prev = 7;
                    s.t0 = s["catch"](0);
                    return s.abrupt("return", "");
                  case 10:
                  case "end":
                    return s.stop();
                }
            },
            i,
            null,
            [[0, 7]],
          );
        }),
      );
      return we.apply(this, arguments);
    }
    var G = null;
    var Re = new se.Store({
      modules: {
        main: {
          state: {
            step: 0,
            mode: window.wx.cgiData.defaultScanlogin ? 1 : (localStorage.getItem(ge) || 1) * 1,
            qrcodeSrc: "",
            scanLoginType: 0,
            bizList: [],
            wxList: [],
            activeBizIndex: 0,
            activeWxIndex: -1,
            state: "state_waiting",
            rejectWxList: [],
            currentLang: fe.currentLang === "" ? "zh_CN" : fe.currentLang,
            err: "",
            verifyImg: "",
            isNeedVerify: false,
            account: "",
            rememberCheck: false,
            pwd: "",
            verify: "",
            verify_ticket: "",
            rand_str: "",
            accountList: [],
          },
          mutations: {
            _sucGetIngorePassList: function i(e, n) {
              e.bizList = n.ignor_passwd_list;
              e.bizList.forEach(function (s, L) {
                e.rejectWxList.push([]);
                e.bizList[L].userlist.forEach(function () {
                  e.rejectWxList[L].push(false);
                });
              });
              e.step = 1;
              G.report19015({ optype: 1, page_state: 2 });
            },
            _setLanguage: function i(e, n) {
              function s() {
                var ce = window.location.search.substring(1).split("&");
                var Y = {};
                var ie;
                var q;
                for (q in ce) {
                  if (ce[q] === "") continue;
                  if (!ce[q].split) continue;
                  ie = ce[q].split("=");
                  Y[decodeURIComponent(ie[0])] = decodeURIComponent(ie[1]);
                }
                return Y;
              }
              var L = window.location.host;
              var z = window.location.protocol;
              var D = window.location.pathname;
              var W = window.location.hash;
              var F = s();
              var te = [];
              F.lang = n.currentLang;
              for (var Q in F) {
                if (!F[Q]) {
                  continue;
                }
                te.push([encodeURIComponent(Q), encodeURIComponent(F[Q])].join("="));
              }
              var Z = z + "//" + L + D + "?" + te.join("&") + W;
              V.cookie("mm_lang", n.currentLang, { expires: 30, path: "/" });
              e.currentLang = n.currentLang;
              window.openUrl(Z);
            },
            _loginCallback: function i(e, n) {
              var s = n.json;
              var L = "";
              switch (s.base_resp.ret) {
                case 0:
                  localStorage.setItem(ge, e.mode);
                  V.cookie("noticeLoginFlag", 1, { expires: 30 });
                  if (e.rememberCheck) {
                    V.cookie("remember_acct", e.account, { expires: 30 });
                  } else {
                    V.remove("remember_acct");
                  }
                  if (/\/cgi-bin\/home\?/.test(s.redirect_url)) {
                    if (window.location.href.indexOf("toUrl=ad") > -1) {
                      var z = s.redirect_url.match(/token=(\d*)/);
                      if (z && z[1]) {
                        s.redirect_url =
                          "/promotion/advertiser_index?lang=zh_CN&token=" + z[1] + "&aSource=" + (window.aSource || "");
                      }
                    }
                  } else if (/\/cgi-bin\/readtemplate\?t=user\/validate_wx_tmpl/.test(s.redirect_url)) {
                    if (window.location.href.indexOf("toUrl=ad") > -1) {
                      s.redirect_url += "&toUrl=ad&aSource=" + (window.aSource || "");
                    }
                  }
                  window.openUrl(s.redirect_url);
                  break;
                case -1:
                  L = "\u7CFB\u7EDF\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5\u3002";
                  break;
                case 200002:
                  L = "\u8D26\u53F7\u6216\u5BC6\u7801\u9519\u8BEF\u3002";
                  break;
                case 200007:
                  L = "\u60A8\u76EE\u524D\u5904\u4E8E\u8BBF\u95EE\u53D7\u9650\u72B6\u6001\u3002";
                  break;
                case 200008:
                  e.isNeedVerify = true;
                  G.$tipsErr("\u8BF7\u6ED1\u52A8\u9A8C\u8BC1\u7801");
                  try {
                    var D = new TencentCaptcha("2011407726", G.waterproofCallback, {
                      ready: function W() {},
                      needFeedBack: true,
                      type: "popup",
                    });
                    D.show();
                  } catch (W) {
                    G.loadErrorCallback();
                  }
                  break;
                case 200021:
                  L = "\u4E0D\u5B58\u5728\u8BE5\u8D26\u6237\u3002";
                  break;
                case 200023:
                  L =
                    "\u60A8\u8F93\u5165\u7684\u8D26\u53F7\u6216\u8005\u5BC6\u7801\u4E0D\u6B63\u786E\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165\u3002";
                  break;
                case 200025:
                  L =
                    '\u6D77\u5916\u8D26\u53F7\u8BF7\u5728\u516C\u4F17\u5E73\u53F0\u6D77\u5916\u7248\u767B\u5F55\uFF0C<a href="http://admin.wechat.com/">\u70B9\u51FB\u767B\u5F55</a>';
                  break;
                case 200026:
                  L =
                    "\u8BE5\u516C\u4F17\u4F1A\u8BAE\u53F7\u5DF2\u7ECF\u8FC7\u671F\uFF0C\u65E0\u6CD5\u518D\u767B\u5F55\u4F7F\u7528\u3002";
                  break;
                case 200027:
                  e.isNeedVerify = true;
                  G.$tipsErr("\u8BF7\u6ED1\u52A8\u9A8C\u8BC1\u7801");
                  try {
                    var D = new TencentCaptcha("2011407726", G.waterproofCallback, {
                      ready: function F() {},
                      needFeedBack: true,
                      type: "popup",
                    });
                    D.show();
                  } catch (W) {
                    G.loadErrorCallback();
                  }
                  break;
                case 200121:
                  L =
                    '\u8BE5\u8D26\u53F7\u5C5E\u4E8E\u5FAE\u4FE1\u5F00\u653E\u5E73\u53F0\uFF0C\u8BF7<a href="https://open.weixin.qq.com/">\u70B9\u51FB\u6B64\u5904</a>\u767B\u5F55';
                  break;
                case 200122:
                  L =
                    '\u8FD9\u662F\u4F01\u4E1A\u53F7\u8D26\u53F7\uFF0C\u73B0\u5DF2\u5347\u7EA7\u4E3A\u4F01\u4E1A\u5FAE\u4FE1\uFF0C\u8BF7<a href="https://work.weixin.qq.com/wework_admin/loginpage_wx?from=mp">\u70B9\u51FB\u6B64\u5904</a>\u767B\u5F55';
                  break;
                case 250002:
                  L = "\u8BE5\u8D26\u53F7\u5DF2\u88AB\u6CE8\u9500\u3002";
                  break;
                case 250003:
                  L =
                    '\u7531\u4E8E\u957F\u65F6\u95F4\u672A\u4F7F\u7528\uFF0C\u8BE5\u8D26\u53F7\u5DF2\u88AB\u7CFB\u7EDF\u51BB\u7ED3\uFF0C\u82E5\u9700\u8981\u6062\u590D\uFF0C\u4F60\u53EF\u4EE5\u70B9\u51FB<a href="'.concat(
                      s.findacct_url,
                      '">\u8D26\u53F7\u627E\u56DE</a>\u8FDB\u884C\u6062\u590D',
                    );
                  break;
                case 780001:
                  L =
                    '\u516C\u4F17\u5E73\u53F0\u5C06\u4E0D\u518D\u652F\u6301QQ\u8D26\u53F7\u767B\u5F55\uFF0C\u8BF7\u4EE5\u90AE\u7BB1\u8D26\u53F7\u767B\u5F55\u3002<br/><a href="/cgi-bin/bizunbindqq?action=page&qq='.concat(
                      s.binduin,
                      '">\u524D\u5F80\u7ED1\u5B9A\u90AE\u7BB1</a>',
                    );
                  break;
                default:
                  L = "\u672A\u77E5\u7684\u8FD4\u56DE\u3002";
                  new Image().src =
                    "/mp/unknow_ret_report?uin=0&id=64462&key=0&url=" +
                    encodeURIComponent("/cgi-bin/login") +
                    "&location=" +
                    encodeURIComponent(window.location.href) +
                    "&ret=" +
                    s.base_resp.ret +
                    "&method=get&action=report";
                  break;
              }
              if (L !== "") {
                e.err = L;
              }
            },
            quickLogin1: function i(e) {
              var n;
              var s;
              e.wxList = e.bizList[e.activeBizIndex].userlist;
              if (e.wxList.length === 1) {
                s = 0;
                n = "state_chosen";
              } else {
                s = 0;
                n = "state_chosen";
              }
              e.activeWxIndex = s;
              e.step = 2;
              e.state = n;
            },
            updateReject: function i(e) {
              e.state = "state_reject";
              e.rejectWxList[e.activeBizIndex][e.activeWxIndex] = true;
              e.activeWxIndex = -1;
              e.step = 2;
            },
            switchMode: function i(e, n) {
              e.mode = n.mode;
            },
            switchScanLoginType: function i(e, n) {
              e.scanLoginType = n.scanLoginType;
            },
            refreshQrcode: function i(e) {
              if (G.hasStartLogin === false) {
                G.getQrcode();
              } else {
                if (G.hasStartLogin === false) {
                  l.setSum(125091, 0, 1);
                  l.send();
                }
                e.qrcodeSrc = "/cgi-bin/scanloginqrcode?action=getqrcode&random="
                  .concat(new Date() * 1, "&login_appid=")
                  .concat(Ee);
                G.qrcodeRefreshTimes++;
                G.startCheckQrcode();
              }
            },
            setAccountList: function i(e, n) {
              e.accountList = n.accountList;
            },
            __set_state: function i(e, n) {
              for (var s in n) {
                e[s] = n[s];
              }
            },
          },
          actions: {
            getIngorePassList: function i(e) {
              var n = this;
              N.post({ url: "/cgi-bin/bizlogin", data: { action: "prelogin" } }, function (s) {
                n.bizList = s.ignor_passwd_list;
                if (s.base_resp.ret === 0 && s.eignor_passwd_result === 1 && n.bizList.length > 0) {
                  e.rootState.main.mode === 1 && G.stopCheckQrcode();
                  e.commit("_sucGetIngorePassList", s);
                } else {
                  G.report19015({ optype: 1, page_state: e.rootState.main.mode === 1 ? 3 : 1 });
                }
              });
            },
            setLanguage: function i(e, n) {
              e.commit("_setLanguage", n);
            },
            login: function i(e, n) {
              e.dispatch("_loginPost", Object.assign({ isOld: false, url: "/cgi-bin/bizlogin?action=startlogin" }, n));
            },
            _loginPost: function i(e, n) {
              N.post(
                {
                  url: n.url,
                  data: {
                    username: n.account,
                    pwd: _e(n.pwd.substr(0, 16)),
                    verify_ticket: n.verify_ticket,
                    rand_str: n.rand_str,
                    f: "json",
                    userlang: n.currentLang,
                    redirect_url: re(fe.redirectUrl),
                  },
                },
                n.isOld
                  ? function (s) {
                      e.commit("_loginCallback", Object.assign({ json: s }, n));
                      if (s.base_resp.ret !== 0) {
                      }
                    }
                  : function (s) {
                      if (s.grey === 0) {
                        new Image().src = "/mp/jsmonitor?idkey=66811_4_1";
                        e.dispatch("_loginPost", Object.assign({ isOld: true, url: "/cgi-bin/login?loginhook=4" }, n));
                      } else {
                        e.commit("_loginCallback", Object.assign({ json: s }, n));
                        if (s.base_resp.ret !== 0) {
                        }
                      }
                    },
              );
            },
            quickLogin1: function i(e) {
              var n = [];
              e.commit("quickLogin1");
              e.state.wxList.forEach(function (s) {
                n.push(s.openid);
              });
              e.dispatch("quickLoginReport", { openidPost: n });
            },
            quickLoginReport: function i(e, n) {
              N.post({ url: "/cgi-bin/bizlogin", data: { action: "report", openid: n.openidPost.join("|") } });
            },
            quickLogin2: function i(e, n) {
              e.commit("__set_state", { state: "state_login", step: 3 });
              e.dispatch("startLogin", {
                openid: e.state.wxList[e.state.activeWxIndex].openid,
                currentLang: n.currentLang,
              });
            },
            startLogin: function i(e, n) {
              N.post(
                { url: "/cgi-bin/bizlogin?action=startlogin", data: { openid: n.openid, userlang: n.currentLang } },
                function (s) {
                  n.inlTimes = 1;
                  if (s && s.base_resp && s.base_resp.ret === 0) {
                    e.dispatch("polledLoginAuth", n);
                  } else if (s && s.eignor_passwd_result >= 3) {
                    e.commit("updateReject");
                  } else {
                    e.commit("__set_state", { state: "state_failed", step: 2 });
                  }
                },
              );
            },
            bizLogin: function i(e, n) {
              var s = {
                userlang: n.currentLang,
                redirect_url: re(fe.redirectUrl),
                cookie_forbidden: Pe,
                cookie_cleaned: xe,
                plugin_used: ze,
              };
              n.loginType && (s.login_type = n.loginType);
              N.post({ url: "/cgi-bin/bizlogin?action=login", data: s }, function (L) {
                if (L && L.redirect_url) {
                  localStorage.setItem(ge, e.state.mode);
                  if (window.location.href.indexOf("toUrl=ad") > -1) {
                    var z = L.redirect_url.match(/token=(\d*)/);
                    if (z && z[1]) {
                      L.redirect_url =
                        "/promotion/advertiser_index?lang=zh_CN&token=" + z[1] + "&aSource=" + (window.aSource || "");
                    }
                  }
                  new Image().src = "/misc/jslog?id=100&content=loginSuccess&level=error";
                  window.openUrl(L.redirect_url);
                } else {
                  G.$tipsErr("\u7CFB\u7EDF\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5");
                  new Image().src = "/misc/jslog?id=99&content=loginError&level=error";
                }
              });
            },
            polledLoginAuth: function i(e, n) {
              var s = function L() {
                if (e.rootState.main.state !== "state_login") return;
                setTimeout(function () {
                  n.inlTimes++;
                  e.dispatch("polledLoginAuth", n);
                }, De(n.inlTimes));
              };
              N.get(
                { url: "/cgi-bin/loginauth?action=ask", timeout: 5e3 },
                function (L) {
                  if (L.status === 1) {
                    e.commit("__set_state", { state: "state_confirmed" });
                    e.dispatch("bizLogin", n);
                  } else if (L.status === 2) {
                    e.commit("__set_state", { state: "state_cancel", step: 2 });
                  } else if (L.status === 3) {
                    e.commit("__set_state", { state: "state_timeout", step: 2 });
                  } else if (L.status === 4) {
                    s();
                  } else if (L.status === 0) {
                    s();
                  } else if (L.status !== 0) {
                    e.commit("__set_state", { state: "state_failed", step: 2 });
                  }
                },
                function () {
                  s();
                },
              );
            },
            __set_state: function i(e, n) {
              e.commit("__set_state", n);
            },
          },
        },
      },
    });
    G = new m({
      el: "#app",
      store: Re,
      components: w(w(w({ "mp-faq-hover": c }, je.name, je), Ce.name, Ce), Se.name, Se),
      data: function i() {
        var e = navigator.userAgent;
        var n = false;
        if (/(iPhone|iPod|iOS)/i.test(e) || /(Android)/i.test(e)) {
          n = true;
          p(284042, 0);
        }
        var s = {
          supportLang: [
            { name: "\u7B80\u4F53\u4E2D\u6587", value: "zh_CN" },
            { name: "English", value: "en_US" },
          ],
          CgiData: fe,
          loginAppid: Ee,
          accountDom: null,
          pwdDom: null,
          verifyDom: null,
          supportSafeInput: false,
          isShowQrcode: false,
          newKf: false,
          qqBindMailUrl: "",
          showMpAppGuide: n,
          showFastLogin: true,
          showFastLoginLoading: false,
          lnaPermissionRes: null,
          fastLoginWxInfo: null,
          ifShowAccountListDialog: false,
          selectedLoginAccount: {},
          loadMpFastLogin: false,
          showNoAccountDialog: false,
          disableFastLogin: false,
          ifShowOAuthCheckPwdDialog: false,
          ifShowOAuthSetPwdDialog: false,
          oauthPhoneWithMask: "",
        };
        return s;
      },
      created: function i() {
        var e = this;
        return J(
          g().mark(function n() {
            return g().wrap(function s(L) {
              while (1)
                switch ((L.prev = L.next)) {
                  case 0:
                    e.isStopQrcodeTimer = false;
                    e.qrcodeRefreshTimes = 0;
                    e.qrcodeTimer = null;
                    e.checkQrcodeTimes = 1;
                    e.sessionid = new Date() * 1 + "" + Math.floor(Math.random() * 100);
                    e.prepageState = null;
                    e.hasStartLogin = false;
                    L.next = 9;
                    return Oe();
                  case 9:
                    e.lnaPermissionRes = L.sent;
                    if (e.lnaPermissionRes === "granted") {
                      e.showFastLoginLoading = true;
                      l.setSum(125091, 5, 1);
                      l.send();
                    } else {
                      l.setSum(125091, 6, 1);
                      l.send();
                      e.switchFastLogin(false);
                    }
                  case 11:
                  case "end":
                    return L.stop();
                }
            }, n);
          }),
        )();
      },
      mounted: function i() {
        var e = this;
        ae().then(function (n) {
          e.newKf = n;
        });
        this.accountDom = this.$refs.accountInput.$refs.field;
        if (this.supportSafeInput) {
          this.pwdDom = h.domMap.password;
          this.pwdDom.addEventListener("input", function () {
            e.$store.dispatch("__set_state", { pwd: e.pwdDom.value.trim() });
          });
          this.pwdDom.addEventListener("keydown", function (n) {
            if (n.keyCode === 13) {
              e.login();
            }
          });
          V.remove("password_leak", { path: "/" });
          this.$refs.fakePwdInput.addEventListener("input", function () {
            V.cookie("password_leak", location.href, { path: "/" });
          });
        } else {
          this.pwdDom = this.$refs.pwdInput.$refs.field;
        }
        if (V.cookie("remember_acct")) {
          this.$store.commit("__set_state", { rememberCheck: true, account: V.cookie("remember_acct") });
        }
        if (this.$store.state.main.rememberCheck) this.pwdDom.focus();
        else this.accountDom.focus();
        this.$store.dispatch("getIngorePassList");
        this.getQrcode();
        if (localStorage.getItem("loginWithQrcode")) {
          this.switchMode(1);
          localStorage.removeItem("loginWithQrcode");
        }
      },
      computed: d(
        {
          account: {
            get: function i() {
              return this.$store.state.main.account;
            },
            set: function i(e) {
              this.$store.dispatch("__set_state", { account: e });
            },
          },
          pwd: {
            get: function i() {
              return this.$store.state.main.pwd;
            },
            set: function i(e) {
              this.$store.dispatch("__set_state", { pwd: e });
            },
          },
          verifyTicket: {
            get: function i() {
              return this.$store.state.main.verifyTicket;
            },
            set: function i(e) {
              this.$store.dispatch("__set_state", { verifyTicket: e });
            },
          },
          randStr: {
            get: function i() {
              return this.$store.state.main.randStr;
            },
            set: function i(e) {
              this.$store.dispatch("__set_state", { randStr: e });
            },
          },
          currentLang: {
            get: function i() {
              return this.$store.state.main.currentLang;
            },
            set: function i(e) {
              this.$store.dispatch("setLanguage", { currentLang: e });
            },
          },
        },
        se.mapState({
          step: function i(e) {
            return e.main.step;
          },
          mode: function i(e) {
            return e.main.mode;
          },
          qrcodeSrc: function i(e) {
            return e.main.qrcodeSrc;
          },
          scanLoginType: function i(e) {
            return e.main.scanLoginType;
          },
          err: function i(e) {
            return e.main.err;
          },
          activeBizIndex: function i(e) {
            return e.main.activeBizIndex;
          },
          verifyImg: function i(e) {
            return e.main.verifyImg;
          },
          isNeedVerify: function i(e) {
            return e.main.isNeedVerify;
          },
          rememberCheck: function i(e) {
            return e.main.rememberCheck;
          },
          bizList: function i(e) {
            return e.main.bizList;
          },
          state: function i(e) {
            return e.main.state;
          },
          wxList: function i(e) {
            return e.main.wxList;
          },
          activeWxIndex: function i(e) {
            return e.main.activeWxIndex;
          },
          rejectWxList: function i(e) {
            return e.main.rejectWxList;
          },
          accountList: function i(e) {
            return e.main.accountList;
          },
          currentLangDesc: function i() {
            var e = "\u7B80\u4F53\u4E2D\u6587";
            var n;
            for (n = 0; n < this.supportLang.length; n++) {
              if (this.supportLang[n].value === this.currentLang) {
                e = this.supportLang[n].name;
              }
            }
            return e;
          },
        }),
      ),
      watch: {
        account: function i(e) {
          if (e !== "") {
            this.$store.dispatch("__set_state", { err: "" });
          }
        },
        pwd: function i(e) {
          if (e !== "") {
            this.$store.dispatch("__set_state", { err: "" });
          }
        },
        step: function i(e) {
          if (e === 0) {
            this.report19015({ optype: 1, page_state: this.mode === 1 ? 3 : 1 });
            if (this.mode === 1) {
              this.getQrcode();
            }
          }
        },
        mode: function i(e) {
          this.report19015({ optype: 1, page_state: e === 1 ? 3 : 1 });
        },
      },
      methods: {
        report19015: function i(e) {
          if (e.optype === 1) {
            this.prepageState !== null && (e.prepage_state = this.prepageState);
            this.prepageState = e.page_state;
          }
          a.report(19015, H({ devicetype: 1, newsessionid: this.sessionid }, e));
        },
        toggleQrcodeShow: function i() {
          this.isShowQrcode = true;
        },
        toggleQrcodeHide: function i() {
          this.isShowQrcode = false;
        },
        setLanguage: function i(e) {
          var n = this;
          n.$store.dispatch("setLanguage", { currentLang: e });
        },
        switchMode: function i(e) {
          this.$store.commit("switchMode", { mode: e });
          if (e === 1) {
            this.report19015({ optype: 2, buttonid: 1 });
            this.showFastLogin = false;
            this.getQrcode();
          } else {
            this.report19015({ optype: 2, buttonid: 2 });
            this.refreshQrcode();
            this.stopCheckQrcode();
            this.hasStartLogin = false;
          }
        },
        switchScanLoginType: function i(e) {
          this.$store.commit("switchScanLoginType", { scanLoginType: e });
        },
        initAccountList: function i(e) {
          var n = this;
          N.post({
            url: "/cgi-bin/oauthlogin?action=oauthlogin",
            data: { code: e, state: this.uuid },
            success: function s() {
              var L;
              var z = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
              if (((L = z.base_resp) === null || L === void 0 ? void 0 : L.ret) !== 0) {
                var D;
                n.initFastLogin(n.uuid);
                n.$tipsErr(
                  (z === null || z === void 0 || (D = z.base_resp) === null || D === void 0 ? void 0 : D.err_msg) ||
                    "\u62C9\u53D6\u8D26\u53F7\u5217\u8868\u5931\u8D25",
                );
                return;
              }
              var W = { list: [] };
              var F = z.biz_list || W;
              var te = z.wxa_list || W;
              var Q = z.service_biz_list || W;
              var Z = [].concat(C(F.list), C(te.list), C(Q.list));
              var ce = Z.length;
              if (ce === 0) {
                n.disableFastLogin = true;
                n.showNoAccountDialog = true;
                n.switchFastLogin(false, true);
                return;
              }
              F.list.forEach(function (q) {
                F.accountTypeName = "\u516C\u4F17\u53F7";
                q.accountTypeName = "\u516C\u4F17\u53F7";
                q.headimgurl =
                  q.headimgurl ||
                  "https://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0";
              });
              Q.list.forEach(function (q) {
                Q.accountTypeName = "\u670D\u52A1\u53F7";
                q.accountTypeName = "\u670D\u52A1\u53F7";
                q.headimgurl =
                  q.headimgurl ||
                  "https://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0";
              });
              te.list.forEach(function (q) {
                te.accountTypeName = "\u5C0F\u7A0B\u5E8F";
                q.accountTypeName = "\u5C0F\u7A0B\u5E8F";
                q.headimgurl =
                  q.headimgurl ||
                  "https://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0";
              });
              if (ce === 1) {
                var Y;
                l.setSum(125091, 7, 1);
                l.send();
                n.setSelectedLoginAccount(Z[0]);
                n.loginAccount();
                (Y = n.$refs.openSdkFrameWrp) === null ||
                  Y === void 0 ||
                  (Y = Y.firstChild) === null ||
                  Y === void 0 ||
                  (Y = Y.contentWindow) === null ||
                  Y === void 0 ||
                  Y.postMessage({ action: "sendLoginAccountInfo", loginAccountInfo: Z[0] });
                return;
              }
              var ie = [F, te, Q].sort(function (q, me) {
                var pe, ue;
                return (
                  (((pe = me.list[0]) === null || pe === void 0 ? void 0 : pe.last_login_time) || 0) -
                  (((ue = q.list[0]) === null || ue === void 0 ? void 0 : ue.last_login_time) || 0)
                );
              });
              n.$store.commit("setAccountList", { accountList: ie });
              n.ifShowAccountListDialog = true;
            },
            error: function s() {
              n.$tipsErr("\u62C9\u53D6\u8D26\u53F7\u5217\u8868\u5931\u8D25");
              n.initFastLogin(n.uuid);
            },
          });
        },
        initFastLogin: function i(e, n) {
          var s = this;
          if (!WxLogin) {
            return;
          }
          if (!e) {
            return;
          }
          this.loadMpFastLogin = true;
          if (!n) {
            this.showFastLoginLoading = true;
          }
          new WxLogin({
            lang: this.currentLang === "zh_CN" ? "" : "en",
            self_redirect: true,
            id: "fast_login_container",
            appid: "wx16f47d3640058686",
            scope: "snsapi_login",
            redirect_uri: encodeURIComponent("https://mp.weixin.qq.com/cgi-bin/mpfastlogin"),
            href: encodeURIComponent(
              window.wx.fastLoginStyleFilePath.includes("http")
                ? window.wx.fastLoginStyleFilePath
                : "".concat(location.origin).concat(window.wx.fastLoginStyleFilePath),
            ),
            onReady: function L(z) {
              if (!n) {
                s.showFastLoginLoading = false;
              }
            },
            onQRcodeReady: function L() {
              for (var z = arguments.length, D = new Array(z), W = 0; W < z; W++) {
                D[W] = arguments[W];
              }
            },
          });
          if (!this.messageListened) {
            window.addEventListener(
              "message",
              (function () {
                var L = J(
                  g().mark(function z(D) {
                    var W, F;
                    return g().wrap(function te(Q) {
                      while (1)
                        switch ((Q.prev = Q.next)) {
                          case 0:
                            if (!(D.origin !== location.origin && D.origin !== "https://open.weixin.qq.com")) {
                              Q.next = 2;
                              break;
                            }
                            return Q.abrupt("return");
                          case 2:
                            if (!(((W = D.data) === null || W === void 0 ? void 0 : W.action) === "fastLoginCode")) {
                              Q.next = 7;
                              break;
                            }
                            s.initAccountList(Fe.getQuery("code", D.data.url));
                            l.setSum(125091, 8, 1);
                            l.send();
                            return Q.abrupt("return");
                          case 7:
                            if (!(((F = D.data) === null || F === void 0 ? void 0 : F.action) === "fastLogin")) {
                              Q.next = 27;
                              break;
                            }
                            Q.next = 10;
                            return Oe();
                          case 10:
                            s.lnaPermissionRes = Q.sent;
                            if (!(D.data.status === 200)) {
                              Q.next = 23;
                              break;
                            }
                            if (D.data.jsdata) {
                              Q.next = 15;
                              break;
                            }
                            s.switchFastLogin(false);
                            return Q.abrupt("return");
                          case 15:
                            s.fastLoginWxInfo = D.data.jsdata;
                            window.fastLoginWxInfo = s.fastLoginWxInfo;
                            s.fastLoginWxInfo.headimgurl =
                              s.fastLoginWxInfo.headimgurl ||
                              "https://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0";
                            l.setSum(125091, 11, 1);
                            l.send();
                            s.switchFastLogin(true);
                            Q.next = 26;
                            break;
                          case 23:
                            s.$nextTick(function () {
                              s.switchFastLogin(false);
                            });
                            l.setSum(125091, 12, 1);
                            l.send();
                          case 26:
                            s.showFastLoginLoading = false;
                          case 27:
                          case "end":
                            return Q.stop();
                        }
                    }, z);
                  }),
                );
                return function (z) {
                  return L.apply(this, arguments);
                };
              })(),
              false,
            );
            this.messageListened = true;
          }
        },
        getQrcode: function i() {
          var e = this;
          this.isStopQrcodeTimer = false;
          N.post(
            {
              url: "/cgi-bin/bizlogin?action=startlogin",
              data: {
                userlang: this.currentLang,
                redirect_url: re(fe.redirectUrl),
                login_type: 3,
                sessionid: this.sessionid,
              },
            },
            function (n) {
              if (n && n.base_resp && n.base_resp.ret === 0) {
                e.hasStartLogin = true;
                !e.isStopQrcodeTimer && e.refreshQrcode();
                e.uuid = n.uuid;
                !e.fastLoginInited && e.initFastLogin(n.uuid, true);
                e.fastLoginInited = true;
              } else {
                l.setSum(125091, 2, 1);
                l.send();
                e.switchScanLoginType(6);
              }
            },
            function (n, s) {
              l.setSum(125091, 3, 1);
              l.send();
              e.switchScanLoginType(6);
            },
          );
        },
        qrcodeError: function i(e) {
          if (e.target.src === location.href) return;
          l.setSum(125091, 1, 1);
          l.send();
          this.stopCheckQrcode();
          this.switchScanLoginType(6);
        },
        refreshQrcode: function i(e) {
          if (y(e) === "object" || !e) {
            this.qrcodeRefreshTimes = 0;
          }
          this.stopCheckQrcode();
          if (this.qrcodeRefreshTimes >= 5) {
            this.switchScanLoginType(5);
          } else {
            this.switchScanLoginType(0);
            this.$store.commit("refreshQrcode");
          }
        },
        startCheckQrcode: function i(e) {
          !e && (this.checkQrcodeTimes = 1);
          this.qrcodeTimer = setTimeout(this.checkQrcode, De(this.checkQrcodeTimes));
        },
        stopCheckQrcode: function i() {
          this.isStopQrcodeTimer = true;
          if (this.qrcodeTimer) {
            clearTimeout(this.qrcodeTimer);
            this.qrcodeTimer = null;
          }
        },
        checkQrcode: function i() {
          var e = this;
          N.get(
            { url: "/cgi-bin/scanloginqrcode?action=ask" },
            function (n) {
              if (n && n.base_resp && n.base_resp.ret === 0) {
                switch (n.status) {
                  case 1:
                    e.$store.dispatch("bizLogin", { currentLang: e.currentLang, loginType: 3 });
                    break;
                  case 2:
                    e.refreshQrcode();
                    break;
                  case 3:
                    e.refreshQrcode(true);
                    break;
                  case 4:
                  case 6:
                    if (n.acct_size === 1) {
                      e.switchScanLoginType(1);
                    } else if (n.acct_size > 1) {
                      e.switchScanLoginType(2);
                    } else {
                      e.switchScanLoginType(3);
                    }
                    e.startCheckQrcode(true);
                    break;
                  case 5:
                    if (n.binduin) {
                      e.qqBindMailUrl = "/cgi-bin/bizunbindqq?action=page&qq=".concat(n.binduin);
                      e.switchScanLoginType(7);
                    } else {
                      e.switchScanLoginType(4);
                    }
                    break;
                  default:
                    e.startCheckQrcode(true);
                }
              } else {
                e.switchScanLoginType(6);
              }
            },
            function (n, s) {
              e.startCheckQrcode(true);
            },
          );
        },
        goRegist: function i(e) {
          this.report19015({ optype: 2, buttonid: 3 });
          location.href = e.target.dataset.href;
        },
        goRegistImmediately: function i(e) {
          this.report19015({ optype: 2, buttonid: 6 });
          location.href = e.target.dataset.href;
        },
        login: function i() {
          var e = this.$store.state.main.account;
          var n = this.$store.state.main.pwd;
          var s = this.$store.state.main.isNeedVerify;
          if (e === "") {
            this.$store.dispatch("__set_state", { err: "\u4F60\u8FD8\u6CA1\u6709\u8F93\u5165\u8D26\u53F7\uFF01" });
            this.accountDom.focus();
          } else if (n === "") {
            this.$store.dispatch("__set_state", { err: "\u4F60\u8FD8\u6CA1\u6709\u8F93\u5165\u5BC6\u7801\uFF01" });
            this.pwdDom.focus();
          } else if (s === true) {
            try {
              var L = new TencentCaptcha("2011407726", this.waterproofCallback, {
                ready: function z() {},
                needFeedBack: true,
                type: "popup",
              });
              L.show();
            } catch (z) {
              this.loadErrorCallback();
            }
          } else {
            this.goLogin();
          }
        },
        goLogin: function i() {
          var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
          var s = this.$store.state.main.account;
          var L = this.$store.state.main.pwd;
          var z = this.$store.state.main.currentLang;
          var D = +new Date();
          if (this.step !== 0 || this.mode !== 0) {
            l.setSum(125091, 4, 1);
            l.send();
          }
          this.$store.dispatch("login", { account: s, pwd: L, verify_ticket: e, rand_str: n, currentLang: z, rand: D });
        },
        waterproofCallback: function i(e) {
          if (e.errorCode || e.errorMessage) {
            G.$tipsErr("\u9A8C\u8BC1\u7801\u9519\u8BEF\uFF0C\u8BF7\u91CD\u8BD5");
            return;
          }
          if (e.ret === 2) {
            G.$tipsErr("\u8BF7\u6ED1\u52A8\u9A8C\u8BC1\u7801");
            return;
          }
          if (e.ret !== 0) {
            G.$tipsErr("\u9A8C\u8BC1\u7801\u9519\u8BEF\uFF0C\u8BF7\u91CD\u8BD5");
            return;
          }
          this.goLogin(e.ticket, e.randstr);
        },
        loadErrorCallback: function i() {
          var e = "";
          var n = "terror_1001_" + e + "_" + Math.floor(new Date().getTime() / 1e3);
          this.waterproofCallback({
            ret: 0,
            randstr: "@" + Math.random().toString(36).substr(2),
            ticket: n,
            errorCode: 1001,
            errorMessage: "jsload_error",
          });
        },
        selectBiz: function i(e) {
          this.$store.dispatch("__set_state", { activeBizIndex: e });
        },
        quickLogin1: function i() {
          this.$store.dispatch("quickLogin1");
        },
        changeToInputLogin: function i() {
          this.$store.dispatch("__set_state", { step: 0 });
        },
        selectWx: function i(e) {
          if (
            this.$store.state.main.state !== "state_login" &&
            this.$store.state.main.state !== "state_confirmed" &&
            !this.$store.state.main.rejectWxList[this.$store.state.main.activeBizIndex][e]
          ) {
            if (this.$store.state.main.wxList.length > 1 && this.$store.state.main.activeWxIndex === e) {
              this.$store.dispatch("__set_state", { activeWxIndex: -1, state: "state_waiting" });
            } else {
              this.$store.dispatch("__set_state", { activeWxIndex: e, state: "state_chosen" });
            }
          }
        },
        quickLogin2: function i() {
          var e = this;
          if (
            this.$store.state.main.state !== "state_login" &&
            this.$store.state.main.state !== "state_confirmed" &&
            this.$store.state.main.state !== "state_reject" &&
            !this.$store.state.main.rejectWxList[this.$store.state.main.activeBizIndex][
              this.$store.state.main.activeWxIndex
            ]
          ) {
            this.$store.dispatch("quickLogin2", { currentLang: e.currentLang });
          }
        },
        backToQuickLogin: function i() {
          if (this.$store.state.main.state === "state_login") {
            this.$store.dispatch("__set_state", { state: "state_chosen" });
          }
          this.$store.dispatch("__set_state", { step: this.$store.state.main.step - 1 });
        },
        changeRemember: function i() {
          this.$store.dispatch("__set_state", { rememberCheck: !this.$store.state.main.rememberCheck });
        },
        jump2DownloadMpApp: function i() {
          p(284042, 1);
          location.href = "https://mp.weixin.qq.com/webapp/wap/download?scene=4#wechat_redirect";
        },
        switchFastLogin: function i(e) {
          var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
          if (e && this.disableFastLogin) {
            return;
          }
          this.showFastLogin = e;
          if (e) {
            this.refreshQrcode();
            this.stopCheckQrcode();
          } else {
            n && this.getQrcode();
          }
        },
        closeNoAccountDialog: function i() {
          this.showNoAccountDialog = false;
        },
        gotoRegister: function i() {
          this.closeNoAccountDialog();
          window.openUrl("/cgi-bin/registermidpage?action=index&weblogo=1", null, true);
        },
        setSelectedLoginAccount: function i(e) {
          this.selectedLoginAccount = e;
        },
        closeAccountListDialog: function i(e) {
          this.ifShowAccountListDialog = false;
          e && this.initFastLogin(this.uuid);
        },
        onSelectAccount: function i(e) {
          this.setSelectedLoginAccount(e);
          this.loginAccount();
          l.setSum(125091, 9, 1);
          l.send();
        },
        loginAccount: function i() {
          var e = this;
          N.post({
            url: "/cgi-bin/oauthlogin?action=oauthselect",
            data: {
              username: this.selectedLoginAccount.username,
              account_switch_permit: 1,
              need_set_email: !this.selectedLoginAccount.email && !this.selectedLoginAccount.qq ? 1 : 0,
            },
            success: function n() {
              var s, L, z;
              var D = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
              if (
                ((s = D.base_resp) === null || s === void 0 ? void 0 : s.ret) !== 0 &&
                ((L = D.base_resp) === null || L === void 0 ? void 0 : L.ret) !== 200135
              ) {
                var W;
                e.$tipsErr(
                  (D === null || D === void 0 || (W = D.base_resp) === null || W === void 0 ? void 0 : W.err_msg) ||
                    "\u7CFB\u7EDF\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5",
                );
                return;
              }
              e.oauthPhoneWithMask = D.phone_with_mask || "";
              if (D.need_check_pwd) {
                e.closeAccountListDialog();
                e.ifShowOAuthCheckPwdDialog = true;
                l.setSum(125091, 13, 1);
                l.send();
                return;
              }
              if (D.set_email || ((z = D.base_resp) === null || z === void 0 ? void 0 : z.ret) === 200135) {
                e.disableFastLogin = true;
                e.closeAccountListDialog();
                e.switchFastLogin(false, true);
                e.$tipsErr(
                  "\u8BF7\u7528\u5FAE\u4FE1\u626B\u7801\uFF0C\u5728\u624B\u673A\u7AEF\u8BBE\u7F6E\u767B\u5F55\u90AE\u7BB1\u540E\u5373\u53EF\u5FEB\u6377\u767B\u5F55\u3002",
                );
                l.setSum(125091, 10, 1);
                l.send();
                return;
              }
              if (D.need_set_pwd) {
                e.closeAccountListDialog();
                e.ifShowOAuthSetPwdDialog = true;
                l.setSum(125091, 14, 1);
                l.send();
                return;
              }
              e.$store.dispatch("bizLogin", { currentLang: e.currentLang, loginType: 5 });
            },
            error: function n() {
              e.$tipsErr("\u7CFB\u7EDF\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5");
              e.selectedLoginAccount = {};
            },
          });
        },
        cancelOAuthSecondCheck: function i() {
          this.ifShowOAuthCheckPwdDialog = false;
          this.ifShowOAuthSetPwdDialog = false;
          this.selectedLoginAccount = {};
          this.oauthPhoneWithMask = "";
          this.initFastLogin(this.uuid);
        },
        onOAuthPwdVerified: function i() {
          this.ifShowOAuthCheckPwdDialog = false;
          this.$store.dispatch("bizLogin", { currentLang: this.currentLang, loginType: 5 });
        },
      },
    });
    R.setBasicTime({ pid: 30 });
    R.send();
    window.vm = G;
    I.exports = G;
  },
  "./src/pages/login/loginpage/style/loginpage.en_US.less": function (I, k, _) {
    "use strict";
    _.r(k);
  },
  "./src/pages/login/loginpage/style/loginpage.less": function (I, k, _) {
    "use strict";
    _.r(k);
  },
  "./src/pages/modules/safe_input/safe_input.js": function (I, k) {
    var _ =
      "\nlet id = 0;\nconst domMap = {};\nconst map = new WeakMap();\ncustomElements.define('mp-safe-input', class extends HTMLElement {\n  constructor() {\n    super();\n    map.set(this, {\n      id: id++,\n      root: this.attachShadow({ mode: 'closed' })\n    });\n  }\n  connectedCallback() {\n    const style = document.createElement('style');\n    const input = document.createElement('input');\n    const attrs = this.attributes;\n    for (let i = 0; i < attrs.length; i++) {\n      if (attrs[i].name === 'input-style') {\n        style.innerHTML += 'input{' + attrs[i].value + '}';\n      } else if (attrs[i].name === 'placeholder-style') {\n        style.innerHTML += 'input::placeholder{' + attrs[i].value + '}';\n      } else if (['class', 'style'].indexOf(attrs[i].name) === -1) {\n        input.setAttribute(attrs[i].name, attrs[i].value);\n      }\n    }\n    const inst = map.get(this);\n    inst.root.appendChild(style);\n    inst.root.appendChild(input);\n    const name = this.getAttribute('name') || inst.id;\n    domMap[name] = input;\n  }\n});\nreturn {\n  domMap: domMap,\n  support: true\n};\n";
    var y = 0.005;
    var C;
    try {
      var T = new Function(_);
      C = T();
    } catch (t) {
      if (
        Math.random() < y &&
        window.WX_BJ_REPORT &&
        window.WX_BJ_REPORT.BadJs &&
        typeof window.WX_BJ_REPORT.BadJs.onError === "function"
      ) {
        t.name = "SafeInput:" + t.name;
        window.WX_BJ_REPORT.BadJs.onError(t);
      }
      C = { domMap: {}, support: false };
    }
    I.exports = C;
  },
  "./src/pages/modules/utils/get_cgi_data.js": function (I, k) {
    I.exports = function (_) {
      return window.CGI_DATA[_];
    };
  },
  "./src/pages/modules/utils/string.js": function (I, k) {
    function _(y, C) {
      var T = ["&", "&amp;", "<", "&lt;", ">", "&gt;", " ", "&nbsp;", '"', "&quot;", "'", "&#39;"];
      var t = [
        "&#39;",
        "'",
        "&quot;",
        '"',
        "&nbsp;",
        " ",
        "&gt;",
        ">",
        "&lt;",
        "<",
        "&amp;",
        "&",
        "&#60;",
        "<",
        "&#62;",
        ">",
      ];
      var r;
      if (C === false) {
        r = t;
      } else {
        r = T;
      }
      var u = y;
      for (var o = 0; o < r.length; o += 2) {
        u = u.replace(new RegExp(r[o], "g"), r[1 + o]);
      }
      return u;
    }
    I.exports = {
      https2http: function y(C) {
        return C.replace(/https:\/\/mmbiz\.qlogo\.cn\//g, "http://mmbiz.qpic.cn/");
      },
      http2https: function y(C) {
        return C.replace(/http:\/\/mmbiz\.qpic\.cn\//g, "https://mmbiz.qpic.cn/").replace(
          /http(s)?:\/\/mmbiz\.qlogo\.cn\//g,
          "https://mmbiz.qpic.cn/",
        );
      },
      nogif: function y(C) {
        return C.indexOf("wx_fmt=gif") > -1 || C.indexOf("/mmbiz_gif/") > -1
          ? C.replace("/0?", "/s640?").replace("wx_fmt=gif", "")
          : C.toString();
      },
      htmlEncode: function y(C) {
        return _(C, true);
      },
      htmlDecode: function y(C) {
        return _(C, false);
      },
      capitalize: function y(C) {
        return C.charAt(0).toUpperCase() + C.slice(1);
      },
    };
  },
  57: function (I, k, _) {
    I.exports = _("./src/pages/login/loginpage/loginpage.js");
  },
});
