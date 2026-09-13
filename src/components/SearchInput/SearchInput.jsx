function SearchInput({ search, setSearch, handleSearch }) {

    return (
        <>
            <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            />

            <button onClick={() => handleSearch()}>Search</button>
        </>
    )
}

export default SearchInput