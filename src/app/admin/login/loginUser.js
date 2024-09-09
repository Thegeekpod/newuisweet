'use server';
import prisma from "../../../../lib/prisma";
import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';

// Secret key for JWT signing
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';  // Make sure to use a secure key

const loginUser = async (email, password) => {
  try {
    // Fetch the admin user by email
    const admin = await prisma.admin.findUnique({
      where: { email: email },
    });

    // Check if the admin user was found
    if (!admin) {
      console.log("No admin found with the provided email.");
      return { success: false, message: "Invalid email or password" };
    }

    // Compare the password using bcrypt
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (passwordMatch) {
      console.log("Password match successful.");

      // Generate a JWT token using jose
      const token = await new SignJWT({ id: admin.id, email: admin.email })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')  // Token expiration time
        .sign(new TextEncoder().encode(JWT_SECRET));  // Sign with the secret key

      return { success: true, token: token }; // Return token if login is successful
    } else {
      console.log("Password does not match.");
      return { success: false, message: "Invalid email or password" };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Internal server error" };
  }
};

export default loginUser;
