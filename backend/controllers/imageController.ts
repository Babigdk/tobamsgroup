import { Request, Response, NextFunction } from 'express';
import ImageModel from '../models/imageModel';
import { MulterError } from 'multer';
import Joi from 'joi';

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate request using Joi
    const schema = Joi.object({
      image: Joi.any().required(),
    });

    const { error } = schema.validate({ image: req.file });

    // Check if req.file is defined before accessing its properties
    if (!req.file || error) {
      throw new Error(error?.details[0].message || 'Invalid file');
    }

    // Save image to MongoDB
    const image = new ImageModel({
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });
    await image.save();

    res.json({ message: 'Image uploaded successfully', imageUrl: `/get_image/${image._id}` });
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

export const getImage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // Retrieve image from MongoDB
    const image = await ImageModel.findById(id);

    if (!image) {
      throw new Error('Image not found');
    }

    res.contentType(image.contentType);
    res.send(image.data);
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
