// src/components/Account/AccountPage.jsx
import { useGetMeQuery } from "../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/slices/authSlice";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "../../components/ui/alert";

const Account = () => {
  const user = useSelector(selectCurrentUser);
  const { data: userData, isLoading, error } = useGetMeQuery();

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
            {error.data?.message || "Failed to load account information"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Profile Information</h3>
              <p>
                Name: {userData?.firstname} {userData?.lastname}
              </p>
              <p>Email: {userData?.email}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Checked Out Books</h3>
              {userData?.books && userData.books.length > 0 ? (
                <ul className="space-y-2">
                  {userData.books.map((book) => (
                    <li key={book.id} className="border-b pb-2">
                      <p className="font-medium">{book.title}</p>
                      <p className="text-sm text-gray-600">by {book.author}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No books currently checked out.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;
