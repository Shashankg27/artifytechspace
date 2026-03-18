import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import AdminUser from "@/lib/models/AdminUser";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if user exists with plain text password (as requested: no encryption needed for now)
    const user = await AdminUser.findOne({ username, password });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Login successful" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error during admin login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
