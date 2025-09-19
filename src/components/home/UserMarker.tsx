interface Props {
  emoji: string;
  status?: "online" | "offline"; // 상태 점 색상
  select?: boolean;
}

export const UserMarker = ({ emoji, status = "online" }: Props) => {
  return (
    <div
      className="relative flex items-center justify-center z-20"
      style={{
        width: "48px",
        height: "60px",
        aspectRatio: "4/5",
        flexShrink: 0,
      }}
    >
      {/* 중앙 이모지 */}
      <span className="text-sm z-10">{emoji}</span>

      {/* 하단 상태 점 */}
      <span
        className="absolute bottom-2 w-2 h-2 rounded-full"
        style={{
          backgroundColor: status === "online" ? "#22c55e" : "#9ca3af",
        }}
      />
    </div>
  );
};
