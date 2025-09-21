import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type JSX,
} from "react";
import { useAuthStore } from "../../store/authStore";
import type { User, UserProfile } from "../../types/User";
import { useSelectedUserStore } from "../../store/useSelectedUserStore";
import { useHomeStore } from "../../store/homeStore";
import { UserMarker } from "./UserMarker";
import ReactDOMServer from "react-dom/server";

declare global {
  interface Window {
    kakao: any;
  }
}

const API_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;
const KAKAO_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&libraries=services&autoload=false`;

const SSU_LOCATION = { lat: 37.37344496460528, lng: 126.96159700684552 };

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

interface MapCanvasRef {
  moveToCurrentLocation: () => void;
}

interface Props {
  users?: User[];
  myProfile?: UserProfile;
}

export const MapCanvas = forwardRef<MapCanvasRef, Props>(
  ({ users, myProfile }, ref): JSX.Element => {
    const mapRef = useRef<any>(null);
    const markerRef = useRef<any>(null);
    const userMarkerRef = useRef<any[]>([]);
    const watchIdRef = useRef<number | null>(null);
    const currentLocationRef = useRef<{ lat: number; lng: number } | null>(
      null
    );
    const [isPWA, setIsPWA] = useState(false);
    const isModalOpen = useAuthStore((state) => state.isModalOpen);
    const { selectedUser } = useSelectedUserStore();
    const isOpen = isModalOpen;
    console.log(users);

    const moveToCurrentLocation = () => {
      if (!mapRef.current || !currentLocationRef.current) return;

      const { lat, lng } = currentLocationRef.current;
      const position = new window.kakao.maps.LatLng(lat, lng);
      mapRef.current.panTo(position);
    };

    useImperativeHandle(ref, () => ({
      moveToCurrentLocation,
    }));

    // 내 마커 생성
    const createMyMarker = (kakao: typeof window.kakao, map: any) => {
      if (!myProfile) return;

      // 기존 마커 제거
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      const wrapper = document.createElement("div");
      wrapper.innerHTML = `
        <div style="transform:translate(-50%,-50%);width:36px;height:36px;
          display:flex;align-items:center;justify-content:center;
          background:#fff;border-radius:9999px;border:2px solid #3b82f6;
          box-shadow:0 6px 18px rgba(0,0,0,.18);font-size:18px;cursor:pointer;">
          ${myProfile.emoji}
        </div>
      `;

      const markerContent = wrapper.firstElementChild as HTMLElement;
      markerContent.addEventListener("click", () => {
        const { setSelectedMy } = useSelectedUserStore.getState();
        const { setCheckProfile } = useHomeStore.getState();
        setSelectedMy(myProfile);
        setCheckProfile(true);
      });

      const pos = currentLocationRef.current
        ? new kakao.maps.LatLng(
            currentLocationRef.current.lat,
            currentLocationRef.current.lng
          )
        : new kakao.maps.LatLng(SSU_LOCATION.lat, SSU_LOCATION.lng);

      const marker = new kakao.maps.CustomOverlay({
        position: pos,
        content: markerContent,
        yAnchor: 0.5,
        xAnchor: 0.5,
        map,
      });

      markerRef.current = marker;
    };

    // 마커 렌더 함수
    const renderUserMarkers = (kakao: typeof window.kakao, map: any) => {
      userMarkerRef.current.forEach((marker) => marker.setMap(null));
      userMarkerRef.current = [];

      users?.forEach((user) => {
        const userLatLng = new kakao.maps.LatLng(user.latitude, user.longitude);

        const isSelected = selectedUser?.userId === user.userId;

        const htmlString = ReactDOMServer.renderToString(
          <UserMarker user={user} isSelected={isSelected} />
        );

        const wrapper = document.createElement("div");
        wrapper.innerHTML = htmlString;

        const markerContent = wrapper.firstElementChild as HTMLElement;

        const userMarker = new kakao.maps.CustomOverlay({
          position: userLatLng,
          content: markerContent,
          yAnchor: 0.5,
          xAnchor: 0.5,
          map,
        });

        if (markerContent) {
          markerContent.style.pointerEvents = "auto";
          markerContent.style.cursor = "pointer";

          markerContent.addEventListener("click", () => {
            const { setSelectedUser } = useSelectedUserStore.getState();
            const { setCheckProfile } = useHomeStore.getState();

            setSelectedUser(user);
            setCheckProfile(true);

            if (mapRef.current) {
              const latlng = new window.kakao.maps.LatLng(
                user.latitude ?? 37.495938823365,
                user.longitude ?? 126.95437558238
              );
              mapRef.current.panTo(latlng);
            }
          });
        }

        userMarkerRef.current.push(userMarker);
      });
    };

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
          if (!container || !myProfile) return;

          const map = new kakao.maps.Map(container, {
            center: new kakao.maps.LatLng(SSU_LOCATION.lat, SSU_LOCATION.lng),
            level: 4,
            draggable: true,
            scrollwheel: true,
          });
          mapRef.current = map;

          kakao.maps.event.addListener(map, "click", () => {
            const { setSelectedUser } = useSelectedUserStore.getState();
            setSelectedUser(null);
          });

          createMyMarker(kakao, map);
          renderUserMarkers(kakao, map);

          // 위치 갱신 함수
          const updatePosition = (lat: number, lng: number) => {
            const pos = new kakao.maps.LatLng(lat, lng);
            if (markerRef.current) {
              markerRef.current.setPosition(pos);
            }
            map.panTo(pos);

            currentLocationRef.current = { lat, lng };
          };

          // 첫 위치 한 번만 가져오고, 이후 watch로 스트림 구독
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
              (p) => {
                updatePosition(p.coords.latitude, p.coords.longitude);
              },
              () => {},
              {
                timeout: 10_000,
                maximumAge: 60_000,
              }
            );

            // 실시간 추적
            const id = navigator.geolocation.watchPosition(
              (p) => {
                updatePosition(p.coords.latitude, p.coords.longitude);
              },
              (err) => {
                // 권한 거부/타임아웃 등 에러는 콘솔로만
                console.warn("watchPosition error:", err);
              },
              {
                timeout: 15_000,
                maximumAge: 5_000, // 캐시 허용 (짧게)
              }
            );
            watchIdRef.current = id as unknown as number;
          } else {
            console.warn("Geolocation not supported.");
          }
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
    }, [myProfile]);

    useEffect(() => {
      if (!mapRef.current || !window.kakao?.maps) return;
      userMarkerRef.current.forEach((marker) => marker.setMap(null));
      userMarkerRef.current = [];
      renderUserMarkers(window.kakao, mapRef.current);
    }, [selectedUser]);

    return (
      <div
        className="h-full z-0 overflow-hidden"
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
);
