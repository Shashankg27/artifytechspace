import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import connectToDatabase from "@/lib/mongodb";
import Portfolio from "@/lib/models/Portfolio";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    await connectToDatabase();
    // Sort by newest first, populate category data
    const portfolios = await Portfolio.find({}).populate("categoryId").sort({ createdAt: -1 });
    return NextResponse.json(portfolios);
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolios" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const title = formData.get("title") as string;
    const categoryId = formData.get("categoryId") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
    const techStackRaw = formData.get("techStack") as string;
    const featuresRaw = formData.get("features") as string;
    
    const imageFiles = formData.getAll("images") as File[];

    if (!title || !categoryId || !description || imageFiles.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields (title, categoryId, description, images)" },
        { status: 400 }
      );
    }

    // Upload all files to Cloudinary concurrently
    const uploadPromises = imageFiles.map(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      return new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "artify_portfolio" },
          (error, result) => {
            if (error) reject(error);
            else resolve((result as any).secure_url);
          }
        );
        uploadStream.end(buffer);
      });
    });

    const imageUrls = await Promise.all(uploadPromises);

    const techStack = techStackRaw ? techStackRaw.split(",").map((s) => s.trim()) : [];
    const features = featuresRaw ? featuresRaw.split(",").map((s) => s.trim()) : [];

    await connectToDatabase();

    const newPortfolio = new Portfolio({
      title,
      categoryId,
      description,
      images: imageUrls,
      link: link || "",
      techStack,
      features,
    });

    await newPortfolio.save();

    return NextResponse.json(
      { success: true, portfolio: newPortfolio },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating portfolio:", error);
    return NextResponse.json(
      { error: "Failed to create portfolio" },
      { status: 500 }
    );
  }
}
