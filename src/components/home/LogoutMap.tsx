import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { MockPeople } from "../../constants/mockPeople";
import { UserMarker } from "./UserMarker";
import ReactDOMServer from "react-dom/server";
import { useSelectedUserStore } from "../../store/useSelectedUserStore";
import { useHomeStore } from "../../store/homeStore";

declare global {
  interface Window {
    kakao: any;
  }
}

const API_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;
const KAKAO_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&libraries=services&autoload=false`;

const SSU_LOCATION = { lat: 37.4963538, lng: 126.9572222 };

const loadKakaoMap = () =>
  new Promise<typeof window.kakao>((resolve, reject) => {
    if (window.kakao?.maps) return resolve(window.kakao);
    const s = document.createElement("script");
    s.src = KAKAO_URL;
    s.async = true;
    s.onload = () => resolve(window.kakao);
    s.onerror = () => reject(new Error("Failed to load Kakao Maps API"));
    document.head.appendChild(s);
  });

export function LogoutMap() {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const userMarkerRef = useRef<any[]>([]);
  const watchIdRef = useRef<number | null>(null);
  const [isPWA, setIsPWA] = useState(false);
  const isModalOpen = useAuthStore((state) => state.isModalOpen);
  const isOpen = isModalOpen;
  console.log(isOpen);

  // 커스텀 마커 HTML
  const markerHtml = `
    <div style="
      transform: translate(-50%, -50%);
      width: 36px; height: 36px; display:flex; align-items:center; justify-content:center;
      background:#fff; border-radius:9999px; border:2px solid #3b82f6;
      box-shadow:0 6px 18px rgba(0,0,0,.18); font-size:18px;">📍</div>
  `;

  useEffect(() => {
    // PWA 환경 감지
    const checkPWA = () => {
      return (
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone ||
        document.referrer.includes("android-app://")
      );
    };

    setIsPWA(checkPWA());
  }, []);

  useEffect(() => {
    (async () => {
      const kakao = await loadKakaoMap();
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        if (!container) return;

        const map = new kakao.maps.Map(container, {
          center: new kakao.maps.LatLng(SSU_LOCATION.lat, SSU_LOCATION.lng),
          level: 4,
          draggable: true,
          scrollwheel: true,
        });
        mapRef.current = map;

        const initialPos = new kakao.maps.LatLng(
          SSU_LOCATION.lat,
          SSU_LOCATION.lng
        );
        const marker = new kakao.maps.CustomOverlay({
          position: initialPos,
          content: markerHtml,
          yAnchor: 0.5,
          xAnchor: 0.5,
          map,
        });

        MockPeople.forEach((user) => {
          const userLatLng = new kakao.maps.LatLng(
            user.latitude,
            user.longitude
          );

          const htmlString = ReactDOMServer.renderToString(
            <UserMarker emoji={user.emoji} status="online" />
          );

          const wrapper = document.createElement("div");
          wrapper.innerHTML = htmlString;

          const userMarker = new kakao.maps.CustomOverlay({
            position: userLatLng,
            content: wrapper,
            yAnchor: 0.5,
            xAnchor: 0.5,
            map,
          });

          const markerEl = wrapper.firstChild as HTMLElement;

          if (markerEl) {
            markerEl.style.pointerEvents = "auto"; // 가장 중요
            markerEl.style.cursor = "pointer";

            markerEl.addEventListener("click", () => {
              const { setSelectedUser } = useSelectedUserStore.getState();
              const { setCheckProfile } = useHomeStore.getState();

              setSelectedUser(user);
              setCheckProfile(true);
            });
          }
          userMarkerRef.current.push(userMarker);
        });

        markerRef.current = marker;
      });
    })();

    return () => {
      if (watchIdRef.current !== null) {
        try {
          navigator.geolocation.clearWatch(watchIdRef.current);
        } catch (err) {
          console.error(err);
        }
      }
      if (markerRef.current) markerRef.current.setMap(null);
      if (mapRef.current) mapRef.current = null;
      if (userMarkerRef.current) {
        userMarkerRef.current.forEach((m) => m.setMap(null));
        userMarkerRef.current = [];
      }
    };
  }, []);

  return (
    <div
      className="w-full z-0 overflow-hidden"
      style={{ height: isPWA && !isOpen ? "calc(100% + 34px)" : "100%" }}
    >
      <div
        id="map"
        className="w-full h-full transform-gpu [filter:grayscale(30%)_saturate(90%)_brightness(105%)]"
        style={{
          transformOrigin: "center center",
          height: isPWA && !isOpen ? "calc(100% + 34px)" : "100%",
        }}
      />
    </div>
  );
}
