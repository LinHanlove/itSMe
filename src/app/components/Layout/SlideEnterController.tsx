"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SlideEnterController() {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;

    // 如果不是从顶部进入（例如路由切换 / 返回）
    if (window.scrollY > 0) {
      html.classList.add("no-sliding");
    } else {
      html.classList.remove("no-sliding");
    }

    // 首次加载后清一次（防止 hydration 后残留）
    requestAnimationFrame(() => {
      if (window.scrollY === 0) html.classList.remove("no-sliding");
    });
  }, [pathname]);

  return null;
}
