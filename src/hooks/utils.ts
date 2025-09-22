// 위치 계산하는 로직
// 현재 직선 5m 이동시에 update 하기 위해 직선거리 계산

import type { NearbyUserMarker } from "../types/User";

export const toRad = (deg: number) => (deg * Math.PI) / 180;

export const distanceMeters = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export function formatRelativeKo(input?: string | Date | null): string {
  if (input == null) return "";

  const toDate = (v: string | Date): Date | null => {
    if (v instanceof Date) return isNaN(v.getTime()) ? null : v;

    let raw = typeof v === "string" ? v : String(v ?? "");
    raw = raw.trim().replace(/"$/, "");

    if (!raw) return null;

    const fixed = raw.replace(/(\.\d{3})\d+/, "$1");

    const hasTZ = /[zZ]|[+\-]\d{2}:\d{2}$/.test(fixed);
    const iso = hasTZ ? fixed : `${fixed}Z`;

    const d = new Date(iso);
    return isNaN(d.getTime()) ? null : d;
  };

  const date = toDate(input as any);
  if (!date) return "";

  const now = new Date();
  let diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 0) diff = 0;

  if (diff < 60) return diff <= 3 ? "방금" : `${diff}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

export const SelectRandom = (lists: NearbyUserMarker[]): number => {
  const candidates = lists.filter((u) => u.isMatching);

  const idx = Math.floor(Math.random() * candidates.length);
  return candidates[idx].userId;
};
