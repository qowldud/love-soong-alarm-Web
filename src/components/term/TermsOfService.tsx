import { Divider } from "../../common/Divider";
import { Description } from "../profileOnboarding/Description";

export const TermsOfService = () => {
  return (
    <div className="flex flex-col">
      <Description title="좋아하면 숭리는 서비스 이용약관" />

      <Divider className="px-4" />

      <Description title="제1조 (목적)">
        {`이 약관은 YOURSSU 왕뚜껑(이하 "운영진”)에서 제공하는 ‘좋아하면 숭리는’ 서비스(이하 “서비스”)의 이용에 대한 운영진과 이용자 간의 권리ㆍ의무 및 책임 사항, 기타 필요한 사항을 규정함을 목적으로 합니다.`}
      </Description>

      <Divider className="px-4" />

      <Description title="제2조 (정의)"></Description>
    </div>
  );
};
