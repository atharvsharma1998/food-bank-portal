// app/page.tsx
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">Hawaii Food Bank Portal</h1>
          <Link href="/login" className="text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600">
              Login
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-4xl font-bold mb-4">Welcome to Hawaii Food Bank Portal</h2>
          <p className="text-lg">
            Nourish our ʻohana today while we work to end hunger tomorrow.
          </p>
        </div>
      </main>

      {/* Footer (Optional) */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; {new Date().getFullYear()} Hawaii Food Bank. All rights reserved.</p>
      </footer>
    </div>
  );
}
