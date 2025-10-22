import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { initializeSocket } from './socket/socket.server.js';
import path from 'path';

dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
const app = express();
const httpServer = createServer(app);
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

initializeSocket(httpServer);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/messages', messageRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

httpServer.listen(PORT, () => {
  connectDB();
  console.log('App running in port: ' + PORT);
});
