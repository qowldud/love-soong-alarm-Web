import Marker from "@/assets/icons/Vector_lb.svg?url";
import MatchMarker from "@/assets/icons/Vector_match.svg?url";
import SelectMarker from "@/assets/icons/Vector_Select.svg?url";
import type { NearbyUserMarker } from "../../types/User";
import clsx from "clsx";
interface Props {
  user: NearbyUserMarker;
  isSelected?: boolean;
}

export const UserMarker = ({ user, isSelected }: Props) => {
  const MarkerIcon = isSelected
    ? SelectMarker
    : user.isMatching
    ? MatchMarker
    : Marker;

  return (
    <div className="user-marker relative flex flex-col items-center justify-center z-80 w-12 cursor-pointer">
      <img src={MarkerIcon} alt="marker_icon" className="w-12 h-15" />

      <div className="absolute top-3 flex flex-col justify-center items-center gap-1">
        <span className="text-sm z-10">{user.emoji}</span>

        {user.lastSeen && (
          <span
            className={clsx(
              "w-1 h-1 rounded-full",
              user.lastSeen === "10분 내 접속"
                ? "bg-success-strong"
                : "bg-warning-strong"
            )}
          />
        )}
      </div>
    </div>
  );
};
