"use client";

import {
    TbHome,
    TbMail,
    TbUser,
    TbSettings,
    TbChevronUp,
    TbChevronDown,
    TbChevronLeft,
    TbChevronRight,
} from "react-icons/tb";
import GooeyMenu, { MenuItem } from ".";
import { useState } from "react";
import Tabs, { TabItem } from "@/components/ui/tabs";

const items: MenuItem[] = [
  { icon: <TbHome size={18} />, name: "Home", value: "home" },
  { icon: <TbMail size={18} />, name: "Mail", value: "mail" },
  { icon: <TbUser size={18} />, name: "User", value: "user" },
  { icon: <TbSettings size={18} />, name: "Settings", value: "settings" },
];

const TDATA: TabItem[] = [
  { name: "0.4s", value: 0.4 },
  { name: "2s", value: 2 },
];

const DIR: TabItem[] = [
  { icon: <TbChevronUp strokeWidth={2.5} />, value: "top" },
  { icon: <TbChevronDown strokeWidth={2.5} />, value: "bottom" },
  { icon: <TbChevronLeft strokeWidth={2.5} />, value: "left" },
  { icon: <TbChevronRight strokeWidth={2.5} />, value: "right" },
];

const GooeyButtonDemo = () => {
  const [dur, setDur] = useState(TDATA[0]);
  const [dir, setDir] = useState(DIR[0]);

  return (
    <div className="box relative flex min-h-[400px] items-center justify-center py-8">
      <div className="absolute top-0 right-0 m-4 flex flex-col items-end gap-2">
        <Tabs tabs={DIR} tab={dir} setTab={setDir} small className="h-7" />
        <Tabs tabs={TDATA} tab={dur} setTab={setDur} small className="h-7" />
      </div>

      <GooeyMenu
        items={items}
        direction={dir.value}
        transition={{ type: "spring", bounce: 0.3, duration: dur.value }}
      />
    </div>
  );
};
export default GooeyButtonDemo;
