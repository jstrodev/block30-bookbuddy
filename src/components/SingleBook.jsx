import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../redux/slices/authSlice';
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
  useRemoveReservationMutation,
} from '../redux/slices/bookSlice';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useGetMeQuery } from '../redux/slices/authSlice';

const SingleBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);

  const { data: book, isLoading, error } = useGetBookByIdQuery(id);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  const [returnBook] = useRemoveReservationMutation();
  const { data: userData } = useGetMeQuery();

  const handleBookAction = async () => {
    if (!token) {
      navigate('/login');
      return;
    }
    console.log(book);
    try {
      if (!book.available) {
        const foundReservation = userData.books.find(
          (b) => b.title === book.title
        );
        await returnBook({
          reservationId: foundReservation.id,
        }).unwrap();
      } else {
        await updateBook({
          bookId: id,
          available: !book.available,
        }).unwrap();
      }
    } catch (err) {
      console.error('Failed to update book:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error.data?.message || 'Failed to load book details'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{book.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={book.coverimage}
                alt={book.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Author</h3>
                <p>{book.author}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Description</h3>
                <p>{book.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Status</h3>
                <p>{book.available ? 'Available' : 'Checked Out'}</p>
              </div>

              {token && (
                <Button
                  onClick={handleBookAction}
                  disabled={isUpdating}
                  variant={book.available ? 'default' : 'secondary'}
                >
                  {isUpdating
                    ? 'Processing...'
                    : book.available
                    ? 'Check Out Book'
                    : 'Return Book'}
                </Button>
              )}

              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="ml-2"
              >
                Back to Books
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleBook;
