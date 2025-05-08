import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
    const [bookName, setBookName] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [books, setBooks] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_URL = "http://localhost:3000";
    
    // Fetch all books from the API
    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/books`);
            setBooks(response.data);
            setError("");
        } catch (err) {
            console.error("Error fetching books:", err);
            setError("Failed to load books. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Load books when component mounts
    useEffect(() => {
        fetchBooks();
    }, []);

    // Add a new book
    const handleAddBook = async () => {
        if (bookName && authorName) {
            try {
                if (editingId) {
                    // Update existing book
                    await axios.put(`${API_URL}/books/${editingId}`, {
                        title: bookName,
                        author: authorName
                    });
                    setEditingId(null);
                } else {
                    // Add new book
                    await axios.post(`${API_URL}/books`, {
                        title: bookName,
                        author: authorName
                    });
                }
                setBookName("");
                setAuthorName("");
                fetchBooks();
            } catch (err) {
                console.error("Error saving book:", err);
                setError("Failed to save book. Please try again.");
            }
        }
    };

    // Delete a book
    const handleDeleteBook = async (id) => {
        try {
            await axios.delete(`${API_URL}/books/${id}`);
            fetchBooks();
        } catch (err) {
            console.error("Error deleting book:", err);
            setError("Failed to delete book. Please try again.");
        }
    };

    // Set up book for editing
    const handleEditBook = (book) => {
        setBookName(book.title);
        setAuthorName(book.author);
        setEditingId(book._id);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Book Store</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Book Name"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    style={{ marginRight: "10px", padding: "5px" }}
                />
                <input
                    type="text"
                    placeholder="Author Name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    style={{ marginRight: "10px", padding: "5px" }}
                />
                <button 
                    onClick={handleAddBook} 
                    style={{ padding: "5px 10px" }}
                >
                    {editingId ? "Update Book" : "Add Book"}
                </button>
                {editingId && (
                    <button 
                        onClick={() => {
                            setEditingId(null);
                            setBookName("");
                            setAuthorName("");
                        }}
                        style={{ marginLeft: "10px", padding: "5px 10px" }}
                    >
                        Cancel
                    </button>
                )}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {loading ? (
                    <p>Loading books...</p>
                ) : (
                    <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "80%" }}>
                        <thead>
                            <tr>
                                <th>Book Name</th>
                                <th>Author Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.length === 0 ? (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: "center" }}>No books available</td>
                                </tr>
                            ) : (
                                books.map((book) => (
                                    <tr key={book._id}>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>
                                            <button 
                                                onClick={() => handleEditBook(book)}
                                                style={{ marginRight: "10px", padding: "5px" }}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteBook(book._id)}
                                                style={{ padding: "5px" }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Home;