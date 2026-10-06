import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
// import { Authenticate } from '../middleware/authenticate.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

//Middleware для парсингу JSON
app.use(cookieParser());
app.use(express.json());
//CORS (Cross-Origin Resource Sharing) —
//  механізм безпеки, який дозволяє браузеру робити запити з одного домену до іншого.
app.use(cors());

//Логування запитів
app.use(logger);
//Маршрути нотаток
app.use(authRoutes);
app.use(notesRoutes);
app.use(userRoutes);
// Middleware для неіснуючих маршрутів
app.use(notFoundHandler);

app.use(errors()); // Middleware для обробки помилок валідації

// Middleware Обробка помилок
app.use(errorHandler);
await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
