import Arrow_Back from "@/assets/icons/arrow_back.svg?url";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
}

export const Header = ({ title }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center">
        <img
          src={Arrow_Back}
          alt="arrow_back"
          className="size-6 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <span className="text-lg font-medium text-base]">{title}</span>
        <span className="size-6"></span>
      </div>
    </div>
  );
};
