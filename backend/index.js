import express from "express";
import cors from "cors";
import { config } from "dotenv";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import commercesRoutes from './routes/commerceRoutes.js';
import sosRoutes from './routes/sosRoutes.js';
import temoinRoutes from './routes/temoinRoutes.js';

import connectDB from "./config/db.js";


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
app.use('/api/commerces', commercesRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/temoin', temoinRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  });
};



app.listen(process.env.PORT || 8000, () => {
  console.log("Listening to port 8000");
});
