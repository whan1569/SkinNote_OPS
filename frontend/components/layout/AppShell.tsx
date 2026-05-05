import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-[280px] min-h-screen">
        <Header />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}