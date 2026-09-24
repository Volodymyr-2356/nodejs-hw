import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import pino from 'pino-http';

const app = express();
const PORT = process.env.PORT ?? 3000;

//Middleware для парсингу JSON
app.use(express.json());
//CORS (Cross-Origin Resource Sharing) —
//  механізм безпеки, який дозволяє браузеру робити запити з одного домену до іншого.
app.use(cors());

//Логування запитів
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

//Маршрут всіх нотаток
app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});

//Маршрут  для нотатки за ідентифікатором
app.get('/notes/:noteId', (req, res) => {
  res
    .status(200)
    .json({ message: 'Retrieved note with ID: ' + req.params.noteId });
});

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

// Middleware для неіснуючих маршрутів
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Middleware Обробка помилок
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    message: 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
