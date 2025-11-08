import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export default function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <Icon name="TrendingUp" className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ForexСкладчина
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-foreground/70 hover:text-foreground transition">Каталог</a>
          <a href="#" className="text-foreground/70 hover:text-foreground transition">Мои складчины</a>
          <a href="#" className="text-foreground/70 hover:text-foreground transition">Как это работает</a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Icon name="Search" size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="Bell" size={20} />
          </Button>
          <Button>
            <Icon name="Plus" size={18} className="mr-2" />
            Создать складчину
          </Button>
        </div>
      </div>
    </header>
  );
}