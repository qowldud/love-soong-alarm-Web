import { Divider } from "../../common/Divider";
import { Description } from "../profileOnboarding/Description";

export const LocationServiceTerms = () => {
  return (
    <div className="flex flex-col overflow-y-auto">
      <Description title="좋아하면 숭리는 위치서비스 이용약관" />

      <Divider className="px-4" />

      <Description title="제1조 (목적)">
        <p className="text-sm leading-relaxed">
          본 약관은 좋아하면 숭리는 운영진(이하 “운영진”)이 제공하는 ‘좋아하면
          숭리는’의 위치기반 서비스(이하, 위치정보 서비스)에 대해 운영진과
          서비스를 이용하는 이용자 간의 권리·의무 및 책임사항, 기타 필요한
          사항을 규정함을 목적으로 합니다.
        </p>
      </Description>

      <Divider className="px-4" />

      <Description title="제2조 (이용약관의 효력 및 변경)">
        <ul className="list-decimal pl-5 text-sm space-y-2 leading-relaxed">
          <li>
            본 약관은 이용자가 본 약관에 동의하고 운영진이 정한 절차에 따라
            위치정보 서비스의 이용자로 등록됨으로써 효력이 발생합니다.
          </li>
          <li>
            이용자가 프로필 등록의 마지막 페이지에서 “시작하기” 버튼을 통해
            서비스를 시작하였을 경우 본 약관의 내용을 모두 읽고 이를 충분히
            이해하였으며, 그 적용에 동의한 것으로 봅니다.
          </li>
          <li>
            운영진은 위치정보 서비스의 변경사항을 반영하기 위한 목적 등으로
            필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 수정할 수
            있습니다.
          </li>
          <li>
            약관이 변경되는 경우 운영진은 그 즉시 변경사항을 서비스 공지사항을
            통해 공지합니다. 이용자가 개정약관에 동의하지 않을 경우 본 약관에
            대한 동의를 철회할 수 있습니다.
          </li>
        </ul>
      </Description>

      <Divider className="px-4" />

      <Description title="제3조 (관계법령의 적용)">
        <p className="text-sm leading-relaxed">
          본 약관은 신의성실의 원칙에 따라 공정하게 적용하며, 본 약관에 명시되지
          아니한 사항에 대하여는 서비스 이용약관, 관련 법령 또는 상관례에
          따릅니다.
        </p>
      </Description>

      <Divider className="px-4" />

      <Description title="제4조 (서비스의 내용 및 이용요금)">
        <ul className="list-decimal pl-5 text-sm space-y-2 leading-relaxed">
          <li>
            운영진은 위치정보사업자로부터 수집한 이용자의 위치정보를 이용하여
            아래와 같은 위치정보 서비스를 제공합니다.
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>위치정보수집대상자의 위치 확인</li>
              <li>
                이용자의 위치에서 근접한 이용자의 프로필 정보 및 채팅 서비스
                제공
              </li>
            </ul>
          </li>
          <li>
            운영진이 제공하는 위치정보 서비스는 무료입니다. 단, 무선 서비스 이용
            시 발생하는 데이터 통신료는 별도이며, 이용자가 가입한 각
            이동통신사의 정책에 따릅니다.
          </li>
        </ul>
      </Description>

      <Divider className="px-4" />

      <Description title="제5조 (서비스내용변경 통지 등)">
        <p className="text-sm leading-relaxed">
          운영진이 서비스 내용을 변경하거나 종료하는 경우, 운영진은 앱 내 공지를
          통해 서비스 내용의 변경사항 또는 종료를 통지할 수 있습니다.
        </p>
      </Description>

      <Divider className="px-4" />

      <Description title="제6조 (개인위치정보의 이용 또는 제공)">
        <ul className="list-decimal pl-5 text-sm space-y-2 leading-relaxed">
          <li>
            운영진은 개인위치정보를 이용하여 위치기반서비스를 제공하는 경우 본
            약관에 고지하고 동의를 받습니다.
          </li>
          <li>
            운영진은 이용자의 동의 없이 개인위치정보를 제3자에게 제공하지
            않습니다.
          </li>
          <li>
            운영진은 「위치정보의 보호 및 이용 등에 관한 법률」 제16조 제2항에
            따라 위치정보 수집·이용·제공사실 확인자료를 자동으로 기록·보존하며,
            해당 자료는 1개월간 보관합니다.
          </li>
        </ul>
      </Description>

      <Divider className="px-4" />

      <Description title="제7조 (개인위치정보의 보유 목적 및 보유기간)">
        <p className="text-sm leading-relaxed mb-2">
          운영진은 위치기반서비스 제공을 위해 아래와 같이 개인위치정보를
          보유합니다.
        </p>
        <ul className="list-decimal pl-5 text-sm space-y-2 leading-relaxed">
          <li>
            본 약관 제4조에 따른 위치기반서비스 이용 및 제공 목적을 달성한
            때에는 지체 없이 개인위치정보를 파기합니다.
          </li>
          <li>
            그 외 위치기반서비스 제공을 위해 필요한 경우, 이용 목적 달성을 위해
            필요한 최소한의 기간 동안 개인위치정보를 보유할 수 있습니다.
          </li>
          <li>
            위 1, 2항에도 불구하고 다른 법령 또는 위치정보법에 따라 보유해야
            하는 정당한 사유가 있는 경우에는 그에 따릅니다.
          </li>
        </ul>
      </Description>

      <Divider className="px-4" />

      <Description title="제8조 (개인위치정보주체의 권리)">
        <ul className="list-decimal pl-5 text-sm space-y-2 leading-relaxed mb-2">
          <li>
            이용자는 언제든지 개인위치정보를 이용한 위치기반서비스의 이용 및
            제공에 대한 동의 전부 또는 일부를 유보할 수 있습니다.
          </li>
          <li>
            이용자는 언제든지 개인위치정보를 이용한 위치기반서비스의 이용 및
            제공에 대한 동의 전부 또는 일부를 철회할 수 있습니다. 이 경우
            운영진은 지체 없이 철회된 범위의 개인위치정보 및 위치정보
            이용·제공사실 확인자료를 파기합니다.
          </li>
          <li>
            이용자는 개인위치정보의 이용·제공의 일시적인 중지를 요구할 수
            있습니다. 이 경우 운영진은 이를 거절할 수 없으며 이를 충족하는
            기술적 수단을 마련합니다.
          </li>
          <li>
            이용자는 운영진에 대하여 아래 자료에 대한 열람 또는 고지를 요구할 수
            있으며, 해당 자료에 오류가 있는 경우에는 정정을 요구할 수 있습니다.
            이 경우 운영진은 정당한 사유 없이 요구를 거절하지 않습니다.
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>이용자에 대한 위치정보 이용·제공사실 확인자료</li>
              <li>
                이용자의 개인위치정보가 관련 법령에 따라 제3자에게 제공된 이유
                및 내용
              </li>
            </ul>
          </li>
          <li>
            이용자는 권리행사를 위해 본 약관 제14조의 연락처를 이용하여 운영진에
            요청할 수 있습니다.
          </li>
        </ul>
      </Description>

      <Description title="제9조 (손해배상)">
        운영진의 위치정보의 보호 및 이용 등에 관한 법률 제15조 및 26조의 규정을
        위반한 행위로 인해 손해를 입은 경우 이용자는 회사에 손해배상을 청구할 수
        있습니다. 운영진은 고의, 과실이 없음을 입증하지 못하는 경우 책임을 면할
        수 없습니다.
      </Description>

      <Divider className="px-4" />

      <Description title="제10조 (면책)">
        <ul className="list-decimal pl-5 text-sm space-y-2 leading-relaxed mb-2">
          <li>
            운영진은 다음 각 호의 경우로 위치기반서비스를 제공할 수 없는 경우,
            이로 인하여 이용자에게 발생한 손해에 대해서는 책임을 부담하지
            않습니다.
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>천재지변 또는 이에 준하는 불가항력의 상태가 있는 경우</li>
              <li>
                이용자의 귀책사유로 위치기반서비스 이용에 장애가 있는 경우
              </li>
              <li>
                제1호 및 제2호를 제외한 기타 운영진의 고의 또는 과실이 없는
                사유로 인한 경우
              </li>
            </ul>
          </li>
          <li>
            운영진은 위치기반서비스에 게재된 정보, 자료, 사실의 신뢰도 및 정확성
            등에 대해 보증하지 않으며, 이로 인해 발생한 이용자의 손해에 대해서도
            책임을 부담하지 않습니다.
          </li>
        </ul>
      </Description>

      <Divider className="px-4" />

      <Description title="제11조 (사업자 및 위치정보관리책임자 정보)">
        <ul className="list-decimal pl-5 text-sm space-y-2 leading-relaxed">
          <li>
            운영진의 상호, 주소 및 연락처는 아래와 같습니다.
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <strong>상호</strong>: 좋아하면 숭리는
              </li>
              <li>
                <strong>주소</strong>: 서울특별시 동작구 상도로61가길 10
              </li>
              <li>
                <strong>연락처</strong>: duroodu@gmail.com
              </li>
            </ul>
          </li>
          <li>
            운영진은 개인위치정보를 적절히 관리·보호하고, 이용자의 불만을 원활히
            처리할 수 있도록 실질적인 책임을 질 수 있는 지위에 있는 자를
            위치정보관리책임자로 지정해 운영하고 있습니다. 위치정보관리책임자는
            위치기반서비스를 제공하거나 관리하는 부서의 부서장으로서, 성명과
            연락처는 아래와 같습니다.
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <strong>성명</strong>: 김경하
              </li>
              <li>
                <strong>연락처</strong>: duroodu@gmail.com
              </li>
            </ul>
          </li>
        </ul>
      </Description>

      <Divider className="px-4" />

      <Description title="부칙">
        본 약관은 2025년 9월 23일부터 적용됩니다. 다만, 신규 회원에 대해서는
        회원 가입시부터 본 약관이 적용됩니다.
        <br /> 위치기반서비스와 관련한 모든 문의사항은 으로 보내주시기 바랍니다.
      </Description>
    </div>
  );
};
