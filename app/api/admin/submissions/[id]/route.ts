import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import ContactSubmission from "@/lib/models/ContactSubmission";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // In Next.js 15+, params is a Promise
) {
  try {
    const { id } = await params;
    
    if (!id) {
       return NextResponse.json({ error: "No ID provided" }, { status: 400 });
    }

    await connectToDatabase();

    const deletedSubmission = await ContactSubmission.findByIdAndDelete(id);

    if (!deletedSubmission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Submission deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting submission:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
