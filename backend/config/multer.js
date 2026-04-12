// backend/config/multer.js
import multer from "multer";
export const upload = multer({
  storage: multer.memoryStorage(), //  Correct for Cloudinary
  limits: { fileSize: 2 * 1024 * 1024 }, //  2MB limit
  fileFilter: (req, file, cb) => { //  JPG/PNG only
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Only JPG and PNG allowed"), false);
    }
    
  }
});