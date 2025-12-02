// 集中注册可以在 MDX 中使用的 React 组件
// 约定：这里导出的名字，就是在 Markdown/MDX 里使用的组件名

export { default as Demo } from "./Demo";
// 以后新增组件时，只需要在这里继续导出即可，例如：
// export { default as MyChart } from "./MyChart";
