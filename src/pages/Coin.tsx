import Ticket from "@/assets/icons/ic_ticket.svg";
import { useState, type ReactNode } from "react";
import { Button } from "../common/Button";
import { useLoaderData } from "react-router-dom";
import clsx from "clsx";
import { getPaymentUrl } from "../api/payment";

interface Payment {
  id: number;
  label: string;
  value: string;
  price: number;
}

const PAYMENT_CONST = [
  { id: 1, label: "슬롯 1개 열기", value: "SLOT_1", price: 1000 },
  { id: 2, label: "슬롯 2개 열기", value: "SLOT_2", price: 1200 },
  { id: 3, label: "슬롯 3개 열기", value: "SLOT_3", price: 1300 },
  { id: 4, label: "티켓 1개", value: "CHAT_TICKET", price: 1500 },
  { id: 5, label: "무제한 패스", value: "PREPASS", price: 3900 },
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
  isFreePass,
}: {
  item: Payment;
  select: Payment | null;
  onSelect: (item: Payment) => void;
  isFreePass: boolean;
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
        aria-label={item.label}
        disabled={isFreePass}
      />

      <span
        className={clsx(
          "w-6 h-6 rounded-full flex items-center justify-center transition-all",
          checked ? "bg-main1" : "border border-outline-regular"
        )}
      >
        <span className="w-3 h-3 bg-white rounded-full" />
      </span>

      <div className="flex flex-col gap-y-0.5">
        <div className="text-[16px] text-base">{item.label}</div>
        <div className="text-[12px] font-light text-additive">
          {item.price}원
        </div>
      </div>
    </label>
  );
};

export const Coin = () => {
  const { ticketNumber } = useLoaderData();
  const [select, setSelect] = useState<Payment | null>(null);

  const isFreePass = ticketNumber?.data?.isPrepass;

  const handleSelect = (item: Payment) => setSelect(item);
  const onPay = async () => {
    if (!select) return alert("결제 옵션을 선택해주세요.");
    const chosen = PAYMENT_CONST.find((p) => p.id === select.id)!;
    try {
      const res1 = await getPaymentUrl({ item: chosen.value });

      if (res1.success) {
        const url = res1.data.url;
        window.location.href = url;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className=" overflow-y-auto flex flex-col w-full gap-y-1 px-0 pb-17">
        <Header>
          <div className="flex flex-row gap-x-2 pt-2.5">
            <img src={Ticket} alt="Ticket" />
            <div className="text-assistive font-light text-base">
              내 채팅 티켓
            </div>
          </div>
          <div className=" text-additive text-base pt-2.5">
            {ticketNumber.data.chatTicket} 개
          </div>
        </Header>
        <Border />

        <Wrapper>
          <Title title="채팅 슬롯" />
          <div className="text-xs text-assistive pb-3">
            채팅 슬롯 잠금을 풀어 여러 상대와 대화할 수 있어요
          </div>
          {PAYMENT_CONST.slice(0, 3).map((p) => (
            <List
              key={p.id}
              item={p}
              select={select}
              onSelect={handleSelect}
              isFreePass={isFreePass}
            />
          ))}
        </Wrapper>
        <Border />

        <Wrapper>
          <Title title="채팅 연장 티켓" />
          <div className="text-xs text-assistive pb-3">
            한 채팅방 내에서 제한 없이 대화할 수 있어요
          </div>
          <List
            item={PAYMENT_CONST[3]}
            select={select}
            onSelect={handleSelect}
            isFreePass={isFreePass}
          />
        </Wrapper>
        <Border />

        <Wrapper>
          <Title title="무제한 패스" />
          <div className="text-xs text-assistive pb-3">
            슬롯이 무제한으로 열리고, 모든 채팅방에서 발신 제한이 풀려요
          </div>
          <List
            item={PAYMENT_CONST[4]}
            select={select}
            onSelect={handleSelect}
            isFreePass={isFreePass}
          />
        </Wrapper>
      </div>

      <div className="sticky w-full bottom-0 px-4 py-2.5 bg-white border-t border-[#EDEBF2] safe-bottom">
        <Button
          variant={`${select ? "primary" : "disabled"}`}
          onClick={onPay}
          disabled={!select}
        >
          {isFreePass
            ? "프리패스 사용자입니다"
            : `${select && `${select.price}원`} 결제하기`}
        </Button>
      </div>
    </div>
  );
};
