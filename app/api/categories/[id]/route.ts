import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/lib/models/Category";
import Portfolio from "@/lib/models/Portfolio";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    
    // Check if any portfolios depend on this category
    const portfoliosWithCategory = await Portfolio.findOne({ categoryId: id });
    if (portfoliosWithCategory) {
      return NextResponse.json(
        { error: "Cannot delete category while there are projects linked to it. Please delete the projects first." },
        { status: 400 }
      );
    }

    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
