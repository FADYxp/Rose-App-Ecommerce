import DashboardBreadcrumb from "./_components/bread-crumb";
import { BreadcrumbProvider } from "./_components/bread-crumb/breadcrumb-context";
import DashboardSidebar from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BreadcrumbProvider>
      <div className="flex min-h-screen">
        <aside className="w-64">
          <DashboardSidebar />
        </aside>

        <main className="flex flex-col flex-1">
          <div>
            <DashboardBreadcrumb />
          </div>
          <div className="bg-zinc-50 p-3 flex-1">
            <div className="bg-white p-3 rounded-xl">{children}</div>
          </div>
        </main>
      </div>
    </BreadcrumbProvider>
  );
}
