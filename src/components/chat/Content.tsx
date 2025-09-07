type ItemProps = {
  isMine: boolean;
  content: string;
};

export const ChatContent = ({ item }: { item: ItemProps }) => {
  return (
    <div
      className={`flex w-full px-4 py-2 ${
        item.isMine ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex px-5 py-2.5 rounded-[50px] ${
          item.isMine ? "bg-[#9A92AD]/12 text-[#231D33]" : "bg-main1 text-white"
        }`}
      >
        {item.content}
      </div>
    </div>
  );
};
