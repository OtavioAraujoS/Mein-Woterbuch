import { Sidebar } from "./layout/Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex text-text-primary font-sans overflow-hidden">
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-emerald-accent/5 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-surface/20 blur-[100px] pointer-events-none z-0" />

      <Sidebar />

      <main className="flex-1 md:ml-[240px] relative z-10 flex flex-col items-center justify-center min-h-screen overflow-y-auto pb-20 md:pb-0">
        <div className="w-full max-w-[600px] px-6 flex flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
