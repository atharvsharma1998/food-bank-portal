// import type { NextApiRequest, NextApiResponse } from 'next';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../firebase/firebaseConfig';

// type Data = {
//   message: string;
//   user?: {
//     uid: string;
//     email: string | null;
//   };
//   error?: string;
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
//   if (req.method === 'POST') {
//     const { email, password } = req.body;

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       res.status(200).json({
//         message: 'Login successful!',
//         user: {
//           uid: user.uid,
//           email: user.email,
//         },
//       });
//     } catch (error) {
//       res.status(401).json({ message: 'Login failed', error: error.message });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }
