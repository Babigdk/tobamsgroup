import express from 'express';
import { uploadImage, getImage } from '../controllers/imageController';
import multer, { MulterError } from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = file.originalname.toLowerCase().slice((file.originalname.lastIndexOf(".") - 1 >>> 0) + 2);

    if (file.mimetype.startsWith('image/') && allowedExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'Invalid file type. Only images with .jpg, .jpeg, .png, or .gif extensions are allowed.'));
    }
  },
});

router.post('/upload', upload.single('image'), uploadImage);
router.get('/get_image/:id', getImage);

export default router;
