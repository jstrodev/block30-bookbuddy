import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); // If you're using token auth
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Book", "Books"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      transformResponse: (response) => response.books,
      providesTags: ["Books"],
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
      transformResponse: (response) => response.book,
      providesTags: (result, error, id) => [{ type: "Book", id }],
    }),
    updateBook: builder.mutation({
      query: ({ bookId, available }) => ({
        url: `/books/${bookId}`,
        method: "PATCH",
        body: { available },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: (result, error, { bookId }) => [
        { type: "Book", id: bookId },
        "Books",
      ],
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery, useUpdateBookMutation } =
  bookApi;
