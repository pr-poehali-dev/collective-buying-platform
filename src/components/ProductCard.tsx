import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import JoinDialog from "./JoinDialog";

interface ProductCardProps {
  id: number;
  title: string;
  image: string;
  totalPrice: number;
  currentParticipants: number;
  maxParticipants: number;
  pricePerPerson: number;
  status: "recruiting" | "collecting" | "purchasing" | "distributing";
}

const statusConfig = {
  recruiting: { label: "Набор участников", color: "bg-blue-500" },
  collecting: { label: "Сбор средств", color: "bg-yellow-500" },
  purchasing: { label: "Покупка", color: "bg-purple-500" },
  distributing: { label: "Раздача", color: "bg-green-500" }
};

export default function ProductCard({
  id,
  title,
  image,
  totalPrice,
  currentParticipants,
  maxParticipants,
  pricePerPerson,
  status
}: ProductCardProps) {
  const [joinOpen, setJoinOpen] = useState(false);
  const statusInfo = statusConfig[status];
  const progress = (currentParticipants / maxParticipants) * 100;

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="relative">
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover"
          />
          <Badge className={`absolute top-3 left-3 ${statusInfo.color}`}>
            {statusInfo.label}
          </Badge>
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold mb-3 line-clamp-2">{title}</h3>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Полная цена</span>
              <span className="font-semibold">{totalPrice.toLocaleString()} ₽</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Ваша часть</span>
              <span className="text-lg font-bold text-secondary">{pricePerPerson.toLocaleString()} ₽</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">
                <Icon name="Users" size={14} className="inline mr-1" />
                {currentParticipants}/{maxParticipants}
              </span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <Button 
            className="w-full" 
            variant={status === "recruiting" ? "default" : "outline"}
            onClick={() => status === "recruiting" && setJoinOpen(true)}
          >
            {status === "recruiting" ? (
              <>
                <Icon name="UserPlus" size={18} className="mr-2" />
                Присоединиться
              </>
            ) : (
              <>
                <Icon name="Eye" size={18} className="mr-2" />
                Подробнее
              </>
            )}
          </Button>
        </div>
      </div>
      
      <JoinDialog 
        open={joinOpen} 
        onOpenChange={setJoinOpen}
        productId={id}
        productTitle={title}
      />
    </>
  );
}