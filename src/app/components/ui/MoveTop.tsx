"use client";

import { Icon } from "@iconify/react";
import { useScroll } from "ahooks";
import { useMemo } from "react";

export default function MoveTop() {
  const scroll = useScroll(() => document);

  const visible = useMemo(() => {
    return (scroll?.top ?? 0) >= 100;
  }, [scroll?.top]);

  const onBackTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-10 right-10 z-50 animate-bounce"
      onClick={onBackTop}
    >
      <Icon
        icon="akar-icons:paper-airplane"
        width="28"
        height="28"
        className=""
      />
    </div>
  );
}
