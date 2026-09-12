import { Link } from "react-router-dom"
import styles from "./BookCard.module.css"

function BookCard({ book, onImageError}) {
    const bookId = book.key.split("/")[2]
    return (
        <Link to={`/books/${bookId}`}>
            <div className={styles.bookCard}>
                <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                     alt="BookImg"
                     onError={() => onImageError(book.key)} />
                <div className={styles.bookInfo}>
                    <p>{book.title}</p>
                    <p>{book.author_name}</p>
                </div>
            </div>
        </Link>
    )
}

export default BookCard