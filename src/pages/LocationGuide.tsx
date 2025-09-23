import { Description } from "../components/profileOnboarding/Description";
import IOSLocation from "@/assets/icons/IOS_location.svg?url";
import AndLocation from "@/assets/icons/And_location.svg?url";
import IOSLogo from "@/assets/icons/IOS_logo.svg?url";
import AndLogo from "@/assets/icons/And_logo.svg?url";
import { Divider } from "../common/Divider";
import { Button } from "../common/Button";
import { postLocation } from "../api/location";
import { useNavigate } from "react-router-dom";

export const LocationGuide = () => {
  const navigate = useNavigate();

  const onClickStart = async () => {
    console.log(navigator.geolocation);
    if (!navigator.geolocation) {
      console.log("이 브라우저는 위치 정보를 지원하지 않아요!");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await postLocation({ latitude, longitude });
        console.log(res);

        navigate("/splash");
      },
      (error) => {
        console.error("위치 권한 거부 또는 실패: ", error);
        navigate("/splash");
      }
    );
  };
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col">
        <div className="w-full p-4 flex justify-center items-center text-content-base text-lg font-medium leading-6.5 tracking-[-0.36px]">
          위치 설정
        </div>

        <div className="flex flex-col overflow-y-auto">
          <Description title="팝업 창에서 '정확한 위치'를 꼭 켜주세요!">
            해당 설정을 하지 않을시 서비스 이용이 어려워요.
          </Description>

          <div className="flex py-2 px-4 gap-3">
            <div className="flex flex-col gap-2.5 flex-1 items-center">
              <img src={IOSLocation} alt="ios_location" />
              <div className="py-0.5 px-1.5 rounded-sm flex gap-1 bg-fill-strong">
                <img src={IOSLogo} alt="ios_logo" />
                <span className="text-additive text-center text-xs font-medium leading-4.5 tracking-[-0.24px]">
                  iOS
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 flex-1 items-center">
              <img src={AndLocation} alt="ios_location" />
              <div className="py-0.5 px-1.5 rounded-sm flex gap-1 bg-fill-strong">
                <img src={AndLogo} alt="ios_logo" />
                <span className="text-additive text-center text-xs font-medium leading-4.5 tracking-[-0.24px]">
                  Android
                </span>
              </div>
            </div>
          </div>

          <Divider className="px-4" />

          <div className="w-full flex flex-col">
            <div className="w-full px-5 pt-2 pb-1 text-assistive t text-sm font-normal leading-5 tracking-[-0.28px]">
              설정하지 못 한 경우
            </div>

            <div className="px-4 py-2.5 flex gap-2 items-center">
              <img src={IOSLogo} alt="ios_logo" className="size-6" />
              <div className="flex flex-col px-1">
                <div className="text-content-base text-sm font-medium leading-5 tracking-[-0.28px]">
                  iOS
                </div>
                <div className="text-additive text-xs font-normal leading-4.5 tracking-[-0.24px] whitespace-nowrap">
                  {`설정 > 개인정보 보호 및 보안 > 위치 서비스 > 사용하는 브라우저`}{" "}
                  <br />
                  {`(Safari/Chrome/NAVER) > '정확한 위치' 선택`}
                </div>
              </div>
            </div>

            <div className="px-4 py-2.5 flex gap-2 items-center">
              <img src={AndLogo} alt="ios_logo" className="size-6" />
              <div className="flex flex-col px-1">
                <div className="text-content-base text-sm font-medium leading-5 tracking-[-0.28px]">
                  Android
                </div>
                <div className="text-additive text-xs font-normal leading-4.5 tracking-[-0.24px] whitespace-nowrap">
                  {`설정 > 앱 > 사용하는 브라우저 (Safari/Chrome/NAVER) > 권한 > `}
                  <br />
                  {`위치 > '정확한 위치 사용' 선택`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-2.5 pt-5.5 flex flex-col gap-2 shadow-dim-weak backdrop-blur-40 rounded-xl safe-bottom">
        <Button variant="primary" type="button" onClick={onClickStart}>
          시작하기
        </Button>
      </div>
    </div>
  );
};
