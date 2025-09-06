"use client";

import { cn } from "@/lib/utils";
import {
    MotionProps,
    MotionConfig,
    motion,
    AnimatePresence,
    Transition,
} from "framer-motion";
import { useEffect, useId, useState } from "react";
import { TbX, TbMenu } from "react-icons/tb";

const blurAni: MotionProps = {
  variants: {
    ini: { filter: "blur(6px)", scale: 0.8, opacity: 0.5 },
    ani: { filter: "blur(0px)", scale: 1, opacity: 1 },
    exit: { filter: "blur(6px)", opacity: 0, scale: 0.8 },
  },

  initial: "ini",
  animate: "ani",
  exit: "exit",
  transition: { duration: 0.4, ease: [0.23, 1, 0.320, 1] },
};

export interface MenuItem {
  icon: React.ReactElement;
  name?: string;
  metadata?: any;
  value?: any;
}

interface Props {
  items: MenuItem[];
  className?: string;
  filterId?: string;
  transition?: Transition;
  onChange?: (item: MenuItem) => void;
  direction?: "left" | "right" | "top" | "bottom";
}

function GooeyMenu({
  items,
  className,
  onChange,
  transition = { type: "spring", duration: 0.6, bounce: 0.25 },
  filterId: _fi = "gooey-menu-filter",
  direction = "top",
}: Props) {
  const [open, setOpen] = useState(false);
  const id = useId();

  function handleClick(item: MenuItem) {
    setOpen(false);
    onChange?.(item);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const dir = direction === "left" || direction === "top" ? -1 : 1;

  const fId = _fi || `gooey-menu-filter-${id}`;
  const mId = `${fId}-menu`;
  return (
    <MotionConfig transition={transition}>
      <div className="relative">
        <div style={{ filter: `url(#${fId})` }}>
          <div
            id={mId}
            role="menu"
            aria-hidden={!open}
            className="absolute top-0 left-0"
          >
            <div className="relative size-12">
              {items.map((i, idx) => (
                <motion.button
                  key={idx}
                  aria-label={i.name}
                  tabIndex={open ? 0 : -1}
                  role="menuitem"
                  custom={idx}
                  animate={{
                    [axis]: open
                      ? `calc(${100 * dir * (idx + 1)}% + ${-(idx + 1) * dir * 10}px )`
                      : 0,
                  }}
                  className={cn(
                    "absolute inset-0 flex size-12 cursor-pointer items-center justify-center rounded-full",
                    "bg-[#EAF4F4] text-black border border-black/10 shadow-sm",
                    "hover:bg-[#CCE3DE] hover:scale-105 hover:shadow-md",
                    "active:scale-95 active:bg-[#CCE3DE]",
                    "transition-all duration-300 ease-out",
                    "[&>svg]:transition-all [&>svg]:duration-300 [&>svg]:opacity-70 hover:[&>svg]:opacity-100",
                  )}
                  onClick={() => handleClick(i)}
                >
                  {i.icon}
                  <span className="sr-only">{i.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <button
            className={cn(
              "relative z-10 flex size-12 cursor-pointer items-center justify-center rounded-full",
              "bg-[#EAF4F4] text-black border border-black/20 shadow-lg",
              "hover:bg-[#CCE3DE] hover:scale-110 hover:shadow-xl hover:border-black/30",
              "active:scale-100 active:bg-[#CCE3DE]",
              "transition-all duration-300 ease-out",
              className,
            )}
            onClick={() => setOpen(!open)}
            aria-haspopup="true"
            aria-expanded={open}
            aria-controls={mId}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span {...blurAni} key={open ? "open" : "close"}>
                {open ? <TbX /> : <TbMenu />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
        <SvgFilter id={fId} />
      </div>
    </MotionConfig>
  );
}

function SvgFilter({ id }: { id: string }) {
  return (
    <svg
      style={{ position: "absolute", width: 0, height: 0 }}
      className="pointer-events-none"
    >
      <defs>
        <filter id={id}>
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="4"
            result="blur-sm"
          />
          <feColorMatrix
            in="blur-sm"
            mode="matrix"
            values="
                  1 0 0 0 0  
                  0 1 0 0 0  
                  0 0 1 0 0  
                  0 0 0 18 -7
                "
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
  );
}

export default GooeyMenu;
