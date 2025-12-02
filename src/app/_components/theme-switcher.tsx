// 客户端主题切换组件：支持 system/dark/light，并避免切换时的 FOUC
"use client";

import styles from "./switch.module.css";
import { memo, useEffect, useState } from "react";

declare global {
  // 挂在到 window 上的全局函数，用于更新 DOM class
  var updateDOM: () => void;
}

type ColorSchemePreference = "system" | "dark" | "light";

const STORAGE_KEY = "nextjs-blog-starter-theme";
const modes: ColorSchemePreference[] = ["system", "dark", "light"];

/** function to be injected in script tag for avoiding FOUC (Flash of Unstyled Content) */
export const NoFOUCScript = (storageKey: string) => {
  /* 不能直接引用外部常量，因此在函数内重新定义 */
  const [SYSTEM, DARK, LIGHT] = ["system", "dark", "light"];

  /** 临时禁用全局过渡动画，避免主题切换时出现明显闪烁 */
  const modifyTransition = () => {
    const css = document.createElement("style");
    css.textContent = "*,*:after,*:before{transition:none !important;}";
    document.head.appendChild(css);

    return () => {
      /* 触发一次重绘 */
      getComputedStyle(document.body);
      /* 下一帧再移除临时样式 */
      setTimeout(() => document.head.removeChild(css), 1);
    };
  };

  const media = matchMedia(`(prefers-color-scheme: ${DARK})`);

  /** 核心：根据用户 / 系统偏好为 html 元素增删 dark class */
  window.updateDOM = () => {
    const restoreTransitions = modifyTransition();
    const mode = localStorage.getItem(storageKey) ?? SYSTEM;
    const systemMode = media.matches ? DARK : LIGHT;
    const resolvedMode = mode === SYSTEM ? systemMode : mode;
    const classList = document.documentElement.classList;
    if (resolvedMode === DARK) classList.add(DARK);
    else classList.remove(DARK);
    document.documentElement.setAttribute("data-mode", mode);
    restoreTransitions();
  };
  // 首次执行，确保首屏就有正确的主题
  window.updateDOM();
  // 当系统主题变化时，同步更新
  media.addEventListener("change", window.updateDOM);
};

let updateDOM: () => void;

/**
 * Switch button to quickly toggle user preference.
 */
const Switch = () => {
  const [mode, setMode] = useState<ColorSchemePreference>(
    () =>
      ((typeof localStorage !== "undefined" &&
        localStorage.getItem(STORAGE_KEY)) ??
        "system") as ColorSchemePreference
  );

  useEffect(() => {
    // 将注入脚本里的全局函数缓存到局部变量
    updateDOM = window.updateDOM;
    /** 多标签页之间通过 storage 事件同步主题 */
    addEventListener("storage", (e: StorageEvent): void => {
      e.key === STORAGE_KEY && setMode(e.newValue as ColorSchemePreference);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
    updateDOM();
  }, [mode]);

  /** 用户点击时在 system/dark/light 三种模式之间轮换 */
  const handleModeSwitch = () => {
    const index = modes.indexOf(mode);
    setMode(modes[(index + 1) % modes.length]);
  };
  return (
    <button
      suppressHydrationWarning
      className={styles.switch}
      onClick={handleModeSwitch}
    />
  );
};

// 以 script 标签的形式注入 `NoFOUCScript`
const Script = memo(() => (
  <script
    dangerouslySetInnerHTML={{
      __html: `(${NoFOUCScript.toString()})('${STORAGE_KEY}')`,
    }}
  />
));

/**
 * 主题切换组件：负责注入脚本 + 提供一个可点击的切换按钮
 */
export const ThemeSwitcher = () => {
  return (
    <>
      <Script />
      <Switch />
    </>
  );
};
