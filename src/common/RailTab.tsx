import clsx from "clsx";

interface EditTabType {
  label: string;
  chip?: string;
}

interface Props {
  tabs: EditTabType[];
  selectedTab: string;
  onChange: (tab: string) => void;
}

export const RailTab = ({ tabs, selectedTab, onChange }: Props) => {
  return (
    <div className="flex w-full border-b-1 border-divider-regular px-2 h-14">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          onClick={() => onChange(tab.label)}
          className={clsx(
            "flex-1 px-4 py-4 flex justify-center items-center gap-2 text-base cursor-pointer",
            selectedTab === tab.label
              ? "text-content-base font-bold border-b-2 border-content-base"
              : "text-disabled font-normal"
          )}
        >
          <span>{tab.label}</span>
          {tab.chip && (
            <span className="py-0.5 px-1.5 rounded-sm bg-fill-regular text-xs font-medium">
              {tab.chip}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};
