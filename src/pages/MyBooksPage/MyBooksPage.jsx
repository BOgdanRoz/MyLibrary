import { useState } from "react"
import BookCard from "../../components/BookCard/BookCard"
import styles from "./MyBooksPage.module.css"

function MyBooksPage() {
    const [books] = useState(() => {
        const savedBooks = localStorage.getItem("books")
        return JSON.parse(savedBooks) || []
    })

    return (
        <>
            <h1>My Books</h1>
            <div className={styles.booksList}>
                {books.map(book => (
                    <BookCard
                    book={book}
                    key={book.key}
                    />
                ))}
            </div>
        </>
    )
}

export default MyBooksPage