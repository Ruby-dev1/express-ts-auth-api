import { NextFunction, Request, Response } from "express";
import Category from "../models/category.model";
import { catchasync } from "../utils/catchasync.utils";
import appError from "../utils/appError.utils";
import { uploadToCloudinary, deleteFile } from "../utils/cloudinary.utils";

const uploadFolder = "/category_images";

//* get all category

export const getAll = catchasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Category.find();

    res.status(200).json({
      message: "All categories are fetched",
      success: true,
      status: "success",
      count: categories.length,
      data: categories,
    });
  },
);

//* get by id

export const getByID = catchasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      throw new appError("category not found", 404);
    }
    res.status(200).json({
      message: `category by id ${id} is fetched`,
      success: true,
      satus: "success",
      data: category,
    });
  },
);

//* create/post

export const create = catchasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;
    const file = req.file;

    if (!name) {
      throw new appError("name is required", 400);
    }

    if (!description) {
      throw new appError("description is required", 400);
    }

    if (!file) {
      throw new appError("logo is required", 400);
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      throw new appError("name already exists", 400);
    }

    const { path, public_id } = await uploadToCloudinary(file, uploadFolder);

    const category = await Category.create({
      name,
      description,
      logo: {
        path,
        public_id,
      },
    });

    res.status(201).json({
      message: "category created successfully",
      success: true,
      status: "success",
      data: category,
    });
  },
);

//* update/ put

export const update = catchasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const existingCategory = await Category.findById(id);
    if (!existingCategory) throw new appError("category does not exist", 404);

    const { name, description } = req.body;
    const updateCategory = await Category.findByIdAndUpdate(
      { _id: id },
      { name, description },
      { new: true },
    );

    res.status(200).json({
      message: " category is updated successfully",
      success: true,
      status: "success",
      data: updateCategory,
    });
  },
);

//* delete

export const remove = catchasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete({ _id: id });
    if (!category) throw new appError("category not found", 404);
    if (category.logo?.public_id) {
      await deleteFile(category.logo.public_id);
    }

    await Category.findByIdAndDelete(id);

    res.status(200).json({
      message: "category deleted successfully",
      success: true,
      status: "success",
      data: null,
    });
  },
);
