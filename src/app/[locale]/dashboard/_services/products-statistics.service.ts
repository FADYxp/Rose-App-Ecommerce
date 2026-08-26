import { getMyToken } from "@/lib/utils/get-my-token";
import {
  LowStockProduct,
  TopSellingProduct,
  AllStatisticsResponse,
} from "@/lib/types/dashboard/product";

// fetch statistics
export async function getAllStatisticsService(): Promise<AllStatisticsResponse | null> {
  const token = await getMyToken();
  if (!token?.accesstoken) return null;

  // fetch
  const res = await fetch(`${process.env.API}/statistics`, {
    headers: { Authorization: `Bearer ${token.accesstoken}` },
    cache: "no-store",
  });

  // check
  if (!res.ok) return null;
  return res.json();
}

// get low stock
export async function getLowStockProducts(): Promise<LowStockProduct[]> {
  const data = await getAllStatisticsService();
  if (!data) return [];

  // get all products
  const allProducts = (
    data.statistics.products.productsByCategory ?? []
  ).flatMap((cat) =>
    cat.products.map((p: LowStockProduct) => ({
      _id: p.title,
      title: p.title,
      imgCover: p.imgCover,
      price: p.price,
      quantity: Math.max(0, p.quantity),
    }))
  );

  // sort
  return allProducts.sort((a, b) => a.quantity - b.quantity);
}

// get top selling
export async function getTopSellingProducts(): Promise<TopSellingProduct[]> {
  const data = await getAllStatisticsService();
  if (!data) return [];

  // get all products
  const allProducts = (
    data.statistics.products.productsByCategory ?? []
  ).flatMap((cat) =>
    cat.products.map((p: TopSellingProduct) => ({
      _id: p.title,
      title: p.title,
      imgCover: p.imgCover,
      price: p.price,
      sold: p.sold,
    }))
  );

  // sort
  return allProducts.sort((a, b) => b.sold - a.sold);
}
