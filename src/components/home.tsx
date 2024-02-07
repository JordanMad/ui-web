import Link from "next/link"

export function Home() {
  return (
      <main className="flex flex-col items-center justify-center flex-grow text-center px-4 md:px-0">
        <h1 className="text-4xl md:text-6xl font-bold text-green-100 mb-6">Welcome to Micro Greens!</h1>
        <p className="text-lg md:text-2xl text-green-200 mb-10">
          We serve the freshest salads made from locally sourced ingredients. Order now and taste the difference!
        </p>
        <Link
          className="inline-flex items-center justify-center h-12 px-6 font-semibold text-white bg-green-700 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          href="/products"
        >
          Order Salad
        </Link>
      </main>
  )
}
