import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Ensure this matches your server-side secret


 
export async function getUserFromToken() {
  const cookieStore = cookies();
  const token = cookieStore.get('session')?.value || '';
  let user = null;
  let error = null;

  try {
    if (token) {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
      user = payload;
    }
  } catch (err) {
    console.error('Token verification error:', err);
    error = 'Failed to verify token';
  }

  return { user, error };
}
