import BookCard from "../../components/BookCard/BookCard"
import styles from "./BooksPage.module.css"
import { useEffect, useState } from "react"

function BooksPage() {
    const [books, setBooks] = useState([])
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        fetch("https://openlibrary.org/search.json?q=popular")
            .then(response => response.json())
            .then(data => setBooks(
                data.docs.filter(book => book.cover_i)))
    }, [])

    const handleImageError = (bookKey) => {
        setBooks(prevBooks => 
            prevBooks.filter(book => book.key !== bookKey)
        )
        console.log("IMAGE ERROR:", bookKey)
    }

    return (
        <>
            <h1>Books</h1>

            <div className={styles.booksList}>
                {books.map((book) => 
            
                <BookCard
                book={book}
                key={book.key}
                onImageError={handleImageError}
                />)}
            </div>
        </>
    )
}

export default BooksPage