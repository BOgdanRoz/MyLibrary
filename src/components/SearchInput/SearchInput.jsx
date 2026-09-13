import styles from "./SearchInput.module.css"

function SearchInput({ search, setSearch, handleSearch }) {

    return (
        <div className={styles.search}>
            <input
            className={styles.input}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by book title"
            aria-label="Search by book title"
            />

            <button className={styles.button} onClick={() => handleSearch()}>Search</button>
        </div>
    )
}

export default SearchInput