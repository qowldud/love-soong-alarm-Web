interface Props {
  title: string;
  subTitle?: string;
}

export const SectionHeader = ({ title, subTitle }: Props) => {
  return (
    <div className="w-full pt-2 pb-1 flex justify-between">
      <span className="px-1 text-lg font-bold text-content-base">{title}</span>
      {subTitle && <span className="px-1 text-sm font-normal">{subTitle}</span>}
    </div>
  );
};
