import BookCard from "../../components/BookCard/BookCard"
import SearchInput from "../../components/SearchInput/SearchInput"
import Filters from "../../components/Filters/Filters"
import styles from "./BooksPage.module.css"
import { useEffect, useState } from "react"

function BooksPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [books, setBooks] = useState([])
    const [search, setSearch] = useState("")
    const [minYear, setMinYear] = useState("")
    const [maxYear, setMaxYear] = useState("")
    const [language, setLanguage] = useState("")

    useEffect(() => {
        fetch("https://openlibrary.org/search.json?q=popular")
            .then(response => response.json())
            .then(data => {
                setIsLoading(false)
                setBooks(
                data.docs.filter(book => book.cover_i))})
    }, [])

    const handleImageError = (bookKey) => {
        setBooks(prevBooks => 
            prevBooks.filter(book => book.key !== bookKey)
        )
        console.log("IMAGE ERROR:", bookKey)
    }

    const handleSearch = () => {
        setIsLoading(true)
        if (search === "") {
            fetch("https://openlibrary.org/search.json?q=popular")
            .then(response => response.json())
            .then(data => {
                setIsLoading(false)
                setBooks(
                data.docs.filter(book => book.cover_i))})
        } else {
            fetch(`https://openlibrary.org/search.json?q=${search}`)
            .then(response => response.json())
            .then(data => {
                setIsLoading(false)
                setBooks(
                data.docs.filter(book => book.cover_i)
            )})
        }
        
    }

    const filteredBooks = books.filter(book => 
        (!minYear || book.first_publish_year >= minYear) && 
        (!maxYear || book.first_publish_year <= maxYear) &&
        (!language || book.language?.includes(language))
    )

    return (
        <>
            <h1
                onClick={() => {
                    setIsLoading(true)
                    fetch("https://openlibrary.org/search.json?q=popular")
                        .then(response => response.json())
                        .then(data => {
                            setIsLoading(false)
                            setBooks(data.docs.filter(book => book.cover_i))
                        })
                }}
            >
                Books
            </h1>

            <SearchInput
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
            />

            <Filters
            minYear={minYear}
            setMinYear={setMinYear}
            maxYear={maxYear}
            setMaxYear={setMaxYear}
            language={language}
            setLanguage={setLanguage}
            />

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className={styles.booksList}>
                {
                    filteredBooks.map((book) => (

                    <BookCard
                    book={book}
                    key={book.key}
                    onImageError={handleImageError}
                    />
                    ))
                }
            </div>
            )}
            
        </>
    )
}

export default BooksPage