import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const { id } = req.query;

    // PUT: Actualizar un libro por ID
    if (req.method === "PUT") {
      const { title, author } = req.body;
      const updatedBook = await prisma.book.update({
        where: { id: parseInt(id) },
        data: { title, author },
      });
      return res.status(200).json(updatedBook);
    }

    // DELETE: Eliminar un libro por ID
    if (req.method === "DELETE") {
      await prisma.book.delete({ where: { id: parseInt(id) } });
      return res.status(204).end();
    }

    // Método no permitido
    return res.status(405).end();

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
}