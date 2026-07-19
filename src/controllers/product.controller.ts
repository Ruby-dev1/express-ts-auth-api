import { Request, Response, NextFunction } from "express";
import Product from "../models/product.model";
import appError from "../utils/appError.utils";
import { catchasync } from "../utils/catchasync.utils";
import { sendResponse } from "../utils/sendresponse.utils";
import { deleteFile, uploadToCloudinary } from "../utils/cloudinary.utils";
import { getPagination } from "../utils/pagination.utils";

//* create Product

export const create = catchasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price, brand, category, is_featured } = req.body;

    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      throw new appError("Product already exists", 400);
    }

    const files = req.files as {
      cover_image?: Express.Multer.File[];
      images?: Express.Multer.File[];
    };

    const coverImageFile = files.cover_image?.[0];

    if (!coverImageFile) {
      throw new appError("Cover image is required", 400);
    }

    const uploadedCoverImage = await uploadToCloudinary(
      coverImageFile,
      "/products",
    );

    //promise.all(arr_promise)
    //promise.allsettled(arr_promise)
    //promise.race(arr_promise)
    //promise.any(arr_promise)

    //* upload images
    const images = files.images;

    let uploadedImages = [];

    if (images && images.length > 0) {
      const promises = images.map((file) =>
        uploadToCloudinary(file, "/products"),
      );

      const results = await Promise.allSettled(promises);

      uploadedImages = results
        .filter(
          (result): result is PromiseFulfilledResult<any> =>
            result.status === "fulfilled",
        )
        .map((result) => result.value);
    }

    const product = await Product.create({
      name,
      description,
      price,
      brand,
      category,
      is_featured,
      cover_image: uploadedCoverImage,
      images: uploadedImages,
    });

    sendResponse(res, {
      statusCode: 201,
      message: "Product created successfully",
      data: product,
    });
  },
);

//* get All
export const getAll = catchasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      query,
      category,
      brand,
      minPrice,
      maxPrice,
      order,
      sortBy = "createdAt",
      page = 1,
      limit = 10,
    } = req.query;

    const current_page = Number(page);
    const perPage = Number(limit);
    const skip = (current_page - 1) * perPage;
    const filter: Record<string, any> = {};

    if (query) {
      filter.$or = [
        {
          name: {
            $regex: query, //subtring match
            $options: "i", // case insensitive match
          },
        },
        {
          description: {
            $regex: query,
            $options: "i",
          },
        },
      ];
    }

    //* category
    if (category) {
      filter.category = category;
    }

    //* brands

    if (brand) {
      filter.brand = brand;
    }

    //* price range

    if (minPrice || maxPrice) {
      const low = Number(minPrice);
      const high = Number(maxPrice);

      if (low) {
        filter.price = {
          $gte: low,
        };
      }

      if (high) {
        filter.price = {
          $lte: high,
        };
      }

      if (low && high) {
        filter.price = {
          $lte: high,
          $gte: low,
        };
      }
    }

    const products = await Product.find(filter)
      .limit(perPage)
      .skip(skip)
      .sort({ [sortBy as string]: order === "DESC" ? -1 : 1 });
    const totalCount = await Product.countDocuments(filter)
      .populate("category")
      .populate("brand");

    sendResponse(res, {
      message: "all products are fetched successfully",
      statusCode: 200,
      data: {
        products,
        pagination: getPagination(totalCount, perPage, current_page),
      },
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

    if (!existingProduct) {
      throw new appError("Product does not exist", 404);
    }

    const {
      name,
      description,
      price,
      category,
      brand,
      is_featured,
      deleted_images,
    } = req.body;

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

    //*  Cover Image

    const coverImageFile = files.cover_image?.[0];

    if (coverImageFile) {
      await deleteFile(existingProduct.cover_image.public_id);

      const uploadedCoverImage = await uploadToCloudinary(
        coverImageFile,
        "/products",
      );

      updateData.cover_image = uploadedCoverImage;
    }

    //* Upload New Images

    const uploadedImages = [];

    for (const image of files.images ?? []) {
      const uploadedImage = await uploadToCloudinary(image, "/products");

      uploadedImages.push(uploadedImage);
    }

    //*Delete Selected Old Images

    if (deleted_images?.length > 0) {
      for (const publicId of deleted_images) {
        await deleteFile(publicId);
      }

      existingProduct.images = existingProduct.images.filter(
        (image) => !deleted_images.includes(image.public_id),
      );
    }

    //* Merge Remaining + New

    updateData.images = [...existingProduct.images, ...uploadedImages];

    //* Update ----------------

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  },
);

//* delete

export const remove = catchasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const product = await Product.findById({ _id: id });
    if (!product) throw new appError("product not found", 404);

    //* delete cover image
    deleteFile(product.cover_image.public_id);

    // await deleteFile(product.cover_image.public_id);

    //* delete images
    if (product.images && product.images.length > 0) {
      Promise.allSettled(
        product.images.map((img) => deleteFile(img.public_id)),
      );
    }
    // for( const image of product.images){
    //   await deleteFile(image.public_id);
    // }
    // await Product.findByIdAndDelete(id);
    //* delete product

    await product.deleteOne();
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
