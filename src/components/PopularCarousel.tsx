import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Product {
  id: number;
  title: string;
  image: string;
  totalPrice: number;
  currentParticipants: number;
  maxParticipants: number;
  pricePerPerson: number;
}

const popularProducts: Product[] = [
  {
    id: 1,
    title: "Беспроводные наушники Premium",
    image: "https://cdn.poehali.dev/projects/eb84c298-d91c-4705-b215-906eb79c4778/files/5f8b7140-6cff-47cf-b8f7-97eac2ff6dc2.jpg",
    totalPrice: 15000,
    currentParticipants: 8,
    maxParticipants: 10,
    pricePerPerson: 1500
  },
  {
    id: 2,
    title: "Умные часы Sport Edition",
    image: "https://cdn.poehali.dev/projects/eb84c298-d91c-4705-b215-906eb79c4778/files/befd6712-dc6e-418f-a784-cf305516fecb.jpg",
    totalPrice: 25000,
    currentParticipants: 15,
    maxParticipants: 20,
    pricePerPerson: 1250
  },
  {
    id: 3,
    title: "Портативная колонка Mega Sound",
    image: "https://cdn.poehali.dev/projects/eb84c298-d91c-4705-b215-906eb79c4778/files/fcde9c21-469a-4a8c-83b3-54a8bb8798b8.jpg",
    totalPrice: 8000,
    currentParticipants: 6,
    maxParticipants: 8,
    pricePerPerson: 1000
  }
];

export default function PopularCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % popularProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + popularProducts.length) % popularProducts.length);
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">🔥 Популярное сейчас</h2>
            <p className="text-muted-foreground">Товары, которые скоро начнут собирать средства</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={prevSlide}>
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button variant="outline" size="icon" onClick={nextSlide}>
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out gap-4"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {popularProducts.map((product) => (
              <div 
                key={product.id} 
                className="min-w-full flex items-center gap-6 bg-white rounded-2xl p-6 shadow-lg"
              >
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-64 h-64 object-cover rounded-xl"
                />
                
                <div className="flex-1">
                  <Badge className="mb-3 bg-gradient-to-r from-primary to-secondary">
                    Набор участников
                  </Badge>
                  <h3 className="text-3xl font-bold mb-4">{product.title}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-primary/5 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Полная стоимость</p>
                      <p className="text-2xl font-bold">{product.totalPrice.toLocaleString()} ₽</p>
                    </div>
                    <div className="bg-secondary/5 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Ваша часть</p>
                      <p className="text-2xl font-bold text-secondary">{product.pricePerPerson.toLocaleString()} ₽</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Участников</span>
                      <span className="text-muted-foreground">
                        {product.currentParticipants} из {product.maxParticipants}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                        style={{ width: `${(product.currentParticipants / product.maxParticipants) * 100}%` }}
                      />
                    </div>
                  </div>

                  <Button size="lg" className="w-full">
                    <Icon name="UserPlus" size={20} className="mr-2" />
                    Присоединиться к покупке
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {popularProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? "w-8 bg-gradient-to-r from-primary to-secondary" 
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
