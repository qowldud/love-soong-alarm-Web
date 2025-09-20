import Marker from "@/assets/icons/Vector.svg";
import MatchMarker from "@/assets/icons/Vector_match.svg?url";
import SelectMarker from "@/assets/icons/Vector_Select.svg?url";
import type { User } from "../../types/User";
interface Props {
  user: User;
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

        <span
          className="w-1 h-1 rounded-full"
          style={{
            backgroundColor: status === "online" ? "#22c55e" : "#9ca3af",
          }}
        />
      </div>
    </div>
  );
};
