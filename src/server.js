import express from 'express';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Middleware A');
  next();
});

app.use((req, res, next) => {
  console.log('Middleware B');
  console.log('Middleware C');
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the server!' });
});
//Маршрут всіх нотаток
app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});

//Маршрут  для нотатки за ідентифікатором
app.get('/notes/:noteId', (req, res) => {
  res.status(200).json({ message: 'Retrieved note with ID: id_param' });
});

app.get('/error', (req, res) => {
  throw new Error('This is a test error');
});

// Middlware Обробка помилки
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message,
  });
});

await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
