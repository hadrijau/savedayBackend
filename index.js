import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from './routes/productRoutes.js';
import connectDB from "./config/db.js";
import commandeRoutes from "./routes/commandeRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const __dirname = path.resolve();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});


app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/commandes', commandeRoutes);
app.use('/api/messages', messageRoutes);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  });
}


app.listen(process.env.PORT || 8000, () => {
  console.log("Listening to port 8000");
});
