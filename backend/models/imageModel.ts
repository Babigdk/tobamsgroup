import mongoose, { Document, Schema } from 'mongoose';

interface IImage extends Document {
  data: Buffer;
  contentType: string;
}

const imageSchema = new Schema({
  data: Buffer,
  contentType: String,
});

const ImageModel = mongoose.model<IImage>('Image', imageSchema);

export default ImageModel;
