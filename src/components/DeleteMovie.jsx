import { useContext, useEffect, useRef, useState } from "react";
import { PopupContext } from "../SharedContext";
import { MovieToDelete } from "./MovieToDelete";

export const DeleteMovie = ({ onClick }) => {
  const { allMovies, setAllMovies } = useContext(PopupContext);
  const [movies, setMovies] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    try {
      setLoading(true);
      setMovies(allMovies);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [allMovies]);

  console.log(allMovies);

  const handleDelete = (movieId, movieTitle) => {
    setShowPopup(true);
    setMovieData({ id: movieId, title: movieTitle });
  };

  const handleDeleteMovie = () => {
    setShowPopup(false);
    setSuccessDelete(true);
    const filtered = movies.filter((movie) => movie.id !== movieData.id);
    setMovies(filtered);
    setAllMovies(filtered);
    setTimeout(() => {
      setSuccessDelete(false);
    }, 2000);
  };

  if (loading) return <p className="text-white p-4">Loading...</p>;

  if (successDelete) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="bg-gradient-to-br from-purple-900 to-blue-800 p-6 md:p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 text-center animate-fade-in">
          <div className="flex justify-center mb-4 md:mb-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 md:h-12 md:w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            Success!
          </h3>
          <p className="text-base md:text-lg text-blue-100 mb-4 md:mb-6">
            Movie deleted successfully! 🎬
          </p>
          <div className="animate-pulse">
            <p className="text-xs md:text-sm text-blue-200">
              Redirecting shortly...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full transition-all top-0 p-4 md:p-9 px-4 md:px-20 bg-black absolute min-h-screen">
      <div
        ref={modalRef}
        className="w-full h-full relative py-6 md:py-10 px-4 md:px-20 z-10 rounded-lg bg-gray-700 md:bg-gray-500 text-white"
      >
        <button
          onClick={onClick}
          className="absolute z-20 top-3 md:top-5 cursor-pointer rounded-full p-1 md:p-2 px-3 md:px-4 bg-blue-600 right-3 md:right-5 shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 text-gray-100 text-sm md:text-md font-medium"
        >
          X
        </button>
        <h2 className="text-center text-xl md:text-2xl font-[600] mb-4 md:mb-6">
          Delete Movie
        </h2>
        <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {movies.map((movie) => {
            if (movie.id < 33) {
              return (
                <MovieToDelete
                  key={movie.id}
                  movie={movie}
                  onClick={handleDelete}
                />
              );
            }
          })}
        </main>
        {showPopup && (
          <section className="fixed inset-0 flex justify-center items-center z-50 bg-black/70">
            <div className="bg-gray-700 p-5 md:p-7 w-full max-w-xs sm:max-w-md mx-4 rounded-xl flex flex-col gap-3 md:gap-5">
              <h3 className="text-lg md:text-xl font-bold">
                Delete {movieData?.title}?
              </h3>
              <h4 className="text-sm md:text-md">
                Are you sure you want to delete this movie?
              </h4>
              <div className="mt-4 md:mt-6 flex gap-2 justify-end">
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-500 hover:bg-gray-600 cursor-pointer px-3 py-1 md:px-4 md:py-2 rounded-md text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteMovie}
                  className="bg-red-500 hover:bg-red-600 cursor-pointer px-3 py-1 md:px-4 md:py-2 rounded-md text-sm md:text-base"
                >
                  Delete
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
