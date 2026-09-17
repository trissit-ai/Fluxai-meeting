import { $ as x, $t as E, A as R, At as L, B as M, Bt as b, C as A, Ct as w, D, Dt as B, E as F, Et as V, F as N, Ft as Q, G as U, H as G, I as W, It as z, J as _, K as O, L as $, Lt as H, M as K, Mt as j, N as q, Nt as l, O as J, Ot as d, P as X, Pt as Y, Q as Z, R as g, Rt as ee, S as ae, St as se, T as v, Tt as C, U as te, V as S, Vt as oe, W as ne, X as ie, Y as re, Yt as ce, Z as ue, _ as le, _t as de, a as ge, b as ve, bt as m, c as Ce, ct as Se, d as me, dt as Ie, en as Pe, et as Te, f as pe, ft as fe, g as he, h as ye, ht as I, i as ke, j as xe, jt as Ee, k as Re, kt as Le, l as Me, lt as be, m as Ae, mt as we, n as De, nt as P, o as Be, ot as Fe, p as Ve, pt as T, q as Ne, r as Qe, s as Ue, st as Ge, t as We, tt as ze, u as _e, ut as Oe, v as $e, vt as He, w as Ke, wt as p, x as je, xt as qe, y as Je, yt as Xe, z as Ye, zt as Ze } from "./room-Bfb4OWAI.mjs";
import { $ as aa, A as sa, B as ta, C as oa, D as na, E as ia, F as ra, G as ca, H as ua, I as la, J as da, K as ga, L as va, M as Ca, N as Sa, O as ma, P as Ia, Q as Pa, R as Ta, S as pa, T as fa, U as ha, V as ya, W as ka, X as xa, Y as Ea, Z as Ra, _ as La, a as Ma, b as ba, c as Aa, d as wa, et as Da, f as Ba, g as Fa, h as Va, i as Na, j as Qa, k as Ua, l as Ga, m as Wa, n as za, nt as _a, o as Oa, p as $a, q as Ha, r as Ka, s as ja, t as qa, tt as Ja, u as Xa, v as Ya, w as Za, x as es, y as as, z as ss } from "./prefabs-BEB1UEnC.mjs";
import * as e from "react";
var ts = /* @__PURE__ */ e.forwardRef(function(s, a) {
  const { buttonProps: o } = I(s);
  return /* @__PURE__ */ e.createElement("button", {
    ref: a,
    ...o
  }, s.children);
}), os = /* @__PURE__ */ e.forwardRef(function({ room: s, ...a }, o) {
  const n = T(s);
  return /* @__PURE__ */ e.createElement("div", {
    ref: o,
    ...a
  }, n);
}), ns = /* @__PURE__ */ e.forwardRef(function({ label: s = "Allow Audio", ...a }, o) {
  const { mergedProps: n } = g({
    room: C(a.room),
    props: a
  });
  return /* @__PURE__ */ e.createElement("button", {
    ref: o,
    ...n
  }, s);
}), is = /* @__PURE__ */ e.forwardRef(function({ trackRef: s, ...a }, o) {
  const u = v(l(s), {
    bands: 7,
    loPass: 300
  });
  return /* @__PURE__ */ e.createElement("svg", {
    ref: o,
    width: "100%",
    height: "100%",
    viewBox: "0 0 200 90",
    ...a,
    className: "lk-audio-visualizer"
  }, /* @__PURE__ */ e.createElement("rect", {
    x: "0",
    y: "0",
    width: "100%",
    height: "100%"
  }), /* @__PURE__ */ e.createElement("g", { style: { transform: `translate(${130 / 2}px, 0)` } }, u.map((r, c) => /* @__PURE__ */ e.createElement("rect", {
    key: c,
    x: c * 10,
    y: 90 / 2 - r * 50 / 2,
    width: 6,
    height: r * 50
  }))));
});
function rs({ participants: t, ...s }) {
  return /* @__PURE__ */ e.createElement(e.Fragment, null, t.map((a) => /* @__PURE__ */ e.createElement(d.Provider, {
    value: a,
    key: a.identity
  }, P(s.children))));
}
var cs = /* @__PURE__ */ e.forwardRef(function({ childrenPosition: s = "before", children: a, ...o }, n) {
  const { name: i } = S();
  return /* @__PURE__ */ e.createElement("span", {
    ref: n,
    ...o
  }, s === "before" && a, i, s === "after" && a);
});
function us(t) {
  return /* @__PURE__ */ e.createElement(m.Provider, { value: t.session }, /* @__PURE__ */ e.createElement(p.Provider, { value: t.session.room }, t.children));
}
export {
  Me as AgentEvent,
  za as AudioConference,
  ia as AudioTrack,
  is as AudioVisualizer,
  Wa as BarVisualizer,
  Da as CameraDisabledIcon,
  aa as CameraIcon,
  Ya as CarouselLayout,
  Ga as Chat,
  Pa as ChatCloseIcon,
  Xa as ChatEntry,
  Ra as ChatIcon,
  _a as ChatToggle,
  xa as Chevron,
  ts as ClearPinButton,
  Qa as ConnectionQualityIndicator,
  os as ConnectionState,
  Ba as ConnectionStateToast,
  Na as ControlBar,
  pe as DEFAULT_MOOD_TTL_TURNS,
  Ja as DisconnectButton,
  Ve as EXPRESSION_ATTRIBUTE,
  es as FocusLayout,
  pa as FocusLayoutContainer,
  ra as FocusToggle,
  Ea as FocusToggleIcon,
  da as GearIcon,
  as as GridLayout,
  He as LKFeatureContext,
  z as LayoutContext,
  La as LayoutContextProvider,
  Ha as LeaveIcon,
  We as LiveKitRoom,
  ga as LockLockedIcon,
  Aa as MediaDeviceMenu,
  Ia as MediaDeviceSelect,
  Qe as MessagesEvent,
  ca as MicDisabledIcon,
  ka as MicIcon,
  $a as ParticipantAudioTile,
  d as ParticipantContext,
  oa as ParticipantContextIfNeeded,
  rs as ParticipantLoop,
  sa as ParticipantName,
  ma as ParticipantPlaceholder,
  Za as ParticipantTile,
  Ma as PreJoin,
  ha as QualityExcellentIcon,
  ua as QualityGoodIcon,
  ya as QualityPoorIcon,
  ta as QualityUnknownIcon,
  Fa as RoomAudioRenderer,
  p as RoomContext,
  cs as RoomName,
  ss as ScreenShareIcon,
  Ta as ScreenShareStopIcon,
  Be as SessionEvent,
  us as SessionProvider,
  va as SpinnerIcon,
  ns as StartAudio,
  Sa as StartMediaButton,
  Va as Toast,
  ba as TrackLoop,
  Ua as TrackMutedIndicator,
  j as TrackRefContext,
  fa as TrackRefContextIfNeeded,
  Ca as TrackToggle,
  la as UnfocusToggleIcon,
  Ka as VideoConference,
  na as VideoTrack,
  qa as VoiceAssistantControlBar,
  wa as formatChatMessageLinks,
  ce as isTrackReference,
  Ue as isUseSessionReturn,
  Ae as parseExpression,
  E as setLogExtension,
  Pe as setLogLevel,
  _e as useAgent,
  ye as useAgentExpression,
  de as useAudioPlayback,
  Ke as useAudioWaveform,
  Re as useChat,
  N as useChatToggle,
  I as useClearPinButton,
  we as useConnectionQualityIndicator,
  T as useConnectionState,
  H as useCreateLayoutContext,
  fe as useDataChannel,
  Ie as useDisconnectButton,
  ee as useEnsureCreateLayoutContext,
  Ze as useEnsureLayoutContext,
  Le as useEnsureParticipant,
  C as useEnsureRoom,
  qe as useEnsureSession,
  l as useEnsureTrackRef,
  ge as useEvents,
  Oe as useFacingMode,
  Xe as useFeatureContext,
  be as useFocusToggle,
  Se as useGridLayout,
  D as useIsEncrypted,
  Ge as useIsMuted,
  $e as useIsRecording,
  Fe as useIsSpeaking,
  b as useLayoutContext,
  ze as useLiveKitRoom,
  Te as useLocalParticipant,
  x as useLocalParticipantPermissions,
  oe as useMaybeLayoutContext,
  L as useMaybeParticipantContext,
  V as useMaybeRoomContext,
  se as useMaybeSessionContext,
  Y as useMaybeTrackRefContext,
  Z as useMediaDeviceSelect,
  ue as useMediaDevices,
  v as useMultibandTrackVolume,
  re as usePagination,
  ve as useParticipantAttribute,
  je as useParticipantAttributes,
  Ee as useParticipantContext,
  _ as useParticipantInfo,
  Ne as useParticipantPermissions,
  O as useParticipantTile,
  A as useParticipantTracks,
  ne as useParticipants,
  J as usePersistentUserChoices,
  te as usePinnedTracks,
  Oa as usePreviewDevice,
  ja as usePreviewTracks,
  G as useRemoteParticipant,
  U as useRemoteParticipants,
  B as useRoomContext,
  S as useRoomInfo,
  De as useRpc,
  me as useSequentialRoomConnectDisconnect,
  Ce as useSession,
  w as useSessionContext,
  ke as useSessionMessages,
  Ye as useSortedParticipants,
  M as useSpeakingParticipants,
  g as useStartAudio,
  $ as useStartVideo,
  W as useSwipe,
  le as useTextStream,
  X as useToken,
  R as useTrackByName,
  q as useTrackMutedIndicator,
  Q as useTrackRefContext,
  K as useTrackToggle,
  ae as useTrackTranscription,
  F as useTrackVolume,
  xe as useTracks,
  he as useTranscriptions,
  ie as useVisualStableUpdate,
  Je as useVoiceAssistant
};

//# sourceMappingURL=index.mjs.map