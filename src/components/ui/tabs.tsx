"use client";

import { cn } from "@/lib/utils";

export interface TabItem {
  name?: string;
  value: any;
  icon?: React.ReactElement;
}

interface TabsProps {
  tabs: TabItem[];
  tab: TabItem;
  setTab: (tab: TabItem) => void;
  small?: boolean;
  className?: string;
}

const Tabs = ({ tabs, tab, setTab, small = false, className }: TabsProps) => {
  return (
    <div
      className={cn(
        "flex items-center rounded-lg border bg-background p-1",
        small ? "h-8 text-xs" : "h-10 text-sm",
        className
      )}
    >
      {tabs.map((item, index) => (
        <button
          key={index}
          onClick={() => setTab(item)}
          className={cn(
            "relative flex items-center justify-center rounded-md px-3 py-1.5 font-medium transition-all",
            tab.value === item.value
              ? "bg-white text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
            small ? "h-6 px-2 text-xs" : "h-8 px-3 text-sm"
          )}
        >
          {item.icon && <span className="mr-1">{item.icon}</span>}
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
