interface Props {
  per?: string;
}

export const ProgressBar = ({ per = "0%" }: Props) => {
  return (
    <div className="w-full h-1 bg-outline-regular">
      <div
        className={"bg-main1 h-full"}
        style={{
          width: per,
        }}
      ></div>
    </div>
  );
};
