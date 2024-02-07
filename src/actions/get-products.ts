"use server"

export async function getProducts() {
    const res = await fetch('http://localhost:3002/products', { next: {
      tags: ['products']
    }})
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    return res.json()
  }
