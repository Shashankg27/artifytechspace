import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import ContactSubmission from "@/lib/models/ContactSubmission";

// Note: In a real production app, this should be protected by middleware/JWT.
// Since the requirement is very simple with a client-side layout, we'll keep the API simple.
export async function GET() {
  try {
    await connectToDatabase();

    // Fetch all submissions sorted by newest first
    const submissions = await ContactSubmission.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, submissions },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
