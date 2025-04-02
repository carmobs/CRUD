import { useEffect, useState } from "react"; 
import BookForm from "../components/BookForm"; 

export default function Home() { 
  const [books, setBooks] = useState([]); 
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => { 
    fetch("/api/books") 
      .then((res) => res.json()) 
      .then(setBooks); 
  }, []); 

  const handleSubmit = (book) => {
    const method = editingBook ? "PUT" : "POST";
    const url = editingBook ? `/api/books/${editingBook.id}` : "/api/books";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    }).then(() => {
      setEditingBook(null);
      location.reload();
    });
  };

  const handleDelete = (id) => {
    fetch(`/api/books/${id}`, { method: "DELETE" })
      .then(() => location.reload());
  };

  return ( 
    <div> 
      <BookForm onSubmit={handleSubmit} initialData={editingBook} /> 
      <ul> 
        {books.map((book) => ( 
          <li key={book.id}>
            {book.title} by {book.author} 
            <button onClick={() => setEditingBook(book)}>✏️ Editar</button>
            <button onClick={() => handleDelete(book.id)}>🗑️ Eliminar</button>
          </li> 
        ))} 
      </ul> 
    </div> 
  ); 
}
