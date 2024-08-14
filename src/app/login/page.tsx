"use client"
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { auth } from "../../firebase/firebaseConfig"; // Adjust the path based on the new location
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation"; // Use 'next/navigation' instead of 'next/router'

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter(); // Updated router hook

  // Check if the user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard"); // Redirect to dashboard if user is already logged in
      }
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, [router]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // Redirect to dashboard on success
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 mt-1 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 mt-1 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
