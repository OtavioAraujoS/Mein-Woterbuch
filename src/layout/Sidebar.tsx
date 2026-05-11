import { BookOpen, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavItem } from "@/layout/NavItem";
import { MobileNavItem } from "@/layout/MobileNavItem";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab =
    location.pathname === "/library" ? "biblioteca" : "pesquisar";

  return (
    <>
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-[240px] bg-background-absolute border-r border-surface/30 flex-col py-6 z-50 glass-panel rounded-r-xl">
        <div className="px-6 mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Mein Wörterbuch
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mt-1 font-semibold">
            Um dicionário pessoal
          </p>
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <NavItem
            id="nav-search"
            icon={<Search size={18} />}
            label="Buscar"
            active={activeTab === "pesquisar"}
            onClick={() => navigate("/")}
          />
          <NavItem
            id="nav-library"
            icon={<BookOpen size={18} />}
            label="Biblioteca"
            active={activeTab === "biblioteca"}
            onClick={() => navigate("/library")}
          />
        </div>
      </nav>

      <nav className="md:hidden fixed bottom-0 left-0 w-full glass-panel z-50 rounded-t-xl border-t border-white/5">
        <div className="flex justify-around items-center h-16">
          <MobileNavItem
            icon={<Search size={20} />}
            label="Buscar"
            active={activeTab === "pesquisar"}
            onClick={() => navigate("/")}
          />
          <MobileNavItem
            icon={<BookOpen size={20} />}
            label="Biblioteca"
            active={activeTab === "biblioteca"}
            onClick={() => navigate("/library")}
          />
        </div>
      </nav>
    </>
  );
}
