import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/book/bookSlice";
import BookCard from "../components/BookCard";

export default function Home() {
  const dispatch = useDispatch();
  const { data: books, loading } = useSelector((state) => state.books);
    console.log(books)
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) return <p>Loading books...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 m-auto">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}
