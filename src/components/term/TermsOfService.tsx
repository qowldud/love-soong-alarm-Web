import { Divider } from "../../common/Divider";
import { Description } from "../profileOnboarding/Description";

export const TermsOfService = () => {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <Description title="좋아하면 숭리는 이용약관" />

      <Divider className="px-4" />

      <Description title="제1조 (목적)">
        이 약관은 좋아하면 숭리는 운영진(이하 "운영진”)에서 제공하는 ‘좋아하면
        숭리는’ 서비스(이하 “서비스”)의 이용에 대한 운영진과 이용자 간의
        권리·의무 및 책임 사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
      </Description>

      <Divider className="px-4" />

      <Description title="제2조 (정의)">
        <p className="text-sm mb-2">
          ① 이 약관에서 사용하는 정의는 다음과 같습니다.
        </p>
        <ul className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
          <li>
            “운영진”이라 함은 좋아하면 숭리는 서비스를 제공하고 운영하는 자를
            의미합니다.
          </li>
          <li>
            “이용자”라 함은 이 약관에 따라 이용계약을 체결하고, “서비스”를
            이용하는 자를 의미합니다.
          </li>
          <li>
            “서비스”라 함은 운영진이 이용자에게 제공하는 실시간 위치 기반 매칭
            서비스 및 채팅 서비스를 의미합니다.
          </li>
          <li>
            “유료 서비스”라 함은 이용자가 티켓 및 슬롯을 구매하여, 채팅 서비스를
            이용하는 것을 의미합니다.
          </li>
          <li>
            “프로필”이라 함은 이용자가 직접 입력한 정보로 구성된 프로필 정보를
            의미합니다.
          </li>
          <li>
            “티켓”이라 함은 채팅 10회 이후 지속을 위해 구매하는 유료 아이템을
            의미합니다.
          </li>
          <li>
            “슬롯”이라 함은 채팅 상대 수를 늘리기 위해 추가로 여는 채팅 공간을
            의미합니다.
          </li>
        </ul>
        <p className="text-sm mt-2">
          ② 이 약관에서 사용하는 용어 중 본 조에서 정하지 아니한 것은 관계
          법령에서 정하는 바에 따르며, 그 외에는 일반 상관례에 따릅니다.
        </p>
      </Description>

      <Divider className="px-4" />

      <Description title="제3조 (약관의 효력 및 변경)">
        <p className="text-sm mb-2">
          ① 운영진은 이용자가 이 약관을 확인할 수 있도록 웹사이트 및
          애플리케이션 내 화면을 통해 제공합니다.
        </p>

        <p className="text-sm mt-2">
          ② 이용자가 프로필 등록의 마지막 페이지에서 “시작하기” 버튼을 통해
          서비스를 시작하였을 경우 본 약관의 내용을 모두 읽고 이를 충분히
          이해하였으며, 그 적용에 동의한 것으로 봅니다.
        </p>

        <p className="text-sm mt-2">
          ③ 운영진은 필요한 경우, 관련 법령을 위배하지 않는 범위 내에서 이
          약관의 내용을 변경할 수 있습니다. 약관의 변경 사실은 웹사이트 화면에
          공지하며, 공지 후 7일 이내에 거부 의사를 표시하지 않을 경우, 약관의
          변경 사항에 동의한 것으로 간주됩니다.
        </p>
      </Description>

      <Divider className="px-4" />

      <Description title="제4조 (약관 외 준칙)">
        이 약관에서 정하지 아니한 사항은 관계 법령 또는 상관례에 따릅니다.
      </Description>

      <Divider className="px-4" />

      <Description title="제5조 (이용계약의 성립 및 해지)">
        <p className="text-sm mb-2">
          ① 이용계약은 이용자가 약관 내용에 대한 동의를 한 후, 프로필
          등록함으로써 성립됩니다.
        </p>

        <p className="text-sm mt-2">
          ② 이용자는 계정 탈퇴를 통하여 언제든지 프로필을 삭제할 수 있습니다. 이
          경우 해당 이용자의 프로필 및 개인정보는 모두 삭제 됩니다.
        </p>

        <p className="text-sm mt-2">
          ③ 이용자는 언제든지 개인정보의 삭제를 요청할 수 있으며, 이 경우 해당
          이용자의 개인정보는 즉시 삭제됩니다.
        </p>

        <p className="text-sm mt-2">
          ④ 프로필 및 개인정보 삭제 요청은 약관 하단에 명시된 운영진의 대표
          이메일 주소 또는 웹사이트 및 애플리케이션 내 명시된 문의처를 통해
          신청할 수 있습니다.
        </p>
      </Description>

      <Divider className="px-4" />

      <Description title="제6조 (개인정보의 보호)">
        <p className="text-sm mb-2">
          운영진은 관계 법령이 정하는 바에 따라 이용자의 개인정보를 보호하기
          위해 노력합니다. 개인정보의 보호 및 사용에 대해서는 관련 법령 및
          웹사이트의 개인정보 보호 정책이 적용됩니다.
        </p>

        <p className="text-sm mb-2">
          ① 운영진은 원활한 서비스의 제공을 목적으로 개인정보를 수집합니다.
          운영진은 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및
          관계 법령이 정한 바를 준수하여 적법하게 개인정보를 처리하고 안전하게
          관리합니다. 이와 관련한 절차 및 기준을 안내하고, 정보 주체의 고충을
          신속하고 원활하게 처리할 수 있도록 하기 위하여 다음의 사항을
          알려드립니다.
        </p>

        <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
          <li>
            <span className="font-semibold">개인정보의 수집·이용 목적</span>:
            간편 로그인, 실시간 위치 기반 매칭 서비스 제공, 이용자 행동 분석 및
            서비스 개선
          </li>
          <li>
            <span className="font-semibold">수집하려는 개인정보 항목</span>:
            <br />- 필수: 소셜 계정 아이디(이메일), 성별, 출생 연도, 학과 및
            학부, 이용자의 활동 로그, IP 주소, 쿠키
          </li>
          <li>
            <span className="font-semibold">개인정보의 보유 및 이용기간</span>:
            이용자가 개인정보 수집 및 이용에 동의한 경우, 서비스 종료 일자로부터
            3일간 보관되며, 이후 즉시 파기됩니다. 단, 이용자가 운영진에 개인정보
            삭제를 요청하는 경우, 해당 개인정보는 즉시 파기됩니다.
          </li>
          <li>
            <span className="font-semibold">개인정보의 제3자 제공 사항</span>:
            운영진은 정보주체의 사전 동의 없이 개인정보를 외부에 제공하지
            않습니다. 다만, 다른 법률에 특별한 규정이 있는 경우에는 예외로
            합니다.
          </li>
          <li>
            <span className="font-semibold">개인정보 처리업무 위탁 사항</span>:
            운영진은 개인정보 처리업무를 위탁하고 있지 않습니다.
          </li>
          <li>
            <span className="font-semibold">
              정보주체의 권리ㆍ의무 및 행사방법에 관한 사항
            </span>
            : 정보주체는 언제든지 개인정보 열람ㆍ정정ㆍ삭제ㆍ처리정지 요구 등의
            권리를 행사할 수 있습니다. 정보주체의 권리는 약관 하단에 명시된
            운영진의 대표 연락처를 통하여 행사할 수 있으며, 운영진은 이에 대해
            지체 없이 조치하겠습니다.
          </li>
        </ul>
      </Description>

      <Divider className="px-4" />

      <Description title="제7조 (운영진의 의무)">
        <p className="text-sm mb-2">
          ① 운영진은 관계 법령을 준수하며, 이 약관에서 정하는 권리의 행사 및
          의무 사항을 신의에 따라 성실하게 이행합니다.
        </p>

        <p className="text-sm mt-2">
          ② 운영진은 안정적인 서비스의 제공을 위하여 설비에 장애가 생기거나
          데이터 등이 멸실ㆍ훼손된 때에는 천재지변, 비상사태, 현재의 기술로는
          해결이 불가능한 장애나 결함 등 부득이한 사유가 없는 한 지체 없이 이를
          수리 또는 복구하도록 최선의 노력을 다합니다.
        </p>

        <p className="text-sm mt-2">
          ③ 운영진은 이용자로부터 제기되는 의견이 합당하다고 판단될 경우에는,
          적절한 조치를 취하여야 합니다.
        </p>
      </Description>
      <Divider className="px-4" />

      <Description title="제8조 (이용자의 의무)">
        <p className="text-sm mb-2">
          ① 이용자는 서비스의 이용과 관련하여 다음 각 호에 해당하는 행위를
          해서는 안 됩니다.
        </p>

        <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
          <li>타인의 개인정보를 무단으로 수집ㆍ저장 또는 유포하는 행위</li>
          <li>타인을 기망하여 이득을 취하는 행위</li>
          <li>
            음란한 행위를 묘사하거나, 성매매 관련 정보를 공유하거나, 타인에게
            성적 수치심이나 불쾌감을 유발할 수 있는 내용을 작성하는 등
            미풍양속에 반하는 정보를 등록하거나 메세지를 전송하는 행위
          </li>
          <li>
            혐오스러운 내용을 작성하거나, 욕설, 비속어, 은어를 사용하는 등 사회
            통념에 반하는 비정상적인 단어를 등록하거나 메세지를 전송하는 행위
          </li>
          <li>
            허위 또는 과장된 정보를 포함하거나 제 3자의 개인정보, 명예, 신용 등
            정당한 이익을 침해하는 메세지를 전송하는 행위
          </li>
          <li>
            서비스를 무단으로 영리, 영업 등 본래의 용도 이외로 사용하는 행위
          </li>
          <li>
            서비스를 이용하여 얻은 정보를 무단으로 복제ㆍ유통ㆍ조장하거나
            상업적으로 이용하는 행위, 알려지거나 알려지지 않은 버그를 악용하여
            서비스를 이용하는 행위
          </li>
          <li>운영진이나 타인의 지식재산권 등을 침해하는 행위</li>
          <li>
            운영진으로부터 특별한 권리를 부여받지 않고 서비스를 변경하거나,
            서비스에 다른 프로그램을 추가ㆍ삽입하거나, 서버를
            해킹ㆍ역설계하거나, 소스 코드나 데이터를 유출ㆍ변경하거나, 별도의
            서버를 구축하거나, 서비스의 일부분을 임의로 변경ㆍ도용하여 운영진을
            사칭하는 행위
          </li>
          <li>
            그 밖에 관련 법령에 위반되거나 선량한 풍속 기타 사회통념에 반하는
            행위
          </li>
        </ol>

        <p className="text-sm mt-4">
          ② 이용자의 위반 행위가 확인되는 경우, 운영진은 회원에게 해당 행위를
          중단할 것을 경고하거나 이용자가 등록한 프로필 정보를 제거할 수
          있습니다.
        </p>
      </Description>
      <Divider className="px-4" />

      <Description title="제9조 (서비스의 제공)">
        <p className="text-sm mb-2">
          ① 운영진이 제공하는 무료 및 유료 서비스는 운영진의 정책에 따라 일부
          또는 전부의 변경, 폐지될 수 있습니다.
        </p>

        <p className="text-sm mt-2">
          ② 이용자는 운영진이 정한 결제방식을 통하여 구매한 티켓 및 슬롯을 통해
          유료 서비스를 이용할 수 있습니다. 단, 결제방식은 운영진의 정책에 따라
          변경될 수 있습니다.
        </p>
      </Description>
      <Divider className="px-4" />

      <Description title="제10조 (결제 서비스의 제공)">
        <p className="text-sm mb-2">
          ① 운영진이 제공하는 결제서비스는 다음 각 호와 같습니다.
        </p>
        <ul className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
          <li>카카오페이</li>
          <li>네이버페이</li>
          <li>삼성페이</li>
        </ul>

        <p className="text-sm mt-4">
          ② 이용자는 타인의 결제수단을 임의로 사용하여서는 안됩니다. 타인의
          결제수단을 임의 사용함으로써 발생하는 제3자의 손실이나 손해에 대한
          책임은 이용자에게 있습니다.
        </p>

        <p className="text-sm mt-2">
          ③ 결제서비스 이용을 위해 이용자가 입력한 정보와 관련하여 발생한 문제에
          대한 책임과 불이익은 이용자가 부담하여야 합니다.
        </p>
      </Description>
      <Divider className="px-4" />
      <Description title="제11조 (청약철회)">
        <p className="text-sm mb-2">
          ① 이용자는 본 약관에 따라 유료서비스를 이용하기 위해 유료결제를 한
          날로부터 7일 이내에 운영진에 대해 유료서비스의 이용에 관한 청약을
          철회할 수 있습니다. 다만, 회사가 회원에게 사전에 합의한 내용과 다르게
          유료서비스를 제공하거나 유료서비스를 제공하지 아니하는 경우, 회원은
          유료 결제를 한 날로부터 3개월 이내 또는 해당 사실을 알거나 알 수
          있었던 날로부터 30일 이내에 회사에 대해 유료서비스의 이용에 관한
          청약을 철회할 수 있습니다.
        </p>

        <p className="text-sm mt-4">
          ② 제1항에도 불구하고, 회원은 다음 각 호의 어느 하나에 해당하는
          경우에는 청약철회를 할 수 없습니다.
        </p>
        <ul className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
          <li>이용자가 구매한 티켓을 이미 사용한 경우</li>
          <li>즉시 사용이 완료되는 슬롯을 구매한 경우</li>
          <li>서비스 이용기간 내에 티켓을 사용하지 않은 경우</li>
        </ul>

        <p className="text-sm mt-4">
          ③ 운영진은 청약철회가 불가능한 유료서비스나 콘텐츠에 대해서는 다음 각
          호의 조치를 취합니다.
        </p>
        <ul className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
          <li>
            청약철회가 불가능한 유료서비스에 해당한다는 사실을 이용약관에 포함
          </li>
          <li>
            구매 시점에 별도의 안내 문구를 통해 청약철회가 불가능하다는 사실을
            이용약관을 통해 고지
          </li>
        </ul>

        <p className="text-sm mt-4">
          ④ 청약철회 및 환불 요청은 각 유료서비스에서 이용약관 하단에 명시된
          운영진 대표 연락처 또는 웹사이트 및 애플리케이션 내 명시된 문의처를
          통해 할 수 있습니다.
        </p>
      </Description>
      <Divider className="px-4" />
      <Description title="제12조 (서비스 이용 기간)">
        <p className="text-sm mb-2">
          ① 이용자가 제5조의 규정에 따라 프로필 등록을 한 경우 서비스를
          개시합니다. 서비스 이용 기간은 아래와 같습니다.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
          <li>
            <strong>서비스 이용 기간: 2025. 9. 23. ~ 2025. 9. 26.</strong>
          </li>
          <li>
            <strong>
              서비스 이용 기간 이후에는 구매하신 티켓의 사용이 불가합니다.
            </strong>
          </li>
        </ul>

        <p className="text-sm mt-4">
          ② 업무상 또는 기술상의 장애로 인하여 서비스를 개시하지 못하는 경우에는
          웹사이트에 공시합니다.
        </p>

        <p className="text-sm mt-4">
          ③ 제2항의 경우에 운영진이 제공하는 서비스의 이용과 관련하여, 운영진은
          이용자에게 발생한 어떠한 손해에 대해서도 책임을 지지 않습니다. 다만
          운영진의 고의 또는 중대한 과실로 인하여 발생한 손해의 경우는
          제외합니다.
        </p>
      </Description>
      <Divider className="px-4" />
      <Description title="제13조 (서비스 이용제한)">
        <p className="text-sm mb-2">
          ① 운영진은 이용자가 서비스 이용에 있어서 본 약관 및 관련 법령을
          위반하거나, 기타 정상적인 서비스 운영에 방해가 될 경우 서비스 이용을
          제한할 수 있습니다.
        </p>
        <p className="text-sm mt-2">
          ② 상기 이용제한 규정에 따라 서비스 이용자의 이용계약을 해지할 수
          있습니다. 단, 불가피한 사유로 사전 통지가 불가능한 경우에는 그러하지
          아니합니다.
        </p>
      </Description>
      <Divider className="px-4" />
      <Description title="제14조 (저작권)">
        <p className="text-sm mb-2">
          ① 웹사이트 및 애플리케이션의 모든 콘텐츠에 대한 저작권은 운영진에
          있습니다.
        </p>
        <p className="text-sm mt-2">
          ② 운영진 소유의 콘텐츠에 대하여 제3자가 운영진의 허락 없이 사용 또는
          인용하는 것을 금지합니다.
        </p>
      </Description>
      <Divider className="px-4" />
      <Description title="제15조 (손해배상 및 책임제한)">
        <p className="text-sm mb-2">
          ① 운영진은 해당 서비스와 관련하여 이용자에게 어떠한 손해가
          발생하더라도 운영진의 고의 또는 과실로 인한 손해발생을 제외하고는 이에
          대하여 책임을 부담하지 아니합니다.
        </p>
        <p className="text-sm mt-2">
          ② 운영진은 관련 법령의 변경, 천재지변 또는 이에 준하는 불가항력으로
          인하여 유료/결제서비스를 제공할 수 없는 경우에는 서비스 제공에 관한
          책임이 면제됩니다.
        </p>
      </Description>
      <Divider className="px-4" />
      <Description title="부칙">
        <p>
          본 약관은 2025년 9월 23일부터 적용됩니다. 다만, 신규 회원에 대해서는
          회원 가입시부터 본 약관이 적용됩니다.
        </p>
        <p>
          서비스 약관과 관련한 모든 문의 사항은 duroodu@gmail.com으로 보내주시기
          바랍니다.
        </p>
      </Description>
    </div>
  );
};
