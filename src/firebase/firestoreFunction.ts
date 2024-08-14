// // src/firebase/firestoreFunctions.ts
// import { getFirestore, doc, getDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
// import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";


// const db = getFirestore();

// export interface FoodBankAdmin {
//   uid: string;
//   food_banks: string[];
// }


// export interface FoodBank {
//   id: string;
//   food_bank_name: string;
//   TANF: string;
//   TEFAP: string;
//   contact: string;
//   days: { [key: string]: string };
//   description: string;
//   instructions: string;
//   island_name: string;
//   location_geopoint: FirebaseFirestoreTypes.GeoPoint;
//   location_text: string;
//   operation_duration: string;
//   service_type: string;
//   sub_area: string;
// }

// export const getFoodBanksByAdmin = async (adminId: string): Promise<FoodBank[]> => {
//   const adminRef = doc(db, "food_bank_admin", adminId);
//   const adminDoc = await getDoc(adminRef);

//   if (adminDoc.exists()) {
//     const foodBankIds = adminDoc.data().foodBanks || [];
//     const foodBanks: FoodBank[] = [];
    
//     for (const foodBankId of foodBankIds) {
//       const foodBankRef = doc(db, "food_banks", foodBankId);
//       const foodBankDoc = await getDoc(foodBankRef);
      
//       if (foodBankDoc.exists()) {
//         foodBanks.push({ id: foodBankDoc.id, ...foodBankDoc.data() } as FoodBank);
//       }
//     }

//     return foodBanks;
//   } else {
//     console.log("No such document!");
//     return [];
//   }
// };

// export const updateFoodBank = async (foodBankId: string, updatedData: Partial<FoodBank>) => {
//   const foodBankRef = doc(db, "food_banks", foodBankId);
//   await updateDoc(foodBankRef, updatedData);
// };



import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { GeoPoint } from "firebase/firestore";  // Correctly import GeoPoint from the Firebase web SDK

const db = getFirestore();

export interface FoodBank {
  id: string;
  food_bank_name: string;
  TANF: string;
  TEFAP: string;
  contact: string;
  days: { [key: string]: string };
  description: string;
  instructions: string;
  island_name: string;
  location_geopoint: GeoPoint;  // Use GeoPoint from firebase/firestore
  location_text: string;
  operation_duration: string;
  service_type: string;
  sub_area: string;
}

export const getFoodBanksByAdmin = async (adminId: string): Promise<FoodBank[]> => {
  const adminRef = doc(db, "food_bank_admin", adminId);
  const adminDoc = await getDoc(adminRef);
  console.log('00000000');
  console.log(adminDoc.data() );


  if (adminDoc.exists()) {
    const foodBankIds = adminDoc.data().food_banks || [];
    const foodBanks: FoodBank[] = [];
    console.log('----------');
    
    for (const foodBankId of foodBankIds) {
      const foodBankRef = doc(db, "food_banks", foodBankId);
      const foodBankDoc = await getDoc(foodBankRef);
      console.log(foodBankDoc);
      
      if (foodBankDoc.exists()) {
        foodBanks.push({ id: foodBankDoc.id, ...foodBankDoc.data() } as FoodBank);
      }
    }
    
    return foodBanks;
  } else {
    console.log("No such document!");
    return [];
  }
};

export const updateFoodBank = async (foodBankId: string, updatedData: Partial<FoodBank>) => {
  const foodBankRef = doc(db, "food_banks", foodBankId);
  await updateDoc(foodBankRef, updatedData);
};
