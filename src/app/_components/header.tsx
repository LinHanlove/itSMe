// 全站顶部标题区域，点击可返回首页
import Link from "next/link";

const Header = () => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8 flex items-center">
      <Link href="/" className="hover:underline">
        Blog
      </Link>
      .
    </h2>
  );
};

export default Header;
