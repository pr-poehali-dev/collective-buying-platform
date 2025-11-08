import { useEffect, useState } from "react";
import Header from "@/components/Header";
import PopularCarousel from "@/components/PopularCarousel";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const API_URL = "https://functions.poehali.dev/9b3803bb-4e20-4d83-829c-91986e79429e";

interface Product {
  id: number;
  title: string;
  image_url: string;
  total_price: number;
  max_participants: number;
  current_participants: number;
  price_per_person: number;
  status: "recruiting" | "collecting" | "purchasing" | "distributing";
}

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PopularCarousel />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Все складчины Forex</h2>
            <p className="text-muted-foreground">Цифровые продукты для трейдинга по доступным ценам</p>
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
          {loading ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              Загрузка складчин...
            </div>
          ) : products.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              Пока нет активных складчин
            </div>
          ) : (
            products.map((product) => (
              <ProductCard 
                key={product.id} 
                id={product.id}
                title={product.title}
                image={product.image_url || "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop"}
                totalPrice={product.total_price}
                currentParticipants={product.current_participants}
                maxParticipants={product.max_participants}
                pricePerPerson={product.price_per_person}
                status={product.status}
              />
            ))
          )}
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
          <p className="text-xl mb-12 opacity-90">Доступ к премиум продуктам по минимальным ценам</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                1️⃣
              </div>
              <h3 className="text-xl font-bold mb-2">Создай или выбери</h3>
              <p className="opacity-90">Создай свою складчину или присоединись к существующей</p>
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
              <h3 className="text-xl font-bold mb-2">Покупка и доступ</h3>
              <p className="opacity-90">Продукт покупается, все получают доступ к файлам</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Категории продуктов</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <a href="#" className="group flex flex-col items-center p-6 bg-gray-50 hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 rounded-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🤖</span>
              </div>
              <span className="font-semibold text-center">Советники</span>
              <span className="text-sm text-muted-foreground">87 EA</span>
            </a>

            <a href="#" className="group flex flex-col items-center p-6 bg-gray-50 hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 rounded-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-3xl">📈</span>
              </div>
              <span className="font-semibold text-center">Индикаторы</span>
              <span className="text-sm text-muted-foreground">124 шт.</span>
            </a>

            <a href="#" className="group flex flex-col items-center p-6 bg-gray-50 hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 rounded-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🎯</span>
              </div>
              <span className="font-semibold text-center">Стратегии</span>
              <span className="text-sm text-muted-foreground">63 стратегии</span>
            </a>

            <a href="#" className="group flex flex-col items-center p-6 bg-gray-50 hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 rounded-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🎓</span>
              </div>
              <span className="font-semibold text-center">Курсы</span>
              <span className="text-sm text-muted-foreground">45 курсов</span>
            </a>

            <a href="#" className="group flex flex-col items-center p-6 bg-gray-50 hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 rounded-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-3xl">📚</span>
              </div>
              <span className="font-semibold text-center">Книги</span>
              <span className="text-sm text-muted-foreground">38 книг</span>
            </a>

            <a href="#" className="group flex flex-col items-center p-6 bg-gray-50 hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 rounded-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-3xl">📦</span>
              </div>
              <span className="font-semibold text-center">Пакеты</span>
              <span className="text-sm text-muted-foreground">29 пакетов</span>
            </a>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 ForexСкладчина. Премиум продукты по доступным ценам! 🚀</p>
        </div>
      </footer>
    </div>
  );
}