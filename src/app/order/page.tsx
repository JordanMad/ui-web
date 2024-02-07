import { getProducts } from "@/actions/get-products";
import OrderForm from "@/components/client-side/order-form";

export default async function OrderPage() {
    const {products} = await getProducts();

    return (
        <main className="flex flex-col items-center justify-center flex-grow text-center px-4 md:px-0">
          <OrderForm products={products}/>
        </main>
    );
  }
