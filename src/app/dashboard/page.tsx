"use client"
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { getFoodBanksByAdmin, updateFoodBank, FoodBank } from "../../firebase/firestoreFunction";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [foodBanks, setFoodBanks] = useState<FoodBank[]>([]);
  const [selectedFoodBank, setSelectedFoodBank] = useState<FoodBank | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authChecked, setAuthChecked] = useState<boolean>(false); // Track if auth is checked
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        const foodBanksData = await getFoodBanksByAdmin(user.uid);
        setFoodBanks(foodBanksData);
        setSelectedFoodBank(foodBanksData[0] || null);
        setLoading(false);
      } else {
        // No user is signed in, redirect to login
        router.push("/login");
      }
      setAuthChecked(true); // Set auth as checked
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, [router]);

  const handleFoodBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const foodBank = foodBanks.find((fb) => fb.id === selectedId);
    setSelectedFoodBank(foodBank || null);
  };

  const handleLogout = () => {
    auth.signOut();
    router.push("/login");
  };

  const handleUpdate = async () => {
    if (selectedFoodBank) {
      await updateFoodBank(selectedFoodBank.id, selectedFoodBank);
      alert("Food bank details updated successfully.");
    }
  };

  const handleInputChange = (field: keyof FoodBank, value: string) => {
    if (selectedFoodBank) {
      setSelectedFoodBank({ ...selectedFoodBank, [field]: value });
    }
  };

  if (!authChecked || loading) {
    return <div>Loading...</div>; // Show loading while checking auth or loading data
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-md">
          Logout
        </button>
      </div>
      
      <div>
        <p>If you would like to add more food banks under your account, please email to atharv228.as@gmail.com</p>

      </div>

      {foodBanks.length > 0 ? (
        <div>
          <div className="my-4">
            <label className="block text-sm font-medium">Select Food Bank</label>
            <select
              value={selectedFoodBank?.id || ""}
              onChange={handleFoodBankChange}
              className="w-full px-4 py-2 mt-1 border rounded-md"
            >
              {foodBanks.map((foodBank) => (
                <option key={foodBank.id} value={foodBank.id}>
                  {foodBank.food_bank_name}
                </option>
              ))}
            </select>
          </div>

          {selectedFoodBank && (
            <div>
              <div className="my-4">
                <label className="block text-sm font-medium">Food Bank Name</label>
                <input
                  type="text"
                  value={selectedFoodBank.food_bank_name}
                  onChange={(e) => handleInputChange("food_bank_name", e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-md"
                />
              </div>
              <div className="my-4">
                <label className="block text-sm font-medium">Contact</label>
                <input
                  type="text"
                  value={selectedFoodBank.contact}
                  onChange={(e) => handleInputChange("contact", e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-md"
                />
              </div>
              <div className="my-4">
                <label className="block text-sm font-medium">Instructions</label>
                <textarea
                  value={selectedFoodBank.instructions}
                  onChange={(e) => handleInputChange("instructions", e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-md"
                />
              </div>
              <div className="my-4">
                <label className="block text-sm font-medium">TANF</label>
                <textarea
                  value={selectedFoodBank.TANF}
                  onChange={(e) => handleInputChange("TANF", e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-md"
                />
              </div>
              <div className="my-4">
                <label className="block text-sm font-medium">TEFAP</label>
                <textarea
                  value={selectedFoodBank.TEFAP}
                  onChange={(e) => handleInputChange("TEFAP", e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-md"
                />
              </div>
              <div className="my-4">
                <label className="block text-sm font-medium">Island Name</label>
                <textarea
                  value={selectedFoodBank.island_name}
                  onChange={(e) => handleInputChange("island_name", e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-md"
                />
              </div>
              <div className="my-4">
                <label className="block text-sm font-medium">Operation Duration</label>
                <textarea
                  value={selectedFoodBank.operation_duration}
                  onChange={(e) => handleInputChange("operation_duration", e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-md"
                />
              </div>
              <div className="my-4">
                <label className="block text-sm font-medium">Sub Area</label>
                <textarea
                  value={selectedFoodBank.sub_area}
                  onChange={(e) => handleInputChange("sub_area", e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-md"
                />
              </div>
              

              <div className="my-4">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  value={selectedFoodBank.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-md"
                />
              </div>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Update
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>No food banks assigned to you.</p>
      )}
    </div>
  );
}
