import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBooks } from "../redux/book/bookSlice";
import MyBookCard from "../components/MyBookCard";

export default function MyBooks() {
  const dispatch = useDispatch();
  const { myBooks } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchMyBooks());
  }, [dispatch]);
  console.log(myBooks);

  if (!myBooks.length) return <p>No books in your list yet.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {myBooks.map((book) => (
        <MyBookCard key={book._id} book={book} />
      ))}
    </div>
  );
}
