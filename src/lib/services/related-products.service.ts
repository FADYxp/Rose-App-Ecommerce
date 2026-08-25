// Function to fetch related products
export async function getRelatedProducts(productId: string) {
  if (!productId) {
    throw new Error("Product ID is required");
  }

  // Fetch related products
  const res = await fetch(`${process.env.API}/related/similar/${productId}`, {
    cache: "no-store",
  });

  // Throw an error if the response is not OK
  if (!res.ok) {
    throw new Error("Failed to fetch related products");
  }
  
  return res.json();
}
