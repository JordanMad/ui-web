import { getProducts } from "@/actions/get-products";
import ProductsCheckout from "@/components/client-side/products-checkout";

export default async function ProductsPage() {
  const { products } = await getProducts();

  return (
    <main className="flex flex-col items-center justify-center flex-grow text-center px-4 md:px-0">
      <ProductsCheckout products={products}/>
    </main>
  );
}
