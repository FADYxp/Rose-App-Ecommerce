import {
  addWishlist,
  checkWishlist,
  removeWishlist,
} from "@/lib/actions/wishlist.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

// add all the items in DB through API request
export async function syncLocalWishlistToAPI() {
  const localWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

  if (localWishlist.length === 0) return;

  for (const productId of localWishlist) {
    try {
      await addWishlist({ productId });
    } catch (err) {
      console.error("Failed to sync product:", productId, err);
    }
  }

  localStorage.removeItem("wishlist");
}

// toggle between add and remove.
export default function useToggleWishlist(productId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["wishlist", productId],
    queryFn: () => checkWishlist(productId),
  });

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async () => {
      if (data) {
        return removeWishlist(productId);
      } else {
        return addWishlist({ productId });
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", productId] });
      if (data) {
        toast({
          title: "Success",
          description: "Remove from wishlist",
          variant: "success",
        });
      } else {
        toast({
          title: "Success",
          description: "Add to wishlist",
          variant: "success",
        });
      }
    },
  });

  return { mutation, data, isLoading };
}
