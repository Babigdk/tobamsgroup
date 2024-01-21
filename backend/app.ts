import express, { Request, Response, NextFunction } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import imageRoutes from './routes/imageRoutes';

const app = express();
const port = 4000;

// MongoDB setup
mongoose.connect('mongodb://127.0.0.1:27017/img', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Middleware
app.use(express.json());

// Routes
app.use('/api', imageRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
