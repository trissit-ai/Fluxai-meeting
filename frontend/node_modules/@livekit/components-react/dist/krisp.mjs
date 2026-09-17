import { Qt as c, et as b } from "./room-Bfb4OWAI.mjs";
import "./index.mjs";
import * as r from "react";
import { LocalAudioTrack as P } from "livekit-client";
function N(l = {}) {
  const [i, f] = r.useState(!1), [u, o] = r.useState(!1), [p, n] = r.useState(!1);
  let t = b().microphoneTrack;
  const [s, d] = r.useState();
  l.trackRef && (t = l.trackRef.publication);
  const k = r.useCallback(async (e) => {
    if (e) {
      const { KrispNoiseFilter: a, isKrispNoiseFilterSupported: m } = await import("@livekit/krisp-noise-filter");
      if (!m()) {
        c.warn("LiveKit-Krisp noise filter is not supported in this browser");
        return;
      }
      s || d(a(l.filterOptions));
    }
    f((a) => (a !== e && o(!0), e));
  }, []);
  return r.useEffect(() => {
    if (t && t.track instanceof P && s) {
      const e = t.track.getProcessor();
      e && e.name === "livekit-noise-filter" ? (o(!0), e.setEnabled(i).finally(() => {
        o(!1), n(i);
      })) : !e && i && (o(!0), t?.track?.setProcessor(s).then(() => s.setEnabled(i)).then(() => {
        n(!0);
      }).catch((a) => {
        n(!1), c.error("Krisp hook: error enabling filter", a);
      }).finally(() => {
        o(!1);
      }));
    }
  }, [
    i,
    t,
    s
  ]), {
    setNoiseFilterEnabled: k,
    isNoiseFilterEnabled: p,
    isNoiseFilterPending: u,
    processor: s
  };
}
export {
  N as useKrispNoiseFilter
};

//# sourceMappingURL=krisp.mjs.map