import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const API_URL = "https://functions.poehali.dev/9b3803bb-4e20-4d83-829c-91986e79429e";

interface JoinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: number;
  productTitle: string;
}

export default function JoinDialog({ open, onOpenChange, productId, productTitle }: JoinDialogProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "join",
          product_id: productId,
          ...formData
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Успешно!",
          description: "Вы присоединились к складчине. Обновите страницу."
        });
        onOpenChange(false);
        setFormData({ user_name: "", user_email: "" });
      } else {
        toast({
          title: "Ошибка",
          description: data.error || "Не удалось присоединиться",
          variant: "destructive"
        });
      }
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось присоединиться к складчине",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Присоединиться к складчине</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mb-4">{productTitle}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="user_name">Ваше имя</Label>
            <Input
              id="user_name"
              value={formData.user_name}
              onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
              placeholder="Иван Иванов"
              required
            />
          </div>

          <div>
            <Label htmlFor="user_email">Email</Label>
            <Input
              id="user_email"
              type="email"
              value={formData.user_email}
              onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
              placeholder="ivan@example.com"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Присоединение..." : "Присоединиться"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
