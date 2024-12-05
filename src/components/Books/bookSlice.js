import { api } from '../../App/api';

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: '/books',
        method: 'GET',
      }),
    }),
    providesTags: ['Books'],
  }),
});

export const { useGetBooksQuery } = booksApi;
