// 页面内容通用容器：限制最大宽度并设置左右留白
type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="container mx-auto px-5">{children}</div>;
};

export default Container;
