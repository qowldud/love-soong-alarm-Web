import Arrow_Back from "@/assets/icons/arrow_back.svg?url";

interface Props {
  title: string;
  onClick?: () => void;
}

export const Header = ({ title, onClick }: Props) => {
  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center">
        <img
          src={Arrow_Back}
          alt="arrow_back"
          className="size-6"
          onClick={onClick}
        />
        <span className="text-lg font-medium text-content-base">{title}</span>
        <span className="size-6"></span>
      </div>
    </div>
  );
};
