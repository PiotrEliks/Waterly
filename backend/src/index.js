import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';
import { initSocket } from './lib/socket.js';
import ledRoutes from './routes/led.route.js';

dotenv.config();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

app.use('/api/led', ledRoutes);

const server = http.createServer(app);

initSocket(server);

server.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
