import { BrowserRouter, Routes, Route} from "react-router-dom"
import BooksPage from "./pages/BooksPage/BooksPage"
import BookPage from "./pages/BookPage/BookPage"
import MyBooksPage from "./pages/MyBooksPage/MyBooksPage"
import Header from "./components/Header/Header"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<BooksPage/>}/>
          <Route path="/books" element={<BooksPage/>}/>
          <Route path="/books/:id" element={<BookPage/>}/>
          <Route path="/my-books" element={<MyBooksPage/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App