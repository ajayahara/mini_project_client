import { addToMyBooks } from "@/redux/book/bookSlice";
import { useDispatch, useSelector } from "react-redux";

export default function BookCard({ book }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleAdd = async () => {
    if (!user) return alert("Please login to add to your books");
    try {
      dispatch(addToMyBooks(book._id))
      alert("Book added to your list");
    } catch (err) {
      console.log(err);
      alert("Error adding book");
    }
  };

  return (
    <div className="border p-4 rounded shadow max-w-xs">
      <img
        src={book.coverImage}
        alt={book.title}
        className="mb-2 w-full h-48 object-cover rounded"
      />
      <h3 className="font-bold text-lg">{book.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{book.author}</p>
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
      >
        Want to Read
      </button>
    </div>
  );
}
