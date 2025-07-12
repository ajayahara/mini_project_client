import { useDispatch } from "react-redux";
import { updateStatus, updateRating } from "../redux/book/bookSlice";

export default function MyBookCard({ book }) {
  const dispatch = useDispatch();

  const handleStatusChange = (e) => {
    dispatch(updateStatus({ bookId: book.bookId._id, status: e.target.value }));
  };

  const handleRatingChange = (e) => {
    dispatch(updateRating({ bookId: book.bookId._id, rating: Number(e.target.value) }));
  };

  return (
    <div className="border p-4 rounded shadow max-w-xs">
      <img src={book.bookId.coverImage} alt={book.bookId.title} className="mb-2 w-full h-48 object-cover rounded" />
      <h3 className="font-bold text-lg">{book.bookId.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{book.bookId.author}</p>

      <select value={book.status} onChange={handleStatusChange} className="w-full p-2 border rounded mb-2">
        <option value="Want to Read">Want to Read</option>
        <option value="Currently Reading">Currently Reading</option>
        <option value="Read">Read</option>
      </select>

      <input
        type="number"
        min="1"
        max="5"
        value={book.rating || ""}
        onChange={handleRatingChange}
        className="w-full p-2 border rounded"
        placeholder="Rate 1-5"
      />
    </div>
  );
}

