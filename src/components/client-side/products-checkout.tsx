"use client"

import { Product } from "@/types/product"
import Link from "next/link";
import { useState } from "react";

function ProductItem({product, onSelectProduct}: { product: Product, onSelectProduct: (id: string, quantity: number, price: string, name: string) => void}) {
    const [quantity, setQuantity] = useState(0);

    const handleAddProduct = () => {
        onSelectProduct(product.id, quantity, product.price, product.name)
    }

    const handleRemoveProduct = () => {
        setQuantity(0)
        onSelectProduct(product.id, 0, product.price, product.name)
    }

    return (
        <div className="bg-white  p-4 rounded-lg shadow-md min-w-48">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-500 dark:text-gray-400">{product.nutritionalHighlight}</p>
            <p className="font-semibold text-center">${product.price}</p>
            <input className="border border-green-500 rounded-lg text-sm font-semibold text-center" type="number" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} />
            <div className="gap-1 flex justify-center">
                <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-4" onClick={handleAddProduct}>Add</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4" onClick={handleRemoveProduct}> Remove </button>
            </div>
        </div>
    )
}

export default function ProductsCheckout({ products }: { products: Product[]}) {
    const [selectedProducts, setSelectedProducts] = useState<{id: string; quantity: number, price: string, name: string}[]>([])

    const handleSelectProduct = (id: string, quantity: number, price: string, name: string) => {
        if (quantity === 0) {
            setSelectedProducts((prev) => prev.filter((product) => product.id !== id))
        } else {
            const isProductIn = selectedProducts.find((product) => product.id === id);

            if (!isProductIn) {
                setSelectedProducts((prev) => [...prev, {id, quantity, price, name}])
            } else {
                setSelectedProducts((prev) => {
                    return prev.map((product) => {
                        if (product.id === id) {
                            return {
                                ...product,
                                price,
                                quantity,
                            }
                        }

                        return product
                    })
                })
            }
        }
    }

  return (
    <div className="py-12">
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-6">
            {
                products.map((product: Product) => {
                    return (
                        <ProductItem product={product} key={product.id} onSelectProduct={handleSelectProduct}/>
                    )
                })
            }
        </div>
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center justify-between bg-white  p-4 rounded-lg shadow-md">
            <ul>
                {selectedProducts.map((item) => <p key={item.id}>{item.name} x {item.quantity}</p>)}
            </ul>
            <p className="text-lg font-semibold">Total Price: ${selectedProducts.reduce((acc, curr) => acc + (Number(curr.price) * curr.quantity),0)}</p>
            <Link className="bg-green-500 text-white px-4 py-2 rounded-md" href={{
                pathname: '/order',
                query: {
                    id: selectedProducts.map((item) => item.id),
                    quantity: selectedProducts.map((item) => item.quantity)
                }
            }}>Checkout</Link>
          </div>
        </div>
    </div>
  )
}
