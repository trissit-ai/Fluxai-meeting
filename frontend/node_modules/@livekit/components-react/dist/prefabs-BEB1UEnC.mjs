import { n as je, t as qe } from "./rolldown-runtime-9ZSF5uba.mjs";
import { $ as Ce, At as We, Bt as Qe, D as Ge, Dt as Ke, Et as Je, F as Ze, Gt as Xe, Ht as Ye, I as et, It as Me, Jt as tt, K as ye, Kt as at, L as nt, Lt as rt, M as ct, Mt as se, N as lt, Nt as ee, O as oe, Ot as it, Pt as ue, Q as st, Qt as P, R as ot, Rt as ut, T as dt, U as mt, Ut as ft, Vt as de, Wt as ht, X as vt, Xt as gt, Y as pt, Yt as $, Z as Et, Zt as kt, an as bt, at as St, ct as wt, dt as Ct, et as Mt, gt as yt, in as Rt, it as It, j as me, k as Tt, kt as Pt, lt as At, mt as Nt, nn as xt, nt as fe, on as Lt, pt as Dt, qt as Re, rn as Vt, rt as z, sn as zt, tn as Ft, yt as Ot } from "./room-Bfb4OWAI.mjs";
import * as e from "react";
import { useEffect as q, useMemo as _t, useRef as W, useState as J } from "react";
import { ConnectionQuality as ne, ConnectionState as re, Mutex as $t, RemoteAudioTrack as Bt, RemoteTrackPublication as Y, RoomEvent as Ie, Track as S, VideoPresets as Ht, createLocalAudioTrack as Ut, createLocalTracks as jt, createLocalVideoTrack as qt, facingModeFromLocalTrack as Wt } from "livekit-client";
function Qt(t) {
  const a = (i) => typeof window < "u" ? window.matchMedia(i).matches : !1, [n, c] = e.useState(a(t));
  function r() {
    c(a(t));
  }
  return e.useEffect(() => {
    const i = window.matchMedia(t);
    return r(), i.addListener ? i.addListener(r) : i.addEventListener("change", r), () => {
      i.removeListener ? i.removeListener(r) : i.removeEventListener("change", r);
    };
  }, [t]), n;
}
var Te = /* @__PURE__ */ e.forwardRef(function(a, n) {
  const { mergedProps: c } = Ze({ props: a });
  return /* @__PURE__ */ e.createElement("button", {
    ref: n,
    ...c
  }, a.children);
}), Pe = /* @__PURE__ */ e.forwardRef(function(a, n) {
  const { buttonProps: c } = Ct(a);
  return /* @__PURE__ */ e.createElement("button", {
    ref: n,
    ...c
  }, a.children);
}), Gt = (t) => /* @__PURE__ */ e.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 16,
  fill: "currentColor",
  ...t
}, /* @__PURE__ */ e.createElement("path", { d: "M1.354.646a.5.5 0 1 0-.708.708l14 14a.5.5 0 0 0 .708-.708L11 10.293V4.5A1.5 1.5 0 0 0 9.5 3H3.707zM0 4.5a1.5 1.5 0 0 1 .943-1.393l9.532 9.533c-.262.224-.603.36-.975.36h-8A1.5 1.5 0 0 1 0 11.5z" }), /* @__PURE__ */ e.createElement("path", { d: "m15.2 3.6-2.8 2.1a1 1 0 0 0-.4.8v3a1 1 0 0 0 .4.8l2.8 2.1a.5.5 0 0 0 .8-.4V4a.5.5 0 0 0-.8-.4" })), Kt = (t) => /* @__PURE__ */ e.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 16,
  fill: "currentColor",
  ...t
}, /* @__PURE__ */ e.createElement("path", { d: "M0 4.5A1.5 1.5 0 0 1 1.5 3h8A1.5 1.5 0 0 1 11 4.5v7A1.5 1.5 0 0 1 9.5 13h-8A1.5 1.5 0 0 1 0 11.5zM15.2 3.6l-2.8 2.1a1 1 0 0 0-.4.8v3a1 1 0 0 0 .4.8l2.8 2.1a.5.5 0 0 0 .8-.4V4a.5.5 0 0 0-.8-.4" })), Jt = (t) => /* @__PURE__ */ e.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  ...t
}, /* @__PURE__ */ e.createElement("path", {
  fill: "#FFF",
  d: "M4.99 3.99a1 1 0 0 0-.697 1.717L10.586 12l-6.293 6.293a1 1 0 1 0 1.414 1.414L12 13.414l6.293 6.293a1 1 0 1 0 1.414-1.414L13.414 12l6.293-6.293a1 1 0 0 0-.727-1.717 1 1 0 0 0-.687.303L12 10.586 5.707 4.293a1 1 0 0 0-.717-.303"
})), Zt = (t) => /* @__PURE__ */ e.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 18,
  fill: "none",
  ...t
}, /* @__PURE__ */ e.createElement("path", {
  fill: "currentColor",
  fillRule: "evenodd",
  d: "M0 2.75A2.75 2.75 0 0 1 2.75 0h10.5A2.75 2.75 0 0 1 16 2.75v13.594a.75.75 0 0 1-1.234.572l-3.691-3.12a1.25 1.25 0 0 0-.807-.296H2.75A2.75 2.75 0 0 1 0 10.75zM2.75 1.5c-.69 0-1.25.56-1.25 1.25v8c0 .69.56 1.25 1.25 1.25h7.518c.65 0 1.279.23 1.775.65l2.457 2.077V2.75c0-.69-.56-1.25-1.25-1.25z",
  clipRule: "evenodd"
}), /* @__PURE__ */ e.createElement("path", {
  fill: "currentColor",
  fillRule: "evenodd",
  d: "M3 4.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5",
  clipRule: "evenodd"
})), Ee = (t) => /* @__PURE__ */ e.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 16,
  fill: "none",
  ...t
}, /* @__PURE__ */ e.createElement("path", {
  fill: "currentcolor",
  fillRule: "evenodd",
  d: "M5.293 2.293a1 1 0 0 1 1.414 0l4.823 4.823a1.25 1.25 0 0 1 0 1.768l-4.823 4.823a1 1 0 0 1-1.414-1.414L9.586 8 5.293 3.707a1 1 0 0 1 0-1.414",
  clipRule: "evenodd"
})), Xt = (t) => /* @__PURE__ */ e.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 16,
  fill: "none",
  ...t
}, /* @__PURE__ */ e.createElement("g", {
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 1.5
}, /* @__PURE__ */ e.createElement("path", { d: "M10 1.75h4.25m0 0V6m0-4.25L9 7M6 14.25H1.75m0 0V10m0 4.25L7 9" }))), Yt = (t) => /* @__PURE__ */ e.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 16,
  fill: "none",
  ...t
}, /* @__PURE__ */ e.createElement("path", {
  fill: "currentcolor",
  fillRule: "evenodd",
  d: "M8.961.894C8.875-.298 7.125-.298 7.04.894c-.066.912-1.246 1.228-1.76.472-.67-.99-2.186-.115-1.664.96.399.824-.465 1.688-1.288 1.289-1.076-.522-1.95.994-.961 1.665.756.513.44 1.693-.472 1.759-1.192.086-1.192 1.836 0 1.922.912.066 1.228 1.246.472 1.76-.99.67-.115 2.186.96 1.664.824-.399 1.688.465 1.289 1.288-.522 1.076.994 1.95 1.665.961.513-.756 1.693-.44 1.759.472.086 1.192 1.836 1.192 1.922 0 .066-.912 1.246-1.228 1.76-.472.67.99 2.186.115 1.664-.96-.399-.824.465-1.687 1.288-1.289 1.076.522 1.95-.994.961-1.665-.756-.513-.44-1.693.472-1.759 1.192-.086 1.192-1.836 0-1.922-.912-.066-1.228-1.246-.472-1.76.99-.67.115-2.186-.96-1.664-.824.399-1.687-.465-1.289-1.288.522-1.076-.994-1.95-1.665-.961-.513.756-1.693.44-1.759-.472M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10",
  clipRule: "evenodd"
})), ea = (t) => /* @__PURE__ */ e.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 16,
  fill: "none",
  ...t
}, /* @__PURE__ */ e.createElement("path", {
  fill: "currentColor",
  fillRule: "evenodd",
  d: "M2 2.75A2.75 2.75 0 0 1 4.75 0h6.5A2.75 2.75 0 0 1 14 2.75v10.5A2.75 2.75 0 0 1 11.25 16h-6.5A2.75 2.75 0 0 1 2 13.25v-.5a.75.75 0 0 1 1.5 0v.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V2.75c0-.69-.56-1.25-1.25-1.25h-6.5c-.69 0-1.25.56-1.25 1.25v.5a.75.75 0 0 1-1.5 0z",
  clipRule: "evenodd"
}), /* @__PURE__ */ e.createElement("path", {
  fill: "currentColor",
  fillRule: "evenodd",
  d: "M8.78 7.47a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 1 1-1.06-1.06l.97-.97H1.75a.75.75 0 0 1 0-1.5h4.69l-.97-.97a.75.75 0 0 1 1.06-1.06z",
  clipRule: "evenodd"
})), ta = (t) => /* @__PURE__ */ e.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 16,
  fill: "none",
  ...t
}, /* @__PURE__ */ e.createElement("path", {
  fill: "currentcolor",
  fillRule: "evenodd",
  d: "M4 6.104V4a4 4 0 1 1 8 0v2.104c1.154.326 2 1.387 2 2.646v4.5A2.75 2.75 0 0 1 11.25 16h-6.5A2.75 2.75 0 0 1 2 13.25v-4.5c0-1.259.846-2.32 2-2.646M5.5 4a2.5 2.5 0 0 1 5 0v2h-5z",
  clipRule: "evenodd"
})), aa = (t) => /* @__PURE__ */ e.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 16,
  fill: "currentColor",
  ...t
}, /* @__PURE__ */ e.createElement("path", { d: "M12.227 11.52a5.48 5.48 0 0 0 1.246-2.97.5.5 0 0 0-.995-.1 4.5 4.5 0 0 1-.962 2.359l-1.07-1.07C10.794 9.247 11 8.647 11 8V3a3 3 0 0 0-6 0v1.293L1.354.646a.5.5 0 1 0-.708.708l14 14a.5.5 0 0 0 .708-.708zM8 12.5c.683 0 1.33-.152 1.911-.425l.743.743c-.649.359-1.378.59-2.154.66V15h2a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h2v-1.522a5.5 5.5 0 0 1-4.973-4.929.5.5 0 0 1 .995-.098A4.5 4.5 0 0 0 8 12.5" }), /* @__PURE__ */ e.createElement("path", { d: "M8.743 10.907 5 7.164V8a3 3 0 0 0 3.743 2.907" })), na = (t) => /* @__PURE__ */ e.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 16,
  fill: "currentColor",
  ...t
}, /* @__PURE__ */ e.createElement("path", {
  fillRule: "evenodd",
  d: "M2.975 8.002a.5.5 0 0 1 .547.449 4.5 4.5 0 0 0 8.956 0 .5.5 0 1 1 .995.098A5.5 5.5 0 0 1 8.5 13.478V15h2a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h2v-1.522a5.5 5.5 0 0 1-4.973-4.929.5.5 0 0 1 .448-.547",
  clipRule: "evenodd"
}), /* @__PURE__ */ e.createElement("path", { d: "M5 3a3 3 0 1 1 6 0v5a3 3 0 0 1-6 0z" })), ra = (t) => /* @__PURE__ */ e.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 16,
  fill: "currentcolor",
  ...t
}, /* @__PURE__ */ e.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ e.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" })), ca = (t) => /* @__PURE__ */ e.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 16,
  fill: "currentcolor",
  ...t
}, /* @__PURE__ */ e.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ e.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ e.createElement("g", { opacity: 0.25 }, /* @__PURE__ */ e.createElement("path", { d: "M12 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ e.createElement("path", { d: "M12 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }))), la = (t) => /* @__PURE__ */ e.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 16,
  fill: "currentcolor",
  ...t
}, /* @__PURE__ */ e.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ e.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ e.createElement("g", { opacity: 0.25 }, /* @__PURE__ */ e.createElement("path", { d: "M6 6.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ e.createElement("path", { d: "M6 6.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ e.createElement("path", { d: "M12 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }))), ia = (t) => /* @__PURE__ */ e.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 16,
  fill: "currentColor",
  ...t
}, /* @__PURE__ */ e.createElement("g", { opacity: 0.25 }, /* @__PURE__ */ e.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ e.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }))), Ae = (t) => /* @__PURE__ */ e.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 20,
  height: 16,
  fill: "none",
  ...t
}, /* @__PURE__ */ e.createElement("path", {
  fill: "currentColor",
  fillRule: "evenodd",
  d: "M0 2.75A2.75 2.75 0 0 1 2.75 0h14.5A2.75 2.75 0 0 1 20 2.75v10.5A2.75 2.75 0 0 1 17.25 16H2.75A2.75 2.75 0 0 1 0 13.25zM2.75 1.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V2.75c0-.69-.56-1.25-1.25-1.25z",
  clipRule: "evenodd"
}), /* @__PURE__ */ e.createElement("path", {
  fill: "currentColor",
  fillRule: "evenodd",
  d: "M9.47 4.22a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v4.69a.75.75 0 0 1-1.5 0V6.56l-.97.97a.75.75 0 0 1-1.06-1.06z",
  clipRule: "evenodd"
})), sa = (t) => /* @__PURE__ */ e.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 20,
  height: 16,
  fill: "none",
  ...t
}, /* @__PURE__ */ e.createElement("g", { fill: "currentColor" }, /* @__PURE__ */ e.createElement("path", { d: "M7.28 4.22a.75.75 0 0 0-1.06 1.06L8.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L10 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L11.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L10 6.94z" }), /* @__PURE__ */ e.createElement("path", {
  fillRule: "evenodd",
  d: "M2.75 0A2.75 2.75 0 0 0 0 2.75v10.5A2.75 2.75 0 0 0 2.75 16h14.5A2.75 2.75 0 0 0 20 13.25V2.75A2.75 2.75 0 0 0 17.25 0zM1.5 2.75c0-.69.56-1.25 1.25-1.25h14.5c.69 0 1.25.56 1.25 1.25v10.5c0 .69-.56 1.25-1.25 1.25H2.75c-.69 0-1.25-.56-1.25-1.25z",
  clipRule: "evenodd"
}))), ke = (t) => /* @__PURE__ */ e.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 16,
  fill: "none",
  ...t
}, /* @__PURE__ */ e.createElement("path", {
  fill: "currentColor",
  fillRule: "evenodd",
  d: "M8 0a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 8 0",
  clipRule: "evenodd"
}), /* @__PURE__ */ e.createElement("path", {
  fill: "currentColor",
  fillRule: "evenodd",
  d: "M8 12a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5A.75.75 0 0 1 8 12",
  clipRule: "evenodd",
  opacity: 0.7
}), /* @__PURE__ */ e.createElement("path", {
  fill: "currentColor",
  fillRule: "evenodd",
  d: "M12 1.072a.75.75 0 0 1 .274 1.024l-1.25 2.165a.75.75 0 0 1-1.299-.75l1.25-2.165A.75.75 0 0 1 12 1.072",
  clipRule: "evenodd"
}), /* @__PURE__ */ e.createElement("path", {
  fill: "currentColor",
  fillRule: "evenodd",
  d: "M6 11.464a.75.75 0 0 1 .274 1.025l-1.25 2.165a.75.75 0 0 1-1.299-.75l1.25-2.165A.75.75 0 0 1 6 11.464",
  clipRule: "evenodd",
  opacity: 0.6
}), /* @__PURE__ */ e.createElement("path", {
  fill: "currentColor",
  fillRule: "evenodd",
  d: "M14.928 4a.75.75 0 0 1-.274 1.025l-2.165 1.25a.75.75 0 1 1-.75-1.3l2.165-1.25A.75.75 0 0 1 14.928 4",
  clipRule: "evenodd"
}), /* @__PURE__ */ e.createElement("path", {
  fill: "currentColor",
  fillRule: "evenodd",
  d: "M4.536 10a.75.75 0 0 1-.275 1.024l-2.165 1.25a.75.75 0 0 1-.75-1.298l2.165-1.25A.75.75 0 0 1 4.536 10",
  clipRule: "evenodd",
  opacity: 0.5
}), /* @__PURE__ */ e.createElement("path", {
  fill: "currentColor",
  fillRule: "evenodd",
  d: "M16 8a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h2.5A.75.75 0 0 1 16 8",
  clipRule: "evenodd"
}), /* @__PURE__ */ e.createElement("path", {
  fill: "currentColor",
  fillRule: "evenodd",
  d: "M4 8a.75.75 0 0 1-.75.75H.75a.75.75 0 0 1 0-1.5h2.5A.75.75 0 0 1 4 8",
  clipRule: "evenodd",
  opacity: 0.4
}), /* @__PURE__ */ e.createElement("path", {
  fill: "currentColor",
  fillRule: "evenodd",
  d: "M14.928 12a.75.75 0 0 1-1.024.274l-2.165-1.25a.75.75 0 0 1 .75-1.299l2.165 1.25A.75.75 0 0 1 14.928 12",
  clipRule: "evenodd",
  opacity: 0.9
}), /* @__PURE__ */ e.createElement("path", {
  fill: "currentColor",
  fillRule: "evenodd",
  d: "M4.536 6a.75.75 0 0 1-1.025.275l-2.165-1.25a.75.75 0 1 1 .75-1.3l2.165 1.25A.75.75 0 0 1 4.536 6",
  clipRule: "evenodd",
  opacity: 0.3
}), /* @__PURE__ */ e.createElement("path", {
  fill: "currentColor",
  fillRule: "evenodd",
  d: "M12 14.928a.75.75 0 0 1-1.024-.274l-1.25-2.165a.75.75 0 0 1 1.298-.75l1.25 2.165A.75.75 0 0 1 12 14.928",
  clipRule: "evenodd",
  opacity: 0.8
}), /* @__PURE__ */ e.createElement("path", {
  fill: "currentColor",
  fillRule: "evenodd",
  d: "M6 4.536a.75.75 0 0 1-1.024-.275l-1.25-2.165a.75.75 0 1 1 1.299-.75l1.25 2.165A.75.75 0 0 1 6 4.536",
  clipRule: "evenodd",
  opacity: 0.2
})), oa = (t) => /* @__PURE__ */ e.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 16,
  fill: "none",
  ...t
}, /* @__PURE__ */ e.createElement("g", {
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 1.5
}, /* @__PURE__ */ e.createElement("path", { d: "M13.25 7H9m0 0V2.75M9 7l5.25-5.25M2.75 9H7m0 0v4.25M7 9l-5.25 5.25" }))), ua = /* @__PURE__ */ e.forwardRef(function({ trackRef: a, ...n }, c) {
  const r = ue(), { mergedProps: i, inFocus: o } = At({
    trackRef: a ?? r,
    props: n
  });
  return /* @__PURE__ */ e.createElement(Me.Consumer, null, (l) => l !== void 0 && /* @__PURE__ */ e.createElement("button", {
    ref: c,
    ...i
  }, n.children ? n.children : o ? /* @__PURE__ */ e.createElement(oa, null) : /* @__PURE__ */ e.createElement(Xt, null)));
}), ce = /* @__PURE__ */ e.forwardRef(function({ kind: a, initialSelection: n, onActiveDeviceChange: c, onDeviceListChange: r, onDeviceSelectError: i, exactMatch: o, track: l, requestPermissions: s, onError: d, ...u }, h) {
  const m = Je(), g = e.useRef("default"), { devices: f, activeDeviceId: E, setActiveMediaDevice: p, className: C } = st({
    kind: a,
    room: m,
    track: l,
    requestPermissions: s,
    onError: e.useCallback((v) => {
      m && m.emit(Ie.MediaDevicesError, v), d?.(v);
    }, [m, d])
  });
  e.useEffect(() => {
    n !== void 0 && p(n);
  }, [p]), e.useEffect(() => {
    typeof r == "function" && r(f);
  }, [r, f]), e.useEffect(() => {
    E !== g.current && c?.(E), g.current = E;
  }, [E]);
  const k = async (v) => {
    try {
      await p(v, { exact: o ?? !0 });
    } catch (w) {
      if (w instanceof Error) i?.(w);
      else throw w;
    }
  }, R = e.useMemo(() => z(u, { className: C }, { className: "lk-list" }), [C, u]), M = !!f.find((v) => v.label.toLowerCase().startsWith("default"));
  function D(v, w, b) {
    return v === w || !M && b === 0 && w === "default";
  }
  return /* @__PURE__ */ e.createElement("ul", {
    ref: h,
    ...R
  }, f.map((v, w) => /* @__PURE__ */ e.createElement("li", {
    key: v.deviceId,
    id: v.deviceId,
    "data-lk-active": D(v.deviceId, E, w),
    "aria-selected": D(v.deviceId, E, w),
    role: "option"
  }, /* @__PURE__ */ e.createElement("button", {
    className: "lk-button",
    onClick: () => k(v.deviceId)
  }, v.label))));
}), Ne = /* @__PURE__ */ e.forwardRef(function({ label: a, ...n }, c) {
  const r = Ke(), { mergedProps: i, canPlayAudio: o } = ot({
    room: r,
    props: n
  }), { mergedProps: l, canPlayVideo: s } = nt({
    room: r,
    props: i
  }), { style: d, ...u } = l;
  return d.display = o && s ? "none" : "block", /* @__PURE__ */ e.createElement("button", {
    ref: c,
    style: d,
    ...u
  }, a ?? `Start ${o ? "Video" : "Audio"}`);
});
function xe(t, a) {
  switch (t) {
    case S.Source.Microphone:
      return a ? /* @__PURE__ */ e.createElement(na, null) : /* @__PURE__ */ e.createElement(aa, null);
    case S.Source.Camera:
      return a ? /* @__PURE__ */ e.createElement(Kt, null) : /* @__PURE__ */ e.createElement(Gt, null);
    case S.Source.ScreenShare:
      return a ? /* @__PURE__ */ e.createElement(sa, null) : /* @__PURE__ */ e.createElement(Ae, null);
    default:
      return;
  }
}
function da(t) {
  switch (t) {
    case ne.Excellent:
      return /* @__PURE__ */ e.createElement(ra, null);
    case ne.Good:
      return /* @__PURE__ */ e.createElement(ca, null);
    case ne.Poor:
      return /* @__PURE__ */ e.createElement(la, null);
    default:
      return /* @__PURE__ */ e.createElement(ia, null);
  }
}
var j = /* @__PURE__ */ e.forwardRef(function({ showIcon: a, ...n }, c) {
  const { buttonProps: r, enabled: i } = ct(n), [o, l] = e.useState(!1);
  return e.useEffect(() => {
    l(!0);
  }, []), o && /* @__PURE__ */ e.createElement("button", {
    ref: c,
    ...r
  }, (a ?? !0) && xe(n.source, i), n.children);
}), Le = /* @__PURE__ */ e.forwardRef(function(a, n) {
  const { className: c, quality: r } = Nt(a), i = e.useMemo(() => ({
    ...z(a, { className: c }),
    "data-lk-quality": r
  }), [
    r,
    a,
    c
  ]);
  return /* @__PURE__ */ e.createElement("div", {
    ref: n,
    ...i
  }, a.children ?? da(r));
}), le = /* @__PURE__ */ e.forwardRef(function({ participant: a, ...n }, c) {
  const r = Pt(a), { className: i, infoObserver: o } = e.useMemo(() => xt(r), [r]), { identity: l, name: s } = Lt(o, {
    name: r.name,
    identity: r.identity,
    metadata: r.metadata
  }), d = e.useMemo(() => z(n, {
    className: i,
    "data-lk-participant-name": s
  }), [
    n,
    i,
    s
  ]);
  return /* @__PURE__ */ e.createElement("span", {
    ref: c,
    ...d
  }, s !== "" ? s : l, n.children);
}), De = /* @__PURE__ */ e.forwardRef(function({ trackRef: a, show: n = "always", ...c }, r) {
  const { className: i, isMuted: o } = lt(a), l = n === "always" || n === "muted" && o || n === "unmuted" && !o, s = e.useMemo(() => z(c, { className: i }), [i, c]);
  return l ? /* @__PURE__ */ e.createElement("div", {
    ref: r,
    ...s,
    "data-lk-muted": o
  }, c.children ?? xe(a.source, !o)) : null;
}), Ve = (t) => /* @__PURE__ */ e.createElement("svg", {
  width: 320,
  height: 320,
  viewBox: "0 0 320 320",
  preserveAspectRatio: "xMidYMid meet",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  ...t
}, /* @__PURE__ */ e.createElement("path", {
  d: "M160 180C204.182 180 240 144.183 240 100C240 55.8172 204.182 20 160 20C115.817 20 79.9997 55.8172 79.9997 100C79.9997 144.183 115.817 180 160 180Z",
  fill: "white",
  fillOpacity: 0.25
}), /* @__PURE__ */ e.createElement("path", {
  d: "M97.6542 194.614C103.267 191.818 109.841 192.481 115.519 195.141C129.025 201.466 144.1 205 159.999 205C175.899 205 190.973 201.466 204.48 195.141C210.158 192.481 216.732 191.818 222.345 194.614C262.703 214.719 291.985 253.736 298.591 300.062C300.15 310.997 291.045 320 280 320H39.9997C28.954 320 19.8495 310.997 21.4087 300.062C28.014 253.736 57.2966 214.72 97.6542 194.614Z",
  fill: "white",
  fillOpacity: 0.25
}));
function ze(t, a = {}) {
  const [n, c] = e.useState(at(t)), [r, i] = e.useState(n?.isMuted), [o, l] = e.useState(n?.isSubscribed), [s, d] = e.useState(n?.track), [u, h] = e.useState("landscape"), m = e.useRef(), { className: g, trackObserver: f } = e.useMemo(() => Ft(t), [
    t.participant.sid ?? t.participant.identity,
    t.source,
    $(t) && t.publication.trackSid
  ]);
  return e.useEffect(() => {
    const E = f.subscribe((p) => {
      P.debug("update track", p), c(p), i(p?.isMuted), l(p?.isSubscribed), d(p?.track);
    });
    return () => E?.unsubscribe();
  }, [f]), e.useEffect(() => (s && (m.current && s.detach(m.current), a.element?.current && !(t.participant.isLocal && s?.kind === "audio") && s.attach(a.element.current)), m.current = a.element?.current, () => {
    m.current && s?.detach(m.current);
  }), [s, a.element]), e.useEffect(() => {
    if (typeof n?.dimensions?.width == "number" && typeof n?.dimensions?.height == "number") {
      const E = n.dimensions.width > n.dimensions.height ? "landscape" : "portrait";
      h(E);
    }
  }, [n]), {
    publication: n,
    isMuted: r,
    isSubscribed: o,
    track: s,
    elementProps: z(a.props, {
      className: g,
      "data-lk-local-participant": t.participant.isLocal,
      "data-lk-source": n?.source,
      ...n?.kind === "video" && { "data-lk-orientation": u }
    })
  };
}
var ma = /* @__PURE__ */ qe(((t, a) => {
  var n = "Expected a function", c = NaN, r = "[object Symbol]", i = /^\s+|\s+$/g, o = /^[-+]0x[0-9a-f]+$/i, l = /^0b[01]+$/i, s = /^0o[0-7]+$/i, d = parseInt, u = typeof global == "object" && global && global.Object === Object && global, h = typeof self == "object" && self && self.Object === Object && self, m = u || h || Function("return this")(), g = Object.prototype.toString, f = Math.max, E = Math.min, p = function() {
    return m.Date.now();
  };
  function C(v, w, b) {
    var T, V, B, x, N, L, F = 0, A = !1, _ = !1, H = !0;
    if (typeof v != "function") throw new TypeError(n);
    w = D(w) || 0, k(b) && (A = !!b.leading, _ = "maxWait" in b, B = _ ? f(D(b.maxWait) || 0, w) : B, H = "trailing" in b ? !!b.trailing : H);
    function Q(I) {
      var O = T, K = V;
      return T = V = void 0, F = I, x = v.apply(K, O), x;
    }
    function te(I) {
      return F = I, N = setTimeout(y, w), A ? Q(I) : x;
    }
    function G(I) {
      var O = I - L, K = I - F, pe = w - O;
      return _ ? E(pe, B - K) : pe;
    }
    function X(I) {
      var O = I - L, K = I - F;
      return L === void 0 || O >= w || O < 0 || _ && K >= B;
    }
    function y() {
      var I = p();
      if (X(I)) return U(I);
      N = setTimeout(y, G(I));
    }
    function U(I) {
      return N = void 0, H && T ? Q(I) : (T = V = void 0, x);
    }
    function He() {
      N !== void 0 && clearTimeout(N), F = 0, T = L = V = N = void 0;
    }
    function Ue() {
      return N === void 0 ? x : U(p());
    }
    function ae() {
      var I = p(), O = X(I);
      if (T = arguments, V = this, L = I, O) {
        if (N === void 0) return te(L);
        if (_)
          return N = setTimeout(y, w), Q(L);
      }
      return N === void 0 && (N = setTimeout(y, w)), x;
    }
    return ae.cancel = He, ae.flush = Ue, ae;
  }
  function k(v) {
    var w = typeof v;
    return !!v && (w == "object" || w == "function");
  }
  function R(v) {
    return !!v && typeof v == "object";
  }
  function M(v) {
    return typeof v == "symbol" || R(v) && g.call(v) == r;
  }
  function D(v) {
    if (typeof v == "number") return v;
    if (M(v)) return c;
    if (k(v)) {
      var w = typeof v.valueOf == "function" ? v.valueOf() : v;
      v = k(w) ? w + "" : w;
    }
    if (typeof v != "string") return v === 0 ? v : +v;
    v = v.replace(i, "");
    var b = l.test(v);
    return b || s.test(v) ? d(v.slice(2), b ? 2 : 8) : o.test(v) ? c : +v;
  }
  a.exports = C;
})), be = /* @__PURE__ */ je(ma(), 1);
function fa(t) {
  const a = W(t);
  a.current = t, q(() => () => {
    a.current();
  }, []);
}
function ha(t, a = 500, n) {
  const c = W();
  fa(() => {
    c.current && c.current.cancel();
  });
  const r = _t(() => {
    const i = (0, be.default)(t, a, n), o = (...l) => i(...l);
    return o.cancel = () => {
      i.cancel();
    }, o.isPending = () => !!c.current, o.flush = () => i.flush(), o;
  }, [
    t,
    a,
    n
  ]);
  return q(() => {
    c.current = (0, be.default)(t, a, n);
  }, [
    t,
    a,
    n
  ]), r;
}
function va(t, a, n) {
  const c = n?.equalityFn ?? ((d, u) => d === u), r = t instanceof Function ? t() : t, [i, o] = J(r), l = W(r), s = ha(o, a, n);
  return c(l.current, r) || (s(r), l.current = r), [i, s];
}
function ga({ threshold: t = 0, root: a = null, rootMargin: n = "0%", freezeOnceVisible: c = !1, initialIsIntersecting: r = !1, onChange: i } = {}) {
  var o;
  const [l, s] = J(null), [d, u] = J(() => ({
    isIntersecting: r,
    entry: void 0
  })), h = W();
  h.current = i;
  const m = ((o = d.entry) == null ? void 0 : o.isIntersecting) && c;
  q(() => {
    if (!l || !("IntersectionObserver" in window) || m) return;
    let E;
    const p = new IntersectionObserver((C) => {
      const k = Array.isArray(p.thresholds) ? p.thresholds : [p.thresholds];
      C.forEach((R) => {
        const M = R.isIntersecting && k.some((D) => R.intersectionRatio >= D);
        u({
          isIntersecting: M,
          entry: R
        }), h.current && h.current(M, R), M && c && E && (E(), E = void 0);
      });
    }, {
      threshold: t,
      root: a,
      rootMargin: n
    });
    return p.observe(l), () => {
      p.disconnect();
    };
  }, [
    l,
    JSON.stringify(t),
    a,
    n,
    m,
    c
  ]);
  const g = W(null);
  q(() => {
    var E;
    !l && ((E = d.entry) != null && E.target) && !c && !m && g.current !== d.entry.target && (g.current = d.entry.target, u({
      isIntersecting: r,
      entry: void 0
    }));
  }, [
    l,
    d.entry,
    c,
    m,
    r
  ]);
  const f = [
    s,
    !!d.isIntersecting,
    d.entry
  ];
  return f.ref = f[0], f.isIntersecting = f[1], f.entry = f[2], f;
}
var pa = /* @__PURE__ */ e.forwardRef(function({ onTrackClick: a, onClick: n, onSubscriptionStatusChanged: c, trackRef: r, manageSubscription: i, ...o }, l) {
  const s = ee(r), d = e.useRef(null);
  e.useImperativeHandle(l, () => d.current);
  const { ref: u, entry: h } = ga({ root: null }), [m] = va(h, 3e3), g = e.useRef(null), f = e.useRef(!1);
  e.useEffect(() => {
    f.current = !!i, g.current = s.publication instanceof Y ? s.publication : null;
  }, [s.publication, i]), e.useEffect(() => {
    i && s.publication instanceof Y && m?.isIntersecting === !1 && h?.isIntersecting === !1 && s.publication.setSubscribed(!1);
  }, [
    m,
    h,
    s,
    i
  ]), e.useEffect(() => {
    i && s.publication instanceof Y && h?.isIntersecting === !0 && s.publication.setSubscribed(!0);
  }, [
    h,
    s,
    i
  ]), e.useEffect(() => () => {
    f.current && g.current?.setSubscribed(!1);
  }, []);
  const { elementProps: E, publication: p, isSubscribed: C } = ze(s, {
    element: d,
    props: o
  });
  e.useEffect(() => {
    c?.(!!C);
  }, [C, c]);
  const k = (M) => {
    n?.(M), a?.({
      participant: s?.participant,
      track: p
    });
  }, R = e.useCallback((M) => {
    d.current = M, u(M);
  }, [u]);
  return /* @__PURE__ */ e.createElement("video", {
    ref: R,
    ...E,
    muted: !0,
    onClick: k
  });
}), he = /* @__PURE__ */ e.forwardRef(function({ trackRef: a, onSubscriptionStatusChanged: n, volume: c, ...r }, i) {
  const o = ee(a), l = e.useRef(null);
  e.useImperativeHandle(i, () => l.current);
  const { elementProps: s, isSubscribed: d, track: u, publication: h } = ze(o, {
    element: l,
    props: r
  });
  return e.useEffect(() => {
    n?.(!!d);
  }, [d, n]), e.useEffect(() => {
    u === void 0 || c === void 0 || (u instanceof Bt ? u.setVolume(c) : P.warn("Volume can only be set on remote audio tracks."));
  }, [c, u]), e.useEffect(() => {
    h === void 0 || r.muted === void 0 || (h instanceof Y ? h.setEnabled(!r.muted) : P.warn("Can only call setEnabled on remote track publications."));
  }, [
    r.muted,
    h,
    u
  ]), /* @__PURE__ */ e.createElement("audio", {
    ref: l,
    ...s
  });
});
function Ea(t) {
  const a = !!We();
  return t.participant && !a ? /* @__PURE__ */ e.createElement(it.Provider, { value: t.participant }, t.children) : /* @__PURE__ */ e.createElement(e.Fragment, null, t.children);
}
function ka(t) {
  const a = !!ue();
  return t.trackRef && !a ? /* @__PURE__ */ e.createElement(se.Provider, { value: t.trackRef }, t.children) : /* @__PURE__ */ e.createElement(e.Fragment, null, t.children);
}
var ie = /* @__PURE__ */ e.forwardRef(function({ trackRef: a, children: n, onParticipantClick: c, disableSpeakingIndicator: r, ...i }, o) {
  const l = ee(a), { elementProps: s } = ye({
    htmlProps: i,
    disableSpeakingIndicator: r,
    onParticipantClick: c,
    trackRef: l
  }), d = Ge(l.participant), u = de(), h = Ot()?.autoSubscription, m = e.useCallback((g) => {
    l.source && !g && u && u.pin.dispatch && gt(l, u.pin.state) && u.pin.dispatch({ msg: "clear_pin" });
  }, [l, u]);
  return /* @__PURE__ */ e.createElement("div", {
    ref: o,
    style: { position: "relative" },
    ...s
  }, /* @__PURE__ */ e.createElement(ka, { trackRef: l }, /* @__PURE__ */ e.createElement(Ea, { participant: l.participant }, n ?? /* @__PURE__ */ e.createElement(e.Fragment, null, $(l) && (l.publication?.kind === "video" || l.source === S.Source.Camera || l.source === S.Source.ScreenShare) ? /* @__PURE__ */ e.createElement(pa, {
    trackRef: l,
    onSubscriptionStatusChanged: m,
    manageSubscription: h
  }) : $(l) && /* @__PURE__ */ e.createElement(he, {
    trackRef: l,
    onSubscriptionStatusChanged: m
  }), /* @__PURE__ */ e.createElement("div", { className: "lk-participant-placeholder" }, /* @__PURE__ */ e.createElement(Ve, null)), /* @__PURE__ */ e.createElement("div", { className: "lk-participant-metadata" }, /* @__PURE__ */ e.createElement("div", { className: "lk-participant-metadata-item" }, l.source === S.Source.Camera ? /* @__PURE__ */ e.createElement(e.Fragment, null, d && /* @__PURE__ */ e.createElement(ta, { style: { marginRight: "0.25rem" } }), /* @__PURE__ */ e.createElement(De, {
    trackRef: {
      participant: l.participant,
      source: S.Source.Microphone
    },
    show: "muted"
  }), /* @__PURE__ */ e.createElement(le, null)) : /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement(Ae, { style: { marginRight: "0.25rem" } }), /* @__PURE__ */ e.createElement(le, null, "'s screen"))), /* @__PURE__ */ e.createElement(Le, { className: "lk-participant-metadata-item" }))), /* @__PURE__ */ e.createElement(ua, { trackRef: l }))));
});
function ba(t) {
  const a = z(t, { className: "lk-focus-layout" });
  return /* @__PURE__ */ e.createElement("div", a, t.children);
}
function Sa({ trackRef: t, ...a }) {
  return /* @__PURE__ */ e.createElement(ie, {
    trackRef: t,
    ...a
  });
}
function ve({ tracks: t, ...a }) {
  return /* @__PURE__ */ e.createElement(e.Fragment, null, t.map((n) => /* @__PURE__ */ e.createElement(se.Provider, {
    value: n,
    key: Re(n)
  }, fe(a.children))));
}
function wa({ totalPageCount: t, nextPage: a, prevPage: n, currentPage: c, pagesContainer: r }) {
  const [i, o] = e.useState(!1);
  return e.useEffect(() => {
    let l;
    return r && (l = ht(r.current, 2e3).subscribe(o)), () => {
      l && l.unsubscribe();
    };
  }, [r]), /* @__PURE__ */ e.createElement("div", {
    className: "lk-pagination-control",
    "data-lk-user-interaction": i
  }, /* @__PURE__ */ e.createElement("button", {
    className: "lk-button",
    onClick: n
  }, /* @__PURE__ */ e.createElement(Ee, null)), /* @__PURE__ */ e.createElement("span", { className: "lk-pagination-count" }, `${c} of ${t}`), /* @__PURE__ */ e.createElement("button", {
    className: "lk-button",
    onClick: a
  }, /* @__PURE__ */ e.createElement(Ee, null)));
}
var Ca = /* @__PURE__ */ e.forwardRef(function({ totalPageCount: a, currentPage: n }, c) {
  const r = new Array(a).fill("").map((i, o) => o + 1 === n ? /* @__PURE__ */ e.createElement("span", {
    "data-lk-active": !0,
    key: o
  }) : /* @__PURE__ */ e.createElement("span", { key: o }));
  return /* @__PURE__ */ e.createElement("div", {
    ref: c,
    className: "lk-pagination-indicator"
  }, r);
});
function Ma({ tracks: t, ...a }) {
  const n = e.createRef(), c = e.useMemo(() => z(a, { className: "lk-grid-layout" }), [a]), { layout: r } = wt(n, t.length), i = pt(r.maxTiles, t);
  return et(n, {
    onLeftSwipe: i.nextPage,
    onRightSwipe: i.prevPage
  }), /* @__PURE__ */ e.createElement("div", {
    ref: n,
    "data-lk-pagination": i.totalPageCount > 1,
    ...c
  }, /* @__PURE__ */ e.createElement(ve, { tracks: i.tracks }, a.children), t.length > r.maxTiles && /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement(Ca, {
    totalPageCount: i.totalPageCount,
    currentPage: i.currentPage
  }), /* @__PURE__ */ e.createElement(wa, {
    pagesContainer: n,
    ...i
  })));
}
var ya = 130, Ra = 140, Se = 1, Fe = 16 / 10, Ia = (1 - Fe) * -1;
function Ta({ tracks: t, orientation: a, ...n }) {
  const c = e.useRef(null), [r, i] = e.useState(0), { width: o, height: l } = zt(c), s = a || (l >= o ? "vertical" : "horizontal"), d = s === "vertical" ? Math.max(o * Ia, ya) : Math.max(l * Fe, Ra), u = Xe(), h = Math.max(s === "vertical" ? (l - u) / d : (o - u) / d, Se);
  let m = Math.round(h);
  Math.abs(h - r) < 0.5 ? m = Math.round(r) : r !== h && i(h);
  const g = vt(t, m);
  return e.useLayoutEffect(() => {
    c.current && (c.current.dataset.lkOrientation = s, c.current.style.setProperty("--lk-max-visible-tiles", m.toString()));
  }, [m, s]), /* @__PURE__ */ e.createElement("aside", {
    key: s,
    className: "lk-carousel",
    ref: c,
    ...n
  }, /* @__PURE__ */ e.createElement(ve, { tracks: g }, n.children));
}
function Oe({ value: t, onPinChange: a, onWidgetChange: n, children: c }) {
  const r = ut(t);
  return e.useEffect(() => {
    P.debug("PinState Updated", { state: r.pin.state }), a && r.pin.state && a(r.pin.state);
  }, [r.pin.state, a]), e.useEffect(() => {
    P.debug("Widget Updated", { widgetState: r.widget.state }), n && r.widget.state && n(r.widget.state);
  }, [n, r.widget.state]), /* @__PURE__ */ e.createElement(Me.Provider, { value: r }, c);
}
function Pa({ room: t, volume: a, muted: n }) {
  const c = me([
    S.Source.Microphone,
    S.Source.ScreenShareAudio,
    S.Source.Unknown
  ], {
    updateOnlyOn: [],
    onlySubscribed: !0,
    room: t
  }).filter((r) => !r.participant.isLocal && r.publication.kind === S.Kind.Audio);
  return /* @__PURE__ */ e.createElement("div", { style: { display: "none" } }, c.map((r) => /* @__PURE__ */ e.createElement(he, {
    key: Re(r),
    trackRef: r,
    volume: a,
    muted: n
  })));
}
function Aa(t) {
  const a = e.useMemo(() => z(t, { className: "lk-toast" }), [t]);
  return /* @__PURE__ */ e.createElement("div", a, t.children);
}
var Na = (t) => {
  const a = [];
  for (let n = 0; n < t; n++) a.push([n, t - 1 - n]);
  return a;
}, we = (t) => [[Math.floor(t / 2)], [-1]], xa = (t, a, n) => {
  const [c, r] = J(0), [i, o] = J([[]]);
  q(() => {
    if (t === "thinking") o(we(a));
    else if (t === "connecting" || t === "initializing") {
      const s = [...Na(a)];
      o(s);
    } else o(t === "listening" ? we(a) : t === void 0 || t === "speaking" ? [new Array(a).fill(0).map((s, d) => d)] : [[]]);
    r(0);
  }, [t, a]);
  const l = W(null);
  return q(() => {
    let s = performance.now();
    const d = (u) => {
      u - s >= n && (r((h) => h + 1), s = u), l.current = requestAnimationFrame(d);
    };
    return l.current = requestAnimationFrame(d), () => {
      l.current !== null && cancelAnimationFrame(l.current);
    };
  }, [
    n,
    a,
    t,
    i.length
  ]), i[c % i.length];
}, La = /* @__PURE__ */ new Map([
  ["connecting", 2e3],
  ["initializing", 2e3],
  ["listening", 500],
  ["thinking", 150]
]), Da = (t, a) => {
  if (t === void 0) return 1e3;
  let n = La.get(t);
  return n && t === "connecting" && (n /= a), n;
}, _e = /* @__PURE__ */ e.forwardRef(function({ state: a, options: n, barCount: c = 15, trackRef: r, track: i, children: o, ...l }, s) {
  const d = z(l, { className: "lk-audio-bar-visualizer" });
  let u = ue();
  (r || i) && (u = r || i);
  const h = dt(u, {
    bands: c,
    loPass: 100,
    hiPass: 200
  }), m = n?.minHeight ?? 20, g = n?.maxHeight ?? 100, f = xa(a, c, Da(a, c) ?? 100);
  return /* @__PURE__ */ e.createElement("div", {
    ref: s,
    ...d,
    "data-lk-va-state": a
  }, h.map((E, p) => o ? fe(o, {
    "data-lk-highlighted": f.includes(p),
    "data-lk-bar-index": p,
    className: "lk-audio-bar",
    style: { height: `${Math.min(g, Math.max(m, E * 100 + 5))}%` }
  }) : /* @__PURE__ */ e.createElement("span", {
    key: p,
    "data-lk-highlighted": f.includes(p),
    "data-lk-bar-index": p,
    className: `lk-audio-bar ${f.includes(p) && "lk-highlighted"}`,
    style: { height: `${Math.min(g, Math.max(m, E * 100 + 5))}%` }
  })));
}), Va = /* @__PURE__ */ e.forwardRef(function({ children: a, disableSpeakingIndicator: n, onParticipantClick: c, trackRef: r, ...i }, o) {
  const l = ee(r), { elementProps: s } = ye({
    trackRef: l,
    htmlProps: i,
    disableSpeakingIndicator: n,
    onParticipantClick: c
  });
  return /* @__PURE__ */ e.createElement("div", {
    ref: o,
    style: {
      position: "relative",
      minHeight: "160px"
    },
    ...s
  }, /* @__PURE__ */ e.createElement(se.Provider, { value: l }, a ?? /* @__PURE__ */ e.createElement(e.Fragment, null, $(l) && /* @__PURE__ */ e.createElement(he, { trackRef: l }), /* @__PURE__ */ e.createElement(_e, {
    barCount: 7,
    options: { minHeight: 8 }
  }), /* @__PURE__ */ e.createElement("div", { className: "lk-participant-metadata" }, /* @__PURE__ */ e.createElement("div", { className: "lk-participant-metadata-item" }, /* @__PURE__ */ e.createElement(De, { trackRef: l }), /* @__PURE__ */ e.createElement(le, null)), /* @__PURE__ */ e.createElement(Le, { className: "lk-participant-metadata-item" })))));
});
function za(t) {
  const [a, n] = e.useState(void 0), c = Dt(t.room);
  return e.useEffect(() => {
    switch (c) {
      case re.Reconnecting:
        n(/* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement(ke, { className: "lk-spinner" }), " Reconnecting"));
        break;
      case re.Connecting:
        n(/* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement(ke, { className: "lk-spinner" }), " Connecting"));
        break;
      case re.Disconnected:
        n(/* @__PURE__ */ e.createElement(e.Fragment, null, "Disconnected"));
        break;
      default:
        n(void 0);
        break;
    }
  }, [c]), a ? /* @__PURE__ */ e.createElement(Aa, { className: "lk-toast-connection-state" }, a) : /* @__PURE__ */ e.createElement(e.Fragment, null);
}
var Fa = /* @__PURE__ */ e.forwardRef(function({ entry: a, hideName: n = !1, hideTimestamp: c = !1, messageFormatter: r, ...i }, o) {
  const l = e.useMemo(() => r ? r(a.message) : a.message, [a.message, r]), s = !!a.editTimestamp, d = new Date(a.timestamp), u = typeof navigator < "u" ? navigator.language : "en-US", h = a.from?.name ?? a.from?.identity;
  return /* @__PURE__ */ e.createElement("li", {
    ref: o,
    className: "lk-chat-entry",
    title: d.toLocaleTimeString(u, { timeStyle: "full" }),
    "data-lk-message-origin": a.from?.isLocal ? "local" : "remote",
    ...i
  }, (!c || !n || s) && /* @__PURE__ */ e.createElement("span", { className: "lk-meta-data" }, !n && /* @__PURE__ */ e.createElement("strong", { className: "lk-participant-name" }, h), (!c || s) && /* @__PURE__ */ e.createElement("span", { className: "lk-timestamp" }, s && "edited ", d.toLocaleTimeString(u, { timeStyle: "short" }))), /* @__PURE__ */ e.createElement("span", { className: "lk-message-body" }, l), /* @__PURE__ */ e.createElement("span", { className: "lk-message-attachements" }, a.attachedFiles?.map((m) => m.type.startsWith("image/") && /* @__PURE__ */ e.createElement("img", {
    style: {
      maxWidth: "300px",
      maxHeight: "300px"
    },
    key: m.name,
    src: URL.createObjectURL(m),
    alt: m.name
  }))));
});
function Qa(t) {
  return Rt(t, ft()).map((a, n) => {
    if (typeof a == "string") return a;
    {
      const c = a.content.toString(), r = a.type === "url" ? /^http(s?):\/\//.test(c) ? c : `https://${c}` : `mailto:${c}`;
      return /* @__PURE__ */ e.createElement("a", {
        className: "lk-chat-link",
        key: n,
        href: r,
        target: "_blank",
        rel: "noreferrer"
      }, c);
    }
  });
}
function $e({ messageFormatter: t, messageDecoder: a, messageEncoder: n, channelTopic: c, ...r }) {
  const i = e.useRef(null), o = e.useRef(null), { chatMessages: l, send: s, isSending: d } = Tt(e.useMemo(() => ({
    messageDecoder: a,
    messageEncoder: n,
    channelTopic: c
  }), [
    a,
    n,
    c
  ])), u = de(), h = e.useRef(0);
  async function m(g) {
    g.preventDefault(), o.current && o.current.value.trim() !== "" && (await s(o.current.value), o.current.value = "", o.current.focus());
  }
  return e.useEffect(() => {
    i && i.current?.scrollTo({ top: i.current.scrollHeight });
  }, [i, l]), e.useEffect(() => {
    if (!u || l.length === 0) return;
    if (u.widget.state?.showChat && l.length > 0 && h.current !== l[l.length - 1]?.timestamp) {
      h.current = l[l.length - 1]?.timestamp;
      return;
    }
    const g = l.filter((E) => !h.current || E.timestamp > h.current).length, { widget: f } = u;
    g > 0 && f.state?.unreadMessages !== g && f.dispatch?.({
      msg: "unread_msg",
      count: g
    });
  }, [l, u?.widget]), /* @__PURE__ */ e.createElement("div", {
    ...r,
    className: "lk-chat"
  }, /* @__PURE__ */ e.createElement("div", { className: "lk-chat-header" }, "Messages", u && /* @__PURE__ */ e.createElement(Te, { className: "lk-close-button" }, /* @__PURE__ */ e.createElement(Jt, null))), /* @__PURE__ */ e.createElement("ul", {
    className: "lk-list lk-chat-messages",
    ref: i
  }, r.children ? l.map((g, f) => fe(r.children, {
    entry: g,
    key: g.id ?? f,
    messageFormatter: t
  })) : l.map((g, f, E) => {
    const p = f >= 1 && E[f - 1].from === g.from, C = f >= 1 && g.timestamp - E[f - 1].timestamp < 6e4;
    return /* @__PURE__ */ e.createElement(Fa, {
      key: g.id ?? f,
      hideName: p,
      hideTimestamp: p === !1 ? !1 : C,
      entry: g,
      messageFormatter: t
    });
  })), /* @__PURE__ */ e.createElement("form", {
    className: "lk-chat-form",
    onSubmit: m
  }, /* @__PURE__ */ e.createElement("input", {
    className: "lk-form-control lk-chat-form-input",
    disabled: d,
    ref: o,
    type: "text",
    placeholder: "Enter a message...",
    onInput: (g) => g.stopPropagation(),
    onKeyDown: (g) => g.stopPropagation(),
    onKeyUp: (g) => g.stopPropagation()
  }), /* @__PURE__ */ e.createElement("button", {
    type: "submit",
    className: "lk-button lk-chat-form-button",
    disabled: d
  }, "Send")));
}
function Z({ kind: t, initialSelection: a, onActiveDeviceChange: n, tracks: c, requestPermissions: r = !1, ...i }) {
  const [o, l] = e.useState(!1), [s, d] = e.useState([]), [u, h] = e.useState(!0), [m, g] = e.useState(r), f = (k, R) => {
    P.debug("handle device change"), l(!1), n?.(k, R);
  }, E = e.useRef(null), p = e.useRef(null);
  e.useLayoutEffect(() => {
    o && g(!0);
  }, [o]), e.useLayoutEffect(() => {
    let k;
    return E.current && p.current && (s || u) && (k = Ye(E.current, p.current, (R, M) => {
      p.current && Object.assign(p.current.style, {
        left: `${R}px`,
        top: `${M}px`
      });
    })), h(!1), () => {
      k?.();
    };
  }, [
    E,
    p,
    s,
    u
  ]);
  const C = e.useCallback((k) => {
    p.current && k.target !== E.current && o && bt(p.current, k) && l(!1);
  }, [
    o,
    p,
    E
  ]);
  return e.useEffect(() => (document.addEventListener("click", C), () => {
    document.removeEventListener("click", C);
  }), [C]), /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("button", {
    className: "lk-button lk-button-menu",
    "aria-pressed": o,
    ...i,
    onClick: () => l(!o),
    ref: E
  }, i.children), !i.disabled && /* @__PURE__ */ e.createElement("div", {
    className: "lk-device-menu",
    ref: p,
    style: { visibility: o ? "visible" : "hidden" }
  }, t ? /* @__PURE__ */ e.createElement(ce, {
    initialSelection: a,
    onActiveDeviceChange: (k) => f(t, k),
    onDeviceListChange: d,
    kind: t,
    track: c?.[t],
    requestPermissions: m
  }) : /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("div", { className: "lk-device-menu-heading" }, "Audio inputs"), /* @__PURE__ */ e.createElement(ce, {
    kind: "audioinput",
    onActiveDeviceChange: (k) => f("audioinput", k),
    onDeviceListChange: d,
    track: c?.audioinput,
    requestPermissions: m
  }), /* @__PURE__ */ e.createElement("div", { className: "lk-device-menu-heading" }, "Video inputs"), /* @__PURE__ */ e.createElement(ce, {
    kind: "videoinput",
    onActiveDeviceChange: (k) => f("videoinput", k),
    onDeviceListChange: d,
    track: c?.videoinput,
    requestPermissions: m
  }))));
}
function ge() {
  e.useEffect(() => {
    St();
  }, []);
}
function Oa(t, a) {
  const [n, c] = e.useState(), r = e.useMemo(() => new $t(), []);
  return e.useEffect(() => {
    let i = !1, o = [];
    return r.lock().then(async (l) => {
      try {
        (t.audio || t.video) && (o = await jt(t), i ? o.forEach((s) => s.stop()) : c(o));
      } catch (s) {
        a && s instanceof Error ? a(s) : P.error(s);
      } finally {
        l();
      }
    }), () => {
      i = !0, o.forEach((l) => {
        l.stop();
      });
    };
  }, [
    JSON.stringify(t, It),
    a,
    r
  ]), n;
}
function Ga(t, a, n) {
  const [c, r] = e.useState(null), [i, o] = e.useState(!1), l = Et({ kind: n }), [s, d] = e.useState(void 0), [u, h] = e.useState(), [m, g] = e.useState(a);
  e.useEffect(() => {
    g(a);
  }, [a]);
  const f = async (C, k) => {
    try {
      const R = k === "videoinput" ? await qt({
        deviceId: C,
        resolution: Ht.h720.resolution
      }) : await Ut({ deviceId: C }), M = await R.getDeviceId(!1);
      M && C !== M && (p.current = M, g(M)), h(R);
    } catch (R) {
      R instanceof Error && r(R);
    }
  }, E = async (C, k) => {
    await C.setDeviceId(k), p.current = k;
  }, p = e.useRef(m);
  return e.useEffect(() => {
    t && !u && !c && !i && (P.debug("creating track", n), o(!0), f(m, n).finally(() => {
      o(!1);
    }));
  }, [
    t,
    u,
    c,
    i
  ]), e.useEffect(() => {
    u && (t ? s?.deviceId && p.current !== s?.deviceId ? (P.debug(`switching ${n} device from`, p.current, s.deviceId), E(u, s.deviceId)) : (P.debug(`unmuting local ${n} track`), u.unmute()) : (P.debug(`muting ${n} track`), u.mute().then(() => P.debug(u.mediaStreamTrack))));
  }, [
    u,
    s,
    t,
    n
  ]), e.useEffect(() => () => {
    u && (P.debug(`stopping local ${n} track`), u.stop(), u.mute());
  }, []), e.useEffect(() => {
    d(l?.find((C) => C.deviceId === m));
  }, [m, l]), {
    selectedDevice: s,
    localTrack: u,
    deviceError: c
  };
}
function Ka({ defaults: t = {}, onValidate: a, onSubmit: n, onError: c, debug: r, joinLabel: i = "Join Room", micLabel: o = "Microphone", camLabel: l = "Camera", userLabel: s = "Username", persistUserChoices: d = !0, videoProcessor: u, ...h }) {
  const { userChoices: m, saveAudioInputDeviceId: g, saveAudioInputEnabled: f, saveVideoInputDeviceId: E, saveVideoInputEnabled: p, saveUsername: C } = oe({
    defaults: t,
    preventSave: !d,
    preventLoad: !d
  }), [k, R] = e.useState(m), [M, D] = e.useState(k.audioEnabled), [v, w] = e.useState(k.videoEnabled), [b, T] = e.useState(k.audioDeviceId), [V, B] = e.useState(k.videoDeviceId), [x, N] = e.useState(k.username);
  e.useEffect(() => {
    f(M);
  }, [M, f]), e.useEffect(() => {
    p(v);
  }, [v, p]), e.useEffect(() => {
    g(b);
  }, [b, g]), e.useEffect(() => {
    E(V);
  }, [V, E]), e.useEffect(() => {
    C(x);
  }, [x, C]);
  const L = Oa({
    audio: M ? { deviceId: m.audioDeviceId } : !1,
    video: v ? {
      deviceId: m.videoDeviceId,
      processor: u
    } : !1
  }, c), F = e.useRef(null), A = e.useMemo(() => L?.filter((y) => y.kind === S.Kind.Video)[0], [L]), _ = e.useMemo(() => {
    if (A) {
      const { facingMode: y } = Wt(A);
      return y;
    } else return "undefined";
  }, [A]), H = e.useMemo(() => L?.filter((y) => y.kind === S.Kind.Audio)[0], [L]);
  e.useEffect(() => (F.current && A && (A.unmute(), A.attach(F.current)), () => {
    A?.detach();
  }), [A]);
  const [Q, te] = e.useState(), G = e.useCallback((y) => typeof a == "function" ? a(y) : y.username !== "", [a]);
  e.useEffect(() => {
    const y = {
      username: x,
      videoEnabled: v,
      videoDeviceId: V,
      audioEnabled: M,
      audioDeviceId: b
    };
    R(y), te(G(y));
  }, [
    x,
    v,
    G,
    M,
    b,
    V
  ]);
  function X(y) {
    y.preventDefault(), G(k) ? typeof n == "function" && n(k) : P.warn("Validation failed with: ", k);
  }
  return ge(), /* @__PURE__ */ e.createElement("div", {
    className: "lk-prejoin",
    ...h
  }, /* @__PURE__ */ e.createElement("div", { className: "lk-video-container" }, A && /* @__PURE__ */ e.createElement("video", {
    ref: F,
    width: "1280",
    height: "720",
    "data-lk-facing-mode": _
  }), (!A || !v) && /* @__PURE__ */ e.createElement("div", { className: "lk-camera-off-note" }, /* @__PURE__ */ e.createElement(Ve, null))), /* @__PURE__ */ e.createElement("div", { className: "lk-button-group-container" }, /* @__PURE__ */ e.createElement("div", { className: "lk-button-group audio" }, /* @__PURE__ */ e.createElement(j, {
    initialState: M,
    source: S.Source.Microphone,
    onChange: (y) => D(y)
  }, o), /* @__PURE__ */ e.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ e.createElement(Z, {
    initialSelection: b,
    kind: "audioinput",
    disabled: !H,
    tracks: { audioinput: H },
    onActiveDeviceChange: (y, U) => T(U)
  }))), /* @__PURE__ */ e.createElement("div", { className: "lk-button-group video" }, /* @__PURE__ */ e.createElement(j, {
    initialState: v,
    source: S.Source.Camera,
    onChange: (y) => w(y)
  }, l), /* @__PURE__ */ e.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ e.createElement(Z, {
    initialSelection: V,
    kind: "videoinput",
    disabled: !A,
    tracks: { videoinput: A },
    onActiveDeviceChange: (y, U) => B(U)
  })))), /* @__PURE__ */ e.createElement("form", { className: "lk-username-container" }, /* @__PURE__ */ e.createElement("input", {
    className: "lk-form-control",
    id: "username",
    name: "username",
    type: "text",
    defaultValue: x,
    placeholder: s,
    onChange: (y) => N(y.target.value),
    autoComplete: "off"
  }), /* @__PURE__ */ e.createElement("button", {
    className: "lk-button lk-join-button",
    type: "submit",
    onClick: X,
    disabled: !Q
  }, i)), r && /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("strong", null, "User Choices:"), /* @__PURE__ */ e.createElement("ul", {
    className: "lk-list",
    style: {
      overflow: "hidden",
      maxWidth: "15rem"
    }
  }, /* @__PURE__ */ e.createElement("li", null, "Username: ", `${k.username}`), /* @__PURE__ */ e.createElement("li", null, "Video Enabled: ", `${k.videoEnabled}`), /* @__PURE__ */ e.createElement("li", null, "Audio Enabled: ", `${k.audioEnabled}`), /* @__PURE__ */ e.createElement("li", null, "Video Device: ", `${k.videoDeviceId}`), /* @__PURE__ */ e.createElement("li", null, "Audio Device: ", `${k.audioDeviceId}`))));
}
function _a({ props: t }) {
  const { dispatch: a, state: n } = Qe().widget, c = "lk-button lk-settings-toggle";
  return { mergedProps: e.useMemo(() => yt(t, {
    className: c,
    onClick: () => {
      a && a({ msg: "toggle_settings" });
    },
    "aria-pressed": n?.showSettings ? "true" : "false"
  }), [
    t,
    c,
    a,
    n
  ]) };
}
var $a = /* @__PURE__ */ e.forwardRef(function(a, n) {
  const { mergedProps: c } = _a({ props: a });
  return /* @__PURE__ */ e.createElement("button", {
    ref: n,
    ...c
  }, a.children);
}), Ba = (t) => {
  switch (t) {
    case S.Source.Camera:
      return 1;
    case S.Source.Microphone:
      return 2;
    case S.Source.ScreenShare:
      return 3;
    default:
      return 0;
  }
};
function Be({ variation: t, controls: a, saveUserChoices: n = !0, onDeviceError: c, ...r }) {
  const [i, o] = e.useState(!1), l = de();
  e.useEffect(() => {
    l?.widget.state?.showChat !== void 0 && o(l?.widget.state?.showChat);
  }, [l?.widget.state?.showChat]);
  const s = Qt(`(max-width: ${i ? 1e3 : 760}px)`) ? "minimal" : "verbose";
  t ?? (t = s);
  const d = {
    leave: !0,
    ...a
  }, u = Ce();
  if (!u)
    d.camera = !1, d.chat = !1, d.microphone = !1, d.screenShare = !1;
  else {
    const b = (T) => u.canPublish && (u.canPublishSources.length === 0 || u.canPublishSources.includes(Ba(T)));
    d.camera ?? (d.camera = b(S.Source.Camera)), d.microphone ?? (d.microphone = b(S.Source.Microphone)), d.screenShare ?? (d.screenShare = b(S.Source.ScreenShare)), d.chat ?? (d.chat = u.canPublishData && a?.chat);
  }
  const h = e.useMemo(() => t === "minimal" || t === "verbose", [t]), m = e.useMemo(() => t === "textOnly" || t === "verbose", [t]), g = Vt(), [f, E] = e.useState(!1), p = e.useCallback((b) => {
    E(b);
  }, [E]), C = z({ className: "lk-control-bar" }, r), { saveAudioInputEnabled: k, saveVideoInputEnabled: R, saveAudioInputDeviceId: M, saveVideoInputDeviceId: D } = oe({ preventSave: !n }), v = e.useCallback((b, T) => T ? k(b) : null, [k]), w = e.useCallback((b, T) => T ? R(b) : null, [R]);
  return /* @__PURE__ */ e.createElement("div", C, d.microphone && /* @__PURE__ */ e.createElement("div", { className: "lk-button-group" }, /* @__PURE__ */ e.createElement(j, {
    source: S.Source.Microphone,
    showIcon: h,
    onChange: v,
    onDeviceError: (b) => c?.({
      source: S.Source.Microphone,
      error: b
    })
  }, m && "Microphone"), /* @__PURE__ */ e.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ e.createElement(Z, {
    kind: "audioinput",
    onActiveDeviceChange: (b, T) => M(T ?? "default")
  }))), d.camera && /* @__PURE__ */ e.createElement("div", { className: "lk-button-group" }, /* @__PURE__ */ e.createElement(j, {
    source: S.Source.Camera,
    showIcon: h,
    onChange: w,
    onDeviceError: (b) => c?.({
      source: S.Source.Camera,
      error: b
    })
  }, m && "Camera"), /* @__PURE__ */ e.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ e.createElement(Z, {
    kind: "videoinput",
    onActiveDeviceChange: (b, T) => D(T ?? "default")
  }))), d.screenShare && g && /* @__PURE__ */ e.createElement(j, {
    source: S.Source.ScreenShare,
    captureOptions: {
      audio: !0,
      selfBrowserSurface: "include"
    },
    showIcon: h,
    onChange: p,
    onDeviceError: (b) => c?.({
      source: S.Source.ScreenShare,
      error: b
    })
  }, m && (f ? "Stop screen share" : "Share screen")), d.chat && /* @__PURE__ */ e.createElement(Te, null, h && /* @__PURE__ */ e.createElement(Zt, null), m && "Chat"), d.settings && /* @__PURE__ */ e.createElement($a, null, h && /* @__PURE__ */ e.createElement(Yt, null), m && "Settings"), d.leave && /* @__PURE__ */ e.createElement(Pe, null, h && /* @__PURE__ */ e.createElement(ea, null), m && "Leave"), /* @__PURE__ */ e.createElement(Ne, null));
}
function Ja({ chatMessageFormatter: t, chatMessageDecoder: a, chatMessageEncoder: n, SettingsComponent: c, ...r }) {
  const [i, o] = e.useState({
    showChat: !1,
    unreadMessages: 0,
    showSettings: !1
  }), l = e.useRef(null), s = me([{
    source: S.Source.Camera,
    withPlaceholder: !0
  }, {
    source: S.Source.ScreenShare,
    withPlaceholder: !1
  }], {
    updateOnlyOn: [Ie.ActiveSpeakersChanged],
    onlySubscribed: !1
  }), d = (f) => {
    P.debug("updating widget state", f), o(f);
  }, u = rt(), h = s.filter($).filter((f) => f.publication.source === S.Source.ScreenShare), m = mt(u)?.[0], g = s.filter((f) => !tt(f, m));
  return e.useEffect(() => {
    if (h.some((f) => f.publication.isSubscribed) && l.current === null ? (P.debug("Auto set screen share focus:", { newScreenShareTrack: h[0] }), u.pin.dispatch?.({
      msg: "set_pin",
      trackReference: h[0]
    }), l.current = h[0]) : l.current && !h.some((f) => f.publication.trackSid === l.current?.publication?.trackSid) && (P.debug("Auto clearing screen share focus."), u.pin.dispatch?.({ msg: "clear_pin" }), l.current = null), m && !$(m)) {
      const f = s.find((E) => E.participant.identity === m.participant.identity && E.source === m.source);
      f !== m && $(f) && u.pin.dispatch?.({
        msg: "set_pin",
        trackReference: f
      });
    }
  }, [
    h.map((f) => `${f.publication.trackSid}_${f.publication.isSubscribed}`).join(),
    m?.publication?.trackSid,
    s
  ]), ge(), /* @__PURE__ */ e.createElement("div", {
    className: "lk-video-conference",
    ...r
  }, kt() && /* @__PURE__ */ e.createElement(Oe, {
    value: u,
    onWidgetChange: d
  }, /* @__PURE__ */ e.createElement("div", { className: "lk-video-conference-inner" }, m ? /* @__PURE__ */ e.createElement("div", { className: "lk-focus-layout-wrapper" }, /* @__PURE__ */ e.createElement(ba, null, /* @__PURE__ */ e.createElement(Ta, { tracks: g }, /* @__PURE__ */ e.createElement(ie, null)), m && /* @__PURE__ */ e.createElement(Sa, { trackRef: m }))) : /* @__PURE__ */ e.createElement("div", { className: "lk-grid-layout-wrapper" }, /* @__PURE__ */ e.createElement(Ma, { tracks: s }, /* @__PURE__ */ e.createElement(ie, null))), /* @__PURE__ */ e.createElement(Be, { controls: {
    chat: !0,
    settings: !!c
  } })), /* @__PURE__ */ e.createElement($e, {
    style: { display: i.showChat ? "grid" : "none" },
    messageFormatter: t,
    messageEncoder: n,
    messageDecoder: a
  }), c && /* @__PURE__ */ e.createElement("div", {
    className: "lk-settings-menu-modal",
    style: { display: i.showSettings ? "block" : "none" }
  }, /* @__PURE__ */ e.createElement(c, null))), /* @__PURE__ */ e.createElement(Pa, null), /* @__PURE__ */ e.createElement(za, null));
}
function Za({ ...t }) {
  const [a, n] = e.useState({
    showChat: !1,
    unreadMessages: 0
  }), c = me([S.Source.Microphone]);
  return ge(), /* @__PURE__ */ e.createElement(Oe, { onWidgetChange: n }, /* @__PURE__ */ e.createElement("div", {
    className: "lk-audio-conference",
    ...t
  }, /* @__PURE__ */ e.createElement("div", { className: "lk-audio-conference-stage" }, /* @__PURE__ */ e.createElement(ve, { tracks: c }, /* @__PURE__ */ e.createElement(Va, null))), /* @__PURE__ */ e.createElement(Be, { controls: {
    microphone: !0,
    screenShare: !1,
    camera: !1,
    chat: !0
  } }), a.showChat && /* @__PURE__ */ e.createElement($e, null)));
}
function Xa({ controls: t, saveUserChoices: a = !0, onDeviceError: n, ...c }) {
  const r = {
    leave: !0,
    microphone: !0,
    ...t
  }, i = Ce(), { microphoneTrack: o, localParticipant: l } = Mt(), s = e.useMemo(() => ({
    participant: l,
    source: S.Source.Microphone,
    publication: o
  }), [l, o]);
  i ? r.microphone ?? (r.microphone = i.canPublish) : r.microphone = !1;
  const d = z({ className: "lk-agent-control-bar" }, c), { saveAudioInputEnabled: u, saveAudioInputDeviceId: h } = oe({ preventSave: !a }), m = e.useCallback((g, f) => {
    f && u(g);
  }, [u]);
  return /* @__PURE__ */ e.createElement("div", d, r.microphone && /* @__PURE__ */ e.createElement("div", { className: "lk-button-group" }, /* @__PURE__ */ e.createElement(j, {
    source: S.Source.Microphone,
    showIcon: !0,
    onChange: m,
    onDeviceError: (g) => n?.({
      source: S.Source.Microphone,
      error: g
    })
  }, /* @__PURE__ */ e.createElement(_e, {
    trackRef: s,
    barCount: 7,
    options: { minHeight: 5 }
  })), /* @__PURE__ */ e.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ e.createElement(Z, {
    kind: "audioinput",
    onActiveDeviceChange: (g, f) => h(f ?? "default")
  }))), r.leave && /* @__PURE__ */ e.createElement(Pe, null, "Disconnect"), /* @__PURE__ */ e.createElement(Ne, null));
}
export {
  Kt as $,
  le as A,
  ia as B,
  Ea as C,
  pa as D,
  he as E,
  ua as F,
  aa as G,
  ca as H,
  oa as I,
  Yt as J,
  ta as K,
  ke as L,
  j as M,
  Ne as N,
  Ve as O,
  ce as P,
  Jt as Q,
  sa as R,
  ba as S,
  ka as T,
  ra as U,
  la as V,
  na as W,
  Ee as X,
  Xt as Y,
  Zt as Z,
  Oe as _,
  Ka as a,
  ve as b,
  Z as c,
  Qa as d,
  Gt as et,
  za as f,
  Pa as g,
  Aa as h,
  Be as i,
  Le as j,
  De as k,
  $e as l,
  _e as m,
  Za as n,
  Te as nt,
  Ga as o,
  Va as p,
  ea as q,
  Ja as r,
  Oa as s,
  Xa as t,
  Pe as tt,
  Fa as u,
  Ta as v,
  ie as w,
  Sa as x,
  Ma as y,
  Ae as z
};

//# sourceMappingURL=prefabs-BEB1UEnC.mjs.map