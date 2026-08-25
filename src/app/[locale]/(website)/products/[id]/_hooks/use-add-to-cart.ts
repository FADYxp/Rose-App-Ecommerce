"use client";
import { useToast } from "@/hooks/use-toast";
import { addToCartAction } from "@/lib/actions/cart.actions";
import { AddToCartItem } from "@/lib/types/cart";
import { guestAddToCart } from "@/lib/utils/guest-add-to-cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function useAddToCart() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const session = useSession();
  const { mutate, isPending } = useMutation({
    mutationFn: async (item: AddToCartItem) => {
      if (session.status === "authenticated") {
        return await addToCartAction(item);
      } else {
        return guestAddToCart(item);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast({
        title: "Product added to cart successfully ",
        variant: "success",
      });
    },
    onError: (err) => console.log(err),
  });

  return { mutate, isPending };
}
