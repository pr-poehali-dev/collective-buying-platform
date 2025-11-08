import Header from "@/components/Header";
import PopularCarousel from "@/components/PopularCarousel";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const products = [
  {
    id: 1,
    title: "Игровая консоль PlayStation 5",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop",
    totalPrice: 50000,
    currentParticipants: 12,
    maxParticipants: 25,
    pricePerPerson: 2000,
    status: "recruiting" as const
  },
  {
    id: 2,
    title: "Робот-пылесос с влажной уборкой",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=300&fit=crop",
    totalPrice: 30000,
    currentParticipants: 18,
    maxParticipants: 20,
    pricePerPerson: 1500,
    status: "collecting" as const
  },
  {
    id: 3,
    title: "Кофемашина автоматическая Deluxe",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=300&fit=crop",
    totalPrice: 40000,
    currentParticipants: 10,
    maxParticipants: 10,
    pricePerPerson: 4000,
    status: "purchasing" as const
  },
  {
    id: 4,
    title: "Электросамокат с большим запасом хода",
    image: "https://images.unsplash.com/photo-1559311142-e5a8e1f77f3b?w=400&h=300&fit=crop",
    totalPrice: 35000,
    currentParticipants: 7,
    maxParticipants: 15,
    pricePerPerson: 2333,
    status: "recruiting" as const
  },
  {
    id: 5,
    title: "Набор профессиональных ножей",
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=300&fit=crop",
    totalPrice: 12000,
    currentParticipants: 10,
    maxParticipants: 12,
    pricePerPerson: 1000,
    status: "recruiting" as const
  },
  {
    id: 6,
    title: "Умная система освещения для дома",
    image: "https://images.unsplash.com/photo-1558089687-e5847c0eb5c6?w=400&h=300&fit=crop",
    totalPrice: 18000,
    currentParticipants: 9,
    maxParticipants: 12,
    pricePerPerson: 1500,
    status: "recruiting" as const
  }
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PopularCarousel />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Все совместные покупки</h2>
            <p className="text-muted-foreground">Найди то, что тебе нужно, и экономь вместе с другими</p>
          </div>
          
          <Tabs defaultValue="all" className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="recruiting">Набор участников</TabsTrigger>
              <TabsTrigger value="collecting">Сбор средств</TabsTrigger>
              <TabsTrigger value="active">Активные</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" size="lg">
            Загрузить ещё
          </Button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Как это работает?</h2>
          <p className="text-xl mb-12 opacity-90">Экономь до 80% на покупках вместе с другими людьми</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                1️⃣
              </div>
              <h3 className="text-xl font-bold mb-2">Создай или выбери</h3>
              <p className="opacity-90">Создай свою покупку или присоединись к существующей</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                2️⃣
              </div>
              <h3 className="text-xl font-bold mb-2">Набор участников</h3>
              <p className="opacity-90">Дождись, пока наберётся нужное количество людей</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                3️⃣
              </div>
              <h3 className="text-xl font-bold mb-2">Сбор средств</h3>
              <p className="opacity-90">Все участники вносят свою часть оплаты</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                4️⃣
              </div>
              <h3 className="text-xl font-bold mb-2">Покупка и раздача</h3>
              <p className="opacity-90">Товар покупается и распределяется между участниками</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Категории товаров</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <a href="#" className="group flex flex-col items-center p-6 bg-gray-50 hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 rounded-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-3xl">📱</span>
              </div>
              <span className="font-semibold text-center">Электроника</span>
              <span className="text-sm text-muted-foreground">124 товара</span>
            </a>

            <a href="#" className="group flex flex-col items-center p-6 bg-gray-50 hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 rounded-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🏠</span>
              </div>
              <span className="font-semibold text-center">Для дома</span>
              <span className="text-sm text-muted-foreground">89 товаров</span>
            </a>

            <a href="#" className="group flex flex-col items-center p-6 bg-gray-50 hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 rounded-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🎮</span>
              </div>
              <span className="font-semibold text-center">Игры и хобби</span>
              <span className="text-sm text-muted-foreground">67 товаров</span>
            </a>

            <a href="#" className="group flex flex-col items-center p-6 bg-gray-50 hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 rounded-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-3xl">⚽</span>
              </div>
              <span className="font-semibold text-center">Спорт</span>
              <span className="text-sm text-muted-foreground">53 товара</span>
            </a>

            <a href="#" className="group flex flex-col items-center p-6 bg-gray-50 hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 rounded-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-3xl">👗</span>
              </div>
              <span className="font-semibold text-center">Одежда</span>
              <span className="text-sm text-muted-foreground">98 товаров</span>
            </a>

            <a href="#" className="group flex flex-col items-center p-6 bg-gray-50 hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 rounded-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🍽️</span>
              </div>
              <span className="font-semibold text-center">Кухня</span>
              <span className="text-sm text-muted-foreground">71 товар</span>
            </a>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 СовместныеПокупки. Экономь вместе с нами! 🚀</p>
        </div>
      </footer>
    </div>
  );
}