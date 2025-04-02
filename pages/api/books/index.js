import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    // GET: Obtener todos los libros
    if (req.method === "GET") {
      const books = await prisma.book.findMany();
      return res.status(200).json(books);
    }

    // POST: Crear un nuevo libro
    if (req.method === "POST") {
      const { title, author } = req.body;
      const newBook = await prisma.book.create({ data: { title, author } });
      return res.status(201).json(newBook);
    }

    // Método no permitido
    return res.status(405).end(); 

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
}