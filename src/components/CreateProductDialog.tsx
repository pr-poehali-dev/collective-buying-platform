import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const API_URL = "https://functions.poehali.dev/9b3803bb-4e20-4d83-829c-91986e79429e";

export default function CreateProductDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    category: "Советники",
    total_price: "",
    max_participants: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          ...formData,
          total_price: parseInt(formData.total_price),
          max_participants: parseInt(formData.max_participants)
        })
      });

      if (response.ok) {
        toast({
          title: "Успешно!",
          description: "Складчина создана. Обновите страницу чтобы увидеть её."
        });
        setOpen(false);
        setFormData({
          title: "",
          description: "",
          image_url: "",
          category: "Советники",
          total_price: "",
          max_participants: ""
        });
      } else {
        throw new Error("Ошибка создания");
      }
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось создать складчину",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Icon name="Plus" size={18} className="mr-2" />
          Создать складчину
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Создать новую складчину</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Название продукта</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="PRO Trading Course"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Подробное описание продукта..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="image_url">Ссылка на изображение</Label>
            <Input
              id="image_url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div>
            <Label htmlFor="category">Категория</Label>
            <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Советники">Советники</SelectItem>
                <SelectItem value="Индикаторы">Индикаторы</SelectItem>
                <SelectItem value="Стратегии">Стратегии</SelectItem>
                <SelectItem value="Курсы">Курсы</SelectItem>
                <SelectItem value="Книги">Книги</SelectItem>
                <SelectItem value="Пакеты">Пакеты</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="total_price">Полная цена (₽)</Label>
              <Input
                id="total_price"
                type="number"
                value={formData.total_price}
                onChange={(e) => setFormData({ ...formData, total_price: e.target.value })}
                placeholder="50000"
                required
              />
            </div>
            <div>
              <Label htmlFor="max_participants">Макс. участников</Label>
              <Input
                id="max_participants"
                type="number"
                value={formData.max_participants}
                onChange={(e) => setFormData({ ...formData, max_participants: e.target.value })}
                placeholder="30"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Создание..." : "Создать складчину"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
