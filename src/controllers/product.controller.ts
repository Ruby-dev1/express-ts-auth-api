import { Request, Response, NextFunction } from "express";
import Product from "../models/product.model";
import appError from "../utils/appError.utils";
import { catchasync } from "../utils/catchasync.utils";
import { sendResponse } from "../utils/sendresponse.utils";
import { deleteFile, uploadToCloudinary } from "../utils/cloudinary.utils";

//* create Product

export const create = catchasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price, category, brand } = req.body;
    if (!name) throw new appError("name is required", 400);
    if (!description) throw new appError("description is required", 400);
    if (!price) throw new appError("price is required", 400);
    if (!category) throw new appError("category is required", 400);
    if (!brand) throw new appError("brand is required", 400);

    const files = req.files as {
      cover_image?: Express.Multer.File[];
      images?: Express.Multer.File[];
    };

    const coverImageFile = files.cover_image?.[0];
    if (!coverImageFile) throw new appError("cover Image is required", 400);

    const uploadedCoverImage = await uploadToCloudinary(
      coverImageFile,
      "/products",
    );
    const uploadedImages = [];
    for (const image of files.images ?? []) {
      const uploadedImage = await uploadToCloudinary(image, "/products");
      uploadedImages.push(uploadedImage);
    }

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) throw new appError("name is already exist", 400);
    const product = await Product.create({
      name,
      description,
      price,
      category,
      brand,
      cover_image: uploadedCoverImage,
      images: uploadedImages,
    });

    sendResponse(res, {
      message: "Product is created",
      statusCode: 201,
      data: product,
    });
  },
);

//* get all products

export const getAll = catchasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find()
      .populate("category")
      .populate("brand");

    sendResponse(res, {
      message: "Product is fetched",
      statusCode: 200,
      data: products,
    });
  },
);

//* get all products by id

export const getByID = catchasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("category")
      .populate("brand");
    if (!product) throw new appError("product not found", 404);

    sendResponse(res, {
      message: `product by id ${id} is fetched`,
      statusCode: 200,
      data: product,
    });
  },
);

//* update product

export const update = catchasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const existingProduct = await Product.findById(id);
    if (!existingProduct) throw new appError("product does not exist", 404);

    const { name, description, price, category, brand, is_featured } = req.body;
    const files = req.files as {
      cover_image?: Express.Multer.File[];
      images?: Express.Multer.File[];
    };

    const updateData: any = {
      name,
      description,
      price,
      category,
      brand,
      is_featured,
    };

    const coverImageFile = files.cover_image?.[0];

    if (coverImageFile) {
      await deleteFile(existingProduct.cover_image.public_id);
      const uploadedCoverImage = await uploadToCloudinary(
        coverImageFile,
        "/products",
      );
      updateData.cover_image = uploadedCoverImage;
    }

    const uploadedImages = [];
    for (const image of files.images ?? []) {
      const uploadedImage = await uploadToCloudinary(image, "/products");
      uploadedImages.push(uploadedImage);

     
    }
     updateData.images = [...existingProduct.images, ...uploadedImages];

    const updateProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    );
    sendResponse(res, {
      message: "Product is updated",
      statusCode: 200,
      data: updateProduct,
    });
  },
);

//* delete

export const remove = catchasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const product = await Product.findById({ _id: id });
    if (!product) throw new appError("product not found", 404);
    await deleteFile(product.cover_image.public_id);

    for( const image of product.images){
      await deleteFile(image.public_id);
    }
    await Product.findByIdAndDelete(id);

    sendResponse(res, {
      message: "Product is deleted",
      statusCode: 200,
      data: product,
    });
  },
);

//* get by category

export const getByCategory = catchasync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1. Get categoryId from req.params
    const { categoryId } = req.params;

    // 2. Find all products with that category
    // 3. Populate category
    const products = await Product.find({
      category: categoryId,
    }).populate("category");

    sendResponse(res, {
      message: "Products fetched successfully",
      statusCode: 200,
      data: products,
    });
  },
);

//* get by brand
export const getByBrand = catchasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { brandId } = req.params;
    const products = await Product.find({
      brand: brandId,
    }).populate("brand");

    sendResponse(res, {
      message: "Products with brand fetched successfully",
      statusCode: 200,
      data: products,
    });
  },
);

//* get by new arrivals

export const getByNewArrivals = catchasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find()
      .sort({ createdAt: -1 }) // Newest first
      .populate("category")
      .populate("brand");

    sendResponse(res, {
      message: "New arrival products fetched successfully",
      statusCode: 200,
      data: products,
    });
  },
);

//* get featured

export const getByfeatured = catchasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find({
      is_featured: true,
    })

      .populate("category")
      .populate("brand");

    sendResponse(res, {
      message: "featured products fetched successfully",
      statusCode: 200,
      data: products,
    });
  },
);
