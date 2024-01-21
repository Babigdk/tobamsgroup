"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImage = exports.uploadImage = void 0;
const imageModel_1 = __importDefault(require("../models/imageModel"));
const joi_1 = __importDefault(require("joi"));
const uploadImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate request using Joi
        const schema = joi_1.default.object({
            image: joi_1.default.any().required(),
        });
        const { error } = schema.validate({ image: req.file });
        // Check if req.file is defined before accessing its properties
        if (!req.file || error) {
            throw new Error((error === null || error === void 0 ? void 0 : error.details[0].message) || 'Invalid file');
        }
        // Save image to MongoDB
        const image = new imageModel_1.default({
            data: req.file.buffer,
            contentType: req.file.mimetype,
        });
        yield image.save();
        res.json({ message: 'Image uploaded successfully', imageUrl: `/get_image/${image._id}` });
    }
    catch (err) {
        next(err); // Pass the error to the error handling middleware
    }
});
exports.uploadImage = uploadImage;
const getImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // Retrieve image from MongoDB
        const image = yield imageModel_1.default.findById(id);
        if (!image) {
            throw new Error('Image not found');
        }
        res.contentType(image.contentType);
        res.send(image.data);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(404).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});
exports.getImage = getImage;
