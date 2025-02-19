import { Router, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { uploadFile } from '../../utils/uploader';
import { createSuccessResponse, createErrorResponse } from '../../utils/response';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const router = Router();

// Configure multer
const storage = multer.memoryStorage();
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/gif').split(',');
  
  if (!allowedTypes.includes(file.mimetype)) {
    cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed'));
    return;
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880') // Default 5MB
  }
});

// Upload photo route
router.post('/photo', upload.single('photo'), async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json(createErrorResponse('No file uploaded'));
      return;
    }

    const fileUrl = await uploadFile(req.file, 'photos');
    res.status(200).json(createSuccessResponse('File uploaded successfully', { url: fileUrl }));
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(createErrorResponse(error.message));
      return;
    }
    res.status(500).json(createErrorResponse('An error occurred while uploading the file'));
    return;
  }
});

export default router;