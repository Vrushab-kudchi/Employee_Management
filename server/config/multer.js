import multer from "multer";
import path from "path";

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Filename format
  },
});

// Initialize upload variable
const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // Limit file size (1MB)
  fileFilter: (req, file, cb) => {
    // Allow only images
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: Images Only!");
  },
});

export default upload;
