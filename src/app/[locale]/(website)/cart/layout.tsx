type CartLayoutProps = {
  children: React.ReactNode;
  summary: React.ReactNode;
};

export default function CartLayout({ children, summary }: CartLayoutProps) {
  return (
    <div className="flex justify-between px-20 gap-10">
      <div className="w-[48rem]">{children}</div>
      {/* TODO: summary will design later! */}
      {/* <div className="summary bg-red-300 h-32 w-[28.6rem]">{summary}</div> */}
    </div>
  );
}
