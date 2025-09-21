// 위치 계산하는 로직
// 현재 직선 5m 이동시에 update 하기 위해 직선거리 계산

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

// utils/time.ts
export function formatRelativeKo(input: string | Date): string {
  const toDate = (v: string | Date): Date | null => {
    if (v instanceof Date) return v;

    let s = v.trim();
    s = s.replace(/(\.\d{3})\d+/, "$1");

    const d = new Date(s);
    return isNaN(d.getTime()) ? null : d;
  };

  const date = toDate(input);
  if (!date) return String(input);

  const now = new Date();
  let diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 0) diff = 0;

  if (diff < 60) {
    return diff <= 3 ? "방금" : `${diff}초 전`;
  }
  if (diff < 3600) {
    const m = Math.floor(diff / 60);
    return `${m}분 전`;
  }
  if (diff < 86400) {
    const h = Math.floor(diff / 3600);
    return `${h}시간 전`;
  }

  const d = Math.floor(diff / 86400);
  return `${d}일 전`;
}
