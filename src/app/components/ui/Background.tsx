"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { subscribeBackground, type BackgroundType } from "@/app/hooks";
import FlowBackground from "./FlowBackground";
import TreeBackground from "./TreeBackground";
import PatternBackground from "./PatternBackground";

export default function BackgroundRoot() {
  const [type, setType] = useState<BackgroundType>("off");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return subscribeBackground(setType);
  }, []);

  if (!mounted || type === "off") return null;

  return createPortal(
    <>
      {type === "flow" && <FlowBackground />}
      {type === "tree" && <TreeBackground />}
      {type === "pattern" && <PatternBackground />}
    </>,
    document.body
  );
}
