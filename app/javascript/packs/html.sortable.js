var sortable = (function () {
  "use strict";
  function c(e, t, n) {
    if (void 0 === n) return e && e.h5s && e.h5s.data && e.h5s.data[t];
    (e.h5s = e.h5s || {}), (e.h5s.data = e.h5s.data || {}), (e.h5s.data[t] = n);
  }
  var v = function (e, t) {
      if (
        !(
          e instanceof NodeList ||
          e instanceof HTMLCollection ||
          e instanceof Array
        )
      )
        throw new Error(
          "You must provide a nodeList/HTMLCollection/Array of elements to be filtered."
        );
      return "string" != typeof t
        ? Array.from(e)
        : Array.from(e).filter(function (e) {
            return 1 === e.nodeType && e.matches(t);
          });
    },
    y = new Map(),
    t = (function () {
      function e() {
        (this._config = new Map()),
          (this._placeholder = void 0),
          (this._data = new Map());
      }
      return (
        Object.defineProperty(e.prototype, "config", {
          get: function () {
            var n = {};
            return (
              this._config.forEach(function (e, t) {
                n[t] = e;
              }),
              n
            );
          },
          set: function (e) {
            if ("object" != typeof e)
              throw new Error(
                "You must provide a valid configuration object to the config setter."
              );
            var t = Object.assign({}, e);
            this._config = new Map(Object.entries(t));
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.setConfig = function (e, t) {
          if (!this._config.has(e))
            throw new Error("Trying to set invalid configuration item: " + e);
          this._config.set(e, t);
        }),
        (e.prototype.getConfig = function (e) {
          if (!this._config.has(e))
            throw new Error("Invalid configuration item requested: " + e);
          return this._config.get(e);
        }),
        Object.defineProperty(e.prototype, "placeholder", {
          get: function () {
            return this._placeholder;
          },
          set: function (e) {
            if (!(e instanceof HTMLElement) && null !== e)
              throw new Error("A placeholder must be an html element or null.");
            this._placeholder = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.setData = function (e, t) {
          if ("string" != typeof e)
            throw new Error("The key must be a string.");
          this._data.set(e, t);
        }),
        (e.prototype.getData = function (e) {
          if ("string" != typeof e)
            throw new Error("The key must be a string.");
          return this._data.get(e);
        }),
        (e.prototype.deleteData = function (e) {
          if ("string" != typeof e)
            throw new Error("The key must be a string.");
          return this._data.delete(e);
        }),
        e
      );
    })(),
    E = function (e) {
      if (!(e instanceof HTMLElement))
        throw new Error("Please provide a sortable to the store function.");
      return y.has(e) || y.set(e, new t()), y.get(e);
    };
  function i(e, t, n) {
    if (e instanceof Array) for (var r = 0; r < e.length; ++r) i(e[r], t, n);
    else e.addEventListener(t, n), E(e).setData("event" + t, n);
  }
  function a(e, t) {
    if (e instanceof Array) for (var n = 0; n < e.length; ++n) a(e[n], t);
    else
      e.removeEventListener(t, E(e).getData("event" + t)),
        E(e).deleteData("event" + t);
  }
  function l(e, t, n) {
    if (e instanceof Array) for (var r = 0; r < e.length; ++r) l(e[r], t, n);
    else e.setAttribute(t, n);
  }
  function r(e, t) {
    if (e instanceof Array) for (var n = 0; n < e.length; ++n) r(e[n], t);
    else e.removeAttribute(t);
  }
  var w = function (e) {
      if (!e.parentElement || 0 === e.getClientRects().length)
        throw new Error("target element must be part of the dom");
      var t = e.getClientRects()[0];
      return {
        left: t.left + window.pageXOffset,
        right: t.right + window.pageXOffset,
        top: t.top + window.pageYOffset,
        bottom: t.bottom + window.pageYOffset,
      };
    },
    d = function (n, r) {
      var o;
      return (
        void 0 === r && (r = 0),
        function () {
          for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
          clearTimeout(o),
            (o = setTimeout(function () {
              n.apply(void 0, e);
            }, r));
        }
      );
    },
    b = function (e, t) {
      if (
        !(
          e instanceof HTMLElement &&
          (t instanceof NodeList ||
            t instanceof HTMLCollection ||
            t instanceof Array)
        )
      )
        throw new Error("You must provide an element and a list of elements.");
      return Array.from(t).indexOf(e);
    },
    f = function (e) {
      if (!(e instanceof HTMLElement))
        throw new Error("Element is not a node element.");
      return null !== e.parentNode;
    },
    n = function (e, t, n) {
      if (!(e instanceof HTMLElement && e.parentElement instanceof HTMLElement))
        throw new Error("target and element must be a node");
      e.parentElement.insertBefore(
        t,
        "before" === n ? e : e.nextElementSibling
      );
    },
    T = function (e, t) {
      return n(e, t, "before");
    },
    C = function (e, t) {
      return n(e, t, "after");
    },
    o = function (t, n, e) {
      if (
        (void 0 === n &&
          (n = function (e, t) {
            return e;
          }),
        void 0 === e &&
          (e = function (e) {
            return e;
          }),
        !(t instanceof HTMLElement) || !0 == !t.isSortable)
      )
        throw new Error(
          "You need to provide a sortableContainer to be serialized."
        );
      if ("function" != typeof n || "function" != typeof e)
        throw new Error(
          "You need to provide a valid serializer for items and the container."
        );
      var r = c(t, "opts").items,
        o = v(t.children, r),
        a = o.map(function (e) {
          return { parent: t, node: e, html: e.outerHTML, index: b(e, o) };
        });
      return {
        container: e({ node: t, itemCount: a.length }),
        items: a.map(function (e) {
          return n(e, t);
        }),
      };
    },
    u = function (e, t, n) {
      var r;
      if (
        (void 0 === n && (n = "sortable-placeholder"),
        !(e instanceof HTMLElement))
      )
        throw new Error("You must provide a valid element as a sortable.");
      if (!(t instanceof HTMLElement) && void 0 !== t)
        throw new Error(
          "You must provide a valid element as a placeholder or set ot to undefined."
        );
      return (
        void 0 === t &&
          (["UL", "OL"].includes(e.tagName)
            ? (t = document.createElement("li"))
            : ["TABLE", "TBODY"].includes(e.tagName)
            ? ((t = document.createElement("tr")).innerHTML =
                '<td colspan="100"></td>')
            : (t = document.createElement("div"))),
        "string" == typeof n && (r = t.classList).add.apply(r, n.split(" ")),
        t
      );
    },
    L = function (e) {
      if (!(e instanceof HTMLElement))
        throw new Error("You must provide a valid dom element");
      var n = window.getComputedStyle(e);
      return "border-box" === n.getPropertyValue("box-sizing")
        ? parseInt(n.getPropertyValue("height"), 10)
        : ["height", "padding-top", "padding-bottom"]
            .map(function (e) {
              var t = parseInt(n.getPropertyValue(e), 10);
              return isNaN(t) ? 0 : t;
            })
            .reduce(function (e, t) {
              return e + t;
            });
    },
    x = function (e) {
      if (!(e instanceof HTMLElement))
        throw new Error("You must provide a valid dom element");
      var n = window.getComputedStyle(e);
      return ["width", "padding-left", "padding-right"]
        .map(function (e) {
          var t = parseInt(n.getPropertyValue(e), 10);
          return isNaN(t) ? 0 : t;
        })
        .reduce(function (e, t) {
          return e + t;
        });
    },
    s = function (e, t) {
      if (!(e instanceof Array))
        throw new Error(
          "You must provide a Array of HTMLElements to be filtered."
        );
      return "string" != typeof t
        ? e
        : e
            .filter(function (e) {
              return (
                e.querySelector(t) instanceof HTMLElement ||
                (e.shadowRoot &&
                  e.shadowRoot.querySelector(t) instanceof HTMLElement)
              );
            })
            .map(function (e) {
              return (
                e.querySelector(t) ||
                (e.shadowRoot && e.shadowRoot.querySelector(t))
              );
            });
    },
    p = function (e) {
      return (e.composedPath && e.composedPath()[0]) || e.target;
    },
    m = function (e, t, n) {
      return { element: e, posX: n.pageX - t.left, posY: n.pageY - t.top };
    },
    g = function (e, t, n) {
      if (!(e instanceof Event))
        throw new Error(
          "setDragImage requires a DragEvent as the first argument."
        );
      if (!(t instanceof HTMLElement))
        throw new Error(
          "setDragImage requires the dragged element as the second argument."
        );
      if ((n || (n = m), e.dataTransfer && e.dataTransfer.setDragImage)) {
        var r = n(t, w(t), e);
        if (
          !(r.element instanceof HTMLElement) ||
          "number" != typeof r.posX ||
          "number" != typeof r.posY
        )
          throw new Error(
            "The customDragImage function you provided must return and object with the properties element[string], posX[integer], posY[integer]."
          );
        (e.dataTransfer.effectAllowed = "copyMove"),
          e.dataTransfer.setData("text/plain", p(e).id),
          e.dataTransfer.setDragImage(r.element, r.posX, r.posY);
      }
    },
    M = function (e, t) {
      if (!0 === e.isSortable) {
        var n = E(e).getConfig("acceptFrom");
        if (null !== n && !1 !== n && "string" != typeof n)
          throw new Error(
            'HTML5Sortable: Wrong argument, "acceptFrom" must be "null", "false", or a valid selector string.'
          );
        if (null !== n)
          return (
            !1 !== n &&
            0 <
              n.split(",").filter(function (e) {
                return 0 < e.length && t.matches(e);
              }).length
          );
        if (e === t) return !0;
        if (
          void 0 !== E(e).getConfig("connectWith") &&
          null !== E(e).getConfig("connectWith")
        )
          return (
            E(e).getConfig("connectWith") === E(t).getConfig("connectWith")
          );
      }
      return !1;
    },
    D = {
      items: null,
      connectWith: null,
      disableIEFix: null,
      acceptFrom: null,
      copy: !1,
      placeholder: null,
      placeholderClass: "sortable-placeholder",
      draggingClass: "sortable-dragging",
      hoverClass: !1,
      dropTargetContainerClass: !1,
      debounce: 0,
      throttleTime: 100,
      maxItems: 0,
      itemSerializer: void 0,
      containerSerializer: void 0,
      customDragImage: null,
      orientation: "vertical",
    };
  var H,
    I,
    A,
    S,
    _,
    Y,
    O,
    P,
    z,
    N = function (e, t) {
      if ("string" == typeof E(e).getConfig("hoverClass")) {
        var o = E(e).getConfig("hoverClass").split(" ");
        !0 === t
          ? (i(
              e,
              "mousemove",
              (function (r, o) {
                var a = this;
                if ((void 0 === o && (o = 250), "function" != typeof r))
                  throw new Error(
                    "You must provide a function as the first argument for throttle."
                  );
                if ("number" != typeof o)
                  throw new Error(
                    "You must provide a number as the second argument for throttle."
                  );
                var i = null;
                return function () {
                  for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                  var n = Date.now();
                  (null === i || o <= n - i) && ((i = n), r.apply(a, e));
                };
              })(function (r) {
                0 === r.buttons &&
                  v(e.children, E(e).getConfig("items")).forEach(function (e) {
                    var t, n;
                    e !== r.target
                      ? (t = e.classList).remove.apply(t, o)
                      : (n = e.classList).add.apply(n, o);
                  });
              }, E(e).getConfig("throttleTime"))
            ),
            i(e, "mouseleave", function () {
              v(e.children, E(e).getConfig("items")).forEach(function (e) {
                var t;
                (t = e.classList).remove.apply(t, o);
              });
            }))
          : (a(e, "mousemove"), a(e, "mouseleave"));
      }
    },
    h = function (e) {
      a(e, "dragstart"),
        a(e, "dragend"),
        a(e, "dragover"),
        a(e, "dragenter"),
        a(e, "drop"),
        a(e, "mouseenter"),
        a(e, "mouseleave");
    },
    W = function (e, t) {
      e && a(e, "dragleave"), t && t !== e && a(t, "dragleave");
    },
    j = function (e, t) {
      var n = e;
      return (
        !0 === E(t).getConfig("copy") &&
          (l((n = e.cloneNode(!0)), "aria-copied", "true"),
          e.parentElement.appendChild(n),
          (n.style.display = "none"),
          (n.oldDisplay = e.style.display)),
        n
      );
    },
    F = function (e) {
      var t;
      (t = e).h5s && delete t.h5s.data, r(e, "aria-dropeffect");
    },
    q = function (e) {
      r(e, "aria-grabbed"),
        r(e, "aria-copied"),
        r(e, "draggable"),
        r(e, "role");
    };
  function R(e, t) {
    if (t.composedPath)
      return t.composedPath().find(function (e) {
        return e.isSortable;
      });
    for (; !0 !== e.isSortable; ) e = e.parentElement;
    return e;
  }
  function X(e, t) {
    var n = c(e, "opts"),
      r = v(e.children, n.items).filter(function (e) {
        return e.contains(t) || (e.shadowRoot && e.shadowRoot.contains(t));
      });
    return 0 < r.length ? r[0] : t;
  }
  var B = function (e) {
      var t = c(e, "opts"),
        n = v(e.children, t.items),
        r = s(n, t.handle);
      (l(e, "aria-dropeffect", "move"),
      c(e, "_disabled", "false"),
      l(r, "draggable", "true"),
      !1 === t.disableIEFix) &&
        "function" ==
          typeof (document || window.document).createElement("span").dragDrop &&
        i(r, "mousedown", function () {
          if (-1 !== n.indexOf(this)) this.dragDrop();
          else {
            for (var e = this.parentElement; -1 === n.indexOf(e); )
              e = e.parentElement;
            e.dragDrop();
          }
        });
    },
    k = function (e) {
      var t = c(e, "opts"),
        n = v(e.children, t.items),
        r = s(n, t.handle);
      c(e, "_disabled", "false"),
        h(n),
        W(S, P),
        a(r, "mousedown"),
        a(e, "dragover"),
        a(e, "dragenter"),
        a(e, "drop");
    };
  function U(e, h) {
    var a = String(h);
    return (
      (h = h || {}),
      "string" == typeof e && (e = document.querySelectorAll(e)),
      e instanceof HTMLElement && (e = [e]),
      (e = Array.prototype.slice.call(e)),
      /serialize/.test(a)
        ? e.map(function (e) {
            var t = c(e, "opts");
            return o(e, t.itemSerializer, t.containerSerializer);
          })
        : (e.forEach(function (s) {
            if (/enable|disable|destroy/.test(a)) return U[a](s);
            ["connectWith", "disableIEFix"].forEach(function (e) {
              Object.prototype.hasOwnProperty.call(h, e) &&
                null !== h[e] &&
                console.warn(
                  'HTML5Sortable: You are using the deprecated configuration "' +
                    e +
                    '". This will be removed in an upcoming version, make sure to migrate to the new options when updating.'
                );
            }),
              (h = Object.assign({}, D, E(s).config, h)),
              (E(s).config = h),
              c(s, "opts", h),
              (s.isSortable = !0),
              k(s);
            var e,
              t = v(s.children, h.items);
            if (null !== h.placeholder && void 0 !== h.placeholder) {
              var n = document.createElement(s.tagName);
              h.placeholder instanceof HTMLElement
                ? n.appendChild(h.placeholder)
                : (n.innerHTML = h.placeholder),
                (e = n.children[0]);
            }
            (E(s).placeholder = u(s, e, h.placeholderClass)),
              c(s, "items", h.items),
              h.acceptFrom
                ? c(s, "acceptFrom", h.acceptFrom)
                : h.connectWith && c(s, "connectWith", h.connectWith),
              B(s),
              l(t, "role", "option"),
              l(t, "aria-grabbed", "false"),
              N(s, !0),
              i(s, "dragstart", function (e) {
                var t = p(e);
                if (
                  !0 !== t.isSortable &&
                  (e.stopImmediatePropagation(),
                  (!h.handle || t.matches(h.handle)) &&
                    "false" !== t.getAttribute("draggable"))
                ) {
                  var n = R(t, e),
                    r = X(n, t);
                  (O = v(n.children, h.items)),
                    (_ = O.indexOf(r)),
                    (Y = b(r, n.children)),
                    (S = n),
                    g(e, r, h.customDragImage),
                    (I = L(r)),
                    (A = x(r)),
                    r.classList.add(h.draggingClass),
                    l((H = j(r, n)), "aria-grabbed", "true"),
                    n.dispatchEvent(
                      new CustomEvent("sortstart", {
                        detail: {
                          origin: { elementIndex: Y, index: _, container: S },
                          item: H,
                          originalTarget: t,
                        },
                      })
                    );
                }
              }),
              i(s, "dragenter", function (e) {
                var n = p(e),
                  r = R(n, e);
                r &&
                  r !== P &&
                  ((z = v(r.children, c(r, "items")).filter(function (e) {
                    return e !== E(s).placeholder;
                  })),
                  h.dropTargetContainerClass &&
                    r.classList.add(h.dropTargetContainerClass),
                  r.dispatchEvent(
                    new CustomEvent("sortenter", {
                      detail: {
                        origin: { elementIndex: Y, index: _, container: S },
                        destination: { container: r, itemsBeforeUpdate: z },
                        item: H,
                        originalTarget: n,
                      },
                    })
                  ),
                  i(r, "dragleave", function (e) {
                    var t = e.relatedTarget || e.fromElement;
                    e.currentTarget.contains(t) ||
                      (h.dropTargetContainerClass &&
                        r.classList.remove(h.dropTargetContainerClass),
                      r.dispatchEvent(
                        new CustomEvent("sortleave", {
                          detail: {
                            origin: { elementIndex: Y, index: _, container: r },
                            item: H,
                            originalTarget: n,
                          },
                        })
                      ));
                  })),
                  (P = r);
              }),
              i(s, "dragend", function (e) {
                if (H) {
                  H.classList.remove(h.draggingClass),
                    l(H, "aria-grabbed", "false"),
                    "true" === H.getAttribute("aria-copied") &&
                      "true" !== c(H, "dropped") &&
                      H.remove(),
                    (H.style.display = H.oldDisplay),
                    delete H.oldDisplay;
                  var t = Array.from(y.values())
                    .map(function (e) {
                      return e.placeholder;
                    })
                    .filter(function (e) {
                      return e instanceof HTMLElement;
                    })
                    .filter(f)[0];
                  t && t.remove(),
                    s.dispatchEvent(
                      new CustomEvent("sortstop", {
                        detail: {
                          origin: { elementIndex: Y, index: _, container: S },
                          item: H,
                        },
                      })
                    ),
                    (A = I = H = P = null);
                }
              }),
              i(s, "drop", function (e) {
                if (M(s, H.parentElement)) {
                  e.preventDefault(),
                    e.stopPropagation(),
                    c(H, "dropped", "true");
                  var t = Array.from(y.values())
                    .map(function (e) {
                      return e.placeholder;
                    })
                    .filter(function (e) {
                      return e instanceof HTMLElement;
                    })
                    .filter(f)[0];
                  C(t, H),
                    t.remove(),
                    s.dispatchEvent(
                      new CustomEvent("sortstop", {
                        detail: {
                          origin: { elementIndex: Y, index: _, container: S },
                          item: H,
                        },
                      })
                    );
                  var n = E(s).placeholder,
                    r = v(S.children, h.items).filter(function (e) {
                      return e !== n;
                    }),
                    o = !0 === this.isSortable ? this : this.parentElement,
                    a = v(o.children, c(o, "items")).filter(function (e) {
                      return e !== n;
                    }),
                    i = b(
                      H,
                      Array.from(H.parentElement.children).filter(function (e) {
                        return e !== n;
                      })
                    ),
                    l = b(H, a);
                  h.dropTargetContainerClass &&
                    o.classList.remove(h.dropTargetContainerClass),
                    (Y === i && S === o) ||
                      s.dispatchEvent(
                        new CustomEvent("sortupdate", {
                          detail: {
                            origin: {
                              elementIndex: Y,
                              index: _,
                              container: S,
                              itemsBeforeUpdate: O,
                              items: r,
                            },
                            destination: {
                              index: l,
                              elementIndex: i,
                              container: o,
                              itemsBeforeUpdate: z,
                              items: a,
                            },
                            item: H,
                          },
                        })
                      );
                }
              });
            var o = d(function (t, e, n, r) {
                if (H)
                  if (
                    (h.forcePlaceholderSize &&
                      ((E(t).placeholder.style.height = I + "px"),
                      (E(t).placeholder.style.width = A + "px")),
                    -1 < Array.from(t.children).indexOf(e))
                  ) {
                    var o = L(e),
                      a = x(e),
                      i = b(E(t).placeholder, e.parentElement.children),
                      l = b(e, e.parentElement.children);
                    if (I < o || A < a) {
                      var s = o - I,
                        c = a - A,
                        d = w(e).top,
                        f = w(e).left;
                      if (
                        i < l &&
                        (("vertical" === h.orientation && r < d) ||
                          ("horizontal" === h.orientation && n < f))
                      )
                        return;
                      if (
                        l < i &&
                        (("vertical" === h.orientation && d + o - s < r) ||
                          ("horizontal" === h.orientation && f + a - c < n))
                      )
                        return;
                    }
                    void 0 === H.oldDisplay && (H.oldDisplay = H.style.display),
                      "none" !== H.style.display && (H.style.display = "none");
                    var u = !1;
                    try {
                      var p = w(e).top + e.offsetHeight / 2,
                        m = w(e).left + e.offsetWidth / 2;
                      u =
                        ("vertical" === h.orientation && p <= r) ||
                        ("horizontal" === h.orientation && m <= n);
                    } catch (e) {
                      u = i < l;
                    }
                    u ? C(e, E(t).placeholder) : T(e, E(t).placeholder),
                      Array.from(y.values())
                        .filter(function (e) {
                          return void 0 !== e.placeholder;
                        })
                        .forEach(function (e) {
                          e.placeholder !== E(t).placeholder &&
                            e.placeholder.remove();
                        });
                  } else {
                    var g = Array.from(y.values())
                      .filter(function (e) {
                        return void 0 !== e.placeholder;
                      })
                      .map(function (e) {
                        return e.placeholder;
                      });
                    -1 !== g.indexOf(e) ||
                      t !== e ||
                      v(e.children, h.items).length ||
                      (g.forEach(function (e) {
                        return e.remove();
                      }),
                      e.appendChild(E(t).placeholder));
                  }
              }, h.debounce),
              r = function (e) {
                var t = e.target,
                  n = !0 === t.isSortable ? t : R(t, e);
                if (
                  ((t = X(n, t)),
                  H && M(n, H.parentElement) && "true" !== c(n, "_disabled"))
                ) {
                  var r = c(n, "opts");
                  (parseInt(r.maxItems) &&
                    v(n.children, c(n, "items")).length >=
                      parseInt(r.maxItems) &&
                    H.parentElement !== n) ||
                    (e.preventDefault(),
                    e.stopPropagation(),
                    (e.dataTransfer.dropEffect =
                      !0 === E(n).getConfig("copy") ? "copy" : "move"),
                    o(n, t, e.pageX, e.pageY));
                }
              };
            i(t.concat(s), "dragover", r), i(t.concat(s), "dragenter", r);
          }),
          e)
    );
  }
  return (
    (U.destroy = function (e) {
      var t, n, r, o;
      (n = c((t = e), "opts") || {}),
        (r = v(t.children, n.items)),
        (o = s(r, n.handle)),
        a(t, "dragover"),
        a(t, "dragenter"),
        a(t, "dragstart"),
        a(t, "dragend"),
        a(t, "drop"),
        F(t),
        a(o, "mousedown"),
        h(r),
        q(r),
        W(S, P),
        (t.isSortable = !1);
    }),
    (U.enable = function (e) {
      B(e);
    }),
    (U.disable = function (e) {
      var t, n, r, o;
      (n = c((t = e), "opts")),
        (r = v(t.children, n.items)),
        (o = s(r, n.handle)),
        l(t, "aria-dropeffect", "none"),
        c(t, "_disabled", "true"),
        l(o, "draggable", "false"),
        a(o, "mousedown");
    }),
    (U.__testing = {
      _data: c,
      _removeItemEvents: h,
      _removeItemData: q,
      _removeSortableData: F,
      _removeContainerEvents: W,
    }),
    U
  );
})();
//# sourceMappingURL=html5sortable.min.js.map
