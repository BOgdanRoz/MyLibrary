
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from "./BookPage.module.css"

function BookPage() {
    const { id } = useParams()
    const [book, setBook] = useState(null)
    const [author, setAuthor] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        const loadBook = async () => {
            const response = await fetch(`https://openlibrary.org/works/${id}.json`)
            const data = await response.json()

            const savedBooks = localStorage.getItem("books")
            const books = JSON.parse(savedBooks)

            const isBookFavorite = books.some(book => book.key === data.key)

            setIsFavorite(isBookFavorite)

            const responseAuthor = await fetch(`https://openlibrary.org/authors/${data.authors[0].author.key.split("/")[2]}.json`)
            const dataAuthor = await responseAuthor.json()

            setAuthor(dataAuthor)

            setBook(data)
            setIsLoading(false)
        }
        loadBook()
    }, [id])

    function handleAddBook() {
        const savedBooks = localStorage.getItem("books")
        const books = JSON.parse(savedBooks) || []

        const bookToSave = {
            ...book,
            cover_i: book.covers?.[0],
            author_name: [author.name]
        }

        books.push(bookToSave)

        localStorage.setItem("books", JSON.stringify(books))
        setIsFavorite(true)
    }

    function handleRemoveBook() {
        const savedBooks = localStorage.getItem("books")
        const books = JSON.parse(savedBooks) || []

        const filteredBooks = books.filter(savedBook => savedBook.key !== book.key)

        localStorage.setItem("books", JSON.stringify(filteredBooks))
        setIsFavorite(false)
    }
        
    return (
        <>
            {isLoading ? (

                <p className={styles.loading}>Loading...</p>

            ) : (
                <>
                    <article className={styles.bookPage}>
                    <img className={styles.cover} src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-M.jpg`} alt="Image not found" />  
            
                    <div className={styles.details}>
                        <h2>{book?.title}</h2>

                        <p className={styles.author}>{author?.name}</p>

                        <p className={styles.description}>{book?.description?.value}</p>

                        <button className={styles.favoriteButton} onClick={isFavorite ? handleRemoveBook : handleAddBook}>
                            {isFavorite ? "Remove from My Books" : "Add to My Books"}
                        </button>
                    </div>
                    </article>
                </>
            )}
            
        </>
    )
}

export default BookPage