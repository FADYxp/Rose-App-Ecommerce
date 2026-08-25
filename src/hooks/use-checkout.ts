import { AddCheckoutCash } from "@/lib/actions/checkout.actions";
import { useMutation } from "@tanstack/react-query";

export function useCheckout() {
  const { mutate: checkout, isPending } = useMutation({
    mutationFn: async (values: CheckoutPayload) => {
      const payload = await AddCheckoutCash(values);

      console.log("payload" , payload )
    },
    onSuccess: () => console.log("Succusssssssssssssssssssssssss"),
    onError: () => console.log("Errrrrrrrrrrrrror"),
  });

  return { checkout, isPending };
}
