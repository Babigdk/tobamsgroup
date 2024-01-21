"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
const app = (0, express_1.default)();
const port = 4000;
// MongoDB setup
mongoose_1.default.connect('mongodb://127.0.0.1:27017/img', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api', imageRoutes_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Internal server error' });
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
