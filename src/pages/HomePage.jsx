import BookList from '../components/Books/BookList';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Welcome to Book Buddy
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Discover and borrow from our collection of classic books
          </p>
        </div>
        <BookList />
      </div>
    </div>
  );
};

export default HomePage; 