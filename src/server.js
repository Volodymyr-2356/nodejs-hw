import express from 'express';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Middleware A');
  next();
});

app.use((req, res, next) => {
  console.log('Middleware B');
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the server!' });
});

app.get('/notes', (req, res) => {
  res.status(200).json({ status: 'OK' });
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
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
