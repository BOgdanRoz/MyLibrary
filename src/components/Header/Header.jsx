import { Link } from "react-router-dom"
import styles from "./Header.module.css"

function Header() {
    return (
        <header className={styles.header}>
            <p className={styles.logo}>The Reading Room</p>
            
            <div className={styles.links}>
                <Link to="/books">Library</Link>
                <Link to="/my-books">My Library</Link>
            </div>
        </header>
    )
}

export default Header