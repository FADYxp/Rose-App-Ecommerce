import CartData from "./_components/cart-data/cart-data";
import PersonalCartCarousel from "./_components/personal-cart-carousel/personal-cart-carousel";

export default function page() {
  return (
    <>
      <div className="flex justify-center gap-2 text-center text-2xl text-maroon-400 capitalize">
        <CartData />
      </div>
      <PersonalCartCarousel />
    </>
  );
}
