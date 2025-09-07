export const Title = ({ title, sub }: { title: string; sub?: string }) => {
  return (
    <div className="w-full flex flex-col gap-y-1">
      <div
        className="font-bold text-[20px] text-[#231D33]"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {sub && (
        <div
          className="font-light text-[16px] text-[#231D33FF]"
          dangerouslySetInnerHTML={{ __html: sub }}
        />
      )}
    </div>
  );
};
