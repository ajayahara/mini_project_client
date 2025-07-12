import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/axios";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const res = await API.get("/books");
  return res.data.books;
});

export const fetchMyBooks = createAsyncThunk("books/fetchMyBooks", async () => {
  const res = await API.get("/my_books");
  return res.data.books;
});

export const addToMyBooks = createAsyncThunk(
  "books/addToMyBooks",
  async (bookId, thunkAPI) => {
    try {
      const res = await API.post(`/my_books/${bookId}`);
      return res.data.added;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to add book");
    }
  }
);

export const updateStatus = createAsyncThunk(
  "books/updateStatus",
  async ({ bookId, status }, thunkAPI) => {
    try {
      const res = await API.patch(`/my_books/${bookId}/status`, { status });
      return res.data.updated;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update status");
    }
  }
);

export const updateRating = createAsyncThunk(
  "books/updateRating",
  async ({ bookId, rating }, thunkAPI) => {
    try {
      const res = await API.patch(`/my_books/${bookId}/rating`, { rating });
      return res.data.updated;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update rating");
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    data: [],
    myBooks: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 📚 Fetch all books
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 📖 Fetch user's books
      .addCase(fetchMyBooks.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchMyBooks.fulfilled, (state, action) => {
        console.log(action)
        state.myBooks = action.payload;
      })

      // ➕ Add to my books
      .addCase(addToMyBooks.fulfilled, (state) => {
        state.loading=false;
        state.error=false;
      })
      .addCase(addToMyBooks.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 🔄 Update status
      .addCase(updateStatus.fulfilled, (state, action) => {
        const i = state.myBooks.findIndex(
          (b) => b.bookId._id === action.payload.bookId
        );
        if (i !== -1) state.myBooks[i].status = action.payload.status;
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ⭐ Update rating
      .addCase(updateRating.fulfilled, (state, action) => {
        const i = state.myBooks.findIndex(
          (b) => b.bookId._id === action.payload.bookId
        );
        if (i !== -1) state.myBooks[i].rating = action.payload.rating;
      })
      .addCase(updateRating.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = bookSlice.actions;
export default bookSlice.reducer;
