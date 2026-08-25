import SyncGuestCart from "@/components/shared/sync-guest-cart";
import CartData from "./_components/cart-data/cart-data";

export default function page() {
  return (
    <>
      <SyncGuestCart />
      <div className="text-center text-2xl text-maroon-400 capitalize">
        <CartData />
        
      </div>
    </>
  );
}
