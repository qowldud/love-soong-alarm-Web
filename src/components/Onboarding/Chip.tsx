interface Props {
  label: string;
}

export const Chip = ({ label }: Props) => {
  return (
    <div className="flex items-center justify-center px-2 py-1.5 rounded-lg bg-main3 text-main1 text-sm font-normal">
      <span className="px-0.5">{label}</span>
    </div>
  );
};
