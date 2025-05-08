import React, { useState } from "react";

const Home = () => {
    const [bookName, setBookName] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [books, setBooks] = useState([]);

    const handleAddBook = () => {
        if (bookName && authorName) {
            setBooks([...books, { bookName, authorName }]);
            setBookName("");
            setAuthorName("");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Book Store</h1>
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
                <button style={{ padding: "5px 10px" }}>
                    Add Book
                </button>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "80%" }}>
                    <thead>
                        <tr>
                            <th>Book Name</th>
                            <th>Author Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Sample Book</td>
                            <td>Sample Author</td>
                            <td>
                                <button style={{ marginRight: "10px", padding: "5px" }}>
                                    Edit
                                </button>
                                <button style={{ padding: "5px" }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;