import Ticket from "@/assets/icons/ic_ticket.svg";
import { useState, type ReactNode } from "react";
import { Button } from "../common/Button";
import { useLoaderData } from "react-router-dom";

type Payment = {
  id: number;
  content: string;
  value: number;
};

const PAYMENT_CONST = [
  { id: 1, content: "슬롯 1개 열기", value: 500 },
  { id: 2, content: "슬롯 2개 열기", value: 700 },
  { id: 3, content: "슬롯 3개 열기", value: 1000 },
  { id: 4, content: "티켓 1개", value: 1500 },
  { id: 5, content: "무제한 패스", value: 3900 },
];

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-row w-full justify-between px-4">{children}</div>
  );
};

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col w-full justify-between px-4">{children}</div>
  );
};

const Border = () => {
  return <div className="w-full h-1 bg-divider-regular my-2.5" />;
};

const Title = ({ title }: { title: string }) => {
  return (
    <div className="w-full flex justify-start pt-2.5 pb-1 text-[20px] font-bold">
      {title}
    </div>
  );
};

const List = ({
  item,
  select,
  onSelect,
}: {
  item: Payment;
  select: Payment | null;
  onSelect: (item: Payment) => void;
}) => {
  const checked = select?.id === item.id;

  return (
    <label
      className="flex flex-row gap-x-2.5 h-full items-center justify-start py-2.5 cursor-pointer"
      htmlFor={`payment-${item.id}`}
    >
      <input
        id={`payment-${item.id}`}
        type="radio"
        name="payment"
        className="peer hidden"
        checked={checked}
        onChange={() => onSelect(item)}
        aria-label={item.content}
      />
      <span
        className="
          w-5 h-5 rounded-full flex items-center justify-center
          border border-outline-regular
          peer-checked:bg-main1
          transition
        "
      >
        <span
          className="
            w-2.5 h-2.5 rounded-full bg-white
            hidden peer-checked:block
          "
        />
      </span>

      <div className="flex flex-col gap-y-0.5">
        <div className="text-[16px] text-base">{item.content}</div>
        <div className="text-[12px] font-light text-additive">
          {item.value}원
        </div>
      </div>
    </label>
  );
};

export const Coin = () => {
  const { ticketNumber } = useLoaderData();
  const [select, setSelect] = useState<Payment | null>(null);

  const handleSelect = (item: Payment) => setSelect(item);

  const onPay = () => {
    if (select == null) {
      alert("결제 옵션을 선택해주세요.");
      return;
    }
    const chosen = PAYMENT_CONST.find((p) => p.id === select.id)!;
    console.log("결제 선택:", chosen);
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col w-full gap-y-1 justify-cenbter items-start">
        <Header>
          <div className="flex flex-row gap-x-2 pt-2.5">
            <img src={Ticket} alt="Ticket" />
            <div className="text-assistive font-light text-[16px]">
              내 채팅 티켓
            </div>
          </div>
          <div className=" text-additive text-[16px] pt-2.5">
            {ticketNumber.data.chatTicket} 개
          </div>
        </Header>
        <Border />

        <Wrapper>
          <Title title="채팅 슬롯" />
          <List
            item={PAYMENT_CONST[0]}
            select={select}
            onSelect={handleSelect}
          />
          <List
            item={PAYMENT_CONST[1]}
            select={select}
            onSelect={handleSelect}
          />
          <List
            item={PAYMENT_CONST[2]}
            select={select}
            onSelect={handleSelect}
          />
        </Wrapper>
        <Border />

        <Wrapper>
          <Title title="채팅 연장 티켓" />
          <List
            item={PAYMENT_CONST[3]}
            select={select}
            onSelect={handleSelect}
          />
        </Wrapper>
        <Border />

        <Wrapper>
          <Title title="무제한 패스" />
          <List
            item={PAYMENT_CONST[4]}
            select={select}
            onSelect={handleSelect}
          />
        </Wrapper>
      </div>

      <div className="px-4 py-2.5">
        {select ? (
          <Button
            variant="primary"
            children={`${select?.value}원 결제하기`}
            onClick={() => onPay()}
          />
        ) : (
          <Button variant="secondary" children="결제하기" />
        )}
      </div>
    </div>
  );
};
