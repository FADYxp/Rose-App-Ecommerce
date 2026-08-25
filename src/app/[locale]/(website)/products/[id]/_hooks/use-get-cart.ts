import { useQuery } from "@tanstack/react-query";
import { getCartService } from "../_services/cart.service";

export function useGetCart() {
  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartService,
  });

  return { cart: data };
}
