import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/lib/models/Category";
// Keep Portfolio import to clear references if necessary, or check before delete
import Portfolio from "@/lib/models/Portfolio";

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find({}).sort({ createdAt: -1 });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File;

    if (!name || !imageFile) {
      return NextResponse.json(
        { error: "Missing required fields (name, image)" },
        { status: 400 }
      );
    }

    // Connect DB
    await connectToDatabase();

    // Ensure category name is unique
    const existing = await Category.findOne({ name });
    if (existing) {
      return NextResponse.json({ error: "Category with this name already exists" }, { status: 400 });
    }

    // Convert file to base64 for Cloudinary to avoid stream chunking timeouts
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mime = imageFile.type;
    const base64Data = buffer.toString("base64");
    const fileUri = `data:${mime};base64,${base64Data}`;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(fileUri, {
      folder: "artify_categories",
      invalidate: true,
    });

    const imageUrl = uploadResult.secure_url;

    const newCategory = new Category({
      name,
      description: description || "",
      image: imageUrl,
    });

    await newCategory.save();

    return NextResponse.json(
      { success: true, category: newCategory },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
