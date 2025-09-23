import { useNavigate } from "react-router-dom";
import { useApi } from "../../../api/api";
import { useAuthStore } from "../../../store/authStore";
import { CardHeader } from "../../Common";

export const MemberOutcard = () => {
  const navigate = useNavigate();
  const setMemberout = useAuthStore((state) => state.setIsMemberOutOpen);
  const logout = useAuthStore((state) => state.logout);

  const { deleteData } = useApi();

  const deleteAccount = async () => {
    try {
      const { success } = await deleteData("/api/auth/withdraw");
      if (success) {
        logout();
        localStorage.clear();
        sessionStorage.clear();
        navigate("/");
      }
    } catch (err) {}
  };

  return (
    <div className="relative">
      <CardHeader title="탈퇴하기" />

      <div className="flex flex-col gap-y-1 px-5 py-4">
        <div className="text-content-base text-[20px] font-bold">
          정말 탈퇴하시나요?
        </div>
        <div className="text-additive text-[16px] font-medium">
          나슬퍼집에가지마베이베ㅠㅠ
        </div>
      </div>

      <div className="flex flex-row gap-x-2 px-4 py-2.5 w-full">
        <div
          className="flex py-4 w-[50%] rounded-[12px] bg-main3 text-main1 justify-center items-center cursor-pointer"
          onClick={() => setMemberout(false)}
        >
          취소
        </div>
        <div
          className="flex py-4 w-[50%] rounded-[12px] bg-main1 text-white justify-center items-center cursor-pointer"
          onClick={deleteAccount}
        >
          탈퇴
        </div>
      </div>
    </div>
  );
};
