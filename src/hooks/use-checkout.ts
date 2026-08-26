import { checkoutAction } from "@/lib/actions/checkout.actions";
import { useMutation } from "@tanstack/react-query";

type CheckoutMethod = "cash" | "credit";

export function useCheckout() {
  const mutation = useMutation({
    mutationFn: ({
      values,
      method,
      paymentUrl,
    }: {
      values: CheckoutPayload;
      method: CheckoutMethod;
      paymentUrl?: string;
    }) => checkoutAction(values, { method, paymentUrl }),
  });

  return {
    checkout: mutation.mutate,
    checkoutAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
