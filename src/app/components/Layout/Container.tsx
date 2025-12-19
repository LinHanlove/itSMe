type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <div className="container relative mx-auto w-full max-w-[74ch] flex-1 px-4 pt-20">
      {children}
    </div>
  );
};

export default Container;
