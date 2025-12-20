import { highlightCode } from "@/app/utils/modules/shiki";

type Props = {
  children: string;
  className?: string;
};

export default async function CodeBlock({ children, className }: Props) {
  const language = className?.replace("language-", "");
  const html = await highlightCode(children.trim(), language);

  return (
    <div
      className="my-6 rounded-lg overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
