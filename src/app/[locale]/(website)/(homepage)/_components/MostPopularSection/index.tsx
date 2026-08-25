import { getOccasions } from "@/lib/services/occasions.service";
import { getProducts } from "@/lib/services/products.service";
import MostPopular from "./most-popular";
import { OccProps } from "@/lib/types/occasion";

export default async function MostPopularSection({ searchParams }: OccProps) {
  const occasionsResponse = await getOccasions();
  const occasions = occasionsResponse.occasions.slice(0, 4);

  const activeOccasion = searchParams?.occasion || occasions[0]?._id;

  const products = await getProducts({
    occasion: activeOccasion,
    limit: 12,
    sort: "-sold",
  });

  return (
    <MostPopular
      occasions={occasions}
      initialOccasion={activeOccasion}
      initialProducts={products}
    />
  );
}
