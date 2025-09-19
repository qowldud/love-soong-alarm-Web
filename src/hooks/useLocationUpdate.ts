import { useEffect, useRef } from "react";
import { distanceMeters } from "./utils";

type LatLng = { lat: number; lng: number };

type Options = {
  intervalMs?: number;
  thresholdMeters?: number;
  enabled?: boolean;
  getCurrent: () => LatLng | null | undefined;
  post: (p: { latitude: number; longitude: number }) => Promise<any>;
  silentFail?: boolean;
};

/**
 * 3초마다 위치 추적,
 * 처음 유효 좌표가 들어오면 그 좌표를 '저장된 위치'로 설정,
 * 이후에는 '저장된 위치'와만 비교하다가 threshold 이상 움직였을 때만 post하고
 * 그때 '저장된 위치'를 갱신.
 */
export function useStepLocationUpdate({
  intervalMs = 3000,
  thresholdMeters = 5,
  enabled = true,
  getCurrent,
  post,
  silentFail = true,
}: Options) {
  const savedRef = useRef<LatLng | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let timer: number | null = null;

    const tick = async () => {
      const cur = getCurrent?.();
      if (!cur) return;

      if (!savedRef.current) {
        savedRef.current = { lat: cur.lat, lng: cur.lng };
        return;
      }

      const s = savedRef.current;
      const dist = distanceMeters(s.lat, s.lng, cur.lat, cur.lng);

      if (dist >= thresholdMeters) {
        try {
          await post({ latitude: cur.lat, longitude: cur.lng });
          savedRef.current = { lat: cur.lat, lng: cur.lng };
        } catch (e) {
          if (!silentFail) throw e;
        }
      }
    };

    void tick();
    timer = window.setInterval(tick, intervalMs);

    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [enabled, intervalMs, thresholdMeters, getCurrent, post, silentFail]);

  return {
    getSaved: () => savedRef.current,
    resetSaved: () => {
      savedRef.current = null;
    },
    setSaved: (p: LatLng) => {
      savedRef.current = { ...p };
    },
  };
}
