import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  quote: '',
  author: '',
  status: 'idle',
  error: null,
};

export const fetchRandomQuote = createAsyncThunk('quote/fetchRandomQuote', async () => {
  const response = await axios.get('https://type.fit/api/quotes');
  const quotes = response.data;
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return randomQuote;
});

const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomQuote.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRandomQuote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.quote = action.payload.text;
        state.author = action.payload.author;
      })
      .addCase(fetchRandomQuote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default quoteSlice.reducer;