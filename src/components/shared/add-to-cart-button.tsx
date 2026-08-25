"use client";

import { useAddToCart } from "@/app/[locale]/(website)/products/[id]/_hooks/use-add-to-cart";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type AddToCartButtonProps = {
  productId: string;
  quantityInStock: number;
  children: React.ReactNode;
  className?: string;
};

export default function AddToCartButton({
  productId,
  quantityInStock,
  children,
  className,
}: AddToCartButtonProps) {
  const { mutate, isPending } = useAddToCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (quantityInStock < 1) {
      toast({
        description: "Sorry, this product is out of stock",
        variant: "destructive",
      });
      return;
    }

    mutate({ product: productId, quantity: 1 });
  };

  return (
    <Button
      onClick={handleAddToCart}
      isLoading={isPending}
      disabled={isPending}
      className={className}
    >
      {children}
    </Button>
  );
}
