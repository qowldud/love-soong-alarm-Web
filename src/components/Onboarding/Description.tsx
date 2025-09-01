interface Props {
  title: string;
  subTitle: string;
}

export const Description = ({ title, subTitle }: Props) => {
  return (
    <div className="flex flex-col w-full py-4 px-5 gap-0.5">
      <span className="text-content-base text-xl font-bold">{title}</span>
      <span className="text-additive font-medium text-base">{subTitle}</span>
    </div>
  );
};
