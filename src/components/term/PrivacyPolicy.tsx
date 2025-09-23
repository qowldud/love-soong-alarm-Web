import { Divider } from "../../common/Divider";
import { Description } from "../profileOnboarding/Description";

export const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col overflow-y-auto">
      <Description title="좋아하면 숭리는 개인정보처리방침">
        <div className="text-additive text-base font-medium leading-7 tracking-[-0.48px]">
          좋아하면 숭리는 운영팀(이하 '운영팀')은 정보주체의 자유와 권리 보호를
          위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게
          개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보
          보호법」 제30조에 따라 정보주체에게 개인정보의 처리와 보호에 관한 절차
          및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수
          있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
        </div>
      </Description>

      <Divider className="px-4" />

      <Description title="제1조 (개인정보 처리의 목적)">
        <p className="text-sm mb-2">
          ① 운영팀은 다음의 목적을 위하여 개인정보를 처리합니다.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>
            <strong>간편 로그인</strong>
          </li>
          <li>
            <strong>위치 서비스 기반 매칭 서비스 제공</strong>
          </li>
          <li>
            <strong>이용자 행동 분석 및 서비스 개선</strong>
          </li>
        </ul>
        <p className="text-sm mt-3">
          ② 수집된 개인정보는 명시된 목적 외의 용도로는 이용되지 않으며, 이용
          목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도 동의와
          같은 필요한 조치를 이행할 예정입니다.
        </p>
      </Description>

      <Description title="제2조 (개인정보 수집의 항목)">
        <p className="text-sm mb-2">
          ① 운영팀은 다음의 개인정보 항목을 정보주체의 동의를 받아 처리하고
          있습니다. 처리하고 있는 개인정보는 다음의 목적 외의 용도로는 이용되지
          않으며, 이용 목적이 변경되는 경우에는 ｢개인정보 보호법｣ 제18조에 따라
          별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
        </p>
        <ul className="list-decimal pl-5 space-y-4 text-sm leading-relaxed">
          <li>
            <strong>간편 로그인(소셜 계정 연동)</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>
                <strong>수집·이용 항목:</strong> 필수: 소셜 계정 아이디(이메일)
              </li>
              <li>
                운영팀은 이용자의 편의를 위해 간편 로그인(카카오) 방식을
                제공하고 있습니다. 이와 같은 로그인 시 본인확인 값만 비교할 뿐,
                이용자의 추가 개인정보를 수집하지 않습니다.
              </li>
            </ul>
          </li>
          <li>
            <strong>위치 서비스 기반 매칭 서비스 제공</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>
                <strong>수집·이용 항목:</strong> 필수: 성별, 출생 연도, 학과 및
                학부
              </li>
            </ul>
          </li>
          <li>
            <strong>
              웹사이트 서비스 이용과정에서 이용자 행동 분석 및 서비스 개선
            </strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>
                <strong>수집·이용 항목:</strong> 필수: 이용자의 활동 로그, IP
                주소, 쿠키
              </li>
              <li>
                자세한 내용은 제7조 「개인정보 자동 수집 장치의 설치ㆍ운영 및 그
                거부에 관한 사항」에서 확인하실 수 있습니다.
              </li>
            </ul>
          </li>
        </ul>
        <p className="text-sm mt-3">
          ② 이용자는 개인정보의 수집 및 이용, 동의를 거부할 권리가 있으며, 동의
          거부 시에는 서비스 이용이 제한됩니다.
        </p>
      </Description>

      <Description title="제3조 (개인정보의 처리 및 보유기간)">
        <p className="text-sm mb-2">
          ① 운영팀은 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터
          개인정보를 수집 시에 동의받은 개인정보 보유·이용 기간 내에서
          개인정보를 처리·보유합니다. 개인정보 처리 및 보유 기간은 다음과
          같습니다.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
          <li>
            <strong>간편 로그인:</strong> 회원탈퇴 시까지 또는 서비스 이용기간
            종료 후 7일
          </li>
          <li>
            <strong>위치 서비스 기반 매칭 서비스 제공:</strong> 회원탈퇴 시까지
            또는 서비스 이용기간 종료 후 7일
          </li>
          <li>
            <strong>이용자 행동 분석 및 서비스 개선:</strong> 회원탈퇴 시까지
            또는 서비스 이용기간 종료 후 7일
          </li>
          <li>
            <strong>
              「통신비밀보호법」 제15조의2 제2항에 따른 통신사실확인자료 보관:
            </strong>
            컴퓨터통신, 인터넷 로그기록자료, 접속지 추적자료: 3개월
          </li>
        </ul>
      </Description>

      <Description title="제4조 (개인정보의 파기 절차 및 방법)">
        <p className="text-sm mb-2">
          ① 운영팀은 개인정보 보유기간의 경과, 서비스 이용계약 해지(탈퇴),
          서비스 종료 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당
          개인정보를 파기합니다.
        </p>
        <p className="text-sm mb-2">
          ② 개인정보 파기의 절차 및 방법은 다음과 같습니다.
        </p>
        <ul className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
          <li>
            <strong>파기절차:</strong> 운영팀은 파기사유가 발생한 개인정보를
            선정하고, 운영진의 개인정보 보호책임자의 승인을 받아 개인정보를
            파기합니다.
          </li>
          <li>
            <strong>파기방법:</strong> 운영팀은 전자적 파일 형태로 기록·저장된
            개인정보는 기록을 재생할 수 없도록 파기합니다. 출력물 형태로는
            개인정보를 저장하지 않습니다.
          </li>
        </ul>
      </Description>

      <Description title="제5조 (개인정보 처리의 위탁)">
        <p className="text-sm mb-2">
          운영팀은 통합 서비스의 제공을 위하여 필요한 업무 중 일부를 외부 업체에
          위탁하고 있으며, 위탁 업무 처리와 관련한 원활한 개인정보 업무처리를
          위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다. 위탁업무
          내용이나 수탁자가 변경될 경우에는 지체 없이 본 개인정보 처리방침을
          통하여 공개하도록 하겠습니다.
        </p>

        <ul className="list-disc pl-5 space-y-1 text-sm leading-relaxed">
          <li>
            <strong>위탁 대상자:</strong> Stripe, Inc.
          </li>
          <li>
            <strong>재위탁사:</strong> 나이스페이먼츠(주)
          </li>
          <li>
            <strong>수탁업체의 소재국가:</strong> 한국
          </li>
          <li>
            <strong>개인정보가 처리되는 국가:</strong> 미국, 한국
          </li>
          <li>
            <strong>이전 일시 및 방법:</strong> 간편결제 이용 시,
            나이스페이먼츠에서 결제 처리 후 Stripe에서 영수증 발송을 위한 이메일
            정보 이전
          </li>
          <li>
            <strong>이전되는 개인정보 항목:</strong> 이메일
          </li>
          <li>
            <strong>이용목적:</strong> 간편 결제(네이버페이, 삼성페이, 애플페이,
            카카오페이)
          </li>
          <li>
            <strong>연락처:</strong>{" "}
            <a href="mailto:privacy@stripe.com" className="underline">
              privacy@stripe.com
            </a>
          </li>
          <li>
            <strong>개인정보의 보유 및 이용 기간:</strong> 본 개인정보처리방침에
            규정된 보관기간과 일치
          </li>
        </ul>

        <p className="text-sm mt-4">
          이용자는 아래 제8조의 운영팀의 개인정보보호책임자 및 담당 연락처를
          통해 개인정보의 국외 처리위탁을 거부할 수 있습니다. 이용자가
          개인정보의 국외 처리위탁을 거부하는 경우 운영팀은 해당 이용자의
          개인정보를 국외 처리위탁 대상에서 제외합니다. 다만, 이 경우 운영팀의
          서비스 중 개인정보 국외 처리위탁이 필수적으로 수반되는 서비스의 이용이
          제한될 수 있습니다.
        </p>
      </Description>

      <Description title="제6조 (개인정보의 안전성 확보조치)">
        <p className="text-sm mb-2">
          운영팀은 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
          있습니다.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm leading-relaxed">
          <li>
            <strong>관리적 조치:</strong> 내부 관리계획 수립·시행
          </li>
          <li>
            <strong>기술적 조치:</strong> 개인정보처리시스템에 대한 접근 권한의
            관리, 접속기록의 보관 및 점검, 개인정보처리시스템의 취약점 점검 및
            보완
          </li>
        </ul>
      </Description>

      <Description title="제7조 (개인정보 자동 수집 장치의 설치, 운영 및 거부)">
        <p className="text-sm mb-2">
          운영팀은 정보주체에게 개별적인 서비스와 편의를 제공하기 위해
          이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.
        </p>
        <p className="text-sm mb-2">
          쿠키는 웹사이트 운영에 이용되는 서버(http)가 정보주체의 브라우저에
          보내는 소량의 정보로서 정보주체의 컴퓨터 또는 모바일에 저장되며,
          웹사이트 접속 시 정보주체의 브라우저에서 서버로 자동 전송됩니다.
        </p>
        <p className="text-sm mb-2">
          정보주체는 브라우저 옵션 설정을 통해 쿠키 허용, 차단 등의 설정을 할 수
          있습니다.
        </p>

        <p className="text-sm font-medium mt-3">
          1. 웹 브라우저에서 쿠키 허용/차단
        </p>
        <ul className="list-disc pl-5 text-sm mb-2 space-y-1">
          <li>
            크롬(Chrome): 웹 브라우저 설정 &gt; 개인정보 보호 및 보안 &gt;
            인터넷 사용 기록 삭제
          </li>
          <li>
            엣지(Edge): 웹 브라우저 설정 &gt; 쿠키 및 사이트 권한 &gt; 쿠키 및
            사이트 데이터 관리 및 삭제
          </li>
        </ul>

        <p className="text-sm font-medium mt-3">
          2. 모바일 브라우저에서 쿠키 허용/차단
        </p>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>
            크롬(Chrome): 모바일 브라우저 설정 &gt; 개인정보 보호 및 보안 &gt;
            인터넷 사용 기록 삭제
          </li>
          <li>
            사파리(Safari): 모바일 기기 설정 &gt; 사파리(Safari) &gt; 고급 &gt;
            모든 쿠키 차단
          </li>
          <li>
            삼성 인터넷: 모바일 브라우저 설정 &gt; 인터넷 사용 기록 &gt; 인터넷
            사용 기록 삭제
          </li>
        </ul>
      </Description>
    </div>
  );
};
