!(function () {
    if (!window.hasCookieConsent) {
      window.hasCookieConsent = !0;
      var e = "cookieconsent_options",
        t = "update_cookieconsent_options",
        n = "cookieconsent_dismissed",
        i = "//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/1.0.9/";
      if (!(document.cookie.indexOf(n) > -1)) {
        "function" != typeof String.prototype.trim &&
          (String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, "");
          });
        var o,
          s = {
            isArray: function (e) {
              var t = Object.prototype.toString.call(e);
              return "[object Array]" == t;
            },
            isObject: function (e) {
              return "[object Object]" == Object.prototype.toString.call(e);
            },
            each: function (e, t, n, i) {
              if (s.isObject(e) && !i)
                for (var o in e) e.hasOwnProperty(o) && t.call(n, e[o], o, e);
              else
                for (var r = 0, c = e.length; c > r; r++) t.call(n, e[r], r, e);
            },
            merge: function (e, t) {
              e &&
                s.each(t, function (t, n) {
                  s.isObject(t) && s.isObject(e[n])
                    ? s.merge(e[n], t)
                    : (e[n] = t);
                });
            },
            bind: function (e, t) {
              return function () {
                return e.apply(t, arguments);
              };
            },
            queryObject: function (e, t) {
              var n,
                i = 0,
                o = e;
              for (
                t = t.split(".");
                (n = t[i++]) && o.hasOwnProperty(n) && (o = o[n]);
  
              )
                if (i === t.length) return o;
              return null;
            },
            setCookie: function (e, t, n, i, o) {
              n = n || 365;
              var s = new Date();
              s.setDate(s.getDate() + n);
              var r = [
                e + "=" + t,
                "expires=" + s.toUTCString(),
                "path=" + o || "/"
              ];
              i && r.push("domain=" + i), (document.cookie = r.join(";"));
            },
            addEventListener: function (e, t, n) {
              e.addEventListener
                ? e.addEventListener(t, n)
                : e.attachEvent("on" + t, n);
            }
          },
          r = (function () {
            var e = "data-cc-event",
              t = "data-cc-if",
              n = function (e, t, i) {
                return s.isArray(t)
                  ? s.each(t, function (t) {
                      n(e, t, i);
                    })
                  : void (e.addEventListener
                      ? e.addEventListener(t, i)
                      : e.attachEvent("on" + t, i));
              },
              i = function (e, t) {
                return e.replace(/\{\{(.*?)\}\}/g, function (e, n) {
                  for (var i, o, r = n.split("||"); (o = r.shift()); ) {
                    if (((o = o.trim()), '"' === o[0]))
                      return o.slice(1, o.length - 1);
                    if ((i = s.queryObject(t, o))) return i;
                  }
                  return "";
                });
              },
              o = function (e) {
                var t = document.createElement("div");
                return (t.innerHTML = e), t.children[0];
              },
              r = function (e, t, n) {
                var i = e.parentNode.querySelectorAll("[" + t + "]");
                s.each(
                  i,
                  function (e) {
                    var i = e.getAttribute(t);
                    n(e, i);
                  },
                  window,
                  !0
                );
              },
              c = function (t, i) {
                r(t, e, function (e, t) {
                  var o = t.split(":"),
                    r = s.queryObject(i, o[1]);
                  n(e, o[0], s.bind(r, i));
                });
              },
              a = function (e, n) {
                r(e, t, function (e, t) {
                  var i = s.queryObject(n, t);
                  i || e.parentNode.removeChild(e);
                });
              };
            return {
              build: function (e, t) {
                s.isArray(e) && (e = e.join("")), (e = i(e, t));
                var n = o(e);
                return c(n, t), a(n, t), n;
              }
            };
          })(),
          c = {
            options: {
              message:
                "This website uses cookies to ensure you get the best experience on our website. ",
              dismiss: "Got it!",
              learnMore: "More info",
              link: null,
              target: "_self",
              container: null,
              theme: "light-floating",
              domain: null,
              path: "/",
              expiryDays: 365,
              markup: [
                '<div class="cc_banner-wrapper {{containerClasses}}">',
                '<div class="cc_banner cc_container cc_container--open">',
                '<a href="#null" data-cc-event="click:dismiss" target="_blank" class="cc_btn cc_btn_accept_all">{{options.dismiss}}</a>',
                '<p class="cc_message">{{options.message}} <a data-cc-if="options.link" target="{{ options.target }}" class="cc_more_info" href="{{options.link || "#null"}}">{{options.learnMore}}</a></p>',
                '<a class="cc_logo" target="_blank" href="http://silktide.com/cookieconsent">Cookie Consent plugin for the EU cookie law</a>',
                "</div>",
                "</div>"
              ]
            },
            init: function () {
              var t = window[e];
              t && this.setOptions(t),
                this.setContainer(),
                this.options.theme ? this.loadTheme(this.render) : this.render();
            },
            setOptionsOnTheFly: function (e) {
              this.setOptions(e), this.render();
            },
            setOptions: function (e) {
              s.merge(this.options, e);
            },
            setContainer: function () {
              this.options.container
                ? (this.container = document.querySelector(
                    this.options.container
                  ))
                : (this.container = document.body),
                (this.containerClasses = ""),
                navigator.appVersion.indexOf("MSIE 8") > -1 &&
                  (this.containerClasses += " cc_ie8");
            },
            loadTheme: function (e) {
              var t = this.options.theme;
              -1 === t.indexOf(".css") && (t = i + t + ".css");
              var n = document.createElement("link");
              (n.rel = "stylesheet"), (n.type = "text/css"), (n.href = t);
              var o = !1;
              (n.onload = s.bind(function () {
                !o && e && (e.call(this), (o = !0));
              }, this)),
                document.getElementsByTagName("head")[0].appendChild(n);
            },
            render: function () {
              this.element &&
                this.element.parentNode &&
                (this.element.parentNode.removeChild(this.element),
                delete this.element),
                (this.element = r.build(this.options.markup, this)),
                this.container.firstChild
                  ? this.container.insertBefore(
                      this.element,
                      this.container.firstChild
                    )
                  : this.container.appendChild(this.element);
            },
            dismiss: function (e) {
              e.preventDefault && e.preventDefault(),
                (e.returnValue = !1),
                this.setDismissedCookie(),
                this.container.removeChild(this.element);
            },
            setDismissedCookie: function () {
              s.setCookie(
                n,
                "yes",
                this.options.expiryDays,
                this.options.domain,
                this.options.path
              );
            }
          },
          a = !1;
        (o = function () {
          a ||
            "complete" != document.readyState ||
            (c.init(), (a = !0), (window[t] = s.bind(c.setOptionsOnTheFly, c)));
        })(),
          s.addEventListener(document, "readystatechange", o);
      }
    }
  })();
  