import { n as di, t as Qn } from "./rolldown-runtime-9ZSF5uba.mjs";
import * as l from "react";
import { useCallback as Ke, useEffect as pi, useMemo as hi, useRef as Dt } from "react";
import { ConnectionState as q, ExternalE2EEKeyProvider as vi, LocalTrackPublication as mi, LogLevel as yn, MediaDeviceFailure as gi, Mutex as bi, ParticipantEvent as _, ParticipantKind as ut, Room as Je, RoomEvent as k, RpcError as Ne, TokenSourceConfigurable as yi, Track as O, TrackEvent as Xn, compareVersions as wi, createAudioAnalyser as tn, decodeTokenPayload as Si, facingModeFromLocalTrack as Ei, getBrowser as Ci, isSerializer as Ti, serializers as wn, setLogExtension as xi, setLogLevel as ki } from "livekit-client";
var Pi = (e) => {
  const t = l.useRef(e);
  return l.useEffect(() => {
    t.current = e;
  }), t;
};
function Mi(e, t) {
  const n = Li(), r = Pi(t);
  return l.useLayoutEffect(() => {
    let i = !1;
    const o = e.current;
    if (!o) return;
    function s(a, c) {
      i || r.current(a, c);
    }
    return n?.subscribe(o, s), () => {
      i = !0, n?.unsubscribe(o, s);
    };
  }, [
    e.current,
    n,
    r
  ]), n?.observer;
}
function Ai() {
  let e = !1, t = [];
  const n = /* @__PURE__ */ new Map();
  if (typeof window > "u") return;
  const r = new ResizeObserver((i, o) => {
    t = t.concat(i), e || window.requestAnimationFrame(() => {
      const s = /* @__PURE__ */ new Set();
      for (let a = 0; a < t.length; a++)
        s.has(t[a].target) || (s.add(t[a].target), n.get(t[a].target)?.forEach((c) => c(t[a], o)));
      t = [], e = !1;
    }), e = !0;
  });
  return {
    observer: r,
    subscribe(i, o) {
      r.observe(i);
      const s = n.get(i) ?? [];
      s.push(o), n.set(i, s);
    },
    unsubscribe(i, o) {
      const s = n.get(i) ?? [];
      if (s.length === 1) {
        r.unobserve(i), n.delete(i);
        return;
      }
      const a = s.indexOf(o);
      a !== -1 && s.splice(a, 1), n.set(i, s);
    }
  };
}
var Nt, Li = () => Nt || (Nt = Ai()), Oi = (e) => {
  const [t, n] = l.useState({
    width: 0,
    height: 0
  });
  return l.useLayoutEffect(() => {
    if (e.current) {
      const { width: r, height: i } = e.current.getBoundingClientRect();
      n({
        width: r,
        height: i
      });
    }
  }, [e.current]), Mi(e, l.useCallback((r) => n(r.contentRect), [])), t;
};
function j(e, t, n = !0) {
  const [r, i] = l.useState(t);
  return l.useEffect(() => {
    if (n && i(t), typeof window > "u" || !e) return;
    const o = e.subscribe(i);
    return () => o.unsubscribe();
  }, [e, n]), r;
}
var lt = Math.min, Ae = Math.max, ft = Math.round, rt = Math.floor, fe = (e) => ({
  x: e,
  y: e
}), _i = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Ii(e, t, n) {
  return Ae(e, lt(t, n));
}
function Et(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function We(e) {
  return e.split("-")[0];
}
function Ct(e) {
  return e.split("-")[1];
}
function Zn(e) {
  return e === "x" ? "y" : "x";
}
function er(e) {
  return e === "y" ? "height" : "width";
}
function Ee(e) {
  const t = e[0];
  return t === "t" || t === "b" ? "y" : "x";
}
function tr(e) {
  return Zn(Ee(e));
}
function Ri(e, t, n) {
  n === void 0 && (n = !1);
  const r = Ct(e), i = tr(e), o = er(i);
  let s = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[o] > t.floating[o] && (s = dt(s)), [s, dt(s)];
}
function Di(e) {
  const t = dt(e);
  return [
    qt(e),
    t,
    qt(t)
  ];
}
function qt(e) {
  return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var Sn = ["left", "right"], En = ["right", "left"], Ni = ["top", "bottom"], Fi = ["bottom", "top"];
function Ui(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? En : Sn : t ? Sn : En;
    case "left":
    case "right":
      return t ? Ni : Fi;
    default:
      return [];
  }
}
function $i(e, t, n, r) {
  const i = Ct(e);
  let o = Ui(We(e), n === "start", r);
  return i && (o = o.map((s) => s + "-" + i), t && (o = o.concat(o.map(qt)))), o;
}
function dt(e) {
  const t = We(e);
  return _i[t] + e.slice(t.length);
}
function Wi(e) {
  var t, n, r, i;
  return {
    top: (t = e.top) != null ? t : 0,
    right: (n = e.right) != null ? n : 0,
    bottom: (r = e.bottom) != null ? r : 0,
    left: (i = e.left) != null ? i : 0
  };
}
function ji(e) {
  return typeof e != "number" ? Wi(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function pt(e) {
  const { x: t, y: n, width: r, height: i } = e;
  return {
    width: r,
    height: i,
    top: n,
    left: t,
    right: t + r,
    bottom: n + i,
    x: t,
    y: n
  };
}
function Cn(e, t, n) {
  let { reference: r, floating: i } = e;
  const o = Ee(t), s = tr(t), a = er(s), c = We(t), u = o === "y", f = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, p = r[a] / 2 - i[a] / 2;
  let h;
  switch (c) {
    case "top":
      h = {
        x: f,
        y: r.y - i.height
      };
      break;
    case "bottom":
      h = {
        x: f,
        y: r.y + r.height
      };
      break;
    case "right":
      h = {
        x: r.x + r.width,
        y: d
      };
      break;
    case "left":
      h = {
        x: r.x - i.width,
        y: d
      };
      break;
    default:
      h = {
        x: r.x,
        y: r.y
      };
  }
  const m = Ct(t);
  return m && (h[s] += p * (m === "end" ? 1 : -1) * (n && u ? -1 : 1)), h;
}
async function Bi(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: r, y: i, platform: o, rects: s, elements: a, strategy: c } = e, { boundary: u = "clippingAncestors", rootBoundary: f = "viewport", elementContext: d = "floating", altBoundary: p = !1, padding: h = 0 } = Et(t, e), m = ji(h), S = a[p ? d === "floating" ? "reference" : "floating" : d], y = pt(await o.getClippingRect({
    element: (n = await (o.isElement == null ? void 0 : o.isElement(S))) == null || n ? S : S.contextElement || await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(a.floating)),
    boundary: u,
    rootBoundary: f,
    strategy: c
  })), b = d === "floating" ? {
    x: r,
    y: i,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, w = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(a.floating)), P = await (o.isElement == null ? void 0 : o.isElement(w)) && await (o.getScale == null ? void 0 : o.getScale(w)) || {
    x: 1,
    y: 1
  }, N = pt(o.convertOffsetParentRelativeRectToViewportRelativeRect ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: b,
    offsetParent: w,
    strategy: c
  }) : b);
  return {
    top: (y.top - N.top + m.top) / P.y,
    bottom: (N.bottom - y.bottom + m.bottom) / P.y,
    left: (y.left - N.left + m.left) / P.x,
    right: (N.right - y.right + m.right) / P.x
  };
}
var Vi = 50, Hi = async (e, t, n) => {
  const { placement: r = "bottom", strategy: i = "absolute", middleware: o = [], platform: s } = n, a = s.detectOverflow ? s : {
    ...s,
    detectOverflow: Bi
  }, c = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let u = await s.getElementRects({
    reference: e,
    floating: t,
    strategy: i
  }), { x: f, y: d } = Cn(u, r, c), p = r, h = 0;
  const m = {};
  for (let S = 0; S < o.length; S++) {
    const y = o[S];
    if (!y) continue;
    const { name: b, fn: w } = y, { x: P, y: N, data: M, reset: v } = await w({
      x: f,
      y: d,
      initialPlacement: r,
      placement: p,
      strategy: i,
      middlewareData: m,
      rects: u,
      platform: a,
      elements: {
        reference: e,
        floating: t
      }
    });
    f = P ?? f, d = N ?? d, m[b] = {
      ...m[b],
      ...M
    }, v && h < Vi && (h++, typeof v == "object" && (v.placement && (p = v.placement), v.rects && (u = v.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: i
    }) : v.rects), { x: f, y: d } = Cn(u, p, c)), S = -1);
  }
  return {
    x: f,
    y: d,
    placement: p,
    strategy: i,
    middlewareData: m
  };
}, zi = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const { placement: i, middlewareData: o, rects: s, initialPlacement: a, platform: c, elements: u } = t, { mainAxis: f = !0, crossAxis: d = !0, fallbackPlacements: p, fallbackStrategy: h = "bestFit", fallbackAxisSideDirection: m = "none", flipAlignment: S = !0, ...y } = Et(e, t);
      if ((n = o.arrow) != null && n.alignmentOffset) return {};
      const b = We(i), w = Ee(a), P = We(a) === a, N = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), M = p || (P || !S ? [dt(a)] : Di(a)), v = m !== "none";
      !p && v && M.push(...$i(a, S, m, N));
      const g = [a, ...M], E = await c.detectOverflow(t, y), x = [];
      let C = ((r = o.flip) == null ? void 0 : r.overflows) || [];
      if (f && x.push(E[b]), d) {
        const D = Ri(i, s, N);
        x.push(E[D[0]], E[D[1]]);
      }
      if (C = [...C, {
        placement: i,
        overflows: x
      }], !x.every((D) => D <= 0)) {
        var I, T;
        const D = (((I = o.flip) == null ? void 0 : I.index) || 0) + 1, U = g[D];
        if (U && (!(d === "alignment" && w !== Ee(U)) || C.every((z) => Ee(z.placement) === w ? z.overflows[0] > 0 : !0)))
          return {
            data: {
              index: D,
              overflows: C
            },
            reset: { placement: U }
          };
        let H = (T = C.filter((z) => z.overflows[0] <= 0).sort((z, V) => z.overflows[1] - V.overflows[1])[0]) == null ? void 0 : T.placement;
        if (!H) switch (h) {
          case "bestFit": {
            var A;
            const z = (A = C.filter((V) => {
              if (v) {
                const Q = Ee(V.placement);
                return Q === w || Q === "y";
              }
              return !0;
            }).map((V) => [V.placement, V.overflows.filter((Q) => Q > 0).reduce((Q, xe) => Q + xe, 0)]).sort((V, Q) => V[1] - Q[1])[0]) == null ? void 0 : A[0];
            z && (H = z);
            break;
          }
          case "initialPlacement":
            H = a;
            break;
        }
        if (i !== H) return { reset: { placement: H } };
      }
      return {};
    }
  };
}, qi = /* @__PURE__ */ new Set(["left", "top"]);
async function Ki(e, t) {
  const { placement: n, platform: r, elements: i } = e, o = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), s = We(n), a = Ct(n), c = Ee(n) === "y", u = qi.has(s) ? -1 : 1, f = o && c ? -1 : 1, d = Et(t, e);
  let { mainAxis: p, crossAxis: h, alignmentAxis: m } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return a && typeof m == "number" && (h = a === "end" ? m * -1 : m), c ? {
    x: h * f,
    y: p * u
  } : {
    x: p * u,
    y: h * f
  };
}
var Gi = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const { x: i, y: o, placement: s, middlewareData: a } = t, c = await Ki(t, e);
      return s === ((n = a.offset) == null ? void 0 : n.placement) && (r = a.arrow) != null && r.alignmentOffset ? {} : {
        x: i + c.x,
        y: o + c.y,
        data: {
          ...c,
          placement: s
        }
      };
    }
  };
}, Ji = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const { x: n, y: r, placement: i, platform: o } = t, { mainAxis: s = !0, crossAxis: a = !1, limiter: c = { fn: (w) => {
        let { x: P, y: N } = w;
        return {
          x: P,
          y: N
        };
      } }, ...u } = Et(e, t), f = {
        x: n,
        y: r
      }, d = await o.detectOverflow(t, u), p = Ee(i), h = Zn(p);
      let m = f[h], S = f[p];
      const y = (w, P) => Ii(P + d[w === "y" ? "top" : "left"], P, P - d[w === "y" ? "bottom" : "right"]);
      s && (m = y(h, m)), a && (S = y(p, S));
      const b = c.fn({
        ...t,
        [h]: m,
        [p]: S
      });
      return {
        ...b,
        data: {
          x: b.x - n,
          y: b.y - r,
          enabled: {
            [h]: s,
            [p]: a
          }
        }
      };
    }
  };
};
function Tt() {
  return typeof window < "u";
}
function He(e) {
  return nr(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function ie(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function de(e) {
  var t;
  return (t = (nr(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function nr(e) {
  return Tt() ? e instanceof Node || e instanceof ie(e).Node : !1;
}
function ue(e) {
  return Tt() ? e instanceof Element || e instanceof ie(e).Element : !1;
}
function ye(e) {
  return Tt() ? e instanceof HTMLElement || e instanceof ie(e).HTMLElement : !1;
}
function Tn(e) {
  return !Tt() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof ie(e).ShadowRoot;
}
function Ze(e) {
  const { overflow: t, overflowX: n, overflowY: r, display: i } = le(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Yi(e) {
  return /^(table|td|th)$/.test(He(e));
}
function xt(e) {
  try {
    if (e.matches(":popover-open")) return !0;
  } catch {
  }
  try {
    return e.matches(":modal");
  } catch {
    return !1;
  }
}
var Qi = /transform|translate|scale|rotate|perspective|filter/, Xi = /paint|layout|strict|content/, ke = (e) => !!e && e !== "none", Ft;
function nn(e) {
  const t = ue(e) ? le(e) : e;
  return ke(t.transform) || ke(t.translate) || ke(t.scale) || ke(t.rotate) || ke(t.perspective) || !rn() && (ke(t.backdropFilter) || ke(t.filter)) || Qi.test(t.willChange || "") || Xi.test(t.contain || "");
}
function Zi(e) {
  let t = Ce(e);
  for (; ye(t) && !je(t); ) {
    if (nn(t)) return t;
    if (xt(t)) return null;
    t = Ce(t);
  }
  return null;
}
function rn() {
  return Ft == null && (Ft = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Ft;
}
function je(e) {
  return /^(html|body|#document)$/.test(He(e));
}
function le(e) {
  return ie(e).getComputedStyle(e);
}
function kt(e) {
  return ue(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Ce(e) {
  if (He(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || Tn(e) && e.host || de(e);
  return Tn(t) ? t.host : t;
}
function rr(e) {
  const t = Ce(e);
  return je(t) ? (e.ownerDocument || e).body : ye(t) && Ze(t) ? t : rr(t);
}
function Ye(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const i = rr(e), o = i === ((r = e.ownerDocument) == null ? void 0 : r.body), s = ie(i);
  if (o) {
    const a = Kt(s);
    return t.concat(s, s.visualViewport || [], Ze(i) ? i : [], a && n ? Ye(a) : []);
  } else return t.concat(i, Ye(i, [], n));
}
function Kt(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function ir(e) {
  const t = le(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const i = ye(e), o = i ? e.offsetWidth : n, s = i ? e.offsetHeight : r, a = ft(n) !== o || ft(r) !== s;
  return a && (n = o, r = s), {
    width: n,
    height: r,
    $: a
  };
}
function on(e) {
  return ue(e) ? e : e.contextElement;
}
function Fe(e) {
  const t = on(e);
  if (!ye(t)) return fe(1);
  const n = t.getBoundingClientRect(), { width: r, height: i, $: o } = ir(t);
  let s = (o ? ft(n.width) : n.width) / r, a = (o ? ft(n.height) : n.height) / i;
  return (!s || !Number.isFinite(s)) && (s = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: s,
    y: a
  };
}
var eo = /* @__PURE__ */ fe(0);
function or(e) {
  const t = ie(e);
  return !rn() || !t.visualViewport ? eo : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function to(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== ie(e) ? !1 : t;
}
function Le(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const i = e.getBoundingClientRect(), o = on(e);
  let s = fe(1);
  t && (r ? ue(r) && (s = Fe(r)) : s = Fe(e));
  const a = to(o, n, r) ? or(o) : fe(0);
  let c = (i.left + a.x) / s.x, u = (i.top + a.y) / s.y, f = i.width / s.x, d = i.height / s.y;
  if (o) {
    const p = ie(o), h = r && ue(r) ? ie(r) : r;
    let m = p, S = Kt(m);
    for (; S && r && h !== m; ) {
      const y = Fe(S), b = S.getBoundingClientRect(), w = le(S), P = b.left + (S.clientLeft + parseFloat(w.paddingLeft)) * y.x, N = b.top + (S.clientTop + parseFloat(w.paddingTop)) * y.y;
      c *= y.x, u *= y.y, f *= y.x, d *= y.y, c += P, u += N, m = ie(S), S = Kt(m);
    }
  }
  return pt({
    width: f,
    height: d,
    x: c,
    y: u
  });
}
function Pt(e, t) {
  const n = kt(e).scrollLeft;
  return t ? t.left + n : Le(de(e)).left + n;
}
function sr(e, t) {
  const n = e.getBoundingClientRect();
  return {
    x: n.left + t.scrollLeft - Pt(e, n),
    y: n.top + t.scrollTop
  };
}
function no(e) {
  let { elements: t, rect: n, offsetParent: r, strategy: i } = e;
  const o = i === "fixed", s = de(r), a = t ? xt(t.floating) : !1;
  if (r === s || a && o) return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = fe(1);
  const f = fe(0), d = ye(r);
  if ((d || !d && !o) && ((He(r) !== "body" || Ze(s)) && (c = kt(r)), d)) {
    const h = Le(r);
    u = Fe(r), f.x = h.x + r.clientLeft, f.y = h.y + r.clientTop;
  }
  const p = s && !d && !o ? sr(s, c) : fe(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - c.scrollLeft * u.x + f.x + p.x,
    y: n.y * u.y - c.scrollTop * u.y + f.y + p.y
  };
}
function ro(e) {
  return Array.from(e.getClientRects());
}
function io(e) {
  const t = de(e), n = kt(e), r = e.ownerDocument.body, i = Ae(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), o = Ae(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + Pt(e);
  const a = -n.scrollTop;
  return le(r).direction === "rtl" && (s += Ae(t.clientWidth, r.clientWidth) - i), {
    width: i,
    height: o,
    x: s,
    y: a
  };
}
var xn = 25;
function oo(e, t) {
  const n = ie(e), r = de(e), i = n.visualViewport;
  let o = r.clientWidth, s = r.clientHeight, a = 0, c = 0;
  if (i) {
    o = i.width, s = i.height;
    const f = rn();
    (!f || f && t === "fixed") && (a = i.offsetLeft, c = i.offsetTop);
  }
  const u = Pt(r);
  if (u <= 0) {
    const f = r.ownerDocument, d = f.body, p = getComputedStyle(d), h = f.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight) || 0, m = Math.abs(r.clientWidth - d.clientWidth - h);
    m <= xn && (o -= m);
  } else u <= xn && (o += u);
  return {
    width: o,
    height: s,
    x: a,
    y: c
  };
}
function so(e, t) {
  const n = Le(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, o = ye(e) ? Fe(e) : fe(1);
  return {
    width: e.clientWidth * o.x,
    height: e.clientHeight * o.y,
    x: i * o.x,
    y: r * o.y
  };
}
function kn(e, t, n) {
  let r;
  if (t === "viewport") r = oo(e, n);
  else if (t === "document") r = io(de(e));
  else if (ue(t)) r = so(t, n);
  else {
    const i = or(e);
    r = {
      x: t.x - i.x,
      y: t.y - i.y,
      width: t.width,
      height: t.height
    };
  }
  return pt(r);
}
function ar(e, t) {
  const n = Ce(e);
  return n === t || !ue(n) || je(n) ? !1 : le(n).position === "fixed" || ar(n, t);
}
function ao(e, t) {
  const n = t.get(e);
  if (n) return n;
  let r = Ye(e, [], !1).filter((a) => ue(a) && He(a) !== "body"), i = null;
  const o = le(e).position === "fixed";
  let s = o ? Ce(e) : e;
  for (; ue(s) && !je(s); ) {
    const a = le(s), c = nn(s);
    !c && a.position === "fixed" && (i = null), (o ? !c && !i : !c && a.position === "static" && i && (i.position === "absolute" || i.position === "fixed") || Ze(s) && !c && ar(e, s)) ? r = r.filter((u) => u !== s) : i = a, s = Ce(s);
  }
  return t.set(e, r), r;
}
function co(e) {
  let { element: t, boundary: n, rootBoundary: r, strategy: i } = e;
  const o = [...n === "clippingAncestors" ? xt(t) ? [] : ao(t, this._c) : [].concat(n), r], s = kn(t, o[0], i);
  let a = s.top, c = s.right, u = s.bottom, f = s.left;
  for (let d = 1; d < o.length; d++) {
    const p = kn(t, o[d], i);
    a = Ae(p.top, a), c = lt(p.right, c), u = lt(p.bottom, u), f = Ae(p.left, f);
  }
  return {
    width: c - f,
    height: u - a,
    x: f,
    y: a
  };
}
function uo(e) {
  const { width: t, height: n } = ir(e);
  return {
    width: t,
    height: n
  };
}
function lo(e, t, n) {
  const r = ye(t), i = de(t), o = n === "fixed", s = Le(e, !0, o, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = fe(0);
  function u() {
    c.x = Pt(i);
  }
  if (r || !r && !o)
    if ((He(t) !== "body" || Ze(i)) && (a = kt(t)), r) {
      const d = Le(t, !0, o, t);
      c.x = d.x + t.clientLeft, c.y = d.y + t.clientTop;
    } else i && u();
  o && !r && i && u();
  const f = i && !r && !o ? sr(i, a) : fe(0);
  return {
    x: s.left + a.scrollLeft - c.x - f.x,
    y: s.top + a.scrollTop - c.y - f.y,
    width: s.width,
    height: s.height
  };
}
function Ut(e) {
  return le(e).position === "static";
}
function Pn(e, t) {
  if (!ye(e) || le(e).position === "fixed") return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return de(e) === n && (n = n.ownerDocument.body), n;
}
function cr(e, t) {
  const n = ie(e);
  if (xt(e)) return n;
  if (!ye(e)) {
    let i = Ce(e);
    for (; i && !je(i); ) {
      if (ue(i) && !Ut(i)) return i;
      i = Ce(i);
    }
    return n;
  }
  let r = Pn(e, t);
  for (; r && Yi(r) && Ut(r); ) r = Pn(r, t);
  return r && je(r) && Ut(r) && !nn(r) ? n : r || Zi(e) || n;
}
var fo = async function(e) {
  const t = this.getOffsetParent || cr, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: lo(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function po(e) {
  return le(e).direction === "rtl";
}
var ho = {
  convertOffsetParentRelativeRectToViewportRelativeRect: no,
  getDocumentElement: de,
  getClippingRect: co,
  getOffsetParent: cr,
  getElementRects: fo,
  getClientRects: ro,
  getDimensions: uo,
  getScale: Fe,
  isElement: ue,
  isRTL: po
};
function ur(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function vo(e, t) {
  let n = null, r;
  const i = de(e);
  function o() {
    var a;
    clearTimeout(r), (a = n) == null || a.disconnect(), n = null;
  }
  function s(a, c) {
    a === void 0 && (a = !1), c === void 0 && (c = 1), o();
    const u = e.getBoundingClientRect(), { left: f, top: d, width: p, height: h } = u;
    if (a || t(), !p || !h) return;
    const m = rt(d), S = rt(i.clientWidth - (f + p)), y = rt(i.clientHeight - (d + h)), b = rt(f), w = {
      rootMargin: -m + "px " + -S + "px " + -y + "px " + -b + "px",
      threshold: Ae(0, lt(1, c)) || 1
    };
    let P = !0;
    function N(M) {
      const v = M[0].intersectionRatio;
      if (v !== c) {
        if (!P) return s();
        v ? s(!1, v) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      v === 1 && !ur(u, e.getBoundingClientRect()) && s(), P = !1;
    }
    try {
      n = new IntersectionObserver(N, {
        ...w,
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(N, w);
    }
    n.observe(e);
  }
  return s(!0), o;
}
function mo(e, t, n, r) {
  r === void 0 && (r = {});
  const { ancestorScroll: i = !0, ancestorResize: o = !0, elementResize: s = typeof ResizeObserver == "function", layoutShift: a = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, u = on(e), f = i || o ? [...u ? Ye(u) : [], ...t ? Ye(t) : []] : [];
  f.forEach((b) => {
    i && b.addEventListener("scroll", n, { passive: !0 }), o && b.addEventListener("resize", n);
  });
  const d = u && a ? vo(u, n) : null;
  let p = -1, h = null;
  s && (h = new ResizeObserver((b) => {
    let [w] = b;
    w && w.target === u && h && t && (h.unobserve(t), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      var P;
      (P = h) == null || P.observe(t);
    })), n();
  }), u && !c && h.observe(u), t && h.observe(t));
  let m, S = c ? Le(e) : null;
  c && y();
  function y() {
    const b = Le(e);
    S && !ur(S, b) && n(), S = b, m = requestAnimationFrame(y);
  }
  return n(), () => {
    var b;
    f.forEach((w) => {
      i && w.removeEventListener("scroll", n), o && w.removeEventListener("resize", n);
    }), d?.(), (b = h) == null || b.disconnect(), h = null, c && cancelAnimationFrame(m);
  };
}
var go = Gi, bo = Ji, yo = zi, wo = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), i = {
    platform: ho,
    ...n
  }, o = {
    ...i.platform,
    _c: r
  };
  return Hi(e, t, {
    ...i,
    platform: o
  });
}, So = /* @__PURE__ */ Qn(((e, t) => {
  (function(n, r) {
    "use strict";
    typeof define == "function" && define.amd ? define(r) : typeof t == "object" && t.exports ? t.exports = r() : n.log = r();
  })(e, function() {
    "use strict";
    var n = function() {
    }, r = "undefined", i = typeof window !== r && typeof window.navigator !== r && /Trident\/|MSIE /.test(window.navigator.userAgent), o = [
      "trace",
      "debug",
      "info",
      "warn",
      "error"
    ], s = {}, a = null;
    function c(y, b) {
      var w = y[b];
      if (typeof w.bind == "function") return w.bind(y);
      try {
        return Function.prototype.bind.call(w, y);
      } catch {
        return function() {
          return Function.prototype.apply.apply(w, [y, arguments]);
        };
      }
    }
    function u() {
      console.log && (console.log.apply ? console.log.apply(console, arguments) : Function.prototype.apply.apply(console.log, [console, arguments])), console.trace && console.trace();
    }
    function f(y) {
      return y === "debug" && (y = "log"), typeof console === r ? !1 : y === "trace" && i ? u : console[y] !== void 0 ? c(console, y) : console.log !== void 0 ? c(console, "log") : n;
    }
    function d() {
      for (var y = this.getLevel(), b = 0; b < o.length; b++) {
        var w = o[b];
        this[w] = b < y ? n : this.methodFactory(w, y, this.name);
      }
      if (this.log = this.debug, typeof console === r && y < this.levels.SILENT) return "No console available for logging";
    }
    function p(y) {
      return function() {
        typeof console !== r && (d.call(this), this[y].apply(this, arguments));
      };
    }
    function h(y, b, w) {
      return f(y) || p.apply(this, arguments);
    }
    function m(y, b) {
      var w = this, P, N, M, v = "loglevel";
      typeof y == "string" ? v += ":" + y : typeof y == "symbol" && (v = void 0);
      function g(T) {
        var A = (o[T] || "silent").toUpperCase();
        if (!(typeof window === r || !v)) {
          try {
            window.localStorage[v] = A;
            return;
          } catch {
          }
          try {
            window.document.cookie = encodeURIComponent(v) + "=" + A + ";";
          } catch {
          }
        }
      }
      function E() {
        var T;
        if (!(typeof window === r || !v)) {
          try {
            T = window.localStorage[v];
          } catch {
          }
          if (typeof T === r) try {
            var A = window.document.cookie, D = encodeURIComponent(v), U = A.indexOf(D + "=");
            U !== -1 && (T = /^([^;]+)/.exec(A.slice(U + D.length + 1))[1]);
          } catch {
          }
          return w.levels[T] === void 0 && (T = void 0), T;
        }
      }
      function x() {
        if (!(typeof window === r || !v)) {
          try {
            window.localStorage.removeItem(v);
          } catch {
          }
          try {
            window.document.cookie = encodeURIComponent(v) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          } catch {
          }
        }
      }
      function C(T) {
        var A = T;
        if (typeof A == "string" && w.levels[A.toUpperCase()] !== void 0 && (A = w.levels[A.toUpperCase()]), typeof A == "number" && A >= 0 && A <= w.levels.SILENT) return A;
        throw new TypeError("log.setLevel() called with invalid level: " + T);
      }
      w.name = y, w.levels = {
        TRACE: 0,
        DEBUG: 1,
        INFO: 2,
        WARN: 3,
        ERROR: 4,
        SILENT: 5
      }, w.methodFactory = b || h, w.getLevel = function() {
        return M ?? N ?? P;
      }, w.setLevel = function(T, A) {
        return M = C(T), A !== !1 && g(M), d.call(w);
      }, w.setDefaultLevel = function(T) {
        N = C(T), E() || w.setLevel(T, !1);
      }, w.resetLevel = function() {
        M = null, x(), d.call(w);
      }, w.enableAll = function(T) {
        w.setLevel(w.levels.TRACE, T);
      }, w.disableAll = function(T) {
        w.setLevel(w.levels.SILENT, T);
      }, w.rebuild = function() {
        if (a !== w && (P = C(a.getLevel())), d.call(w), a === w) for (var T in s) s[T].rebuild();
      }, P = C(a ? a.getLevel() : "WARN");
      var I = E();
      I != null && (M = C(I)), d.call(w);
    }
    a = new m(), a.getLogger = function(b) {
      if (typeof b != "symbol" && typeof b != "string" || b === "") throw new TypeError("You must supply a name when creating a logger.");
      var w = s[b];
      return w || (w = s[b] = new m(b, a.methodFactory)), w;
    };
    var S = typeof window !== r ? window.log : void 0;
    return a.noConflict = function() {
      return typeof window !== r && window.log === a && (window.log = S), a;
    }, a.getLoggers = function() {
      return s;
    }, a.default = a, a;
  });
})), Gt = function(e, t) {
  return Gt = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, r) {
    n.__proto__ = r;
  } || function(n, r) {
    for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (n[i] = r[i]);
  }, Gt(e, t);
};
function we(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Gt(e, t);
  function n() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
function Eo(e, t, n, r) {
  function i(o) {
    return o instanceof n ? o : new n(function(s) {
      s(o);
    });
  }
  return new (n || (n = Promise))(function(o, s) {
    function a(f) {
      try {
        u(r.next(f));
      } catch (d) {
        s(d);
      }
    }
    function c(f) {
      try {
        u(r.throw(f));
      } catch (d) {
        s(d);
      }
    }
    function u(f) {
      f.done ? o(f.value) : i(f.value).then(a, c);
    }
    u((r = r.apply(e, t || [])).next());
  });
}
function lr(e, t) {
  var n = {
    label: 0,
    sent: function() {
      if (o[0] & 1) throw o[1];
      return o[1];
    },
    trys: [],
    ops: []
  }, r, i, o, s = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return s.next = a(0), s.throw = a(1), s.return = a(2), typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function a(u) {
    return function(f) {
      return c([u, f]);
    };
  }
  function c(u) {
    if (r) throw new TypeError("Generator is already executing.");
    for (; s && (s = 0, u[0] && (n = 0)), n; ) try {
      if (r = 1, i && (o = u[0] & 2 ? i.return : u[0] ? i.throw || ((o = i.return) && o.call(i), 0) : i.next) && !(o = o.call(i, u[1])).done) return o;
      switch (i = 0, o && (u = [u[0] & 2, o.value]), u[0]) {
        case 0:
        case 1:
          o = u;
          break;
        case 4:
          return n.label++, {
            value: u[1],
            done: !1
          };
        case 5:
          n.label++, i = u[1], u = [0];
          continue;
        case 7:
          u = n.ops.pop(), n.trys.pop();
          continue;
        default:
          if (o = n.trys, !(o = o.length > 0 && o[o.length - 1]) && (u[0] === 6 || u[0] === 2)) {
            n = 0;
            continue;
          }
          if (u[0] === 3 && (!o || u[1] > o[0] && u[1] < o[3])) {
            n.label = u[1];
            break;
          }
          if (u[0] === 6 && n.label < o[1]) {
            n.label = o[1], o = u;
            break;
          }
          if (o && n.label < o[2]) {
            n.label = o[2], n.ops.push(u);
            break;
          }
          o[2] && n.ops.pop(), n.trys.pop();
          continue;
      }
      u = t.call(e, n);
    } catch (f) {
      u = [6, f], i = 0;
    } finally {
      r = o = 0;
    }
    if (u[0] & 5) throw u[1];
    return {
      value: u[0] ? u[1] : void 0,
      done: !0
    };
  }
}
function Be(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == "number") return { next: function() {
    return e && r >= e.length && (e = void 0), {
      value: e && e[r++],
      done: !e
    };
  } };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function ge(e, t) {
  var n = typeof Symbol == "function" && e[Symbol.iterator];
  if (!n) return e;
  var r = n.call(e), i, o = [], s;
  try {
    for (; (t === void 0 || t-- > 0) && !(i = r.next()).done; ) o.push(i.value);
  } catch (a) {
    s = { error: a };
  } finally {
    try {
      i && !i.done && (n = r.return) && n.call(r);
    } finally {
      if (s) throw s.error;
    }
  }
  return o;
}
function Te(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = t.length, o; r < i; r++) (o || !(r in t)) && (o || (o = Array.prototype.slice.call(t, 0, r)), o[r] = t[r]);
  return e.concat(o || Array.prototype.slice.call(t));
}
function Ue(e) {
  return this instanceof Ue ? (this.v = e, this) : new Ue(e);
}
function Co(e, t, n) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = n.apply(e, t || []), i, o = [];
  return i = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), a("next"), a("throw"), a("return", s), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function s(h) {
    return function(m) {
      return Promise.resolve(m).then(h, d);
    };
  }
  function a(h, m) {
    r[h] && (i[h] = function(S) {
      return new Promise(function(y, b) {
        o.push([
          h,
          S,
          y,
          b
        ]) > 1 || c(h, S);
      });
    }, m && (i[h] = m(i[h])));
  }
  function c(h, m) {
    try {
      u(r[h](m));
    } catch (S) {
      p(o[0][3], S);
    }
  }
  function u(h) {
    h.value instanceof Ue ? Promise.resolve(h.value.v).then(f, d) : p(o[0][2], h);
  }
  function f(h) {
    c("next", h);
  }
  function d(h) {
    c("throw", h);
  }
  function p(h, m) {
    h(m), o.shift(), o.length && c(o[0][0], o[0][1]);
  }
}
function To(e) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator], n;
  return t ? t.call(e) : (e = typeof Be == "function" ? Be(e) : e[Symbol.iterator](), n = {}, r("next"), r("throw"), r("return"), n[Symbol.asyncIterator] = function() {
    return this;
  }, n);
  function r(o) {
    n[o] = e[o] && function(s) {
      return new Promise(function(a, c) {
        s = e[o](s), i(a, c, s.done, s.value);
      });
    };
  }
  function i(o, s, a, c) {
    Promise.resolve(c).then(function(u) {
      o({
        value: u,
        done: a
      });
    }, s);
  }
}
function $(e) {
  return typeof e == "function";
}
function sn(e) {
  var t = function(r) {
    Error.call(r), r.stack = (/* @__PURE__ */ new Error()).stack;
  }, n = e(t);
  return n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n;
}
var $t = sn(function(e) {
  return function(n) {
    e(this), this.message = n ? n.length + ` errors occurred during unsubscription:
` + n.map(function(r, i) {
      return i + 1 + ") " + r.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = n;
  };
});
function ht(e, t) {
  if (e) {
    var n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
  }
}
var et = (function() {
  function e(t) {
    this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return e.prototype.unsubscribe = function() {
    var t, n, r, i, o;
    if (!this.closed) {
      this.closed = !0;
      var s = this._parentage;
      if (s)
        if (this._parentage = null, Array.isArray(s)) try {
          for (var a = Be(s), c = a.next(); !c.done; c = a.next()) c.value.remove(this);
        } catch (m) {
          t = { error: m };
        } finally {
          try {
            c && !c.done && (n = a.return) && n.call(a);
          } finally {
            if (t) throw t.error;
          }
        }
        else s.remove(this);
      var u = this.initialTeardown;
      if ($(u)) try {
        u();
      } catch (m) {
        o = m instanceof $t ? m.errors : [m];
      }
      var f = this._finalizers;
      if (f) {
        this._finalizers = null;
        try {
          for (var d = Be(f), p = d.next(); !p.done; p = d.next()) {
            var h = p.value;
            try {
              Mn(h);
            } catch (m) {
              o = o ?? [], m instanceof $t ? o = Te(Te([], ge(o)), ge(m.errors)) : o.push(m);
            }
          }
        } catch (m) {
          r = { error: m };
        } finally {
          try {
            p && !p.done && (i = d.return) && i.call(d);
          } finally {
            if (r) throw r.error;
          }
        }
      }
      if (o) throw new $t(o);
    }
  }, e.prototype.add = function(t) {
    var n;
    if (t && t !== this) if (this.closed) Mn(t);
    else {
      if (t instanceof e) {
        if (t.closed || t._hasParent(this)) return;
        t._addParent(this);
      }
      (this._finalizers = (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t);
    }
  }, e.prototype._hasParent = function(t) {
    var n = this._parentage;
    return n === t || Array.isArray(n) && n.includes(t);
  }, e.prototype._addParent = function(t) {
    var n = this._parentage;
    this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
  }, e.prototype._removeParent = function(t) {
    var n = this._parentage;
    n === t ? this._parentage = null : Array.isArray(n) && ht(n, t);
  }, e.prototype.remove = function(t) {
    var n = this._finalizers;
    n && ht(n, t), t instanceof e && t._removeParent(this);
  }, e.EMPTY = (function() {
    var t = new e();
    return t.closed = !0, t;
  })(), e;
})(), fr = et.EMPTY;
function dr(e) {
  return e instanceof et || e && "closed" in e && $(e.remove) && $(e.add) && $(e.unsubscribe);
}
function Mn(e) {
  $(e) ? e() : e.unsubscribe();
}
var Oe = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, vt = {
  setTimeout: function(e, t) {
    for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
    var i = vt.delegate;
    return i?.setTimeout ? i.setTimeout.apply(i, Te([e, t], ge(n))) : setTimeout.apply(void 0, Te([e, t], ge(n)));
  },
  clearTimeout: function(e) {
    var t = vt.delegate;
    return (t?.clearTimeout || clearTimeout)(e);
  },
  delegate: void 0
};
function pr(e) {
  vt.setTimeout(function() {
    var t = Oe.onUnhandledError;
    if (t) t(e);
    else throw e;
  });
}
function mt() {
}
var xo = (function() {
  return an("C", void 0, void 0);
})();
function ko(e) {
  return an("E", void 0, e);
}
function Po(e) {
  return an("N", e, void 0);
}
function an(e, t, n) {
  return {
    kind: e,
    value: t,
    error: n
  };
}
var Me = null;
function at(e) {
  if (Oe.useDeprecatedSynchronousErrorHandling) {
    var t = !Me;
    if (t && (Me = {
      errorThrown: !1,
      error: null
    }), e(), t) {
      var n = Me, r = n.errorThrown, i = n.error;
      if (Me = null, r) throw i;
    }
  } else e();
}
function Mo(e) {
  Oe.useDeprecatedSynchronousErrorHandling && Me && (Me.errorThrown = !0, Me.error = e);
}
var cn = (function(e) {
  we(t, e);
  function t(n) {
    var r = e.call(this) || this;
    return r.isStopped = !1, n ? (r.destination = n, dr(n) && n.add(r)) : r.destination = _o, r;
  }
  return t.create = function(n, r, i) {
    return new Qe(n, r, i);
  }, t.prototype.next = function(n) {
    this.isStopped ? jt(Po(n), this) : this._next(n);
  }, t.prototype.error = function(n) {
    this.isStopped ? jt(ko(n), this) : (this.isStopped = !0, this._error(n));
  }, t.prototype.complete = function() {
    this.isStopped ? jt(xo, this) : (this.isStopped = !0, this._complete());
  }, t.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this), this.destination = null);
  }, t.prototype._next = function(n) {
    this.destination.next(n);
  }, t.prototype._error = function(n) {
    try {
      this.destination.error(n);
    } finally {
      this.unsubscribe();
    }
  }, t.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, t;
})(et), Ao = Function.prototype.bind;
function Wt(e, t) {
  return Ao.call(e, t);
}
var Lo = (function() {
  function e(t) {
    this.partialObserver = t;
  }
  return e.prototype.next = function(t) {
    var n = this.partialObserver;
    if (n.next) try {
      n.next(t);
    } catch (r) {
      it(r);
    }
  }, e.prototype.error = function(t) {
    var n = this.partialObserver;
    if (n.error) try {
      n.error(t);
    } catch (r) {
      it(r);
    }
    else it(t);
  }, e.prototype.complete = function() {
    var t = this.partialObserver;
    if (t.complete) try {
      t.complete();
    } catch (n) {
      it(n);
    }
  }, e;
})(), Qe = (function(e) {
  we(t, e);
  function t(n, r, i) {
    var o = e.call(this) || this, s;
    if ($(n) || !n) s = {
      next: n ?? void 0,
      error: r ?? void 0,
      complete: i ?? void 0
    };
    else {
      var a;
      o && Oe.useDeprecatedNextContext ? (a = Object.create(n), a.unsubscribe = function() {
        return o.unsubscribe();
      }, s = {
        next: n.next && Wt(n.next, a),
        error: n.error && Wt(n.error, a),
        complete: n.complete && Wt(n.complete, a)
      }) : s = n;
    }
    return o.destination = new Lo(s), o;
  }
  return t;
})(cn);
function it(e) {
  Oe.useDeprecatedSynchronousErrorHandling ? Mo(e) : pr(e);
}
function Oo(e) {
  throw e;
}
function jt(e, t) {
  var n = Oe.onStoppedNotification;
  n && vt.setTimeout(function() {
    return n(e, t);
  });
}
var _o = {
  closed: !0,
  next: mt,
  error: Oo,
  complete: mt
}, un = (function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
function Mt(e) {
  return e;
}
function Io(e) {
  return e.length === 0 ? Mt : e.length === 1 ? e[0] : function(n) {
    return e.reduce(function(r, i) {
      return i(r);
    }, n);
  };
}
var B = (function() {
  function e(t) {
    t && (this._subscribe = t);
  }
  return e.prototype.lift = function(t) {
    var n = new e();
    return n.source = this, n.operator = t, n;
  }, e.prototype.subscribe = function(t, n, r) {
    var i = this, o = Do(t) ? t : new Qe(t, n, r);
    return at(function() {
      var s = i, a = s.operator, c = s.source;
      o.add(a ? a.call(o, c) : c ? i._subscribe(o) : i._trySubscribe(o));
    }), o;
  }, e.prototype._trySubscribe = function(t) {
    try {
      return this._subscribe(t);
    } catch (n) {
      t.error(n);
    }
  }, e.prototype.forEach = function(t, n) {
    var r = this;
    return n = An(n), new n(function(i, o) {
      var s = new Qe({
        next: function(a) {
          try {
            t(a);
          } catch (c) {
            o(c), s.unsubscribe();
          }
        },
        error: o,
        complete: i
      });
      r.subscribe(s);
    });
  }, e.prototype._subscribe = function(t) {
    var n;
    return (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(t);
  }, e.prototype[un] = function() {
    return this;
  }, e.prototype.pipe = function() {
    for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
    return Io(t)(this);
  }, e.prototype.toPromise = function(t) {
    var n = this;
    return t = An(t), new t(function(r, i) {
      var o;
      n.subscribe(function(s) {
        return o = s;
      }, function(s) {
        return i(s);
      }, function() {
        return r(o);
      });
    });
  }, e.create = function(t) {
    return new e(t);
  }, e;
})();
function An(e) {
  var t;
  return (t = e ?? Oe.Promise) !== null && t !== void 0 ? t : Promise;
}
function Ro(e) {
  return e && $(e.next) && $(e.error) && $(e.complete);
}
function Do(e) {
  return e && e instanceof cn || Ro(e) && dr(e);
}
function No(e) {
  return $(e?.lift);
}
function Y(e) {
  return function(t) {
    if (No(t)) return t.lift(function(n) {
      try {
        return e(n, this);
      } catch (r) {
        this.error(r);
      }
    });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function te(e, t, n, r, i) {
  return new Fo(e, t, n, r, i);
}
var Fo = (function(e) {
  we(t, e);
  function t(n, r, i, o, s, a) {
    var c = e.call(this, n) || this;
    return c.onFinalize = s, c.shouldUnsubscribe = a, c._next = r ? function(u) {
      try {
        r(u);
      } catch (f) {
        n.error(f);
      }
    } : e.prototype._next, c._error = o ? function(u) {
      try {
        o(u);
      } catch (f) {
        n.error(f);
      } finally {
        this.unsubscribe();
      }
    } : e.prototype._error, c._complete = i ? function() {
      try {
        i();
      } catch (u) {
        n.error(u);
      } finally {
        this.unsubscribe();
      }
    } : e.prototype._complete, c;
  }
  return t.prototype.unsubscribe = function() {
    var n;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var r = this.closed;
      e.prototype.unsubscribe.call(this), !r && ((n = this.onFinalize) === null || n === void 0 || n.call(this));
    }
  }, t;
})(cn), Uo = sn(function(e) {
  return function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), be = (function(e) {
  we(t, e);
  function t() {
    var n = e.call(this) || this;
    return n.closed = !1, n.currentObservers = null, n.observers = [], n.isStopped = !1, n.hasError = !1, n.thrownError = null, n;
  }
  return t.prototype.lift = function(n) {
    var r = new Ln(this, this);
    return r.operator = n, r;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed) throw new Uo();
  }, t.prototype.next = function(n) {
    var r = this;
    at(function() {
      var i, o;
      if (r._throwIfClosed(), !r.isStopped) {
        r.currentObservers || (r.currentObservers = Array.from(r.observers));
        try {
          for (var s = Be(r.currentObservers), a = s.next(); !a.done; a = s.next()) a.value.next(n);
        } catch (c) {
          i = { error: c };
        } finally {
          try {
            a && !a.done && (o = s.return) && o.call(s);
          } finally {
            if (i) throw i.error;
          }
        }
      }
    });
  }, t.prototype.error = function(n) {
    var r = this;
    at(function() {
      if (r._throwIfClosed(), !r.isStopped) {
        r.hasError = r.isStopped = !0, r.thrownError = n;
        for (var i = r.observers; i.length; ) i.shift().error(n);
      }
    });
  }, t.prototype.complete = function() {
    var n = this;
    at(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.isStopped = !0;
        for (var r = n.observers; r.length; ) r.shift().complete();
      }
    });
  }, t.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(t.prototype, "observed", {
    get: function() {
      var n;
      return ((n = this.observers) === null || n === void 0 ? void 0 : n.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype._trySubscribe = function(n) {
    return this._throwIfClosed(), e.prototype._trySubscribe.call(this, n);
  }, t.prototype._subscribe = function(n) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n);
  }, t.prototype._innerSubscribe = function(n) {
    var r = this, i = this, o = i.hasError, s = i.isStopped, a = i.observers;
    return o || s ? fr : (this.currentObservers = null, a.push(n), new et(function() {
      r.currentObservers = null, ht(a, n);
    }));
  }, t.prototype._checkFinalizedStatuses = function(n) {
    var r = this, i = r.hasError, o = r.thrownError, s = r.isStopped;
    i ? n.error(o) : s && n.complete();
  }, t.prototype.asObservable = function() {
    var n = new B();
    return n.source = this, n;
  }, t.create = function(n, r) {
    return new Ln(n, r);
  }, t;
})(B), Ln = (function(e) {
  we(t, e);
  function t(n, r) {
    var i = e.call(this) || this;
    return i.destination = n, i.source = r, i;
  }
  return t.prototype.next = function(n) {
    var r, i;
    (i = (r = this.destination) === null || r === void 0 ? void 0 : r.next) === null || i === void 0 || i.call(r, n);
  }, t.prototype.error = function(n) {
    var r, i;
    (i = (r = this.destination) === null || r === void 0 ? void 0 : r.error) === null || i === void 0 || i.call(r, n);
  }, t.prototype.complete = function() {
    var n, r;
    (r = (n = this.destination) === null || n === void 0 ? void 0 : n.complete) === null || r === void 0 || r.call(n);
  }, t.prototype._subscribe = function(n) {
    var r, i;
    return (i = (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(n)) !== null && i !== void 0 ? i : fr;
  }, t;
})(be), hr = (function(e) {
  we(t, e);
  function t(n) {
    var r = e.call(this) || this;
    return r._value = n, r;
  }
  return Object.defineProperty(t.prototype, "value", {
    get: function() {
      return this.getValue();
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype._subscribe = function(n) {
    var r = e.prototype._subscribe.call(this, n);
    return !r.closed && n.next(this._value), r;
  }, t.prototype.getValue = function() {
    var n = this, r = n.hasError, i = n.thrownError, o = n._value;
    if (r) throw i;
    return this._throwIfClosed(), o;
  }, t.prototype.next = function(n) {
    e.prototype.next.call(this, this._value = n);
  }, t;
})(be), vr = {
  now: function() {
    return (vr.delegate || Date).now();
  },
  delegate: void 0
}, $o = (function(e) {
  we(t, e);
  function t(n, r) {
    return e.call(this) || this;
  }
  return t.prototype.schedule = function(n, r) {
    return r === void 0 && (r = 0), this;
  }, t;
})(et), gt = {
  setInterval: function(e, t) {
    for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
    var i = gt.delegate;
    return i?.setInterval ? i.setInterval.apply(i, Te([e, t], ge(n))) : setInterval.apply(void 0, Te([e, t], ge(n)));
  },
  clearInterval: function(e) {
    var t = gt.delegate;
    return (t?.clearInterval || clearInterval)(e);
  },
  delegate: void 0
}, Wo = (function(e) {
  we(t, e);
  function t(n, r) {
    var i = e.call(this, n, r) || this;
    return i.scheduler = n, i.work = r, i.pending = !1, i;
  }
  return t.prototype.schedule = function(n, r) {
    var i;
    if (r === void 0 && (r = 0), this.closed) return this;
    this.state = n;
    var o = this.id, s = this.scheduler;
    return o != null && (this.id = this.recycleAsyncId(s, o, r)), this.pending = !0, this.delay = r, this.id = (i = this.id) !== null && i !== void 0 ? i : this.requestAsyncId(s, this.id, r), this;
  }, t.prototype.requestAsyncId = function(n, r, i) {
    return i === void 0 && (i = 0), gt.setInterval(n.flush.bind(n, this), i);
  }, t.prototype.recycleAsyncId = function(n, r, i) {
    if (i === void 0 && (i = 0), i != null && this.delay === i && this.pending === !1) return r;
    r != null && gt.clearInterval(r);
  }, t.prototype.execute = function(n, r) {
    if (this.closed) return /* @__PURE__ */ new Error("executing a cancelled action");
    this.pending = !1;
    var i = this._execute(n, r);
    if (i) return i;
    this.pending === !1 && this.id != null && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }, t.prototype._execute = function(n, r) {
    var i = !1, o;
    try {
      this.work(n);
    } catch (s) {
      i = !0, o = s || /* @__PURE__ */ new Error("Scheduled action threw falsy error");
    }
    if (i)
      return this.unsubscribe(), o;
  }, t.prototype.unsubscribe = function() {
    if (!this.closed) {
      var n = this, r = n.id, i = n.scheduler, o = i.actions;
      this.work = this.state = this.scheduler = null, this.pending = !1, ht(o, this), r != null && (this.id = this.recycleAsyncId(i, r, null)), this.delay = null, e.prototype.unsubscribe.call(this);
    }
  }, t;
})($o), On = (function() {
  function e(t, n) {
    n === void 0 && (n = e.now), this.schedulerActionCtor = t, this.now = n;
  }
  return e.prototype.schedule = function(t, n, r) {
    return n === void 0 && (n = 0), new this.schedulerActionCtor(this, t).schedule(r, n);
  }, e.now = vr.now, e;
})(), jo = (function(e) {
  we(t, e);
  function t(n, r) {
    r === void 0 && (r = On.now);
    var i = e.call(this, n, r) || this;
    return i.actions = [], i._active = !1, i;
  }
  return t.prototype.flush = function(n) {
    var r = this.actions;
    if (this._active) {
      r.push(n);
      return;
    }
    var i;
    this._active = !0;
    do
      if (i = n.execute(n.state, n.delay)) break;
    while (n = r.shift());
    if (this._active = !1, i) {
      for (; n = r.shift(); ) n.unsubscribe();
      throw i;
    }
  }, t;
})(On), Bo = new jo(Wo);
function Vo(e) {
  return e && $(e.schedule);
}
function Ho(e) {
  return e[e.length - 1];
}
function ln(e) {
  return Vo(Ho(e)) ? e.pop() : void 0;
}
var fn = (function(e) {
  return e && typeof e.length == "number" && typeof e != "function";
});
function mr(e) {
  return $(e?.then);
}
function gr(e) {
  return $(e[un]);
}
function br(e) {
  return Symbol.asyncIterator && $(e?.[Symbol.asyncIterator]);
}
function yr(e) {
  return /* @__PURE__ */ new TypeError("You provided " + (e !== null && typeof e == "object" ? "an invalid object" : "'" + e + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function zo() {
  return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator;
}
var wr = zo();
function Sr(e) {
  return $(e?.[wr]);
}
function Er(e) {
  return Co(this, arguments, function() {
    var n, r, i, o;
    return lr(this, function(s) {
      switch (s.label) {
        case 0:
          n = e.getReader(), s.label = 1;
        case 1:
          s.trys.push([
            1,
            ,
            9,
            10
          ]), s.label = 2;
        case 2:
          return [4, Ue(n.read())];
        case 3:
          return r = s.sent(), i = r.value, o = r.done, o ? [4, Ue(void 0)] : [3, 5];
        case 4:
          return [2, s.sent()];
        case 5:
          return [4, Ue(i)];
        case 6:
          return [4, s.sent()];
        case 7:
          return s.sent(), [3, 2];
        case 8:
          return [3, 10];
        case 9:
          return n.releaseLock(), [7];
        case 10:
          return [2];
      }
    });
  });
}
function Cr(e) {
  return $(e?.getReader);
}
function se(e) {
  if (e instanceof B) return e;
  if (e != null) {
    if (gr(e)) return qo(e);
    if (fn(e)) return Ko(e);
    if (mr(e)) return Go(e);
    if (br(e)) return Tr(e);
    if (Sr(e)) return Jo(e);
    if (Cr(e)) return Yo(e);
  }
  throw yr(e);
}
function qo(e) {
  return new B(function(t) {
    var n = e[un]();
    if ($(n.subscribe)) return n.subscribe(t);
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function Ko(e) {
  return new B(function(t) {
    for (var n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
    t.complete();
  });
}
function Go(e) {
  return new B(function(t) {
    e.then(function(n) {
      t.closed || (t.next(n), t.complete());
    }, function(n) {
      return t.error(n);
    }).then(null, pr);
  });
}
function Jo(e) {
  return new B(function(t) {
    var n, r;
    try {
      for (var i = Be(e), o = i.next(); !o.done; o = i.next()) {
        var s = o.value;
        if (t.next(s), t.closed) return;
      }
    } catch (a) {
      n = { error: a };
    } finally {
      try {
        o && !o.done && (r = i.return) && r.call(i);
      } finally {
        if (n) throw n.error;
      }
    }
    t.complete();
  });
}
function Tr(e) {
  return new B(function(t) {
    Qo(e, t).catch(function(n) {
      return t.error(n);
    });
  });
}
function Yo(e) {
  return Tr(Er(e));
}
function Qo(e, t) {
  var n, r, i, o;
  return Eo(this, void 0, void 0, function() {
    var s, a;
    return lr(this, function(c) {
      switch (c.label) {
        case 0:
          c.trys.push([
            0,
            5,
            6,
            11
          ]), n = To(e), c.label = 1;
        case 1:
          return [4, n.next()];
        case 2:
          if (r = c.sent(), !!r.done) return [3, 4];
          if (s = r.value, t.next(s), t.closed) return [2];
          c.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          return a = c.sent(), i = { error: a }, [3, 11];
        case 6:
          return c.trys.push([
            6,
            ,
            9,
            10
          ]), r && !r.done && (o = n.return) ? [4, o.call(n)] : [3, 8];
        case 7:
          c.sent(), c.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (i) throw i.error;
          return [7];
        case 10:
          return [7];
        case 11:
          return t.complete(), [2];
      }
    });
  });
}
function me(e, t, n, r, i) {
  r === void 0 && (r = 0), i === void 0 && (i = !1);
  var o = t.schedule(function() {
    n(), i ? e.add(this.schedule(null, r)) : this.unsubscribe();
  }, r);
  if (e.add(o), !i) return o;
}
function xr(e, t) {
  return t === void 0 && (t = 0), Y(function(n, r) {
    n.subscribe(te(r, function(i) {
      return me(r, e, function() {
        return r.next(i);
      }, t);
    }, function() {
      return me(r, e, function() {
        return r.complete();
      }, t);
    }, function(i) {
      return me(r, e, function() {
        return r.error(i);
      }, t);
    }));
  });
}
function kr(e, t) {
  return t === void 0 && (t = 0), Y(function(n, r) {
    r.add(e.schedule(function() {
      return n.subscribe(r);
    }, t));
  });
}
function Xo(e, t) {
  return se(e).pipe(kr(t), xr(t));
}
function Zo(e, t) {
  return se(e).pipe(kr(t), xr(t));
}
function es(e, t) {
  return new B(function(n) {
    var r = 0;
    return t.schedule(function() {
      r === e.length ? n.complete() : (n.next(e[r++]), n.closed || this.schedule());
    });
  });
}
function ts(e, t) {
  return new B(function(n) {
    var r;
    return me(n, t, function() {
      r = e[wr](), me(n, t, function() {
        var i, o, s;
        try {
          i = r.next(), o = i.value, s = i.done;
        } catch (a) {
          n.error(a);
          return;
        }
        s ? n.complete() : n.next(o);
      }, 0, !0);
    }), function() {
      return $(r?.return) && r.return();
    };
  });
}
function Pr(e, t) {
  if (!e) throw new Error("Iterable cannot be null");
  return new B(function(n) {
    me(n, t, function() {
      var r = e[Symbol.asyncIterator]();
      me(n, t, function() {
        r.next().then(function(i) {
          i.done ? n.complete() : n.next(i.value);
        });
      }, 0, !0);
    });
  });
}
function ns(e, t) {
  return Pr(Er(e), t);
}
function rs(e, t) {
  if (e != null) {
    if (gr(e)) return Xo(e, t);
    if (fn(e)) return es(e, t);
    if (mr(e)) return Zo(e, t);
    if (br(e)) return Pr(e, t);
    if (Sr(e)) return ts(e, t);
    if (Cr(e)) return ns(e, t);
  }
  throw yr(e);
}
function $e(e, t) {
  return t ? rs(e, t) : se(e);
}
function Jt() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  return $e(e, ln(e));
}
function is(e) {
  return e instanceof Date && !isNaN(e);
}
var os = sn(function(e) {
  return function(n) {
    n === void 0 && (n = null), e(this), this.message = "Timeout has occurred", this.name = "TimeoutError", this.info = n;
  };
});
function ss(e, t) {
  var n = is(e) ? { first: e } : typeof e == "number" ? { each: e } : e, r = n.first, i = n.each, o = n.with, s = o === void 0 ? as : o, a = n.scheduler, c = a === void 0 ? t ?? Bo : a, u = n.meta, f = u === void 0 ? null : u;
  if (r == null && i == null) throw new TypeError("No timeout provided.");
  return Y(function(d, p) {
    var h, m, S = null, y = 0, b = function(w) {
      m = me(p, c, function() {
        try {
          h.unsubscribe(), se(s({
            meta: f,
            lastValue: S,
            seen: y
          })).subscribe(p);
        } catch (P) {
          p.error(P);
        }
      }, w);
    };
    h = d.subscribe(te(p, function(w) {
      m?.unsubscribe(), y++, p.next(S = w), i > 0 && b(i);
    }, void 0, void 0, function() {
      m?.closed || m?.unsubscribe(), S = null;
    })), !y && b(r != null ? typeof r == "number" ? r : +r - c.now() : i);
  });
}
function as(e) {
  throw new os(e);
}
function W(e, t) {
  return Y(function(n, r) {
    var i = 0;
    n.subscribe(te(r, function(o) {
      r.next(e.call(t, o, i++));
    }));
  });
}
var cs = Array.isArray;
function us(e, t) {
  return cs(t) ? e.apply(void 0, Te([], ge(t))) : e(t);
}
function ls(e) {
  return W(function(t) {
    return us(e, t);
  });
}
function fs(e, t, n, r, i, o, s, a) {
  var c = [], u = 0, f = 0, d = !1, p = function() {
    d && !c.length && !u && t.complete();
  }, h = function(S) {
    return u < r ? m(S) : c.push(S);
  }, m = function(S) {
    o && t.next(S), u++;
    var y = !1;
    se(n(S, f++)).subscribe(te(t, function(b) {
      i?.(b), o ? h(b) : t.next(b);
    }, function() {
      y = !0;
    }, void 0, function() {
      if (y) try {
        u--;
        for (var b = function() {
          var w = c.shift();
          s ? me(t, s, function() {
            return m(w);
          }) : m(w);
        }; c.length && u < r; ) b();
        p();
      } catch (w) {
        t.error(w);
      }
    }));
  };
  return e.subscribe(te(t, h, function() {
    d = !0, p();
  })), function() {
    a?.();
  };
}
function Ve(e, t, n) {
  return n === void 0 && (n = 1 / 0), $(t) ? Ve(function(r, i) {
    return W(function(o, s) {
      return t(r, o, i, s);
    })(se(e(r, i)));
  }, n) : (typeof t == "number" && (n = t), Y(function(r, i) {
    return fs(r, i, e, n);
  }));
}
function ds(e) {
  return e === void 0 && (e = 1 / 0), Ve(Mt, e);
}
function ps() {
  return ds(1);
}
function bt() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  return ps()($e(e, ln(e)));
}
var hs = ["addListener", "removeListener"], vs = ["addEventListener", "removeEventListener"], ms = ["on", "off"];
function Yt(e, t, n, r) {
  if ($(n) && (r = n, n = void 0), r) return Yt(e, t, n).pipe(ls(r));
  var i = ge(ys(e) ? vs.map(function(a) {
    return function(c) {
      return e[a](t, c, n);
    };
  }) : gs(e) ? hs.map(_n(e, t)) : bs(e) ? ms.map(_n(e, t)) : [], 2), o = i[0], s = i[1];
  if (!o && fn(e))
    return Ve(function(a) {
      return Yt(a, t, n);
    })(se(e));
  if (!o) throw new TypeError("Invalid event target");
  return new B(function(a) {
    var c = function() {
      for (var u = [], f = 0; f < arguments.length; f++) u[f] = arguments[f];
      return a.next(1 < u.length ? u : u[0]);
    };
    return o(c), function() {
      return s(c);
    };
  });
}
function _n(e, t) {
  return function(n) {
    return function(r) {
      return e[n](t, r);
    };
  };
}
function gs(e) {
  return $(e.addListener) && $(e.removeListener);
}
function bs(e) {
  return $(e.on) && $(e.off);
}
function ys(e) {
  return $(e.addEventListener) && $(e.removeEventListener);
}
function At(e, t) {
  return Y(function(n, r) {
    var i = 0;
    n.subscribe(te(r, function(o) {
      return e.call(t, o, i++) && r.next(o);
    }));
  });
}
function ws(e, t, n, r, i) {
  return function(o, s) {
    var a = n, c = t, u = 0;
    o.subscribe(te(s, function(f) {
      var d = u++;
      c = a ? e(c, f, d) : (a = !0, f), r && s.next(c);
    }, i && (function() {
      a && s.next(c), s.complete();
    })));
  };
}
function Ss(e, t) {
  return $(t) ? Ve(e, t, 1) : Ve(e, 1);
}
function Es(e, t) {
  return t === void 0 && (t = Mt), e = e ?? Cs, Y(function(n, r) {
    var i, o = !0;
    n.subscribe(te(r, function(s) {
      var a = t(s);
      (o || !e(i, a)) && (o = !1, i = a, r.next(s));
    }));
  });
}
function Cs(e, t) {
  return e === t;
}
function Ts(e) {
  return Y(function(t, n) {
    try {
      t.subscribe(n);
    } finally {
      n.add(e);
    }
  });
}
function ct(e, t) {
  return Y(ws(e, t, arguments.length >= 2, !0));
}
function xs(e) {
  e === void 0 && (e = {});
  var t = e.connector, n = t === void 0 ? function() {
    return new be();
  } : t, r = e.resetOnError, i = r === void 0 ? !0 : r, o = e.resetOnComplete, s = o === void 0 ? !0 : o, a = e.resetOnRefCountZero, c = a === void 0 ? !0 : a;
  return function(u) {
    var f, d, p, h = 0, m = !1, S = !1, y = function() {
      d?.unsubscribe(), d = void 0;
    }, b = function() {
      y(), f = p = void 0, m = S = !1;
    }, w = function() {
      var P = f;
      b(), P?.unsubscribe();
    };
    return Y(function(P, N) {
      h++, !S && !m && y();
      var M = p = p ?? n();
      N.add(function() {
        h--, h === 0 && !S && !m && (d = Bt(w, c));
      }), M.subscribe(N), !f && h > 0 && (f = new Qe({
        next: function(v) {
          return M.next(v);
        },
        error: function(v) {
          S = !0, y(), d = Bt(b, i, v), M.error(v);
        },
        complete: function() {
          m = !0, y(), d = Bt(b, s), M.complete();
        }
      }), se(P).subscribe(f));
    })(u);
  };
}
function Bt(e, t) {
  for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
  if (t === !0) {
    e();
    return;
  }
  if (t !== !1) {
    var i = new Qe({ next: function() {
      i.unsubscribe(), e();
    } });
    return se(t.apply(void 0, Te([], ge(n)))).subscribe(i);
  }
}
function ks(e) {
  return Y(function(t, n) {
    var r = !1, i = te(n, function() {
      i?.unsubscribe(), r = !0;
    }, mt);
    se(e).subscribe(i), t.subscribe(te(n, function(o) {
      return r && n.next(o);
    }));
  });
}
function J() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  var n = ln(e);
  return Y(function(r, i) {
    (n ? bt(e, r, n) : bt(e, r)).subscribe(i);
  });
}
function Mr(e, t) {
  return Y(function(n, r) {
    var i = null, o = 0, s = !1, a = function() {
      return s && !i && r.complete();
    };
    n.subscribe(te(r, function(c) {
      i?.unsubscribe();
      var u = 0, f = o++;
      se(e(c, f)).subscribe(i = te(r, function(d) {
        return r.next(t ? t(c, d, f, u++) : d);
      }, function() {
        i = null, a();
      }));
    }, function() {
      s = !0, a();
    }));
  });
}
function In(e) {
  return Y(function(t, n) {
    se(e).subscribe(te(n, function() {
      return n.complete();
    }, mt)), !n.closed && t.subscribe(n);
  });
}
function Ps(e, t, n) {
  var r = $(e) || t || n ? {
    next: e,
    error: t,
    complete: n
  } : e;
  return r ? Y(function(i, o) {
    var s;
    (s = r.subscribe) === null || s === void 0 || s.call(r);
    var a = !0;
    i.subscribe(te(o, function(c) {
      var u;
      (u = r.next) === null || u === void 0 || u.call(r, c), o.next(c);
    }, function() {
      var c;
      a = !1, (c = r.complete) === null || c === void 0 || c.call(r), o.complete();
    }, function(c) {
      var u;
      a = !1, (u = r.error) === null || u === void 0 || u.call(r, c), o.error(c);
    }, function() {
      var c, u;
      a && ((c = r.unsubscribe) === null || c === void 0 || c.call(r)), (u = r.finalize) === null || u === void 0 || u.call(r);
    }));
  }) : Mt;
}
var Ms = /* @__PURE__ */ di(So(), 1), As = Object.defineProperty, Ls = Object.defineProperties, Os = Object.getOwnPropertyDescriptors, Rn = Object.getOwnPropertySymbols, _s = Object.prototype.hasOwnProperty, Is = Object.prototype.propertyIsEnumerable, Dn = (e, t) => (t = Symbol[e]) ? t : /* @__PURE__ */ Symbol.for("Symbol." + e), Nn = (e, t, n) => t in e ? As(e, t, {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: n
}) : e[t] = n, ae = (e, t) => {
  for (var n in t || (t = {})) _s.call(t, n) && Nn(e, n, t[n]);
  if (Rn)
    for (var n of Rn(t)) Is.call(t, n) && Nn(e, n, t[n]);
  return e;
}, Pe = (e, t) => Ls(e, Os(t)), Z = (e, t, n) => new Promise((r, i) => {
  var o = (c) => {
    try {
      a(n.next(c));
    } catch (u) {
      i(u);
    }
  }, s = (c) => {
    try {
      a(n.throw(c));
    } catch (u) {
      i(u);
    }
  }, a = (c) => c.done ? r(c.value) : Promise.resolve(c.value).then(o, s);
  a((n = n.apply(e, t)).next());
}), Rs = (e, t, n) => (t = e[Dn("asyncIterator")]) ? t.call(e) : (e = e[Dn("iterator")](), t = {}, n = (r, i) => (i = e[r]) && (t[r] = (o) => new Promise((s, a, c) => (o = i.call(e, o), c = o.done, Promise.resolve(o.value).then((u) => s({
  value: u,
  done: c
}), a)))), n("next"), n("return"), t);
function ee(e) {
  return typeof e > "u" ? !1 : Ds(e) || Ns(e);
}
function Ds(e) {
  var t;
  return e ? e.hasOwnProperty("participant") && e.hasOwnProperty("source") && e.hasOwnProperty("track") && typeof ((t = e.publication) == null ? void 0 : t.track) < "u" : !1;
}
function Ns(e) {
  return e ? e.hasOwnProperty("participant") && e.hasOwnProperty("source") && e.hasOwnProperty("publication") && typeof e.publication < "u" : !1;
}
function Xe(e) {
  return e ? e.hasOwnProperty("participant") && e.hasOwnProperty("source") && typeof e.publication > "u" : !1;
}
function G(e) {
  if (typeof e == "string" || typeof e == "number") return `${e}`;
  if (Xe(e)) return `${e.participant.identity}_${e.source}_placeholder`;
  if (ee(e)) return `${e.participant.identity}_${e.publication.source}_${e.publication.trackSid}`;
  throw new Error(`Can't generate a id for the given track reference: ${e}`);
}
function Hc(e, t) {
  return e === void 0 || t === void 0 ? !1 : ee(e) && ee(t) ? e.publication.trackSid === t.publication.trackSid : G(e) === G(t);
}
function Fs(e, t) {
  return typeof t > "u" ? !1 : ee(e) ? t.some((n) => n.participant.identity === e.participant.identity && ee(n) && n.publication.trackSid === e.publication.trackSid) : Xe(e) ? t.some((n) => n.participant.identity === e.participant.identity && Xe(n) && n.source === e.source) : !1;
}
function Us(e, t) {
  return Xe(e) && ee(t) && t.participant.identity === e.participant.identity && t.source === e.source;
}
function zc() {
  const e = document.createElement("p");
  e.style.width = "100%", e.style.height = "200px";
  const t = document.createElement("div");
  t.style.position = "absolute", t.style.top = "0px", t.style.left = "0px", t.style.visibility = "hidden", t.style.width = "200px", t.style.height = "150px", t.style.overflow = "hidden", t.appendChild(e), document.body.appendChild(t);
  const n = e.offsetWidth;
  t.style.overflow = "scroll";
  let r = e.offsetWidth;
  return n === r && (r = t.clientWidth), document.body.removeChild(t), n - r;
}
function qc() {
  return typeof document < "u";
}
function $s(e) {
  e = ae({}, e);
  const t = `(?:(?:(?:[a-z]+:)?//)?|www\\.)(?:\\S+(?::\\S*)?@)?(?:localhost|${(/* @__PURE__ */ new RegExp("(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}", "g")).source}|(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?)(?::\\d{2,5})?(?:[/?#][^\\s"]*)?`;
  return e.exact ? new RegExp(`(?:^${t}$)`, "i") : new RegExp(t, "ig");
}
var Fn = "[^\\.\\s@:](?:[^\\s@:]*[^\\s@:\\.])?@[^\\.\\s@]+(?:\\.[^\\.\\s@]+)*";
function Ws({ exact: e } = {}) {
  return e ? new RegExp(`^${Fn}$`) : new RegExp(Fn, "g");
}
function Kc(e, t, n) {
  return mo(e, t, () => Z(null, null, function* () {
    const { x: r, y: i } = yield wo(e, t, {
      placement: "top",
      middleware: [
        go(6),
        yo(),
        bo({ padding: 5 })
      ]
    });
    n?.(r, i);
  }));
}
function Gc(e, t) {
  return !e.contains(t.target);
}
var Jc = () => ({
  email: Ws(),
  url: $s({})
});
function Yc(e, t) {
  const n = Object.entries(t).map(([o, s], a) => Array.from(e.matchAll(s)).map(({ index: c, 0: u }) => ({
    type: o,
    weight: a,
    content: u,
    index: c ?? 0
  }))).flat().sort((o, s) => {
    const a = o.index - s.index;
    return a !== 0 ? a : o.weight - s.weight;
  }).filter(({ index: o }, s, a) => {
    if (s === 0) return !0;
    const c = a[s - 1];
    return c.index + c.content.length <= o;
  }), r = [];
  let i = 0;
  for (const { type: o, content: s, index: a } of n)
    a > i && r.push(e.substring(i, a)), r.push({
      type: o,
      content: s
    }), i = a + s.length;
  return e.length > i && r.push(e.substring(i)), r;
}
var js = [
  k.ConnectionStateChanged,
  k.RoomMetadataChanged,
  k.ActiveSpeakersChanged,
  k.ConnectionQualityChanged,
  k.ParticipantConnected,
  k.ParticipantDisconnected,
  k.ParticipantPermissionsChanged,
  k.ParticipantMetadataChanged,
  k.ParticipantNameChanged,
  k.ParticipantAttributesChanged,
  k.TrackMuted,
  k.TrackUnmuted,
  k.TrackPublished,
  k.TrackUnpublished,
  k.TrackStreamStateChanged,
  k.TrackSubscriptionFailed,
  k.TrackSubscriptionPermissionChanged,
  k.TrackSubscriptionStatusChanged
], Ar = [
  ...js,
  k.LocalTrackPublished,
  k.LocalTrackUnpublished
], Bs = [
  _.TrackPublished,
  _.TrackUnpublished,
  _.TrackMuted,
  _.TrackUnmuted,
  _.TrackStreamStateChanged,
  _.TrackSubscribed,
  _.TrackUnsubscribed,
  _.TrackSubscriptionPermissionChanged,
  _.TrackSubscriptionFailed,
  _.LocalTrackPublished,
  _.LocalTrackUnpublished
], Vs = [
  _.ConnectionQualityChanged,
  _.IsSpeakingChanged,
  _.ParticipantMetadataChanged,
  _.ParticipantPermissionsChanged,
  _.TrackMuted,
  _.TrackUnmuted,
  _.TrackPublished,
  _.TrackUnpublished,
  _.TrackStreamStateChanged,
  _.TrackSubscriptionFailed,
  _.TrackSubscriptionPermissionChanged,
  _.TrackSubscriptionStatusChanged
], Lr = [
  ...Vs,
  _.LocalTrackPublished,
  _.LocalTrackUnpublished
], R = Ms.default.getLogger("lk-components-js");
R.setDefaultLevel("WARN");
function Qc(e, t = {}) {
  var n;
  R.setLevel(e), ki((n = t.liveKitClientLogLevel) != null ? n : e);
}
function Xc(e, t = {}) {
  var n;
  const r = R.methodFactory;
  R.methodFactory = (i, o, s) => {
    const a = r(i, o, s), c = yn[i], u = c >= o && c < yn.silent;
    return (f, d) => {
      d ? a(f, d) : a(f), u && e(c, f, d);
    };
  }, R.setLevel(R.getLevel()), xi((n = t.liveKitClientLogExtension) != null ? n : e);
}
var Hs = [
  {
    columns: 1,
    rows: 1
  },
  {
    columns: 1,
    rows: 2,
    orientation: "portrait"
  },
  {
    columns: 2,
    rows: 1,
    orientation: "landscape"
  },
  {
    columns: 2,
    rows: 2,
    minWidth: 560
  },
  {
    columns: 3,
    rows: 3,
    minWidth: 700
  },
  {
    columns: 4,
    rows: 4,
    minWidth: 960
  },
  {
    columns: 5,
    rows: 5,
    minWidth: 1100
  }
];
function Or(e, t, n, r) {
  if (e.length < 1) throw new Error("At least one grid layout definition must be provided.");
  const i = zs(e);
  if (n <= 0 || r <= 0) return i[0];
  let o = 0;
  const s = n / r > 1 ? "landscape" : "portrait";
  let a = i.find((c, u, f) => {
    o = u;
    const d = f.findIndex((p, h) => {
      const m = !p.orientation || p.orientation === s, S = h > u, y = p.maxTiles === c.maxTiles;
      return S && y && m;
    }) !== -1;
    return c.maxTiles >= t && !d;
  });
  if (a === void 0)
    if (a = i[i.length - 1], a) R.warn(`No layout found for: participantCount: ${t}, width/height: ${n}/${r} fallback to biggest available layout (${a}).`);
    else throw new Error("No layout or fallback layout found.");
  if ((n < a.minWidth || r < a.minHeight) && o > 0) {
    const c = i[o - 1];
    a = Or(i.slice(0, o), c.maxTiles, n, r);
  }
  return a;
}
function zs(e) {
  return [...e].map((t) => {
    var n, r;
    return {
      name: `${t.columns}x${t.rows}`,
      columns: t.columns,
      rows: t.rows,
      maxTiles: t.columns * t.rows,
      minWidth: (n = t.minWidth) != null ? n : 0,
      minHeight: (r = t.minHeight) != null ? r : 0,
      orientation: t.orientation
    };
  }).sort((t, n) => t.maxTiles !== n.maxTiles ? t.maxTiles - n.maxTiles : t.minWidth !== 0 || n.minWidth !== 0 ? t.minWidth - n.minWidth : t.minHeight !== 0 || n.minHeight !== 0 ? t.minHeight - n.minHeight : 0);
}
function Zc() {
  return typeof navigator < "u" && navigator.mediaDevices && !!navigator.mediaDevices.getDisplayMedia;
}
function qs(e, t) {
  var n;
  return Pe(ae({}, e), {
    receivedAtMediaTimestamp: (n = t.rtpTimestamp) != null ? n : 0,
    receivedAt: t.timestamp
  });
}
function Ks(e, t, n) {
  return [...e, ...t].reduceRight((r, i) => (r.find((o) => o.id === i.id) || r.unshift(i), r), []).slice(0 - n);
}
var ce = /* @__PURE__ */ ((e) => (e.AgentState = "lk.agent.state", e.PublishOnBehalf = "lk.publish_on_behalf", e.TranscriptionFinal = "lk.transcription_final", e.TranscriptionSegmentId = "lk.segment_id", e.TranscribedTrackId = "lk.transcribed_track_id", e.Expression = "lk.expression", e))(ce || {}), _r = [], Ir = {
  showChat: !1,
  unreadMessages: 0,
  showSettings: !1
};
function Rr(e) {
  return typeof e == "object";
}
function Dr(e) {
  return Array.isArray(e) && e.filter(Rr).length > 0;
}
function Nr(e, t) {
  return t.audioLevel - e.audioLevel;
}
function Fr(e, t) {
  return e.isSpeaking === t.isSpeaking ? 0 : e.isSpeaking ? -1 : 1;
}
function Ur(e, t) {
  var n, r, i, o;
  return e.lastSpokeAt !== void 0 || t.lastSpokeAt !== void 0 ? ((r = (n = t.lastSpokeAt) == null ? void 0 : n.getTime()) != null ? r : 0) - ((o = (i = e.lastSpokeAt) == null ? void 0 : i.getTime()) != null ? o : 0) : 0;
}
function yt(e, t) {
  var n, r, i, o;
  return ((r = (n = e.joinedAt) == null ? void 0 : n.getTime()) != null ? r : 0) - ((o = (i = t.joinedAt) == null ? void 0 : i.getTime()) != null ? o : 0);
}
function Gs(e, t) {
  return ee(e) ? ee(t) ? 0 : -1 : ee(t) ? 1 : 0;
}
function Js(e, t) {
  const n = e.participant.isCameraEnabled;
  return n !== t.participant.isCameraEnabled ? n ? -1 : 1 : 0;
}
function Ys(e) {
  const t = [], n = [], r = [], i = [];
  e.forEach((a) => {
    a.participant.isLocal && a.source === O.Source.Camera ? t.push(a) : a.source === O.Source.ScreenShare ? n.push(a) : a.source === O.Source.Camera ? r.push(a) : i.push(a);
  });
  const o = Qs(n), s = Xs(r);
  return [
    ...t,
    ...o,
    ...s,
    ...i
  ];
}
function Qs(e) {
  const t = [], n = [];
  return e.forEach((r) => {
    r.participant.isLocal ? t.push(r) : n.push(r);
  }), t.sort((r, i) => yt(r.participant, i.participant)), n.sort((r, i) => yt(r.participant, i.participant)), [...n, ...t];
}
function Xs(e) {
  const t = [], n = [];
  return e.forEach((r) => {
    r.participant.isLocal ? t.push(r) : n.push(r);
  }), n.sort((r, i) => r.participant.isSpeaking && i.participant.isSpeaking ? Nr(r.participant, i.participant) : r.participant.isSpeaking !== i.participant.isSpeaking ? Fr(r.participant, i.participant) : r.participant.lastSpokeAt !== i.participant.lastSpokeAt ? Ur(r.participant, i.participant) : ee(r) !== ee(i) ? Gs(r, i) : r.participant.isCameraEnabled !== i.participant.isCameraEnabled ? Js(r, i) : yt(r.participant, i.participant)), [...t, ...n];
}
function Un(e) {
  const t = [...e];
  t.sort((r, i) => {
    if (r.isSpeaking && i.isSpeaking) return Nr(r, i);
    if (r.isSpeaking !== i.isSpeaking) return Fr(r, i);
    if (r.lastSpokeAt !== i.lastSpokeAt) return Ur(r, i);
    const o = r.videoTrackPublications.size > 0;
    return o !== i.videoTrackPublications.size > 0 ? o ? -1 : 1 : yt(r, i);
  });
  const n = t.find((r) => r.isLocal);
  if (n) {
    const r = t.indexOf(n);
    r >= 0 && (t.splice(r, 1), t.length > 0 ? t.splice(0, 0, n) : t.push(n));
  }
  return t;
}
function Zs(e, t) {
  return e.reduce((n, r, i) => i % t === 0 ? [...n, [r]] : [...n.slice(0, -1), [...n.slice(-1)[0], r]], []);
}
function $n(e, t) {
  const n = Math.max(e.length, t.length);
  return new Array(n).fill([]).map((r, i) => [e[i], t[i]]);
}
function wt(e, t, n) {
  return e.filter((r) => !t.map((i) => n(i)).includes(n(r)));
}
function Qt(e) {
  return e.map((t) => typeof t == "string" || typeof t == "number" ? `${t}` : G(t));
}
function ea(e, t) {
  return {
    dropped: wt(e, t, G),
    added: wt(t, e, G)
  };
}
function ta(e) {
  return e.added.length !== 0 || e.dropped.length !== 0;
}
function Xt(e, t) {
  const n = t.findIndex((r) => G(r) === G(e));
  if (n === -1) throw new Error(`Element not part of the array: ${G(e)} not in ${Qt(t)}`);
  return n;
}
function na(e, t, n) {
  const r = Xt(e, n), i = Xt(t, n);
  return n.splice(r, 1, t), n.splice(i, 1, e), n;
}
function ra(e, t) {
  const n = Xt(e, t);
  return t.splice(n, 1), t;
}
function ia(e, t) {
  return [...t, e];
}
function Vt(e, t) {
  return Zs(e, t);
}
function oa(e, t, n) {
  let r = sa(e, t);
  if (r.length < t.length) {
    const i = wt(t, r, G);
    r = [...r, ...i];
  }
  if ($n(Vt(r, n), Vt(t, n)).forEach(([i, o], s) => {
    if (i && o) {
      const a = Vt(r, n)[s], c = ea(a, o);
      ta(c) && (R.debug(`Detected visual changes on page: ${s}, current: ${Qt(i)}, next: ${Qt(o)}`, { changes: c }), c.added.length === c.dropped.length && $n(c.added, c.dropped).forEach(([u, f]) => {
        if (u && f) r = na(u, f, r);
        else throw new Error(`For a swap action we need a addition and a removal one is missing: ${u}, ${f}`);
      }), c.added.length === 0 && c.dropped.length > 0 && c.dropped.forEach((u) => {
        r = ra(u, r);
      }), c.added.length > 0 && c.dropped.length === 0 && c.added.forEach((u) => {
        r = ia(u, r);
      }));
    }
  }), r.length > t.length) {
    const i = wt(r, t, G);
    r = r.filter((o) => !i.map(G).includes(G(o)));
  }
  return r;
}
function sa(e, t) {
  return e.map((n) => {
    const r = t.find((i) => G(n) === G(i) || typeof n != "number" && Xe(n) && ee(i) && Us(n, i));
    return r ?? n;
  });
}
function ne(e) {
  return `lk-${e}`;
}
function aa(e) {
  const t = Zt(e), n = dn(e.participant).pipe(W(() => Zt(e)), J(t));
  return {
    className: ne(e.source === O.Source.Camera || e.source === O.Source.ScreenShare ? "participant-media-video" : "participant-media-audio"),
    trackObserver: n
  };
}
function Zt(e) {
  if (ee(e)) return e.publication;
  {
    const { source: t, name: n, participant: r } = e;
    if (t && n) return r.getTrackPublications().find((i) => i.source === t && i.trackName === n);
    if (n) return r.getTrackPublicationByName(n);
    if (t) return r.getTrackPublication(t);
    throw new Error("At least one of source and name needs to be defined");
  }
}
function _e(e, ...t) {
  return new B((n) => {
    const r = () => {
      n.next(e);
    };
    return t.forEach((o) => {
      e.on(o, r);
    }), () => {
      t.forEach((o) => {
        e.off(o, r);
      });
    };
  }).pipe(J(e));
}
function ze(e, t) {
  return new B((n) => {
    const r = (...o) => {
      n.next(o);
    };
    return e.on(t, r), () => {
      e.off(t, r);
    };
  });
}
function ca(e) {
  return ze(e, k.ConnectionStateChanged).pipe(W(([t]) => t), J(e.state));
}
function ua(e) {
  return _e(e, k.RoomMetadataChanged, k.ConnectionStateChanged).pipe(W((t) => ({
    name: t.name,
    metadata: t.metadata
  })));
}
function la(e) {
  return ze(e, k.ActiveSpeakersChanged).pipe(W(([t]) => t));
}
function $r(e, t, n = !0) {
  return bt(new B((r) => {
    Je.getLocalDevices(e, n).then((i) => {
      r.next(i), r.complete();
    }).catch((i) => {
      t?.(i), r.next([]), r.complete();
    });
  }), new B((r) => {
    var i;
    const o = () => Z(null, null, function* () {
      try {
        const s = yield Je.getLocalDevices(e, n);
        r.next(s);
      } catch (s) {
        t?.(s);
      }
    });
    if (typeof window < "u") {
      if (!window.isSecureContext) throw new Error("Accessing media devices is available only in secure contexts (HTTPS and localhost), in some or all supporting browsers. See: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/mediaDevices");
      (i = navigator?.mediaDevices) == null || i.addEventListener("devicechange", o);
    }
    return () => {
      var s;
      (s = navigator?.mediaDevices) == null || s.removeEventListener("devicechange", o);
    };
  }));
}
function fa(e) {
  return ze(e, k.DataReceived);
}
function Wr(e) {
  return _e(e, k.AudioPlaybackStatusChanged).pipe(W((t) => ({ canPlayAudio: t.canPlaybackAudio })));
}
function da(e) {
  return _e(e, k.VideoPlaybackStatusChanged).pipe(W((t) => ({ canPlayVideo: t.canPlaybackVideo })));
}
function pa(e, t) {
  return ze(e, k.ActiveDeviceChanged).pipe(At(([n]) => n === t), W(([n, r]) => (R.debug("activeDeviceObservable | RoomEvent.ActiveDeviceChanged", {
    kind: n,
    deviceId: r
  }), r)));
}
function ha(e, t) {
  return ze(e, k.ParticipantEncryptionStatusChanged).pipe(At(([, n]) => t?.identity === n?.identity || !n && t?.identity === e.localParticipant.identity), W(([n]) => n), J(t?.isLocal ? t.isE2EEEnabled : !!t?.isEncrypted));
}
function va(e) {
  return ze(e, k.RecordingStatusChanged).pipe(W(([t]) => t), J(e.isRecording));
}
function qe(e, ...t) {
  return new B((n) => {
    const r = () => {
      n.next(e);
    };
    return t.forEach((o) => {
      e.on(o, r);
    }), () => {
      t.forEach((o) => {
        e.off(o, r);
      });
    };
  }).pipe(J(e));
}
function dn(e) {
  return qe(e, _.TrackMuted, _.TrackUnmuted, _.ParticipantPermissionsChanged, _.TrackPublished, _.TrackUnpublished, _.LocalTrackPublished, _.LocalTrackUnpublished, _.MediaDevicesError, _.TrackSubscriptionStatusChanged).pipe(W((t) => {
    const { isMicrophoneEnabled: n, isCameraEnabled: r, isScreenShareEnabled: i } = t, o = t.getTrackPublication(O.Source.Microphone);
    return {
      isCameraEnabled: r,
      isMicrophoneEnabled: n,
      isScreenShareEnabled: i,
      cameraTrack: t.getTrackPublication(O.Source.Camera),
      microphoneTrack: o,
      participant: t
    };
  }));
}
function jr(e) {
  if (e)
    return qe(e, _.ParticipantMetadataChanged, _.ParticipantNameChanged).pipe(W(({ name: t, identity: n, metadata: r }) => ({
      name: t,
      identity: n,
      metadata: r
    })), J({
      name: e.name,
      identity: e.identity,
      metadata: e.metadata
    }));
}
function ma(e) {
  return Lt(e, _.ConnectionQualityChanged).pipe(W(([t]) => t), J(e.connectionQuality));
}
function Lt(e, t) {
  return new B((n) => {
    const r = (...o) => {
      n.next(o);
    };
    return e.on(t, r), () => {
      e.off(t, r);
    };
  });
}
function Br(e) {
  var t, n, r, i;
  return qe(e.participant, _.TrackMuted, _.TrackUnmuted, _.TrackSubscribed, _.TrackUnsubscribed, _.LocalTrackPublished, _.LocalTrackUnpublished).pipe(W((o) => {
    var s, a;
    const c = (s = e.publication) != null ? s : o.getTrackPublication(e.source);
    return (a = c?.isMuted) != null ? a : !0;
  }), J((i = (r = (t = e.publication) == null ? void 0 : t.isMuted) != null ? r : (n = e.participant.getTrackPublication(e.source)) == null ? void 0 : n.isMuted) != null ? i : !0));
}
function ga(e) {
  return Lt(e, _.IsSpeakingChanged).pipe(W(([t]) => t));
}
function ba(e, t = {}) {
  var n;
  let r;
  const i = new B((a) => (r = a, () => s.unsubscribe())).pipe(J(Array.from(e.remoteParticipants.values()))), o = (n = t.additionalRoomEvents) != null ? n : Ar, s = _e(e, ...Array.from(/* @__PURE__ */ new Set([
    k.ParticipantConnected,
    k.ParticipantDisconnected,
    k.ConnectionStateChanged,
    ...o
  ]))).subscribe((a) => r?.next(Array.from(a.remoteParticipants.values())));
  return e.remoteParticipants.size > 0 && r?.next(Array.from(e.remoteParticipants.values())), i;
}
function ya(e, t, n = {}) {
  var r;
  const i = (r = n.additionalEvents) != null ? r : Lr;
  return _e(e, k.ParticipantConnected, k.ParticipantDisconnected, k.ConnectionStateChanged).pipe(Mr((o) => {
    const s = o.getParticipantByIdentity(t);
    return s ? qe(s, ...i) : new B((a) => a.next(void 0));
  }), J(e.getParticipantByIdentity(t)));
}
function Vr(e) {
  return Lt(e, _.ParticipantPermissionsChanged).pipe(W(() => e.permissions), J(e.permissions));
}
function wa(e, { kind: t, identity: n }, r = {}) {
  var i;
  const o = (i = r.additionalEvents) != null ? i : Lr, s = (a) => {
    let c = !0;
    return t && (c = c && a.kind === t), n && (c = c && a.identity === n), c;
  };
  return _e(e, k.ParticipantConnected, k.ParticipantDisconnected, k.ConnectionStateChanged).pipe(Mr((a) => {
    const c = Array.from(a.remoteParticipants.values()).find((u) => s(u));
    return c ? qe(c, ...o) : new B((u) => u.next(void 0));
  }), J(Array.from(e.remoteParticipants.values()).find((a) => s(a))));
}
function en(e) {
  return typeof e > "u" ? new B() : Lt(e, _.AttributesChanged).pipe(W(([t]) => ({
    changed: t,
    attributes: e.attributes
  })), J({
    changed: e.attributes,
    attributes: e.attributes
  }));
}
function Sa(e, t, n, r, i) {
  const { localParticipant: o } = t, s = (f, d) => {
    let p = !1;
    switch (f) {
      case O.Source.Camera:
        p = d.isCameraEnabled;
        break;
      case O.Source.Microphone:
        p = d.isMicrophoneEnabled;
        break;
      case O.Source.ScreenShare:
        p = d.isScreenShareEnabled;
        break;
      default:
        break;
    }
    return p;
  }, a = dn(o).pipe(W((f) => s(e, f.participant)), J(s(e, o))), c = new be(), u = (f, d) => Z(null, null, function* () {
    try {
      switch (d ?? (d = n), c.next(!0), e) {
        case O.Source.Camera:
          return yield o.setCameraEnabled(f ?? !o.isCameraEnabled, d, r), o.isCameraEnabled;
        case O.Source.Microphone:
          return yield o.setMicrophoneEnabled(f ?? !o.isMicrophoneEnabled, d, r), o.isMicrophoneEnabled;
        case O.Source.ScreenShare:
          return yield o.setScreenShareEnabled(f ?? !o.isScreenShareEnabled, d, r), o.isScreenShareEnabled;
        default:
          throw new TypeError("Tried to toggle unsupported source");
      }
    } catch (p) {
      if (i && p instanceof Error) {
        i?.(p);
        return;
      } else throw p;
    } finally {
      c.next(!1);
    }
  });
  return {
    className: ne("button"),
    toggle: u,
    enabledObserver: a,
    pendingObserver: c.asObservable()
  };
}
function Ea() {
  let e = !1;
  const t = new be(), n = new be(), r = (i) => Z(null, null, function* () {
    n.next(!0), e = i ?? !e, t.next(e), n.next(!1);
  });
  return {
    className: ne("button"),
    toggle: r,
    enabledObserver: t.asObservable(),
    pendingObserver: n.asObservable()
  };
}
function Ca(e, t, n) {
  const r = new hr(void 0), i = pa(t, e), o = (s, ...a) => Z(null, [s, ...a], function* (c, u = {}) {
    var f, d, p;
    if (n) {
      yield n.setDeviceId(u.exact ? { exact: c } : c);
      const h = yield n.getDeviceId(!1);
      r.next(c === "default" && n.mediaStreamTrack.label.startsWith("Default") ? c : h);
    } else if (t) {
      const h = Ci();
      if (e === "audiooutput" && (h?.name === "Safari" || h?.os === "iOS")) {
        R.warn("Switching audio output device is not supported on Safari and iOS.");
        return;
      }
      R.debug(`Switching active device of kind "${e}" with id ${c}.`), yield t.switchActiveDevice(e, c, u.exact);
      const m = (f = t.getActiveDevice(e)) != null ? f : c;
      m !== c && c !== "default" && R.info(`We tried to select the device with id (${c}), but the browser decided to select the device with id (${m}) instead.`);
      let S;
      e === "audioinput" ? S = (d = t.localParticipant.getTrackPublication(O.Source.Microphone)) == null ? void 0 : d.track : e === "videoinput" && (S = (p = t.localParticipant.getTrackPublication(O.Source.Camera)) == null ? void 0 : p.track);
      const y = c === "default" && !S || c === "default" && S?.mediaStreamTrack.label.startsWith("Default");
      r.next(y ? c : m);
    }
  });
  return {
    className: ne("media-device-select"),
    activeDeviceObservable: i,
    setActiveMediaDevice: o
  };
}
function Ta(e) {
  const t = (n) => {
    e.disconnect(n);
  };
  return {
    className: ne("disconnect-button"),
    disconnect: t
  };
}
function xa(e) {
  return {
    className: ne("connection-quality"),
    connectionQualityObserver: ma(e)
  };
}
function ka(e) {
  let t = "track-muted-indicator-camera";
  switch (e.source) {
    case O.Source.Camera:
      t = "track-muted-indicator-camera";
      break;
    case O.Source.Microphone:
      t = "track-muted-indicator-microphone";
      break;
    default:
      break;
  }
  return {
    className: ne(t),
    mediaMutedObserver: Br(e)
  };
}
function eu(e) {
  return {
    className: "lk-participant-name",
    infoObserver: jr(e)
  };
}
function Pa() {
  return { className: ne("participant-tile") };
}
var Hr = {
  CHAT: "lk.chat",
  TRANSCRIPTION: "lk.transcription"
}, Ma = { CHAT: "lk-chat-topic" };
function zr(e, t) {
  return Z(this, arguments, function* (n, r, i = {}) {
    const { reliable: o, destinationIdentities: s, topic: a } = i;
    yield n.publishData(r, {
      destinationIdentities: s,
      topic: a,
      reliable: o
    });
  });
}
function qr(e, t, n) {
  const r = Array.isArray(t) ? t : [t], i = fa(e).pipe(At(([, , , c]) => t === void 0 || c !== void 0 && r.includes(c)), W(([c, u, , f]) => {
    const d = {
      payload: c,
      topic: f,
      from: u
    };
    return n?.(d), d;
  }));
  let o;
  const s = new B((c) => {
    o = c;
  });
  return {
    messageObservable: i,
    isSendingObservable: s,
    send: (c, ...u) => Z(null, [c, ...u], function* (f, d = {}) {
      o.next(!0);
      try {
        yield zr(e.localParticipant, f, ae({ topic: r[0] }, d));
      } finally {
        o.next(!1);
      }
    })
  };
}
var Aa = class {
  constructor(e, t) {
    this._isResolved = !1, this.onFinally = t, this.promise = new Promise((n, r) => Z(this, null, function* () {
      this.resolve = n, this.reject = r, e && (yield e(n, r));
    })).finally(() => {
      var n;
      this._isResolved = !0, (n = this.onFinally) == null || n.call(this);
    });
  }
  get isResolved() {
    return this._isResolved;
  }
}, ot = /* @__PURE__ */ new WeakMap(), st = /* @__PURE__ */ new Map();
function La(e) {
  return e.ignoreLegacy == !0;
}
var Oa = (e) => JSON.parse(new TextDecoder().decode(e)), _a = (e) => new TextEncoder().encode(JSON.stringify(e));
function Ia(e, t) {
  var n, r, i, o, s, a;
  const c = () => {
    var M, v, g;
    return ((M = e.serverInfo) == null ? void 0 : M.edition) === 1 || !!((v = e.serverInfo) != null && v.version) && wi((g = e.serverInfo) == null ? void 0 : g.version, "1.8.2") > 0;
  }, u = new be(), f = (n = t?.channelTopic) != null ? n : Hr.CHAT, d = (r = t?.channelTopic) != null ? r : Ma.CHAT;
  let p = !1;
  ot.has(e) || (p = !0);
  const h = (i = ot.get(e)) != null ? i : /* @__PURE__ */ new Map(), m = (o = h.get(f)) != null ? o : new be();
  h.set(f, m), ot.set(e, h);
  const S = (s = t?.messageDecoder) != null ? s : Oa;
  if (p) {
    e.registerTextStreamHandler(f, (v, g) => Z(null, null, function* () {
      const { id: E, timestamp: x, attributes: C, attachedStreamIds: I } = v.info, T = new Map((I ?? []).map((A) => [A, new Aa()]));
      st.set(E, T), $e(v).pipe(ct((A, D) => A + D), Ve((A) => T.size === 0 ? Jt({
        chunk: A,
        attachedFiles: []
      }) : $e(T.values()).pipe(Ss((D) => $e(D.promise)), ct((D, U) => [...D, new File(U.buffer, U.fileName, { type: U.mimeType })], []), W((D) => ({
        chunk: A,
        attachedFiles: D
      })))), W(({ chunk: A, attachedFiles: D }) => ({
        id: E,
        timestamp: x,
        message: A,
        from: e.getParticipantByIdentity(g.identity),
        type: "chatMessage",
        attributes: C,
        attachedFiles: D
      })), Ts(() => st.delete(E))).subscribe({ next: (A) => m.next(A) });
    })), e.registerByteStreamHandler(f, (v) => Z(null, null, function* () {
      var g, E;
      const { id: x } = v.info, C = Array.from(st).find(([, V]) => V.has(x));
      if (!C) return;
      const I = C[0], T = [];
      try {
        for (var A = Rs(v), D, U, H; D = !(U = yield A.next()).done; D = !1) {
          const V = U.value;
          T.push(V);
        }
      } catch (V) {
        H = [V];
      } finally {
        try {
          D && (U = A.return) && (yield U.call(A));
        } finally {
          if (H) throw H[0];
        }
      }
      const z = (g = st.get(I)) == null ? void 0 : g.get(x);
      z && ((E = z.resolve) == null || E.call(z, {
        fileName: v.info.name,
        mimeType: v.info.mimeType,
        buffer: T
      }));
    }));
    const { messageObservable: M } = qr(e, [d]);
    M.pipe(W((v) => {
      const g = S(v.payload);
      if (!La(g))
        return Pe(ae({}, g), {
          type: "chatMessage",
          from: v.from
        });
    }), At((v) => !!v), In(u)).subscribe(m);
  }
  const y = m.pipe(ct((M, v) => {
    if ("id" in v && M.find((g) => {
      var E, x;
      return ((E = g.from) == null ? void 0 : E.identity) === ((x = v.from) == null ? void 0 : x.identity) && g.id === v.id;
    })) {
      const g = M.findIndex((E) => E.id === v.id);
      if (g > -1) {
        const E = M[g];
        M[g] = Pe(ae({}, v), {
          timestamp: E.timestamp,
          editTimestamp: v.timestamp
        });
      }
      return [...M];
    }
    return [...M, v];
  }, []), In(u)), b = new hr(!1), w = (a = t?.messageEncoder) != null ? a : _a, P = (M, v) => Z(null, null, function* () {
    v || (v = {}), v.topic ?? (v.topic = f), b.next(!0);
    try {
      const g = {
        id: (yield e.localParticipant.sendText(M, v)).id,
        timestamp: Date.now(),
        message: M
      }, E = Pe(ae({}, Pe(ae({}, g), { attachedFiles: v.attachments })), {
        type: "chatMessage",
        from: e.localParticipant,
        attributes: v.attributes
      });
      m.next(E);
      const x = w(Pe(ae({}, g), { ignoreLegacy: c() }));
      try {
        yield zr(e.localParticipant, x, {
          reliable: !0,
          topic: d
        });
      } catch (C) {
        R.info("could not send message in legacy chat format", C);
      }
      return E;
    } finally {
      b.next(!1);
    }
  });
  function N() {
    u.next(), u.complete(), m.complete(), ot.delete(e), e.unregisterTextStreamHandler(f), e.unregisterByteStreamHandler(f);
  }
  return e.once(k.Disconnected, N), {
    messageObservable: y,
    isSendingObservable: b,
    send: P
  };
}
function Ra() {
  const e = (t) => Z(null, null, function* () {
    R.info("Start Audio for room: ", t), yield t.startAudio();
  });
  return {
    className: ne("start-audio-button"),
    roomAudioPlaybackAllowedObservable: Wr,
    handleStartAudioPlayback: e
  };
}
function Da() {
  const e = (t) => Z(null, null, function* () {
    R.info("Start Video for room: ", t), yield t.startVideo();
  });
  return {
    className: ne("start-audio-button"),
    roomVideoPlaybackAllowedObservable: da,
    handleStartVideoPlayback: e
  };
}
function Na() {
  return { className: [ne("button"), ne("chat-toggle")].join(" ") };
}
function Fa() {
  return { className: [ne("button"), ne("focus-toggle-button")].join(" ") };
}
function Ua() {
  return { className: "lk-clear-pin-button lk-button" };
}
function $a() {
  return { className: "lk-room-container" };
}
function Wn(e, t, n = !0) {
  const r = [e.localParticipant, ...Array.from(e.remoteParticipants.values())], i = [];
  return r.forEach((o) => {
    t.forEach((s) => {
      const a = Array.from(o.trackPublications.values()).filter((c) => c.source === s && (!n || c.track)).map((c) => ({
        participant: o,
        publication: c,
        source: c.source
      }));
      i.push(...a);
    });
  }), {
    trackReferences: i,
    participants: r
  };
}
function jn(e, t, n = !1) {
  const { sources: r, kind: i, name: o } = t;
  return Array.from(e.trackPublications.values()).filter((s) => (!r || r.includes(s.source)) && (!i || s.kind === i) && (!o || s.trackName === o) && (!n || s.track)).map((s) => ({
    participant: e,
    publication: s,
    source: s.source
  }));
}
function Wa(e, t, n) {
  var r, i;
  const o = (r = n.additionalRoomEvents) != null ? r : Ar, s = (i = n.onlySubscribed) != null ? i : !0;
  return _e(e, ...Array.from((/* @__PURE__ */ new Set([
    k.ParticipantConnected,
    k.ParticipantDisconnected,
    k.ConnectionStateChanged,
    k.LocalTrackPublished,
    k.LocalTrackUnpublished,
    k.TrackPublished,
    k.TrackUnpublished,
    k.TrackSubscriptionStatusChanged,
    ...o
  ])).values())).pipe(W((a) => {
    const c = Wn(a, t, s);
    return R.debug(`TrackReference[] was updated. (length ${c.trackReferences.length})`, c), c;
  }), J(Wn(e, t, s)));
}
function ja(e, t) {
  return qe(e, ...Bs).pipe(W((n) => {
    const r = jn(n, t);
    return R.debug(`TrackReference[] was updated. (length ${r.length})`, r), r;
  }), J(jn(e, t)));
}
function Kr(e, t) {
  return new B((n) => {
    const r = (...o) => {
      n.next(o);
    };
    return e.on(t, r), () => {
      e.off(t, r);
    };
  });
}
function Ba(e) {
  return Kr(e, Xn.TranscriptionReceived);
}
function Va(e) {
  return Kr(e, Xn.TimeSyncUpdate).pipe(W(([t]) => t));
}
function tu(e, t = 1e3) {
  if (e === null) return Jt(!1);
  const n = Yt(e, "mousemove", { passive: !0 }).pipe(W(() => !0)), r = n.pipe(ss({
    each: t,
    with: () => bt(Jt(!1), r.pipe(ks(n)))
  }), Es());
  return r;
}
function Ha(e, t) {
  if (typeof localStorage > "u") {
    R.error("Local storage is not available.");
    return;
  }
  try {
    if (t) {
      const n = Object.fromEntries(Object.entries(t).filter(([, r]) => r !== ""));
      localStorage.setItem(e, JSON.stringify(n));
    }
  } catch (n) {
    R.error(`Error setting item to local storage: ${n}`);
  }
}
function za(e) {
  if (typeof localStorage > "u") {
    R.error("Local storage is not available.");
    return;
  }
  try {
    const t = localStorage.getItem(e);
    if (!t) {
      R.warn(`Item with key ${e} does not exist in local storage.`);
      return;
    }
    return JSON.parse(t);
  } catch (t) {
    R.error(`Error getting item from local storage: ${t}`);
    return;
  }
}
function qa(e) {
  return {
    load: () => za(e),
    save: (t) => Ha(e, t)
  };
}
var Ka = "lk-user-choices", Ge = {
  videoEnabled: !0,
  audioEnabled: !0,
  videoDeviceId: "default",
  audioDeviceId: "default",
  username: ""
}, { load: Ga, save: Ja } = qa(Ka);
function Ya(e, t = !1) {
  t !== !0 && Ja(e);
}
function Qa(e, t = !1) {
  var n, r, i, o, s;
  const a = {
    videoEnabled: (n = e?.videoEnabled) != null ? n : Ge.videoEnabled,
    audioEnabled: (r = e?.audioEnabled) != null ? r : Ge.audioEnabled,
    videoDeviceId: (i = e?.videoDeviceId) != null ? i : Ge.videoDeviceId,
    audioDeviceId: (o = e?.audioDeviceId) != null ? o : Ge.audioDeviceId,
    username: (s = e?.username) != null ? s : Ge.username
  };
  if (t) return a;
  {
    const c = Ga();
    return ae(ae({}, a), c ?? {});
  }
}
var Ht = null, zt = null, Xa = 0;
function Bn() {
  return Ht || (Ht = /* @__PURE__ */ new Map()), Ht;
}
function Za() {
  return zt || (zt = /* @__PURE__ */ new WeakMap()), zt;
}
function ec(e, t) {
  const n = Za();
  let r = n.get(e);
  return r || (r = `room_${Xa++}`, n.set(e, r)), `${r}:${t}`;
}
function tc(e, t) {
  const n = ec(e, t), r = Bn(), i = r.get(n);
  if (i) return i;
  const o = new be();
  let s = [];
  const a = "lk.segment_id", c = o.pipe(Ps({
    subscribe: () => {
      e.registerTextStreamHandler(t, (u, f) => Z(null, null, function* () {
        var d;
        const p = $e(u).pipe(ct((m, S) => m + S, "")), h = !!((d = u.info.attributes) != null && d[a]);
        p.subscribe((m) => {
          const S = s.findIndex((y) => {
            var b, w;
            return y.streamInfo.id === u.info.id || h && ((b = y.streamInfo.attributes) == null ? void 0 : b[a]) === ((w = u.info.attributes) == null ? void 0 : w[a]);
          });
          S !== -1 ? (s[S] = Pe(ae({}, s[S]), {
            text: m,
            streamInfo: u.info
          }), o.next([...s])) : (s.push({
            text: m,
            participantInfo: f,
            streamInfo: u.info
          }), o.next([...s]));
        });
      }));
    },
    finalize: () => {
      e.unregisterTextStreamHandler(t);
    }
  }), xs());
  return r.set(n, c), e.on(k.Disconnected, () => {
    Bn().delete(n), s = [], o.next([]);
  }), c;
}
function Gr(e, t) {
  if (t.msg === "show_chat") return {
    ...e,
    showChat: !0,
    unreadMessages: 0
  };
  if (t.msg === "hide_chat") return {
    ...e,
    showChat: !1
  };
  if (t.msg === "toggle_chat") {
    const n = {
      ...e,
      showChat: !e.showChat
    };
    return n.showChat === !0 && (n.unreadMessages = 0), n;
  } else return t.msg === "unread_msg" ? {
    ...e,
    unreadMessages: t.count
  } : t.msg === "toggle_settings" ? {
    ...e,
    showSettings: !e.showSettings
  } : { ...e };
}
function Jr(e, t) {
  return t.msg === "set_pin" ? [t.trackReference] : t.msg === "clear_pin" ? [] : { ...e };
}
var Yr = l.createContext(void 0);
function Qr() {
  const e = l.useContext(Yr);
  if (!e) throw Error("Tried to access LayoutContext context outside a LayoutContextProvider provider.");
  return e;
}
function nc(e) {
  const t = Xr();
  if (e ?? (e = t), !e) throw Error("Tried to access LayoutContext context outside a LayoutContextProvider provider.");
  return e;
}
function nu() {
  const [e, t] = l.useReducer(Jr, _r), [n, r] = l.useReducer(Gr, Ir);
  return {
    pin: {
      dispatch: t,
      state: e
    },
    widget: {
      dispatch: r,
      state: n
    }
  };
}
function ru(e) {
  const [t, n] = l.useReducer(Jr, _r), [r, i] = l.useReducer(Gr, Ir);
  return e ?? {
    pin: {
      dispatch: n,
      state: t
    },
    widget: {
      dispatch: i,
      state: r
    }
  };
}
function Xr() {
  return l.useContext(Yr);
}
var Zr = l.createContext(void 0);
function iu() {
  const e = l.useContext(Zr);
  if (!e) throw Error("tried to access track context outside of track context provider");
  return e;
}
function ei() {
  return l.useContext(Zr);
}
function pn(e) {
  const t = ei(), n = e ?? t;
  if (!n) throw new Error("No TrackRef, make sure you are inside a TrackRefContext or pass the TrackRef explicitly");
  return n;
}
var ti = l.createContext(void 0);
function ou() {
  const e = l.useContext(ti);
  if (!e) throw Error("tried to access participant context outside of participant context provider");
  return e;
}
function Ot() {
  return l.useContext(ti);
}
function Ie(e) {
  const t = Ot(), n = ei(), r = e ?? t ?? n?.participant;
  if (!r) throw new Error("No participant provided, make sure you are inside a participant context or pass the participant explicitly");
  return r;
}
var hn = l.createContext(void 0);
function _t() {
  const e = l.useContext(hn);
  if (!e) throw Error("tried to access room context outside of livekit room component");
  return e;
}
function It() {
  return l.useContext(hn);
}
function oe(e) {
  const t = It(), n = e ?? t;
  if (!n) throw new Error("No room provided, make sure you are inside a Room context or pass the room explicitly");
  return n;
}
var ni = l.createContext(void 0);
function su() {
  const e = l.useContext(ni);
  if (!e) throw Error("tried to access session context outside of SessionProvider component");
  return e;
}
function ri() {
  return l.useContext(ni);
}
function ii(e) {
  const t = ri(), n = e ?? t;
  if (!n) throw new Error("No session provided, make sure you are inside a Session context or pass the session explicitly");
  return n;
}
var oi = l.createContext(void 0);
function au(e) {
  const t = l.useContext(oi);
  if (e === !0) {
    if (t) return t;
    throw Error("tried to access feature context, but none is present");
  }
  return t;
}
function cu(e) {
  const t = oe(e), n = l.useCallback(async () => {
    await t.startAudio();
  }, [t]), { canPlayAudio: r } = j(l.useMemo(() => Wr(t), [t]), { canPlayAudio: t.canPlaybackAudio });
  return {
    canPlayAudio: r,
    startAudio: n
  };
}
function si(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var i = e.length;
    for (t = 0; t < i; t++) e[t] && (n = si(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function ai() {
  for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = si(e)) && (r && (r += " "), r += t);
  return r;
}
function rc(...e) {
  return (...t) => {
    for (const n of e) if (typeof n == "function") try {
      n(...t);
    } catch (r) {
      console.error(r);
    }
  };
}
function pe(...e) {
  const t = { ...e[0] };
  for (let n = 1; n < e.length; n++) {
    const r = e[n];
    for (const i in r) {
      const o = t[i], s = r[i];
      typeof o == "function" && typeof s == "function" && i[0] === "o" && i[1] === "n" && i.charCodeAt(2) >= 65 && i.charCodeAt(2) <= 90 ? t[i] = rc(o, s) : (i === "className" || i === "UNSAFE_className") && typeof o == "string" && typeof s == "string" ? t[i] = ai(o, s) : t[i] = s !== void 0 ? s : o;
    }
  }
  return t;
}
function uu(e) {
  const { state: t, dispatch: n } = Qr().pin;
  return { buttonProps: l.useMemo(() => {
    const { className: r } = Ua();
    return pe(e, {
      className: r,
      disabled: !t?.length,
      onClick: () => {
        n && n({ msg: "clear_pin" });
      }
    });
  }, [
    e,
    n,
    t
  ]) };
}
function lu(e = {}) {
  const t = Ie(e.participant), { className: n, connectionQualityObserver: r } = l.useMemo(() => xa(t), [t]);
  return {
    className: n,
    quality: j(r, t.connectionQuality)
  };
}
function tt(e) {
  const t = oe(e);
  return j(l.useMemo(() => ca(t), [t]), t.state);
}
function fu(e, t) {
  const n = typeof e == "function" ? e : t, r = typeof e == "string" ? e : void 0, i = _t(), { send: o, messageObservable: s, isSendingObservable: a } = l.useMemo(() => qr(i, r, n), [
    i,
    r,
    n
  ]);
  return {
    message: j(s, void 0),
    send: o,
    isSending: j(a, !1)
  };
}
function du(e) {
  const t = _t(), n = tt(t);
  return { buttonProps: l.useMemo(() => {
    const { className: r, disconnect: i } = Ta(t);
    return pe(e, {
      className: r,
      onClick: () => i(e.stopTracks ?? !0),
      disabled: n === q.Disconnected
    });
  }, [
    t,
    e,
    n
  ]) };
}
function ic(e) {
  if (e.publication instanceof mi) {
    const t = e.publication.track;
    if (t) {
      const { facingMode: n } = Ei(t);
      return n;
    }
  }
  return "undefined";
}
function pu({ trackRef: e, props: t }) {
  const n = pn(e), r = Xr(), { className: i } = l.useMemo(() => Fa(), []), o = l.useMemo(() => Fs(n, r?.pin.state), [n, r?.pin.state]);
  return {
    mergedProps: l.useMemo(() => pe(t, {
      className: i,
      onClick: (s) => {
        t.onClick?.(s), o ? r?.pin.dispatch?.({ msg: "clear_pin" }) : r?.pin.dispatch?.({
          msg: "set_pin",
          trackReference: n
        });
      }
    }), [
      t,
      i,
      n,
      o,
      r?.pin
    ]),
    inFocus: o
  };
}
function hu(e, t, n = {}) {
  const r = n.gridLayouts ?? Hs, { width: i, height: o } = Oi(e), s = Or(r, t, i, o);
  return l.useEffect(() => {
    e.current && s && (e.current.style.setProperty("--lk-col-count", s?.columns.toString()), e.current.style.setProperty("--lk-row-count", s?.rows.toString()));
  }, [e, s]), {
    layout: s,
    containerWidth: i,
    containerHeight: o
  };
}
function Vn(e, t = {}) {
  const n = Ie(typeof e == "string" ? t.participant : e.participant), r = typeof e == "string" ? {
    participant: n,
    source: e
  } : e, [i, o] = l.useState(!!(r.publication?.isMuted || n.getTrackPublication(r.source)?.isMuted));
  return l.useEffect(() => {
    const s = Br(r).subscribe(o);
    return () => s.unsubscribe();
  }, [G(r)]), i;
}
function oc(e) {
  const t = Ie(e);
  return j(l.useMemo(() => ga(t), [t]), t.isSpeaking);
}
function sc(e) {
  return e !== void 0;
}
function vu(...e) {
  return pe(...e.filter(sc));
}
function mu(e, t, n) {
  return l.Children.map(e, (r) => l.isValidElement(r) && l.Children.only(e) ? (r.props.className && (t ?? (t = {}), t.className = ai(r.props.className, t.className), t.style = {
    ...r.props.style,
    ...t.style
  }), l.cloneElement(r, {
    ...t,
    key: n
  })) : r);
}
function gu(e) {
  if (typeof window < "u" && typeof process < "u" && (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "development")) {
    const t = e ?? document.querySelector(".lk-room-container");
    t && !getComputedStyle(t).getPropertyValue("--lk-has-imported-styles") && R.warn("It looks like you're not using the `@livekit/components-styles package`. To render the UI with the default styling, please import it in your layout or page.");
  }
}
function ac(e, t) {
  return e === "processor" && t && typeof t == "object" && "name" in t ? t.name : (e === "e2ee" || e === "encryption") && t ? "e2ee-enabled" : t;
}
var cc = {
  connect: !0,
  audio: !1,
  video: !1
};
function uc(e) {
  const { token: t, serverUrl: n, options: r, room: i, connectOptions: o, connect: s, audio: a, video: c, screen: u, onConnected: f, onDisconnected: d, onError: p, onMediaDeviceFailure: h, onEncryptionError: m, simulateParticipants: S, ...y } = {
    ...cc,
    ...e
  };
  r && i && R.warn("when using a manually created room, the options object will be ignored. set the desired options directly when creating the room instead.");
  const [b, w] = l.useState(), P = l.useRef(s);
  l.useEffect(() => {
    w(i ?? new Je(r));
  }, [i, JSON.stringify(r, ac)]);
  const N = l.useMemo(() => {
    const { className: M } = $a();
    return pe(y, { className: M });
  }, [y]);
  return l.useEffect(() => {
    if (!b) return;
    const M = () => {
      const C = b.localParticipant;
      R.debug("trying to publish local tracks"), Promise.all([
        C.setMicrophoneEnabled(!!a, typeof a != "boolean" ? a : void 0),
        C.setCameraEnabled(!!c, typeof c != "boolean" ? c : void 0),
        C.setScreenShareEnabled(!!u, typeof u != "boolean" ? u : void 0)
      ]).catch((I) => {
        R.warn(I), p?.(I);
      });
    }, v = (C, I) => {
      const T = gi.getFailure(C);
      h?.(T, I);
    }, g = (C) => {
      m?.(C);
    }, E = (C) => {
      d?.(C);
    }, x = () => {
      f?.();
    };
    return b.on(k.SignalConnected, M).on(k.MediaDevicesError, v).on(k.EncryptionError, g).on(k.Disconnected, E).on(k.Connected, x), () => {
      b.off(k.SignalConnected, M).off(k.MediaDevicesError, v).off(k.EncryptionError, g).off(k.Disconnected, E).off(k.Connected, x);
    };
  }, [
    b,
    a,
    c,
    u,
    p,
    m,
    h,
    f,
    d
  ]), l.useEffect(() => {
    if (b) {
      if (S) {
        b.simulateParticipants({
          participants: { count: S },
          publish: {
            audio: !0,
            useRealTracks: !0
          }
        });
        return;
      }
      if (s) {
        if (P.current = !0, R.debug("connecting"), !t) {
          R.debug("no token yet");
          return;
        }
        if (!n) {
          R.warn("no livekit url provided"), p?.(Error("no livekit url provided"));
          return;
        }
        b.connect(n, t, o).catch((M) => {
          R.warn(M), P.current === !0 && p?.(M);
        });
      } else
        R.debug("disconnecting because connect is false"), P.current = !1, b.disconnect();
    }
  }, [
    s,
    t,
    JSON.stringify(o),
    b,
    p,
    n,
    S
  ]), l.useEffect(() => {
    if (b)
      return () => {
        R.info("disconnecting on onmount"), b.disconnect();
      };
  }, [b]), {
    room: b,
    htmlProps: N
  };
}
function ci(e = {}) {
  const t = oe(e.room), [n, r] = l.useState(t.localParticipant), [i, o] = l.useState(n.isMicrophoneEnabled), [s, a] = l.useState(n.isCameraEnabled), [c, u] = l.useState(n.isScreenShareEnabled), [f, d] = l.useState(n.lastMicrophoneError), [p, h] = l.useState(n.lastCameraError), [m, S] = l.useState(void 0), [y, b] = l.useState(void 0), w = (P) => {
    a(P.isCameraEnabled), o(P.isMicrophoneEnabled), u(P.isScreenShareEnabled), b(P.cameraTrack), S(P.microphoneTrack), d(P.participant.lastMicrophoneError), h(P.participant.lastCameraError), r(P.participant);
  };
  return l.useEffect(() => {
    const P = dn(t.localParticipant).subscribe(w);
    return () => P.unsubscribe();
  }, [t]), {
    isMicrophoneEnabled: i,
    isScreenShareEnabled: c,
    isCameraEnabled: s,
    microphoneTrack: m,
    cameraTrack: y,
    lastMicrophoneError: f,
    lastCameraError: p,
    localParticipant: n
  };
}
function bu() {
  const e = _t();
  return j(l.useMemo(() => Vr(e.localParticipant), [e]), e.localParticipant.permissions);
}
function yu({ kind: e, room: t, track: n, requestPermissions: r, onError: i }) {
  const o = It(), s = l.useMemo(() => t ?? o ?? new Je(), [t, o]), a = j(l.useMemo(() => $r(e, i, r), [
    e,
    r,
    i
  ]), []), [c, u] = l.useState(s?.getActiveDevice(e) ?? "default"), { className: f, activeDeviceObservable: d, setActiveMediaDevice: p } = l.useMemo(() => Ca(e, s, n), [
    e,
    s,
    n
  ]);
  return l.useEffect(() => {
    const h = d.subscribe((m) => {
      m && (R.info("setCurrentDeviceId", m), u(m));
    });
    return () => {
      h?.unsubscribe();
    };
  }, [d]), {
    devices: a,
    className: f,
    activeDeviceId: c,
    setActiveMediaDevice: p
  };
}
function wu({ kind: e, onError: t }) {
  return j(l.useMemo(() => $r(e, t), [e, t]), []);
}
function lc(e, t, n = {}) {
  const r = l.useRef([]), i = l.useRef(-1), o = t !== i.current, s = typeof n.customSortFunction == "function" ? n.customSortFunction(e) : Ys(e);
  let a = [...s];
  if (o === !1) try {
    a = oa(r.current, s, t);
  } catch (c) {
    R.error("Error while running updatePages(): ", c);
  }
  return o ? r.current = s : r.current = a, i.current = t, a;
}
function Su(e, t) {
  const [n, r] = l.useState(1), i = Math.max(Math.ceil(t.length / e), 1);
  n > i && r(i);
  const o = n * e, s = o - e, a = (u) => {
    r((f) => u === "next" ? f === i ? f : f + 1 : f === 1 ? f : f - 1);
  };
  return {
    totalPageCount: i,
    nextPage: () => a("next"),
    prevPage: () => a("previous"),
    setPage: (u) => {
      u > i ? r(i) : u < 1 ? r(1) : r(u);
    },
    firstItemIndex: s,
    lastItemIndex: o,
    tracks: lc(t, e).slice(s, o),
    currentPage: n
  };
}
function fc(e = {}) {
  let t = Ot();
  e.participant && (t = e.participant);
  const { identity: n, name: r, metadata: i } = j(l.useMemo(() => jr(t), [t]), {
    name: t?.name,
    identity: t?.identity,
    metadata: t?.metadata
  });
  return {
    identity: n,
    name: r,
    metadata: i
  };
}
function Eu(e = {}) {
  const t = Ie(e.participant);
  return j(l.useMemo(() => Vr(t), [t]), t.permissions);
}
function Cu({ trackRef: e, onParticipantClick: t, disableSpeakingIndicator: n, htmlProps: r }) {
  const i = pn(e), o = l.useMemo(() => {
    const { className: p } = Pa();
    return pe(r, {
      className: p,
      onClick: (h) => {
        if (r.onClick?.(h), typeof t == "function") {
          const m = i.publication ?? i.participant.getTrackPublication(i.source);
          t({
            participant: i.participant,
            track: m
          });
        }
      }
    });
  }, [
    r,
    t,
    i.publication,
    i.source,
    i.participant
  ]), s = i.participant.getTrackPublication(O.Source.Microphone), a = l.useMemo(() => ({
    participant: i.participant,
    source: O.Source.Microphone,
    publication: s
  }), [s, i.participant]), c = Vn(i), u = Vn(a), f = oc(i.participant), d = ic(i);
  return { elementProps: {
    "data-lk-audio-muted": u,
    "data-lk-video-muted": c,
    "data-lk-speaking": n === !0 ? !1 : f,
    "data-lk-local-participant": i.participant.isLocal,
    "data-lk-source": i.source,
    "data-lk-facing-mode": d,
    ...o
  } };
}
function vn(e = {}) {
  const t = oe(e.room), [n, r] = l.useState([]);
  return l.useEffect(() => {
    const i = ba(t, { additionalRoomEvents: e.updateOnlyOn }).subscribe(r);
    return () => i.unsubscribe();
  }, [t, JSON.stringify(e.updateOnlyOn)]), n;
}
function dc(e = {}) {
  const t = vn(e), { localParticipant: n } = ci(e);
  return l.useMemo(() => [n, ...t], [n, t]);
}
function Tu(e) {
  return e = nc(e), l.useMemo(() => e?.pin.state !== void 0 && e.pin.state.length >= 1 ? e.pin.state : [], [e.pin.state]);
}
function xu(e, t = {}) {
  const n = _t(), [r] = l.useState(t.updateOnlyOn), i = l.useMemo(() => typeof e == "string" ? ya(n, e, { additionalEvents: r }) : wa(n, e, { additionalEvents: r }), [
    n,
    JSON.stringify(e),
    r
  ]), [o, s] = l.useState({ p: void 0 });
  return l.useEffect(() => {
    const a = i.subscribe((c) => s({ p: c }));
    return () => a.unsubscribe();
  }, [i]), o.p;
}
function ku(e = {}) {
  const t = oe(e.room), { name: n, metadata: r } = j(l.useMemo(() => ua(t), [t]), {
    name: t.name,
    metadata: t.metadata
  });
  return {
    name: n,
    metadata: r
  };
}
function pc(e) {
  const t = oe(e?.room);
  return j(l.useMemo(() => la(t), [t]), t.activeSpeakers);
}
function Pu(e) {
  const [t, n] = l.useState(Un(e)), r = pc();
  return l.useEffect(() => {
    n(Un(e));
  }, [r, e]), t;
}
function Mu({ room: e, props: t }) {
  const n = oe(e), { className: r, roomAudioPlaybackAllowedObservable: i, handleStartAudioPlayback: o } = l.useMemo(() => Ra(), []), { canPlayAudio: s } = j(l.useMemo(() => i(n), [n, i]), { canPlayAudio: n.canPlaybackAudio });
  return {
    mergedProps: l.useMemo(() => pe(t, {
      className: r,
      onClick: () => {
        o(n);
      },
      style: { display: s ? "none" : "block" }
    }), [
      t,
      r,
      s,
      o,
      n
    ]),
    canPlayAudio: s
  };
}
function Au({ room: e, props: t }) {
  const n = oe(e), { className: r, roomVideoPlaybackAllowedObservable: i, handleStartVideoPlayback: o } = l.useMemo(() => Da(), []), { canPlayVideo: s } = j(l.useMemo(() => i(n), [n, i]), { canPlayVideo: n.canPlaybackVideo });
  return {
    mergedProps: l.useMemo(() => pe(t, {
      className: r,
      onClick: () => {
        o(n);
      },
      style: { display: s ? "none" : "block" }
    }), [
      t,
      r,
      s,
      o,
      n
    ]),
    canPlayVideo: s
  };
}
function Lu(e, t = {}) {
  const n = l.useRef(null), r = l.useRef(null), i = t.minSwipeDistance ?? 50, o = (c) => {
    r.current = null, n.current = c.targetTouches[0].clientX;
  }, s = (c) => {
    r.current = c.targetTouches[0].clientX;
  }, a = l.useCallback(() => {
    if (!n.current || !r.current) return;
    const c = n.current - r.current, u = c > i, f = c < -i;
    u && t.onLeftSwipe && t.onLeftSwipe(), f && t.onRightSwipe && t.onRightSwipe();
  }, [i, t]);
  l.useEffect(() => {
    const c = e.current;
    return c && (c.addEventListener("touchstart", o, { passive: !0 }), c.addEventListener("touchmove", s, { passive: !0 }), c.addEventListener("touchend", a, { passive: !0 })), () => {
      c && (c.removeEventListener("touchstart", o), c.removeEventListener("touchmove", s), c.removeEventListener("touchend", a));
    };
  }, [e, a]);
}
function Ou({ props: e }) {
  const { dispatch: t, state: n } = Qr().widget, { className: r } = l.useMemo(() => Na(), []);
  return { mergedProps: l.useMemo(() => pe(e, {
    className: r,
    onClick: () => {
      t && t({ msg: "toggle_chat" });
    },
    "aria-pressed": n?.showChat ? "true" : "false",
    "data-lk-unread-msgs": n ? n.unreadMessages < 10 ? n.unreadMessages.toFixed(0) : "9+" : "0"
  }), [
    e,
    r,
    t,
    n
  ]) };
}
function _u(e, t, n = {}) {
  const [r, i] = l.useState(void 0);
  return l.useEffect(() => {
    if (e === void 0) throw Error("token endpoint needs to be defined");
    if (n.userInfo?.identity === void 0) return;
    (async () => {
      R.debug("fetching token");
      const s = new URLSearchParams({
        ...n.userInfo,
        roomName: t
      }), a = await fetch(`${e}?${s.toString()}`);
      if (!a.ok) {
        R.error(`Could not fetch token. Server responded with status ${a.status}: ${a.statusText}`);
        return;
      }
      const { accessToken: c } = await a.json();
      i(c);
    })();
  }, [
    e,
    t,
    JSON.stringify(n)
  ]), r;
}
function Iu(e) {
  const t = pn(e), { className: n, mediaMutedObserver: r } = l.useMemo(() => ka(t), [G(t)]);
  return {
    isMuted: j(r, !!(t.publication?.isMuted || t.participant.getTrackPublication(t.source)?.isMuted)),
    className: n
  };
}
function Ru({ source: e, onChange: t, initialState: n, captureOptions: r, publishOptions: i, onDeviceError: o, room: s, ...a }) {
  const c = It(), u = l.useMemo(() => s ?? c, [s, c]), f = u?.localParticipant?.getTrackPublication(e), d = l.useRef(!1), { toggle: p, className: h, pendingObserver: m, enabledObserver: S } = l.useMemo(() => u ? Sa(e, u, r, i, o) : Ea(), [
    u,
    e,
    JSON.stringify(r),
    i
  ]), y = j(m, !1), b = j(S, n ?? !!f?.isEnabled);
  l.useEffect(() => {
    t?.(b, d.current), d.current = !1;
  }, [b, t]), l.useEffect(() => {
    n !== void 0 && (R.debug("forcing initial toggle state", e, n), p(n));
  }, []);
  const w = l.useMemo(() => pe(a, { className: h }), [a, h]), P = l.useCallback((N) => {
    d.current = !0, p().catch(() => d.current = !1), a.onClick?.(N);
  }, [a, p]);
  return {
    toggle: p,
    enabled: b,
    pending: y,
    track: f,
    buttonProps: {
      ...w,
      "aria-pressed": b,
      "data-lk-source": e,
      "data-lk-enabled": b,
      disabled: y,
      onClick: P
    }
  };
}
function Du(e = [
  O.Source.Camera,
  O.Source.Microphone,
  O.Source.ScreenShare,
  O.Source.ScreenShareAudio,
  O.Source.Unknown
], t = {}) {
  const n = oe(t.room), [r, i] = l.useState([]), [o, s] = l.useState([]), a = l.useMemo(() => e.map((c) => Rr(c) ? c.source : c), [JSON.stringify(e)]);
  return l.useEffect(() => {
    const c = Wa(n, a, {
      additionalRoomEvents: t.updateOnlyOn,
      onlySubscribed: t.onlySubscribed
    }).subscribe(({ trackReferences: u, participants: f }) => {
      R.debug("setting track bundles", u, f), i(u), s(f);
    });
    return () => c.unsubscribe();
  }, [
    n,
    JSON.stringify(t.onlySubscribed),
    JSON.stringify(t.updateOnlyOn),
    JSON.stringify(e)
  ]), l.useMemo(() => {
    if (Dr(e)) {
      const c = vc(e, o), u = Array.from(r);
      return o.forEach((f) => {
        c.has(f.identity) && (c.get(f.identity) ?? []).forEach((d) => {
          if (r.find(({ participant: h, publication: m }) => f.identity === h.identity && m.source === d)) return;
          R.debug(`Add ${d} placeholder for participant ${f.identity}.`);
          const p = {
            participant: f,
            source: d
          };
          u.push(p);
        });
      }), u;
    } else return r;
  }, [
    r,
    o,
    e
  ]);
}
function hc(e, t) {
  const n = new Set(e);
  for (const r of t) n.delete(r);
  return n;
}
function vc(e, t) {
  const n = /* @__PURE__ */ new Map();
  if (Dr(e)) {
    const r = e.filter((i) => i.withPlaceholder).map((i) => i.source);
    t.forEach((i) => {
      const o = i.getTrackPublications().map((a) => a.track?.source).filter((a) => a !== void 0), s = Array.from(hc(new Set(r), new Set(o)));
      s.length > 0 && n.set(i.identity, s);
    });
  }
  return n;
}
function mc(e) {
  const [t, n] = l.useState(Zt(e)), { trackObserver: r } = l.useMemo(() => aa(e), [e.participant.sid ?? e.participant.identity, e.source]);
  return l.useEffect(() => {
    const i = r.subscribe((o) => {
      n(o);
    });
    return () => i?.unsubscribe();
  }, [r]), {
    participant: e.participant,
    source: e.source ?? O.Source.Unknown,
    publication: t
  };
}
function Nu(e, t) {
  return mc({
    name: e,
    participant: Ie(t)
  });
}
function gc(e) {
  const t = oe(e?.room), n = tt(t), r = l.useMemo(() => n === q.Disconnected, [n]), i = l.useMemo(() => Ia(t, e), [
    t,
    e,
    r
  ]), o = j(i.isSendingObservable, !1), s = j(i.messageObservable, []);
  return {
    send: i.send,
    chatMessages: s,
    isSending: o
  };
}
function Fu(e = {}) {
  const [t, n] = l.useState(Qa(e.defaults, e.preventLoad ?? !1)), r = l.useCallback((c) => {
    n((u) => ({
      ...u,
      audioEnabled: c
    }));
  }, []), i = l.useCallback((c) => {
    n((u) => ({
      ...u,
      videoEnabled: c
    }));
  }, []), o = l.useCallback((c) => {
    n((u) => ({
      ...u,
      audioDeviceId: c
    }));
  }, []), s = l.useCallback((c) => {
    n((u) => ({
      ...u,
      videoDeviceId: c
    }));
  }, []), a = l.useCallback((c) => {
    n((u) => ({
      ...u,
      username: c
    }));
  }, []);
  return l.useEffect(() => {
    Ya(t, e.preventSave ?? !1);
  }, [t, e.preventSave]), {
    userChoices: t,
    saveAudioInputEnabled: r,
    saveVideoInputEnabled: i,
    saveAudioInputDeviceId: o,
    saveVideoInputDeviceId: s,
    saveUsername: a
  };
}
function Uu(e, t = {}) {
  const n = Ie(e), r = oe(t.room);
  return j(l.useMemo(() => ha(r, n), [r, n]), n.isLocal ? n.isE2EEEnabled : !!n?.isEncrypted);
}
function $u(e, t = {
  fftSize: 32,
  smoothingTimeConstant: 0
}) {
  const n = ee(e) ? e.publication.track : e, [r, i] = l.useState(0);
  return l.useEffect(() => {
    if (!n || !n.mediaStream) return;
    const { cleanup: o, analyser: s } = tn(n, t), a = s.frequencyBinCount, c = new Uint8Array(a), f = setInterval(() => {
      s.getByteFrequencyData(c);
      let d = 0;
      for (let p = 0; p < c.length; p++) {
        const h = c[p];
        d += h * h;
      }
      i(Math.sqrt(d / c.length) / 255);
    }, 1e3 / 30);
    return () => {
      o(), clearInterval(f);
    };
  }, [
    n,
    n?.mediaStream,
    JSON.stringify(t)
  ]), r;
}
var bc = (e) => {
  const t = (n) => {
    let r = 1 - Math.max(-100, Math.min(-10, n)) * -1 / 100;
    return r = Math.sqrt(r), r;
  };
  return e.map((n) => n === -1 / 0 ? 0 : t(n));
}, yc = {
  bands: 5,
  loPass: 100,
  hiPass: 600,
  updateInterval: 32,
  analyserOptions: { fftSize: 2048 }
};
function Wu(e, t = {}) {
  const n = e instanceof O ? e : e?.publication?.track, r = {
    ...yc,
    ...t
  }, [i, o] = l.useState(new Array(r.bands).fill(0));
  return l.useEffect(() => {
    if (!n || !n?.mediaStream) {
      o((p) => p.slice().fill(0));
      return;
    }
    const { analyser: s, cleanup: a } = tn(n, r.analyserOptions), c = s.frequencyBinCount, u = new Float32Array(c), d = setInterval(() => {
      s.getFloatFrequencyData(u);
      let p = new Float32Array(u.length);
      for (let y = 0; y < u.length; y++) p[y] = u[y];
      p = p.slice(r.loPass, r.hiPass);
      const h = bc(p), m = h.length, S = [];
      for (let y = 0; y < r.bands; y++) {
        const b = Math.floor(y * m / r.bands), w = Math.floor((y + 1) * m / r.bands), P = h.slice(b, w), N = P.length;
        if (N === 0) S.push(0);
        else {
          const M = P.reduce((v, g) => v += g, 0);
          S.push(M / N);
        }
      }
      o(S);
    }, r.updateInterval);
    return () => {
      a(), clearInterval(d);
    };
  }, [
    n,
    n?.mediaStream,
    JSON.stringify(t)
  ]), i;
}
var wc = {
  barCount: 120,
  volMultiplier: 5,
  updateInterval: 20
};
function ju(e, t = {}) {
  const n = e instanceof O ? e : e?.publication?.track, r = {
    ...wc,
    ...t
  }, i = l.useRef(/* @__PURE__ */ new Float32Array()), o = l.useRef(performance.now()), s = l.useRef(0), [a, c] = l.useState([]), u = l.useCallback((f) => {
    c(Array.from(Ec(f, r.barCount).map((d) => Math.sqrt(d) * r.volMultiplier)));
  }, []);
  return l.useEffect(() => {
    if (!n || !n?.mediaStream) return;
    const { analyser: f, cleanup: d } = tn(n, { fftSize: Hn(r.barCount) }), p = Hn(r.barCount), h = new Float32Array(p), m = () => {
      if (S = requestAnimationFrame(m), f.getFloatTimeDomainData(h), i.current.map((y, b) => y + h[b]), s.current += 1, performance.now() - o.current >= r.updateInterval) {
        const y = h.map((b) => b / s.current);
        u(y), o.current = performance.now(), s.current = 0;
      }
    };
    let S = requestAnimationFrame(m);
    return () => {
      d(), cancelAnimationFrame(S);
    };
  }, [
    n,
    n?.mediaStream,
    JSON.stringify(t),
    u
  ]), { bars: a };
}
function Hn(e) {
  return e < 32 ? 32 : Sc(e);
}
function Sc(e) {
  let t = 2;
  for (; e >>= 1; ) t <<= 1;
  return t;
}
function Ec(e, t) {
  const n = Math.floor(e.length / t), r = new Float32Array(t);
  for (let i = 0; i < t; i++) {
    const o = n * i;
    let s = 0;
    for (let a = 0; a < n; a++) s = s + Math.abs(e[o + a]);
    r[i] = s / n;
  }
  return r;
}
function St(e, t = {}) {
  let n, r;
  typeof t == "string" ? n = t : (n = t?.participantIdentity, r = t?.room);
  const i = Ot(), o = dc({
    room: r,
    updateOnlyOn: []
  }), s = l.useMemo(() => n ? o.find((a) => a.identity === n) : i, [
    n,
    o,
    i
  ]);
  return j(l.useMemo(() => {
    if (s)
      return ja(s, { sources: e });
  }, [s, JSON.stringify(e)]), []);
}
function Cc(e) {
  return j(l.useMemo(() => e?.publication?.track ? Va(e?.publication.track) : void 0, [e?.publication?.track]), {
    timestamp: Date.now(),
    rtpTimestamp: e?.publication?.track?.rtpTimestamp
  });
}
var Tc = { bufferSize: 100 };
function xc(e, t) {
  const n = {
    ...Tc,
    ...t
  }, [r, i] = l.useState([]), o = Cc(e), s = (a) => {
    n.onTranscription?.(a), i((c) => Ks(c, a.map((u) => qs(u, o)), n.bufferSize));
  };
  return l.useEffect(() => {
    if (!e?.publication) return;
    const a = Ba(e.publication).subscribe((c) => {
      s(...c);
    });
    return () => {
      a.unsubscribe();
    };
  }, [e && G(e), s]), { segments: r };
}
function kc(e = {}) {
  const t = Ot(), n = e.participant ?? t;
  return j(l.useMemo(() => en(n), [n]), { attributes: n?.attributes });
}
function Bu(e, t = {}) {
  const n = Ie(t.participant), [r, i] = l.useState(n.attributes[e]);
  return l.useEffect(() => {
    if (!n) return;
    const o = en(n).subscribe((s) => {
      s.changed[e] !== void 0 && i(s.attributes[e]);
    });
    return () => {
      o.unsubscribe();
    };
  }, [n, e]), r;
}
var zn = ce.AgentState;
function Vu() {
  const e = vn(), t = e.find((f) => f.kind === ut.AGENT && !(ce.PublishOnBehalf in f.attributes)), n = e.find((f) => f.kind === ut.AGENT && f.attributes[ce.PublishOnBehalf] === t?.identity), r = St([O.Source.Microphone, O.Source.Camera], t?.identity), i = St([O.Source.Microphone, O.Source.Camera], n?.identity), o = r.find((f) => f.source === O.Source.Microphone) ?? i.find((f) => f.source === O.Source.Microphone), s = r.find((f) => f.source === O.Source.Camera) ?? i.find((f) => f.source === O.Source.Camera), { segments: a } = xc(o), c = tt(), { attributes: u } = kc({ participant: t });
  return {
    agent: t,
    state: l.useMemo(() => c === q.Disconnected ? "disconnected" : c === q.Connecting || !t || !u?.[zn] ? "connecting" : u[zn], [
      u,
      t,
      c
    ]),
    audioTrack: o,
    videoTrack: s,
    agentTranscriptions: a,
    agentAttributes: u
  };
}
function Hu(e) {
  const t = oe(e), n = tt(t);
  return j(l.useMemo(() => va(t), [t, n]), t.isRecording);
}
function Pc(e, t) {
  const n = oe(t?.room), r = tt(n) === q.Disconnected, i = l.useMemo(() => tc(n, e), [n, e]);
  return { textStreams: j(r ? void 0 : i, []) };
}
function ui(e) {
  const { participantIdentities: t, trackSids: n } = e ?? {}, { textStreams: r } = Pc(Hr.TRANSCRIPTION, { room: e?.room });
  return l.useMemo(() => r.filter((i) => t ? t.includes(i.participantInfo.identity) : !0).filter((i) => n ? n.includes(i.streamInfo.attributes?.[ce.TranscribedTrackId] ?? "") : !0), [
    r,
    t,
    n
  ]);
}
var Mc = ce.Expression, zu = 2, Ac = 150, Lc = 20;
function Oc(e, t, n) {
  return `${e.streamInfo.id ?? e.streamInfo.attributes?.[ce.TranscriptionSegmentId] ?? t}:${e.participantInfo.identity}:${n.mood ?? ""}:${n.expression ?? ""}`;
}
function qn(e) {
  const t = e.streamInfo.attributes?.[Mc];
  if (!t) return null;
  try {
    const n = JSON.parse(t), r = n.expression?.trim() || null;
    return !r && !n.mood ? null : {
      mood: n.mood ?? null,
      expression: r
    };
  } catch {
    return null;
  }
}
function qu(e) {
  const { ttlTurns: t = 2, ...n } = e ?? {}, r = ui(n), [i, o] = l.useState(null);
  return l.useEffect(() => {
    let s = 0;
    const a = setInterval(() => {
      o((c) => {
        let u = null;
        for (let f = r.length - 1; f >= 0; f--) {
          const d = qn(r[f]);
          if (d) {
            u = Oc(r[f], f, d);
            break;
          }
        }
        return u === c ? c : u;
      }), ++s >= Lc && clearInterval(a);
    }, Ac);
    return () => clearInterval(a);
  }, [r]), l.useMemo(() => {
    let s = null, a = null;
    const c = [];
    for (let f = r.length - 1; f >= 0; f--) {
      const d = r[f], p = qn(d);
      if (p) {
        s = p, a = d.participantInfo.identity;
        break;
      }
      c.push(d.participantInfo.identity);
    }
    if (!s) return {
      mood: null,
      expression: null
    };
    const u = c.filter((f) => f === a).length;
    return t > 0 && u >= t ? {
      mood: null,
      expression: null
    } : s;
  }, [
    r,
    i,
    t
  ]);
}
var Kn = 2, Gn = 400, Jn = 3, Yn = 1e3;
function Ku(e) {
  const t = Dt([]), n = hi(() => new bi(), []), r = Ke(async () => n.lock().then(async (f) => {
    for (; ; ) {
      const d = t.current.pop();
      if (!d) {
        f();
        break;
      }
      switch (d.type) {
        case "connect":
          await d.room.connect(...d.args).then(d.resolve).catch(d.reject);
          break;
        case "disconnect":
          await d.room.disconnect(...d.args).then(d.resolve).catch(d.reject);
          break;
      }
    }
  }), []), i = Dt([]), o = Ke((f) => {
    let d = 0;
    i.current = i.current.filter((p) => {
      const h = f.getTime() - p.getTime() < Yn;
      return h && (d += 1), h;
    }), d > Jn && R.warn(`useSequentialRoomConnectDisconnect: room changed reference rapidly (over ${Jn}x in ${Yn}ms). This is not recommended.`);
  }, []);
  pi(() => {
    t.current = [];
    const f = /* @__PURE__ */ new Date();
    i.current.push(f), o(f);
  }, [e, o]);
  const s = Dt([]), a = Ke((f) => {
    let d = 0;
    s.current = s.current.filter((p) => {
      const h = f.getTime() - p.getTime() < Gn;
      return h && (d += 1), h;
    }), d > Kn && R.warn(`useSequentialRoomConnectDisconnect: room connect / disconnect occurring in rapid sequence (over ${Kn}x in ${Gn}ms). This is not recommended and may be the sign of a bug like a useEffect dependency changing every render.`);
  }, []), c = Ke(async (...f) => new Promise((d, p) => {
    if (!e) throw new Error("Called connect(), but room was unset");
    const h = /* @__PURE__ */ new Date();
    a(h), t.current.push({
      type: "connect",
      room: e,
      args: f,
      resolve: d,
      reject: p
    }), s.current.push(h), r();
  }), [
    e,
    a,
    r
  ]), u = Ke(async (...f) => new Promise((d, p) => {
    if (!e) throw new Error("Called discconnect(), but room was unset");
    const h = /* @__PURE__ */ new Date();
    a(h), t.current.push({
      type: "disconnect",
      room: e,
      args: f,
      resolve: d,
      reject: p
    }), s.current.push(h), r();
  }), [
    e,
    a,
    r
  ]);
  return {
    connect: e ? c : null,
    disconnect: e ? u : null
  };
}
var _c = /* @__PURE__ */ Qn(((e, t) => {
  var n = typeof Reflect == "object" ? Reflect : null, r = n && typeof n.apply == "function" ? n.apply : function(g, E, x) {
    return Function.prototype.apply.call(g, E, x);
  }, i;
  n && typeof n.ownKeys == "function" ? i = n.ownKeys : Object.getOwnPropertySymbols ? i = function(g) {
    return Object.getOwnPropertyNames(g).concat(Object.getOwnPropertySymbols(g));
  } : i = function(g) {
    return Object.getOwnPropertyNames(g);
  };
  function o(v) {
    console && console.warn && console.warn(v);
  }
  var s = Number.isNaN || function(g) {
    return g !== g;
  };
  function a() {
    a.init.call(this);
  }
  t.exports = a, t.exports.once = P, a.EventEmitter = a, a.prototype._events = void 0, a.prototype._eventsCount = 0, a.prototype._maxListeners = void 0;
  var c = 10;
  function u(v) {
    if (typeof v != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof v);
  }
  Object.defineProperty(a, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return c;
    },
    set: function(v) {
      if (typeof v != "number" || v < 0 || s(v)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + v + ".");
      c = v;
    }
  }), a.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, a.prototype.setMaxListeners = function(g) {
    if (typeof g != "number" || g < 0 || s(g)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + g + ".");
    return this._maxListeners = g, this;
  };
  function f(v) {
    return v._maxListeners === void 0 ? a.defaultMaxListeners : v._maxListeners;
  }
  a.prototype.getMaxListeners = function() {
    return f(this);
  }, a.prototype.emit = function(g) {
    for (var E = [], x = 1; x < arguments.length; x++) E.push(arguments[x]);
    var C = g === "error", I = this._events;
    if (I !== void 0) C = C && I.error === void 0;
    else if (!C) return !1;
    if (C) {
      var T;
      if (E.length > 0 && (T = E[0]), T instanceof Error) throw T;
      var A = /* @__PURE__ */ new Error("Unhandled error." + (T ? " (" + T.message + ")" : ""));
      throw A.context = T, A;
    }
    var D = I[g];
    if (D === void 0) return !1;
    if (typeof D == "function") r(D, this, E);
    else
      for (var U = D.length, H = y(D, U), x = 0; x < U; ++x) r(H[x], this, E);
    return !0;
  };
  function d(v, g, E, x) {
    var C, I, T;
    if (u(E), I = v._events, I === void 0 ? (I = v._events = /* @__PURE__ */ Object.create(null), v._eventsCount = 0) : (I.newListener !== void 0 && (v.emit("newListener", g, E.listener ? E.listener : E), I = v._events), T = I[g]), T === void 0)
      T = I[g] = E, ++v._eventsCount;
    else if (typeof T == "function" ? T = I[g] = x ? [E, T] : [T, E] : x ? T.unshift(E) : T.push(E), C = f(v), C > 0 && T.length > C && !T.warned) {
      T.warned = !0;
      var A = /* @__PURE__ */ new Error("Possible EventEmitter memory leak detected. " + T.length + " " + String(g) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      A.name = "MaxListenersExceededWarning", A.emitter = v, A.type = g, A.count = T.length, o(A);
    }
    return v;
  }
  a.prototype.addListener = function(g, E) {
    return d(this, g, E, !1);
  }, a.prototype.on = a.prototype.addListener, a.prototype.prependListener = function(g, E) {
    return d(this, g, E, !0);
  };
  function p() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function h(v, g, E) {
    var x = {
      fired: !1,
      wrapFn: void 0,
      target: v,
      type: g,
      listener: E
    }, C = p.bind(x);
    return C.listener = E, x.wrapFn = C, C;
  }
  a.prototype.once = function(g, E) {
    return u(E), this.on(g, h(this, g, E)), this;
  }, a.prototype.prependOnceListener = function(g, E) {
    return u(E), this.prependListener(g, h(this, g, E)), this;
  }, a.prototype.removeListener = function(g, E) {
    var x, C, I, T, A;
    if (u(E), C = this._events, C === void 0) return this;
    if (x = C[g], x === void 0) return this;
    if (x === E || x.listener === E) --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete C[g], C.removeListener && this.emit("removeListener", g, x.listener || E));
    else if (typeof x != "function") {
      for (I = -1, T = x.length - 1; T >= 0; T--) if (x[T] === E || x[T].listener === E) {
        A = x[T].listener, I = T;
        break;
      }
      if (I < 0) return this;
      I === 0 ? x.shift() : b(x, I), x.length === 1 && (C[g] = x[0]), C.removeListener !== void 0 && this.emit("removeListener", g, A || E);
    }
    return this;
  }, a.prototype.off = a.prototype.removeListener, a.prototype.removeAllListeners = function(g) {
    var E, x = this._events, C;
    if (x === void 0) return this;
    if (x.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : x[g] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete x[g]), this;
    if (arguments.length === 0) {
      var I = Object.keys(x), T;
      for (C = 0; C < I.length; ++C)
        T = I[C], T !== "removeListener" && this.removeAllListeners(T);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (E = x[g], typeof E == "function") this.removeListener(g, E);
    else if (E !== void 0) for (C = E.length - 1; C >= 0; C--) this.removeListener(g, E[C]);
    return this;
  };
  function m(v, g, E) {
    var x = v._events;
    if (x === void 0) return [];
    var C = x[g];
    return C === void 0 ? [] : typeof C == "function" ? E ? [C.listener || C] : [C] : E ? w(C) : y(C, C.length);
  }
  a.prototype.listeners = function(g) {
    return m(this, g, !0);
  }, a.prototype.rawListeners = function(g) {
    return m(this, g, !1);
  }, a.listenerCount = function(v, g) {
    return typeof v.listenerCount == "function" ? v.listenerCount(g) : S.call(v, g);
  }, a.prototype.listenerCount = S;
  function S(v) {
    var g = this._events;
    if (g !== void 0) {
      var E = g[v];
      if (typeof E == "function") return 1;
      if (E !== void 0) return E.length;
    }
    return 0;
  }
  a.prototype.eventNames = function() {
    return this._eventsCount > 0 ? i(this._events) : [];
  };
  function y(v, g) {
    for (var E = new Array(g), x = 0; x < g; ++x) E[x] = v[x];
    return E;
  }
  function b(v, g) {
    for (; g + 1 < v.length; g++) v[g] = v[g + 1];
    v.pop();
  }
  function w(v) {
    for (var g = new Array(v.length), E = 0; E < g.length; ++E) g[E] = v[E].listener || v[E];
    return g;
  }
  function P(v, g) {
    return new Promise(function(E, x) {
      function C(T) {
        v.removeListener(g, I), x(T);
      }
      function I() {
        typeof v.removeListener == "function" && v.removeListener("error", C), E([].slice.call(arguments));
      }
      M(v, g, I, { once: !0 }), g !== "error" && N(v, C, { once: !0 });
    });
  }
  function N(v, g, E) {
    typeof v.on == "function" && M(v, "error", g, E);
  }
  function M(v, g, E, x) {
    if (typeof v.on == "function") x.once ? v.once(g, E) : v.on(g, E);
    else if (typeof v.addEventListener == "function") v.addEventListener(g, function C(I) {
      x.once && v.removeEventListener(g, C), E(I);
    });
    else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof v);
  }
})), mn = _c(), Ic = 2e4, Gu = /* @__PURE__ */ (function(e) {
  return e.CameraChanged = "cameraChanged", e.MicrophoneChanged = "microphoneChanged", e.StateChanged = "stateChanged", e;
})({}), re = (e) => ({
  isConnected: e === "listening" || e === "thinking" || e === "speaking",
  canListen: e === "pre-connect-buffering" || e === "listening" || e === "thinking" || e === "speaking",
  isFinished: e === "disconnected" || e === "failed",
  isPending: e === "connecting" || e === "initializing" || e === "idle"
}), Rc = () => {
  const [e, t] = l.useState(null), [n, r] = l.useState(null), i = l.useRef("connecting"), o = l.useRef(!1), s = (a) => setTimeout(() => {
    if (!o.current) {
      t("Agent did not join the room.");
      return;
    }
    const { isConnected: c } = re(i.current);
    if (!c) {
      t("Agent joined the room but did not complete initializing.");
      return;
    }
  }, a ?? Ic);
  return {
    agentTimeoutFailureReason: e,
    startAgentTimeout: l.useCallback((a) => {
      n && clearTimeout(n), t(null), r(s(a)), i.current = "connecting", o.current = !1;
    }, [n]),
    clearAgentTimeout: l.useCallback(() => {
      n && clearTimeout(n), t(null), r(null), i.current = "connecting", o.current = !1;
    }, [n]),
    clearAgentTimeoutFailureReason: l.useCallback(() => {
      t(null);
    }, []),
    updateAgentTimeoutState: l.useCallback((a) => {
      i.current = a;
    }, []),
    updateAgentTimeoutParticipantExists: l.useCallback((a) => {
      o.current = a;
    }, [])
  };
};
function Dc(e, t) {
  const n = l.useRef(t);
  return l.useEffect(() => {
    n.current = t;
  }, [t]), {
    waitUntilConnected: l.useCallback(async (r) => {
      const { isConnected: i } = re(n.current);
      if (!i)
        return new Promise((o, s) => {
          const a = (f) => {
            const { isConnected: d } = re(f);
            d && (u(), o());
          }, c = () => {
            u(), s(/* @__PURE__ */ new Error("useAgent(/* ... */).waitUntilConnected - signal aborted"));
          }, u = () => {
            e.off("stateChanged", a), r?.removeEventListener("abort", c);
          };
          e.on("stateChanged", a), r?.addEventListener("abort", c);
        });
    }, [e]),
    waitUntilCouldBeListening: l.useCallback(async (r) => {
      const { canListen: i } = re(n.current);
      if (!i)
        return new Promise((o, s) => {
          const a = (f) => {
            const { canListen: d } = re(f);
            d && (u(), o());
          }, c = () => {
            u(), s(/* @__PURE__ */ new Error("useAgent(/* ... */).waitUntilCouldBeListening - signal aborted"));
          }, u = () => {
            e.off("stateChanged", a), r?.removeEventListener("abort", c);
          };
          e.on("stateChanged", a), r?.addEventListener("abort", c);
        });
    }, [e]),
    waitUntilFinished: l.useCallback(async (r) => {
      const { isFinished: i } = re(n.current);
      if (!i)
        return new Promise((o, s) => {
          const a = (f) => {
            const { isFinished: d } = re(f);
            d && (u(), o());
          }, c = () => {
            u(), s(/* @__PURE__ */ new Error("useAgent(/* ... */).waitUntilFinished - signal aborted"));
          }, u = () => {
            e.off("stateChanged", a), r?.removeEventListener("abort", c);
          };
          e.on("stateChanged", a), r?.addEventListener("abort", c);
        });
    }, [e])
  };
}
function li(e) {
  const t = ri();
  if (e = e ?? t, !e) throw new Error("No session provided, make sure you are inside a Session context or pass the session explicitly");
  const { room: n, internal: { agentConnectTimeoutMilliseconds: r, agentTimeoutFailureReason: i, startAgentTimeout: o, clearAgentTimeout: s, clearAgentTimeoutFailureReason: a, updateAgentTimeoutState: c, updateAgentTimeoutParticipantExists: u } } = e, f = l.useMemo(() => new mn.EventEmitter(), []), d = vn({ room: n }), p = l.useMemo(() => d.find((L) => L.kind === ut.AGENT && !(ce.PublishOnBehalf in L.attributes)) ?? null, [d]), h = l.useMemo(() => p ? d.find((L) => L.kind === ut.AGENT && L.attributes[ce.PublishOnBehalf] === p.identity) ?? null : null, [p, d]), m = p?.attributes ?? {}, S = St([O.Source.Camera, O.Source.Microphone], {
    room: n,
    participantIdentity: p?.identity
  }), y = St([O.Source.Camera, O.Source.Microphone], {
    room: n,
    participantIdentity: h?.identity
  }), b = l.useMemo(() => S.find((L) => L.source === O.Source.Camera) ?? y.find((L) => L.source === O.Source.Camera), [S, y]);
  l.useEffect(() => {
    f.emit("cameraChanged", b);
  }, [f, b]);
  const w = l.useMemo(() => S.find((L) => L.source === O.Source.Microphone) ?? y.find((L) => L.source === O.Source.Microphone), [S, y]);
  l.useEffect(() => {
    f.emit("microphoneChanged", w);
  }, [f, w]);
  const [P, N] = l.useState(n.state);
  l.useEffect(() => {
    const L = (X) => {
      N(X);
    };
    return n.on(k.ConnectionStateChanged, L), () => {
      n.off(k.ConnectionStateChanged, L);
    };
  }, [n]), l.useEffect(() => {
    p && a();
  }, [p]);
  const [M, v] = l.useState(null);
  l.useEffect(() => {
    if (!p) return;
    const L = (X) => {
      X.identity === p?.identity && v("Agent left the room unexpectedly.");
    };
    return n.on(k.ParticipantDisconnected, L), () => {
      n.off(k.ParticipantDisconnected, L);
    };
  }, [p, n]), l.useEffect(() => {
    P === q.Disconnected && v(null);
  }, [P]);
  const [g, E] = l.useState(() => n.localParticipant.getTrackPublication(O.Source.Microphone) ?? null);
  l.useEffect(() => {
    const L = () => {
      E(n.localParticipant.getTrackPublication(O.Source.Microphone) ?? null);
    }, X = () => {
      E(null);
    };
    return n.localParticipant.on(_.LocalTrackPublished, L), n.localParticipant.on(_.LocalTrackUnpublished, X), () => {
      n.localParticipant.off(_.LocalTrackPublished, L), n.localParticipant.off(_.LocalTrackUnpublished, X);
    };
  }, [n.localParticipant]);
  const x = l.useMemo(() => {
    const L = [];
    return i && L.push(i), M && L.push(M), L;
  }, [i, M]), C = l.useMemo(() => {
    if (x.length > 0) return "failed";
    let L = "disconnected";
    return P !== q.Disconnected && (L = "connecting"), g && (L = "pre-connect-buffering"), p && m[ce.AgentState] && (L = m[ce.AgentState]), L;
  }, [
    x,
    P,
    g,
    p,
    m
  ]);
  l.useEffect(() => {
    f.emit("stateChanged", C), c(C);
  }, [f, C]), l.useEffect(() => {
    u(p !== null);
  }, [p]);
  const I = e.connectionState === "disconnected";
  l.useEffect(() => {
    if (!I)
      return o(r), () => {
        s();
      };
  }, [I, r]);
  const { identity: T, name: A, metadata: D } = fc({ participant: p ?? void 0 }), U = l.useMemo(() => {
    const L = {
      attributes: m,
      internal: {
        agentParticipant: p,
        workerParticipant: h,
        emitter: f
      }
    };
    switch (C) {
      case "disconnected":
        return {
          ...L,
          identity: void 0,
          name: void 0,
          metadata: void 0,
          state: C,
          ...re(C),
          failureReasons: null,
          cameraTrack: void 0,
          microphoneTrack: void 0
        };
      case "connecting":
        return {
          ...L,
          identity: void 0,
          name: void 0,
          metadata: void 0,
          state: C,
          ...re(C),
          failureReasons: null,
          cameraTrack: void 0,
          microphoneTrack: void 0
        };
      case "initializing":
      case "idle":
        return {
          ...L,
          identity: T,
          name: A,
          metadata: D,
          state: C,
          ...re(C),
          failureReasons: null,
          cameraTrack: b,
          microphoneTrack: w
        };
      case "pre-connect-buffering":
        return {
          ...L,
          identity: T,
          name: A,
          metadata: D,
          state: C,
          ...re(C),
          failureReasons: null,
          cameraTrack: b,
          microphoneTrack: w
        };
      case "listening":
      case "thinking":
      case "speaking":
        return {
          ...L,
          identity: T,
          name: A,
          metadata: D,
          state: C,
          ...re(C),
          failureReasons: null,
          cameraTrack: b,
          microphoneTrack: w
        };
      case "failed":
        return {
          ...L,
          identity: void 0,
          name: void 0,
          metadata: void 0,
          state: "failed",
          ...re("failed"),
          failureReasons: x,
          cameraTrack: void 0,
          microphoneTrack: void 0
        };
    }
  }, [
    T,
    A,
    D,
    m,
    f,
    p,
    C,
    b,
    w
  ]), { waitUntilConnected: H, waitUntilCouldBeListening: z, waitUntilFinished: V } = Dc(f, C), Q = l.useCallback((L) => new Promise((X, Re) => {
    const Se = (K) => {
      K && (F(), X(K));
    }, he = () => {
      F(), Re(/* @__PURE__ */ new Error("useAgent(/* ... */).waitUntilCamera - signal aborted"));
    }, F = () => {
      f.off("cameraChanged", Se), L?.removeEventListener("abort", he);
    };
    f.on("cameraChanged", Se), L?.addEventListener("abort", he);
  }), [f]), xe = l.useCallback((L) => new Promise((X, Re) => {
    const Se = (K) => {
      K && (F(), X(K));
    }, he = () => {
      F(), Re(/* @__PURE__ */ new Error("useAgent(/* ... */).waitUntilMicrophone - signal aborted"));
    }, F = () => {
      f.off("microphoneChanged", Se), L?.removeEventListener("abort", he);
    };
    f.on("microphoneChanged", Se), L?.addEventListener("abort", he);
  }), [f]);
  return l.useMemo(() => ({
    ...U,
    waitUntilConnected: H,
    waitUntilCouldBeListening: z,
    waitUntilFinished: V,
    waitUntilCamera: Q,
    waitUntilMicrophone: xe
  }), [
    U,
    H,
    z,
    V,
    Q,
    xe
  ]);
}
var Ju = /* @__PURE__ */ (function(e) {
  return e.ConnectionStateChanged = "connectionStateChanged", e.MediaDevicesError = "mediaDevicesError", e.EncryptionError = "encryptionError", e;
})({});
function Nc(e) {
  return typeof e == "object" && e !== null && "room" in e && "connectionState" in e && "internal" in e;
}
function Fc(e, t) {
  const n = /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)]);
  for (const r of n) switch (r) {
    case "roomName":
    case "participantName":
    case "participantIdentity":
    case "participantMetadata":
    case "participantAttributes":
    case "agentName":
    case "agentMetadata":
    case "deployment":
      if (e[r] !== t[r]) return !1;
      break;
    default:
      throw new Error(`Options key ${r} not being checked for equality!`);
  }
  return !0;
}
function Uc(e, t) {
  const n = l.useRef(t);
  return l.useEffect(() => {
    n.current = t;
  }, [t]), l.useCallback(async (r, i) => {
    if (n.current !== r)
      return new Promise((o, s) => {
        const a = (f) => {
          f === r && (u(), o());
        }, c = () => {
          u(), s(/* @__PURE__ */ new Error(`useSession(/* ... */).waitUntilConnectionState(${r}, /* signal */) - signal aborted`));
        }, u = () => {
          e.off("connectionStateChanged", a), i?.removeEventListener("abort", c);
        };
        e.on("connectionStateChanged", a), i?.addEventListener("abort", c);
      });
  }, [e]);
}
function $c(e, t) {
  const n = e instanceof yi, r = l.useRef(n ? t : null);
  return l.useEffect(() => {
    if (!n) {
      r.current = null;
      return;
    }
    r.current !== null && Fc(r.current, t) || (r.current = t);
  }, [n, t]), l.useCallback(async (i) => {
    if (n) {
      if (!r.current) throw new Error("AgentSession - memoized token fetch options are not set, but the passed tokenSource was an instance of TokenSourceConfigurable. If you are seeing this please make a new GitHub issue!");
      return e.fetch(r.current, i);
    } else return e.fetch();
  }, [n, e]);
}
function Yu(e, t = {}) {
  const { room: n, agentConnectTimeoutMilliseconds: r, encryption: i, ...o } = t, s = i && "e2eeManager" in i ? i.e2eeManager : null, a = i && !("e2eeManager" in i) ? i.key ?? null : null, c = i && !("e2eeManager" in i) ? i.worker ?? null : null, u = It(), f = l.useRef(null), d = l.useMemo(() => typeof a == "string" || a instanceof ArrayBuffer ? (f.current === null && (f.current = new vi()), f.current.setKey(a).catch((F) => R.error(F)), f.current) : a, [a]), p = l.useMemo(() => {
    const F = u ?? n;
    if (F) return F;
    const K = !!(d && c), ve = !!s, Rt = K || ve, De = {};
    K ? De.encryption = {
      keyProvider: d,
      worker: c
    } : ve ? De.encryption = { e2eeManager: s } : i !== void 0 && R.warn("useSession options encryption was set, but neither encryption.key with encryption.worker nor encryption.e2eeManager was provided.");
    const nt = new Je(De);
    return Rt && nt.setE2EEEnabled(!0), nt;
  }, [
    u,
    n,
    d,
    c,
    s
  ]);
  l.useEffect(() => () => {
    p.disconnect();
  }, [p]);
  const h = l.useMemo(() => new mn.EventEmitter(), []), m = l.useCallback((F) => ({ isConnected: F === q.Connected || F === q.Reconnecting || F === q.SignalReconnecting }), []), [S, y] = l.useState(p.state);
  l.useEffect(() => {
    const F = (K) => {
      y(K);
    };
    return p.on(k.ConnectionStateChanged, F), () => {
      p.off(k.ConnectionStateChanged, F);
    };
  }, [p]), l.useEffect(() => {
    const F = async (K) => {
      h.emit("mediaDevicesError", K);
    };
    return p.on(k.MediaDevicesError, F), () => {
      p.off(k.MediaDevicesError, F);
    };
  }, [p, h]), l.useEffect(() => {
    const F = async (K) => {
      h.emit("encryptionError", K);
    };
    return p.on(k.EncryptionError, F), () => {
      p.off(k.EncryptionError, F);
    };
  }, [p, h]);
  const { localParticipant: b } = ci({ room: p }), w = b.getTrackPublication(O.Source.Camera), P = l.useMemo(() => {
    if (w)
      return {
        source: O.Source.Camera,
        participant: b,
        publication: w
      };
  }, [b, w]), N = b.getTrackPublication(O.Source.Microphone), M = l.useMemo(() => {
    if (N)
      return {
        source: O.Source.Microphone,
        participant: b,
        publication: N
      };
  }, [b, N]), v = b.getTrackPublication(O.Source.ScreenShare), g = l.useMemo(() => {
    if (v)
      return {
        source: O.Source.ScreenShare,
        participant: b,
        publication: v
      };
  }, [b, v]), { agentTimeoutFailureReason: E, startAgentTimeout: x, clearAgentTimeout: C, clearAgentTimeoutFailureReason: I, updateAgentTimeoutState: T, updateAgentTimeoutParticipantExists: A } = Rc(), D = l.useMemo(() => ({
    emitter: h,
    tokenSource: e,
    agentConnectTimeoutMilliseconds: r,
    agentTimeoutFailureReason: E,
    startAgentTimeout: x,
    clearAgentTimeout: C,
    clearAgentTimeoutFailureReason: I,
    updateAgentTimeoutState: T,
    updateAgentTimeoutParticipantExists: A
  }), [
    h,
    r,
    e,
    E,
    x,
    C,
    I,
    T,
    A
  ]), U = l.useMemo(() => {
    const F = {
      room: p,
      internal: D
    };
    switch (S) {
      case q.Connecting:
        return {
          ...F,
          connectionState: q.Connecting,
          ...m(q.Connecting),
          local: {
            cameraTrack: void 0,
            microphoneTrack: void 0,
            screenShareTrack: void 0
          }
        };
      case q.Connected:
      case q.Reconnecting:
      case q.SignalReconnecting:
        return {
          ...F,
          connectionState: S,
          ...m(S),
          local: {
            cameraTrack: P,
            microphoneTrack: M,
            screenShareTrack: g
          }
        };
      case q.Disconnected:
        return {
          ...F,
          connectionState: q.Disconnected,
          ...m(q.Disconnected),
          local: {
            cameraTrack: void 0,
            microphoneTrack: void 0,
            screenShareTrack: void 0
          }
        };
    }
  }, [
    D,
    p,
    S,
    P,
    M,
    m
  ]);
  l.useEffect(() => {
    h.emit("connectionStateChanged", U.connectionState);
  }, [h, U.connectionState]);
  const H = Uc(h, U.connectionState), z = l.useCallback(async (F) => H(q.Connected, F), [H]), V = l.useCallback(async (F) => H(q.Disconnected, F), [H]), Q = l.useCallback(async (F) => p.setE2EEEnabled(F), [p]), xe = li(l.useMemo(() => ({
    connectionState: U.connectionState,
    room: p,
    internal: D
  }), [
    U,
    p,
    D
  ])), L = $c(e, o), X = l.useRef(!1), Re = l.useCallback(async (F = {}) => {
    const { signal: K, tracks: ve = { microphone: {
      enabled: !0,
      publishOptions: { preConnectBuffer: !0 }
    } }, roomConnectOptions: Rt } = F;
    await V(K), X.current = !1;
    const De = () => {
      p.disconnect();
    };
    K?.addEventListener("abort", De);
    const nt = () => {
      X.current || L(!0);
    };
    p.once(k.Disconnected, nt);
    let gn = !1;
    await Promise.all([
      L().then(({ serverUrl: fi, participantToken: bn }) => (gn = (Si(bn).roomConfig?.agents?.length ?? 0) > 0, p.connect(fi, bn, Rt))),
      ve.microphone?.enabled ? p.localParticipant.setMicrophoneEnabled(!0, void 0, ve.microphone?.publishOptions ?? {}) : Promise.resolve(),
      ve.camera?.enabled ? p.localParticipant.setCameraEnabled(!0, void 0, ve.camera?.publishOptions ?? {}) : Promise.resolve(),
      ve.screenShare?.enabled ? p.localParticipant.setScreenShareEnabled(!0, void 0, ve.screenShare?.publishOptions ?? {}) : Promise.resolve()
    ]), await z(K), gn && await xe.waitUntilConnected(K), K?.removeEventListener("abort", De);
  }, [
    p,
    V,
    L,
    z,
    xe.waitUntilConnected
  ]), Se = l.useCallback(async () => {
    X.current = !0, L(!0), await p.disconnect();
  }, [p, L]), he = l.useCallback(async () => {
    const F = await L();
    await p.prepareConnection(F.serverUrl, F.participantToken);
  }, [L, p]);
  return l.useEffect(() => {
    he().catch((F) => {
      console.warn("WARNING: Room.prepareConnection failed:", F);
    });
  }, []), l.useMemo(() => ({
    ...U,
    waitUntilConnected: z,
    waitUntilDisconnected: V,
    prepareConnection: he,
    start: Re,
    end: Se,
    setEncryptionEnabled: Q
  }), [
    U,
    z,
    V,
    he,
    Re,
    Se,
    Q
  ]);
}
function Qu(e, t, n, r) {
  const i = l.useMemo(() => () => {
  }, []), o = l.useCallback(n ?? i, r ?? []), s = r ? o : n, a = l.useMemo(() => e ? "internal" in e ? e.internal.emitter : e : null, [e]);
  l.useEffect(() => {
    if (!(!a || !s))
      return a.on(t, s), () => {
        a.off(t, s);
      };
  }, [
    a,
    t,
    s
  ]);
}
var Xu = /* @__PURE__ */ (function(e) {
  return e.MessageReceived = "messageReceived", e;
})({});
function Zu(e) {
  const { room: t } = ii(e), n = l.useMemo(() => new mn.EventEmitter(), []), r = li(e), i = ui({ room: t }), o = gc(l.useMemo(() => ({ room: t }), [t])), s = l.useMemo(() => i.map((d) => {
    switch (d.participantInfo.identity) {
      case t.localParticipant.identity:
        return {
          type: "userTranscript",
          message: d.text,
          id: d.streamInfo.id,
          timestamp: d.streamInfo.timestamp,
          attributes: d.streamInfo.attributes,
          from: t.localParticipant
        };
      case r.internal.agentParticipant?.identity:
      case r.internal.workerParticipant?.identity:
        return {
          type: "agentTranscript",
          message: d.text,
          id: d.streamInfo.id,
          timestamp: d.streamInfo.timestamp,
          attributes: d.streamInfo.attributes,
          from: r.internal.agentParticipant?.identity === d.participantInfo.identity ? r.internal.agentParticipant : r.internal.workerParticipant
        };
      default:
        return {
          type: "agentTranscript",
          message: d.text,
          id: d.streamInfo.id,
          timestamp: d.streamInfo.timestamp,
          attributes: d.streamInfo.attributes,
          from: Array.from(t.remoteParticipants.values()).find((p) => p.identity === d.participantInfo.identity)
        };
    }
  }), [i, t]), a = l.useMemo(() => [...s, ...o.chatMessages], [s, o.chatMessages]), c = l.useRef(/* @__PURE__ */ new Map()), u = l.useMemo(() => {
    const d = /* @__PURE__ */ new Date();
    for (const p of a)
      c.current.has(p.id) || c.current.set(p.id, d);
    return a.sort((p, h) => {
      const m = c.current.get(p.id), S = c.current.get(h.id);
      return typeof m > "u" || typeof S > "u" ? 0 : m.getTime() - S.getTime();
    });
  }, [a]), f = l.useRef(/* @__PURE__ */ new Set());
  return l.useEffect(() => {
    for (const d of u)
      f.current.has(d.id) || (f.current.add(d.id), n.emit("messageReceived", d));
  }, [u]), l.useMemo(() => ({
    messages: u,
    send: o.send,
    isSending: o.isSending,
    internal: { emitter: n }
  }), [
    u,
    o.send,
    o.isSending
  ]);
}
function el(e, t, n, r) {
  let i, o, s, a;
  Nc(e) ? (i = e, o = t, s = n, a = r) : (o = e, s = t, a = n);
  const { room: c } = ii(i), u = l.useRef(s);
  u.current = s;
  const f = l.useRef(a);
  f.current = a, l.useEffect(() => {
    if (o)
      return c.registerRpcMethod(o, async (p) => {
        const h = f.current?.fromIdentity;
        if (h && p.callerIdentity !== h) throw Ne.builtIn("UNSUPPORTED_METHOD", `Method not available for caller ${p.callerIdentity}`);
        const m = u.current;
        if (!m) throw Ne.builtIn("APPLICATION_ERROR", `No handler registered for method "${o}"`);
        const S = f.current?.serializer ?? wn.json();
        let y;
        try {
          y = S.parse(p.payload);
        } catch (w) {
          throw Ne.builtIn("APPLICATION_ERROR", `Failed to parse RPC payload: ${w}`);
        }
        const b = await m(y, p);
        try {
          return S.serialize(b);
        } catch (w) {
          throw Ne.builtIn("APPLICATION_ERROR", `Failed to serialize RPC response: ${w}`);
        }
      }), () => {
        c.unregisterRpcMethod(o);
      };
  }, [c, o]);
  const d = l.useCallback(async (p, h = wn.json()) => {
    if (Ti(h)) {
      let m;
      try {
        m = h.serialize(p.payload);
      } catch (y) {
        throw Ne.builtIn("APPLICATION_ERROR", `Failed to serialize RPC payload: ${y}`);
      }
      const S = await c.localParticipant.performRpc({
        destinationIdentity: p.destinationIdentity,
        method: p.method,
        payload: m,
        responseTimeout: p.responseTimeout
      });
      try {
        return h.parse(S);
      } catch (y) {
        throw Ne.builtIn("APPLICATION_ERROR", `Failed to parse RPC response: ${y}`);
      }
    } else return c.localParticipant.performRpc(p);
  }, [c]);
  return l.useMemo(() => ({ perform: d }), [d]);
}
var tl = /* @__PURE__ */ l.forwardRef(function(t, n) {
  const { room: r, htmlProps: i } = uc(t);
  return /* @__PURE__ */ l.createElement("div", {
    ref: n,
    ...i
  }, r && /* @__PURE__ */ l.createElement(hn.Provider, { value: r }, /* @__PURE__ */ l.createElement(oi.Provider, { value: t.featureFlags }, t.children)));
});
export {
  bu as $,
  Xc as $t,
  Nu as A,
  Ot as At,
  pc as B,
  Qr as Bt,
  St as C,
  su as Ct,
  Uu as D,
  _t as Dt,
  $u as E,
  It as Et,
  Ou as F,
  iu as Ft,
  vn as G,
  zc as Gt,
  xu as H,
  Kc as Ht,
  Lu as I,
  Yr as It,
  fc as J,
  Hc as Jt,
  Cu as K,
  Zt as Kt,
  Au as L,
  nu as Lt,
  Ru as M,
  Zr as Mt,
  Iu as N,
  pn as Nt,
  Fu as O,
  ti as Ot,
  _u as P,
  ei as Pt,
  yu as Q,
  R as Qt,
  Mu as R,
  ru as Rt,
  xc as S,
  ri as St,
  Wu as T,
  oe as Tt,
  Tu as U,
  Jc as Ut,
  ku as V,
  Xr as Vt,
  dc as W,
  tu as Wt,
  lc as X,
  Fs as Xt,
  Su as Y,
  ee as Yt,
  wu as Z,
  qc as Zt,
  Pc as _,
  cu as _t,
  Qu as a,
  Gc as an,
  gu as at,
  Bu as b,
  ni as bt,
  Yu as c,
  hu as ct,
  Ku as d,
  du as dt,
  Qc as en,
  ci as et,
  zu as f,
  fu as ft,
  ui as g,
  pe as gt,
  qu as h,
  uu as ht,
  Zu as i,
  Yc as in,
  ac as it,
  Du as j,
  ou as jt,
  gc as k,
  Ie as kt,
  Gu as l,
  pu as lt,
  qn as m,
  lu as mt,
  el as n,
  eu as nn,
  mu as nt,
  Ju as o,
  j as on,
  oc as ot,
  Mc as p,
  tt as pt,
  Eu as q,
  G as qt,
  Xu as r,
  Zc as rn,
  vu as rt,
  Nc as s,
  Oi as sn,
  Vn as st,
  tl as t,
  aa as tn,
  uc as tt,
  li as u,
  ic as ut,
  Hu as v,
  oi as vt,
  ju as w,
  hn as wt,
  kc as x,
  ii as xt,
  Vu as y,
  au as yt,
  Pu as z,
  nc as zt
};

//# sourceMappingURL=room-Bfb4OWAI.mjs.map