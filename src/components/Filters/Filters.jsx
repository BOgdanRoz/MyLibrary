import { useState } from "react"
import styles from "./Filters.module.css"

function Filters({ minYear, setMinYear, maxYear, setMaxYear, language, setLanguage }) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={styles.filters}>
            <button
                className={styles.toggle}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                {isOpen ? ("Close Filters") : ("Filters")}
            </button>

            <div className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ""}`}>
                <div className={styles.dropdownContent}>
                    <p className={styles.title}>Refine your search</p>
                    <div className={styles.yearRange}>
                        <input 
                            className={styles.input}
                            type="number"
                            placeholder="From year"
                            value={minYear}
                            onChange={(event) => setMinYear(event.target.value)}    
                        />
                        <input
                            className={styles.input}
                            type="number"
                            placeholder="To year"
                            value={maxYear}
                            onChange={(event) => setMaxYear(event.target.value)}
                        />
                    </div>

                    <select 
                        className={styles.select}
                        value={language}
                        onChange={(event) => setLanguage(event.target.value)}
                    >
                        <option value="">Any language</option>
                        <option value="eng">English</option>
                        <option value="ukr">Ukraine</option>
                        <option value="pol">Poland</option>
                        <option value="deu">German</option>
                    </select>

                    <button className={styles.reset} onClick={() => {setLanguage(""), setMaxYear(""), setMinYear("")}}>Reset Filters</button>
                </div>
            </div>
        </div>
    )
}

export default Filters