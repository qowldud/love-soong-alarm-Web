import Marker from "@/assets/icons/Vector_lb.svg?url";
import MatchMarker from "@/assets/icons/Vector_match.svg?url";
import SelectMarker from "@/assets/icons/Vector_Select.svg?url";

import clsx from "clsx";

interface Props {
  emoji: string;
  active: "level1" | "level2" | "level3";
  isMatching: boolean;
  isSelected: boolean;
}

export const Dummy_Marker = ({
  emoji,
  active,
  isMatching,
  isSelected,
}: Props) => {
  const MarkerIcon = isSelected
    ? SelectMarker
    : isMatching
    ? MatchMarker
    : Marker;

  return (
    <div className="user-marker relative flex flex-col items-center justify-center w-12 cursor-pointer">
      <img src={MarkerIcon} alt="marker_icon" className="w-12 h-15" />

      <div className="absolute top-3 flex flex-col justify-center items-center gap-1">
        <span className="text-lg z-10">{emoji}</span>

        {active !== "level3" && (
          <span
            className={clsx(
              "w-1 h-1 rounded-full",
              active === "level1" ? "bg-success-strong" : "bg-warning-strong"
            )}
          />
        )}
      </div>
    </div>
  );
};
