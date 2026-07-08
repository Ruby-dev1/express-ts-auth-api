import multer, { FileFilterCallback } from "multer";
import fs from "fs";
import appError from "../utils/appError.utils";
import { Request } from "express";

export const uploader = () => {
  const folder = "uploads/";
  const file_size = 5 * 1024 * 1024; //5MB

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
//* multer disk storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folder);
    },

    filename: (req, file, cb) =>
        {const file_name= Date.now()+ + "-" + file.originalname;
            cb(null,file_name);
        } 
    //{
    //   const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    //   cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
    // },
  });
//* file filter

const fileFilter = (
    req:Request,
    file: Express.Multer.File,
    callback: FileFilterCallback)=>{

        const allowed_mime_types = [
            "image/jpg",
            "image/jpeg",
            "image/png",
            "image/sv+xml",
            "doc/pdf"
        ];

        if(!allowed_mime_types.includes(file.mimetype)){
            callback(new appError(`${file.mimetype}is not allowed`,422))
        }
        else {
            callback(null, true);
        }

};
  //* multer upload instances
  const upload = multer({
    storage: storage,
    fileFilter:fileFilter,

    limits: {
      fileSize: file_size,
    },
  });
  return upload;
};
