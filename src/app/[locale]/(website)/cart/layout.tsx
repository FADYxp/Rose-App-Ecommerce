type CartLayoutProps = {
  children: React.ReactNode;
  summary: React.ReactNode;
};

export default function CartLayout({ children }: CartLayoutProps) {
  return (
    <div className="flex px-20 ">
      <div className="w-full">{children}</div>
      {/* TODO: summary will design later! */}
      {/* <div className="summary bg-red-300 h-32 w-[28.6rem]">{summary}</div> */}
    </div>
  );
}
