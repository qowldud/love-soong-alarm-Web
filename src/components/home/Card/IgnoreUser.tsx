import { useParams } from "react-router-dom";
import { Button } from "../../../common/Button";
import { useChatStore } from "../../../store/chatStore";
import { CardHeader } from "../../Common";

export const IgnoreUser = ({
  handleBlock,
  handleUnblock,
  isBlocked,
}: {
  handleBlock: (chatRoodId: number) => void;
  handleUnblock: (chatRoodId: number) => void;
  isBlocked: boolean;
}) => {
  const { chatRoomId } = useParams();

  const setIgnoreUser = useChatStore((state) => state.setIgnoreUser);

  const handleIgnore = () => {
    if (chatRoomId === undefined) return;

    handleBlock(Number(chatRoomId));
    setIgnoreUser(false);
  };

  const handleUnignore = () => {
    if (chatRoomId === undefined) return;

    handleUnblock(Number(chatRoomId));
    setIgnoreUser(false);
  };

  return (
    <div className="relative">
      <CardHeader title="한시오분님을 차단할까요?" />

      <div className="flex flex-row gap-x-2 py-2.5 w-full">
        <Button
          variant="secondary"
          children="취소"
          onClick={() => setIgnoreUser(false)}
        />
        {isBlocked ? (
          <Button
            variant="primary"
            children="차단 해제하기"
            onClick={() => handleUnignore()}
          />
        ) : (
          <Button
            variant="primary"
            children="차단하기"
            onClick={() => handleIgnore()}
          />
        )}
      </div>
    </div>
  );
};
