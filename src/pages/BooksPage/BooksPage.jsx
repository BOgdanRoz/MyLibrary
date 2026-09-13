import BookCard from "../../components/BookCard/BookCard"
import SearchInput from "../../components/SearchInput/SearchInput"
import styles from "./BooksPage.module.css"
import { useEffect, useState } from "react"

function BooksPage() {
    const [books, setBooks] = useState([])
    const [search, setSearch] = useState("")

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

    const handleSearch = () => {
        fetch(`https://openlibrary.org/search.json?q=${search}`)
            .then(response => response.json())
            .then(data => setBooks(
                data.docs.filter(book => book.cover_i)
            ))
    }

    return (
        <>
            <h1>Books</h1>

            <SearchInput
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
            />

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