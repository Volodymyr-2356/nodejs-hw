import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

//Пошук всіх нотаток
export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;
  const skip = (page - 1) * perPage;

  const notesQuery = Note.find();
  //  фільтрація  запитів
  if (tag) {
    notesQuery.where('tag').equals(tag);
  }
  if (search) {
    notesQuery.where({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ],
    });
  }

  const [totalItems, notes] = await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery.skip(skip).limit(perPage),
  ]);
  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({ page, perPage, totalItems, totalPages, notes });
};

//Пошук нотатки за ідентифікатором
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOne({ _id: noteId });
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};
//Створення нової нотатки
export const createNote = async (req, res) => {
  const newNote = await Note.create(req.body);
  res.status(201).json(newNote);
};
//Видалення нотатки за ідентифікатором
export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({ _id: noteId });
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};
//Оновлення нотатки за ідентифікатором
export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndUpdate({ _id: noteId }, req.body, {
    returnDocument: 'after',
  });
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};
