type TagProps = { label: string; active?: boolean };

const Tag = ({ label, active }: TagProps) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-[13px] font-semibold ${
      active ? "bg-[#FF4E8E]/10 text-[#FF4E8E]" : "bg-gray-100 text-gray-700"
    }`}
  >
    #{label}
  </span>
);

export const ChatPreview = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute right-0 top-0 rounded-full p-2 text-gray-500 hover:bg-gray-100"
        aria-label="닫기"
      />

      <h3 className="mb-4 mt-1 text-[22px] font-extrabold text-gray-900">
        채팅
      </h3>

      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          🎧
        </div>
        <div>
          <div className="text-[18px] font-bold text-gray-900">김승실</div>
          <div className="text-[13px] font-medium text-gray-500">
            22세 | 컴퓨터학부 | 163cm
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Tag label="밴드" active />
        <Tag label="검정치마" />
        <Tag label="The1975" />
        <Tag label="영화" active />
        <Tag label="예예올" />
        <Tag label="드마카" />
      </div>

      <button className="w-full rounded-[12px] bg-[#FF4E8E] py-4 text-[16px] font-bold text-white shadow-lg hover:brightness-95 active:scale-[0.99]">
        채팅하기
      </button>

      <div className="h-6" />
    </div>
  );
};
